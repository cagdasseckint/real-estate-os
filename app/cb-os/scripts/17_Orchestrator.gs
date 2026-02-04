// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS V1.0 - 17_Orchestrator.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS V1.0 - 17_Orchestrator.gs
// EXPLAIN: Bu satırın görevi: * ORCH_15MIN function - main orchestration entry point. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * ORCH_15MIN function - main orchestration entry point
// EXPLAIN: Bu satırın görevi: *. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * 
// EXPLAIN: Bu satırın görevi: * HARD-RULE COMPLIANCE:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * HARD-RULE COMPLIANCE:
// EXPLAIN: Bu satırın görevi: * - Hard-rule #1: Trigger creation is NOT done here - only function definition. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * - Hard-rule #1: Trigger creation is NOT done here - only function definition
// EXPLAIN: Bu satırın görevi: * - User must create time-driven trigger manually in Apps Script. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * - User must create time-driven trigger manually in Apps Script
// EXPLAIN: Bu satırın görevi: *. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * 
// EXPLAIN: Bu satırın görevi: * JOB EXECUTION ORDER (LOCKED - do not change):. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * JOB EXECUTION ORDER (LOCKED - do not change):
// EXPLAIN: Bu satırın görevi: * 1. ingest_process_job. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * 1. ingest_process_job
// EXPLAIN: Bu satırın görevi: * 2. calendar_sync_job. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * 2. calendar_sync_job
// EXPLAIN: Bu satırın görevi: * 3. gmail_scan_job. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * 3. gmail_scan_job
// EXPLAIN: Bu satırın görevi: * 4. guardrails_job. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * 4. guardrails_job
// EXPLAIN: Bu satırın görevi: * 5. dlq_retry_job. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * 5. dlq_retry_job
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Main orchestrator function - to be triggered every 15 minutes. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Main orchestrator function - to be triggered every 15 minutes
// EXPLAIN: Bu satırın görevi: * Does NOT create trigger - trigger must be set up manually in Apps Script. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Does NOT create trigger - trigger must be set up manually in Apps Script
// EXPLAIN: Bu satırın görevi: * @param {Object} e - Trigger event (optional). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} e - Trigger event (optional)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function ORCH_15MIN(e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function ORCH_15MIN(e) {
// EXPLAIN: Bu satırın görevi: const lock = LockService.getScriptLock();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const lock = LockService.getScriptLock();
// EXPLAIN: Bu satırın görevi: if (!lock.tryLock(10000)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!lock.tryLock(10000)) {
// EXPLAIN: Bu satırın görevi: Logger.log('ORCH | Lock busy, skipping run');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('ORCH | Lock busy, skipping run');
// EXPLAIN: Bu satırın görevi: return { skipped: true, reason: 'lock_busy' };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { skipped: true, reason: 'lock_busy' };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const ctx = createJobContext_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const ctx = createJobContext_();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('========== ORCH_15MIN START ==========');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('========== ORCH_15MIN START ==========');
// EXPLAIN: Bu satırın görevi: Logger.log('ORCH | run_id=' + ctx.orch_run_id + ' | started_at=' + ctx.started_at);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('ORCH | run_id=' + ctx.orch_run_id + ' | started_at=' + ctx.started_at);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const results = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const results = {
// EXPLAIN: Bu satırın görevi: orch_run_id: ctx.orch_run_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    orch_run_id: ctx.orch_run_id,
// EXPLAIN: Bu satırın görevi: started_at: ctx.started_at,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    started_at: ctx.started_at,
// EXPLAIN: Bu satırın görevi: jobs: []. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    jobs: []
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: // Job 1: Ingest Process. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Job 1: Ingest Process
// EXPLAIN: Bu satırın görevi: Logger.log('ORCH | Starting job 1: ingest_process_job');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('ORCH | Starting job 1: ingest_process_job');
// EXPLAIN: Bu satırın görevi: const ingestResult = ingest_process_job(ctx);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const ingestResult = ingest_process_job(ctx);
// EXPLAIN: Bu satırın görevi: results.jobs.push({ name: 'ingest_process_job', result: ingestResult });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    results.jobs.push({ name: 'ingest_process_job', result: ingestResult });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Job 2: Calendar Sync. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Job 2: Calendar Sync
// EXPLAIN: Bu satırın görevi: Logger.log('ORCH | Starting job 2: calendar_sync_job');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('ORCH | Starting job 2: calendar_sync_job');
// EXPLAIN: Bu satırın görevi: const calendarResult = calendar_sync_job(ctx);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const calendarResult = calendar_sync_job(ctx);
// EXPLAIN: Bu satırın görevi: results.jobs.push({ name: 'calendar_sync_job', result: calendarResult });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    results.jobs.push({ name: 'calendar_sync_job', result: calendarResult });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Job 3: Gmail Scan. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Job 3: Gmail Scan
// EXPLAIN: Bu satırın görevi: Logger.log('ORCH | Starting job 3: gmail_scan_job');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('ORCH | Starting job 3: gmail_scan_job');
// EXPLAIN: Bu satırın görevi: const gmailResult = gmail_scan_job(ctx);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const gmailResult = gmail_scan_job(ctx);
// EXPLAIN: Bu satırın görevi: results.jobs.push({ name: 'gmail_scan_job', result: gmailResult });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    results.jobs.push({ name: 'gmail_scan_job', result: gmailResult });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Job 4: Guardrails. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Job 4: Guardrails
// EXPLAIN: Bu satırın görevi: Logger.log('ORCH | Starting job 4: guardrails_job');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('ORCH | Starting job 4: guardrails_job');
// EXPLAIN: Bu satırın görevi: const guardrailsResult = guardrails_job(ctx);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const guardrailsResult = guardrails_job(ctx);
// EXPLAIN: Bu satırın görevi: results.jobs.push({ name: 'guardrails_job', result: guardrailsResult });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    results.jobs.push({ name: 'guardrails_job', result: guardrailsResult });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Job 5: DLQ Retry. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Job 5: DLQ Retry
// EXPLAIN: Bu satırın görevi: Logger.log('ORCH | Starting job 5: dlq_retry_job');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('ORCH | Starting job 5: dlq_retry_job');
// EXPLAIN: Bu satırın görevi: const dlqResult = dlq_retry_job(ctx);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const dlqResult = dlq_retry_job(ctx);
// EXPLAIN: Bu satırın görevi: results.jobs.push({ name: 'dlq_retry_job', result: dlqResult });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    results.jobs.push({ name: 'dlq_retry_job', result: dlqResult });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: Logger.log('ORCH | FATAL ERROR: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('ORCH | FATAL ERROR: ' + e.message);
// EXPLAIN: Bu satırın görevi: results.error = e.message;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    results.error = e.message;
// EXPLAIN: Bu satırın görevi: } finally {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } finally {
// EXPLAIN: Bu satırın görevi: lock.releaseLock();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    lock.releaseLock();
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: results.completed_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  results.completed_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('ORCH | Complete. Jobs run: ' + results.jobs.length);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('ORCH | Complete. Jobs run: ' + results.jobs.length);
// EXPLAIN: Bu satırın görevi: Logger.log('========== ORCH_15MIN END ==========');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('========== ORCH_15MIN END ==========');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return results;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return results;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Calendar sync job - sync appointments with Google Calendar. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Calendar sync job - sync appointments with Google Calendar
// EXPLAIN: Bu satırın görevi: * @param {Object} ctx - Job context. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} ctx - Job context
// EXPLAIN: Bu satırın görevi: * @returns {Object} Job result. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Job result
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function calendar_sync_job(ctx) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function calendar_sync_job(ctx) {
// EXPLAIN: Bu satırın görevi: ctx = ctx || createJobContext_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ctx = ctx || createJobContext_();
// EXPLAIN: Bu satırın görevi: const jobName = 'calendar_sync_job';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const jobName = 'calendar_sync_job';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const cursorBefore = getCursor_(CURSORS.CALENDAR_LAST_SYNCED_AT);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const cursorBefore = getCursor_(CURSORS.CALENDAR_LAST_SYNCED_AT);
// EXPLAIN: Bu satırın görevi: let cursorAfter = cursorBefore;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let cursorAfter = cursorBefore;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('CALENDAR_SYNC | Starting (cursor=' + cursorBefore + ')');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('CALENDAR_SYNC | Starting (cursor=' + cursorBefore + ')');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const result = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const result = {
// EXPLAIN: Bu satırın görevi: synced: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    synced: 0,
// EXPLAIN: Bu satırın görevi: skipped: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    skipped: 0,
// EXPLAIN: Bu satırın görevi: errors: 0. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    errors: 0
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: // Get appointments without google_event_id. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Get appointments without google_event_id
// EXPLAIN: Bu satırın görevi: const apptData = getSheetData_(SHEETS.APPOINTMENTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const apptData = getSheetData_(SHEETS.APPOINTMENTS);
// EXPLAIN: Bu satırın görevi: const pending = apptData.filter(a => !a.google_event_id && a.status === 'scheduled');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const pending = apptData.filter(a => !a.google_event_id && a.status === 'scheduled');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: for (const appt of pending) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    for (const appt of pending) {
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      try {
// EXPLAIN: Bu satırın görevi: // In V1, we just log that we would sync. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // In V1, we just log that we would sync
// EXPLAIN: Bu satırın görevi: // Actual Calendar API integration would go here. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // Actual Calendar API integration would go here
// EXPLAIN: Bu satırın görevi: Logger.log('CALENDAR_SYNC | Would sync appointment: ' + appt.appointment_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        Logger.log('CALENDAR_SYNC | Would sync appointment: ' + appt.appointment_id);
// EXPLAIN: Bu satırın görevi: result.skipped++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.skipped++;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: // For full implementation:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // For full implementation:
// EXPLAIN: Bu satırın görevi: // const event = CalendarApp.getDefaultCalendar().createEvent(...);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // const event = CalendarApp.getDefaultCalendar().createEvent(...);
// EXPLAIN: Bu satırın görevi: // updateRow_(SHEETS.APPOINTMENTS, appt._rowIndex, { google_event_id: event.getId() });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // updateRow_(SHEETS.APPOINTMENTS, appt._rowIndex, { google_event_id: event.getId() });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      } catch (e) {
// EXPLAIN: Bu satırın görevi: Logger.log('CALENDAR_SYNC | Error syncing ' + appt.appointment_id + ': ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        Logger.log('CALENDAR_SYNC | Error syncing ' + appt.appointment_id + ': ' + e.message);
// EXPLAIN: Bu satırın görevi: result.errors++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.errors++;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: cursorAfter = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    cursorAfter = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satırın görevi: setCursor_(CURSORS.CALENDAR_LAST_SYNCED_AT, cursorAfter);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    setCursor_(CURSORS.CALENDAR_LAST_SYNCED_AT, cursorAfter);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: Logger.log('CALENDAR_SYNC | Job error: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('CALENDAR_SYNC | Job error: ' + e.message);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '', 
// EXPLAIN: Bu satırın görevi: 'Synced=' + result.synced + ', Skipped=' + result.skipped);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
             'Synced=' + result.synced + ', Skipped=' + result.skipped);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('CALENDAR_SYNC | Complete: ' + JSON.stringify(result));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('CALENDAR_SYNC | Complete: ' + JSON.stringify(result));
// EXPLAIN: Bu satırın görevi: return result;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return result;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Gmail scan job - scan labeled emails for leads/interactions. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Gmail scan job - scan labeled emails for leads/interactions
// EXPLAIN: Bu satırın görevi: * @param {Object} ctx - Job context. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} ctx - Job context
// EXPLAIN: Bu satırın görevi: * @returns {Object} Job result. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Job result
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function gmail_scan_job(ctx) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function gmail_scan_job(ctx) {
// EXPLAIN: Bu satırın görevi: ctx = ctx || createJobContext_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ctx = ctx || createJobContext_();
// EXPLAIN: Bu satırın görevi: const jobName = 'gmail_scan_job';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const jobName = 'gmail_scan_job';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const cursorBefore = getCursor_(CURSORS.GMAIL_LAST_SCANNED_AT);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const cursorBefore = getCursor_(CURSORS.GMAIL_LAST_SCANNED_AT);
// EXPLAIN: Bu satırın görevi: let cursorAfter = cursorBefore;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let cursorAfter = cursorBefore;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('GMAIL_SCAN | Starting (cursor=' + cursorBefore + ')');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('GMAIL_SCAN | Starting (cursor=' + cursorBefore + ')');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const result = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const result = {
// EXPLAIN: Bu satırın görevi: scanned: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    scanned: 0,
// EXPLAIN: Bu satırın görevi: leads_found: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    leads_found: 0,
// EXPLAIN: Bu satırın görevi: errors: 0. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    errors: 0
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: const labels = cfg_('GMAIL_SCAN_LABELS', DEFAULTS.GMAIL_SCAN_LABELS).split(',');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const labels = cfg_('GMAIL_SCAN_LABELS', DEFAULTS.GMAIL_SCAN_LABELS).split(',');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: for (const label of labels) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    for (const label of labels) {
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      try {
// EXPLAIN: Bu satırın görevi: const labelName = label.trim();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        const labelName = label.trim();
// EXPLAIN: Bu satırın görevi: Logger.log('GMAIL_SCAN | Scanning label: ' + labelName);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        Logger.log('GMAIL_SCAN | Scanning label: ' + labelName);
// EXPLAIN: Bu satırın görevi: const signalResult = processGmailSignals_(labelName, cursorBefore);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        const signalResult = processGmailSignals_(labelName, cursorBefore);
// EXPLAIN: Bu satırın görevi: result.scanned += signalResult.scanned;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.scanned += signalResult.scanned;
// EXPLAIN: Bu satırın görevi: result.leads_found += signalResult.enqueued;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.leads_found += signalResult.enqueued;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      } catch (e) {
// EXPLAIN: Bu satırın görevi: Logger.log('GMAIL_SCAN | Error scanning label ' + label + ': ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        Logger.log('GMAIL_SCAN | Error scanning label ' + label + ': ' + e.message);
// EXPLAIN: Bu satırın görevi: result.errors++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.errors++;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: cursorAfter = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    cursorAfter = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satırın görevi: setCursor_(CURSORS.GMAIL_LAST_SCANNED_AT, cursorAfter);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    setCursor_(CURSORS.GMAIL_LAST_SCANNED_AT, cursorAfter);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: Logger.log('GMAIL_SCAN | Job error: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('GMAIL_SCAN | Job error: ' + e.message);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '', 
// EXPLAIN: Bu satırın görevi: 'Scanned=' + result.scanned + ', Leads=' + result.leads_found);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
             'Scanned=' + result.scanned + ', Leads=' + result.leads_found);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('GMAIL_SCAN | Complete: ' + JSON.stringify(result));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('GMAIL_SCAN | Complete: ' + JSON.stringify(result));
// EXPLAIN: Bu satırın görevi: return result;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return result;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Guardrails job - check SLA violations, stuck deals, overdue tasks. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Guardrails job - check SLA violations, stuck deals, overdue tasks
// EXPLAIN: Bu satırın görevi: * @param {Object} ctx - Job context. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} ctx - Job context
// EXPLAIN: Bu satırın görevi: * @returns {Object} Job result. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Job result
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function guardrails_job(ctx) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function guardrails_job(ctx) {
// EXPLAIN: Bu satırın görevi: ctx = ctx || createJobContext_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ctx = ctx || createJobContext_();
// EXPLAIN: Bu satırın görevi: const jobName = 'guardrails_job';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const jobName = 'guardrails_job';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('GUARDRAILS | Starting');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('GUARDRAILS | Starting');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const result = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const result = {
// EXPLAIN: Bu satırın görevi: stuck_deals: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    stuck_deals: 0,
// EXPLAIN: Bu satırın görevi: overdue_tasks: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    overdue_tasks: 0,
// EXPLAIN: Bu satırın görevi: sla_violations: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sla_violations: 0,
// EXPLAIN: Bu satırın görevi: alerts_created: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    alerts_created: 0,
// EXPLAIN: Bu satırın görevi: lead_scores: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    lead_scores: 0,
// EXPLAIN: Bu satırın görevi: draft_emails: 0. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    draft_emails: 0
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: // Check stuck deals. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Check stuck deals
// EXPLAIN: Bu satırın görevi: const stuckDeals = DealsRepo.getStuck();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const stuckDeals = DealsRepo.getStuck();
// EXPLAIN: Bu satırın görevi: result.stuck_deals = stuckDeals.length;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    result.stuck_deals = stuckDeals.length;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: for (const deal of stuckDeals) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    for (const deal of stuckDeals) {
// EXPLAIN: Bu satırın görevi: Logger.log('GUARDRAILS | Stuck deal: ' + deal.deal_id + ' in stage ' + deal.stage);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      Logger.log('GUARDRAILS | Stuck deal: ' + deal.deal_id + ' in stage ' + deal.stage);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: // Create alert task. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      // Create alert task
// EXPLAIN: Bu satırın görevi: TasksRepo.create({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      TasksRepo.create({
// EXPLAIN: Bu satırın görevi: entity_type: 'DEAL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        entity_type: 'DEAL',
// EXPLAIN: Bu satırın görevi: entity_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        entity_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: title: 'ALERT: Deal stuck in ' + deal.stage,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        title: 'ALERT: Deal stuck in ' + deal.stage,
// EXPLAIN: Bu satırın görevi: description: 'This deal has been in ' + deal.stage + ' for more than ' +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        description: 'This deal has been in ' + deal.stage + ' for more than ' + 
// EXPLAIN: Bu satırın görevi: cfg_('STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD) + ' days',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                     cfg_('STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD) + ' days',
// EXPLAIN: Bu satırın görevi: priority: 'high',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        priority: 'high',
// EXPLAIN: Bu satırın görevi: status: 'pending'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        status: 'pending'
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      });
// EXPLAIN: Bu satırın görevi: result.alerts_created++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      result.alerts_created++;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Check overdue tasks. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Check overdue tasks
// EXPLAIN: Bu satırın görevi: const overdueTasks = TasksRepo.getOverdue();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const overdueTasks = TasksRepo.getOverdue();
// EXPLAIN: Bu satırın görevi: result.overdue_tasks = overdueTasks.length;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    result.overdue_tasks = overdueTasks.length;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: for (const task of overdueTasks) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    for (const task of overdueTasks) {
// EXPLAIN: Bu satırın görevi: Logger.log('GUARDRAILS | Overdue task: ' + task.task_id + ' - ' + task.title);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      Logger.log('GUARDRAILS | Overdue task: ' + task.task_id + ' - ' + task.title);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Check SLA violations (first touch within 30 minutes). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Check SLA violations (first touch within 30 minutes)
// EXPLAIN: Bu satırın görevi: // This would check EVENTS for new leads without first touch event within SLA. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // This would check EVENTS for new leads without first touch event within SLA
// EXPLAIN: Bu satırın görevi: const slaMinutes = cfg_('SLA_FIRST_TOUCH_MINUTES', DEFAULTS.SLA_FIRST_TOUCH_MINUTES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const slaMinutes = cfg_('SLA_FIRST_TOUCH_MINUTES', DEFAULTS.SLA_FIRST_TOUCH_MINUTES);
// EXPLAIN: Bu satırın görevi: Logger.log('GUARDRAILS | SLA threshold: ' + slaMinutes + ' minutes');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('GUARDRAILS | SLA threshold: ' + slaMinutes + ' minutes');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Simplified SLA check - in production would be more sophisticated. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Simplified SLA check - in production would be more sophisticated
// EXPLAIN: Bu satırın görevi: const recentEvents = EventsRepo.getRecent(24);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const recentEvents = EventsRepo.getRecent(24);
// EXPLAIN: Bu satırın görevi: const newLeadEvents = recentEvents.filter(e => e.event_type === 'CONTACT_CREATED');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const newLeadEvents = recentEvents.filter(e => e.event_type === 'CONTACT_CREATED');
// EXPLAIN: Bu satırın görevi: const firstTouchEvents = recentEvents.filter(e => e.event_type === 'FIRST_TOUCH');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const firstTouchEvents = recentEvents.filter(e => e.event_type === 'FIRST_TOUCH');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Count leads without first touch. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Count leads without first touch
// EXPLAIN: Bu satırın görevi: for (const leadEvent of newLeadEvents) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    for (const leadEvent of newLeadEvents) {
// EXPLAIN: Bu satırın görevi: const hasFirstTouch = firstTouchEvents.some(ft => ft.entity_id === leadEvent.entity_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const hasFirstTouch = firstTouchEvents.some(ft => ft.entity_id === leadEvent.entity_id);
// EXPLAIN: Bu satırın görevi: if (!hasFirstTouch) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (!hasFirstTouch) {
// EXPLAIN: Bu satırın görevi: result.sla_violations++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.sla_violations++;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Stage-level SLA checks. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Stage-level SLA checks
// EXPLAIN: Bu satırın görevi: for (const deal of DealsRepo.getActive()) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    for (const deal of DealsRepo.getActive()) {
// EXPLAIN: Bu satırın görevi: const slaDays = getStageSlaDays_(deal.deal_type, deal.stage);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const slaDays = getStageSlaDays_(deal.deal_type, deal.stage);
// EXPLAIN: Bu satırın görevi: if (!slaDays || !deal.last_stage_change_at) continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (!slaDays || !deal.last_stage_change_at) continue;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: const cutoff = new Date(deal.last_stage_change_at);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const cutoff = new Date(deal.last_stage_change_at);
// EXPLAIN: Bu satırın görevi: cutoff.setDate(cutoff.getDate() + Number(slaDays));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      cutoff.setDate(cutoff.getDate() + Number(slaDays));
// EXPLAIN: Bu satırın görevi: if (new Date() > cutoff) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (new Date() > cutoff) {
// EXPLAIN: Bu satırın görevi: result.sla_violations++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.sla_violations++;
// EXPLAIN: Bu satırın görevi: TasksRepo.create({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        TasksRepo.create({
// EXPLAIN: Bu satırın görevi: entity_type: 'DEAL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          entity_type: 'DEAL',
// EXPLAIN: Bu satırın görevi: entity_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          entity_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: title: 'SLA Breach: ' + deal.stage,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          title: 'SLA Breach: ' + deal.stage,
// EXPLAIN: Bu satırın görevi: description: 'Stage SLA ' + slaDays + ' gün aşıldı.',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          description: 'Stage SLA ' + slaDays + ' gün aşıldı.',
// EXPLAIN: Bu satırın görevi: priority: 'high',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          priority: 'high',
// EXPLAIN: Bu satırın görevi: status: 'pending'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          status: 'pending'
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        });
// EXPLAIN: Bu satırın görevi: result.alerts_created++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.alerts_created++;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Lead scoring + top follow-ups. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Lead scoring + top follow-ups
// EXPLAIN: Bu satırın görevi: const scores = computeLeadScores_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const scores = computeLeadScores_();
// EXPLAIN: Bu satırın görevi: result.lead_scores = scores.length;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    result.lead_scores = scores.length;
// EXPLAIN: Bu satırın görevi: createTopFollowupTasks_(scores);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    createTopFollowupTasks_(scores);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Email draft queue. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Email draft queue
// EXPLAIN: Bu satırın görevi: const draftResult = processEmailDraftQueue_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const draftResult = processEmailDraftQueue_();
// EXPLAIN: Bu satırın görevi: result.draft_emails = draftResult.drafted;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    result.draft_emails = draftResult.drafted;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Ops dashboard snapshot. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Ops dashboard snapshot
// EXPLAIN: Bu satırın görevi: updateOpsDashboard_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    updateOpsDashboard_();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Drive share audit. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Drive share audit
// EXPLAIN: Bu satırın görevi: runDriveShareAudit_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    runDriveShareAudit_();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // SLA/stuck summary email. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // SLA/stuck summary email
// EXPLAIN: Bu satırın görevi: const recipients = cfg_('SLA_ALERT_RECIPIENTS', DEFAULTS.SLA_ALERT_RECIPIENTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const recipients = cfg_('SLA_ALERT_RECIPIENTS', DEFAULTS.SLA_ALERT_RECIPIENTS);
// EXPLAIN: Bu satırın görevi: if (recipients && (result.sla_violations > 0 || result.stuck_deals > 0)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (recipients && (result.sla_violations > 0 || result.stuck_deals > 0)) {
// EXPLAIN: Bu satırın görevi: const subject = 'CB-OS SLA & Stuck Deal Uyarısı';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const subject = 'CB-OS SLA & Stuck Deal Uyarısı';
// EXPLAIN: Bu satırın görevi: const body = [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const body = [
// EXPLAIN: Bu satırın görevi: 'SLA ihlalleri: ' + result.sla_violations,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        'SLA ihlalleri: ' + result.sla_violations,
// EXPLAIN: Bu satırın görevi: 'Stuck deal sayısı: ' + result.stuck_deals,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        'Stuck deal sayısı: ' + result.stuck_deals,
// EXPLAIN: Bu satırın görevi: 'Overdue task sayısı: ' + result.overdue_tasks. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        'Overdue task sayısı: ' + result.overdue_tasks
// EXPLAIN: Bu satırın görevi: ].join('\n');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      ].join('\n');
// EXPLAIN: Bu satırın görevi: GmailApp.sendEmail(recipients, subject, body);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      GmailApp.sendEmail(recipients, subject, body);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: Logger.log('GUARDRAILS | Job error: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('GUARDRAILS | Job error: ' + e.message);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: logJobRun_(ctx, jobName, '', '', '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  logJobRun_(ctx, jobName, '', '', '', 
// EXPLAIN: Bu satırın görevi: 'Stuck=' + result.stuck_deals + ', Overdue=' + result.overdue_tasks +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
             'Stuck=' + result.stuck_deals + ', Overdue=' + result.overdue_tasks + 
