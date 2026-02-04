// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS V1.0 - 13_IngestProcessJob.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS V1.0 - 13_IngestProcessJob.gs
// EXPLAIN: Bu satırın görevi: * Main ingest processing job - cursor-based, gap-free. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Main ingest processing job - cursor-based, gap-free
// EXPLAIN: Bu satırın görevi: * Processes INGEST_QUEUE items and routes to appropriate handlers. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Processes INGEST_QUEUE items and routes to appropriate handlers
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Process ingest queue items. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Process ingest queue items
// EXPLAIN: Bu satırın görevi: * Gap-free: stops on first failure, does not advance cursor. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Gap-free: stops on first failure, does not advance cursor
// EXPLAIN: Bu satırın görevi: * @param {Object} ctx - Job context with orch_run_id. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} ctx - Job context with orch_run_id
// EXPLAIN: Bu satırın görevi: * @returns {Object} Job result summary. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Job result summary
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function ingest_process_job(ctx) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function ingest_process_job(ctx) {
// EXPLAIN: Bu satırın görevi: ctx = ctx || createJobContext_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ctx = ctx || createJobContext_();
// EXPLAIN: Bu satırın görevi: const jobName = 'ingest_process_job';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const jobName = 'ingest_process_job';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Get current cursor. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Get current cursor
// EXPLAIN: Bu satırın görevi: const cursorBefore = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const cursorBefore = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);
// EXPLAIN: Bu satırın görevi: let cursorAfter = cursorBefore;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let cursorAfter = cursorBefore;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Get pending items. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Get pending items
// EXPLAIN: Bu satırın görevi: const batchSize = ctx.batch_size || cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const batchSize = ctx.batch_size || cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE);
// EXPLAIN: Bu satırın görevi: const pending = QueueRepo.getPending(cursorBefore, batchSize);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const pending = QueueRepo.getPending(cursorBefore, batchSize);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('INGEST_PROCESS | Starting with cursor=' + cursorBefore + ', pending=' + pending.length);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('INGEST_PROCESS | Starting with cursor=' + cursorBefore + ', pending=' + pending.length);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const result = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const result = {
// EXPLAIN: Bu satırın görevi: processed: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    processed: 0,
// EXPLAIN: Bu satırın görevi: skipped: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    skipped: 0,
// EXPLAIN: Bu satırın görevi: failed: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    failed: 0,
// EXPLAIN: Bu satırın görevi: stopped_on_failure: false. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    stopped_on_failure: false
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (const item of pending) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const item of pending) {
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    try {
// EXPLAIN: Bu satırın görevi: // Parse payload. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      // Parse payload
// EXPLAIN: Bu satırın görevi: const payload = parseJsonSafe_(item.payload_json);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const payload = parseJsonSafe_(item.payload_json);
// EXPLAIN: Bu satırın görevi: if (!payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (!payload) {
// EXPLAIN: Bu satırın görevi: // JSON parse failure -> DLQ. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // JSON parse failure -> DLQ
// EXPLAIN: Bu satırın görevi: QueueRepo.markFailed(item._rowIndex, item, 'JSON parse error');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        QueueRepo.markFailed(item._rowIndex, item, 'JSON parse error');
// EXPLAIN: Bu satırın görevi: result.failed++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.failed++;
// EXPLAIN: Bu satırın görevi: result.stopped_on_failure = true;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.stopped_on_failure = true;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: // Gap-free: log and break. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // Gap-free: log and break
// EXPLAIN: Bu satırın görevi: logJobRun_(ctx, jobName, cursorBefore, cursorAfter,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        logJobRun_(ctx, jobName, cursorBefore, cursorAfter, 
// EXPLAIN: Bu satırın görevi: AUDIT_CONTRACT_STRING,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                   AUDIT_CONTRACT_STRING, 
// EXPLAIN: Bu satırın görevi: 'Failed on ingest_id=' + item.ingest_id + ': JSON parse error');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                   'Failed on ingest_id=' + item.ingest_id + ': JSON parse error');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: // Evidence logging. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // Evidence logging
// EXPLAIN: Bu satırın görevi: logEvidence_('INGEST_FAIL', 'ingest_id=' + item.ingest_id + ' | error=JSON parse error');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        logEvidence_('INGEST_FAIL', 'ingest_id=' + item.ingest_id + ' | error=JSON parse error');
// EXPLAIN: Bu satırın görevi: break;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        break;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: // Check idempotency. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      // Check idempotency
// EXPLAIN: Bu satırın görevi: if (item.idempotency_key) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (item.idempotency_key) {
// EXPLAIN: Bu satırın görevi: const dedupResult = DedupRepo.insertIfNotExists(item.idempotency_key);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        const dedupResult = DedupRepo.insertIfNotExists(item.idempotency_key);
// EXPLAIN: Bu satırın görevi: if (!dedupResult.inserted) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        if (!dedupResult.inserted) {
// EXPLAIN: Bu satırın görevi: // Duplicate - skip. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          // Duplicate - skip
// EXPLAIN: Bu satırın görevi: QueueRepo.markSkipped(item._rowIndex);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          QueueRepo.markSkipped(item._rowIndex);
// EXPLAIN: Bu satırın görevi: result.skipped++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          result.skipped++;
// EXPLAIN: Bu satırın görevi: cursorAfter = item.received_at;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          cursorAfter = item.received_at;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
          
// EXPLAIN: Bu satırın görevi: Logger.log('INGEST_PROCESS | Skipped duplicate: ' + item.idempotency_key);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          Logger.log('INGEST_PROCESS | Skipped duplicate: ' + item.idempotency_key);
// EXPLAIN: Bu satırın görevi: continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          continue;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: // Route by ingest_type. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      // Route by ingest_type
// EXPLAIN: Bu satırın görevi: const processResult = routeIngestItem_(item, payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const processResult = routeIngestItem_(item, payload);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: if (processResult.success) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (processResult.success) {
// EXPLAIN: Bu satırın görevi: QueueRepo.markCompleted(item._rowIndex);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        QueueRepo.markCompleted(item._rowIndex);
// EXPLAIN: Bu satırın görevi: result.processed++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.processed++;
// EXPLAIN: Bu satırın görevi: cursorAfter = item.received_at;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        cursorAfter = item.received_at;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: Logger.log('INGEST_PROCESS | Completed: ' + item.ingest_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        Logger.log('INGEST_PROCESS | Completed: ' + item.ingest_id);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: // Evidence logging. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // Evidence logging
// EXPLAIN: Bu satırın görevi: logEvidence_('INGEST_SUCCESS', 'ingest_id=' + item.ingest_id + ' | type=' + item.ingest_type);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        logEvidence_('INGEST_SUCCESS', 'ingest_id=' + item.ingest_id + ' | type=' + item.ingest_type);
// EXPLAIN: Bu satırın görevi: } else {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      } else {
// EXPLAIN: Bu satırın görevi: // Processing failure -> DLQ. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // Processing failure -> DLQ
// EXPLAIN: Bu satırın görevi: QueueRepo.markFailed(item._rowIndex, item, processResult.error);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        QueueRepo.markFailed(item._rowIndex, item, processResult.error);
// EXPLAIN: Bu satırın görevi: result.failed++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.failed++;
// EXPLAIN: Bu satırın görevi: result.stopped_on_failure = true;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.stopped_on_failure = true;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: // Gap-free: log and break. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // Gap-free: log and break
// EXPLAIN: Bu satırın görevi: logJobRun_(ctx, jobName, cursorBefore, cursorAfter,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        logJobRun_(ctx, jobName, cursorBefore, cursorAfter, 
// EXPLAIN: Bu satırın görevi: AUDIT_CONTRACT_STRING,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                   AUDIT_CONTRACT_STRING, 
// EXPLAIN: Bu satırın görevi: 'Failed on ingest_id=' + item.ingest_id + ': ' + processResult.error);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                   'Failed on ingest_id=' + item.ingest_id + ': ' + processResult.error);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: logEvidence_('INGEST_FAIL', 'ingest_id=' + item.ingest_id + ' | error=' + processResult.error);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        logEvidence_('INGEST_FAIL', 'ingest_id=' + item.ingest_id + ' | error=' + processResult.error);
// EXPLAIN: Bu satırın görevi: break;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        break;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } catch (e) {
// EXPLAIN: Bu satırın görevi: // Unexpected error -> DLQ. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      // Unexpected error -> DLQ
// EXPLAIN: Bu satırın görevi: QueueRepo.markFailed(item._rowIndex, item, 'Unexpected error: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      QueueRepo.markFailed(item._rowIndex, item, 'Unexpected error: ' + e.message);
// EXPLAIN: Bu satırın görevi: result.failed++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      result.failed++;
// EXPLAIN: Bu satırın görevi: result.stopped_on_failure = true;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      result.stopped_on_failure = true;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: logJobRun_(ctx, jobName, cursorBefore, cursorAfter,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      logJobRun_(ctx, jobName, cursorBefore, cursorAfter, 
// EXPLAIN: Bu satırın görevi: AUDIT_CONTRACT_STRING,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                 AUDIT_CONTRACT_STRING, 
// EXPLAIN: Bu satırın görevi: 'Exception on ingest_id=' + item.ingest_id + ': ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                 'Exception on ingest_id=' + item.ingest_id + ': ' + e.message);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: logEvidence_('INGEST_EXCEPTION', 'ingest_id=' + item.ingest_id + ' | error=' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      logEvidence_('INGEST_EXCEPTION', 'ingest_id=' + item.ingest_id + ' | error=' + e.message);
// EXPLAIN: Bu satırın görevi: break;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      break;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Update cursor only if we processed something without failure. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Update cursor only if we processed something without failure
// EXPLAIN: Bu satırın görevi: if (cursorAfter !== cursorBefore) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (cursorAfter !== cursorBefore) {
// EXPLAIN: Bu satırın görevi: setCursor_(CURSORS.INGEST_LAST_RECEIVED_AT, cursorAfter);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    setCursor_(CURSORS.INGEST_LAST_RECEIVED_AT, cursorAfter);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Log job run (success case). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Log job run (success case)
// EXPLAIN: Bu satırın görevi: if (!result.stopped_on_failure) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!result.stopped_on_failure) {
// EXPLAIN: Bu satırın görevi: logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '', 
// EXPLAIN: Bu satırın görevi: 'Processed=' + result.processed + ', Skipped=' + result.skipped);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
               'Processed=' + result.processed + ', Skipped=' + result.skipped);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Dump evidence. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Dump evidence
// EXPLAIN: Bu satırın görevi: dumpSheetEvidence_(SHEETS.INGEST_QUEUE, 2, 5);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  dumpSheetEvidence_(SHEETS.INGEST_QUEUE, 2, 5);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('INGEST_PROCESS | Complete: ' + JSON.stringify(result));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('INGEST_PROCESS | Complete: ' + JSON.stringify(result));
// EXPLAIN: Bu satırın görevi: return result;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return result;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Route ingest item to appropriate handler based on ingest_type. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Route ingest item to appropriate handler based on ingest_type
// EXPLAIN: Bu satırın görevi: * @param {Object} item - Queue item. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} item - Queue item
// EXPLAIN: Bu satırın görevi: * @param {Object} payload - Parsed payload. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} payload - Parsed payload
// EXPLAIN: Bu satırın görevi: * @returns {Object} Result with success flag and optional error. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Result with success flag and optional error
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function routeIngestItem_(item, payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function routeIngestItem_(item, payload) {
// EXPLAIN: Bu satırın görevi: const ingestType = item.ingest_type;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const ingestType = item.ingest_type;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: switch (ingestType) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    switch (ingestType) {
// EXPLAIN: Bu satırın görevi: case INGEST_TYPES.NEW_LEAD:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      case INGEST_TYPES.NEW_LEAD:
// EXPLAIN: Bu satırın görevi: return handleNewLead_(item, payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        return handleNewLead_(item, payload);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: case INGEST_TYPES.FORM_LEAD:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      case INGEST_TYPES.FORM_LEAD:
// EXPLAIN: Bu satırın görevi: return handleNewLead_(item, payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        return handleNewLead_(item, payload);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: case INGEST_TYPES.GMAIL_SIGNAL:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      case INGEST_TYPES.GMAIL_SIGNAL:
// EXPLAIN: Bu satırın görevi: return handleGmailSignal_(item, payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        return handleGmailSignal_(item, payload);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: case INGEST_TYPES.CONTACT_UPDATE:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      case INGEST_TYPES.CONTACT_UPDATE:
// EXPLAIN: Bu satırın görevi: return handleContactUpdate_(item, payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        return handleContactUpdate_(item, payload);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: case INGEST_TYPES.DEAL_UPDATE:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      case INGEST_TYPES.DEAL_UPDATE:
// EXPLAIN: Bu satırın görevi: return handleDealUpdate_(item, payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        return handleDealUpdate_(item, payload);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: case INGEST_TYPES.TASK_CREATE:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      case INGEST_TYPES.TASK_CREATE:
// EXPLAIN: Bu satırın görevi: return handleTaskCreate_(item, payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        return handleTaskCreate_(item, payload);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: case INGEST_TYPES.TASK_UPDATE:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      case INGEST_TYPES.TASK_UPDATE:
// EXPLAIN: Bu satırın görevi: return handleTaskUpdate_(item, payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        return handleTaskUpdate_(item, payload);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: case INGEST_TYPES.EVENT_LOG:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      case INGEST_TYPES.EVENT_LOG:
// EXPLAIN: Bu satırın görevi: return handleEventLog_(item, payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        return handleEventLog_(item, payload);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: case INGEST_TYPES.APPOINTMENT_CREATE:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      case INGEST_TYPES.APPOINTMENT_CREATE:
// EXPLAIN: Bu satırın görevi: return handleAppointmentCreate_(item, payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        return handleAppointmentCreate_(item, payload);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: case INGEST_TYPES.MANUAL_IMPORT:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      case INGEST_TYPES.MANUAL_IMPORT:
// EXPLAIN: Bu satırın görevi: return handleManualImport_(item, payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        return handleManualImport_(item, payload);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: default:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      default:
// EXPLAIN: Bu satırın görevi: Logger.log('INGEST | Unknown type: ' + ingestType);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        Logger.log('INGEST | Unknown type: ' + ingestType);
// EXPLAIN: Bu satırın görevi: return { success: false, error: 'Unknown ingest_type: ' + ingestType };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        return { success: false, error: 'Unknown ingest_type: ' + ingestType };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: return { success: false, error: 'Handler error: ' + e.message };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { success: false, error: 'Handler error: ' + e.message };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Handle new lead - create contact and deal. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Handle new lead - create contact and deal
// EXPLAIN: Bu satırın görevi: * @param {Object} item - Queue item. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} item - Queue item
// EXPLAIN: Bu satırın görevi: * @param {Object} payload - Parsed payload. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} payload - Parsed payload
// EXPLAIN: Bu satırın görevi: * @returns {Object} Result. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Result
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function handleNewLead_(item, payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function handleNewLead_(item, payload) {
// EXPLAIN: Bu satırın görevi: // Normalize based on deal type. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Normalize based on deal type
// EXPLAIN: Bu satırın görevi: let normalized;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let normalized;
// EXPLAIN: Bu satırın görevi: const dealType = (payload.deal_type || '').toUpperCase();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const dealType = (payload.deal_type || '').toUpperCase();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (dealType === 'LAND') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (dealType === 'LAND') {
// EXPLAIN: Bu satırın görevi: normalized = normalizeLandPayload_(payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    normalized = normalizeLandPayload_(payload);
// EXPLAIN: Bu satırın görevi: } else {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } else {
// EXPLAIN: Bu satırın görevi: normalized = normalizeNewLead_(payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    normalized = normalizeNewLead_(payload);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Check for normalization errors. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Check for normalization errors
// EXPLAIN: Bu satırın görevi: if (normalized.errors && normalized.errors.length > 0) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (normalized.errors && normalized.errors.length > 0) {
// EXPLAIN: Bu satırın görevi: return { success: false, error: 'Normalization error: ' + normalized.errors.join(', ') };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { success: false, error: 'Normalization error: ' + normalized.errors.join(', ') };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Find or create contact. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Find or create contact
// EXPLAIN: Bu satırın görevi: normalized.contact.source = item.source || normalized.contact.source;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  normalized.contact.source = item.source || normalized.contact.source;
// EXPLAIN: Bu satırın görevi: normalized.contact.source_ref_id = item.source_ref_id || normalized.contact.source_ref_id;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  normalized.contact.source_ref_id = item.source_ref_id || normalized.contact.source_ref_id;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const contact = ContactsRepo.findOrCreate(normalized.contact);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const contact = ContactsRepo.findOrCreate(normalized.contact);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Create deal linked to contact. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Create deal linked to contact
// EXPLAIN: Bu satırın görevi: normalized.deal.contact_id = contact.contact_id;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  normalized.deal.contact_id = contact.contact_id;
// EXPLAIN: Bu satırın görevi: const deal = DealsRepo.create(normalized.deal);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const deal = DealsRepo.create(normalized.deal);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Log events. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Log events
// EXPLAIN: Bu satırın görevi: EventsRepo.append({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EventsRepo.append({
// EXPLAIN: Bu satırın görevi: entity_type: 'CONTACT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: 'CONTACT',
// EXPLAIN: Bu satırın görevi: entity_id: contact.contact_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: contact.contact_id,
// EXPLAIN: Bu satırın görevi: event_type: EventsRepo.EVENT_TYPES.CONTACT_CREATED,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    event_type: EventsRepo.EVENT_TYPES.CONTACT_CREATED,
// EXPLAIN: Bu satırın görevi: payload: { source: item.source },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    payload: { source: item.source },
// EXPLAIN: Bu satırın görevi: source: item.source,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source: item.source,
// EXPLAIN: Bu satırın görevi: source_ref_id: item.source_ref_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source_ref_id: item.source_ref_id,
// EXPLAIN: Bu satırın görevi: idempotency_key: item.idempotency_key + '_contact'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    idempotency_key: item.idempotency_key + '_contact'
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: EventsRepo.append({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EventsRepo.append({
// EXPLAIN: Bu satırın görevi: entity_type: 'DEAL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: 'DEAL',
// EXPLAIN: Bu satırın görevi: entity_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: event_type: EventsRepo.EVENT_TYPES.DEAL_CREATED,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    event_type: EventsRepo.EVENT_TYPES.DEAL_CREATED,
// EXPLAIN: Bu satırın görevi: payload: { deal_type: deal.deal_type, stage: deal.stage },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    payload: { deal_type: deal.deal_type, stage: deal.stage },
// EXPLAIN: Bu satırın görevi: source: item.source,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source: item.source,
// EXPLAIN: Bu satırın görevi: source_ref_id: item.source_ref_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source_ref_id: item.source_ref_id,
// EXPLAIN: Bu satırın görevi: idempotency_key: item.idempotency_key + '_deal'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    idempotency_key: item.idempotency_key + '_deal'
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Create first touch task. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Create first touch task
// EXPLAIN: Bu satırın görevi: TasksRepo.createFromTemplate('first_touch', {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  TasksRepo.createFromTemplate('first_touch', {
// EXPLAIN: Bu satırın görevi: entity_type: 'DEAL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: 'DEAL',
// EXPLAIN: Bu satırın görevi: entity_id: deal.deal_id. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: deal.deal_id
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (cfg_('FOLLOWUP_SEQUENCE_ENABLED', DEFAULTS.FOLLOWUP_SEQUENCE_ENABLED)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (cfg_('FOLLOWUP_SEQUENCE_ENABLED', DEFAULTS.FOLLOWUP_SEQUENCE_ENABLED)) {
// EXPLAIN: Bu satırın görevi: scheduleFollowupSequence_(deal, contact);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    scheduleFollowupSequence_(deal, contact);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: recordLeadSignal_(deal, contact, 'FORM_LEAD', item.source, 30, 'new_lead');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  recordLeadSignal_(deal, contact, 'FORM_LEAD', item.source, 30, 'new_lead');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('NEW_LEAD | Created contact=' + contact.contact_id + ', deal=' + deal.deal_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('NEW_LEAD | Created contact=' + contact.contact_id + ', deal=' + deal.deal_id);
// EXPLAIN: Bu satırın görevi: return { success: true, contact_id: contact.contact_id, deal_id: deal.deal_id };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { success: true, contact_id: contact.contact_id, deal_id: deal.deal_id };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Handle contact update. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Handle contact update
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function handleContactUpdate_(item, payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function handleContactUpdate_(item, payload) {
// EXPLAIN: Bu satırın görevi: const contactId = payload.contact_id;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const contactId = payload.contact_id;
// EXPLAIN: Bu satırın görevi: if (!contactId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!contactId) {
// EXPLAIN: Bu satırın görevi: return { success: false, error: 'Missing contact_id' };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { success: false, error: 'Missing contact_id' };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const contact = ContactsRepo.findById(contactId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const contact = ContactsRepo.findById(contactId);
// EXPLAIN: Bu satırın görevi: if (!contact) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!contact) {
// EXPLAIN: Bu satırın görevi: return { success: false, error: 'Contact not found: ' + contactId };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { success: false, error: 'Contact not found: ' + contactId };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Update allowed fields. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Update allowed fields
// EXPLAIN: Bu satırın görevi: const updates = {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const updates = {};
// EXPLAIN: Bu satırın görevi: const allowedFields = ['first_name', 'last_name', 'email', 'phone', 'whatsapp',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const allowedFields = ['first_name', 'last_name', 'email', 'phone', 'whatsapp', 
// EXPLAIN: Bu satırın görevi: 'status', 'tags', 'notes', 'preferred_contact_method'];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                         'status', 'tags', 'notes', 'preferred_contact_method'];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (const field of allowedFields) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const field of allowedFields) {
// EXPLAIN: Bu satırın görevi: if (payload[field] !== undefined) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (payload[field] !== undefined) {
// EXPLAIN: Bu satırın görevi: updates[field] = payload[field];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      updates[field] = payload[field];
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: ContactsRepo.update(contactId, updates);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ContactsRepo.update(contactId, updates);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: EventsRepo.append({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EventsRepo.append({
// EXPLAIN: Bu satırın görevi: entity_type: 'CONTACT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: 'CONTACT',
// EXPLAIN: Bu satırın görevi: entity_id: contactId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: contactId,
// EXPLAIN: Bu satırın görevi: event_type: EventsRepo.EVENT_TYPES.CONTACT_UPDATED,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    event_type: EventsRepo.EVENT_TYPES.CONTACT_UPDATED,
// EXPLAIN: Bu satırın görevi: payload: updates,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    payload: updates,
// EXPLAIN: Bu satırın görevi: source: item.source,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source: item.source,
// EXPLAIN: Bu satırın görevi: idempotency_key: item.idempotency_key. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    idempotency_key: item.idempotency_key
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return { success: true };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { success: true };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Handle deal update. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Handle deal update
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function handleDealUpdate_(item, payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function handleDealUpdate_(item, payload) {
// EXPLAIN: Bu satırın görevi: const dealId = payload.deal_id;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const dealId = payload.deal_id;
// EXPLAIN: Bu satırın görevi: if (!dealId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!dealId) {
// EXPLAIN: Bu satırın görevi: return { success: false, error: 'Missing deal_id' };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { success: false, error: 'Missing deal_id' };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const deal = DealsRepo.findById(dealId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const deal = DealsRepo.findById(dealId);
// EXPLAIN: Bu satırın görevi: if (!deal) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!deal) {
// EXPLAIN: Bu satırın görevi: return { success: false, error: 'Deal not found: ' + dealId };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { success: false, error: 'Deal not found: ' + dealId };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Handle stage change specially. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Handle stage change specially
// EXPLAIN: Bu satırın görevi: if (payload.stage && payload.stage !== deal.stage) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (payload.stage && payload.stage !== deal.stage) {
// EXPLAIN: Bu satırın görevi: const stageResult = DealsRepo.changeStage(dealId, payload.stage);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const stageResult = DealsRepo.changeStage(dealId, payload.stage);
// EXPLAIN: Bu satırın görevi: if (!stageResult.success) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!stageResult.success) {
// EXPLAIN: Bu satırın görevi: return { success: false, error: stageResult.message };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return { success: false, error: stageResult.message };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Update other fields. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Update other fields
// EXPLAIN: Bu satırın görevi: const updates = {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const updates = {};
// EXPLAIN: Bu satırın görevi: const allowedFields = ['deal_value', 'currency', 'expected_close_date', 'assigned_to',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const allowedFields = ['deal_value', 'currency', 'expected_close_date', 'assigned_to',
// EXPLAIN: Bu satırın görevi: 'property_type', 'property_address', 'listing_price',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                         'property_type', 'property_address', 'listing_price', 
// EXPLAIN: Bu satırın görevi: 'commission_rate', 'notes', 'docs_required', 'parcel_present',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                         'commission_rate', 'notes', 'docs_required', 'parcel_present',
// EXPLAIN: Bu satırın görevi: 'lead_source', 'intent', 'budget', 'region', 'timing',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                         'lead_source', 'intent', 'budget', 'region', 'timing',
// EXPLAIN: Bu satırın görevi: 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                         'utm_source', 'utm_medium', 'utm_campaign', 'utm_term',
// EXPLAIN: Bu satırın görevi: 'utm_content', 'gclid', 'lost_reason', 'attribution_campaign',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                         'utm_content', 'gclid', 'lost_reason', 'attribution_campaign',
// EXPLAIN: Bu satırın görevi: 'doc_package_url'];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                         'doc_package_url'];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (const field of allowedFields) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const field of allowedFields) {
// EXPLAIN: Bu satırın görevi: if (payload[field] !== undefined) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (payload[field] !== undefined) {
// EXPLAIN: Bu satırın görevi: updates[field] = payload[field];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      updates[field] = payload[field];
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (Object.keys(updates).length > 0) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (Object.keys(updates).length > 0) {
// EXPLAIN: Bu satırın görevi: DealsRepo.update(dealId, updates);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    DealsRepo.update(dealId, updates);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return { success: true };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { success: true };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Handle task create. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Handle task create
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function handleTaskCreate_(item, payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function handleTaskCreate_(item, payload) {
// EXPLAIN: Bu satırın görevi: const normalized = normalizeTask_(payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const normalized = normalizeTask_(payload);
// EXPLAIN: Bu satırın görevi: const task = TasksRepo.create(normalized);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const task = TasksRepo.create(normalized);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: EventsRepo.append({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EventsRepo.append({
// EXPLAIN: Bu satırın görevi: entity_type: 'TASK',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: 'TASK',
// EXPLAIN: Bu satırın görevi: entity_id: task.task_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: task.task_id,
// EXPLAIN: Bu satırın görevi: event_type: EventsRepo.EVENT_TYPES.TASK_CREATED,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    event_type: EventsRepo.EVENT_TYPES.TASK_CREATED,
// EXPLAIN: Bu satırın görevi: payload: { title: task.title },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    payload: { title: task.title },
// EXPLAIN: Bu satırın görevi: source: item.source,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source: item.source,
// EXPLAIN: Bu satırın görevi: idempotency_key: item.idempotency_key. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    idempotency_key: item.idempotency_key
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return { success: true, task_id: task.task_id };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { success: true, task_id: task.task_id };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Handle task update. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Handle task update
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function handleTaskUpdate_(item, payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function handleTaskUpdate_(item, payload) {
// EXPLAIN: Bu satırın görevi: const taskId = payload.task_id;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const taskId = payload.task_id;
// EXPLAIN: Bu satırın görevi: if (!taskId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!taskId) {
// EXPLAIN: Bu satırın görevi: return { success: false, error: 'Missing task_id' };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { success: false, error: 'Missing task_id' };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const task = TasksRepo.findById(taskId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const task = TasksRepo.findById(taskId);
// EXPLAIN: Bu satırın görevi: if (!task) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!task) {
// EXPLAIN: Bu satırın görevi: return { success: false, error: 'Task not found: ' + taskId };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { success: false, error: 'Task not found: ' + taskId };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Handle completion. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Handle completion
// EXPLAIN: Bu satırın görevi: if (payload.status === 'completed') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (payload.status === 'completed') {
// EXPLAIN: Bu satırın görevi: TasksRepo.complete(taskId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    TasksRepo.complete(taskId);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: EventsRepo.append({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    EventsRepo.append({
// EXPLAIN: Bu satırın görevi: entity_type: 'TASK',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_type: 'TASK',
// EXPLAIN: Bu satırın görevi: entity_id: taskId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_id: taskId,
// EXPLAIN: Bu satırın görevi: event_type: EventsRepo.EVENT_TYPES.TASK_COMPLETED,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      event_type: EventsRepo.EVENT_TYPES.TASK_COMPLETED,
// EXPLAIN: Bu satırın görevi: payload: {},. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      payload: {},
// EXPLAIN: Bu satırın görevi: source: item.source,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source: item.source,
// EXPLAIN: Bu satırın görevi: idempotency_key: item.idempotency_key. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      idempotency_key: item.idempotency_key
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: } else {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } else {
// EXPLAIN: Bu satırın görevi: // Update fields. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Update fields
// EXPLAIN: Bu satırın görevi: const updates = {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const updates = {};
// EXPLAIN: Bu satırın görevi: const allowedFields = ['title', 'description', 'due_date', 'priority', 'status', 'assigned_to'];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allowedFields = ['title', 'description', 'due_date', 'priority', 'status', 'assigned_to'];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: for (const field of allowedFields) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    for (const field of allowedFields) {
// EXPLAIN: Bu satırın görevi: if (payload[field] !== undefined) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (payload[field] !== undefined) {
// EXPLAIN: Bu satırın görevi: updates[field] = payload[field];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        updates[field] = payload[field];
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: TasksRepo.update(taskId, updates);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    TasksRepo.update(taskId, updates);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return { success: true };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { success: true };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Handle event log (direct event append). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Handle event log (direct event append)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function handleEventLog_(item, payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function handleEventLog_(item, payload) {
// EXPLAIN: Bu satırın görevi: EventsRepo.append({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EventsRepo.append({
// EXPLAIN: Bu satırın görevi: entity_type: payload.entity_type || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: payload.entity_type || '',
// EXPLAIN: Bu satırın görevi: entity_id: payload.entity_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: payload.entity_id || '',
// EXPLAIN: Bu satırın görevi: event_type: payload.event_type || 'CUSTOM',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    event_type: payload.event_type || 'CUSTOM',
// EXPLAIN: Bu satırın görevi: payload: payload.data || {},. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    payload: payload.data || {},
// EXPLAIN: Bu satırın görevi: source: item.source,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source: item.source,
// EXPLAIN: Bu satırın görevi: source_ref_id: item.source_ref_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source_ref_id: item.source_ref_id,
// EXPLAIN: Bu satırın görevi: idempotency_key: item.idempotency_key. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    idempotency_key: item.idempotency_key
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return { success: true };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { success: true };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Handle Gmail signal - link email to contact/deal and record lead signal. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Handle Gmail signal - link email to contact/deal and record lead signal
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function handleGmailSignal_(item, payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function handleGmailSignal_(item, payload) {
// EXPLAIN: Bu satırın görevi: const email = normalizeEmail_(payload.email || payload.from || '');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const email = normalizeEmail_(payload.email || payload.from || '');
// EXPLAIN: Bu satırın görevi: if (!email) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!email) {
// EXPLAIN: Bu satırın görevi: return { success: false, error: 'Missing email in Gmail signal' };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { success: false, error: 'Missing email in Gmail signal' };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const contact = ContactsRepo.findByEmail(email);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const contact = ContactsRepo.findByEmail(email);
// EXPLAIN: Bu satırın görevi: if (!contact) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!contact) {
// EXPLAIN: Bu satırın görevi: EventsRepo.append({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    EventsRepo.append({
// EXPLAIN: Bu satırın görevi: entity_type: 'EMAIL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_type: 'EMAIL',
// EXPLAIN: Bu satırın görevi: entity_id: email,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_id: email,
// EXPLAIN: Bu satırın görevi: event_type: EventsRepo.EVENT_TYPES.EMAIL_RECEIVED,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      event_type: EventsRepo.EVENT_TYPES.EMAIL_RECEIVED,
// EXPLAIN: Bu satırın görevi: payload: { subject: payload.subject || '', label: payload.label || '' },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      payload: { subject: payload.subject || '', label: payload.label || '' },
// EXPLAIN: Bu satırın görevi: source: item.source || 'gmail',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source: item.source || 'gmail',
// EXPLAIN: Bu satırın görevi: idempotency_key: item.idempotency_key. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      idempotency_key: item.idempotency_key
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: return { success: true, message: 'Contact not found for email: ' + email };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { success: true, message: 'Contact not found for email: ' + email };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const deals = DealsRepo.findByContactId(contact.contact_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const deals = DealsRepo.findByContactId(contact.contact_id);
// EXPLAIN: Bu satırın görevi: const deal = deals.length > 0 ? deals[0] : null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const deal = deals.length > 0 ? deals[0] : null;
// EXPLAIN: Bu satırın görevi: if (!deal) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!deal) {
// EXPLAIN: Bu satırın görevi: EventsRepo.append({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    EventsRepo.append({
// EXPLAIN: Bu satırın görevi: entity_type: 'CONTACT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_type: 'CONTACT',
// EXPLAIN: Bu satırın görevi: entity_id: contact.contact_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_id: contact.contact_id,
// EXPLAIN: Bu satırın görevi: event_type: EventsRepo.EVENT_TYPES.EMAIL_RECEIVED,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      event_type: EventsRepo.EVENT_TYPES.EMAIL_RECEIVED,
// EXPLAIN: Bu satırın görevi: payload: { subject: payload.subject || '', label: payload.label || '' },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      payload: { subject: payload.subject || '', label: payload.label || '' },
// EXPLAIN: Bu satırın görevi: source: item.source || 'gmail',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source: item.source || 'gmail',
// EXPLAIN: Bu satırın görevi: idempotency_key: item.idempotency_key. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      idempotency_key: item.idempotency_key
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: return { success: true, message: 'Deal not found for contact: ' + contact.contact_id };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { success: true, message: 'Deal not found for contact: ' + contact.contact_id };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: recordLeadSignal_(deal, contact, payload.signal_type || 'GMAIL_SIGNAL', 'gmail', payload.weight || 10, payload.subject || '');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  recordLeadSignal_(deal, contact, payload.signal_type || 'GMAIL_SIGNAL', 'gmail', payload.weight || 10, payload.subject || '');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: EventsRepo.append({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EventsRepo.append({
// EXPLAIN: Bu satırın görevi: entity_type: 'CONTACT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: 'CONTACT',
// EXPLAIN: Bu satırın görevi: entity_id: contact.contact_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: contact.contact_id,
// EXPLAIN: Bu satırın görevi: event_type: EventsRepo.EVENT_TYPES.EMAIL_RECEIVED,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    event_type: EventsRepo.EVENT_TYPES.EMAIL_RECEIVED,
// EXPLAIN: Bu satırın görevi: payload: { subject: payload.subject || '', label: payload.label || '' },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    payload: { subject: payload.subject || '', label: payload.label || '' },
// EXPLAIN: Bu satırın görevi: source: item.source || 'gmail',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source: item.source || 'gmail',
// EXPLAIN: Bu satırın görevi: idempotency_key: item.idempotency_key. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    idempotency_key: item.idempotency_key
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return { success: true };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { success: true };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Handle appointment create. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Handle appointment create
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function handleAppointmentCreate_(item, payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function handleAppointmentCreate_(item, payload) {
// EXPLAIN: Bu satırın görevi: const normalized = normalizeAppointment_(payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const normalized = normalizeAppointment_(payload);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const appt = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const appt = {
// EXPLAIN: Bu satırın görevi: appointment_id: id_(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    appointment_id: id_(),
// EXPLAIN: Bu satırın görevi: created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: Bu satırın görevi: ...normalized,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ...normalized,
// EXPLAIN: Bu satırın görevi: status: 'scheduled',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    status: 'scheduled',
// EXPLAIN: Bu satırın görevi: google_event_id: '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    google_event_id: '',
// EXPLAIN: Bu satırın görevi: reminder_sent: ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    reminder_sent: ''
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: appendRow_(SHEETS.APPOINTMENTS, appt);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  appendRow_(SHEETS.APPOINTMENTS, appt);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: EventsRepo.append({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EventsRepo.append({
// EXPLAIN: Bu satırın görevi: entity_type: 'APPOINTMENT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: 'APPOINTMENT',
// EXPLAIN: Bu satırın görevi: entity_id: appt.appointment_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: appt.appointment_id,
// EXPLAIN: Bu satırın görevi: event_type: EventsRepo.EVENT_TYPES.APPOINTMENT_CREATED,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    event_type: EventsRepo.EVENT_TYPES.APPOINTMENT_CREATED,
// EXPLAIN: Bu satırın görevi: payload: { scheduled_at: appt.scheduled_at },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    payload: { scheduled_at: appt.scheduled_at },
// EXPLAIN: Bu satırın görevi: source: item.source,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source: item.source,
// EXPLAIN: Bu satırın görevi: idempotency_key: item.idempotency_key. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    idempotency_key: item.idempotency_key
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return { success: true, appointment_id: appt.appointment_id };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { success: true, appointment_id: appt.appointment_id };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Handle manual import (generic data import). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Handle manual import (generic data import)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function handleManualImport_(item, payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function handleManualImport_(item, payload) {
// EXPLAIN: Bu satırın görevi: // Log as event for audit trail. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Log as event for audit trail
// EXPLAIN: Bu satırın görevi: EventsRepo.append({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EventsRepo.append({
// EXPLAIN: Bu satırın görevi: entity_type: payload.entity_type || 'IMPORT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: payload.entity_type || 'IMPORT',
// EXPLAIN: Bu satırın görevi: entity_id: payload.entity_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: payload.entity_id || '',
// EXPLAIN: Bu satırın görevi: event_type: 'MANUAL_IMPORT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    event_type: 'MANUAL_IMPORT',
// EXPLAIN: Bu satırın görevi: payload: payload,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    payload: payload,
// EXPLAIN: Bu satırın görevi: source: item.source,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source: item.source,
// EXPLAIN: Bu satırın görevi: idempotency_key: item.idempotency_key. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    idempotency_key: item.idempotency_key
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return { success: true };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { success: true };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
