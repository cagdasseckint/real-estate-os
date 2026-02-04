/**
 * CB-OS V1.0 - 13_IngestProcessJob.gs
 * Main ingest processing job - cursor-based, gap-free
 * Processes INGEST_QUEUE items and routes to appropriate handlers
 */

/**
 * Process ingest queue items
 * Gap-free: stops on first failure, does not advance cursor
 * @param {Object} ctx - Job context with orch_run_id
 * @returns {Object} Job result summary
 */
function ingest_process_job(ctx) {
  ctx = ctx || createJobContext_();
  const jobName = 'ingest_process_job';
  
  // Get current cursor
  const cursorBefore = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);
  let cursorAfter = cursorBefore;
  
  // Get pending items
  const batchSize = ctx.batch_size || cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE);
  const pending = QueueRepo.getPending(cursorBefore, batchSize);
  
  Logger.log('INGEST_PROCESS | Starting with cursor=' + cursorBefore + ', pending=' + pending.length);
  
  const result = {
    processed: 0,
    skipped: 0,
    failed: 0,
    stopped_on_failure: false
  };
  
  for (const item of pending) {
    try {
      // Parse payload
      const payload = parseJsonSafe_(item.payload_json);
      if (!payload) {
        // JSON parse failure -> DLQ
        QueueRepo.markFailed(item._rowIndex, item, 'JSON parse error');
        result.failed++;
        result.stopped_on_failure = true;
        
        // Gap-free: log and break
        logJobRun_(ctx, jobName, cursorBefore, cursorAfter, 
                   AUDIT_CONTRACT_STRING, 
                   'Failed on ingest_id=' + item.ingest_id + ': JSON parse error');
        
        // Evidence logging
        logEvidence_('INGEST_FAIL', 'ingest_id=' + item.ingest_id + ' | error=JSON parse error');
        break;
      }
      
      // Check idempotency
      if (item.idempotency_key) {
        const dedupResult = DedupRepo.insertIfNotExists(item.idempotency_key);
        if (!dedupResult.inserted) {
          // Duplicate - skip
          QueueRepo.markSkipped(item._rowIndex);
          result.skipped++;
          cursorAfter = item.received_at;
          
          Logger.log('INGEST_PROCESS | Skipped duplicate: ' + item.idempotency_key);
          continue;
        }
      }
      
      // Route by ingest_type
      const processResult = routeIngestItem_(item, payload);
      
      if (processResult.success) {
        QueueRepo.markCompleted(item._rowIndex);
        result.processed++;
        cursorAfter = item.received_at;
        
        Logger.log('INGEST_PROCESS | Completed: ' + item.ingest_id);
        
        // Evidence logging
        logEvidence_('INGEST_SUCCESS', 'ingest_id=' + item.ingest_id + ' | type=' + item.ingest_type);
      } else {
        // Processing failure -> DLQ
        QueueRepo.markFailed(item._rowIndex, item, processResult.error);
        result.failed++;
        result.stopped_on_failure = true;
        
        // Gap-free: log and break
        logJobRun_(ctx, jobName, cursorBefore, cursorAfter, 
                   AUDIT_CONTRACT_STRING, 
                   'Failed on ingest_id=' + item.ingest_id + ': ' + processResult.error);
        
        logEvidence_('INGEST_FAIL', 'ingest_id=' + item.ingest_id + ' | error=' + processResult.error);
        break;
      }
      
    } catch (e) {
      // Unexpected error -> DLQ
      QueueRepo.markFailed(item._rowIndex, item, 'Unexpected error: ' + e.message);
      result.failed++;
      result.stopped_on_failure = true;
      
      logJobRun_(ctx, jobName, cursorBefore, cursorAfter, 
                 AUDIT_CONTRACT_STRING, 
                 'Exception on ingest_id=' + item.ingest_id + ': ' + e.message);
      
      logEvidence_('INGEST_EXCEPTION', 'ingest_id=' + item.ingest_id + ' | error=' + e.message);
      break;
    }
  }
  
  // Update cursor only if we processed something without failure
  if (cursorAfter !== cursorBefore) {
    setCursor_(CURSORS.INGEST_LAST_RECEIVED_AT, cursorAfter);
  }
  
  // Log job run (success case)
  if (!result.stopped_on_failure) {
    logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '', 
               'Processed=' + result.processed + ', Skipped=' + result.skipped);
  }
  
  // Dump evidence
  dumpSheetEvidence_(SHEETS.INGEST_QUEUE, 2, 5);
  
  Logger.log('INGEST_PROCESS | Complete: ' + JSON.stringify(result));
  return result;
}

