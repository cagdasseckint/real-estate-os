// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 13_IngestProcessJob.gs
 * CB-OS V1.0 - 13_IngestProcessJob.gs
// EXPLAIN: * Main ingest processing job - cursor-based, gap-free
 * Main ingest processing job - cursor-based, gap-free
// EXPLAIN: * Processes INGEST_QUEUE items and routes to appropriate handlers
 * Processes INGEST_QUEUE items and routes to appropriate handlers
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Process ingest queue items
 * Process ingest queue items
// EXPLAIN: * Gap-free: stops on first failure, does not advance cursor
 * Gap-free: stops on first failure, does not advance cursor
// EXPLAIN: * @param {Object} ctx - Job context with orch_run_id
 * @param {Object} ctx - Job context with orch_run_id
// EXPLAIN: * @returns {Object} Job result summary
 * @returns {Object} Job result summary
// EXPLAIN: */
 */
// EXPLAIN: function ingest_process_job(ctx) {
function ingest_process_job(ctx) {
// EXPLAIN: ctx = ctx || createJobContext_();
  ctx = ctx || createJobContext_();
// EXPLAIN: const jobName = 'ingest_process_job';
  const jobName = 'ingest_process_job';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Get current cursor
  // Get current cursor
// EXPLAIN: const cursorBefore = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);
  const cursorBefore = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);
// EXPLAIN: let cursorAfter = cursorBefore;
  let cursorAfter = cursorBefore;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Get pending items
  // Get pending items
// EXPLAIN: const batchSize = ctx.batch_size || cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE);
  const batchSize = ctx.batch_size || cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE);
