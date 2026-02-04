// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 08_EventsRepo.gs
 * CB-OS V1.0 - 08_EventsRepo.gs
// EXPLAIN: * EVENTS table operations - append-only timeline
 * EVENTS table operations - append-only timeline
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * EventsRepo namespace for EVENTS operations
 * EventsRepo namespace for EVENTS operations
// EXPLAIN: * EVENTS is append-only - no updates or deletes allowed
 * EVENTS is append-only - no updates or deletes allowed
// EXPLAIN: */
 */
// EXPLAIN: const EventsRepo = {
const EventsRepo = {
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Append a new event (append-only, no updates)
   * Append a new event (append-only, no updates)
// EXPLAIN: * @param {Object} data - Event data
   * @param {Object} data - Event data
// EXPLAIN: * @returns {Object} Created event with event_id
   * @returns {Object} Created event with event_id
// EXPLAIN: */
   */
// EXPLAIN: append: function(data) {
  append: function(data) {
// EXPLAIN: const eventId = id_();
    const eventId = id_();
// EXPLAIN: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const event = {
    const event = {
// EXPLAIN: event_id: eventId,
      event_id: eventId,
// EXPLAIN: occurred_at: data.occurred_at || now,
      occurred_at: data.occurred_at || now,
// EXPLAIN: entity_type: data.entity_type || '',
      entity_type: data.entity_type || '',
// EXPLAIN: entity_id: data.entity_id || '',
      entity_id: data.entity_id || '',
// EXPLAIN: event_type: data.event_type || '',
      event_type: data.event_type || '',
// EXPLAIN: payload_json: typeof data.payload === 'string' ? data.payload : JSON.stringify(data.payload || {}),
      payload_json: typeof data.payload === 'string' ? data.payload : JSON.stringify(data.payload || {}),
// EXPLAIN: source: data.source || '',
      source: data.source || '',
// EXPLAIN: source_ref_id: data.source_ref_id || '',
      source_ref_id: data.source_ref_id || '',
// EXPLAIN: idempotency_key: data.idempotency_key || ''
      idempotency_key: data.idempotency_key || ''
// EXPLAIN: };
    };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const rowNum = appendRow_(SHEETS.EVENTS, event);
    const rowNum = appendRow_(SHEETS.EVENTS, event);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: Logger.log('EVENTS | Appended: ' + eventId + ' type=' + event.event_type);
    Logger.log('EVENTS | Appended: ' + eventId + ' type=' + event.event_type);
// EXPLAIN: return { event_id: eventId, row_number: rowNum };
    return { event_id: eventId, row_number: rowNum };
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Check if event with idempotency_key already exists
   * Check if event with idempotency_key already exists
// EXPLAIN: * @param {string} idempotencyKey - Idempotency key to check
   * @param {string} idempotencyKey - Idempotency key to check
// EXPLAIN: * @returns {boolean} True if exists
   * @returns {boolean} True if exists
// EXPLAIN: */
   */
// EXPLAIN: existsByIdempotencyKey: function(idempotencyKey) {
  existsByIdempotencyKey: function(idempotencyKey) {
// EXPLAIN: if (!idempotencyKey) return false;
    if (!idempotencyKey) return false;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const allData = getSheetData_(SHEETS.EVENTS);
    const allData = getSheetData_(SHEETS.EVENTS);
// EXPLAIN: return allData.some(row => row.idempotency_key === idempotencyKey);
    return allData.some(row => row.idempotency_key === idempotencyKey);
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get events for an entity
   * Get events for an entity
// EXPLAIN: * @param {string} entityType - Entity type
   * @param {string} entityType - Entity type
// EXPLAIN: * @param {string} entityId - Entity ID
   * @param {string} entityId - Entity ID
// EXPLAIN: * @returns {Array<Object>} Events for entity (sorted by occurred_at DESC)
   * @returns {Array<Object>} Events for entity (sorted by occurred_at DESC)
// EXPLAIN: */
   */
// EXPLAIN: getByEntity: function(entityType, entityId) {
  getByEntity: function(entityType, entityId) {
// EXPLAIN: const allData = getSheetData_(SHEETS.EVENTS);
    const allData = getSheetData_(SHEETS.EVENTS);
// EXPLAIN: const filtered = allData.filter(row =>
    const filtered = allData.filter(row => 
// EXPLAIN: row.entity_type === entityType && row.entity_id === entityId
      row.entity_type === entityType && row.entity_id === entityId
// EXPLAIN: );
    );
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Sort by occurred_at DESC (newest first)
    // Sort by occurred_at DESC (newest first)
// EXPLAIN: filtered.sort((a, b) => {
    filtered.sort((a, b) => {
// EXPLAIN: if (a.occurred_at > b.occurred_at) return -1;
      if (a.occurred_at > b.occurred_at) return -1;
// EXPLAIN: if (a.occurred_at < b.occurred_at) return 1;
      if (a.occurred_at < b.occurred_at) return 1;
// EXPLAIN: return 0;
      return 0;
// EXPLAIN: });
    });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return filtered;
    return filtered;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get events by type
   * Get events by type
// EXPLAIN: * @param {string} eventType - Event type
   * @param {string} eventType - Event type
// EXPLAIN: * @returns {Array<Object>} Events of type
   * @returns {Array<Object>} Events of type
// EXPLAIN: */
   */
// EXPLAIN: getByType: function(eventType) {
  getByType: function(eventType) {
// EXPLAIN: const allData = getSheetData_(SHEETS.EVENTS);
    const allData = getSheetData_(SHEETS.EVENTS);
// EXPLAIN: return allData.filter(row => row.event_type === eventType);
    return allData.filter(row => row.event_type === eventType);
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get recent events (last N hours)
   * Get recent events (last N hours)
// EXPLAIN: * @param {number} hours - Hours to look back
   * @param {number} hours - Hours to look back
// EXPLAIN: * @returns {Array<Object>} Recent events
   * @returns {Array<Object>} Recent events
// EXPLAIN: */
   */
// EXPLAIN: getRecent: function(hours) {
  getRecent: function(hours) {
// EXPLAIN: const cutoff = new Date();
    const cutoff = new Date();
// EXPLAIN: cutoff.setHours(cutoff.getHours() - (hours || 24));
    cutoff.setHours(cutoff.getHours() - (hours || 24));
// EXPLAIN: const cutoffIso = cutoff.toISOString();
    const cutoffIso = cutoff.toISOString();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const allData = getSheetData_(SHEETS.EVENTS);
    const allData = getSheetData_(SHEETS.EVENTS);
// EXPLAIN: return allData.filter(row => row.occurred_at >= cutoffIso);
    return allData.filter(row => row.occurred_at >= cutoffIso);
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get last event for an entity
   * Get last event for an entity
// EXPLAIN: * @param {string} entityType - Entity type
   * @param {string} entityType - Entity type
// EXPLAIN: * @param {string} entityId - Entity ID
   * @param {string} entityId - Entity ID
// EXPLAIN: * @returns {Object|null} Last event or null
   * @returns {Object|null} Last event or null
// EXPLAIN: */
   */
// EXPLAIN: getLastForEntity: function(entityType, entityId) {
  getLastForEntity: function(entityType, entityId) {
// EXPLAIN: const events = this.getByEntity(entityType, entityId);
    const events = this.getByEntity(entityType, entityId);
// EXPLAIN: return events.length > 0 ? events[0] : null;
    return events.length > 0 ? events[0] : null;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get timeline for dashboard (last N events)
   * Get timeline for dashboard (last N events)
// EXPLAIN: * @param {number} limit - Maximum events to return
   * @param {number} limit - Maximum events to return
// EXPLAIN: * @returns {Array<Object>} Timeline events
   * @returns {Array<Object>} Timeline events
// EXPLAIN: */
   */
// EXPLAIN: getTimeline: function(limit) {
  getTimeline: function(limit) {
// EXPLAIN: const allData = getSheetData_(SHEETS.EVENTS);
    const allData = getSheetData_(SHEETS.EVENTS);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Sort by occurred_at DESC
    // Sort by occurred_at DESC
// EXPLAIN: allData.sort((a, b) => {
    allData.sort((a, b) => {
// EXPLAIN: if (a.occurred_at > b.occurred_at) return -1;
      if (a.occurred_at > b.occurred_at) return -1;
// EXPLAIN: if (a.occurred_at < b.occurred_at) return 1;
      if (a.occurred_at < b.occurred_at) return 1;
// EXPLAIN: return 0;
      return 0;
// EXPLAIN: });
    });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return allData.slice(0, limit || 50);
    return allData.slice(0, limit || 50);
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Standard event types for consistency
   * Standard event types for consistency
// EXPLAIN: */
   */
// EXPLAIN: EVENT_TYPES: {
  EVENT_TYPES: {
// EXPLAIN: CONTACT_CREATED: 'CONTACT_CREATED',
    CONTACT_CREATED: 'CONTACT_CREATED',
// EXPLAIN: CONTACT_UPDATED: 'CONTACT_UPDATED',
    CONTACT_UPDATED: 'CONTACT_UPDATED',
// EXPLAIN: DEAL_CREATED: 'DEAL_CREATED',
    DEAL_CREATED: 'DEAL_CREATED',
// EXPLAIN: DEAL_UPDATED: 'DEAL_UPDATED',
    DEAL_UPDATED: 'DEAL_UPDATED',
// EXPLAIN: STAGE_CHANGE: 'STAGE_CHANGE',
    STAGE_CHANGE: 'STAGE_CHANGE',
// EXPLAIN: TASK_CREATED: 'TASK_CREATED',
    TASK_CREATED: 'TASK_CREATED',
// EXPLAIN: TASK_COMPLETED: 'TASK_COMPLETED',
    TASK_COMPLETED: 'TASK_COMPLETED',
// EXPLAIN: APPOINTMENT_CREATED: 'APPOINTMENT_CREATED',
    APPOINTMENT_CREATED: 'APPOINTMENT_CREATED',
// EXPLAIN: APPOINTMENT_COMPLETED: 'APPOINTMENT_COMPLETED',
    APPOINTMENT_COMPLETED: 'APPOINTMENT_COMPLETED',
// EXPLAIN: EMAIL_RECEIVED: 'EMAIL_RECEIVED',
    EMAIL_RECEIVED: 'EMAIL_RECEIVED',
// EXPLAIN: EMAIL_SENT: 'EMAIL_SENT',
    EMAIL_SENT: 'EMAIL_SENT',
// EXPLAIN: WHATSAPP_LOG: 'WHATSAPP_LOG',
    WHATSAPP_LOG: 'WHATSAPP_LOG',
// EXPLAIN: CALL_LOG: 'CALL_LOG',
    CALL_LOG: 'CALL_LOG',
// EXPLAIN: NOTE_ADDED: 'NOTE_ADDED',
    NOTE_ADDED: 'NOTE_ADDED',
// EXPLAIN: DOC_UPLOADED: 'DOC_UPLOADED',
    DOC_UPLOADED: 'DOC_UPLOADED',
// EXPLAIN: DOC_SIGNED: 'DOC_SIGNED',
    DOC_SIGNED: 'DOC_SIGNED',
// EXPLAIN: FOLLOWUP_SCHEDULED: 'FOLLOWUP_SCHEDULED',
    FOLLOWUP_SCHEDULED: 'FOLLOWUP_SCHEDULED',
// EXPLAIN: WINBACK_SCHEDULED: 'WINBACK_SCHEDULED'
    WINBACK_SCHEDULED: 'WINBACK_SCHEDULED'
// EXPLAIN: }
  }
// EXPLAIN: };
};
// Çağdaş Seçkin Tüfekci - Real Estate Agent