/**
 * Route ingest item to appropriate handler based on ingest_type
 * @param {Object} item - Queue item
 * @param {Object} payload - Parsed payload
 * @returns {Object} Result with success flag and optional error
 */
function routeIngestItem_(item, payload) {
  const ingestType = item.ingest_type;
  
  try {
    switch (ingestType) {
      case INGEST_TYPES.NEW_LEAD:
        return handleNewLead_(item, payload);
        
      case INGEST_TYPES.FORM_LEAD:
        return handleNewLead_(item, payload);
        
      case INGEST_TYPES.GMAIL_SIGNAL:
        return handleGmailSignal_(item, payload);
        
      case INGEST_TYPES.CONTACT_UPDATE:
        return handleContactUpdate_(item, payload);
        
      case INGEST_TYPES.DEAL_UPDATE:
        return handleDealUpdate_(item, payload);
        
      case INGEST_TYPES.TASK_CREATE:
        return handleTaskCreate_(item, payload);
        
      case INGEST_TYPES.TASK_UPDATE:
        return handleTaskUpdate_(item, payload);
        
      case INGEST_TYPES.EVENT_LOG:
        return handleEventLog_(item, payload);
        
      case INGEST_TYPES.APPOINTMENT_CREATE:
        return handleAppointmentCreate_(item, payload);
        
      case INGEST_TYPES.MANUAL_IMPORT:
        return handleManualImport_(item, payload);
        
      default:
        Logger.log('INGEST | Unknown type: ' + ingestType);
        return { success: false, error: 'Unknown ingest_type: ' + ingestType };
    }
  } catch (e) {
    return { success: false, error: 'Handler error: ' + e.message };
  }
}

/**
 * Handle new lead - create contact and deal
 * @param {Object} item - Queue item
 * @param {Object} payload - Parsed payload
 * @returns {Object} Result
 */
function handleNewLead_(item, payload) {
  // Normalize based on deal type
  let normalized;
  const dealType = (payload.deal_type || '').toUpperCase();
  
  if (dealType === 'LAND') {
    normalized = normalizeLandPayload_(payload);
  } else {
    normalized = normalizeNewLead_(payload);
  }
  
  // Check for normalization errors
  if (normalized.errors && normalized.errors.length > 0) {
    return { success: false, error: 'Normalization error: ' + normalized.errors.join(', ') };
  }
  
  // Find or create contact
  normalized.contact.source = item.source || normalized.contact.source;
  normalized.contact.source_ref_id = item.source_ref_id || normalized.contact.source_ref_id;
  
  const contact = ContactsRepo.findOrCreate(normalized.contact);
  
  // Create deal linked to contact
  normalized.deal.contact_id = contact.contact_id;
  const deal = DealsRepo.create(normalized.deal);
  
  // Log events
  EventsRepo.append({
    entity_type: 'CONTACT',
    entity_id: contact.contact_id,
    event_type: EventsRepo.EVENT_TYPES.CONTACT_CREATED,
    payload: { source: item.source },
    source: item.source,
    source_ref_id: item.source_ref_id,
    idempotency_key: item.idempotency_key + '_contact'
  });
  
  EventsRepo.append({
    entity_type: 'DEAL',
    entity_id: deal.deal_id,
    event_type: EventsRepo.EVENT_TYPES.DEAL_CREATED,
    payload: { deal_type: deal.deal_type, stage: deal.stage },
    source: item.source,
    source_ref_id: item.source_ref_id,
    idempotency_key: item.idempotency_key + '_deal'
  });
  
  // Create first touch task
  TasksRepo.createFromTemplate('first_touch', {
    entity_type: 'DEAL',
    entity_id: deal.deal_id
  });
  
  if (cfg_('FOLLOWUP_SEQUENCE_ENABLED', DEFAULTS.FOLLOWUP_SEQUENCE_ENABLED)) {
    scheduleFollowupSequence_(deal, contact);
  }
  
  recordLeadSignal_(deal, contact, 'FORM_LEAD', item.source, 30, 'new_lead');
  
  Logger.log('NEW_LEAD | Created contact=' + contact.contact_id + ', deal=' + deal.deal_id);
  return { success: true, contact_id: contact.contact_id, deal_id: deal.deal_id };
}

