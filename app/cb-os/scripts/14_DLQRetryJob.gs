/**
 * DLQ retry job - requeue failed items
 * @param {Object} ctx - Job context with orch_run_id
 * @returns {Object} Job result summary
 */
function dlq_retry_job(ctx) {
  ctx = ctx || createJobContext_();
  const jobName = 'dlq_retry_job';
  
  const cursorBefore = getCursor_(CURSORS.DLQ_LAST_PROCESSED_AT);
  let cursorAfter = cursorBefore;
  
  const maxRetry = cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY);
  const batchSize = cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE);
  
  // Get DLQ items
  const dlqData = getSheetData_(SHEETS.DLQ);
  
  // Filter items eligible for retry (retry_count < max)
  const eligible = dlqData.filter(row => {
    const retryCount = parseInt(row.retry_count) || 0;
    const errorObj = parseJsonSafe_(row.error_json) || {};
    const errorType = String(errorObj.error_type || '').toLowerCase();
    return retryCount < maxRetry && errorType !== 'permanent';
  });
  
  // Sort by created_at ASC
  eligible.sort((a, b) => {
    if (a.created_at < b.created_at) return -1;
    if (a.created_at > b.created_at) return 1;
    return 0;
  });
  
  // Take batch
  const batch = eligible.slice(0, batchSize);
  
  Logger.log('DLQ_RETRY | Starting with ' + batch.length + ' items (cursor=' + cursorBefore + ')');
  
  const result = {
    retried: 0,
    skipped: 0,
    max_retry_reached: 0
  };
  
  for (const dlqItem of batch) {
    try {
      const ingestId = dlqItem.ingest_id;
      const retryCount = parseInt(dlqItem.retry_count) || 0;
      
      Logger.log('DLQ_RETRY | Processing ingest_id=' + ingestId + ', retry_count=' + retryCount);
      
      // Find original queue item
      const queueItem = QueueRepo.getByIngestId(ingestId);
      
      if (!queueItem) {
        Logger.log('DLQ_RETRY | Queue item not found for ingest_id=' + ingestId);
        result.skipped++;
        continue;
      }
      
      // Reset queue item for retry
      const resetSuccess = QueueRepo.resetForRetry(ingestId);
      
      if (resetSuccess) {
        // Update DLQ: increment retry_count, set last_retry_at
        const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
        updateRow_(SHEETS.DLQ, dlqItem._rowIndex, {
          retry_count: retryCount + 1,
          last_retry_at: now
        });
        
        result.retried++;
        cursorAfter = dlqItem.created_at;
        
        // Evidence logging
        logEvidence_('DLQ_RETRY', 'ingest_id=' + ingestId + ' | retry_count=' + (retryCount + 1));
      } else {
        Logger.log('DLQ_RETRY | Failed to reset queue item: ' + ingestId);
        result.skipped++;
      }
      
    } catch (e) {
      Logger.log('DLQ_RETRY | Error processing DLQ item: ' + e.message);
      result.skipped++;
    }
  }
  
  // Update cursor
  if (cursorAfter !== cursorBefore) {
    setCursor_(CURSORS.DLQ_LAST_PROCESSED_AT, cursorAfter);
  }
  
  // Log job run
  logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '', 
             'Retried=' + result.retried + ', Skipped=' + result.skipped);
  
  // Dump DLQ evidence
  dumpSheetEvidence_(SHEETS.DLQ, 2, 5);
  
  Logger.log('DLQ_RETRY | Complete: ' + JSON.stringify(result));
  return result;
}

/**
 * Get DLQ statistics
 * @returns {Object} DLQ stats
 */
function getDLQStats_() {
  const dlqData = getSheetData_(SHEETS.DLQ);
  const maxRetry = cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY);
  
  let pending = 0;
  let maxRetryReached = 0;
  let totalItems = dlqData.length;
  
  for (const item of dlqData) {
    const retryCount = parseInt(item.retry_count) || 0;
    const errorObj = parseJsonSafe_(item.error_json) || {};
    const errorType = String(errorObj.error_type || '').toLowerCase();
    if (retryCount >= maxRetry) {
      maxRetryReached++;
    } else if (errorType !== 'permanent') {
      pending++;
    }
  }
  
  return {
    total: totalItems,
    pending: pending,
    max_retry_reached: maxRetryReached
  };
}

/**
 * Get items that have reached max retry (need manual intervention)
 * @returns {Array<Object>} Items needing manual fix
 */
function getDLQNeedingManualFix_() {
  const dlqData = getSheetData_(SHEETS.DLQ);
  const maxRetry = cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY);
  
  return dlqData.filter(item => {
    const retryCount = parseInt(item.retry_count) || 0;
    return retryCount >= maxRetry;
  });
}

/**
 * Manually resolve a DLQ item (mark as fixed or discard)
 * @param {string} ingestId - Ingest ID to resolve
 * @param {string} resolution - 'fixed' or 'discarded'
 * @param {string} notes - Resolution notes
 */
function resolveDLQItem_(ingestId, resolution, notes) {
  const dlqData = getSheetData_(SHEETS.DLQ);
  const dlqItem = dlqData.find(row => row.ingest_id === ingestId);
  
  if (!dlqItem) {
    Logger.log('DLQ | Item not found: ' + ingestId);
    return false;
  }
  
  // Update error_json with resolution
  const errorObj = parseJsonSafe_(dlqItem.error_json) || {};
  errorObj.resolution = resolution;
  errorObj.resolution_notes = notes;
  errorObj.resolved_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  
  updateRow_(SHEETS.DLQ, dlqItem._rowIndex, {
    error_json: JSON.stringify(errorObj)
  });
  
  // Log ops_log for manual fix
  opsLog_({
    scope: 'manual_fix_json',
    idempotency_key: ingestId,
    nno1_result: 'N/A',
    checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),
    notes: 'DLQ item resolved: ' + resolution + ' - ' + notes
  });
  
  Logger.log('DLQ | Resolved: ' + ingestId + ' as ' + resolution);
  return true;
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