// EXPLAIN: const pending = QueueRepo.getPending(cursorBefore, batchSize);
  const pending = QueueRepo.getPending(cursorBefore, batchSize);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('INGEST_PROCESS | Starting with cursor=' + cursorBefore + ', pending=' + pending.length);
  Logger.log('INGEST_PROCESS | Starting with cursor=' + cursorBefore + ', pending=' + pending.length);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const result = {
  const result = {
// EXPLAIN: processed: 0,
    processed: 0,
// EXPLAIN: skipped: 0,
    skipped: 0,
// EXPLAIN: failed: 0,
    failed: 0,
// EXPLAIN: stopped_on_failure: false
    stopped_on_failure: false
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const item of pending) {
  for (const item of pending) {
// EXPLAIN: try {
    try {
// EXPLAIN: // Parse payload
      // Parse payload
// EXPLAIN: const payload = parseJsonSafe_(item.payload_json);
      const payload = parseJsonSafe_(item.payload_json);
// EXPLAIN: if (!payload) {
      if (!payload) {
// EXPLAIN: // JSON parse failure -> DLQ
        // JSON parse failure -> DLQ
// EXPLAIN: QueueRepo.markFailed(item._rowIndex, item, 'JSON parse error');
        QueueRepo.markFailed(item._rowIndex, item, 'JSON parse error');
// EXPLAIN: result.failed++;
        result.failed++;
// EXPLAIN: result.stopped_on_failure = true;
        result.stopped_on_failure = true;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: // Gap-free: log and break
        // Gap-free: log and break
// EXPLAIN: logJobRun_(ctx, jobName, cursorBefore, cursorAfter,
        logJobRun_(ctx, jobName, cursorBefore, cursorAfter, 
// EXPLAIN: AUDIT_CONTRACT_STRING,
                   AUDIT_CONTRACT_STRING, 
// EXPLAIN: 'Failed on ingest_id=' + item.ingest_id + ': JSON parse error');
                   'Failed on ingest_id=' + item.ingest_id + ': JSON parse error');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: // Evidence logging
        // Evidence logging
// EXPLAIN: logEvidence_('INGEST_FAIL', 'ingest_id=' + item.ingest_id + ' | error=JSON parse error');
        logEvidence_('INGEST_FAIL', 'ingest_id=' + item.ingest_id + ' | error=JSON parse error');
// EXPLAIN: break;
        break;
// EXPLAIN: }
      }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: // Check idempotency
      // Check idempotency
// EXPLAIN: if (item.idempotency_key) {
      if (item.idempotency_key) {
// EXPLAIN: const dedupResult = DedupRepo.insertIfNotExists(item.idempotency_key);
        const dedupResult = DedupRepo.insertIfNotExists(item.idempotency_key);
// EXPLAIN: if (!dedupResult.inserted) {
        if (!dedupResult.inserted) {
// EXPLAIN: // Duplicate - skip
          // Duplicate - skip
// EXPLAIN: QueueRepo.markSkipped(item._rowIndex);
          QueueRepo.markSkipped(item._rowIndex);
// EXPLAIN: result.skipped++;
          result.skipped++;
// EXPLAIN: cursorAfter = item.received_at;
          cursorAfter = item.received_at;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
          
// EXPLAIN: Logger.log('INGEST_PROCESS | Skipped duplicate: ' + item.idempotency_key);
          Logger.log('INGEST_PROCESS | Skipped duplicate: ' + item.idempotency_key);
// EXPLAIN: continue;
          continue;
// EXPLAIN: }
        }
// EXPLAIN: }
      }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: // Route by ingest_type
      // Route by ingest_type
// EXPLAIN: const processResult = routeIngestItem_(item, payload);
      const processResult = routeIngestItem_(item, payload);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: if (processResult.success) {
      if (processResult.success) {
// EXPLAIN: QueueRepo.markCompleted(item._rowIndex);
        QueueRepo.markCompleted(item._rowIndex);
// EXPLAIN: result.processed++;
        result.processed++;
// EXPLAIN: cursorAfter = item.received_at;
        cursorAfter = item.received_at;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: Logger.log('INGEST_PROCESS | Completed: ' + item.ingest_id);
        Logger.log('INGEST_PROCESS | Completed: ' + item.ingest_id);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: // Evidence logging
        // Evidence logging
// EXPLAIN: logEvidence_('INGEST_SUCCESS', 'ingest_id=' + item.ingest_id + ' | type=' + item.ingest_type);
        logEvidence_('INGEST_SUCCESS', 'ingest_id=' + item.ingest_id + ' | type=' + item.ingest_type);
// EXPLAIN: } else {
      } else {
// EXPLAIN: // Processing failure -> DLQ
        // Processing failure -> DLQ
// EXPLAIN: QueueRepo.markFailed(item._rowIndex, item, processResult.error);
        QueueRepo.markFailed(item._rowIndex, item, processResult.error);
// EXPLAIN: result.failed++;
        result.failed++;
// EXPLAIN: result.stopped_on_failure = true;
        result.stopped_on_failure = true;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: // Gap-free: log and break
        // Gap-free: log and break
// EXPLAIN: logJobRun_(ctx, jobName, cursorBefore, cursorAfter,
        logJobRun_(ctx, jobName, cursorBefore, cursorAfter, 
// EXPLAIN: AUDIT_CONTRACT_STRING,
                   AUDIT_CONTRACT_STRING, 
// EXPLAIN: 'Failed on ingest_id=' + item.ingest_id + ': ' + processResult.error);
                   'Failed on ingest_id=' + item.ingest_id + ': ' + processResult.error);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: logEvidence_('INGEST_FAIL', 'ingest_id=' + item.ingest_id + ' | error=' + processResult.error);
        logEvidence_('INGEST_FAIL', 'ingest_id=' + item.ingest_id + ' | error=' + processResult.error);
// EXPLAIN: break;
        break;
// EXPLAIN: }
      }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: } catch (e) {
    } catch (e) {
// EXPLAIN: // Unexpected error -> DLQ
      // Unexpected error -> DLQ
// EXPLAIN: QueueRepo.markFailed(item._rowIndex, item, 'Unexpected error: ' + e.message);
      QueueRepo.markFailed(item._rowIndex, item, 'Unexpected error: ' + e.message);
// EXPLAIN: result.failed++;
      result.failed++;
// EXPLAIN: result.stopped_on_failure = true;
      result.stopped_on_failure = true;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: logJobRun_(ctx, jobName, cursorBefore, cursorAfter,
      logJobRun_(ctx, jobName, cursorBefore, cursorAfter, 
// EXPLAIN: AUDIT_CONTRACT_STRING,
                 AUDIT_CONTRACT_STRING, 
// EXPLAIN: 'Exception on ingest_id=' + item.ingest_id + ': ' + e.message);
                 'Exception on ingest_id=' + item.ingest_id + ': ' + e.message);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: logEvidence_('INGEST_EXCEPTION', 'ingest_id=' + item.ingest_id + ' | error=' + e.message);
      logEvidence_('INGEST_EXCEPTION', 'ingest_id=' + item.ingest_id + ' | error=' + e.message);
// EXPLAIN: break;
      break;
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Update cursor only if we processed something without failure
  // Update cursor only if we processed something without failure
// EXPLAIN: if (cursorAfter !== cursorBefore) {
  if (cursorAfter !== cursorBefore) {
// EXPLAIN: setCursor_(CURSORS.INGEST_LAST_RECEIVED_AT, cursorAfter);
    setCursor_(CURSORS.INGEST_LAST_RECEIVED_AT, cursorAfter);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Log job run (success case)
  // Log job run (success case)
// EXPLAIN: if (!result.stopped_on_failure) {
  if (!result.stopped_on_failure) {
// EXPLAIN: logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '',
    logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '', 
// EXPLAIN: 'Processed=' + result.processed + ', Skipped=' + result.skipped);
               'Processed=' + result.processed + ', Skipped=' + result.skipped);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Dump evidence
  // Dump evidence
// EXPLAIN: dumpSheetEvidence_(SHEETS.INGEST_QUEUE, 2, 5);
  dumpSheetEvidence_(SHEETS.INGEST_QUEUE, 2, 5);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('INGEST_PROCESS | Complete: ' + JSON.stringify(result));
  Logger.log('INGEST_PROCESS | Complete: ' + JSON.stringify(result));
// EXPLAIN: return result;
  return result;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Route ingest item to appropriate handler based on ingest_type
 * Route ingest item to appropriate handler based on ingest_type
// EXPLAIN: * @param {Object} item - Queue item
 * @param {Object} item - Queue item
// EXPLAIN: * @param {Object} payload - Parsed payload
 * @param {Object} payload - Parsed payload
// EXPLAIN: * @returns {Object} Result with success flag and optional error
 * @returns {Object} Result with success flag and optional error
// EXPLAIN: */
 */
// EXPLAIN: function routeIngestItem_(item, payload) {
function routeIngestItem_(item, payload) {
// EXPLAIN: const ingestType = item.ingest_type;
  const ingestType = item.ingest_type;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: switch (ingestType) {
    switch (ingestType) {
// EXPLAIN: case INGEST_TYPES.NEW_LEAD:
      case INGEST_TYPES.NEW_LEAD:
// EXPLAIN: return handleNewLead_(item, payload);
        return handleNewLead_(item, payload);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: case INGEST_TYPES.FORM_LEAD:
      case INGEST_TYPES.FORM_LEAD:
// EXPLAIN: return handleNewLead_(item, payload);
        return handleNewLead_(item, payload);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: case INGEST_TYPES.GMAIL_SIGNAL:
      case INGEST_TYPES.GMAIL_SIGNAL:
// EXPLAIN: return handleGmailSignal_(item, payload);
        return handleGmailSignal_(item, payload);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: case INGEST_TYPES.CONTACT_UPDATE:
      case INGEST_TYPES.CONTACT_UPDATE:
// EXPLAIN: return handleContactUpdate_(item, payload);
        return handleContactUpdate_(item, payload);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: case INGEST_TYPES.DEAL_UPDATE:
      case INGEST_TYPES.DEAL_UPDATE:
// EXPLAIN: return handleDealUpdate_(item, payload);
        return handleDealUpdate_(item, payload);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: case INGEST_TYPES.TASK_CREATE:
      case INGEST_TYPES.TASK_CREATE:
// EXPLAIN: return handleTaskCreate_(item, payload);
        return handleTaskCreate_(item, payload);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: case INGEST_TYPES.TASK_UPDATE:
      case INGEST_TYPES.TASK_UPDATE:
// EXPLAIN: return handleTaskUpdate_(item, payload);
        return handleTaskUpdate_(item, payload);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: case INGEST_TYPES.EVENT_LOG:
      case INGEST_TYPES.EVENT_LOG:
// EXPLAIN: return handleEventLog_(item, payload);
        return handleEventLog_(item, payload);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: case INGEST_TYPES.APPOINTMENT_CREATE:
      case INGEST_TYPES.APPOINTMENT_CREATE:
// EXPLAIN: return handleAppointmentCreate_(item, payload);
        return handleAppointmentCreate_(item, payload);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: case INGEST_TYPES.MANUAL_IMPORT:
      case INGEST_TYPES.MANUAL_IMPORT:
// EXPLAIN: return handleManualImport_(item, payload);
        return handleManualImport_(item, payload);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: default:
      default:
// EXPLAIN: Logger.log('INGEST | Unknown type: ' + ingestType);
        Logger.log('INGEST | Unknown type: ' + ingestType);
// EXPLAIN: return { success: false, error: 'Unknown ingest_type: ' + ingestType };
        return { success: false, error: 'Unknown ingest_type: ' + ingestType };
// EXPLAIN: }
    }
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: return { success: false, error: 'Handler error: ' + e.message };
    return { success: false, error: 'Handler error: ' + e.message };
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Handle new lead - create contact and deal
 * Handle new lead - create contact and deal
// EXPLAIN: * @param {Object} item - Queue item
 * @param {Object} item - Queue item
// EXPLAIN: * @param {Object} payload - Parsed payload
 * @param {Object} payload - Parsed payload
// EXPLAIN: * @returns {Object} Result
 * @returns {Object} Result
// EXPLAIN: */
 */
// EXPLAIN: function handleNewLead_(item, payload) {
function handleNewLead_(item, payload) {
// EXPLAIN: // Normalize based on deal type
  // Normalize based on deal type
// EXPLAIN: let normalized;
  let normalized;
// EXPLAIN: const dealType = (payload.deal_type || '').toUpperCase();
  const dealType = (payload.deal_type || '').toUpperCase();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (dealType === 'LAND') {
  if (dealType === 'LAND') {
// EXPLAIN: normalized = normalizeLandPayload_(payload);
    normalized = normalizeLandPayload_(payload);
// EXPLAIN: } else {
  } else {
// EXPLAIN: normalized = normalizeNewLead_(payload);
    normalized = normalizeNewLead_(payload);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Check for normalization errors
  // Check for normalization errors
// EXPLAIN: if (normalized.errors && normalized.errors.length > 0) {
  if (normalized.errors && normalized.errors.length > 0) {
// EXPLAIN: return { success: false, error: 'Normalization error: ' + normalized.errors.join(', ') };
    return { success: false, error: 'Normalization error: ' + normalized.errors.join(', ') };
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Find or create contact
  // Find or create contact
// EXPLAIN: normalized.contact.source = item.source || normalized.contact.source;
  normalized.contact.source = item.source || normalized.contact.source;
// EXPLAIN: normalized.contact.source_ref_id = item.source_ref_id || normalized.contact.source_ref_id;
  normalized.contact.source_ref_id = item.source_ref_id || normalized.contact.source_ref_id;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const contact = ContactsRepo.findOrCreate(normalized.contact);
  const contact = ContactsRepo.findOrCreate(normalized.contact);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Create deal linked to contact
  // Create deal linked to contact
// EXPLAIN: normalized.deal.contact_id = contact.contact_id;
  normalized.deal.contact_id = contact.contact_id;
// EXPLAIN: const deal = DealsRepo.create(normalized.deal);
  const deal = DealsRepo.create(normalized.deal);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Log events
  // Log events
// EXPLAIN: EventsRepo.append({
  EventsRepo.append({
// EXPLAIN: entity_type: 'CONTACT',
    entity_type: 'CONTACT',
// EXPLAIN: entity_id: contact.contact_id,
    entity_id: contact.contact_id,
// EXPLAIN: event_type: EventsRepo.EVENT_TYPES.CONTACT_CREATED,
    event_type: EventsRepo.EVENT_TYPES.CONTACT_CREATED,
// EXPLAIN: payload: { source: item.source },
    payload: { source: item.source },
// EXPLAIN: source: item.source,
    source: item.source,
// EXPLAIN: source_ref_id: item.source_ref_id,
    source_ref_id: item.source_ref_id,
// EXPLAIN: idempotency_key: item.idempotency_key + '_contact'
    idempotency_key: item.idempotency_key + '_contact'
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: EventsRepo.append({
  EventsRepo.append({
// EXPLAIN: entity_type: 'DEAL',
    entity_type: 'DEAL',
// EXPLAIN: entity_id: deal.deal_id,
    entity_id: deal.deal_id,
// EXPLAIN: event_type: EventsRepo.EVENT_TYPES.DEAL_CREATED,
    event_type: EventsRepo.EVENT_TYPES.DEAL_CREATED,
// EXPLAIN: payload: { deal_type: deal.deal_type, stage: deal.stage },
    payload: { deal_type: deal.deal_type, stage: deal.stage },
// EXPLAIN: source: item.source,
    source: item.source,
// EXPLAIN: source_ref_id: item.source_ref_id,
    source_ref_id: item.source_ref_id,
// EXPLAIN: idempotency_key: item.idempotency_key + '_deal'
    idempotency_key: item.idempotency_key + '_deal'
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Create first touch task
  // Create first touch task
// EXPLAIN: TasksRepo.createFromTemplate('first_touch', {
  TasksRepo.createFromTemplate('first_touch', {
// EXPLAIN: entity_type: 'DEAL',
    entity_type: 'DEAL',
// EXPLAIN: entity_id: deal.deal_id
    entity_id: deal.deal_id
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (cfg_('FOLLOWUP_SEQUENCE_ENABLED', DEFAULTS.FOLLOWUP_SEQUENCE_ENABLED)) {
  if (cfg_('FOLLOWUP_SEQUENCE_ENABLED', DEFAULTS.FOLLOWUP_SEQUENCE_ENABLED)) {
// EXPLAIN: scheduleFollowupSequence_(deal, contact);
    scheduleFollowupSequence_(deal, contact);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: recordLeadSignal_(deal, contact, 'FORM_LEAD', item.source, 30, 'new_lead');
  recordLeadSignal_(deal, contact, 'FORM_LEAD', item.source, 30, 'new_lead');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('NEW_LEAD | Created contact=' + contact.contact_id + ', deal=' + deal.deal_id);
  Logger.log('NEW_LEAD | Created contact=' + contact.contact_id + ', deal=' + deal.deal_id);
// EXPLAIN: return { success: true, contact_id: contact.contact_id, deal_id: deal.deal_id };
  return { success: true, contact_id: contact.contact_id, deal_id: deal.deal_id };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Handle contact update
 * Handle contact update
// EXPLAIN: */
 */
// EXPLAIN: function handleContactUpdate_(item, payload) {
function handleContactUpdate_(item, payload) {
// EXPLAIN: const contactId = payload.contact_id;
  const contactId = payload.contact_id;
// EXPLAIN: if (!contactId) {
  if (!contactId) {
// EXPLAIN: return { success: false, error: 'Missing contact_id' };
    return { success: false, error: 'Missing contact_id' };
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const contact = ContactsRepo.findById(contactId);
  const contact = ContactsRepo.findById(contactId);
// EXPLAIN: if (!contact) {
  if (!contact) {
// EXPLAIN: return { success: false, error: 'Contact not found: ' + contactId };
    return { success: false, error: 'Contact not found: ' + contactId };
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Update allowed fields
  // Update allowed fields
// EXPLAIN: const updates = {};
  const updates = {};
// EXPLAIN: const allowedFields = ['first_name', 'last_name', 'email', 'phone', 'whatsapp',
  const allowedFields = ['first_name', 'last_name', 'email', 'phone', 'whatsapp', 
// EXPLAIN: 'status', 'tags', 'notes', 'preferred_contact_method'];
                         'status', 'tags', 'notes', 'preferred_contact_method'];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const field of allowedFields) {
  for (const field of allowedFields) {
// EXPLAIN: if (payload[field] !== undefined) {
    if (payload[field] !== undefined) {
// EXPLAIN: updates[field] = payload[field];
      updates[field] = payload[field];
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: ContactsRepo.update(contactId, updates);
  ContactsRepo.update(contactId, updates);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: EventsRepo.append({
  EventsRepo.append({
// EXPLAIN: entity_type: 'CONTACT',
    entity_type: 'CONTACT',
// EXPLAIN: entity_id: contactId,
    entity_id: contactId,
// EXPLAIN: event_type: EventsRepo.EVENT_TYPES.CONTACT_UPDATED,
    event_type: EventsRepo.EVENT_TYPES.CONTACT_UPDATED,
// EXPLAIN: payload: updates,
    payload: updates,
// EXPLAIN: source: item.source,
    source: item.source,
// EXPLAIN: idempotency_key: item.idempotency_key
    idempotency_key: item.idempotency_key
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return { success: true };
  return { success: true };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Handle deal update
 * Handle deal update
// EXPLAIN: */
 */
// EXPLAIN: function handleDealUpdate_(item, payload) {
function handleDealUpdate_(item, payload) {
// EXPLAIN: const dealId = payload.deal_id;
  const dealId = payload.deal_id;
// EXPLAIN: if (!dealId) {
  if (!dealId) {
// EXPLAIN: return { success: false, error: 'Missing deal_id' };
    return { success: false, error: 'Missing deal_id' };
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const deal = DealsRepo.findById(dealId);
  const deal = DealsRepo.findById(dealId);
// EXPLAIN: if (!deal) {
  if (!deal) {
// EXPLAIN: return { success: false, error: 'Deal not found: ' + dealId };
    return { success: false, error: 'Deal not found: ' + dealId };
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Handle stage change specially
  // Handle stage change specially
// EXPLAIN: if (payload.stage && payload.stage !== deal.stage) {
  if (payload.stage && payload.stage !== deal.stage) {
// EXPLAIN: const stageResult = DealsRepo.changeStage(dealId, payload.stage);
    const stageResult = DealsRepo.changeStage(dealId, payload.stage);
// EXPLAIN: if (!stageResult.success) {
    if (!stageResult.success) {
// EXPLAIN: return { success: false, error: stageResult.message };
      return { success: false, error: stageResult.message };
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Update other fields
  // Update other fields
// EXPLAIN: const updates = {};
  const updates = {};
// EXPLAIN: const allowedFields = ['deal_value', 'currency', 'expected_close_date', 'assigned_to',
  const allowedFields = ['deal_value', 'currency', 'expected_close_date', 'assigned_to',
// EXPLAIN: 'property_type', 'property_address', 'listing_price',
                         'property_type', 'property_address', 'listing_price', 
// EXPLAIN: 'commission_rate', 'notes', 'docs_required', 'parcel_present',
                         'commission_rate', 'notes', 'docs_required', 'parcel_present',
// EXPLAIN: 'lead_source', 'intent', 'budget', 'region', 'timing',
                         'lead_source', 'intent', 'budget', 'region', 'timing',
// EXPLAIN: 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term',
                         'utm_source', 'utm_medium', 'utm_campaign', 'utm_term',
// EXPLAIN: 'utm_content', 'gclid', 'lost_reason', 'attribution_campaign',
                         'utm_content', 'gclid', 'lost_reason', 'attribution_campaign',
// EXPLAIN: 'doc_package_url'];
                         'doc_package_url'];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const field of allowedFields) {
  for (const field of allowedFields) {
// EXPLAIN: if (payload[field] !== undefined) {
    if (payload[field] !== undefined) {
// EXPLAIN: updates[field] = payload[field];
      updates[field] = payload[field];
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (Object.keys(updates).length > 0) {
  if (Object.keys(updates).length > 0) {
// EXPLAIN: DealsRepo.update(dealId, updates);
    DealsRepo.update(dealId, updates);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return { success: true };
  return { success: true };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Handle task create
 * Handle task create
// EXPLAIN: */
 */
// EXPLAIN: function handleTaskCreate_(item, payload) {
function handleTaskCreate_(item, payload) {
// EXPLAIN: const normalized = normalizeTask_(payload);
  const normalized = normalizeTask_(payload);
// EXPLAIN: const task = TasksRepo.create(normalized);
  const task = TasksRepo.create(normalized);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: EventsRepo.append({
  EventsRepo.append({
// EXPLAIN: entity_type: 'TASK',
    entity_type: 'TASK',
// EXPLAIN: entity_id: task.task_id,
    entity_id: task.task_id,
// EXPLAIN: event_type: EventsRepo.EVENT_TYPES.TASK_CREATED,
    event_type: EventsRepo.EVENT_TYPES.TASK_CREATED,
// EXPLAIN: payload: { title: task.title },
    payload: { title: task.title },
// EXPLAIN: source: item.source,
    source: item.source,
// EXPLAIN: idempotency_key: item.idempotency_key
    idempotency_key: item.idempotency_key
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return { success: true, task_id: task.task_id };
  return { success: true, task_id: task.task_id };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Handle task update
 * Handle task update
// EXPLAIN: */
 */
// EXPLAIN: function handleTaskUpdate_(item, payload) {
function handleTaskUpdate_(item, payload) {
// EXPLAIN: const taskId = payload.task_id;
  const taskId = payload.task_id;
// EXPLAIN: if (!taskId) {
  if (!taskId) {
// EXPLAIN: return { success: false, error: 'Missing task_id' };
    return { success: false, error: 'Missing task_id' };
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const task = TasksRepo.findById(taskId);
  const task = TasksRepo.findById(taskId);
// EXPLAIN: if (!task) {
  if (!task) {
// EXPLAIN: return { success: false, error: 'Task not found: ' + taskId };
    return { success: false, error: 'Task not found: ' + taskId };
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Handle completion
  // Handle completion
// EXPLAIN: if (payload.status === 'completed') {
  if (payload.status === 'completed') {
// EXPLAIN: TasksRepo.complete(taskId);
    TasksRepo.complete(taskId);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: EventsRepo.append({
    EventsRepo.append({
// EXPLAIN: entity_type: 'TASK',
      entity_type: 'TASK',
// EXPLAIN: entity_id: taskId,
      entity_id: taskId,
// EXPLAIN: event_type: EventsRepo.EVENT_TYPES.TASK_COMPLETED,
      event_type: EventsRepo.EVENT_TYPES.TASK_COMPLETED,
// EXPLAIN: payload: {},
      payload: {},
// EXPLAIN: source: item.source,
      source: item.source,
// EXPLAIN: idempotency_key: item.idempotency_key
      idempotency_key: item.idempotency_key
// EXPLAIN: });
    });
// EXPLAIN: } else {
  } else {
// EXPLAIN: // Update fields
    // Update fields
// EXPLAIN: const updates = {};
    const updates = {};
// EXPLAIN: const allowedFields = ['title', 'description', 'due_date', 'priority', 'status', 'assigned_to'];
    const allowedFields = ['title', 'description', 'due_date', 'priority', 'status', 'assigned_to'];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: for (const field of allowedFields) {
    for (const field of allowedFields) {
// EXPLAIN: if (payload[field] !== undefined) {
      if (payload[field] !== undefined) {
// EXPLAIN: updates[field] = payload[field];
        updates[field] = payload[field];
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: TasksRepo.update(taskId, updates);
    TasksRepo.update(taskId, updates);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return { success: true };
  return { success: true };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Handle event log (direct event append)
 * Handle event log (direct event append)
// EXPLAIN: */
 */
// EXPLAIN: function handleEventLog_(item, payload) {
function handleEventLog_(item, payload) {
// EXPLAIN: EventsRepo.append({
  EventsRepo.append({
// EXPLAIN: entity_type: payload.entity_type || '',
    entity_type: payload.entity_type || '',
// EXPLAIN: entity_id: payload.entity_id || '',
    entity_id: payload.entity_id || '',
// EXPLAIN: event_type: payload.event_type || 'CUSTOM',
    event_type: payload.event_type || 'CUSTOM',
// EXPLAIN: payload: payload.data || {},
    payload: payload.data || {},
// EXPLAIN: source: item.source,
    source: item.source,
// EXPLAIN: source_ref_id: item.source_ref_id,
    source_ref_id: item.source_ref_id,
// EXPLAIN: idempotency_key: item.idempotency_key
    idempotency_key: item.idempotency_key
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return { success: true };
  return { success: true };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Handle Gmail signal - link email to contact/deal and record lead signal
 * Handle Gmail signal - link email to contact/deal and record lead signal
// EXPLAIN: */
 */
// EXPLAIN: function handleGmailSignal_(item, payload) {
function handleGmailSignal_(item, payload) {
// EXPLAIN: const email = normalizeEmail_(payload.email || payload.from || '');
  const email = normalizeEmail_(payload.email || payload.from || '');
// EXPLAIN: if (!email) {
  if (!email) {
// EXPLAIN: return { success: false, error: 'Missing email in Gmail signal' };
    return { success: false, error: 'Missing email in Gmail signal' };
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const contact = ContactsRepo.findByEmail(email);
  const contact = ContactsRepo.findByEmail(email);
// EXPLAIN: if (!contact) {
  if (!contact) {
// EXPLAIN: EventsRepo.append({
    EventsRepo.append({
// EXPLAIN: entity_type: 'EMAIL',
      entity_type: 'EMAIL',
// EXPLAIN: entity_id: email,
      entity_id: email,
// EXPLAIN: event_type: EventsRepo.EVENT_TYPES.EMAIL_RECEIVED,
      event_type: EventsRepo.EVENT_TYPES.EMAIL_RECEIVED,
// EXPLAIN: payload: { subject: payload.subject || '', label: payload.label || '' },
      payload: { subject: payload.subject || '', label: payload.label || '' },
// EXPLAIN: source: item.source || 'gmail',
      source: item.source || 'gmail',
// EXPLAIN: idempotency_key: item.idempotency_key
      idempotency_key: item.idempotency_key
// EXPLAIN: });
    });
// EXPLAIN: return { success: true, message: 'Contact not found for email: ' + email };
    return { success: true, message: 'Contact not found for email: ' + email };
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const deals = DealsRepo.findByContactId(contact.contact_id);
  const deals = DealsRepo.findByContactId(contact.contact_id);
// EXPLAIN: const deal = deals.length > 0 ? deals[0] : null;
  const deal = deals.length > 0 ? deals[0] : null;
// EXPLAIN: if (!deal) {
  if (!deal) {
// EXPLAIN: EventsRepo.append({
    EventsRepo.append({
// EXPLAIN: entity_type: 'CONTACT',
      entity_type: 'CONTACT',
// EXPLAIN: entity_id: contact.contact_id,
      entity_id: contact.contact_id,
// EXPLAIN: event_type: EventsRepo.EVENT_TYPES.EMAIL_RECEIVED,
      event_type: EventsRepo.EVENT_TYPES.EMAIL_RECEIVED,
// EXPLAIN: payload: { subject: payload.subject || '', label: payload.label || '' },
      payload: { subject: payload.subject || '', label: payload.label || '' },
// EXPLAIN: source: item.source || 'gmail',
      source: item.source || 'gmail',
// EXPLAIN: idempotency_key: item.idempotency_key
      idempotency_key: item.idempotency_key
// EXPLAIN: });
    });
// EXPLAIN: return { success: true, message: 'Deal not found for contact: ' + contact.contact_id };
    return { success: true, message: 'Deal not found for contact: ' + contact.contact_id };
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: recordLeadSignal_(deal, contact, payload.signal_type || 'GMAIL_SIGNAL', 'gmail', payload.weight || 10, payload.subject || '');
  recordLeadSignal_(deal, contact, payload.signal_type || 'GMAIL_SIGNAL', 'gmail', payload.weight || 10, payload.subject || '');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: EventsRepo.append({
  EventsRepo.append({
// EXPLAIN: entity_type: 'CONTACT',
    entity_type: 'CONTACT',
// EXPLAIN: entity_id: contact.contact_id,
    entity_id: contact.contact_id,
// EXPLAIN: event_type: EventsRepo.EVENT_TYPES.EMAIL_RECEIVED,
    event_type: EventsRepo.EVENT_TYPES.EMAIL_RECEIVED,
// EXPLAIN: payload: { subject: payload.subject || '', label: payload.label || '' },
    payload: { subject: payload.subject || '', label: payload.label || '' },
// EXPLAIN: source: item.source || 'gmail',
    source: item.source || 'gmail',
// EXPLAIN: idempotency_key: item.idempotency_key
    idempotency_key: item.idempotency_key
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return { success: true };
  return { success: true };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Handle appointment create
 * Handle appointment create
// EXPLAIN: */
 */
// EXPLAIN: function handleAppointmentCreate_(item, payload) {
function handleAppointmentCreate_(item, payload) {
// EXPLAIN: const normalized = normalizeAppointment_(payload);
  const normalized = normalizeAppointment_(payload);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const appt = {
  const appt = {
// EXPLAIN: appointment_id: id_(),
    appointment_id: id_(),
// EXPLAIN: created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: ...normalized,
    ...normalized,
// EXPLAIN: status: 'scheduled',
    status: 'scheduled',
// EXPLAIN: google_event_id: '',
    google_event_id: '',
// EXPLAIN: reminder_sent: ''
    reminder_sent: ''
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: appendRow_(SHEETS.APPOINTMENTS, appt);
  appendRow_(SHEETS.APPOINTMENTS, appt);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: EventsRepo.append({
  EventsRepo.append({
// EXPLAIN: entity_type: 'APPOINTMENT',
    entity_type: 'APPOINTMENT',
// EXPLAIN: entity_id: appt.appointment_id,
    entity_id: appt.appointment_id,
// EXPLAIN: event_type: EventsRepo.EVENT_TYPES.APPOINTMENT_CREATED,
    event_type: EventsRepo.EVENT_TYPES.APPOINTMENT_CREATED,
// EXPLAIN: payload: { scheduled_at: appt.scheduled_at },
    payload: { scheduled_at: appt.scheduled_at },
// EXPLAIN: source: item.source,
    source: item.source,
// EXPLAIN: idempotency_key: item.idempotency_key
    idempotency_key: item.idempotency_key
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return { success: true, appointment_id: appt.appointment_id };
  return { success: true, appointment_id: appt.appointment_id };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Handle manual import (generic data import)
 * Handle manual import (generic data import)
// EXPLAIN: */
 */
// EXPLAIN: function handleManualImport_(item, payload) {
function handleManualImport_(item, payload) {
// EXPLAIN: // Log as event for audit trail
  // Log as event for audit trail
// EXPLAIN: EventsRepo.append({
  EventsRepo.append({
// EXPLAIN: entity_type: payload.entity_type || 'IMPORT',
    entity_type: payload.entity_type || 'IMPORT',
// EXPLAIN: entity_id: payload.entity_id || '',
    entity_id: payload.entity_id || '',
// EXPLAIN: event_type: 'MANUAL_IMPORT',
    event_type: 'MANUAL_IMPORT',
// EXPLAIN: payload: payload,
    payload: payload,
// EXPLAIN: source: item.source,
    source: item.source,
// EXPLAIN: idempotency_key: item.idempotency_key
    idempotency_key: item.idempotency_key
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return { success: true };
  return { success: true };
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