/**
 * Handle contact update
 */
function handleContactUpdate_(item, payload) {
  const contactId = payload.contact_id;
  if (!contactId) {
    return { success: false, error: 'Missing contact_id' };
  }
  
  const contact = ContactsRepo.findById(contactId);
  if (!contact) {
    return { success: false, error: 'Contact not found: ' + contactId };
  }
  
  // Update allowed fields
  const updates = {};
  const allowedFields = ['first_name', 'last_name', 'email', 'phone', 'whatsapp', 
                         'status', 'tags', 'notes', 'preferred_contact_method'];
  
  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      updates[field] = payload[field];
    }
  }
  
  ContactsRepo.update(contactId, updates);
  
  EventsRepo.append({
    entity_type: 'CONTACT',
    entity_id: contactId,
    event_type: EventsRepo.EVENT_TYPES.CONTACT_UPDATED,
    payload: updates,
    source: item.source,
    idempotency_key: item.idempotency_key
  });
  
  return { success: true };
}

/**
 * Handle deal update
 */
function handleDealUpdate_(item, payload) {
  const dealId = payload.deal_id;
  if (!dealId) {
    return { success: false, error: 'Missing deal_id' };
  }
  
  const deal = DealsRepo.findById(dealId);
  if (!deal) {
    return { success: false, error: 'Deal not found: ' + dealId };
  }
  
  // Handle stage change specially
  if (payload.stage && payload.stage !== deal.stage) {
    const stageResult = DealsRepo.changeStage(dealId, payload.stage);
    if (!stageResult.success) {
      return { success: false, error: stageResult.message };
    }
  }
  
  // Update other fields
  const updates = {};
  const allowedFields = ['deal_value', 'currency', 'expected_close_date', 'assigned_to',
                         'property_type', 'property_address', 'listing_price', 
                         'commission_rate', 'notes', 'docs_required', 'parcel_present',
                         'lead_source', 'intent', 'budget', 'region', 'timing',
                         'utm_source', 'utm_medium', 'utm_campaign', 'utm_term',
                         'utm_content', 'gclid', 'lost_reason', 'attribution_campaign',
                         'doc_package_url'];
  
  for (const field of allowedFields) {
    if (payload[field] !== undefined) {
      updates[field] = payload[field];
    }
  }
  
  if (Object.keys(updates).length > 0) {
    DealsRepo.update(dealId, updates);
  }
  
  return { success: true };
}

/**
 * Handle task create
 */
function handleTaskCreate_(item, payload) {
  const normalized = normalizeTask_(payload);
  const task = TasksRepo.create(normalized);
  
  EventsRepo.append({
    entity_type: 'TASK',
    entity_id: task.task_id,
    event_type: EventsRepo.EVENT_TYPES.TASK_CREATED,
    payload: { title: task.title },
    source: item.source,
    idempotency_key: item.idempotency_key
  });
  
  return { success: true, task_id: task.task_id };
}

/**
 * Handle task update
 */
