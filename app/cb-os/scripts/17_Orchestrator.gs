// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 17_Orchestrator.gs
 * CB-OS V1.0 - 17_Orchestrator.gs
// EXPLAIN: * ORCH_15MIN function - main orchestration entry point
 * ORCH_15MIN function - main orchestration entry point
// EXPLAIN: *
 * 
// EXPLAIN: * HARD-RULE COMPLIANCE:
 * HARD-RULE COMPLIANCE:
// EXPLAIN: * - Hard-rule #1: Trigger creation is NOT done here - only function definition
 * - Hard-rule #1: Trigger creation is NOT done here - only function definition
// EXPLAIN: * - User must create time-driven trigger manually in Apps Script
 * - User must create time-driven trigger manually in Apps Script
// EXPLAIN: *
 * 
// EXPLAIN: * JOB EXECUTION ORDER (LOCKED - do not change):
 * JOB EXECUTION ORDER (LOCKED - do not change):
// EXPLAIN: * 1. ingest_process_job
 * 1. ingest_process_job
// EXPLAIN: * 2. calendar_sync_job
 * 2. calendar_sync_job
// EXPLAIN: * 3. gmail_scan_job
 * 3. gmail_scan_job
// EXPLAIN: * 4. guardrails_job
 * 4. guardrails_job
// EXPLAIN: * 5. dlq_retry_job
 * 5. dlq_retry_job
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Main orchestrator function - to be triggered every 15 minutes
 * Main orchestrator function - to be triggered every 15 minutes
// EXPLAIN: * Does NOT create trigger - trigger must be set up manually in Apps Script
 * Does NOT create trigger - trigger must be set up manually in Apps Script
// EXPLAIN: * @param {Object} e - Trigger event (optional)
 * @param {Object} e - Trigger event (optional)
// EXPLAIN: */
 */
