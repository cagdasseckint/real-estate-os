// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS V1.0 - 04_QueueRepo.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS V1.0 - 04_QueueRepo.gs
// EXPLAIN: Bu satırın görevi: * INGEST_QUEUE operations - the single entry point for all external data. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * INGEST_QUEUE operations - the single entry point for all external data
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * QueueRepo namespace for INGEST_QUEUE operations. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * QueueRepo namespace for INGEST_QUEUE operations
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: const QueueRepo = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const QueueRepo = {
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Enqueue a new item to INGEST_QUEUE. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Enqueue a new item to INGEST_QUEUE
// EXPLAIN: Bu satırın görevi: * This is the ONLY way to add items to the queue. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * This is the ONLY way to add items to the queue
// EXPLAIN: Bu satırın görevi: * @param {Object} item - Item to enqueue. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {Object} item - Item to enqueue
// EXPLAIN: Bu satırın görevi: * @param {string} item.ingest_type - Type from INGEST_TYPES. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} item.ingest_type - Type from INGEST_TYPES
// EXPLAIN: Bu satırın görevi: * @param {Object} item.payload - Payload object (will be JSON stringified). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {Object} item.payload - Payload object (will be JSON stringified)
// EXPLAIN: Bu satırın görevi: * @param {string} item.source - Source identifier. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} item.source - Source identifier
// EXPLAIN: Bu satırın görevi: * @param {string} item.source_ref_id - Source reference ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} item.source_ref_id - Source reference ID
// EXPLAIN: Bu satırın görevi: * @param {string} item.idempotency_key - Unique key for deduplication. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} item.idempotency_key - Unique key for deduplication
// EXPLAIN: Bu satırın görevi: * @returns {Object} Enqueued item with ingest_id. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Object} Enqueued item with ingest_id
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: enqueue: function(item) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  enqueue: function(item) {
// EXPLAIN: Bu satırın görevi: const ingestId = id_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const ingestId = id_();
// EXPLAIN: Bu satırın görevi: const receivedAt = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const receivedAt = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const queueRow = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const queueRow = {
// EXPLAIN: Bu satırın görevi: status: INGEST_STATUS.NEW,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      status: INGEST_STATUS.NEW,
// EXPLAIN: Bu satırın görevi: ingest_id: ingestId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      ingest_id: ingestId,
// EXPLAIN: Bu satırın görevi: received_at: receivedAt,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      received_at: receivedAt,
// EXPLAIN: Bu satırın görevi: ingest_type: item.ingest_type || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      ingest_type: item.ingest_type || '',
// EXPLAIN: Bu satırın görevi: payload_json: typeof item.payload === 'string' ? item.payload : JSON.stringify(item.payload || {}),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      payload_json: typeof item.payload === 'string' ? item.payload : JSON.stringify(item.payload || {}),
// EXPLAIN: Bu satırın görevi: source: item.source || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source: item.source || '',
// EXPLAIN: Bu satırın görevi: source_ref_id: item.source_ref_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source_ref_id: item.source_ref_id || '',
// EXPLAIN: Bu satırın görevi: idempotency_key: item.idempotency_key || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      idempotency_key: item.idempotency_key || '',
// EXPLAIN: Bu satırın görevi: error: '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      error: '',
// EXPLAIN: Bu satırın görevi: processed_at: ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      processed_at: ''
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const rowNum = appendRow_(SHEETS.INGEST_QUEUE, queueRow);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const rowNum = appendRow_(SHEETS.INGEST_QUEUE, queueRow);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: Logger.log('QUEUE | Enqueued: ' + ingestId + ' at row ' + rowNum);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('QUEUE | Enqueued: ' + ingestId + ' at row ' + rowNum);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: return {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return {
// EXPLAIN: Bu satırın görevi: ingest_id: ingestId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      ingest_id: ingestId,
// EXPLAIN: Bu satırın görevi: received_at: receivedAt,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      received_at: receivedAt,
// EXPLAIN: Bu satırın görevi: row_number: rowNum. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      row_number: rowNum
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    };
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get pending items from queue (status = new). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get pending items from queue (status = new)
// EXPLAIN: Bu satırın görevi: * Ordered by received_at ASC for gap-free cursor processing. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Ordered by received_at ASC for gap-free cursor processing
// EXPLAIN: Bu satırın görevi: * @param {string} cursorValue - Last processed received_at (exclusive). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} cursorValue - Last processed received_at (exclusive)
// EXPLAIN: Bu satırın görevi: * @param {number} limit - Maximum items to return. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {number} limit - Maximum items to return
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Pending queue items. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Array<Object>} Pending queue items
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: getPending: function(cursorValue, limit) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  getPending: function(cursorValue, limit) {
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.INGEST_QUEUE);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.INGEST_QUEUE);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Filter: status=new AND received_at > cursor. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Filter: status=new AND received_at > cursor
// EXPLAIN: Bu satırın görevi: let pending = allData.filter(row => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    let pending = allData.filter(row => {
// EXPLAIN: Bu satırın görevi: const isNew = row.status === INGEST_STATUS.NEW;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const isNew = row.status === INGEST_STATUS.NEW;
// EXPLAIN: Bu satırın görevi: const afterCursor = !cursorValue || row.received_at > cursorValue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const afterCursor = !cursorValue || row.received_at > cursorValue;
// EXPLAIN: Bu satırın görevi: return isNew && afterCursor;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return isNew && afterCursor;
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Sort by received_at ASC (gap-free requirement). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Sort by received_at ASC (gap-free requirement)
// EXPLAIN: Bu satırın görevi: pending.sort((a, b) => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    pending.sort((a, b) => {
// EXPLAIN: Bu satırın görevi: if (a.received_at < b.received_at) return -1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (a.received_at < b.received_at) return -1;
// EXPLAIN: Bu satırın görevi: if (a.received_at > b.received_at) return 1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (a.received_at > b.received_at) return 1;
// EXPLAIN: Bu satırın görevi: return 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return 0;
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Apply limit. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Apply limit
// EXPLAIN: Bu satırın görevi: if (limit && limit > 0) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (limit && limit > 0) {
// EXPLAIN: Bu satırın görevi: pending = pending.slice(0, limit);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      pending = pending.slice(0, limit);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: return pending;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return pending;
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Update queue item status. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Update queue item status
// EXPLAIN: Bu satırın görevi: * @param {number} rowIndex - Row number (1-based). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {number} rowIndex - Row number (1-based)
// EXPLAIN: Bu satırın görevi: * @param {string} status - New status from INGEST_STATUS. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} status - New status from INGEST_STATUS
// EXPLAIN: Bu satırın görevi: * @param {string} error - Error message (optional). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} error - Error message (optional)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: updateStatus: function(rowIndex, status, error) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  updateStatus: function(rowIndex, status, error) {
// EXPLAIN: Bu satırın görevi: const updates = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const updates = {
// EXPLAIN: Bu satırın görevi: status: status,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      status: status,
// EXPLAIN: Bu satırın görevi: processed_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      processed_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: if (error !== undefined) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (error !== undefined) {
// EXPLAIN: Bu satırın görevi: updates.error = error;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      updates.error = error;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: updateRow_(SHEETS.INGEST_QUEUE, rowIndex, updates);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    updateRow_(SHEETS.INGEST_QUEUE, rowIndex, updates);
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Mark item as completed. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Mark item as completed
// EXPLAIN: Bu satırın görevi: * @param {number} rowIndex - Row number (1-based). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {number} rowIndex - Row number (1-based)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: markCompleted: function(rowIndex) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  markCompleted: function(rowIndex) {
// EXPLAIN: Bu satırın görevi: this.updateStatus(rowIndex, INGEST_STATUS.COMPLETED);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    this.updateStatus(rowIndex, INGEST_STATUS.COMPLETED);
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Mark item as failed and insert to DLQ. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Mark item as failed and insert to DLQ
// EXPLAIN: Bu satırın görevi: * @param {number} rowIndex - Row number (1-based). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {number} rowIndex - Row number (1-based)
// EXPLAIN: Bu satırın görevi: * @param {Object} item - Original queue item. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {Object} item - Original queue item
// EXPLAIN: Bu satırın görevi: * @param {string} errorMsg - Error message. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} errorMsg - Error message
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: markFailed: function(rowIndex, item, errorMsg) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  markFailed: function(rowIndex, item, errorMsg) {
// EXPLAIN: Bu satırın görevi: this.updateStatus(rowIndex, INGEST_STATUS.FAILED, errorMsg);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    this.updateStatus(rowIndex, INGEST_STATUS.FAILED, errorMsg);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Insert to DLQ (COL2 = ingest_id as per canonical schema). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Insert to DLQ (COL2 = ingest_id as per canonical schema)
// EXPLAIN: Bu satırın görevi: const dlqRow = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const dlqRow = {
// EXPLAIN: Bu satırın görevi: created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: Bu satırın görevi: ingest_id: item.ingest_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      ingest_id: item.ingest_id,
// EXPLAIN: Bu satırın görevi: source_ref_id: item.source_ref_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source_ref_id: item.source_ref_id || '',
// EXPLAIN: Bu satırın görevi: error_json: JSON.stringify({ message: errorMsg, timestamp: new Date().toISOString() }),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      error_json: JSON.stringify({ message: errorMsg, timestamp: new Date().toISOString() }),
// EXPLAIN: Bu satırın görevi: retry_count: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      retry_count: 0,
// EXPLAIN: Bu satırın görevi: last_retry_at: ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      last_retry_at: ''
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: appendRow_(SHEETS.DLQ, dlqRow);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    appendRow_(SHEETS.DLQ, dlqRow);
// EXPLAIN: Bu satırın görevi: Logger.log('DLQ | Inserted: ' + item.ingest_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('DLQ | Inserted: ' + item.ingest_id);
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Mark item as skipped (duplicate). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Mark item as skipped (duplicate)
// EXPLAIN: Bu satırın görevi: * @param {number} rowIndex - Row number (1-based). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {number} rowIndex - Row number (1-based)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: markSkipped: function(rowIndex) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  markSkipped: function(rowIndex) {
// EXPLAIN: Bu satırın görevi: this.updateStatus(rowIndex, INGEST_STATUS.SKIPPED, 'duplicate_idempotency_key');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    this.updateStatus(rowIndex, INGEST_STATUS.SKIPPED, 'duplicate_idempotency_key');
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get queue item by ingest_id. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get queue item by ingest_id
// EXPLAIN: Bu satırın görevi: * @param {string} ingestId - Ingest ID to find. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} ingestId - Ingest ID to find
// EXPLAIN: Bu satırın görevi: * @returns {Object|null} Queue item or null. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Object|null} Queue item or null
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: getByIngestId: function(ingestId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  getByIngestId: function(ingestId) {
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.INGEST_QUEUE);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.INGEST_QUEUE);
// EXPLAIN: Bu satırın görevi: return allData.find(row => row.ingest_id === ingestId) || null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.find(row => row.ingest_id === ingestId) || null;
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Reset failed item for retry (called by DLQ retry job). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Reset failed item for retry (called by DLQ retry job)
// EXPLAIN: Bu satırın görevi: * @param {string} ingestId - Ingest ID to reset. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} ingestId - Ingest ID to reset
// EXPLAIN: Bu satırın görevi: * @returns {boolean} Success flag. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {boolean} Success flag
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: resetForRetry: function(ingestId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  resetForRetry: function(ingestId) {
// EXPLAIN: Bu satırın görevi: const item = this.getByIngestId(ingestId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const item = this.getByIngestId(ingestId);
// EXPLAIN: Bu satırın görevi: if (!item) return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!item) return false;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: updateRow_(SHEETS.INGEST_QUEUE, item._rowIndex, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    updateRow_(SHEETS.INGEST_QUEUE, item._rowIndex, {
// EXPLAIN: Bu satırın görevi: status: INGEST_STATUS.NEW,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      status: INGEST_STATUS.NEW,
// EXPLAIN: Bu satırın görevi: error: '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      error: '',
// EXPLAIN: Bu satırın görevi: processed_at: ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      processed_at: ''
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: Logger.log('QUEUE | Reset for retry: ' + ingestId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('QUEUE | Reset for retry: ' + ingestId);
// EXPLAIN: Bu satırın görevi: return true;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return true;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// Çağdaş Seçkin Tüfekci - Real Estate Agent
