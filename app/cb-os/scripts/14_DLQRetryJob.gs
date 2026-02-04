// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS V1.0 - 14_DLQRetryJob.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS V1.0 - 14_DLQRetryJob.gs
// EXPLAIN: Bu satırın görevi: * Dead Letter Queue retry job. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Dead Letter Queue retry job
// EXPLAIN: Bu satırın görevi: * Requeues failed items for reprocessing. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Requeues failed items for reprocessing
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * DLQ retry job - requeue failed items. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * DLQ retry job - requeue failed items
// EXPLAIN: Bu satırın görevi: * @param {Object} ctx - Job context with orch_run_id. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} ctx - Job context with orch_run_id
// EXPLAIN: Bu satırın görevi: * @returns {Object} Job result summary. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Job result summary
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function dlq_retry_job(ctx) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function dlq_retry_job(ctx) {
// EXPLAIN: Bu satırın görevi: ctx = ctx || createJobContext_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ctx = ctx || createJobContext_();
// EXPLAIN: Bu satırın görevi: const jobName = 'dlq_retry_job';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const jobName = 'dlq_retry_job';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const cursorBefore = getCursor_(CURSORS.DLQ_LAST_PROCESSED_AT);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const cursorBefore = getCursor_(CURSORS.DLQ_LAST_PROCESSED_AT);
// EXPLAIN: Bu satırın görevi: let cursorAfter = cursorBefore;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let cursorAfter = cursorBefore;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const maxRetry = cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const maxRetry = cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY);
// EXPLAIN: Bu satırın görevi: const batchSize = cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const batchSize = cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Get DLQ items. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Get DLQ items
// EXPLAIN: Bu satırın görevi: const dlqData = getSheetData_(SHEETS.DLQ);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const dlqData = getSheetData_(SHEETS.DLQ);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Filter items eligible for retry (retry_count < max). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Filter items eligible for retry (retry_count < max)
// EXPLAIN: Bu satırın görevi: const eligible = dlqData.filter(row => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const eligible = dlqData.filter(row => {
// EXPLAIN: Bu satırın görevi: const retryCount = parseInt(row.retry_count) || 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const retryCount = parseInt(row.retry_count) || 0;
// EXPLAIN: Bu satırın görevi: return retryCount < maxRetry;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return retryCount < maxRetry;
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Sort by created_at ASC. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Sort by created_at ASC
// EXPLAIN: Bu satırın görevi: eligible.sort((a, b) => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  eligible.sort((a, b) => {
// EXPLAIN: Bu satırın görevi: if (a.created_at < b.created_at) return -1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (a.created_at < b.created_at) return -1;
// EXPLAIN: Bu satırın görevi: if (a.created_at > b.created_at) return 1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (a.created_at > b.created_at) return 1;
// EXPLAIN: Bu satırın görevi: return 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return 0;
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Take batch. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Take batch
// EXPLAIN: Bu satırın görevi: const batch = eligible.slice(0, batchSize);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const batch = eligible.slice(0, batchSize);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('DLQ_RETRY | Starting with ' + batch.length + ' items (cursor=' + cursorBefore + ')');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('DLQ_RETRY | Starting with ' + batch.length + ' items (cursor=' + cursorBefore + ')');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const result = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const result = {
// EXPLAIN: Bu satırın görevi: retried: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    retried: 0,
// EXPLAIN: Bu satırın görevi: skipped: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    skipped: 0,
// EXPLAIN: Bu satırın görevi: max_retry_reached: 0. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    max_retry_reached: 0
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (const dlqItem of batch) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const dlqItem of batch) {
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    try {
// EXPLAIN: Bu satırın görevi: const ingestId = dlqItem.ingest_id;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const ingestId = dlqItem.ingest_id;
// EXPLAIN: Bu satırın görevi: const retryCount = parseInt(dlqItem.retry_count) || 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const retryCount = parseInt(dlqItem.retry_count) || 0;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: Logger.log('DLQ_RETRY | Processing ingest_id=' + ingestId + ', retry_count=' + retryCount);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      Logger.log('DLQ_RETRY | Processing ingest_id=' + ingestId + ', retry_count=' + retryCount);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: // Find original queue item. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      // Find original queue item
// EXPLAIN: Bu satırın görevi: const queueItem = QueueRepo.getByIngestId(ingestId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const queueItem = QueueRepo.getByIngestId(ingestId);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: if (!queueItem) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (!queueItem) {
// EXPLAIN: Bu satırın görevi: Logger.log('DLQ_RETRY | Queue item not found for ingest_id=' + ingestId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        Logger.log('DLQ_RETRY | Queue item not found for ingest_id=' + ingestId);
// EXPLAIN: Bu satırın görevi: result.skipped++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.skipped++;
// EXPLAIN: Bu satırın görevi: continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        continue;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: // Reset queue item for retry. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      // Reset queue item for retry
// EXPLAIN: Bu satırın görevi: const resetSuccess = QueueRepo.resetForRetry(ingestId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const resetSuccess = QueueRepo.resetForRetry(ingestId);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: if (resetSuccess) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (resetSuccess) {
// EXPLAIN: Bu satırın görevi: // Update DLQ: increment retry_count, set last_retry_at. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // Update DLQ: increment retry_count, set last_retry_at
// EXPLAIN: Bu satırın görevi: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satırın görevi: updateRow_(SHEETS.DLQ, dlqItem._rowIndex, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        updateRow_(SHEETS.DLQ, dlqItem._rowIndex, {
// EXPLAIN: Bu satırın görevi: retry_count: retryCount + 1,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          retry_count: retryCount + 1,
// EXPLAIN: Bu satırın görevi: last_retry_at: now. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          last_retry_at: now
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: result.retried++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.retried++;
// EXPLAIN: Bu satırın görevi: cursorAfter = dlqItem.created_at;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        cursorAfter = dlqItem.created_at;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: // Evidence logging. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // Evidence logging
// EXPLAIN: Bu satırın görevi: logEvidence_('DLQ_RETRY', 'ingest_id=' + ingestId + ' | retry_count=' + (retryCount + 1));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        logEvidence_('DLQ_RETRY', 'ingest_id=' + ingestId + ' | retry_count=' + (retryCount + 1));
// EXPLAIN: Bu satırın görevi: } else {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      } else {
// EXPLAIN: Bu satırın görevi: Logger.log('DLQ_RETRY | Failed to reset queue item: ' + ingestId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        Logger.log('DLQ_RETRY | Failed to reset queue item: ' + ingestId);
// EXPLAIN: Bu satırın görevi: result.skipped++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        result.skipped++;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } catch (e) {
// EXPLAIN: Bu satırın görevi: Logger.log('DLQ_RETRY | Error processing DLQ item: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      Logger.log('DLQ_RETRY | Error processing DLQ item: ' + e.message);
// EXPLAIN: Bu satırın görevi: result.skipped++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      result.skipped++;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Update cursor. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Update cursor
// EXPLAIN: Bu satırın görevi: if (cursorAfter !== cursorBefore) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (cursorAfter !== cursorBefore) {
// EXPLAIN: Bu satırın görevi: setCursor_(CURSORS.DLQ_LAST_PROCESSED_AT, cursorAfter);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    setCursor_(CURSORS.DLQ_LAST_PROCESSED_AT, cursorAfter);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Log job run. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Log job run
// EXPLAIN: Bu satırın görevi: logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '', 
// EXPLAIN: Bu satırın görevi: 'Retried=' + result.retried + ', Skipped=' + result.skipped);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
             'Retried=' + result.retried + ', Skipped=' + result.skipped);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Dump DLQ evidence. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Dump DLQ evidence
// EXPLAIN: Bu satırın görevi: dumpSheetEvidence_(SHEETS.DLQ, 2, 5);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  dumpSheetEvidence_(SHEETS.DLQ, 2, 5);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('DLQ_RETRY | Complete: ' + JSON.stringify(result));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('DLQ_RETRY | Complete: ' + JSON.stringify(result));
// EXPLAIN: Bu satırın görevi: return result;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return result;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Get DLQ statistics. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Get DLQ statistics
// EXPLAIN: Bu satırın görevi: * @returns {Object} DLQ stats. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} DLQ stats
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function getDLQStats_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function getDLQStats_() {
// EXPLAIN: Bu satırın görevi: const dlqData = getSheetData_(SHEETS.DLQ);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const dlqData = getSheetData_(SHEETS.DLQ);
// EXPLAIN: Bu satırın görevi: const maxRetry = cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const maxRetry = cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: let pending = 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let pending = 0;
// EXPLAIN: Bu satırın görevi: let maxRetryReached = 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let maxRetryReached = 0;
// EXPLAIN: Bu satırın görevi: let totalItems = dlqData.length;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let totalItems = dlqData.length;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (const item of dlqData) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const item of dlqData) {
// EXPLAIN: Bu satırın görevi: const retryCount = parseInt(item.retry_count) || 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const retryCount = parseInt(item.retry_count) || 0;
// EXPLAIN: Bu satırın görevi: if (retryCount >= maxRetry) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (retryCount >= maxRetry) {
// EXPLAIN: Bu satırın görevi: maxRetryReached++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      maxRetryReached++;
// EXPLAIN: Bu satırın görevi: } else {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else {
// EXPLAIN: Bu satırın görevi: pending++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      pending++;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return {
// EXPLAIN: Bu satırın görevi: total: totalItems,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    total: totalItems,
// EXPLAIN: Bu satırın görevi: pending: pending,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    pending: pending,
// EXPLAIN: Bu satırın görevi: max_retry_reached: maxRetryReached. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    max_retry_reached: maxRetryReached
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Get items that have reached max retry (need manual intervention). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Get items that have reached max retry (need manual intervention)
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Items needing manual fix. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Array<Object>} Items needing manual fix
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function getDLQNeedingManualFix_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function getDLQNeedingManualFix_() {
// EXPLAIN: Bu satırın görevi: const dlqData = getSheetData_(SHEETS.DLQ);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const dlqData = getSheetData_(SHEETS.DLQ);
// EXPLAIN: Bu satırın görevi: const maxRetry = cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const maxRetry = cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return dlqData.filter(item => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return dlqData.filter(item => {
// EXPLAIN: Bu satırın görevi: const retryCount = parseInt(item.retry_count) || 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const retryCount = parseInt(item.retry_count) || 0;
// EXPLAIN: Bu satırın görevi: return retryCount >= maxRetry;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return retryCount >= maxRetry;
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Manually resolve a DLQ item (mark as fixed or discard). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Manually resolve a DLQ item (mark as fixed or discard)
// EXPLAIN: Bu satırın görevi: * @param {string} ingestId - Ingest ID to resolve. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} ingestId - Ingest ID to resolve
// EXPLAIN: Bu satırın görevi: * @param {string} resolution - 'fixed' or 'discarded'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} resolution - 'fixed' or 'discarded'
// EXPLAIN: Bu satırın görevi: * @param {string} notes - Resolution notes. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} notes - Resolution notes
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function resolveDLQItem_(ingestId, resolution, notes) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function resolveDLQItem_(ingestId, resolution, notes) {
// EXPLAIN: Bu satırın görevi: const dlqData = getSheetData_(SHEETS.DLQ);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const dlqData = getSheetData_(SHEETS.DLQ);
// EXPLAIN: Bu satırın görevi: const dlqItem = dlqData.find(row => row.ingest_id === ingestId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const dlqItem = dlqData.find(row => row.ingest_id === ingestId);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (!dlqItem) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!dlqItem) {
// EXPLAIN: Bu satırın görevi: Logger.log('DLQ | Item not found: ' + ingestId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('DLQ | Item not found: ' + ingestId);
// EXPLAIN: Bu satırın görevi: return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return false;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Update error_json with resolution. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Update error_json with resolution
// EXPLAIN: Bu satırın görevi: const errorObj = parseJsonSafe_(dlqItem.error_json) || {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const errorObj = parseJsonSafe_(dlqItem.error_json) || {};
// EXPLAIN: Bu satırın görevi: errorObj.resolution = resolution;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  errorObj.resolution = resolution;
// EXPLAIN: Bu satırın görevi: errorObj.resolution_notes = notes;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  errorObj.resolution_notes = notes;
// EXPLAIN: Bu satırın görevi: errorObj.resolved_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  errorObj.resolved_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: updateRow_(SHEETS.DLQ, dlqItem._rowIndex, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  updateRow_(SHEETS.DLQ, dlqItem._rowIndex, {
// EXPLAIN: Bu satırın görevi: error_json: JSON.stringify(errorObj). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    error_json: JSON.stringify(errorObj)
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Log ops_log for manual fix. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Log ops_log for manual fix
// EXPLAIN: Bu satırın görevi: opsLog_({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  opsLog_({
// EXPLAIN: Bu satırın görevi: scope: 'manual_fix_json',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    scope: 'manual_fix_json',
// EXPLAIN: Bu satırın görevi: idempotency_key: ingestId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    idempotency_key: ingestId,
// EXPLAIN: Bu satırın görevi: nno1_result: 'N/A',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    nno1_result: 'N/A',
// EXPLAIN: Bu satırın görevi: checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),
// EXPLAIN: Bu satırın görevi: notes: 'DLQ item resolved: ' + resolution + ' - ' + notes. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    notes: 'DLQ item resolved: ' + resolution + ' - ' + notes
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('DLQ | Resolved: ' + ingestId + ' as ' + resolution);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('DLQ | Resolved: ' + ingestId + ' as ' + resolution);
// EXPLAIN: Bu satırın görevi: return true;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return true;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
