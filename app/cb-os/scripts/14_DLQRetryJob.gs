// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 14_DLQRetryJob.gs
 * CB-OS V1.0 - 14_DLQRetryJob.gs
// EXPLAIN: * Dead Letter Queue retry job
 * Dead Letter Queue retry job
// EXPLAIN: * Requeues failed items for reprocessing
 * Requeues failed items for reprocessing
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * DLQ retry job - requeue failed items
 * DLQ retry job - requeue failed items
// EXPLAIN: * @param {Object} ctx - Job context with orch_run_id
 * @param {Object} ctx - Job context with orch_run_id
// EXPLAIN: * @returns {Object} Job result summary
 * @returns {Object} Job result summary
// EXPLAIN: */
 */
// EXPLAIN: function dlq_retry_job(ctx) {
function dlq_retry_job(ctx) {
// EXPLAIN: ctx = ctx || createJobContext_();
  ctx = ctx || createJobContext_();
// EXPLAIN: const jobName = 'dlq_retry_job';
  const jobName = 'dlq_retry_job';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const cursorBefore = getCursor_(CURSORS.DLQ_LAST_PROCESSED_AT);
  const cursorBefore = getCursor_(CURSORS.DLQ_LAST_PROCESSED_AT);
// EXPLAIN: let cursorAfter = cursorBefore;
  let cursorAfter = cursorBefore;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const maxRetry = cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY);
  const maxRetry = cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY);
// EXPLAIN: const batchSize = cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE);
  const batchSize = cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Get DLQ items
  // Get DLQ items
// EXPLAIN: const dlqData = getSheetData_(SHEETS.DLQ);
  const dlqData = getSheetData_(SHEETS.DLQ);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Filter items eligible for retry (retry_count < max)
  // Filter items eligible for retry (retry_count < max)