// EXPLAIN: function ORCH_15MIN(e) {
function ORCH_15MIN(e) {
// EXPLAIN: const lock = LockService.getScriptLock();
  const lock = LockService.getScriptLock();
// EXPLAIN: if (!lock.tryLock(10000)) {
  if (!lock.tryLock(10000)) {
// EXPLAIN: Logger.log('ORCH | Lock busy, skipping run');
    Logger.log('ORCH | Lock busy, skipping run');
// EXPLAIN: return { skipped: true, reason: 'lock_busy' };
    return { skipped: true, reason: 'lock_busy' };
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const ctx = createJobContext_();
  const ctx = createJobContext_();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('========== ORCH_15MIN START ==========');
  Logger.log('========== ORCH_15MIN START ==========');
// EXPLAIN: Logger.log('ORCH | run_id=' + ctx.orch_run_id + ' | started_at=' + ctx.started_at);
  Logger.log('ORCH | run_id=' + ctx.orch_run_id + ' | started_at=' + ctx.started_at);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const results = {
  const results = {
// EXPLAIN: orch_run_id: ctx.orch_run_id,
    orch_run_id: ctx.orch_run_id,
// EXPLAIN: started_at: ctx.started_at,
    started_at: ctx.started_at,
// EXPLAIN: jobs: []
    jobs: []
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: // Job 1: Ingest Process
    // Job 1: Ingest Process
// EXPLAIN: Logger.log('ORCH | Starting job 1: ingest_process_job');
    Logger.log('ORCH | Starting job 1: ingest_process_job');
// EXPLAIN: const ingestResult = ingest_process_job(ctx);
    const ingestResult = ingest_process_job(ctx);
// EXPLAIN: results.jobs.push({ name: 'ingest_process_job', result: ingestResult });
    results.jobs.push({ name: 'ingest_process_job', result: ingestResult });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Job 2: Calendar Sync
    // Job 2: Calendar Sync
// EXPLAIN: Logger.log('ORCH | Starting job 2: calendar_sync_job');
    Logger.log('ORCH | Starting job 2: calendar_sync_job');
// EXPLAIN: const calendarResult = calendar_sync_job(ctx);
    const calendarResult = calendar_sync_job(ctx);
// EXPLAIN: results.jobs.push({ name: 'calendar_sync_job', result: calendarResult });
    results.jobs.push({ name: 'calendar_sync_job', result: calendarResult });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Job 3: Gmail Scan
    // Job 3: Gmail Scan
// EXPLAIN: Logger.log('ORCH | Starting job 3: gmail_scan_job');
    Logger.log('ORCH | Starting job 3: gmail_scan_job');
// EXPLAIN: const gmailResult = gmail_scan_job(ctx);
    const gmailResult = gmail_scan_job(ctx);
// EXPLAIN: results.jobs.push({ name: 'gmail_scan_job', result: gmailResult });
    results.jobs.push({ name: 'gmail_scan_job', result: gmailResult });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Job 4: Guardrails
    // Job 4: Guardrails
// EXPLAIN: Logger.log('ORCH | Starting job 4: guardrails_job');
    Logger.log('ORCH | Starting job 4: guardrails_job');
// EXPLAIN: const guardrailsResult = guardrails_job(ctx);
    const guardrailsResult = guardrails_job(ctx);
// EXPLAIN: results.jobs.push({ name: 'guardrails_job', result: guardrailsResult });
    results.jobs.push({ name: 'guardrails_job', result: guardrailsResult });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Job 5: DLQ Retry
    // Job 5: DLQ Retry
// EXPLAIN: Logger.log('ORCH | Starting job 5: dlq_retry_job');
    Logger.log('ORCH | Starting job 5: dlq_retry_job');
// EXPLAIN: const dlqResult = dlq_retry_job(ctx);
    const dlqResult = dlq_retry_job(ctx);
// EXPLAIN: results.jobs.push({ name: 'dlq_retry_job', result: dlqResult });
    results.jobs.push({ name: 'dlq_retry_job', result: dlqResult });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: Logger.log('ORCH | FATAL ERROR: ' + e.message);
    Logger.log('ORCH | FATAL ERROR: ' + e.message);
// EXPLAIN: results.error = e.message;
    results.error = e.message;
// EXPLAIN: } finally {
  } finally {
// EXPLAIN: lock.releaseLock();
    lock.releaseLock();
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: results.completed_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  results.completed_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('ORCH | Complete. Jobs run: ' + results.jobs.length);
  Logger.log('ORCH | Complete. Jobs run: ' + results.jobs.length);
// EXPLAIN: Logger.log('========== ORCH_15MIN END ==========');
  Logger.log('========== ORCH_15MIN END ==========');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return results;
  return results;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Calendar sync job - sync appointments with Google Calendar
 * Calendar sync job - sync appointments with Google Calendar
// EXPLAIN: * @param {Object} ctx - Job context
 * @param {Object} ctx - Job context
// EXPLAIN: * @returns {Object} Job result
 * @returns {Object} Job result
// EXPLAIN: */
 */
// EXPLAIN: function calendar_sync_job(ctx) {
function calendar_sync_job(ctx) {
// EXPLAIN: ctx = ctx || createJobContext_();
  ctx = ctx || createJobContext_();
// EXPLAIN: const jobName = 'calendar_sync_job';
  const jobName = 'calendar_sync_job';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const cursorBefore = getCursor_(CURSORS.CALENDAR_LAST_SYNCED_AT);
  const cursorBefore = getCursor_(CURSORS.CALENDAR_LAST_SYNCED_AT);
// EXPLAIN: let cursorAfter = cursorBefore;
  let cursorAfter = cursorBefore;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('CALENDAR_SYNC | Starting (cursor=' + cursorBefore + ')');
  Logger.log('CALENDAR_SYNC | Starting (cursor=' + cursorBefore + ')');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const result = {
  const result = {
// EXPLAIN: synced: 0,
    synced: 0,
// EXPLAIN: skipped: 0,
    skipped: 0,
// EXPLAIN: errors: 0
    errors: 0
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: // Get appointments without google_event_id
    // Get appointments without google_event_id
// EXPLAIN: const apptData = getSheetData_(SHEETS.APPOINTMENTS);
    const apptData = getSheetData_(SHEETS.APPOINTMENTS);
// EXPLAIN: const pending = apptData.filter(a => !a.google_event_id && a.status === 'scheduled');
    const pending = apptData.filter(a => !a.google_event_id && a.status === 'scheduled');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: for (const appt of pending) {
    for (const appt of pending) {
// EXPLAIN: try {
      try {
// EXPLAIN: // In V1, we just log that we would sync
        // In V1, we just log that we would sync
// EXPLAIN: // Actual Calendar API integration would go here
        // Actual Calendar API integration would go here
// EXPLAIN: Logger.log('CALENDAR_SYNC | Would sync appointment: ' + appt.appointment_id);
        Logger.log('CALENDAR_SYNC | Would sync appointment: ' + appt.appointment_id);
// EXPLAIN: result.skipped++;
        result.skipped++;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: // For full implementation:
        // For full implementation:
// EXPLAIN: // const event = CalendarApp.getDefaultCalendar().createEvent(...);
        // const event = CalendarApp.getDefaultCalendar().createEvent(...);
// EXPLAIN: // updateRow_(SHEETS.APPOINTMENTS, appt._rowIndex, { google_event_id: event.getId() });
        // updateRow_(SHEETS.APPOINTMENTS, appt._rowIndex, { google_event_id: event.getId() });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: } catch (e) {
      } catch (e) {
// EXPLAIN: Logger.log('CALENDAR_SYNC | Error syncing ' + appt.appointment_id + ': ' + e.message);
        Logger.log('CALENDAR_SYNC | Error syncing ' + appt.appointment_id + ': ' + e.message);
// EXPLAIN: result.errors++;
        result.errors++;
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: cursorAfter = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    cursorAfter = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: setCursor_(CURSORS.CALENDAR_LAST_SYNCED_AT, cursorAfter);
    setCursor_(CURSORS.CALENDAR_LAST_SYNCED_AT, cursorAfter);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: Logger.log('CALENDAR_SYNC | Job error: ' + e.message);
    Logger.log('CALENDAR_SYNC | Job error: ' + e.message);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '',
  logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '', 
// EXPLAIN: 'Synced=' + result.synced + ', Skipped=' + result.skipped);
             'Synced=' + result.synced + ', Skipped=' + result.skipped);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('CALENDAR_SYNC | Complete: ' + JSON.stringify(result));
  Logger.log('CALENDAR_SYNC | Complete: ' + JSON.stringify(result));
// EXPLAIN: return result;
  return result;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Gmail scan job - scan labeled emails for leads/interactions
 * Gmail scan job - scan labeled emails for leads/interactions
// EXPLAIN: * @param {Object} ctx - Job context
 * @param {Object} ctx - Job context
// EXPLAIN: * @returns {Object} Job result
 * @returns {Object} Job result
// EXPLAIN: */
 */
// EXPLAIN: function gmail_scan_job(ctx) {
function gmail_scan_job(ctx) {
// EXPLAIN: ctx = ctx || createJobContext_();
  ctx = ctx || createJobContext_();
// EXPLAIN: const jobName = 'gmail_scan_job';
  const jobName = 'gmail_scan_job';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const cursorBefore = getCursor_(CURSORS.GMAIL_LAST_SCANNED_AT);
  const cursorBefore = getCursor_(CURSORS.GMAIL_LAST_SCANNED_AT);
// EXPLAIN: let cursorAfter = cursorBefore;
  let cursorAfter = cursorBefore;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('GMAIL_SCAN | Starting (cursor=' + cursorBefore + ')');
  Logger.log('GMAIL_SCAN | Starting (cursor=' + cursorBefore + ')');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const result = {
  const result = {
// EXPLAIN: scanned: 0,
    scanned: 0,
// EXPLAIN: leads_found: 0,
    leads_found: 0,
// EXPLAIN: errors: 0
    errors: 0
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: const labels = cfg_('GMAIL_SCAN_LABELS', DEFAULTS.GMAIL_SCAN_LABELS).split(',');
    const labels = cfg_('GMAIL_SCAN_LABELS', DEFAULTS.GMAIL_SCAN_LABELS).split(',');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: for (const label of labels) {
    for (const label of labels) {
// EXPLAIN: try {
      try {
// EXPLAIN: const labelName = label.trim();
        const labelName = label.trim();
// EXPLAIN: Logger.log('GMAIL_SCAN | Scanning label: ' + labelName);
        Logger.log('GMAIL_SCAN | Scanning label: ' + labelName);
// EXPLAIN: const signalResult = processGmailSignals_(labelName, cursorBefore);
        const signalResult = processGmailSignals_(labelName, cursorBefore);
// EXPLAIN: result.scanned += signalResult.scanned;
        result.scanned += signalResult.scanned;
// EXPLAIN: result.leads_found += signalResult.enqueued;
        result.leads_found += signalResult.enqueued;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: } catch (e) {
      } catch (e) {
// EXPLAIN: Logger.log('GMAIL_SCAN | Error scanning label ' + label + ': ' + e.message);
        Logger.log('GMAIL_SCAN | Error scanning label ' + label + ': ' + e.message);
// EXPLAIN: result.errors++;
        result.errors++;
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: cursorAfter = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    cursorAfter = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: setCursor_(CURSORS.GMAIL_LAST_SCANNED_AT, cursorAfter);
    setCursor_(CURSORS.GMAIL_LAST_SCANNED_AT, cursorAfter);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: Logger.log('GMAIL_SCAN | Job error: ' + e.message);
    Logger.log('GMAIL_SCAN | Job error: ' + e.message);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '',
  logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '', 
// EXPLAIN: 'Scanned=' + result.scanned + ', Leads=' + result.leads_found);
             'Scanned=' + result.scanned + ', Leads=' + result.leads_found);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('GMAIL_SCAN | Complete: ' + JSON.stringify(result));
  Logger.log('GMAIL_SCAN | Complete: ' + JSON.stringify(result));
// EXPLAIN: return result;
  return result;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Guardrails job - check SLA violations, stuck deals, overdue tasks
 * Guardrails job - check SLA violations, stuck deals, overdue tasks
// EXPLAIN: * @param {Object} ctx - Job context
 * @param {Object} ctx - Job context
// EXPLAIN: * @returns {Object} Job result
 * @returns {Object} Job result
// EXPLAIN: */
 */
// EXPLAIN: function guardrails_job(ctx) {
function guardrails_job(ctx) {
// EXPLAIN: ctx = ctx || createJobContext_();
  ctx = ctx || createJobContext_();
// EXPLAIN: const jobName = 'guardrails_job';
  const jobName = 'guardrails_job';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('GUARDRAILS | Starting');
  Logger.log('GUARDRAILS | Starting');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const result = {
  const result = {
// EXPLAIN: stuck_deals: 0,
    stuck_deals: 0,
// EXPLAIN: overdue_tasks: 0,
    overdue_tasks: 0,
// EXPLAIN: sla_violations: 0,
    sla_violations: 0,
// EXPLAIN: alerts_created: 0,
    alerts_created: 0,
// EXPLAIN: lead_scores: 0,
    lead_scores: 0,
// EXPLAIN: draft_emails: 0
    draft_emails: 0
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: // Check stuck deals
    // Check stuck deals
// EXPLAIN: const stuckDeals = DealsRepo.getStuck();
    const stuckDeals = DealsRepo.getStuck();
// EXPLAIN: result.stuck_deals = stuckDeals.length;
    result.stuck_deals = stuckDeals.length;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: for (const deal of stuckDeals) {
    for (const deal of stuckDeals) {
// EXPLAIN: Logger.log('GUARDRAILS | Stuck deal: ' + deal.deal_id + ' in stage ' + deal.stage);
      Logger.log('GUARDRAILS | Stuck deal: ' + deal.deal_id + ' in stage ' + deal.stage);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: // Create alert task
      // Create alert task
// EXPLAIN: TasksRepo.create({
      TasksRepo.create({
// EXPLAIN: entity_type: 'DEAL',
        entity_type: 'DEAL',
// EXPLAIN: entity_id: deal.deal_id,
        entity_id: deal.deal_id,
// EXPLAIN: title: 'ALERT: Deal stuck in ' + deal.stage,
        title: 'ALERT: Deal stuck in ' + deal.stage,
// EXPLAIN: description: 'This deal has been in ' + deal.stage + ' for more than ' +
        description: 'This deal has been in ' + deal.stage + ' for more than ' + 
// EXPLAIN: cfg_('STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD) + ' days',
                     cfg_('STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD) + ' days',
// EXPLAIN: priority: 'high',
        priority: 'high',
// EXPLAIN: status: 'pending'
        status: 'pending'
// EXPLAIN: });
      });
// EXPLAIN: result.alerts_created++;
      result.alerts_created++;
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Check overdue tasks
    // Check overdue tasks
// EXPLAIN: const overdueTasks = TasksRepo.getOverdue();
    const overdueTasks = TasksRepo.getOverdue();
// EXPLAIN: result.overdue_tasks = overdueTasks.length;
    result.overdue_tasks = overdueTasks.length;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: for (const task of overdueTasks) {
    for (const task of overdueTasks) {
// EXPLAIN: Logger.log('GUARDRAILS | Overdue task: ' + task.task_id + ' - ' + task.title);
      Logger.log('GUARDRAILS | Overdue task: ' + task.task_id + ' - ' + task.title);
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Check SLA violations (first touch within 30 minutes)
    // Check SLA violations (first touch within 30 minutes)
// EXPLAIN: // This would check EVENTS for new leads without first touch event within SLA
    // This would check EVENTS for new leads without first touch event within SLA
// EXPLAIN: const slaMinutes = cfg_('SLA_FIRST_TOUCH_MINUTES', DEFAULTS.SLA_FIRST_TOUCH_MINUTES);
    const slaMinutes = cfg_('SLA_FIRST_TOUCH_MINUTES', DEFAULTS.SLA_FIRST_TOUCH_MINUTES);
// EXPLAIN: Logger.log('GUARDRAILS | SLA threshold: ' + slaMinutes + ' minutes');
    Logger.log('GUARDRAILS | SLA threshold: ' + slaMinutes + ' minutes');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Simplified SLA check - in production would be more sophisticated
    // Simplified SLA check - in production would be more sophisticated
// EXPLAIN: const recentEvents = EventsRepo.getRecent(24);
    const recentEvents = EventsRepo.getRecent(24);
// EXPLAIN: const newLeadEvents = recentEvents.filter(e => e.event_type === 'CONTACT_CREATED');
    const newLeadEvents = recentEvents.filter(e => e.event_type === 'CONTACT_CREATED');
// EXPLAIN: const firstTouchEvents = recentEvents.filter(e => e.event_type === 'FIRST_TOUCH');
    const firstTouchEvents = recentEvents.filter(e => e.event_type === 'FIRST_TOUCH');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Count leads without first touch
    // Count leads without first touch
// EXPLAIN: for (const leadEvent of newLeadEvents) {
    for (const leadEvent of newLeadEvents) {
// EXPLAIN: const hasFirstTouch = firstTouchEvents.some(ft => ft.entity_id === leadEvent.entity_id);
      const hasFirstTouch = firstTouchEvents.some(ft => ft.entity_id === leadEvent.entity_id);
// EXPLAIN: if (!hasFirstTouch) {
      if (!hasFirstTouch) {
// EXPLAIN: result.sla_violations++;
        result.sla_violations++;
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Stage-level SLA checks
    // Stage-level SLA checks
// EXPLAIN: for (const deal of DealsRepo.getActive()) {
    for (const deal of DealsRepo.getActive()) {
// EXPLAIN: const slaDays = getStageSlaDays_(deal.deal_type, deal.stage);
      const slaDays = getStageSlaDays_(deal.deal_type, deal.stage);
// EXPLAIN: if (!slaDays || !deal.last_stage_change_at) continue;
      if (!slaDays || !deal.last_stage_change_at) continue;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: const cutoff = new Date(deal.last_stage_change_at);
      const cutoff = new Date(deal.last_stage_change_at);
// EXPLAIN: cutoff.setDate(cutoff.getDate() + Number(slaDays));
      cutoff.setDate(cutoff.getDate() + Number(slaDays));
// EXPLAIN: if (new Date() > cutoff) {
      if (new Date() > cutoff) {
// EXPLAIN: result.sla_violations++;
        result.sla_violations++;
// EXPLAIN: TasksRepo.create({
        TasksRepo.create({
// EXPLAIN: entity_type: 'DEAL',
          entity_type: 'DEAL',
// EXPLAIN: entity_id: deal.deal_id,
          entity_id: deal.deal_id,
// EXPLAIN: title: 'SLA Breach: ' + deal.stage,
          title: 'SLA Breach: ' + deal.stage,
// EXPLAIN: description: 'Stage SLA ' + slaDays + ' gün aşıldı.',
          description: 'Stage SLA ' + slaDays + ' gün aşıldı.',
// EXPLAIN: priority: 'high',
          priority: 'high',
// EXPLAIN: status: 'pending'
          status: 'pending'
// EXPLAIN: });
        });
// EXPLAIN: result.alerts_created++;
        result.alerts_created++;
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Lead scoring + top follow-ups
    // Lead scoring + top follow-ups
// EXPLAIN: const scores = computeLeadScores_();
    const scores = computeLeadScores_();
// EXPLAIN: result.lead_scores = scores.length;
    result.lead_scores = scores.length;
// EXPLAIN: createTopFollowupTasks_(scores);
    createTopFollowupTasks_(scores);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Email draft queue
    // Email draft queue
// EXPLAIN: const draftResult = processEmailDraftQueue_();
    const draftResult = processEmailDraftQueue_();
// EXPLAIN: result.draft_emails = draftResult.drafted;
    result.draft_emails = draftResult.drafted;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Ops dashboard snapshot
    // Ops dashboard snapshot
// EXPLAIN: updateOpsDashboard_();
    updateOpsDashboard_();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Drive share audit
    // Drive share audit
// EXPLAIN: runDriveShareAudit_();
    runDriveShareAudit_();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // SLA/stuck summary email
    // SLA/stuck summary email
// EXPLAIN: const recipients = cfg_('SLA_ALERT_RECIPIENTS', DEFAULTS.SLA_ALERT_RECIPIENTS);
    const recipients = cfg_('SLA_ALERT_RECIPIENTS', DEFAULTS.SLA_ALERT_RECIPIENTS);
// EXPLAIN: if (recipients && (result.sla_violations > 0 || result.stuck_deals > 0)) {
    if (recipients && (result.sla_violations > 0 || result.stuck_deals > 0)) {
// EXPLAIN: const subject = 'CB-OS SLA & Stuck Deal Uyarısı';
      const subject = 'CB-OS SLA & Stuck Deal Uyarısı';
// EXPLAIN: const body = [
      const body = [
// EXPLAIN: 'SLA ihlalleri: ' + result.sla_violations,
        'SLA ihlalleri: ' + result.sla_violations,
// EXPLAIN: 'Stuck deal sayısı: ' + result.stuck_deals,
        'Stuck deal sayısı: ' + result.stuck_deals,
// EXPLAIN: 'Overdue task sayısı: ' + result.overdue_tasks
        'Overdue task sayısı: ' + result.overdue_tasks
// EXPLAIN: ].join('\n');
      ].join('\n');
// EXPLAIN: GmailApp.sendEmail(recipients, subject, body);
      GmailApp.sendEmail(recipients, subject, body);
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: Logger.log('GUARDRAILS | Job error: ' + e.message);
    Logger.log('GUARDRAILS | Job error: ' + e.message);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: logJobRun_(ctx, jobName, '', '', '',
  logJobRun_(ctx, jobName, '', '', '', 
// EXPLAIN: 'Stuck=' + result.stuck_deals + ', Overdue=' + result.overdue_tasks +
             'Stuck=' + result.stuck_deals + ', Overdue=' + result.overdue_tasks + 
// EXPLAIN: ', SLA=' + result.sla_violations + ', LeadScores=' + result.lead_scores);
             ', SLA=' + result.sla_violations + ', LeadScores=' + result.lead_scores);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('GUARDRAILS | Complete: ' + JSON.stringify(result));
  Logger.log('GUARDRAILS | Complete: ' + JSON.stringify(result));
// EXPLAIN: return result;
  return result;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Manual trigger setup instructions
 * Manual trigger setup instructions
// EXPLAIN: * User should create a time-driven trigger manually:
 * User should create a time-driven trigger manually:
// EXPLAIN: * 1. Open Apps Script editor
 * 1. Open Apps Script editor
// EXPLAIN: * 2. Go to Triggers (clock icon)
 * 2. Go to Triggers (clock icon)
// EXPLAIN: * 3. Add Trigger:
 * 3. Add Trigger:
// EXPLAIN: *    - Function: ORCH_15MIN
 *    - Function: ORCH_15MIN
// EXPLAIN: *    - Event source: Time-driven
 *    - Event source: Time-driven
// EXPLAIN: *    - Type: Minutes timer
 *    - Type: Minutes timer
// EXPLAIN: *    - Interval: Every 15 minutes
 *    - Interval: Every 15 minutes
// EXPLAIN: */
 */
// EXPLAIN: function showTriggerSetupInstructions() {
function showTriggerSetupInstructions() {
// EXPLAIN: const instructions = `
  const instructions = `
// EXPLAIN: ========================================
========================================
// EXPLAIN: ORCH_15MIN TRIGGER SETUP INSTRUCTIONS
ORCH_15MIN TRIGGER SETUP INSTRUCTIONS
// EXPLAIN: ========================================
========================================
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: To enable automatic orchestration every 15 minutes:
To enable automatic orchestration every 15 minutes:
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: 1. In Apps Script editor, click the clock icon (Triggers)
1. In Apps Script editor, click the clock icon (Triggers)
// EXPLAIN: 2. Click "+ Add Trigger"
2. Click "+ Add Trigger"
// EXPLAIN: 3. Configure:
3. Configure:
// EXPLAIN: - Choose function: ORCH_15MIN
   - Choose function: ORCH_15MIN
// EXPLAIN: - Choose deployment: Head
   - Choose deployment: Head
// EXPLAIN: - Event source: Time-driven
   - Event source: Time-driven
// EXPLAIN: - Type of time based trigger: Minutes timer
   - Type of time based trigger: Minutes timer
// EXPLAIN: - Select minute interval: Every 15 minutes
   - Select minute interval: Every 15 minutes
// EXPLAIN: 4. Click Save
4. Click Save
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: The orchestrator will then run automatically every 15 minutes,
The orchestrator will then run automatically every 15 minutes,
// EXPLAIN: executing jobs in this order:
executing jobs in this order:
// EXPLAIN: 1. ingest_process_job
  1. ingest_process_job
// EXPLAIN: 2. calendar_sync_job
  2. calendar_sync_job
// EXPLAIN: 3. gmail_scan_job
  3. gmail_scan_job
// EXPLAIN: 4. guardrails_job
  4. guardrails_job
// EXPLAIN: 5. dlq_retry_job
  5. dlq_retry_job
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: ========================================
========================================
// EXPLAIN: `;
  `;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log(instructions);
  Logger.log(instructions);
// EXPLAIN: return instructions;
  return instructions;
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