function handleTaskUpdate_(item, payload) {
  const taskId = payload.task_id;
  if (!taskId) {
    return { success: false, error: 'Missing task_id' };
  }
  
  const task = TasksRepo.findById(taskId);
  if (!task) {
    return { success: false, error: 'Task not found: ' + taskId };
  }
  
  // Handle completion
  if (payload.status === 'completed') {
    TasksRepo.complete(taskId);
    
    EventsRepo.append({
      entity_type: 'TASK',
      entity_id: taskId,
      event_type: EventsRepo.EVENT_TYPES.TASK_COMPLETED,
      payload: {},
      source: item.source,
      idempotency_key: item.idempotency_key
    });
  } else {
    // Update fields
    const updates = {};
    const allowedFields = ['title', 'description', 'due_date', 'priority', 'status', 'assigned_to'];
    
    for (const field of allowedFields) {
      if (payload[field] !== undefined) {
        updates[field] = payload[field];
      }
    }
    
    TasksRepo.update(taskId, updates);
  }
  
  return { success: true };
}

/**
 * Handle event log (direct event append)
 */
function handleEventLog_(item, payload) {
  EventsRepo.append({
    entity_type: payload.entity_type || '',
    entity_id: payload.entity_id || '',
    event_type: payload.event_type || 'CUSTOM',
    payload: payload.data || {},
    source: item.source,
    source_ref_id: item.source_ref_id,
    idempotency_key: item.idempotency_key
  });
  
  return { success: true };
}

/**
 * Handle Gmail signal - link email to contact/deal and record lead signal
 */
function handleGmailSignal_(item, payload) {
  const email = normalizeEmail_(payload.email || payload.from || '');
  if (!email) {
    return { success: false, error: 'Missing email in Gmail signal' };
  }
  
  const contact = ContactsRepo.findByEmail(email);
  if (!contact) {
    EventsRepo.append({
      entity_type: 'EMAIL',
      entity_id: email,
      event_type: EventsRepo.EVENT_TYPES.EMAIL_RECEIVED,
      payload: { subject: payload.subject || '', label: payload.label || '' },
      source: item.source || 'gmail',
      idempotency_key: item.idempotency_key
    });
    return { success: true, message: 'Contact not found for email: ' + email };
  }
  
  const deals = DealsRepo.findByContactId(contact.contact_id);
  const deal = deals.length > 0 ? deals[0] : null;
  if (!deal) {
    EventsRepo.append({
      entity_type: 'CONTACT',
      entity_id: contact.contact_id,
      event_type: EventsRepo.EVENT_TYPES.EMAIL_RECEIVED,
      payload: { subject: payload.subject || '', label: payload.label || '' },
      source: item.source || 'gmail',
      idempotency_key: item.idempotency_key
    });
    return { success: true, message: 'Deal not found for contact: ' + contact.contact_id };
  }
  
  recordLeadSignal_(deal, contact, payload.signal_type || 'GMAIL_SIGNAL', 'gmail', payload.weight || 10, payload.subject || '');
  
  EventsRepo.append({
    entity_type: 'CONTACT',
    entity_id: contact.contact_id,
    event_type: EventsRepo.EVENT_TYPES.EMAIL_RECEIVED,
    payload: { subject: payload.subject || '', label: payload.label || '' },
    source: item.source || 'gmail',
    idempotency_key: item.idempotency_key
  });
  
  return { success: true };
}

/**
 * Handle appointment create
 */
function handleAppointmentCreate_(item, payload) {
  const normalized = normalizeAppointment_(payload);
  
  const appt = {
    appointment_id: id_(),
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    ...normalized,
    status: 'scheduled',
    google_event_id: '',
    reminder_sent: ''
  };
  
  appendRow_(SHEETS.APPOINTMENTS, appt);
  
  EventsRepo.append({
    entity_type: 'APPOINTMENT',
    entity_id: appt.appointment_id,
    event_type: EventsRepo.EVENT_TYPES.APPOINTMENT_CREATED,
    payload: { scheduled_at: appt.scheduled_at },
    source: item.source,
    idempotency_key: item.idempotency_key
  });
  
  return { success: true, appointment_id: appt.appointment_id };
}

/**
 * Handle manual import (generic data import)
 */
function handleManualImport_(item, payload) {
  // Log as event for audit trail
  EventsRepo.append({
    entity_type: payload.entity_type || 'IMPORT',
    entity_id: payload.entity_id || '',
    event_type: 'MANUAL_IMPORT',
    payload: payload,
    source: item.source,
    idempotency_key: item.idempotency_key
  });
  
  return { success: true };
}
