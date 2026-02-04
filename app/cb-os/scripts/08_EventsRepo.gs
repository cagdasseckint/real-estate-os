/**
 * CB-OS V1.0 - 08_EventsRepo.gs
 * EVENTS table operations - append-only timeline
 */

/**
 * EventsRepo namespace for EVENTS operations
 * EVENTS is append-only - no updates or deletes allowed
 */
const EventsRepo = {
  
  /**
   * Append a new event (append-only, no updates)
   * @param {Object} data - Event data
   * @returns {Object} Created event with event_id
   */
  append: function(data) {
    const eventId = id_();
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    
    const event = {
      event_id: eventId,
      occurred_at: data.occurred_at || now,
      entity_type: data.entity_type || '',
      entity_id: data.entity_id || '',
      event_type: data.event_type || '',
      payload_json: typeof data.payload === 'string' ? data.payload : JSON.stringify(data.payload || {}),
      source: data.source || '',
      source_ref_id: data.source_ref_id || '',
      idempotency_key: data.idempotency_key || ''
    };
    
    const rowNum = appendRow_(SHEETS.EVENTS, event);
    
    Logger.log('EVENTS | Appended: ' + eventId + ' type=' + event.event_type);
    return { event_id: eventId, row_number: rowNum };
  },
  
  /**
   * Check if event with idempotency_key already exists
   * @param {string} idempotencyKey - Idempotency key to check
   * @returns {boolean} True if exists
   */
  existsByIdempotencyKey: function(idempotencyKey) {
    if (!idempotencyKey) return false;
    
    const allData = getSheetData_(SHEETS.EVENTS);
    return allData.some(row => row.idempotency_key === idempotencyKey);
  },
  
  /**
   * Get events for an entity
   * @param {string} entityType - Entity type
   * @param {string} entityId - Entity ID
   * @returns {Array<Object>} Events for entity (sorted by occurred_at DESC)
   */
  getByEntity: function(entityType, entityId) {
    const allData = getSheetData_(SHEETS.EVENTS);
    const filtered = allData.filter(row => 
      row.entity_type === entityType && row.entity_id === entityId
    );
    
    // Sort by occurred_at DESC (newest first)
    filtered.sort((a, b) => {
      if (a.occurred_at > b.occurred_at) return -1;
      if (a.occurred_at < b.occurred_at) return 1;
      return 0;
    });
    
    return filtered;
  },
  
  /**
   * Get events by type
   * @param {string} eventType - Event type
   * @returns {Array<Object>} Events of type
   */
  getByType: function(eventType) {
    const allData = getSheetData_(SHEETS.EVENTS);
    return allData.filter(row => row.event_type === eventType);
  },
  
  /**
   * Get recent events (last N hours)
   * @param {number} hours - Hours to look back
   * @returns {Array<Object>} Recent events
   */
  getRecent: function(hours) {
    const cutoff = new Date();
    cutoff.setHours(cutoff.getHours() - (hours || 24));
    const cutoffMs = cutoff.getTime();
    
    const allData = getSheetData_(SHEETS.EVENTS);
    return allData.filter(row => {
      const occurredMs = parseCbTimeMs_(row.occurred_at);
      return occurredMs !== null && occurredMs >= cutoffMs;
    });
  },
  
  /**
   * Get last event for an entity
   * @param {string} entityType - Entity type
   * @param {string} entityId - Entity ID
   * @returns {Object|null} Last event or null
   */
  getLastForEntity: function(entityType, entityId) {
    const events = this.getByEntity(entityType, entityId);
    return events.length > 0 ? events[0] : null;
  },
  
  /**
   * Get timeline for dashboard (last N events)
   * @param {number} limit - Maximum events to return
   * @returns {Array<Object>} Timeline events
   */
  getTimeline: function(limit) {
    const allData = getSheetData_(SHEETS.EVENTS);
    
    // Sort by occurred_at DESC
    allData.sort((a, b) => {
      if (a.occurred_at > b.occurred_at) return -1;
      if (a.occurred_at < b.occurred_at) return 1;
      return 0;
    });
    
    return allData.slice(0, limit || 50);
  },
  
  /**
   * Standard event types for consistency
   */
  EVENT_TYPES: {
    CONTACT_CREATED: 'CONTACT_CREATED',
    CONTACT_UPDATED: 'CONTACT_UPDATED',
    DEAL_CREATED: 'DEAL_CREATED',
    DEAL_UPDATED: 'DEAL_UPDATED',
    STAGE_CHANGE: 'STAGE_CHANGE',
    TASK_CREATED: 'TASK_CREATED',
    TASK_COMPLETED: 'TASK_COMPLETED',
    APPOINTMENT_CREATED: 'APPOINTMENT_CREATED',
    APPOINTMENT_COMPLETED: 'APPOINTMENT_COMPLETED',
    EMAIL_RECEIVED: 'EMAIL_RECEIVED',
    EMAIL_SENT: 'EMAIL_SENT',
    WHATSAPP_LOG: 'WHATSAPP_LOG',
    CALL_LOG: 'CALL_LOG',
    NOTE_ADDED: 'NOTE_ADDED',
    DOC_UPLOADED: 'DOC_UPLOADED',
    DOC_SIGNED: 'DOC_SIGNED',
    FOLLOWUP_SCHEDULED: 'FOLLOWUP_SCHEDULED',
    WINBACK_SCHEDULED: 'WINBACK_SCHEDULED'
  }
};
