// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 04_QueueRepo.gs
 * CB-OS V1.0 - 04_QueueRepo.gs
// EXPLAIN: * INGEST_QUEUE operations - the single entry point for all external data
 * INGEST_QUEUE operations - the single entry point for all external data
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * QueueRepo namespace for INGEST_QUEUE operations
 * QueueRepo namespace for INGEST_QUEUE operations
// EXPLAIN: */
 */
// EXPLAIN: const QueueRepo = {
const QueueRepo = {
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Enqueue a new item to INGEST_QUEUE
   * Enqueue a new item to INGEST_QUEUE
// EXPLAIN: * This is the ONLY way to add items to the queue
   * This is the ONLY way to add items to the queue
// EXPLAIN: * @param {Object} item - Item to enqueue
   * @param {Object} item - Item to enqueue
// EXPLAIN: * @param {string} item.ingest_type - Type from INGEST_TYPES
   * @param {string} item.ingest_type - Type from INGEST_TYPES
// EXPLAIN: * @param {Object} item.payload - Payload object (will be JSON stringified)
   * @param {Object} item.payload - Payload object (will be JSON stringified)
// EXPLAIN: * @param {string} item.source - Source identifier
   * @param {string} item.source - Source identifier
// EXPLAIN: * @param {string} item.source_ref_id - Source reference ID
   * @param {string} item.source_ref_id - Source reference ID
// EXPLAIN: * @param {string} item.idempotency_key - Unique key for deduplication
   * @param {string} item.idempotency_key - Unique key for deduplication
// EXPLAIN: * @returns {Object} Enqueued item with ingest_id
   * @returns {Object} Enqueued item with ingest_id
// EXPLAIN: */
   */
// EXPLAIN: enqueue: function(item) {
  enqueue: function(item) {
// EXPLAIN: const ingestId = id_();
    const ingestId = id_();
// EXPLAIN: const receivedAt = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    const receivedAt = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const queueRow = {
    const queueRow = {
// EXPLAIN: status: INGEST_STATUS.NEW,
      status: INGEST_STATUS.NEW,
// EXPLAIN: ingest_id: ingestId,
      ingest_id: ingestId,
// EXPLAIN: received_at: receivedAt,
      received_at: receivedAt,
// EXPLAIN: ingest_type: item.ingest_type || '',
      ingest_type: item.ingest_type || '',
// EXPLAIN: payload_json: typeof item.payload === 'string' ? item.payload : JSON.stringify(item.payload || {}),
      payload_json: typeof item.payload === 'string' ? item.payload : JSON.stringify(item.payload || {}),
// EXPLAIN: source: item.source || '',
      source: item.source || '',
// EXPLAIN: source_ref_id: item.source_ref_id || '',
      source_ref_id: item.source_ref_id || '',
// EXPLAIN: idempotency_key: item.idempotency_key || '',
      idempotency_key: item.idempotency_key || '',
// EXPLAIN: error: '',
      error: '',
// EXPLAIN: processed_at: ''
      processed_at: ''
// EXPLAIN: };
    };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const rowNum = appendRow_(SHEETS.INGEST_QUEUE, queueRow);
    const rowNum = appendRow_(SHEETS.INGEST_QUEUE, queueRow);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: Logger.log('QUEUE | Enqueued: ' + ingestId + ' at row ' + rowNum);
    Logger.log('QUEUE | Enqueued: ' + ingestId + ' at row ' + rowNum);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return {
    return {
// EXPLAIN: ingest_id: ingestId,
      ingest_id: ingestId,
// EXPLAIN: received_at: receivedAt,
      received_at: receivedAt,
// EXPLAIN: row_number: rowNum
      row_number: rowNum
// EXPLAIN: };
    };
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get pending items from queue (status = new)
   * Get pending items from queue (status = new)
// EXPLAIN: * Ordered by received_at ASC for gap-free cursor processing
   * Ordered by received_at ASC for gap-free cursor processing
// EXPLAIN: * @param {string} cursorValue - Last processed received_at (exclusive)
   * @param {string} cursorValue - Last processed received_at (exclusive)
// EXPLAIN: * @param {number} limit - Maximum items to return
   * @param {number} limit - Maximum items to return
// EXPLAIN: * @returns {Array<Object>} Pending queue items
   * @returns {Array<Object>} Pending queue items
// EXPLAIN: */
   */
// EXPLAIN: getPending: function(cursorValue, limit) {
  getPending: function(cursorValue, limit) {
// EXPLAIN: const allData = getSheetData_(SHEETS.INGEST_QUEUE);
    const allData = getSheetData_(SHEETS.INGEST_QUEUE);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Filter: status=new AND received_at > cursor
    // Filter: status=new AND received_at > cursor
// EXPLAIN: let pending = allData.filter(row => {
    let pending = allData.filter(row => {
// EXPLAIN: const isNew = row.status === INGEST_STATUS.NEW;
      const isNew = row.status === INGEST_STATUS.NEW;
// EXPLAIN: const afterCursor = !cursorValue || row.received_at > cursorValue;
      const afterCursor = !cursorValue || row.received_at > cursorValue;
// EXPLAIN: return isNew && afterCursor;
      return isNew && afterCursor;
// EXPLAIN: });
    });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Sort by received_at ASC (gap-free requirement)
    // Sort by received_at ASC (gap-free requirement)
// EXPLAIN: pending.sort((a, b) => {
    pending.sort((a, b) => {
// EXPLAIN: if (a.received_at < b.received_at) return -1;
      if (a.received_at < b.received_at) return -1;
// EXPLAIN: if (a.received_at > b.received_at) return 1;
      if (a.received_at > b.received_at) return 1;
// EXPLAIN: return 0;
      return 0;
// EXPLAIN: });
    });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Apply limit
    // Apply limit
// EXPLAIN: if (limit && limit > 0) {
    if (limit && limit > 0) {
// EXPLAIN: pending = pending.slice(0, limit);
      pending = pending.slice(0, limit);
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return pending;
    return pending;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Update queue item status
   * Update queue item status
// EXPLAIN: * @param {number} rowIndex - Row number (1-based)
   * @param {number} rowIndex - Row number (1-based)
// EXPLAIN: * @param {string} status - New status from INGEST_STATUS
   * @param {string} status - New status from INGEST_STATUS
// EXPLAIN: * @param {string} error - Error message (optional)
   * @param {string} error - Error message (optional)
// EXPLAIN: */
   */
// EXPLAIN: updateStatus: function(rowIndex, status, error) {
  updateStatus: function(rowIndex, status, error) {
// EXPLAIN: const updates = {
    const updates = {
// EXPLAIN: status: status,
      status: status,
// EXPLAIN: processed_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
      processed_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
// EXPLAIN: };
    };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: if (error !== undefined) {
    if (error !== undefined) {
// EXPLAIN: updates.error = error;
      updates.error = error;
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: updateRow_(SHEETS.INGEST_QUEUE, rowIndex, updates);
    updateRow_(SHEETS.INGEST_QUEUE, rowIndex, updates);
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Mark item as completed
   * Mark item as completed
// EXPLAIN: * @param {number} rowIndex - Row number (1-based)
   * @param {number} rowIndex - Row number (1-based)
// EXPLAIN: */
   */
// EXPLAIN: markCompleted: function(rowIndex) {
  markCompleted: function(rowIndex) {
// EXPLAIN: this.updateStatus(rowIndex, INGEST_STATUS.COMPLETED);
    this.updateStatus(rowIndex, INGEST_STATUS.COMPLETED);
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Mark item as failed and insert to DLQ
   * Mark item as failed and insert to DLQ
// EXPLAIN: * @param {number} rowIndex - Row number (1-based)
   * @param {number} rowIndex - Row number (1-based)
// EXPLAIN: * @param {Object} item - Original queue item
   * @param {Object} item - Original queue item
// EXPLAIN: * @param {string} errorMsg - Error message
   * @param {string} errorMsg - Error message
// EXPLAIN: */
   */
// EXPLAIN: markFailed: function(rowIndex, item, errorMsg) {
  markFailed: function(rowIndex, item, errorMsg) {
// EXPLAIN: this.updateStatus(rowIndex, INGEST_STATUS.FAILED, errorMsg);
    this.updateStatus(rowIndex, INGEST_STATUS.FAILED, errorMsg);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Insert to DLQ (COL2 = ingest_id as per canonical schema)
    // Insert to DLQ (COL2 = ingest_id as per canonical schema)
// EXPLAIN: const dlqRow = {
    const dlqRow = {
// EXPLAIN: created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
      created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: ingest_id: item.ingest_id,
      ingest_id: item.ingest_id,
// EXPLAIN: source_ref_id: item.source_ref_id || '',
      source_ref_id: item.source_ref_id || '',
// EXPLAIN: error_json: JSON.stringify({ message: errorMsg, timestamp: new Date().toISOString() }),
      error_json: JSON.stringify({ message: errorMsg, timestamp: new Date().toISOString() }),
// EXPLAIN: retry_count: 0,
      retry_count: 0,
// EXPLAIN: last_retry_at: ''
      last_retry_at: ''
// EXPLAIN: };
    };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: appendRow_(SHEETS.DLQ, dlqRow);
    appendRow_(SHEETS.DLQ, dlqRow);
// EXPLAIN: Logger.log('DLQ | Inserted: ' + item.ingest_id);
    Logger.log('DLQ | Inserted: ' + item.ingest_id);
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Mark item as skipped (duplicate)
   * Mark item as skipped (duplicate)
// EXPLAIN: * @param {number} rowIndex - Row number (1-based)
   * @param {number} rowIndex - Row number (1-based)
// EXPLAIN: */
   */
// EXPLAIN: markSkipped: function(rowIndex) {
  markSkipped: function(rowIndex) {
// EXPLAIN: this.updateStatus(rowIndex, INGEST_STATUS.SKIPPED, 'duplicate_idempotency_key');
    this.updateStatus(rowIndex, INGEST_STATUS.SKIPPED, 'duplicate_idempotency_key');
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get queue item by ingest_id
   * Get queue item by ingest_id
// EXPLAIN: * @param {string} ingestId - Ingest ID to find
   * @param {string} ingestId - Ingest ID to find
// EXPLAIN: * @returns {Object|null} Queue item or null
   * @returns {Object|null} Queue item or null
// EXPLAIN: */
   */
// EXPLAIN: getByIngestId: function(ingestId) {
  getByIngestId: function(ingestId) {
// EXPLAIN: const allData = getSheetData_(SHEETS.INGEST_QUEUE);
    const allData = getSheetData_(SHEETS.INGEST_QUEUE);
// EXPLAIN: return allData.find(row => row.ingest_id === ingestId) || null;
    return allData.find(row => row.ingest_id === ingestId) || null;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Reset failed item for retry (called by DLQ retry job)
   * Reset failed item for retry (called by DLQ retry job)
// EXPLAIN: * @param {string} ingestId - Ingest ID to reset
   * @param {string} ingestId - Ingest ID to reset
// EXPLAIN: * @returns {boolean} Success flag
   * @returns {boolean} Success flag
// EXPLAIN: */
   */
// EXPLAIN: resetForRetry: function(ingestId) {
  resetForRetry: function(ingestId) {
// EXPLAIN: const item = this.getByIngestId(ingestId);
    const item = this.getByIngestId(ingestId);
// EXPLAIN: if (!item) return false;
    if (!item) return false;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: updateRow_(SHEETS.INGEST_QUEUE, item._rowIndex, {
    updateRow_(SHEETS.INGEST_QUEUE, item._rowIndex, {
// EXPLAIN: status: INGEST_STATUS.NEW,
      status: INGEST_STATUS.NEW,
// EXPLAIN: error: '',
      error: '',
// EXPLAIN: processed_at: ''
      processed_at: ''
// EXPLAIN: });
    });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: Logger.log('QUEUE | Reset for retry: ' + ingestId);
    Logger.log('QUEUE | Reset for retry: ' + ingestId);
// EXPLAIN: return true;
    return true;
// EXPLAIN: }
  }
// EXPLAIN: };
};
// Çağdaş Seçkin Tüfekci - Real Estate Agent
