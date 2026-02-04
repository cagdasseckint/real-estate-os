// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 18_Automations.gs
 * CB-OS V1.0 - 18_Automations.gs
// EXPLAIN: * Lead scoring, stage automations, follow-up sequences, docs packages,
 * Lead scoring, stage automations, follow-up sequences, docs packages,
// EXPLAIN: * email drafts, ops dashboards, and weekly KPI reporting.
 * email drafts, ops dashboards, and weekly KPI reporting.
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Record a lead signal entry for scoring
 * Record a lead signal entry for scoring
// EXPLAIN: * @param {Object} deal - Deal object
 * @param {Object} deal - Deal object
// EXPLAIN: * @param {Object} contact - Contact object
 * @param {Object} contact - Contact object
// EXPLAIN: * @param {string} signalType - Type of signal
 * @param {string} signalType - Type of signal
// EXPLAIN: * @param {string} source - Signal source
 * @param {string} source - Signal source
// EXPLAIN: * @param {number} weight - Signal weight
 * @param {number} weight - Signal weight
// EXPLAIN: * @param {string} signalValue - Additional value
 * @param {string} signalValue - Additional value
// EXPLAIN: */
 */
// EXPLAIN: function recordLeadSignal_(deal, contact, signalType, source, weight, signalValue) {
function recordLeadSignal_(deal, contact, signalType, source, weight, signalValue) {
// EXPLAIN: const signal = {
  const signal = {
// EXPLAIN: signal_id: id_(),
    signal_id: id_(),
// EXPLAIN: lead_id: deal ? deal.deal_id : '',
    lead_id: deal ? deal.deal_id : '',
// EXPLAIN: contact_id: contact ? contact.contact_id : '',
    contact_id: contact ? contact.contact_id : '',
// EXPLAIN: deal_id: deal ? deal.deal_id : '',
    deal_id: deal ? deal.deal_id : '',
// EXPLAIN: signal_type: signalType || '',
    signal_type: signalType || '',
// EXPLAIN: signal_value: signalValue || '',
    signal_value: signalValue || '',
// EXPLAIN: weight: weight || 0,
    weight: weight || 0,
// EXPLAIN: source: source || '',
    source: source || '',
// EXPLAIN: occurred_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
    occurred_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: appendRow_(SHEETS.LEAD_SIGNALS, signal);
  appendRow_(SHEETS.LEAD_SIGNALS, signal);
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Compute lead scores from signals and deal stage
 * Compute lead scores from signals and deal stage
// EXPLAIN: * @returns {Array<Object>} Lead scores
 * @returns {Array<Object>} Lead scores
// EXPLAIN: */
 */
// EXPLAIN: function computeLeadScores_() {
function computeLeadScores_() {
// EXPLAIN: const signals = getSheetData_(SHEETS.LEAD_SIGNALS);
  const signals = getSheetData_(SHEETS.LEAD_SIGNALS);
// EXPLAIN: const deals = DealsRepo.getActive();
  const deals = DealsRepo.getActive();
// EXPLAIN: const existingScores = getSheetData_(SHEETS.LEAD_SCORES);
  const existingScores = getSheetData_(SHEETS.LEAD_SCORES);
// EXPLAIN: const scoreMap = {};
  const scoreMap = {};
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const deal of deals) {
  for (const deal of deals) {
// EXPLAIN: scoreMap[deal.deal_id] = {
    scoreMap[deal.deal_id] = {
// EXPLAIN: lead_id: deal.deal_id,
      lead_id: deal.deal_id,
// EXPLAIN: contact_id: deal.contact_id,
      contact_id: deal.contact_id,
// EXPLAIN: deal_id: deal.deal_id,
      deal_id: deal.deal_id,
// EXPLAIN: score: 0,
      score: 0,
// EXPLAIN: breakdown: []
      breakdown: []
// EXPLAIN: };
    };
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const signal of signals) {
  for (const signal of signals) {
// EXPLAIN: const entry = scoreMap[signal.deal_id];
    const entry = scoreMap[signal.deal_id];
// EXPLAIN: if (!entry) continue;
    if (!entry) continue;
// EXPLAIN: entry.score += Number(signal.weight || 0);
    entry.score += Number(signal.weight || 0);
// EXPLAIN: entry.breakdown.push(signal.signal_type + ':' + signal.weight);
    entry.breakdown.push(signal.signal_type + ':' + signal.weight);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const deal of deals) {
  for (const deal of deals) {
// EXPLAIN: const entry = scoreMap[deal.deal_id];
    const entry = scoreMap[deal.deal_id];
// EXPLAIN: if (!entry) continue;
    if (!entry) continue;
// EXPLAIN: const stageBoost = deal.stage === 'NEW' ? 20 : deal.stage === 'QUALIFIED' ? 15 : 5;
    const stageBoost = deal.stage === 'NEW' ? 20 : deal.stage === 'QUALIFIED' ? 15 : 5;
// EXPLAIN: entry.score += stageBoost;
    entry.score += stageBoost;
// EXPLAIN: entry.breakdown.push('stage:' + stageBoost);
    entry.breakdown.push('stage:' + stageBoost);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const results = Object.values(scoreMap);
  const results = Object.values(scoreMap);
// EXPLAIN: for (const entry of results) {
  for (const entry of results) {
// EXPLAIN: const existing = existingScores.find(row => row.lead_id === entry.lead_id);
    const existing = existingScores.find(row => row.lead_id === entry.lead_id);
// EXPLAIN: const updates = {
    const updates = {
// EXPLAIN: lead_id: entry.lead_id,
      lead_id: entry.lead_id,
// EXPLAIN: contact_id: entry.contact_id,
      contact_id: entry.contact_id,
// EXPLAIN: deal_id: entry.deal_id,
      deal_id: entry.deal_id,
// EXPLAIN: score: entry.score,
      score: entry.score,
// EXPLAIN: score_breakdown: entry.breakdown.join('|'),
      score_breakdown: entry.breakdown.join('|'),
// EXPLAIN: updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
      updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
// EXPLAIN: };
    };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: if (existing) {
    if (existing) {
// EXPLAIN: updateRow_(SHEETS.LEAD_SCORES, existing._rowIndex, updates);
      updateRow_(SHEETS.LEAD_SCORES, existing._rowIndex, updates);
// EXPLAIN: } else {
    } else {
// EXPLAIN: appendRow_(SHEETS.LEAD_SCORES, updates);
      appendRow_(SHEETS.LEAD_SCORES, updates);
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return results;
  return results;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Create top follow-up tasks based on lead scores
 * Create top follow-up tasks based on lead scores
// EXPLAIN: * @param {Array<Object>} scores - Lead scores
 * @param {Array<Object>} scores - Lead scores
// EXPLAIN: */
 */
// EXPLAIN: function createTopFollowupTasks_(scores) {
function createTopFollowupTasks_(scores) {
// EXPLAIN: const topN = cfg_('LEAD_SCORE_TOP_N', DEFAULTS.LEAD_SCORE_TOP_N);
  const topN = cfg_('LEAD_SCORE_TOP_N', DEFAULTS.LEAD_SCORE_TOP_N);
// EXPLAIN: const minScore = cfg_('LEAD_SCORE_MIN_THRESHOLD', DEFAULTS.LEAD_SCORE_MIN_THRESHOLD);
  const minScore = cfg_('LEAD_SCORE_MIN_THRESHOLD', DEFAULTS.LEAD_SCORE_MIN_THRESHOLD);
// EXPLAIN: const sorted = scores
  const sorted = scores
// EXPLAIN: .filter(entry => entry.score >= minScore)
    .filter(entry => entry.score >= minScore)
// EXPLAIN: .sort((a, b) => b.score - a.score)
    .sort((a, b) => b.score - a.score)
// EXPLAIN: .slice(0, topN);
    .slice(0, topN);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const existing = TasksRepo.getPending().filter(task => task.title.indexOf('Top Lead Follow-up') === 0);
  const existing = TasksRepo.getPending().filter(task => task.title.indexOf('Top Lead Follow-up') === 0);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const entry of sorted) {
  for (const entry of sorted) {
// EXPLAIN: const alreadyExists = existing.some(task => task.entity_id === entry.deal_id);
    const alreadyExists = existing.some(task => task.entity_id === entry.deal_id);
// EXPLAIN: if (alreadyExists) continue;
    if (alreadyExists) continue;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: TasksRepo.create({
    TasksRepo.create({
// EXPLAIN: entity_type: 'DEAL',
      entity_type: 'DEAL',
// EXPLAIN: entity_id: entry.deal_id,
      entity_id: entry.deal_id,
// EXPLAIN: title: 'Top Lead Follow-up',
      title: 'Top Lead Follow-up',
// EXPLAIN: description: 'Skor: ' + entry.score,
      description: 'Skor: ' + entry.score,
// EXPLAIN: priority: 'high',
      priority: 'high',
// EXPLAIN: status: 'pending',
      status: 'pending',
// EXPLAIN: due_date: new Date().toISOString().split('T')[0]
      due_date: new Date().toISOString().split('T')[0]
// EXPLAIN: });
    });
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Schedule follow-up sequence for a deal/contact
 * Schedule follow-up sequence for a deal/contact
// EXPLAIN: * @param {Object} deal - Deal object
 * @param {Object} deal - Deal object
// EXPLAIN: * @param {Object} contact - Contact object
 * @param {Object} contact - Contact object
// EXPLAIN: */
 */
// EXPLAIN: function scheduleFollowupSequence_(deal, contact) {
function scheduleFollowupSequence_(deal, contact) {
// EXPLAIN: const sequences = getSheetData_(SHEETS.FOLLOWUP_SEQUENCES);
  const sequences = getSheetData_(SHEETS.FOLLOWUP_SEQUENCES);
// EXPLAIN: const matched = sequences.find(seq =>
  const matched = sequences.find(seq =>
// EXPLAIN: seq.enabled !== false &&
    seq.enabled !== false &&
// EXPLAIN: (seq.deal_type === deal.deal_type || seq.deal_type === '*' || !seq.deal_type) &&
    (seq.deal_type === deal.deal_type || seq.deal_type === '*' || !seq.deal_type) &&
// EXPLAIN: (seq.stage === deal.stage || seq.stage === '*' || !seq.stage)
    (seq.stage === deal.stage || seq.stage === '*' || !seq.stage)
// EXPLAIN: );
  );
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: let steps = [
  let steps = [
// EXPLAIN: { offset_days: 2, action: 'task', template: 'followup_48h' },
    { offset_days: 2, action: 'task', template: 'followup_48h' },
// EXPLAIN: { offset_days: 7, action: 'email', subject: 'Takip', body: 'Merhaba, tekrar iletişime geçiyorum.' },
    { offset_days: 7, action: 'email', subject: 'Takip', body: 'Merhaba, tekrar iletişime geçiyorum.' },
// EXPLAIN: { offset_days: 14, action: 'email', subject: 'Takip - 2', body: 'Merhaba, tekrar dönüş rica ederim.' }
    { offset_days: 14, action: 'email', subject: 'Takip - 2', body: 'Merhaba, tekrar dönüş rica ederim.' }
// EXPLAIN: ];
  ];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (matched && matched.steps_json) {
  if (matched && matched.steps_json) {
// EXPLAIN: const parsed = parseJsonSafe_(matched.steps_json);
    const parsed = parseJsonSafe_(matched.steps_json);
// EXPLAIN: if (parsed && Array.isArray(parsed)) steps = parsed;
    if (parsed && Array.isArray(parsed)) steps = parsed;
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const step of steps) {
  for (const step of steps) {
// EXPLAIN: const scheduled = new Date();
    const scheduled = new Date();
// EXPLAIN: scheduled.setDate(scheduled.getDate() + Number(step.offset_days || 0));
    scheduled.setDate(scheduled.getDate() + Number(step.offset_days || 0));
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: if (step.action === 'task') {
    if (step.action === 'task') {
// EXPLAIN: TasksRepo.createFromTemplate(step.template || 'followup_48h', {
      TasksRepo.createFromTemplate(step.template || 'followup_48h', {
// EXPLAIN: entity_type: 'DEAL',
        entity_type: 'DEAL',
// EXPLAIN: entity_id: deal.deal_id,
        entity_id: deal.deal_id,
// EXPLAIN: assigned_to: deal.assigned_to || ''
        assigned_to: deal.assigned_to || ''
// EXPLAIN: });
      });
// EXPLAIN: } else if (step.action === 'email') {
    } else if (step.action === 'email') {
// EXPLAIN: createEmailDraft_({
      createEmailDraft_({
// EXPLAIN: contact_id: contact.contact_id,
        contact_id: contact.contact_id,
// EXPLAIN: deal_id: deal.deal_id,
        deal_id: deal.deal_id,
// EXPLAIN: to: contact.email,
        to: contact.email,
// EXPLAIN: subject: step.subject || 'Takip',
        subject: step.subject || 'Takip',
// EXPLAIN: body: step.body || '',
        body: step.body || '',
// EXPLAIN: scheduled_for: scheduled.toISOString()
        scheduled_for: scheduled.toISOString()
// EXPLAIN: });
      });
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: EventsRepo.append({
    EventsRepo.append({
// EXPLAIN: entity_type: 'DEAL',
      entity_type: 'DEAL',
// EXPLAIN: entity_id: deal.deal_id,
      entity_id: deal.deal_id,
// EXPLAIN: event_type: EventsRepo.EVENT_TYPES.FOLLOWUP_SCHEDULED,
      event_type: EventsRepo.EVENT_TYPES.FOLLOWUP_SCHEDULED,
// EXPLAIN: payload: { step: step, scheduled_for: scheduled.toISOString() },
      payload: { step: step, scheduled_for: scheduled.toISOString() },
// EXPLAIN: source: 'system',
      source: 'system',
// EXPLAIN: idempotency_key: deal.deal_id + '_followup_' + scheduled.getTime()
      idempotency_key: deal.deal_id + '_followup_' + scheduled.getTime()
// EXPLAIN: });
    });
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Apply stage automations when deal stage changes
 * Apply stage automations when deal stage changes
// EXPLAIN: * @param {Object} deal - Deal object
 * @param {Object} deal - Deal object
// EXPLAIN: * @param {string} oldStage - Previous stage
 * @param {string} oldStage - Previous stage
// EXPLAIN: * @param {string} newStage - New stage
 * @param {string} newStage - New stage
// EXPLAIN: */
 */
// EXPLAIN: function applyStageAutomations_(deal, oldStage, newStage) {
function applyStageAutomations_(deal, oldStage, newStage) {
// EXPLAIN: const automations = getSheetData_(SHEETS.STAGE_AUTOMATIONS);
  const automations = getSheetData_(SHEETS.STAGE_AUTOMATIONS);
// EXPLAIN: const contact = ContactsRepo.findById(deal.contact_id);
  const contact = ContactsRepo.findById(deal.contact_id);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const rule of automations) {
  for (const rule of automations) {
// EXPLAIN: const matchType = !rule.deal_type || rule.deal_type === '*' || rule.deal_type === deal.deal_type;
    const matchType = !rule.deal_type || rule.deal_type === '*' || rule.deal_type === deal.deal_type;
// EXPLAIN: const matchFrom = !rule.from_stage || rule.from_stage === '*' || rule.from_stage === oldStage;
    const matchFrom = !rule.from_stage || rule.from_stage === '*' || rule.from_stage === oldStage;
// EXPLAIN: const matchTo = !rule.to_stage || rule.to_stage === '*' || rule.to_stage === newStage;
    const matchTo = !rule.to_stage || rule.to_stage === '*' || rule.to_stage === newStage;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: if (!matchType || !matchFrom || !matchTo) continue;
    if (!matchType || !matchFrom || !matchTo) continue;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const actionType = rule.action_type;
    const actionType = rule.action_type;
// EXPLAIN: const config = parseJsonSafe_(rule.action_config) || {};
    const config = parseJsonSafe_(rule.action_config) || {};
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: if (actionType === 'TASK_TEMPLATE') {
    if (actionType === 'TASK_TEMPLATE') {
// EXPLAIN: const templates = config.templates || [rule.task_template_id].filter(Boolean);
      const templates = config.templates || [rule.task_template_id].filter(Boolean);
// EXPLAIN: for (const templateId of templates) {
      for (const templateId of templates) {
// EXPLAIN: TasksRepo.createFromTemplate(templateId, {
        TasksRepo.createFromTemplate(templateId, {
// EXPLAIN: entity_type: 'DEAL',
          entity_type: 'DEAL',
// EXPLAIN: entity_id: deal.deal_id,
          entity_id: deal.deal_id,
// EXPLAIN: assigned_to: deal.assigned_to || ''
          assigned_to: deal.assigned_to || ''
// EXPLAIN: });
        });
// EXPLAIN: }
      }
// EXPLAIN: } else if (actionType === 'EMAIL_DRAFT') {
    } else if (actionType === 'EMAIL_DRAFT') {
// EXPLAIN: createEmailDraft_({
      createEmailDraft_({
// EXPLAIN: contact_id: deal.contact_id,
        contact_id: deal.contact_id,
// EXPLAIN: deal_id: deal.deal_id,
        deal_id: deal.deal_id,
// EXPLAIN: to: contact ? contact.email : '',
        to: contact ? contact.email : '',
// EXPLAIN: subject: config.subject || 'Takip',
        subject: config.subject || 'Takip',
// EXPLAIN: body: config.body || '',
        body: config.body || '',
// EXPLAIN: scheduled_for: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
        scheduled_for: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
// EXPLAIN: });
      });
// EXPLAIN: } else if (actionType === 'FOLLOWUP_SEQUENCE') {
    } else if (actionType === 'FOLLOWUP_SEQUENCE') {
// EXPLAIN: if (contact) scheduleFollowupSequence_(deal, contact);
      if (contact) scheduleFollowupSequence_(deal, contact);
// EXPLAIN: } else if (actionType === 'DOC_TEMPLATE') {
    } else if (actionType === 'DOC_TEMPLATE') {
// EXPLAIN: generateDocFromTemplate_(config.template_id, deal, config.output_folder_id);
      generateDocFromTemplate_(config.template_id, deal, config.output_folder_id);
// EXPLAIN: } else if (actionType === 'CLOSE_CHECKLIST') {
    } else if (actionType === 'CLOSE_CHECKLIST') {
// EXPLAIN: TasksRepo.createFromTemplate('close_checklist', {
      TasksRepo.createFromTemplate('close_checklist', {
// EXPLAIN: entity_type: 'DEAL',
        entity_type: 'DEAL',
// EXPLAIN: entity_id: deal.deal_id,
        entity_id: deal.deal_id,
// EXPLAIN: assigned_to: deal.assigned_to || ''
        assigned_to: deal.assigned_to || ''
// EXPLAIN: });
      });
// EXPLAIN: } else if (actionType === 'WINBACK_SEQUENCE') {
    } else if (actionType === 'WINBACK_SEQUENCE') {
// EXPLAIN: if (contact) scheduleWinbackSequence_(deal, contact);
      if (contact) scheduleWinbackSequence_(deal, contact);
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (cfg_('CLOSE_CHECKLIST_ENABLED', DEFAULTS.CLOSE_CHECKLIST_ENABLED) &&
  if (cfg_('CLOSE_CHECKLIST_ENABLED', DEFAULTS.CLOSE_CHECKLIST_ENABLED) &&
// EXPLAIN: (newStage === 'CONTRACT' || newStage === 'CLOSED_WON')) {
      (newStage === 'CONTRACT' || newStage === 'CLOSED_WON')) {
// EXPLAIN: TasksRepo.createFromTemplate('close_checklist', {
    TasksRepo.createFromTemplate('close_checklist', {
// EXPLAIN: entity_type: 'DEAL',
      entity_type: 'DEAL',
// EXPLAIN: entity_id: deal.deal_id,
      entity_id: deal.deal_id,
// EXPLAIN: assigned_to: deal.assigned_to || ''
      assigned_to: deal.assigned_to || ''
// EXPLAIN: });
    });
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (cfg_('WINBACK_ENABLED', DEFAULTS.WINBACK_ENABLED) && newStage === 'CLOSED_LOST' && contact) {
  if (cfg_('WINBACK_ENABLED', DEFAULTS.WINBACK_ENABLED) && newStage === 'CLOSED_LOST' && contact) {
// EXPLAIN: scheduleWinbackSequence_(deal, contact);
    scheduleWinbackSequence_(deal, contact);
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Get SLA days for a stage from STAGE_AUTOMATIONS
 * Get SLA days for a stage from STAGE_AUTOMATIONS
// EXPLAIN: * @param {string} dealType - Deal type
 * @param {string} dealType - Deal type
// EXPLAIN: * @param {string} stage - Stage name
 * @param {string} stage - Stage name
// EXPLAIN: * @returns {number|null} SLA days
 * @returns {number|null} SLA days
// EXPLAIN: */
 */
// EXPLAIN: function getStageSlaDays_(dealType, stage) {
function getStageSlaDays_(dealType, stage) {
// EXPLAIN: const automations = getSheetData_(SHEETS.STAGE_AUTOMATIONS);
  const automations = getSheetData_(SHEETS.STAGE_AUTOMATIONS);
// EXPLAIN: const match = automations.find(rule =>
  const match = automations.find(rule =>
// EXPLAIN: rule.deal_type === dealType &&
    rule.deal_type === dealType &&
// EXPLAIN: (rule.to_stage === stage || rule.from_stage === stage) &&
    (rule.to_stage === stage || rule.from_stage === stage) &&
// EXPLAIN: rule.sla_days
    rule.sla_days
// EXPLAIN: );
  );
// EXPLAIN: return match ? Number(match.sla_days) : null;
  return match ? Number(match.sla_days) : null;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Create Gmail draft record (and optionally Gmail draft)
 * Create Gmail draft record (and optionally Gmail draft)
// EXPLAIN: * @param {Object} data - Draft data
 * @param {Object} data - Draft data
// EXPLAIN: * @returns {Object} Draft record
 * @returns {Object} Draft record
// EXPLAIN: */
 */
// EXPLAIN: function createEmailDraft_(data) {
function createEmailDraft_(data) {
// EXPLAIN: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: let taskId = data.task_id || '';
  let taskId = data.task_id || '';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (!taskId) {
  if (!taskId) {
// EXPLAIN: const task = TasksRepo.create({
    const task = TasksRepo.create({
// EXPLAIN: entity_type: 'DEAL',
      entity_type: 'DEAL',
// EXPLAIN: entity_id: data.deal_id || '',
      entity_id: data.deal_id || '',
// EXPLAIN: title: 'Review & Send Draft',
      title: 'Review & Send Draft',
// EXPLAIN: description: data.subject || 'Email draft review',
      description: data.subject || 'Email draft review',
// EXPLAIN: priority: 'medium',
      priority: 'medium',
// EXPLAIN: status: 'pending',
      status: 'pending',
// EXPLAIN: due_date: data.scheduled_for ? new Date(data.scheduled_for).toISOString().split('T')[0] : ''
      due_date: data.scheduled_for ? new Date(data.scheduled_for).toISOString().split('T')[0] : ''
// EXPLAIN: });
    });
// EXPLAIN: taskId = task ? task.task_id : '';
    taskId = task ? task.task_id : '';
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const draft = {
  const draft = {
// EXPLAIN: draft_id: id_(),
    draft_id: id_(),
// EXPLAIN: created_at: now,
    created_at: now,
// EXPLAIN: updated_at: now,
    updated_at: now,
// EXPLAIN: contact_id: data.contact_id || '',
    contact_id: data.contact_id || '',
// EXPLAIN: deal_id: data.deal_id || '',
    deal_id: data.deal_id || '',
// EXPLAIN: to: data.to || '',
    to: data.to || '',
// EXPLAIN: subject: data.subject || '',
    subject: data.subject || '',
// EXPLAIN: body: data.body || '',
    body: data.body || '',
// EXPLAIN: status: 'queued',
    status: 'queued',
// EXPLAIN: gmail_draft_id: '',
    gmail_draft_id: '',
// EXPLAIN: task_id: taskId,
    task_id: taskId,
// EXPLAIN: scheduled_for: data.scheduled_for || now
    scheduled_for: data.scheduled_for || now
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const rowNum = appendRow_(SHEETS.EMAIL_DRAFTS, draft);
  const rowNum = appendRow_(SHEETS.EMAIL_DRAFTS, draft);
// EXPLAIN: draft._rowIndex = rowNum;
  draft._rowIndex = rowNum;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return draft;
  return draft;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Process queued email drafts and create Gmail drafts
 * Process queued email drafts and create Gmail drafts
// EXPLAIN: * @returns {Object} result
 * @returns {Object} result
// EXPLAIN: */
 */
// EXPLAIN: function processEmailDraftQueue_() {
function processEmailDraftQueue_() {
// EXPLAIN: const result = { drafted: 0, skipped: 0, errors: 0 };
  const result = { drafted: 0, skipped: 0, errors: 0 };
// EXPLAIN: if (!cfg_('EMAIL_DRAFTS_ENABLED', DEFAULTS.EMAIL_DRAFTS_ENABLED)) return result;
  if (!cfg_('EMAIL_DRAFTS_ENABLED', DEFAULTS.EMAIL_DRAFTS_ENABLED)) return result;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const drafts = getSheetData_(SHEETS.EMAIL_DRAFTS);
  const drafts = getSheetData_(SHEETS.EMAIL_DRAFTS);
// EXPLAIN: const now = new Date();
  const now = new Date();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const draft of drafts) {
  for (const draft of drafts) {
// EXPLAIN: if (draft.status !== 'queued') continue;
    if (draft.status !== 'queued') continue;
// EXPLAIN: if (draft.scheduled_for && new Date(draft.scheduled_for) > now) {
    if (draft.scheduled_for && new Date(draft.scheduled_for) > now) {
// EXPLAIN: result.skipped++;
      result.skipped++;
// EXPLAIN: continue;
      continue;
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: try {
    try {
// EXPLAIN: const gmailDraft = GmailApp.createDraft(draft.to, draft.subject, draft.body);
      const gmailDraft = GmailApp.createDraft(draft.to, draft.subject, draft.body);
// EXPLAIN: updateRow_(SHEETS.EMAIL_DRAFTS, draft._rowIndex, {
      updateRow_(SHEETS.EMAIL_DRAFTS, draft._rowIndex, {
// EXPLAIN: status: 'drafted',
        status: 'drafted',
// EXPLAIN: gmail_draft_id: gmailDraft.getId(),
        gmail_draft_id: gmailDraft.getId(),
// EXPLAIN: updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
        updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
// EXPLAIN: });
      });
// EXPLAIN: result.drafted++;
      result.drafted++;
// EXPLAIN: } catch (e) {
    } catch (e) {
// EXPLAIN: updateRow_(SHEETS.EMAIL_DRAFTS, draft._rowIndex, {
      updateRow_(SHEETS.EMAIL_DRAFTS, draft._rowIndex, {
// EXPLAIN: status: 'error',
        status: 'error',
// EXPLAIN: updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
        updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
// EXPLAIN: });
      });
// EXPLAIN: result.errors++;
      result.errors++;
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return result;
  return result;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Create Docs package for deal based on DOC_PACKAGES
 * Create Docs package for deal based on DOC_PACKAGES
// EXPLAIN: * @param {Object} deal - Deal data
 * @param {Object} deal - Deal data
// EXPLAIN: * @returns {Object|null} Package info
 * @returns {Object|null} Package info
// EXPLAIN: */
 */
// EXPLAIN: function createDocsPackageForDeal_(deal) {
function createDocsPackageForDeal_(deal) {
// EXPLAIN: const packages = getSheetData_(SHEETS.DOC_PACKAGES);
  const packages = getSheetData_(SHEETS.DOC_PACKAGES);
// EXPLAIN: const match = packages.find(row => row.deal_type === deal.deal_type);
  const match = packages.find(row => row.deal_type === deal.deal_type);
// EXPLAIN: if (!match || !match.template_folder_id) return null;
  if (!match || !match.template_folder_id) return null;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: const templateFolder = DriveApp.getFolderById(match.template_folder_id);
    const templateFolder = DriveApp.getFolderById(match.template_folder_id);
// EXPLAIN: const packageName = match.package_name || ('Deal_' + deal.deal_id);
    const packageName = match.package_name || ('Deal_' + deal.deal_id);
// EXPLAIN: const targetFolder = DriveApp.createFolder(packageName);
    const targetFolder = DriveApp.createFolder(packageName);
// EXPLAIN: const files = templateFolder.getFiles();
    const files = templateFolder.getFiles();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: while (files.hasNext()) {
    while (files.hasNext()) {
// EXPLAIN: const file = files.next();
      const file = files.next();
// EXPLAIN: file.makeCopy(file.getName(), targetFolder);
      file.makeCopy(file.getName(), targetFolder);
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const url = targetFolder.getUrl();
    const url = targetFolder.getUrl();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: appendRow_(SHEETS.DOCS, {
    appendRow_(SHEETS.DOCS, {
// EXPLAIN: doc_id: id_(),
      doc_id: id_(),
// EXPLAIN: created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
      created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: entity_type: 'DEAL',
      entity_type: 'DEAL',
// EXPLAIN: entity_id: deal.deal_id,
      entity_id: deal.deal_id,
// EXPLAIN: doc_type: 'PACKAGE',
      doc_type: 'PACKAGE',
// EXPLAIN: doc_url: url,
      doc_url: url,
// EXPLAIN: status: 'created',
      status: 'created',
// EXPLAIN: signed_at: '',
      signed_at: '',
// EXPLAIN: notes: 'Auto package'
      notes: 'Auto package'
// EXPLAIN: });
    });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return { folder_id: targetFolder.getId(), url: url };
    return { folder_id: targetFolder.getId(), url: url };
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: Logger.log('DOC_PACKAGE | Error: ' + e.message);
    Logger.log('DOC_PACKAGE | Error: ' + e.message);
// EXPLAIN: return null;
    return null;
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Generate Doc from template with placeholders
 * Generate Doc from template with placeholders
// EXPLAIN: * @param {string} templateId - Template doc ID
 * @param {string} templateId - Template doc ID
// EXPLAIN: * @param {Object} data - Data map
 * @param {Object} data - Data map
// EXPLAIN: * @param {string} outputFolderId - Output folder ID
 * @param {string} outputFolderId - Output folder ID
// EXPLAIN: * @returns {Object|null} Doc info
 * @returns {Object|null} Doc info
// EXPLAIN: */
 */
// EXPLAIN: function generateDocFromTemplate_(templateId, data, outputFolderId) {
function generateDocFromTemplate_(templateId, data, outputFolderId) {
// EXPLAIN: if (!templateId) return null;
  if (!templateId) return null;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const outputFolder = outputFolderId
  const outputFolder = outputFolderId
// EXPLAIN: ? DriveApp.getFolderById(outputFolderId)
    ? DriveApp.getFolderById(outputFolderId)
// EXPLAIN: : (cfg_('DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID)
    : (cfg_('DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID)
// EXPLAIN: ? DriveApp.getFolderById(cfg_('DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID))
        ? DriveApp.getFolderById(cfg_('DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID))
// EXPLAIN: : DriveApp.getRootFolder());
        : DriveApp.getRootFolder());
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const templateFile = DriveApp.getFileById(templateId);
  const templateFile = DriveApp.getFileById(templateId);
// EXPLAIN: const copy = templateFile.makeCopy(templateFile.getName() + ' - ' + data.deal_id, outputFolder);
  const copy = templateFile.makeCopy(templateFile.getName() + ' - ' + data.deal_id, outputFolder);
// EXPLAIN: const doc = DocumentApp.openById(copy.getId());
  const doc = DocumentApp.openById(copy.getId());
// EXPLAIN: const body = doc.getBody();
  const body = doc.getBody();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const [key, value] of Object.entries(data || {})) {
  for (const [key, value] of Object.entries(data || {})) {
// EXPLAIN: body.replaceText('{{' + key + '}}', String(value || ''));
    body.replaceText('{{' + key + '}}', String(value || ''));
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: doc.saveAndClose();
  doc.saveAndClose();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: appendRow_(SHEETS.DOCS, {
  appendRow_(SHEETS.DOCS, {
// EXPLAIN: doc_id: id_(),
    doc_id: id_(),
// EXPLAIN: created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: entity_type: 'DEAL',
    entity_type: 'DEAL',
// EXPLAIN: entity_id: data.deal_id || '',
    entity_id: data.deal_id || '',
// EXPLAIN: doc_type: 'TEMPLATE_OUTPUT',
    doc_type: 'TEMPLATE_OUTPUT',
// EXPLAIN: doc_url: copy.getUrl(),
    doc_url: copy.getUrl(),
// EXPLAIN: status: 'generated',
    status: 'generated',
// EXPLAIN: signed_at: '',
    signed_at: '',
// EXPLAIN: notes: 'Template output'
    notes: 'Template output'
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return { doc_id: copy.getId(), url: copy.getUrl() };
  return { doc_id: copy.getId(), url: copy.getUrl() };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Schedule win-back sequence for lost deals (30/60/90 days)
 * Schedule win-back sequence for lost deals (30/60/90 days)
// EXPLAIN: * @param {Object} deal - Deal object
 * @param {Object} deal - Deal object
// EXPLAIN: * @param {Object} contact - Contact object
 * @param {Object} contact - Contact object
// EXPLAIN: */
 */
// EXPLAIN: function scheduleWinbackSequence_(deal, contact) {
function scheduleWinbackSequence_(deal, contact) {
// EXPLAIN: const offsets = [30, 60, 90];
  const offsets = [30, 60, 90];
// EXPLAIN: for (const days of offsets) {
  for (const days of offsets) {
// EXPLAIN: const scheduled = new Date();
    const scheduled = new Date();
// EXPLAIN: scheduled.setDate(scheduled.getDate() + days);
    scheduled.setDate(scheduled.getDate() + days);
// EXPLAIN: createEmailDraft_({
    createEmailDraft_({
// EXPLAIN: contact_id: contact.contact_id,
      contact_id: contact.contact_id,
// EXPLAIN: deal_id: deal.deal_id,
      deal_id: deal.deal_id,
// EXPLAIN: to: contact.email,
      to: contact.email,
// EXPLAIN: subject: 'Tekrar görüşelim',
      subject: 'Tekrar görüşelim',
// EXPLAIN: body: 'Merhaba, ilerlemek isterseniz destek olmaya hazırız.',
      body: 'Merhaba, ilerlemek isterseniz destek olmaya hazırız.',
// EXPLAIN: scheduled_for: scheduled.toISOString()
      scheduled_for: scheduled.toISOString()
// EXPLAIN: });
    });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: TasksRepo.create({
    TasksRepo.create({
// EXPLAIN: entity_type: 'DEAL',
      entity_type: 'DEAL',
// EXPLAIN: entity_id: deal.deal_id,
      entity_id: deal.deal_id,
// EXPLAIN: title: 'Win-back takip (' + days + 'g)',
      title: 'Win-back takip (' + days + 'g)',
// EXPLAIN: description: 'CLOSED_LOST win-back follow-up',
      description: 'CLOSED_LOST win-back follow-up',
// EXPLAIN: priority: 'medium',
      priority: 'medium',
// EXPLAIN: status: 'pending',
      status: 'pending',
// EXPLAIN: due_date: scheduled.toISOString().split('T')[0]
      due_date: scheduled.toISOString().split('T')[0]
// EXPLAIN: });
    });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: EventsRepo.append({
    EventsRepo.append({
// EXPLAIN: entity_type: 'DEAL',
      entity_type: 'DEAL',
// EXPLAIN: entity_id: deal.deal_id,
      entity_id: deal.deal_id,
// EXPLAIN: event_type: EventsRepo.EVENT_TYPES.WINBACK_SCHEDULED,
      event_type: EventsRepo.EVENT_TYPES.WINBACK_SCHEDULED,
// EXPLAIN: payload: { days: days, scheduled_for: scheduled.toISOString() },
      payload: { days: days, scheduled_for: scheduled.toISOString() },
// EXPLAIN: source: 'system',
      source: 'system',
// EXPLAIN: idempotency_key: deal.deal_id + '_winback_' + days
      idempotency_key: deal.deal_id + '_winback_' + days
// EXPLAIN: });
    });
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Update ops dashboard snapshot
 * Update ops dashboard snapshot
// EXPLAIN: */
 */
// EXPLAIN: function updateOpsDashboard_() {
function updateOpsDashboard_() {
// EXPLAIN: const ingestPending = QueueRepo.getPending().length;
  const ingestPending = QueueRepo.getPending().length;
// EXPLAIN: const dlqCount = getSheetData_(SHEETS.DLQ).length;
  const dlqCount = getSheetData_(SHEETS.DLQ).length;
// EXPLAIN: const totalIngest = getSheetData_(SHEETS.INGEST_QUEUE).length;
  const totalIngest = getSheetData_(SHEETS.INGEST_QUEUE).length;
// EXPLAIN: const errorRate = totalIngest > 0 ? (dlqCount / totalIngest) : 0;
  const errorRate = totalIngest > 0 ? (dlqCount / totalIngest) : 0;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const cursor = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);
  const cursor = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);
// EXPLAIN: let cursorDriftMinutes = 0;
  let cursorDriftMinutes = 0;
// EXPLAIN: if (cursor) {
  if (cursor) {
// EXPLAIN: const cursorDate = new Date(cursor);
    const cursorDate = new Date(cursor);
// EXPLAIN: cursorDriftMinutes = Math.round((Date.now() - cursorDate.getTime()) / 60000);
    cursorDriftMinutes = Math.round((Date.now() - cursorDate.getTime()) / 60000);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: appendRow_(SHEETS.OPS_DASHBOARD, {
  appendRow_(SHEETS.OPS_DASHBOARD, {
// EXPLAIN: run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: ingest_pending: ingestPending,
    ingest_pending: ingestPending,
// EXPLAIN: dlq_count: dlqCount,
    dlq_count: dlqCount,
// EXPLAIN: error_rate: errorRate,
    error_rate: errorRate,
// EXPLAIN: cursor_drift_minutes: cursorDriftMinutes
    cursor_drift_minutes: cursorDriftMinutes
// EXPLAIN: });
  });
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Drive sharing audit - logs folders with sharing enabled
 * Drive sharing audit - logs folders with sharing enabled
// EXPLAIN: */
 */
// EXPLAIN: function runDriveShareAudit_() {
function runDriveShareAudit_() {
// EXPLAIN: if (!cfg_('DRIVE_SHARE_AUDIT_ENABLED', DEFAULTS.DRIVE_SHARE_AUDIT_ENABLED)) return;
  if (!cfg_('DRIVE_SHARE_AUDIT_ENABLED', DEFAULTS.DRIVE_SHARE_AUDIT_ENABLED)) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const deals = getSheetData_(SHEETS.DEALS);
  const deals = getSheetData_(SHEETS.DEALS);
// EXPLAIN: for (const deal of deals) {
  for (const deal of deals) {
// EXPLAIN: if (!deal.doc_package_url) continue;
    if (!deal.doc_package_url) continue;
// EXPLAIN: const folderId = extractDriveId_(deal.doc_package_url);
    const folderId = extractDriveId_(deal.doc_package_url);
// EXPLAIN: if (!folderId) continue;
    if (!folderId) continue;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: try {
    try {
// EXPLAIN: const folder = DriveApp.getFolderById(folderId);
      const folder = DriveApp.getFolderById(folderId);
// EXPLAIN: const access = folder.getSharingAccess();
      const access = folder.getSharingAccess();
// EXPLAIN: const permission = folder.getSharingPermission();
      const permission = folder.getSharingPermission();
// EXPLAIN: const owner = folder.getOwner() ? folder.getOwner().getEmail() : '';
      const owner = folder.getOwner() ? folder.getOwner().getEmail() : '';
// EXPLAIN: const sharingState = access + ':' + permission;
      const sharingState = access + ':' + permission;
// EXPLAIN: const issue = access !== DriveApp.Access.PRIVATE ? 'SHARING_ENABLED' : '';
      const issue = access !== DriveApp.Access.PRIVATE ? 'SHARING_ENABLED' : '';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: appendRow_(SHEETS.DRIVE_SHARE_AUDIT, {
      appendRow_(SHEETS.DRIVE_SHARE_AUDIT, {
// EXPLAIN: run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
        run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: folder_id: folderId,
        folder_id: folderId,
// EXPLAIN: owner_email: owner,
        owner_email: owner,
// EXPLAIN: sharing_state: sharingState,
        sharing_state: sharingState,
// EXPLAIN: issue: issue
        issue: issue
// EXPLAIN: });
      });
// EXPLAIN: } catch (e) {
    } catch (e) {
// EXPLAIN: Logger.log('DRIVE_AUDIT | Error: ' + e.message);
      Logger.log('DRIVE_AUDIT | Error: ' + e.message);
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Process Gmail signals based on label and subject
 * Process Gmail signals based on label and subject
// EXPLAIN: * @param {string} label - Gmail label
 * @param {string} label - Gmail label
// EXPLAIN: * @param {string} sinceIso - ISO timestamp to search after
 * @param {string} sinceIso - ISO timestamp to search after
// EXPLAIN: * @returns {Object} Result counts
 * @returns {Object} Result counts
// EXPLAIN: */
 */
// EXPLAIN: function processGmailSignals_(label, sinceIso) {
function processGmailSignals_(label, sinceIso) {
// EXPLAIN: const result = { scanned: 0, signals: 0, enqueued: 0 };
  const result = { scanned: 0, signals: 0, enqueued: 0 };
// EXPLAIN: const queryDate = sinceIso ? new Date(sinceIso) : null;
  const queryDate = sinceIso ? new Date(sinceIso) : null;
// EXPLAIN: const query = queryDate
  const query = queryDate
// EXPLAIN: ? 'label:' + label + ' after:' + Math.floor(queryDate.getTime() / 1000)
    ? 'label:' + label + ' after:' + Math.floor(queryDate.getTime() / 1000)
// EXPLAIN: : 'label:' + label;
    : 'label:' + label;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const threads = GmailApp.search(query, 0, 50);
  const threads = GmailApp.search(query, 0, 50);
// EXPLAIN: for (const thread of threads) {
  for (const thread of threads) {
// EXPLAIN: result.scanned++;
    result.scanned++;
// EXPLAIN: const messages = thread.getMessages();
    const messages = thread.getMessages();
// EXPLAIN: const latest = messages[messages.length - 1];
    const latest = messages[messages.length - 1];
// EXPLAIN: const subject = latest.getSubject();
    const subject = latest.getSubject();
// EXPLAIN: const from = latest.getFrom();
    const from = latest.getFrom();
// EXPLAIN: const emailMatch = String(from).match(/<([^>]+)>/);
    const emailMatch = String(from).match(/<([^>]+)>/);
// EXPLAIN: const email = emailMatch ? emailMatch[1] : from;
    const email = emailMatch ? emailMatch[1] : from;
// EXPLAIN: const weight = subject.toLowerCase().includes('acil') ? 20 : 10;
    const weight = subject.toLowerCase().includes('acil') ? 20 : 10;
// EXPLAIN: const messageId = latest.getId();
    const messageId = latest.getId();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: QueueRepo.enqueue({
    QueueRepo.enqueue({
// EXPLAIN: ingest_type: INGEST_TYPES.GMAIL_SIGNAL,
      ingest_type: INGEST_TYPES.GMAIL_SIGNAL,
// EXPLAIN: payload: {
      payload: {
// EXPLAIN: email: email,
        email: email,
// EXPLAIN: subject: subject,
        subject: subject,
// EXPLAIN: label: label,
        label: label,
// EXPLAIN: signal_type: 'GMAIL_LABEL:' + label,
        signal_type: 'GMAIL_LABEL:' + label,
// EXPLAIN: weight: weight
        weight: weight
// EXPLAIN: },
      },
// EXPLAIN: source: 'gmail',
      source: 'gmail',
// EXPLAIN: source_ref_id: thread.getId(),
      source_ref_id: thread.getId(),
// EXPLAIN: idempotency_key: 'gmail_signal:' + thread.getId() + ':' + messageId + ':' + label
      idempotency_key: 'gmail_signal:' + thread.getId() + ':' + messageId + ':' + label
// EXPLAIN: });
    });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: result.enqueued++;
    result.enqueued++;
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return result;
  return result;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Weekly KPI report job (manual trigger)
 * Weekly KPI report job (manual trigger)
// EXPLAIN: */
 */
// EXPLAIN: function weekly_kpi_report_job() {
function weekly_kpi_report_job() {
// EXPLAIN: if (!cfg_('WEEKLY_KPI_ENABLED', DEFAULTS.WEEKLY_KPI_ENABLED)) {
  if (!cfg_('WEEKLY_KPI_ENABLED', DEFAULTS.WEEKLY_KPI_ENABLED)) {
// EXPLAIN: return { skipped: true };
    return { skipped: true };
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const recipients = cfg_('WEEKLY_KPI_RECIPIENTS', DEFAULTS.WEEKLY_KPI_RECIPIENTS);
  const recipients = cfg_('WEEKLY_KPI_RECIPIENTS', DEFAULTS.WEEKLY_KPI_RECIPIENTS);
// EXPLAIN: if (!recipients) return { skipped: true };
  if (!recipients) return { skipped: true };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const pipeline = DealsRepo.getPipelineSummary();
  const pipeline = DealsRepo.getPipelineSummary();
// EXPLAIN: const tasksDue = TasksRepo.getDueToday().length;
  const tasksDue = TasksRepo.getDueToday().length;
// EXPLAIN: const activeDeals = DealsRepo.getActive().length;
  const activeDeals = DealsRepo.getActive().length;
// EXPLAIN: const deals = getSheetData_(SHEETS.DEALS);
  const deals = getSheetData_(SHEETS.DEALS);
// EXPLAIN: const appointmentCount = deals.filter(deal => deal.stage === 'APPOINTMENT_SET').length;
  const appointmentCount = deals.filter(deal => deal.stage === 'APPOINTMENT_SET').length;
// EXPLAIN: const offerCount = deals.filter(deal => deal.stage === 'OFFER').length;
  const offerCount = deals.filter(deal => deal.stage === 'OFFER').length;
// EXPLAIN: const closedCount = deals.filter(deal => deal.stage === 'CLOSED_WON').length;
  const closedCount = deals.filter(deal => deal.stage === 'CLOSED_WON').length;
// EXPLAIN: const attributed = deals.filter(deal => deal.utm_campaign || deal.gclid).length;
  const attributed = deals.filter(deal => deal.utm_campaign || deal.gclid).length;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const subject = 'Haftalık KPI Raporu';
  const subject = 'Haftalık KPI Raporu';
// EXPLAIN: const body = [
  const body = [
// EXPLAIN: 'Aktif deal sayısı: ' + activeDeals,
    'Aktif deal sayısı: ' + activeDeals,
// EXPLAIN: 'Bugün yapılacak task sayısı: ' + tasksDue,
    'Bugün yapılacak task sayısı: ' + tasksDue,
// EXPLAIN: 'Pipeline özeti: ' + JSON.stringify(pipeline),
    'Pipeline özeti: ' + JSON.stringify(pipeline),
// EXPLAIN: 'KPI: Lead→Appointment=' + appointmentCount + ', Offer=' + offerCount + ', Close=' + closedCount,
    'KPI: Lead→Appointment=' + appointmentCount + ', Offer=' + offerCount + ', Close=' + closedCount,
// EXPLAIN: 'Attribution bağlı lead sayısı: ' + attributed
    'Attribution bağlı lead sayısı: ' + attributed
// EXPLAIN: ].join('\n');
  ].join('\n');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: GmailApp.sendEmail(recipients, subject, body);
  GmailApp.sendEmail(recipients, subject, body);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return { sent: true };
  return { sent: true };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Extract Drive ID from URL
 * Extract Drive ID from URL
// EXPLAIN: * @param {string} url - Drive URL
 * @param {string} url - Drive URL
// EXPLAIN: * @returns {string|null} Drive ID
 * @returns {string|null} Drive ID
// EXPLAIN: */
 */
// EXPLAIN: function extractDriveId_(url) {
function extractDriveId_(url) {
// EXPLAIN: if (!url) return null;
  if (!url) return null;
// EXPLAIN: const match = String(url).match(/[-\w]{25,}/);
  const match = String(url).match(/[-\w]{25,}/);
// EXPLAIN: return match ? match[0] : null;
  return match ? match[0] : null;
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
