/**
 * CB-OS V1.0 - 04_QueueRepo.gs
 * INGEST_QUEUE operations - the single entry point for all external data
 */

/**
 * QueueRepo namespace for INGEST_QUEUE operations
 */
const QueueRepo = {
  
  /**
   * Enqueue a new item to INGEST_QUEUE
   * This is the ONLY way to add items to the queue
   * @param {Object} item - Item to enqueue
   * @param {string} item.ingest_type - Type from INGEST_TYPES
   * @param {Object} item.payload - Payload object (will be JSON stringified)
   * @param {string} item.source - Source identifier
   * @param {string} item.source_ref_id - Source reference ID
   * @param {string} item.idempotency_key - Unique key for deduplication
   * @returns {Object} Enqueued item with ingest_id
   */
  enqueue: function(item) {
    const ingestId = id_();
    const receivedAt = this._nextReceivedAt_();
    
    const queueRow = {
      status: INGEST_STATUS.NEW,
      ingest_id: ingestId,
      received_at: receivedAt,
      ingest_type: item.ingest_type || '',
      payload_json: typeof item.payload === 'string' ? item.payload : JSON.stringify(item.payload || {}),
      source: item.source || '',
      source_ref_id: item.source_ref_id || '',
      idempotency_key: item.idempotency_key || '',
      error: '',
      processed_at: ''
    };
    
    const rowNum = appendRow_(SHEETS.INGEST_QUEUE, queueRow);
    
    Logger.log('QUEUE | Enqueued: ' + ingestId + ' at row ' + rowNum);
    
    return {
      ingest_id: ingestId,
      received_at: receivedAt,
      row_number: rowNum
    };
  },

  /**
   * Generate a unique received_at timestamp to avoid cursor ties.
   * Ensures monotonic increase within INGEST_QUEUE.
   * @returns {string} ISO timestamp with offset
   */
  _nextReceivedAt_: function() {
    const timezone = cfg_('TIMEZONE', DEFAULTS.TIMEZONE);
    const now = new Date();
    let nextIso = formatIsoWithOffset_(now, timezone);
    const sheet = sheet_(SHEETS.INGEST_QUEUE, true);
    if (!sheet) return nextIso;
    
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return nextIso;
    
    const colIdx = getColIndex_(SHEETS.INGEST_QUEUE, 'received_at');
    if (colIdx === -1) return nextIso;
    
    const lastValue = sheet.getRange(lastRow, colIdx + 1).getValue();
    if (!lastValue) return nextIso;
    
    const lastMs = parseCbTimeMs_(String(lastValue));
    const nowMs = parseCbTimeMs_(nextIso);
    if (lastMs === null || nowMs === null) return nextIso;
    
    if (lastMs >= nowMs) {
      const bumped = new Date(lastMs + 1000);
      nextIso = formatIsoWithOffset_(bumped, timezone);
    }
    
    return nextIso;
  },
  
  /**
   * Get pending items from queue (status = new)
   * Ordered by received_at ASC for gap-free cursor processing
   * @param {string} cursorValue - Last processed received_at|ingest_id (exclusive)
   * @param {number} limit - Maximum items to return
   * @returns {Array<Object>} Pending queue items
   */
  getPending: function(cursorValue, limit) {
    const allData = getSheetData_(SHEETS.INGEST_QUEUE);
    
    const cursor = parseIngestCursor_(cursorValue);
    
    // Filter: status=new AND (received_at, ingest_id) > cursor
    let pending = allData.filter(row => {
      const isNew = row.status === INGEST_STATUS.NEW;
      if (!cursorValue) return isNew;
      const rowCursor = { received_at: row.received_at || '', ingest_id: row.ingest_id || '' };
      const afterCursor = compareIngestCursor_(rowCursor, cursor) === 1;
      return isNew && afterCursor;
    });
    
    // Sort by (received_at, ingest_id) ASC (gap-free requirement)
    pending.sort((a, b) => {
      return compareIngestCursor_(
        { received_at: a.received_at || '', ingest_id: a.ingest_id || '' },
        { received_at: b.received_at || '', ingest_id: b.ingest_id || '' }
      );
    });
    
    // Apply limit
    if (limit && limit > 0) {
      pending = pending.slice(0, limit);
    }
    
    return pending;
  },
  
  /**
   * Update queue item status
   * @param {number} rowIndex - Row number (1-based)
   * @param {string} status - New status from INGEST_STATUS
   * @param {string} error - Error message (optional)
   */
  updateStatus: function(rowIndex, status, error) {
    const updates = {
      status: status,
      processed_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
    };
    
    if (error !== undefined) {
      updates.error = error;
    }
    
    updateRow_(SHEETS.INGEST_QUEUE, rowIndex, updates);
  },
  
  /**
   * Mark item as completed
   * @param {number} rowIndex - Row number (1-based)
   */
  markCompleted: function(rowIndex) {
    this.updateStatus(rowIndex, INGEST_STATUS.COMPLETED);
  },
  
  /**
   * Mark item as failed and insert to DLQ
   * @param {number} rowIndex - Row number (1-based)
   * @param {Object} item - Original queue item
   * @param {string} errorMsg - Error message
   */
  markFailed: function(rowIndex, item, errorMsg) {
    this.updateStatus(rowIndex, INGEST_STATUS.FAILED, errorMsg);
    
    // Insert to DLQ (COL2 = ingest_id as per canonical schema)
    const dlqRow = {
      created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
      ingest_id: item.ingest_id,
      source_ref_id: item.source_ref_id || '',
      error_json: JSON.stringify({ message: errorMsg, timestamp: new Date().toISOString() }),
      retry_count: 0,
      last_retry_at: ''
    };
    
    appendRow_(SHEETS.DLQ, dlqRow);
    Logger.log('DLQ | Inserted: ' + item.ingest_id);
  },
  
  /**
   * Mark item as skipped (duplicate)
   * @param {number} rowIndex - Row number (1-based)
   */
  markSkipped: function(rowIndex) {
    this.updateStatus(rowIndex, INGEST_STATUS.SKIPPED, 'duplicate_idempotency_key');
  },
  
  /**
   * Get queue item by ingest_id
   * @param {string} ingestId - Ingest ID to find
   * @returns {Object|null} Queue item or null
   */
  getByIngestId: function(ingestId) {
    const allData = getSheetData_(SHEETS.INGEST_QUEUE);
    return allData.find(row => row.ingest_id === ingestId) || null;
  },
  
  /**
   * Reset failed item for retry (called by DLQ retry job)
   * @param {string} ingestId - Ingest ID to reset
   * @returns {boolean} Success flag
   */
  resetForRetry: function(ingestId) {
    const item = this.getByIngestId(ingestId);
    if (!item) return false;
    
    updateRow_(SHEETS.INGEST_QUEUE, item._rowIndex, {
      status: INGEST_STATUS.NEW,
      error: '',
      processed_at: ''
    });
    
    Logger.log('QUEUE | Reset for retry: ' + ingestId);
    return true;
  }
};
