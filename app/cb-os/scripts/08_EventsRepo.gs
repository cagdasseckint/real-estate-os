// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS V1.0 - 08_EventsRepo.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS V1.0 - 08_EventsRepo.gs
// EXPLAIN: Bu satırın görevi: * EVENTS table operations - append-only timeline. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * EVENTS table operations - append-only timeline
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * EventsRepo namespace for EVENTS operations. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * EventsRepo namespace for EVENTS operations
// EXPLAIN: Bu satırın görevi: * EVENTS is append-only - no updates or deletes allowed. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * EVENTS is append-only - no updates or deletes allowed
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: const EventsRepo = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const EventsRepo = {
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Append a new event (append-only, no updates). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Append a new event (append-only, no updates)
// EXPLAIN: Bu satırın görevi: * @param {Object} data - Event data. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {Object} data - Event data
// EXPLAIN: Bu satırın görevi: * @returns {Object} Created event with event_id. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Object} Created event with event_id
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: append: function(data) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  append: function(data) {
// EXPLAIN: Bu satırın görevi: const eventId = id_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const eventId = id_();
// EXPLAIN: Bu satırın görevi: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const event = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const event = {
// EXPLAIN: Bu satırın görevi: event_id: eventId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      event_id: eventId,
// EXPLAIN: Bu satırın görevi: occurred_at: data.occurred_at || now,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      occurred_at: data.occurred_at || now,
// EXPLAIN: Bu satırın görevi: entity_type: data.entity_type || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_type: data.entity_type || '',
// EXPLAIN: Bu satırın görevi: entity_id: data.entity_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_id: data.entity_id || '',
// EXPLAIN: Bu satırın görevi: event_type: data.event_type || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      event_type: data.event_type || '',
// EXPLAIN: Bu satırın görevi: payload_json: typeof data.payload === 'string' ? data.payload : JSON.stringify(data.payload || {}),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      payload_json: typeof data.payload === 'string' ? data.payload : JSON.stringify(data.payload || {}),
// EXPLAIN: Bu satırın görevi: source: data.source || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source: data.source || '',
// EXPLAIN: Bu satırın görevi: source_ref_id: data.source_ref_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source_ref_id: data.source_ref_id || '',
// EXPLAIN: Bu satırın görevi: idempotency_key: data.idempotency_key || ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      idempotency_key: data.idempotency_key || ''
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const rowNum = appendRow_(SHEETS.EVENTS, event);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const rowNum = appendRow_(SHEETS.EVENTS, event);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: Logger.log('EVENTS | Appended: ' + eventId + ' type=' + event.event_type);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('EVENTS | Appended: ' + eventId + ' type=' + event.event_type);
// EXPLAIN: Bu satırın görevi: return { event_id: eventId, row_number: rowNum };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { event_id: eventId, row_number: rowNum };
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Check if event with idempotency_key already exists. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Check if event with idempotency_key already exists
// EXPLAIN: Bu satırın görevi: * @param {string} idempotencyKey - Idempotency key to check. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} idempotencyKey - Idempotency key to check
// EXPLAIN: Bu satırın görevi: * @returns {boolean} True if exists. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {boolean} True if exists
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: existsByIdempotencyKey: function(idempotencyKey) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  existsByIdempotencyKey: function(idempotencyKey) {
// EXPLAIN: Bu satırın görevi: if (!idempotencyKey) return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!idempotencyKey) return false;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.EVENTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.EVENTS);
// EXPLAIN: Bu satırın görevi: return allData.some(row => row.idempotency_key === idempotencyKey);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.some(row => row.idempotency_key === idempotencyKey);
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get events for an entity. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get events for an entity
// EXPLAIN: Bu satırın görevi: * @param {string} entityType - Entity type. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} entityType - Entity type
// EXPLAIN: Bu satırın görevi: * @param {string} entityId - Entity ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} entityId - Entity ID
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Events for entity (sorted by occurred_at DESC). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Array<Object>} Events for entity (sorted by occurred_at DESC)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: getByEntity: function(entityType, entityId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  getByEntity: function(entityType, entityId) {
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.EVENTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.EVENTS);
// EXPLAIN: Bu satırın görevi: const filtered = allData.filter(row =>. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const filtered = allData.filter(row => 
// EXPLAIN: Bu satırın görevi: row.entity_type === entityType && row.entity_id === entityId. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      row.entity_type === entityType && row.entity_id === entityId
// EXPLAIN: Bu satırın görevi: );. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    );
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Sort by occurred_at DESC (newest first). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Sort by occurred_at DESC (newest first)
// EXPLAIN: Bu satırın görevi: filtered.sort((a, b) => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    filtered.sort((a, b) => {
// EXPLAIN: Bu satırın görevi: if (a.occurred_at > b.occurred_at) return -1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (a.occurred_at > b.occurred_at) return -1;
// EXPLAIN: Bu satırın görevi: if (a.occurred_at < b.occurred_at) return 1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (a.occurred_at < b.occurred_at) return 1;
// EXPLAIN: Bu satırın görevi: return 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return 0;
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: return filtered;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return filtered;
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get events by type. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get events by type
// EXPLAIN: Bu satırın görevi: * @param {string} eventType - Event type. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} eventType - Event type
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Events of type. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Array<Object>} Events of type
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: getByType: function(eventType) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  getByType: function(eventType) {
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.EVENTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.EVENTS);
// EXPLAIN: Bu satırın görevi: return allData.filter(row => row.event_type === eventType);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.filter(row => row.event_type === eventType);
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get recent events (last N hours). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get recent events (last N hours)
// EXPLAIN: Bu satırın görevi: * @param {number} hours - Hours to look back. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {number} hours - Hours to look back
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Recent events. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Array<Object>} Recent events
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: getRecent: function(hours) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  getRecent: function(hours) {
// EXPLAIN: Bu satırın görevi: const cutoff = new Date();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const cutoff = new Date();
// EXPLAIN: Bu satırın görevi: cutoff.setHours(cutoff.getHours() - (hours || 24));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    cutoff.setHours(cutoff.getHours() - (hours || 24));
// EXPLAIN: Bu satırın görevi: const cutoffIso = cutoff.toISOString();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const cutoffIso = cutoff.toISOString();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.EVENTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.EVENTS);
// EXPLAIN: Bu satırın görevi: return allData.filter(row => row.occurred_at >= cutoffIso);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.filter(row => row.occurred_at >= cutoffIso);
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get last event for an entity. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get last event for an entity
// EXPLAIN: Bu satırın görevi: * @param {string} entityType - Entity type. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} entityType - Entity type
// EXPLAIN: Bu satırın görevi: * @param {string} entityId - Entity ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} entityId - Entity ID
// EXPLAIN: Bu satırın görevi: * @returns {Object|null} Last event or null. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Object|null} Last event or null
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: getLastForEntity: function(entityType, entityId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  getLastForEntity: function(entityType, entityId) {
// EXPLAIN: Bu satırın görevi: const events = this.getByEntity(entityType, entityId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const events = this.getByEntity(entityType, entityId);
// EXPLAIN: Bu satırın görevi: return events.length > 0 ? events[0] : null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return events.length > 0 ? events[0] : null;
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get timeline for dashboard (last N events). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get timeline for dashboard (last N events)
// EXPLAIN: Bu satırın görevi: * @param {number} limit - Maximum events to return. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {number} limit - Maximum events to return
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Timeline events. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Array<Object>} Timeline events
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: getTimeline: function(limit) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  getTimeline: function(limit) {
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.EVENTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.EVENTS);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Sort by occurred_at DESC. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Sort by occurred_at DESC
// EXPLAIN: Bu satırın görevi: allData.sort((a, b) => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    allData.sort((a, b) => {
// EXPLAIN: Bu satırın görevi: if (a.occurred_at > b.occurred_at) return -1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (a.occurred_at > b.occurred_at) return -1;
// EXPLAIN: Bu satırın görevi: if (a.occurred_at < b.occurred_at) return 1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (a.occurred_at < b.occurred_at) return 1;
// EXPLAIN: Bu satırın görevi: return 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return 0;
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: return allData.slice(0, limit || 50);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.slice(0, limit || 50);
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Standard event types for consistency. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Standard event types for consistency
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: EVENT_TYPES: {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EVENT_TYPES: {
// EXPLAIN: Bu satırın görevi: CONTACT_CREATED: 'CONTACT_CREATED',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    CONTACT_CREATED: 'CONTACT_CREATED',
// EXPLAIN: Bu satırın görevi: CONTACT_UPDATED: 'CONTACT_UPDATED',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    CONTACT_UPDATED: 'CONTACT_UPDATED',
// EXPLAIN: Bu satırın görevi: DEAL_CREATED: 'DEAL_CREATED',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    DEAL_CREATED: 'DEAL_CREATED',
// EXPLAIN: Bu satırın görevi: DEAL_UPDATED: 'DEAL_UPDATED',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    DEAL_UPDATED: 'DEAL_UPDATED',
// EXPLAIN: Bu satırın görevi: STAGE_CHANGE: 'STAGE_CHANGE',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    STAGE_CHANGE: 'STAGE_CHANGE',
// EXPLAIN: Bu satırın görevi: TASK_CREATED: 'TASK_CREATED',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    TASK_CREATED: 'TASK_CREATED',
// EXPLAIN: Bu satırın görevi: TASK_COMPLETED: 'TASK_COMPLETED',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    TASK_COMPLETED: 'TASK_COMPLETED',
// EXPLAIN: Bu satırın görevi: APPOINTMENT_CREATED: 'APPOINTMENT_CREATED',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    APPOINTMENT_CREATED: 'APPOINTMENT_CREATED',
// EXPLAIN: Bu satırın görevi: APPOINTMENT_COMPLETED: 'APPOINTMENT_COMPLETED',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    APPOINTMENT_COMPLETED: 'APPOINTMENT_COMPLETED',
// EXPLAIN: Bu satırın görevi: EMAIL_RECEIVED: 'EMAIL_RECEIVED',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    EMAIL_RECEIVED: 'EMAIL_RECEIVED',
// EXPLAIN: Bu satırın görevi: EMAIL_SENT: 'EMAIL_SENT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    EMAIL_SENT: 'EMAIL_SENT',
// EXPLAIN: Bu satırın görevi: WHATSAPP_LOG: 'WHATSAPP_LOG',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    WHATSAPP_LOG: 'WHATSAPP_LOG',
// EXPLAIN: Bu satırın görevi: CALL_LOG: 'CALL_LOG',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    CALL_LOG: 'CALL_LOG',
// EXPLAIN: Bu satırın görevi: NOTE_ADDED: 'NOTE_ADDED',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    NOTE_ADDED: 'NOTE_ADDED',
// EXPLAIN: Bu satırın görevi: DOC_UPLOADED: 'DOC_UPLOADED',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    DOC_UPLOADED: 'DOC_UPLOADED',
// EXPLAIN: Bu satırın görevi: DOC_SIGNED: 'DOC_SIGNED',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    DOC_SIGNED: 'DOC_SIGNED',
// EXPLAIN: Bu satırın görevi: FOLLOWUP_SCHEDULED: 'FOLLOWUP_SCHEDULED',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    FOLLOWUP_SCHEDULED: 'FOLLOWUP_SCHEDULED',
// EXPLAIN: Bu satırın görevi: WINBACK_SCHEDULED: 'WINBACK_SCHEDULED'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    WINBACK_SCHEDULED: 'WINBACK_SCHEDULED'
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// Çağdaş Seçkin Tüfekci - Real Estate Agent