// EXPLAIN: Bu satırın görevi: ', SLA=' + result.sla_violations + ', LeadScores=' + result.lead_scores);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
             ', SLA=' + result.sla_violations + ', LeadScores=' + result.lead_scores);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('GUARDRAILS | Complete: ' + JSON.stringify(result));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('GUARDRAILS | Complete: ' + JSON.stringify(result));
// EXPLAIN: Bu satırın görevi: return result;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return result;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Manual trigger setup instructions. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Manual trigger setup instructions
// EXPLAIN: Bu satırın görevi: * User should create a time-driven trigger manually:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * User should create a time-driven trigger manually:
// EXPLAIN: Bu satırın görevi: * 1. Open Apps Script editor. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * 1. Open Apps Script editor
// EXPLAIN: Bu satırın görevi: * 2. Go to Triggers (clock icon). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * 2. Go to Triggers (clock icon)
// EXPLAIN: Bu satırın görevi: * 3. Add Trigger:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * 3. Add Trigger:
// EXPLAIN: Bu satırın görevi: *    - Function: ORCH_15MIN. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 *    - Function: ORCH_15MIN
// EXPLAIN: Bu satırın görevi: *    - Event source: Time-driven. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 *    - Event source: Time-driven
// EXPLAIN: Bu satırın görevi: *    - Type: Minutes timer. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 *    - Type: Minutes timer
// EXPLAIN: Bu satırın görevi: *    - Interval: Every 15 minutes. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 *    - Interval: Every 15 minutes
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function showTriggerSetupInstructions() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function showTriggerSetupInstructions() {
// EXPLAIN: Bu satırın görevi: const instructions = `. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const instructions = `
// EXPLAIN: Bu satırın görevi: ========================================. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
========================================
// EXPLAIN: Bu satırın görevi: ORCH_15MIN TRIGGER SETUP INSTRUCTIONS. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
ORCH_15MIN TRIGGER SETUP INSTRUCTIONS
// EXPLAIN: Bu satırın görevi: ========================================. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
========================================
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: To enable automatic orchestration every 15 minutes:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
To enable automatic orchestration every 15 minutes:
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: 1. In Apps Script editor, click the clock icon (Triggers). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
1. In Apps Script editor, click the clock icon (Triggers)
// EXPLAIN: Bu satırın görevi: 2. Click "+ Add Trigger". Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
2. Click "+ Add Trigger"
// EXPLAIN: Bu satırın görevi: 3. Configure:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
3. Configure:
// EXPLAIN: Bu satırın görevi: - Choose function: ORCH_15MIN. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   - Choose function: ORCH_15MIN
// EXPLAIN: Bu satırın görevi: - Choose deployment: Head. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   - Choose deployment: Head
// EXPLAIN: Bu satırın görevi: - Event source: Time-driven. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   - Event source: Time-driven
// EXPLAIN: Bu satırın görevi: - Type of time based trigger: Minutes timer. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   - Type of time based trigger: Minutes timer
// EXPLAIN: Bu satırın görevi: - Select minute interval: Every 15 minutes. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   - Select minute interval: Every 15 minutes
// EXPLAIN: Bu satırın görevi: 4. Click Save. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
4. Click Save
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: The orchestrator will then run automatically every 15 minutes,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
The orchestrator will then run automatically every 15 minutes,
// EXPLAIN: Bu satırın görevi: executing jobs in this order:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
executing jobs in this order:
// EXPLAIN: Bu satırın görevi: 1. ingest_process_job. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  1. ingest_process_job
// EXPLAIN: Bu satırın görevi: 2. calendar_sync_job. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  2. calendar_sync_job
// EXPLAIN: Bu satırın görevi: 3. gmail_scan_job. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  3. gmail_scan_job
// EXPLAIN: Bu satırın görevi: 4. guardrails_job. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  4. guardrails_job
// EXPLAIN: Bu satırın görevi: 5. dlq_retry_job. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  5. dlq_retry_job
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: ========================================. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
========================================
// EXPLAIN: Bu satırın görevi: `;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  `;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log(instructions);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log(instructions);
// EXPLAIN: Bu satırın görevi: return instructions;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return instructions;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
