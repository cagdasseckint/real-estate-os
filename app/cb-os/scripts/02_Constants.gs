// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 02_Constants.gs
 * CB-OS V1.0 - 02_Constants.gs
// EXPLAIN: * Sheet names, cursor keys, and canonical column definitions
 * Sheet names, cursor keys, and canonical column definitions
// EXPLAIN: *
 * 
// EXPLAIN: * V1.0 HARD-RULES REFERENCE:
 * V1.0 HARD-RULES REFERENCE:
// EXPLAIN: * #1: ORCH_15MIN dışında trigger tasarlama yok
 * #1: ORCH_15MIN dışında trigger tasarlama yok
// EXPLAIN: * #2: SoT tablolara operatör manuel write yok; write-path yalnız job'lar üzerinden
 * #2: SoT tablolara operatör manuel write yok; write-path yalnız job'lar üzerinden
// EXPLAIN: * #3: ops_log yalnız scope=audit_only; smoke için ops_log YOK
 * #3: ops_log yalnız scope=audit_only; smoke için ops_log YOK
// EXPLAIN: * #4: received_at formatı: yyyy-MM-dd'T'HH:mm:ssXXX ve tek offset
 * #4: received_at formatı: yyyy-MM-dd'T'HH:mm:ssXXX ve tek offset
// EXPLAIN: * #5: Audit contract string EXACT: "stopped_on_first_failure (gap-free cursor)"
 * #5: Audit contract string EXACT: "stopped_on_first_failure (gap-free cursor)"
// EXPLAIN: * #6: DLQ kanıt standardı: COL2 = ingest_id
 * #6: DLQ kanıt standardı: COL2 = ingest_id
// EXPLAIN: * #7: risk_flags standardı: risk_flags=<CSV|->
 * #7: risk_flags standardı: risk_flags=<CSV|->
// EXPLAIN: * #8: PASS+RISK politikası: header mismatch = PASS + risk_flags
 * #8: PASS+RISK politikası: header mismatch = PASS + risk_flags
// EXPLAIN: * #9: "Appendix A yalnız kanıt üretir; aksiyon kaydı Appendix A dışı governance artefaktı"
 * #9: "Appendix A yalnız kanıt üretir; aksiyon kaydı Appendix A dışı governance artefaktı"
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Sheet name constants
 * Sheet name constants
// EXPLAIN: */
 */
