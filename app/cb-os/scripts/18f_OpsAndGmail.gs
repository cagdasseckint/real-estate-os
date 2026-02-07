/**
 * Ops dashboard, snapshot, Gmail signals, KPI report helpers.
 */

/**
 * Update ops dashboard snapshot
 */
function updateOpsDashboard_() {
  const ingestPending = QueueRepo.getPending('', 0).length;
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
  
  sendEmailSafe_(recipients, subject, body);
  
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