// EXPLAIN: const eligible = dlqData.filter(row => {
  const eligible = dlqData.filter(row => {
// EXPLAIN: const retryCount = parseInt(row.retry_count) || 0;
    const retryCount = parseInt(row.retry_count) || 0;
// EXPLAIN: return retryCount < maxRetry;
    return retryCount < maxRetry;
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Sort by created_at ASC
  // Sort by created_at ASC
// EXPLAIN: eligible.sort((a, b) => {
  eligible.sort((a, b) => {
// EXPLAIN: if (a.created_at < b.created_at) return -1;
    if (a.created_at < b.created_at) return -1;
// EXPLAIN: if (a.created_at > b.created_at) return 1;
    if (a.created_at > b.created_at) return 1;
// EXPLAIN: return 0;
    return 0;
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Take batch
  // Take batch
// EXPLAIN: const batch = eligible.slice(0, batchSize);
  const batch = eligible.slice(0, batchSize);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('DLQ_RETRY | Starting with ' + batch.length + ' items (cursor=' + cursorBefore + ')');
  Logger.log('DLQ_RETRY | Starting with ' + batch.length + ' items (cursor=' + cursorBefore + ')');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const result = {
  const result = {
// EXPLAIN: retried: 0,
    retried: 0,
// EXPLAIN: skipped: 0,
    skipped: 0,
// EXPLAIN: max_retry_reached: 0
    max_retry_reached: 0
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const dlqItem of batch) {
  for (const dlqItem of batch) {
// EXPLAIN: try {
    try {
// EXPLAIN: const ingestId = dlqItem.ingest_id;
      const ingestId = dlqItem.ingest_id;
// EXPLAIN: const retryCount = parseInt(dlqItem.retry_count) || 0;
      const retryCount = parseInt(dlqItem.retry_count) || 0;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: Logger.log('DLQ_RETRY | Processing ingest_id=' + ingestId + ', retry_count=' + retryCount);
      Logger.log('DLQ_RETRY | Processing ingest_id=' + ingestId + ', retry_count=' + retryCount);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: // Find original queue item
      // Find original queue item
// EXPLAIN: const queueItem = QueueRepo.getByIngestId(ingestId);
      const queueItem = QueueRepo.getByIngestId(ingestId);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: if (!queueItem) {
      if (!queueItem) {
// EXPLAIN: Logger.log('DLQ_RETRY | Queue item not found for ingest_id=' + ingestId);
        Logger.log('DLQ_RETRY | Queue item not found for ingest_id=' + ingestId);
// EXPLAIN: result.skipped++;
        result.skipped++;
// EXPLAIN: continue;
        continue;
// EXPLAIN: }
      }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: // Reset queue item for retry
      // Reset queue item for retry
// EXPLAIN: const resetSuccess = QueueRepo.resetForRetry(ingestId);
      const resetSuccess = QueueRepo.resetForRetry(ingestId);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: if (resetSuccess) {
      if (resetSuccess) {
// EXPLAIN: // Update DLQ: increment retry_count, set last_retry_at
        // Update DLQ: increment retry_count, set last_retry_at
// EXPLAIN: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
        const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: updateRow_(SHEETS.DLQ, dlqItem._rowIndex, {
        updateRow_(SHEETS.DLQ, dlqItem._rowIndex, {
// EXPLAIN: retry_count: retryCount + 1,
          retry_count: retryCount + 1,
// EXPLAIN: last_retry_at: now
          last_retry_at: now
// EXPLAIN: });
        });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: result.retried++;
        result.retried++;
// EXPLAIN: cursorAfter = dlqItem.created_at;
        cursorAfter = dlqItem.created_at;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: // Evidence logging
        // Evidence logging
// EXPLAIN: logEvidence_('DLQ_RETRY', 'ingest_id=' + ingestId + ' | retry_count=' + (retryCount + 1));
        logEvidence_('DLQ_RETRY', 'ingest_id=' + ingestId + ' | retry_count=' + (retryCount + 1));
// EXPLAIN: } else {
      } else {
// EXPLAIN: Logger.log('DLQ_RETRY | Failed to reset queue item: ' + ingestId);
        Logger.log('DLQ_RETRY | Failed to reset queue item: ' + ingestId);
// EXPLAIN: result.skipped++;
        result.skipped++;
// EXPLAIN: }
      }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: } catch (e) {
    } catch (e) {
// EXPLAIN: Logger.log('DLQ_RETRY | Error processing DLQ item: ' + e.message);
      Logger.log('DLQ_RETRY | Error processing DLQ item: ' + e.message);
// EXPLAIN: result.skipped++;
      result.skipped++;
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Update cursor
  // Update cursor
// EXPLAIN: if (cursorAfter !== cursorBefore) {
  if (cursorAfter !== cursorBefore) {
// EXPLAIN: setCursor_(CURSORS.DLQ_LAST_PROCESSED_AT, cursorAfter);
    setCursor_(CURSORS.DLQ_LAST_PROCESSED_AT, cursorAfter);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Log job run
  // Log job run
// EXPLAIN: logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '',
  logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '', 
// EXPLAIN: 'Retried=' + result.retried + ', Skipped=' + result.skipped);
             'Retried=' + result.retried + ', Skipped=' + result.skipped);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Dump DLQ evidence
  // Dump DLQ evidence
// EXPLAIN: dumpSheetEvidence_(SHEETS.DLQ, 2, 5);
  dumpSheetEvidence_(SHEETS.DLQ, 2, 5);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('DLQ_RETRY | Complete: ' + JSON.stringify(result));
  Logger.log('DLQ_RETRY | Complete: ' + JSON.stringify(result));
// EXPLAIN: return result;
  return result;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Get DLQ statistics
 * Get DLQ statistics
// EXPLAIN: * @returns {Object} DLQ stats
 * @returns {Object} DLQ stats
// EXPLAIN: */
 */
// EXPLAIN: function getDLQStats_() {
function getDLQStats_() {
// EXPLAIN: const dlqData = getSheetData_(SHEETS.DLQ);
  const dlqData = getSheetData_(SHEETS.DLQ);
// EXPLAIN: const maxRetry = cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY);
  const maxRetry = cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: let pending = 0;
  let pending = 0;
// EXPLAIN: let maxRetryReached = 0;
  let maxRetryReached = 0;
// EXPLAIN: let totalItems = dlqData.length;
  let totalItems = dlqData.length;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const item of dlqData) {
  for (const item of dlqData) {
// EXPLAIN: const retryCount = parseInt(item.retry_count) || 0;
    const retryCount = parseInt(item.retry_count) || 0;
// EXPLAIN: if (retryCount >= maxRetry) {
    if (retryCount >= maxRetry) {
// EXPLAIN: maxRetryReached++;
      maxRetryReached++;
// EXPLAIN: } else {
    } else {
// EXPLAIN: pending++;
      pending++;
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return {
  return {
// EXPLAIN: total: totalItems,
    total: totalItems,
// EXPLAIN: pending: pending,
    pending: pending,
// EXPLAIN: max_retry_reached: maxRetryReached
    max_retry_reached: maxRetryReached
// EXPLAIN: };
  };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Get items that have reached max retry (need manual intervention)
 * Get items that have reached max retry (need manual intervention)
// EXPLAIN: * @returns {Array<Object>} Items needing manual fix
 * @returns {Array<Object>} Items needing manual fix
// EXPLAIN: */
 */
// EXPLAIN: function getDLQNeedingManualFix_() {
function getDLQNeedingManualFix_() {
// EXPLAIN: const dlqData = getSheetData_(SHEETS.DLQ);
  const dlqData = getSheetData_(SHEETS.DLQ);
// EXPLAIN: const maxRetry = cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY);
  const maxRetry = cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return dlqData.filter(item => {
  return dlqData.filter(item => {
// EXPLAIN: const retryCount = parseInt(item.retry_count) || 0;
    const retryCount = parseInt(item.retry_count) || 0;
// EXPLAIN: return retryCount >= maxRetry;
    return retryCount >= maxRetry;
// EXPLAIN: });
  });
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Manually resolve a DLQ item (mark as fixed or discard)
 * Manually resolve a DLQ item (mark as fixed or discard)
// EXPLAIN: * @param {string} ingestId - Ingest ID to resolve
 * @param {string} ingestId - Ingest ID to resolve
// EXPLAIN: * @param {string} resolution - 'fixed' or 'discarded'
 * @param {string} resolution - 'fixed' or 'discarded'
// EXPLAIN: * @param {string} notes - Resolution notes
 * @param {string} notes - Resolution notes
// EXPLAIN: */
 */
// EXPLAIN: function resolveDLQItem_(ingestId, resolution, notes) {
function resolveDLQItem_(ingestId, resolution, notes) {
// EXPLAIN: const dlqData = getSheetData_(SHEETS.DLQ);
  const dlqData = getSheetData_(SHEETS.DLQ);
// EXPLAIN: const dlqItem = dlqData.find(row => row.ingest_id === ingestId);
  const dlqItem = dlqData.find(row => row.ingest_id === ingestId);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (!dlqItem) {
  if (!dlqItem) {
// EXPLAIN: Logger.log('DLQ | Item not found: ' + ingestId);
    Logger.log('DLQ | Item not found: ' + ingestId);
// EXPLAIN: return false;
    return false;
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Update error_json with resolution
  // Update error_json with resolution
// EXPLAIN: const errorObj = parseJsonSafe_(dlqItem.error_json) || {};
  const errorObj = parseJsonSafe_(dlqItem.error_json) || {};
// EXPLAIN: errorObj.resolution = resolution;
  errorObj.resolution = resolution;
// EXPLAIN: errorObj.resolution_notes = notes;
  errorObj.resolution_notes = notes;
// EXPLAIN: errorObj.resolved_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  errorObj.resolved_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: updateRow_(SHEETS.DLQ, dlqItem._rowIndex, {
  updateRow_(SHEETS.DLQ, dlqItem._rowIndex, {
// EXPLAIN: error_json: JSON.stringify(errorObj)
    error_json: JSON.stringify(errorObj)
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Log ops_log for manual fix
  // Log ops_log for manual fix
// EXPLAIN: opsLog_({
  opsLog_({
// EXPLAIN: scope: 'manual_fix_json',
    scope: 'manual_fix_json',
// EXPLAIN: idempotency_key: ingestId,
    idempotency_key: ingestId,
// EXPLAIN: nno1_result: 'N/A',
    nno1_result: 'N/A',
// EXPLAIN: checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),
    checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),
// EXPLAIN: notes: 'DLQ item resolved: ' + resolution + ' - ' + notes
    notes: 'DLQ item resolved: ' + resolution + ' - ' + notes
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('DLQ | Resolved: ' + ingestId + ' as ' + resolution);
  Logger.log('DLQ | Resolved: ' + ingestId + ' as ' + resolution);
// EXPLAIN: return true;
  return true;
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
