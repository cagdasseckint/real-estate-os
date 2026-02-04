/**
 * CB-OS V1.0 - 18_Automations.gs
 * Lead scoring, stage automations, follow-up sequences, docs packages,
 * email drafts, ops dashboards, and weekly KPI reporting.
 */

/**
 * Record a lead signal entry for scoring
 * @param {Object} deal - Deal object
 * @param {Object} contact - Contact object
 * @param {string} signalType - Type of signal
 * @param {string} source - Signal source
 * @param {number} weight - Signal weight
 * @param {string} signalValue - Additional value
 */
function recordLeadSignal_(deal, contact, signalType, source, weight, signalValue) {
  const signal = {
    signal_id: id_(),
    lead_id: deal ? deal.deal_id : '',
    contact_id: contact ? contact.contact_id : '',
    deal_id: deal ? deal.deal_id : '',
    signal_type: signalType || '',
    signal_value: signalValue || '',
    weight: weight || 0,
    source: source || '',
    occurred_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  
  appendRow_(SHEETS.LEAD_SIGNALS, signal);
}

/**
 * Compute lead scores from signals and deal stage
 * @returns {Array<Object>} Lead scores
 */
function computeLeadScores_() {
  const signals = getSheetData_(SHEETS.LEAD_SIGNALS);
  const deals = DealsRepo.getActive();
  const existingScores = getSheetData_(SHEETS.LEAD_SCORES);
  const scoreMap = {};
  
  for (const deal of deals) {
    scoreMap[deal.deal_id] = {
      lead_id: deal.deal_id,
      contact_id: deal.contact_id,
      deal_id: deal.deal_id,
      score: 0,
      breakdown: []
    };
  }
  
  for (const signal of signals) {
    const entry = scoreMap[signal.deal_id];
    if (!entry) continue;
    entry.score += Number(signal.weight || 0);
    entry.breakdown.push(signal.signal_type + ':' + signal.weight);
  }
  
  for (const deal of deals) {
    const entry = scoreMap[deal.deal_id];
    if (!entry) continue;
    const stageBoost = deal.stage === 'NEW' ? 20 : deal.stage === 'QUALIFIED' ? 15 : 5;
    entry.score += stageBoost;
    entry.breakdown.push('stage:' + stageBoost);
  }
  
  const results = Object.values(scoreMap);
  for (const entry of results) {
    const existing = existingScores.find(row => row.lead_id === entry.lead_id);
    const updates = {
      lead_id: entry.lead_id,
      contact_id: entry.contact_id,
      deal_id: entry.deal_id,
      score: entry.score,
      score_breakdown: entry.breakdown.join('|'),
      updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
    };
    
    if (existing) {
      updateRow_(SHEETS.LEAD_SCORES, existing._rowIndex, updates);
    } else {
      appendRow_(SHEETS.LEAD_SCORES, updates);
    }
  }
  
  return results;
}

/**
 * Create top follow-up tasks based on lead scores
 * @param {Array<Object>} scores - Lead scores
 */
function createTopFollowupTasks_(scores) {
  const topN = cfg_('LEAD_SCORE_TOP_N', DEFAULTS.LEAD_SCORE_TOP_N);
  const minScore = cfg_('LEAD_SCORE_MIN_THRESHOLD', DEFAULTS.LEAD_SCORE_MIN_THRESHOLD);
  const sorted = scores
    .filter(entry => entry.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
  
  const existing = TasksRepo.getPending().filter(task => task.title.indexOf('Top Lead Follow-up') === 0);
  
  for (const entry of sorted) {
    const alreadyExists = existing.some(task => task.entity_id === entry.deal_id);
    if (alreadyExists) continue;
    
    TasksRepo.create({
      entity_type: 'DEAL',
      entity_id: entry.deal_id,
      title: 'Top Lead Follow-up',
      description: 'Skor: ' + entry.score,
      priority: 'high',
      status: 'pending',
      due_date: new Date().toISOString().split('T')[0]
    });
  }
}

/**
 * Schedule follow-up sequence for a deal/contact
 * @param {Object} deal - Deal object
 * @param {Object} contact - Contact object
 */
function scheduleFollowupSequence_(deal, contact) {
  const sequences = getSheetData_(SHEETS.FOLLOWUP_SEQUENCES);
  const matched = sequences.find(seq =>
    seq.enabled !== false &&
    (seq.deal_type === deal.deal_type || seq.deal_type === '*' || !seq.deal_type) &&
    (seq.stage === deal.stage || seq.stage === '*' || !seq.stage)
  );
  
  let steps = [
    { offset_days: 2, action: 'task', template: 'followup_48h' },
    { offset_days: 7, action: 'email', subject: 'Takip', body: 'Merhaba, tekrar iletişime geçiyorum.' },
    { offset_days: 14, action: 'email', subject: 'Takip - 2', body: 'Merhaba, tekrar dönüş rica ederim.' }
  ];
  
  if (matched && matched.steps_json) {
    const parsed = parseJsonSafe_(matched.steps_json);
    if (parsed && Array.isArray(parsed)) steps = parsed;
  }
  
  for (const step of steps) {
    const scheduled = new Date();
    scheduled.setDate(scheduled.getDate() + Number(step.offset_days || 0));
    
    if (step.action === 'task') {
      TasksRepo.createFromTemplate(step.template || 'followup_48h', {
        entity_type: 'DEAL',
        entity_id: deal.deal_id,
        assigned_to: deal.assigned_to || ''
      });
    } else if (step.action === 'email') {
      createEmailDraft_({
        contact_id: contact.contact_id,
        deal_id: deal.deal_id,
        to: contact.email,
        subject: step.subject || 'Takip',
        body: step.body || '',
        scheduled_for: scheduled.toISOString()
      });
    }
    
    EventsRepo.append({
      entity_type: 'DEAL',
      entity_id: deal.deal_id,
      event_type: EventsRepo.EVENT_TYPES.FOLLOWUP_SCHEDULED,
      payload: { step: step, scheduled_for: scheduled.toISOString() },
      source: 'system',
      idempotency_key: deal.deal_id + '_followup_' + scheduled.getTime()
    });
  }
}

/**
 * Apply stage automations when deal stage changes
 * @param {Object} deal - Deal object
 * @param {string} oldStage - Previous stage
 * @param {string} newStage - New stage
 */
function applyStageAutomations_(deal, oldStage, newStage) {
  const automations = getSheetData_(SHEETS.STAGE_AUTOMATIONS);
  const contact = ContactsRepo.findById(deal.contact_id);
  
  for (const rule of automations) {
    const matchType = !rule.deal_type || rule.deal_type === '*' || rule.deal_type === deal.deal_type;
    const matchFrom = !rule.from_stage || rule.from_stage === '*' || rule.from_stage === oldStage;
    const matchTo = !rule.to_stage || rule.to_stage === '*' || rule.to_stage === newStage;
    
    if (!matchType || !matchFrom || !matchTo) continue;
    
    const actionType = rule.action_type;
    const config = parseJsonSafe_(rule.action_config) || {};
    
    if (actionType === 'TASK_TEMPLATE') {
      const templates = config.templates || [rule.task_template_id].filter(Boolean);
      for (const templateId of templates) {
        TasksRepo.createFromTemplate(templateId, {
          entity_type: 'DEAL',
          entity_id: deal.deal_id,
          assigned_to: deal.assigned_to || ''
        });
      }
    } else if (actionType === 'EMAIL_DRAFT') {
      createEmailDraft_({
        contact_id: deal.contact_id,
        deal_id: deal.deal_id,
        to: contact ? contact.email : '',
        subject: config.subject || 'Takip',
        body: config.body || '',
        scheduled_for: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
      });
    } else if (actionType === 'FOLLOWUP_SEQUENCE') {
      if (contact) scheduleFollowupSequence_(deal, contact);
    } else if (actionType === 'DOC_TEMPLATE') {
      generateDocFromTemplate_(config.template_id, deal, config.output_folder_id);
    } else if (actionType === 'CLOSE_CHECKLIST') {
      TasksRepo.createFromTemplate('close_checklist', {
        entity_type: 'DEAL',
        entity_id: deal.deal_id,
        assigned_to: deal.assigned_to || ''
      });
    } else if (actionType === 'WINBACK_SEQUENCE') {
      if (contact) scheduleWinbackSequence_(deal, contact);
    }
  }
  
  if (cfg_('CLOSE_CHECKLIST_ENABLED', DEFAULTS.CLOSE_CHECKLIST_ENABLED) &&
      (newStage === 'CONTRACT' || newStage === 'CLOSED_WON')) {
    TasksRepo.createFromTemplate('close_checklist', {
      entity_type: 'DEAL',
      entity_id: deal.deal_id,
      assigned_to: deal.assigned_to || ''
    });
  }
  
  if (cfg_('WINBACK_ENABLED', DEFAULTS.WINBACK_ENABLED) && newStage === 'CLOSED_LOST' && contact) {
    scheduleWinbackSequence_(deal, contact);
  }
}

/**
 * Get SLA days for a stage from STAGE_AUTOMATIONS
 * @param {string} dealType - Deal type
 * @param {string} stage - Stage name
 * @returns {number|null} SLA days
 */
function getStageSlaDays_(dealType, stage) {
  const automations = getSheetData_(SHEETS.STAGE_AUTOMATIONS);
  const match = automations.find(rule =>
    rule.deal_type === dealType &&
    (rule.to_stage === stage || rule.from_stage === stage) &&
    rule.sla_days
  );
  return match ? Number(match.sla_days) : null;
}

/**
 * Create Gmail draft record (and optionally Gmail draft)
 * @param {Object} data - Draft data
 * @returns {Object} Draft record
 */
function createEmailDraft_(data) {
  const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  let taskId = data.task_id || '';
  
  if (!taskId) {
    const task = TasksRepo.create({
      entity_type: 'DEAL',
      entity_id: data.deal_id || '',
      title: 'Review & Send Draft',
      description: data.subject || 'Email draft review',
      priority: 'medium',
      status: 'pending',
      due_date: data.scheduled_for ? new Date(data.scheduled_for).toISOString().split('T')[0] : ''
    });
    taskId = task ? task.task_id : '';
  }
  
  const draft = {
    draft_id: id_(),
    created_at: now,
    updated_at: now,
    contact_id: data.contact_id || '',
    deal_id: data.deal_id || '',
    to: data.to || '',
    subject: data.subject || '',
    body: data.body || '',
    status: 'queued',
    gmail_draft_id: '',
    task_id: taskId,
    scheduled_for: data.scheduled_for || now
  };
  
  const rowNum = appendRow_(SHEETS.EMAIL_DRAFTS, draft);
  draft._rowIndex = rowNum;
  
  return draft;
}

/**
 * Process queued email drafts and create Gmail drafts
 * @returns {Object} result
 */
function processEmailDraftQueue_() {
  const result = { drafted: 0, skipped: 0, errors: 0 };
  if (!cfg_('EMAIL_DRAFTS_ENABLED', DEFAULTS.EMAIL_DRAFTS_ENABLED)) return result;
  
  const drafts = getSheetData_(SHEETS.EMAIL_DRAFTS);
  const now = new Date();
  
  for (const draft of drafts) {
    if (draft.status !== 'queued') continue;
    if (draft.scheduled_for && new Date(draft.scheduled_for) > now) {
      result.skipped++;
      continue;
    }
    
    try {
      const gmailDraft = GmailApp.createDraft(draft.to, draft.subject, draft.body);
      updateRow_(SHEETS.EMAIL_DRAFTS, draft._rowIndex, {
        status: 'drafted',
        gmail_draft_id: gmailDraft.getId(),
        updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
      });
      result.drafted++;
    } catch (e) {
      updateRow_(SHEETS.EMAIL_DRAFTS, draft._rowIndex, {
        status: 'error',
        updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
      });
      result.errors++;
    }
  }
  
  return result;
}

/**
 * Create Docs package for deal based on DOC_PACKAGES
 * @param {Object} deal - Deal data
 * @returns {Object|null} Package info
 */
function createDocsPackageForDeal_(deal) {
  const packages = getSheetData_(SHEETS.DOC_PACKAGES);
  const match = packages.find(row => row.deal_type === deal.deal_type);
  if (!match || !match.template_folder_id) return null;
  
  try {
    const templateFolder = DriveApp.getFolderById(match.template_folder_id);
    const packageName = match.package_name || ('Deal_' + deal.deal_id);
    const targetFolder = DriveApp.createFolder(packageName);
    const files = templateFolder.getFiles();
    
    while (files.hasNext()) {
      const file = files.next();
      file.makeCopy(file.getName(), targetFolder);
    }
    
    const url = targetFolder.getUrl();
    
    appendRow_(SHEETS.DOCS, {
      doc_id: id_(),
      created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
      entity_type: 'DEAL',
      entity_id: deal.deal_id,
      doc_type: 'PACKAGE',
      doc_url: url,
      status: 'created',
      signed_at: '',
      notes: 'Auto package'
    });
    
    return { folder_id: targetFolder.getId(), url: url };
  } catch (e) {
    Logger.log('DOC_PACKAGE | Error: ' + e.message);
    return null;
  }
}

/**
 * Generate Doc from template with placeholders
 * @param {string} templateId - Template doc ID
 * @param {Object} data - Data map
 * @param {string} outputFolderId - Output folder ID
 * @returns {Object|null} Doc info
 */
function generateDocFromTemplate_(templateId, data, outputFolderId) {
  if (!templateId) return null;
  
  const outputFolder = outputFolderId
    ? DriveApp.getFolderById(outputFolderId)
    : (cfg_('DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID)
        ? DriveApp.getFolderById(cfg_('DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID))
        : DriveApp.getRootFolder());
  
  const templateFile = DriveApp.getFileById(templateId);
  const copy = templateFile.makeCopy(templateFile.getName() + ' - ' + data.deal_id, outputFolder);
  const doc = DocumentApp.openById(copy.getId());
  const body = doc.getBody();
  
  for (const [key, value] of Object.entries(data || {})) {
    body.replaceText('{{' + key + '}}', String(value || ''));
  }
  
  doc.saveAndClose();
  
  appendRow_(SHEETS.DOCS, {
    doc_id: id_(),
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    entity_type: 'DEAL',
    entity_id: data.deal_id || '',
    doc_type: 'TEMPLATE_OUTPUT',
    doc_url: copy.getUrl(),
    status: 'generated',
    signed_at: '',
    notes: 'Template output'
  });
  
  return { doc_id: copy.getId(), url: copy.getUrl() };
}

/**
 * Schedule win-back sequence for lost deals (30/60/90 days)
 * @param {Object} deal - Deal object
 * @param {Object} contact - Contact object
 */
function scheduleWinbackSequence_(deal, contact) {
  const offsets = [30, 60, 90];
  for (const days of offsets) {
    const scheduled = new Date();
    scheduled.setDate(scheduled.getDate() + days);
    createEmailDraft_({
      contact_id: contact.contact_id,
      deal_id: deal.deal_id,
      to: contact.email,
      subject: 'Tekrar görüşelim',
      body: 'Merhaba, ilerlemek isterseniz destek olmaya hazırız.',
      scheduled_for: scheduled.toISOString()
    });
    
    TasksRepo.create({
      entity_type: 'DEAL',
      entity_id: deal.deal_id,
      title: 'Win-back takip (' + days + 'g)',
      description: 'CLOSED_LOST win-back follow-up',
      priority: 'medium',
      status: 'pending',
      due_date: scheduled.toISOString().split('T')[0]
    });
    
    EventsRepo.append({
      entity_type: 'DEAL',
      entity_id: deal.deal_id,
      event_type: EventsRepo.EVENT_TYPES.WINBACK_SCHEDULED,
      payload: { days: days, scheduled_for: scheduled.toISOString() },
      source: 'system',
      idempotency_key: deal.deal_id + '_winback_' + days
    });
  }
}

/**
 * Update ops dashboard snapshot
 */
function updateOpsDashboard_() {
  const ingestPending = QueueRepo.getPending().length;
  const dlqCount = getSheetData_(SHEETS.DLQ).length;
  const totalIngest = getSheetData_(SHEETS.INGEST_QUEUE).length;
  const errorRate = totalIngest > 0 ? (dlqCount / totalIngest) : 0;
  
  const cursor = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);
  let cursorDriftMinutes = 0;
  if (cursor) {
    const cursorDate = new Date(cursor);
    cursorDriftMinutes = Math.round((Date.now() - cursorDate.getTime()) / 60000);
  }
  
  appendRow_(SHEETS.OPS_DASHBOARD, {
    run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    ingest_pending: ingestPending,
    dlq_count: dlqCount,
    error_rate: errorRate,
    cursor_drift_minutes: cursorDriftMinutes
  });
}

/**
 * Update daily snapshot metrics (idempotent per day).
 */
function updateDailySnapshot_() {
  const timezone = cfg_('TIMEZONE', DEFAULTS.TIMEZONE);
  const today = Utilities.formatDate(new Date(), timezone, 'yyyy-MM-dd');
  const snapshotSheet = sheet_(SHEETS.DAILY_SNAPSHOT, true);
  if (!snapshotSheet) return;
  
  const metrics = computeDailySnapshotMetrics_(today);
  const existing = getSheetData_(SHEETS.DAILY_SNAPSHOT)
    .find(row => row.snapshot_date === today);
  
  if (existing) {
    updateRow_(SHEETS.DAILY_SNAPSHOT, existing._rowIndex, metrics);
    Logger.log('DAILY_SNAPSHOT | Updated for ' + today);
  } else {
    appendRow_(SHEETS.DAILY_SNAPSHOT, metrics);
    Logger.log('DAILY_SNAPSHOT | Created for ' + today);
  }
}

/**
 * Compute daily snapshot metrics.
 * @param {string} dayStr - Date string (yyyy-MM-dd)
 * @returns {Object} Metrics payload
 */
function computeDailySnapshotMetrics_(dayStr) {
  const contacts = getSheetData_(SHEETS.CONTACTS);
  const deals = getSheetData_(SHEETS.DEALS);
  const events = getSheetData_(SHEETS.EVENTS);
  
  const leadsCreated = contacts.filter(c => String(c.created_at || '').startsWith(dayStr)).length;
  const dealsCreated = deals.filter(d => String(d.created_at || '').startsWith(dayStr)).length;
  const conversionRate = leadsCreated > 0 ? (dealsCreated / leadsCreated) : 0;
  
  const dealById = {};
  deals.forEach(d => { dealById[d.deal_id] = d; });
  
  let firstTouchCount = 0;
  let firstTouchTotalMinutes = 0;
  
  const dayEvents = events.filter(e => String(e.occurred_at || '').startsWith(dayStr));
  for (const event of dayEvents) {
    let isFirstTouch = false;
    if (event.event_type === 'FIRST_TOUCH') {
      isFirstTouch = true;
    } else if (event.event_type === 'STAGE_CHANGE') {
      const payload = parseJsonSafe_(event.payload_json) || {};
      if (payload.to === 'FIRST_TOUCH') {
        isFirstTouch = true;
      }
    }
    
    if (!isFirstTouch) continue;
    
    let contactId = '';
    if (event.entity_type === 'CONTACT') {
      contactId = event.entity_id;
    } else if (event.entity_type === 'DEAL') {
      contactId = (dealById[event.entity_id] || {}).contact_id || '';
    }
    
    if (!contactId) continue;
    
    const contact = contacts.find(c => c.contact_id === contactId);
    if (!contact || !contact.created_at) continue;
    
    const createdMs = parseCbTimeMs_(contact.created_at);
    const touchMs = parseCbTimeMs_(event.occurred_at);
    if (createdMs === null || touchMs === null) continue;
    
    firstTouchCount++;
    firstTouchTotalMinutes += Math.round((touchMs - createdMs) / 60000);
  }
  
  const avgFirstTouchMinutes = firstTouchCount > 0 ? (firstTouchTotalMinutes / firstTouchCount) : '';
  
  return {
    snapshot_date: dayStr,
    run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    leads_created: leadsCreated,
    deals_created: dealsCreated,
    conversion_rate: conversionRate,
    first_touch_count: firstTouchCount,
    avg_first_touch_minutes: avgFirstTouchMinutes
  };
}

/**
 * Archive operational tables when thresholds are exceeded.
 * @returns {Object} Archive result
 */
function archiveOperationalTables_() {
  const results = [];
  const ingestThreshold = cfg_('ARCHIVE_THRESHOLD_INGEST_QUEUE', DEFAULTS.ARCHIVE_THRESHOLD_INGEST_QUEUE);
  const eventsThreshold = cfg_('ARCHIVE_THRESHOLD_EVENTS', DEFAULTS.ARCHIVE_THRESHOLD_EVENTS);
  
  results.push(archiveRowsIfNeeded_(SHEETS.INGEST_QUEUE, ingestThreshold));
  results.push(archiveRowsIfNeeded_(SHEETS.EVENTS, eventsThreshold));
  
  return results;
}

/**
 * Drive sharing audit - logs folders with sharing enabled
 */
function runDriveShareAudit_() {
  if (!cfg_('DRIVE_SHARE_AUDIT_ENABLED', DEFAULTS.DRIVE_SHARE_AUDIT_ENABLED)) return;
  
  const deals = getSheetData_(SHEETS.DEALS);
  for (const deal of deals) {
    if (!deal.doc_package_url) continue;
    const folderId = extractDriveId_(deal.doc_package_url);
    if (!folderId) continue;
    
    try {
      const folder = DriveApp.getFolderById(folderId);
      const access = folder.getSharingAccess();
      const permission = folder.getSharingPermission();
      const owner = folder.getOwner() ? folder.getOwner().getEmail() : '';
      const sharingState = access + ':' + permission;
      const issue = access !== DriveApp.Access.PRIVATE ? 'SHARING_ENABLED' : '';
      
      appendRow_(SHEETS.DRIVE_SHARE_AUDIT, {
        run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
        folder_id: folderId,
        owner_email: owner,
        sharing_state: sharingState,
        issue: issue
      });
    } catch (e) {
      Logger.log('DRIVE_AUDIT | Error: ' + e.message);
    }
  }
}

/**
 * Process Gmail signals based on label and subject
 * @param {string} label - Gmail label
 * @param {string} sinceIso - ISO timestamp to search after
 * @returns {Object} Result counts
 */
function processGmailSignals_(label, sinceIso) {
  const result = { scanned: 0, signals: 0, enqueued: 0 };
  const queryDate = sinceIso ? new Date(sinceIso) : null;
  const query = queryDate
    ? 'label:' + label + ' after:' + Math.floor(queryDate.getTime() / 1000)
    : 'label:' + label;
  
  const threads = GmailApp.search(query, 0, 50);
  for (const thread of threads) {
    result.scanned++;
    const messages = thread.getMessages();
    const latest = messages[messages.length - 1];
    const subject = latest.getSubject();
    const from = latest.getFrom();
    const emailMatch = String(from).match(/<([^>]+)>/);
    const email = emailMatch ? emailMatch[1] : from;
    const weight = subject.toLowerCase().includes('acil') ? 20 : 10;
    const messageId = latest.getId();
    
    QueueRepo.enqueue({
      ingest_type: INGEST_TYPES.GMAIL_SIGNAL,
      payload: {
        email: email,
        subject: subject,
        label: label,
        signal_type: 'GMAIL_LABEL:' + label,
        weight: weight
      },
      source: 'gmail',
      source_ref_id: thread.getId(),
      idempotency_key: 'gmail_signal:' + thread.getId() + ':' + messageId + ':' + label
    });
    
    result.enqueued++;
  }
  
  return result;
}

/**
 * Weekly KPI report job (manual trigger)
 */
function weekly_kpi_report_job() {
  if (!cfg_('WEEKLY_KPI_ENABLED', DEFAULTS.WEEKLY_KPI_ENABLED)) {
    return { skipped: true };
  }
  
  const recipients = cfg_('WEEKLY_KPI_RECIPIENTS', DEFAULTS.WEEKLY_KPI_RECIPIENTS);
  if (!recipients) return { skipped: true };
  
  const pipeline = DealsRepo.getPipelineSummary();
  const tasksDue = TasksRepo.getDueToday().length;
  const activeDeals = DealsRepo.getActive().length;
  const deals = getSheetData_(SHEETS.DEALS);
  const appointmentCount = deals.filter(deal => deal.stage === 'APPOINTMENT_SET').length;
  const offerCount = deals.filter(deal => deal.stage === 'OFFER').length;
  const closedCount = deals.filter(deal => deal.stage === 'CLOSED_WON').length;
  const attributed = deals.filter(deal => deal.utm_campaign || deal.gclid).length;
  
  const subject = 'Haftalık KPI Raporu';
  const body = [
    'Aktif deal sayısı: ' + activeDeals,
    'Bugün yapılacak task sayısı: ' + tasksDue,
    'Pipeline özeti: ' + JSON.stringify(pipeline),
    'KPI: Lead→Appointment=' + appointmentCount + ', Offer=' + offerCount + ', Close=' + closedCount,
    'Attribution bağlı lead sayısı: ' + attributed
  ].join('\n');
  
  GmailApp.sendEmail(recipients, subject, body);
  
  return { sent: true };
}

/**
 * Extract Drive ID from URL
 * @param {string} url - Drive URL
 * @returns {string|null} Drive ID
 */
function extractDriveId_(url) {
  if (!url) return null;
  const match = String(url).match(/[-\w]{25,}/);
  return match ? match[0] : null;
}