// EXPLAIN: const SHEETS = {
const SHEETS = {
// EXPLAIN: // SoT Tables (Business Truth)
  // SoT Tables (Business Truth)
// EXPLAIN: CONTACTS: 'CONTACTS',
  CONTACTS: 'CONTACTS',
// EXPLAIN: DEALS: 'DEALS',
  DEALS: 'DEALS',
// EXPLAIN: TASKS: 'TASKS',
  TASKS: 'TASKS',
// EXPLAIN: EVENTS: 'EVENTS',
  EVENTS: 'EVENTS',
// EXPLAIN: APPOINTMENTS: 'APPOINTMENTS',
  APPOINTMENTS: 'APPOINTMENTS',
// EXPLAIN: DOCS: 'DOCS',
  DOCS: 'DOCS',
// EXPLAIN: DEDUP_KEYS: 'DEDUP_KEYS',
  DEDUP_KEYS: 'DEDUP_KEYS',
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Operational Tables (Queue/Log)
  // Operational Tables (Queue/Log)
// EXPLAIN: INGEST_QUEUE: 'INGEST_QUEUE',
  INGEST_QUEUE: 'INGEST_QUEUE',
// EXPLAIN: DLQ: 'DLQ',
  DLQ: 'DLQ',
// EXPLAIN: JOB_RUN_LOG: 'JOB_RUN_LOG',
  JOB_RUN_LOG: 'JOB_RUN_LOG',
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Config/Reference Tables
  // Config/Reference Tables
// EXPLAIN: CONFIG: 'CONFIG',
  CONFIG: 'CONFIG',
// EXPLAIN: STAGE_AUTOMATIONS: 'STAGE_AUTOMATIONS',
  STAGE_AUTOMATIONS: 'STAGE_AUTOMATIONS',
// EXPLAIN: TASK_TEMPLATES: 'TASK_TEMPLATES',
  TASK_TEMPLATES: 'TASK_TEMPLATES',
// EXPLAIN: LEAD_SCORES: 'LEAD_SCORES',
  LEAD_SCORES: 'LEAD_SCORES',
// EXPLAIN: LEAD_SIGNALS: 'LEAD_SIGNALS',
  LEAD_SIGNALS: 'LEAD_SIGNALS',
// EXPLAIN: EMAIL_DRAFTS: 'EMAIL_DRAFTS',
  EMAIL_DRAFTS: 'EMAIL_DRAFTS',
// EXPLAIN: FOLLOWUP_SEQUENCES: 'FOLLOWUP_SEQUENCES',
  FOLLOWUP_SEQUENCES: 'FOLLOWUP_SEQUENCES',
// EXPLAIN: DOC_PACKAGES: 'DOC_PACKAGES',
  DOC_PACKAGES: 'DOC_PACKAGES',
// EXPLAIN: DOC_TEMPLATES: 'DOC_TEMPLATES',
  DOC_TEMPLATES: 'DOC_TEMPLATES',
// EXPLAIN: OPS_DASHBOARD: 'OPS_DASHBOARD',
  OPS_DASHBOARD: 'OPS_DASHBOARD',
// EXPLAIN: DRIVE_SHARE_AUDIT: 'DRIVE_SHARE_AUDIT',
  DRIVE_SHARE_AUDIT: 'DRIVE_SHARE_AUDIT',
// EXPLAIN: ACCESS_INVENTORY: 'ACCESS_INVENTORY',
  ACCESS_INVENTORY: 'ACCESS_INVENTORY',
// EXPLAIN: SECURITY_SOP: 'SECURITY_SOP',
  SECURITY_SOP: 'SECURITY_SOP',
// EXPLAIN: PROPERTIES: 'PROPERTIES',
  PROPERTIES: 'PROPERTIES',
// EXPLAIN: AGREEMENTS: 'AGREEMENTS',
  AGREEMENTS: 'AGREEMENTS',
// EXPLAIN: DOCUMENT_CHECKLISTS: 'DOCUMENT_CHECKLISTS',
  DOCUMENT_CHECKLISTS: 'DOCUMENT_CHECKLISTS',
// EXPLAIN: VIEWINGS: 'VIEWINGS',
  VIEWINGS: 'VIEWINGS',
// EXPLAIN: OFFERS: 'OFFERS',
  OFFERS: 'OFFERS',
// EXPLAIN: PRICE_CHANGES: 'PRICE_CHANGES',
  PRICE_CHANGES: 'PRICE_CHANGES',
// EXPLAIN: MARKETING_ASSETS: 'MARKETING_ASSETS',
  MARKETING_ASSETS: 'MARKETING_ASSETS',
// EXPLAIN: CONSENTS: 'CONSENTS',
  CONSENTS: 'CONSENTS',
// EXPLAIN: CONVERSION_QUEUE: 'CONVERSION_QUEUE',
  CONVERSION_QUEUE: 'CONVERSION_QUEUE',
// EXPLAIN: SMOKE_TEST_LOG: 'SMOKE_TEST_LOG',
  SMOKE_TEST_LOG: 'SMOKE_TEST_LOG',
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Dashboard Tables
  // Dashboard Tables
// EXPLAIN: DAILY_SNAPSHOT: 'DAILY_SNAPSHOT',
  DAILY_SNAPSHOT: 'DAILY_SNAPSHOT',
// EXPLAIN: WEEKLY_SUMMARY: 'WEEKLY_SUMMARY'
  WEEKLY_SUMMARY: 'WEEKLY_SUMMARY'
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Cursor key constants for JOB_RUN_LOG tracking
 * Cursor key constants for JOB_RUN_LOG tracking
// EXPLAIN: */
 */
// EXPLAIN: const CURSORS = {
const CURSORS = {
// EXPLAIN: INGEST_LAST_RECEIVED_AT: 'INGEST_LAST_RECEIVED_AT',
  INGEST_LAST_RECEIVED_AT: 'INGEST_LAST_RECEIVED_AT',
// EXPLAIN: GMAIL_LAST_SCANNED_AT: 'GMAIL_LAST_SCANNED_AT',
  GMAIL_LAST_SCANNED_AT: 'GMAIL_LAST_SCANNED_AT',
// EXPLAIN: CALENDAR_LAST_SYNCED_AT: 'CALENDAR_LAST_SYNCED_AT',
  CALENDAR_LAST_SYNCED_AT: 'CALENDAR_LAST_SYNCED_AT',
// EXPLAIN: DLQ_LAST_PROCESSED_AT: 'DLQ_LAST_PROCESSED_AT'
  DLQ_LAST_PROCESSED_AT: 'DLQ_LAST_PROCESSED_AT'
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Canonical column definitions for GREENFIELD mode
 * Canonical column definitions for GREENFIELD mode
// EXPLAIN: * Order is fixed and must not change
 * Order is fixed and must not change
// EXPLAIN: */
 */
// EXPLAIN: const CANONICAL_HEADERS = {
const CANONICAL_HEADERS = {
// EXPLAIN: INGEST_QUEUE: [
  INGEST_QUEUE: [
// EXPLAIN: 'status', 'ingest_id', 'received_at', 'ingest_type', 'payload_json',
    'status', 'ingest_id', 'received_at', 'ingest_type', 'payload_json',
// EXPLAIN: 'source', 'source_ref_id', 'idempotency_key', 'error', 'processed_at'
    'source', 'source_ref_id', 'idempotency_key', 'error', 'processed_at'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: DLQ: [
  DLQ: [
// EXPLAIN: 'created_at', 'ingest_id', 'source_ref_id', 'error_json', 'retry_count', 'last_retry_at'
    'created_at', 'ingest_id', 'source_ref_id', 'error_json', 'retry_count', 'last_retry_at'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: JOB_RUN_LOG: [
  JOB_RUN_LOG: [
// EXPLAIN: 'created_at', 'job_name', 'orch_run_id', 'cursor_before', 'cursor_after', 'notes', 'message'
    'created_at', 'job_name', 'orch_run_id', 'cursor_before', 'cursor_after', 'notes', 'message'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: CONTACTS: [
  CONTACTS: [
// EXPLAIN: 'contact_id', 'created_at', 'updated_at', 'first_name', 'last_name',
    'contact_id', 'created_at', 'updated_at', 'first_name', 'last_name',
// EXPLAIN: 'email', 'phone', 'whatsapp', 'source', 'source_ref_id', 'status',
    'email', 'phone', 'whatsapp', 'source', 'source_ref_id', 'status',
// EXPLAIN: 'tags', 'notes', 'kvkk_consent', 'preferred_contact_method', 'last_contact_at'
    'tags', 'notes', 'kvkk_consent', 'preferred_contact_method', 'last_contact_at'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: DEALS: [
  DEALS: [
// EXPLAIN: 'deal_id', 'created_at', 'updated_at', 'contact_id', 'deal_type', 'stage',
    'deal_id', 'created_at', 'updated_at', 'contact_id', 'deal_type', 'stage',
// EXPLAIN: 'deal_value', 'currency', 'expected_close_date', 'assigned_to', 'property_type',
    'deal_value', 'currency', 'expected_close_date', 'assigned_to', 'property_type',
// EXPLAIN: 'property_address', 'listing_price', 'commission_rate', 'notes',
    'property_address', 'listing_price', 'commission_rate', 'notes',
// EXPLAIN: 'docs_required', 'parcel_present', 'last_stage_change_at', 'lead_source',
    'docs_required', 'parcel_present', 'last_stage_change_at', 'lead_source',
// EXPLAIN: 'intent', 'budget', 'region', 'timing', 'utm_source', 'utm_medium',
    'intent', 'budget', 'region', 'timing', 'utm_source', 'utm_medium',
// EXPLAIN: 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'lost_reason',
    'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'lost_reason',
// EXPLAIN: 'attribution_campaign', 'doc_package_url'
    'attribution_campaign', 'doc_package_url'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: TASKS: [
  TASKS: [
// EXPLAIN: 'task_id', 'created_at', 'updated_at', 'entity_type', 'entity_id',
    'task_id', 'created_at', 'updated_at', 'entity_type', 'entity_id',
// EXPLAIN: 'title', 'description', 'due_date', 'priority', 'status',
    'title', 'description', 'due_date', 'priority', 'status',
// EXPLAIN: 'assigned_to', 'completed_at', 'google_task_id'
    'assigned_to', 'completed_at', 'google_task_id'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: EVENTS: [
  EVENTS: [
// EXPLAIN: 'event_id', 'occurred_at', 'entity_type', 'entity_id', 'event_type',
    'event_id', 'occurred_at', 'entity_type', 'entity_id', 'event_type',
// EXPLAIN: 'payload_json', 'source', 'source_ref_id', 'idempotency_key'
    'payload_json', 'source', 'source_ref_id', 'idempotency_key'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: APPOINTMENTS: [
  APPOINTMENTS: [
// EXPLAIN: 'appointment_id', 'created_at', 'contact_id', 'deal_id', 'scheduled_at',
    'appointment_id', 'created_at', 'contact_id', 'deal_id', 'scheduled_at',
// EXPLAIN: 'duration_minutes', 'location', 'meeting_type', 'status',
    'duration_minutes', 'location', 'meeting_type', 'status',
// EXPLAIN: 'google_event_id', 'notes', 'reminder_sent'
    'google_event_id', 'notes', 'reminder_sent'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: DOCS: [
  DOCS: [
// EXPLAIN: 'doc_id', 'created_at', 'entity_type', 'entity_id', 'doc_type',
    'doc_id', 'created_at', 'entity_type', 'entity_id', 'doc_type',
// EXPLAIN: 'doc_url', 'status', 'signed_at', 'notes'
    'doc_url', 'status', 'signed_at', 'notes'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: DEDUP_KEYS: [
  DEDUP_KEYS: [
// EXPLAIN: 'key', 'created_at'
    'key', 'created_at'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: CONFIG: [
  CONFIG: [
// EXPLAIN: 'key', 'value', 'description'
    'key', 'value', 'description'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: STAGE_AUTOMATIONS: [
  STAGE_AUTOMATIONS: [
// EXPLAIN: 'deal_type', 'from_stage', 'to_stage', 'trigger_condition', 'action_type',
    'deal_type', 'from_stage', 'to_stage', 'trigger_condition', 'action_type',
// EXPLAIN: 'action_config', 'sla_days', 'task_template_id'
    'action_config', 'sla_days', 'task_template_id'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: TASK_TEMPLATES: [
  TASK_TEMPLATES: [
// EXPLAIN: 'template_id', 'name', 'entity_type', 'title', 'description', 'priority',
    'template_id', 'name', 'entity_type', 'title', 'description', 'priority',
// EXPLAIN: 'due_in_days', 'due_in_hours', 'sequence_step', 'channel', 'draft_template_id'
    'due_in_days', 'due_in_hours', 'sequence_step', 'channel', 'draft_template_id'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: LEAD_SCORES: [
  LEAD_SCORES: [
// EXPLAIN: 'lead_id', 'contact_id', 'deal_id', 'score', 'score_breakdown', 'updated_at'
    'lead_id', 'contact_id', 'deal_id', 'score', 'score_breakdown', 'updated_at'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: LEAD_SIGNALS: [
  LEAD_SIGNALS: [
// EXPLAIN: 'signal_id', 'lead_id', 'contact_id', 'deal_id', 'signal_type',
    'signal_id', 'lead_id', 'contact_id', 'deal_id', 'signal_type',
// EXPLAIN: 'signal_value', 'weight', 'source', 'occurred_at'
    'signal_value', 'weight', 'source', 'occurred_at'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: EMAIL_DRAFTS: [
  EMAIL_DRAFTS: [
// EXPLAIN: 'draft_id', 'created_at', 'updated_at', 'contact_id', 'deal_id', 'to',
    'draft_id', 'created_at', 'updated_at', 'contact_id', 'deal_id', 'to',
// EXPLAIN: 'subject', 'body', 'status', 'gmail_draft_id', 'task_id', 'scheduled_for'
    'subject', 'body', 'status', 'gmail_draft_id', 'task_id', 'scheduled_for'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: FOLLOWUP_SEQUENCES: [
  FOLLOWUP_SEQUENCES: [
// EXPLAIN: 'sequence_id', 'name', 'deal_type', 'stage', 'steps_json', 'enabled'
    'sequence_id', 'name', 'deal_type', 'stage', 'steps_json', 'enabled'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: DOC_PACKAGES: [
  DOC_PACKAGES: [
// EXPLAIN: 'deal_type', 'template_folder_id', 'template_doc_id', 'package_name'
    'deal_type', 'template_folder_id', 'template_doc_id', 'package_name'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: DOC_TEMPLATES: [
  DOC_TEMPLATES: [
// EXPLAIN: 'template_id', 'template_name', 'doc_id', 'output_folder_id',
    'template_id', 'template_name', 'doc_id', 'output_folder_id',
// EXPLAIN: 'placeholders_json'
    'placeholders_json'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: OPS_DASHBOARD: [
  OPS_DASHBOARD: [
// EXPLAIN: 'run_at', 'ingest_pending', 'dlq_count', 'error_rate', 'cursor_drift_minutes'
    'run_at', 'ingest_pending', 'dlq_count', 'error_rate', 'cursor_drift_minutes'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: DRIVE_SHARE_AUDIT: [
  DRIVE_SHARE_AUDIT: [
// EXPLAIN: 'run_at', 'folder_id', 'owner_email', 'sharing_state', 'issue'
    'run_at', 'folder_id', 'owner_email', 'sharing_state', 'issue'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: ACCESS_INVENTORY: [
  ACCESS_INVENTORY: [
// EXPLAIN: 'system', 'account_owner', 'access_level', 'last_reviewed_at', 'notes'
    'system', 'account_owner', 'access_level', 'last_reviewed_at', 'notes'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: SECURITY_SOP: [
  SECURITY_SOP: [
// EXPLAIN: 'item_id', 'category', 'description', 'status', 'last_reviewed_at'
    'item_id', 'category', 'description', 'status', 'last_reviewed_at'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: PROPERTIES: [
  PROPERTIES: [
// EXPLAIN: 'property_id', 'created_at', 'updated_at', 'deal_id', 'property_type',
    'property_id', 'created_at', 'updated_at', 'deal_id', 'property_type',
// EXPLAIN: 'status', 'title', 'address', 'city', 'district', 'size_m2',
    'status', 'title', 'address', 'city', 'district', 'size_m2',
// EXPLAIN: 'price', 'currency', 'owner_contact_id', 'notes'
    'price', 'currency', 'owner_contact_id', 'notes'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: AGREEMENTS: [
  AGREEMENTS: [
// EXPLAIN: 'agreement_id', 'property_id', 'contact_id', 'agreement_type',
    'agreement_id', 'property_id', 'contact_id', 'agreement_type',
// EXPLAIN: 'start_date', 'end_date', 'commission_rate', 'status', 'notes'
    'start_date', 'end_date', 'commission_rate', 'status', 'notes'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: DOCUMENT_CHECKLISTS: [
  DOCUMENT_CHECKLISTS: [
// EXPLAIN: 'checklist_id', 'property_type', 'required_docs_json', 'lock_publish', 'updated_at'
    'checklist_id', 'property_type', 'required_docs_json', 'lock_publish', 'updated_at'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: VIEWINGS: [
  VIEWINGS: [
// EXPLAIN: 'viewing_id', 'property_id', 'contact_id', 'scheduled_at',
    'viewing_id', 'property_id', 'contact_id', 'scheduled_at',
// EXPLAIN: 'status', 'notes', 'google_event_id'
    'status', 'notes', 'google_event_id'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: OFFERS: [
  OFFERS: [
// EXPLAIN: 'offer_id', 'property_id', 'contact_id', 'offer_price',
    'offer_id', 'property_id', 'contact_id', 'offer_price',
// EXPLAIN: 'currency', 'status', 'created_at', 'notes'
    'currency', 'status', 'created_at', 'notes'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: PRICE_CHANGES: [
  PRICE_CHANGES: [
// EXPLAIN: 'change_id', 'property_id', 'old_price', 'new_price', 'changed_at'
    'change_id', 'property_id', 'old_price', 'new_price', 'changed_at'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: MARKETING_ASSETS: [
  MARKETING_ASSETS: [
// EXPLAIN: 'asset_id', 'property_id', 'asset_type', 'drive_url', 'notes'
    'asset_id', 'property_id', 'asset_type', 'drive_url', 'notes'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: CONSENTS: [
  CONSENTS: [
// EXPLAIN: 'consent_id', 'contact_id', 'consent_type', 'status', 'ts', 'notes'
    'consent_id', 'contact_id', 'consent_type', 'status', 'ts', 'notes'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: CONVERSION_QUEUE: [
  CONVERSION_QUEUE: [
// EXPLAIN: 'conversion_id', 'gclid', 'event_type', 'event_value',
    'conversion_id', 'gclid', 'event_type', 'event_value',
// EXPLAIN: 'status', 'error', 'created_at', 'processed_at'
    'status', 'error', 'created_at', 'processed_at'
// EXPLAIN: ],
  ],
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: SMOKE_TEST_LOG: [
  SMOKE_TEST_LOG: [
// EXPLAIN: 'run_at', 'test_name', 'result', 'notes'
    'run_at', 'test_name', 'result', 'notes'
// EXPLAIN: ]
  ]
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Ingest types supported by the system
 * Ingest types supported by the system
// EXPLAIN: */
 */
// EXPLAIN: const INGEST_TYPES = {
const INGEST_TYPES = {
// EXPLAIN: NEW_LEAD: 'new_lead',
  NEW_LEAD: 'new_lead',
// EXPLAIN: FORM_LEAD: 'form_lead',
  FORM_LEAD: 'form_lead',
// EXPLAIN: GMAIL_SIGNAL: 'gmail_signal',
  GMAIL_SIGNAL: 'gmail_signal',
// EXPLAIN: EMAIL_DRAFT_REQUEST: 'email_draft_request',
  EMAIL_DRAFT_REQUEST: 'email_draft_request',
// EXPLAIN: DOC_PACKAGE_CREATE: 'doc_package_create',
  DOC_PACKAGE_CREATE: 'doc_package_create',
// EXPLAIN: DOC_GENERATE_REQUEST: 'doc_generate_request',
  DOC_GENERATE_REQUEST: 'doc_generate_request',
// EXPLAIN: STAGE_TRANSITION: 'stage_transition',
  STAGE_TRANSITION: 'stage_transition',
// EXPLAIN: CONTACT_UPDATE: 'contact_update',
  CONTACT_UPDATE: 'contact_update',
// EXPLAIN: DEAL_UPDATE: 'deal_update',
  DEAL_UPDATE: 'deal_update',
// EXPLAIN: TASK_CREATE: 'task_create',
  TASK_CREATE: 'task_create',
// EXPLAIN: TASK_UPDATE: 'task_update',
  TASK_UPDATE: 'task_update',
// EXPLAIN: EVENT_LOG: 'event_log',
  EVENT_LOG: 'event_log',
// EXPLAIN: APPOINTMENT_CREATE: 'appointment_create',
  APPOINTMENT_CREATE: 'appointment_create',
// EXPLAIN: DOC_UPLOAD: 'doc_upload',
  DOC_UPLOAD: 'doc_upload',
// EXPLAIN: MANUAL_IMPORT: 'manual_import'
  MANUAL_IMPORT: 'manual_import'
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Deal types with their stage definitions
 * Deal types with their stage definitions
// EXPLAIN: */
 */
// EXPLAIN: const DEAL_TYPES = {
const DEAL_TYPES = {
// EXPLAIN: SELLER: {
  SELLER: {
// EXPLAIN: stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'APPOINTMENT_SET', 'LISTING_DISCUSSION',
    stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'APPOINTMENT_SET', 'LISTING_DISCUSSION',
// EXPLAIN: 'LISTING_SIGNED', 'MARKETING', 'SHOWINGS', 'OFFER', 'CONTRACT', 'CLOSED_WON', 'CLOSED_LOST']
             'LISTING_SIGNED', 'MARKETING', 'SHOWINGS', 'OFFER', 'CONTRACT', 'CLOSED_WON', 'CLOSED_LOST']
// EXPLAIN: },
  },
// EXPLAIN: BUYER: {
  BUYER: {
// EXPLAIN: stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'SHORTLIST', 'APPOINTMENT_SET',
    stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'SHORTLIST', 'APPOINTMENT_SET',
// EXPLAIN: 'OFFER', 'CONTRACT', 'CLOSED_WON', 'CLOSED_LOST']
             'OFFER', 'CONTRACT', 'CLOSED_WON', 'CLOSED_LOST']
// EXPLAIN: },
  },
// EXPLAIN: RENT: {
  RENT: {
// EXPLAIN: stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'SHOWING', 'APPLICATION',
    stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'SHOWING', 'APPLICATION',
// EXPLAIN: 'CONTRACT', 'HANDOVER', 'CLOSED_WON', 'CLOSED_LOST']
             'CONTRACT', 'HANDOVER', 'CLOSED_WON', 'CLOSED_LOST']
// EXPLAIN: },
  },
// EXPLAIN: LAND: {
  LAND: {
// EXPLAIN: stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'DOCS_REVIEW', 'SITE_VISIT',
    stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'DOCS_REVIEW', 'SITE_VISIT',
// EXPLAIN: 'OFFER', 'CONTRACT', 'CLOSED_WON', 'CLOSED_LOST']
             'OFFER', 'CONTRACT', 'CLOSED_WON', 'CLOSED_LOST']
// EXPLAIN: }
  }
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Status values for INGEST_QUEUE
 * Status values for INGEST_QUEUE
// EXPLAIN: */
 */
// EXPLAIN: const INGEST_STATUS = {
const INGEST_STATUS = {
// EXPLAIN: NEW: 'new',
  NEW: 'new',
// EXPLAIN: PROCESSING: 'processing',
  PROCESSING: 'processing',
// EXPLAIN: COMPLETED: 'completed',
  COMPLETED: 'completed',
// EXPLAIN: FAILED: 'failed',
  FAILED: 'failed',
// EXPLAIN: SKIPPED: 'skipped'
  SKIPPED: 'skipped'
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Audit contract string - EXACT match required
 * Audit contract string - EXACT match required
// EXPLAIN: */
 */
// EXPLAIN: const AUDIT_CONTRACT_STRING = 'stopped_on_first_failure (gap-free cursor)';
const AUDIT_CONTRACT_STRING = 'stopped_on_first_failure (gap-free cursor)';
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Allowed ops_log scopes for V1.0
 * Allowed ops_log scopes for V1.0
// EXPLAIN: */
 */
// EXPLAIN: const ALLOWED_SCOPES = [
const ALLOWED_SCOPES = [
// EXPLAIN: 'manual_fix_json',
  'manual_fix_json',
// EXPLAIN: 'invalid_ingest_type',
  'invalid_ingest_type',
// EXPLAIN: 'manual_import',
  'manual_import',
// EXPLAIN: 'audit_only',
  'audit_only',
// EXPLAIN: 'hotfix_code',
  'hotfix_code',
// EXPLAIN: 'hotfix_doc'
  'hotfix_doc'
// EXPLAIN: ];
];
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Allowed risk_flags for V1.0
 * Allowed risk_flags for V1.0
// EXPLAIN: */
 */
// EXPLAIN: const ALLOWED_RISK_FLAGS = [
const ALLOWED_RISK_FLAGS = [
// EXPLAIN: 'DLQ_INGEST_ID_COL2_ASSUMED',
  'DLQ_INGEST_ID_COL2_ASSUMED',
// EXPLAIN: 'DLQ_HEADER_MISMATCH',
  'DLQ_HEADER_MISMATCH',
// EXPLAIN: 'JOBRUN_NOTES_FALLBACK_LASTCOL',
  'JOBRUN_NOTES_FALLBACK_LASTCOL',
// EXPLAIN: 'JOBRUN_MESSAGE_USED',
  'JOBRUN_MESSAGE_USED',
// EXPLAIN: 'CHECKED_BY_NO_HANDLE',
  'CHECKED_BY_NO_HANDLE',
// EXPLAIN: 'DEALS_LATEST_ROW_BY_ROWINDEX',
  'DEALS_LATEST_ROW_BY_ROWINDEX',
// EXPLAIN: 'CONTACTS_HEADER_MISMATCH',
  'CONTACTS_HEADER_MISMATCH',
// EXPLAIN: 'DEALS_HEADER_MISMATCH'
  'DEALS_HEADER_MISMATCH'
// EXPLAIN: ];
];
// Çağdaş Seçkin Tüfekci - Real Estate Agent
