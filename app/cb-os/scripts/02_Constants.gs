/**
 * CB-OS V1.0 - 02_Constants.gs
 * Sheet names, cursor keys, and canonical column definitions
 * 
 * V1.0 HARD-RULES REFERENCE:
 * #1: ORCH_15MIN dışında trigger tasarlama yok
 * #2: SoT tablolara operatör manuel write yok; write-path yalnız job'lar üzerinden
 * #3: ops_log yalnız scope=audit_only; smoke için ops_log YOK
 * #4: received_at formatı: yyyy-MM-dd'T'HH:mm:ssXXX ve tek offset
 * #5: Audit contract string EXACT: "stopped_on_first_failure (gap-free cursor)"
 * #6: DLQ kanıt standardı: COL2 = ingest_id
 * #7: risk_flags standardı: risk_flags=<CSV|->
 * #8: PASS+RISK politikası: header mismatch = PASS + risk_flags
 * #9: "Appendix A yalnız kanıt üretir; aksiyon kaydı Appendix A dışı governance artefaktı"
 */

/**
 * Sheet name constants
 */
const SHEETS = {
  // SoT Tables (Business Truth)
  CONTACTS: 'CONTACTS',
  DEALS: 'DEALS',
  TASKS: 'TASKS',
  EVENTS: 'EVENTS',
  APPOINTMENTS: 'APPOINTMENTS',
  DOCS: 'DOCS',
  DEDUP_KEYS: 'DEDUP_KEYS',
  
  // Operational Tables (Queue/Log)
  INGEST_QUEUE: 'INGEST_QUEUE',
  DLQ: 'DLQ',
  JOB_RUN_LOG: 'JOB_RUN_LOG',
  
  // Config/Reference Tables
  CONFIG: 'CONFIG',
  STAGE_AUTOMATIONS: 'STAGE_AUTOMATIONS',
  TASK_TEMPLATES: 'TASK_TEMPLATES',
  LEAD_SCORES: 'LEAD_SCORES',
  LEAD_SIGNALS: 'LEAD_SIGNALS',
  EMAIL_DRAFTS: 'EMAIL_DRAFTS',
  FOLLOWUP_SEQUENCES: 'FOLLOWUP_SEQUENCES',
  DOC_PACKAGES: 'DOC_PACKAGES',
  DOC_TEMPLATES: 'DOC_TEMPLATES',
  OPS_DASHBOARD: 'OPS_DASHBOARD',
  DRIVE_SHARE_AUDIT: 'DRIVE_SHARE_AUDIT',
  ACCESS_INVENTORY: 'ACCESS_INVENTORY',
  SECURITY_SOP: 'SECURITY_SOP',
  SMOKE_TEST_LOG: 'SMOKE_TEST_LOG',
  
  // Dashboard Tables
  DAILY_SNAPSHOT: 'DAILY_SNAPSHOT',
  WEEKLY_SUMMARY: 'WEEKLY_SUMMARY'
};

/**
 * Cursor key constants for JOB_RUN_LOG tracking
 */
const CURSORS = {
  INGEST_LAST_RECEIVED_AT: 'INGEST_LAST_RECEIVED_AT',
  GMAIL_LAST_SCANNED_AT: 'GMAIL_LAST_SCANNED_AT',
  CALENDAR_LAST_SYNCED_AT: 'CALENDAR_LAST_SYNCED_AT',
  DLQ_LAST_PROCESSED_AT: 'DLQ_LAST_PROCESSED_AT'
};

/**
 * Canonical column definitions for GREENFIELD mode
 * Order is fixed and must not change
 */
const CANONICAL_HEADERS = {
  INGEST_QUEUE: [
    'status', 'ingest_id', 'received_at', 'ingest_type', 'payload_json',
    'source', 'source_ref_id', 'idempotency_key', 'error', 'processed_at'
  ],
  
  DLQ: [
    'created_at', 'ingest_id', 'source_ref_id', 'error_json', 'retry_count', 'last_retry_at'
  ],
  
  JOB_RUN_LOG: [
    'created_at', 'job_name', 'orch_run_id', 'cursor_before', 'cursor_after', 'notes', 'message'
  ],
  
  CONTACTS: [
    'contact_id', 'created_at', 'updated_at', 'first_name', 'last_name',
    'email', 'phone', 'whatsapp', 'source', 'source_ref_id', 'status',
    'tags', 'notes', 'kvkk_consent', 'preferred_contact_method', 'last_contact_at'
  ],
  
  DEALS: [
    'deal_id', 'created_at', 'updated_at', 'contact_id', 'deal_type', 'stage',
    'deal_value', 'currency', 'expected_close_date', 'assigned_to', 'property_type',
    'property_address', 'listing_price', 'commission_rate', 'notes',
    'docs_required', 'parcel_present', 'last_stage_change_at', 'lead_source',
    'intent', 'budget', 'region', 'timing', 'utm_source', 'utm_medium',
    'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'lost_reason',
    'attribution_campaign', 'doc_package_url'
  ],
  
  TASKS: [
    'task_id', 'created_at', 'updated_at', 'entity_type', 'entity_id',
    'title', 'description', 'due_date', 'priority', 'status',
    'assigned_to', 'completed_at', 'google_task_id'
  ],
  
  EVENTS: [
    'event_id', 'occurred_at', 'entity_type', 'entity_id', 'event_type',
    'payload_json', 'source', 'source_ref_id', 'idempotency_key'
  ],
  
  APPOINTMENTS: [
    'appointment_id', 'created_at', 'contact_id', 'deal_id', 'scheduled_at',
    'duration_minutes', 'location', 'meeting_type', 'status',
    'google_event_id', 'notes', 'reminder_sent'
  ],
  
  DOCS: [
    'doc_id', 'created_at', 'entity_type', 'entity_id', 'doc_type',
    'doc_url', 'status', 'signed_at', 'notes'
  ],
  
  DEDUP_KEYS: [
    'key', 'created_at'
  ],
  
  CONFIG: [
    'key', 'value', 'description'
  ],
  
  STAGE_AUTOMATIONS: [
    'deal_type', 'from_stage', 'to_stage', 'trigger_condition', 'action_type',
    'action_config', 'sla_days', 'task_template_id'
  ],
  
  TASK_TEMPLATES: [
    'template_id', 'name', 'entity_type', 'title', 'description', 'priority',
    'due_in_days', 'due_in_hours', 'sequence_step', 'channel', 'draft_template_id'
  ],
  
  LEAD_SCORES: [
    'lead_id', 'contact_id', 'deal_id', 'score', 'score_breakdown', 'updated_at'
  ],
  
  LEAD_SIGNALS: [
    'signal_id', 'lead_id', 'contact_id', 'deal_id', 'signal_type',
    'signal_value', 'weight', 'source', 'occurred_at'
  ],
  
  EMAIL_DRAFTS: [
    'draft_id', 'created_at', 'updated_at', 'contact_id', 'deal_id', 'to',
    'subject', 'body', 'status', 'gmail_draft_id', 'task_id', 'scheduled_for'
  ],
  
  FOLLOWUP_SEQUENCES: [
    'sequence_id', 'name', 'deal_type', 'stage', 'steps_json', 'enabled'
  ],
  
  DOC_PACKAGES: [
    'deal_type', 'template_folder_id', 'template_doc_id', 'package_name'
  ],
  
  DOC_TEMPLATES: [
    'template_id', 'template_name', 'doc_id', 'output_folder_id',
    'placeholders_json'
  ],
  
  OPS_DASHBOARD: [
    'run_at', 'ingest_pending', 'dlq_count', 'error_rate', 'cursor_drift_minutes'
  ],
  
  DRIVE_SHARE_AUDIT: [
    'run_at', 'folder_id', 'owner_email', 'sharing_state', 'issue'
  ],
  
  ACCESS_INVENTORY: [
    'system', 'account_owner', 'access_level', 'last_reviewed_at', 'notes'
  ],
  
  SECURITY_SOP: [
    'item_id', 'category', 'description', 'status', 'last_reviewed_at'
  ],
  
  SMOKE_TEST_LOG: [
    'run_at', 'test_name', 'result', 'notes'
  ]
};

/**
 * Ingest types supported by the system
 */
const INGEST_TYPES = {
  NEW_LEAD: 'new_lead',
  FORM_LEAD: 'form_lead',
  CONTACT_UPDATE: 'contact_update',
  DEAL_UPDATE: 'deal_update',
  TASK_CREATE: 'task_create',
  TASK_UPDATE: 'task_update',
  EVENT_LOG: 'event_log',
  APPOINTMENT_CREATE: 'appointment_create',
  DOC_UPLOAD: 'doc_upload',
  MANUAL_IMPORT: 'manual_import'
};

/**
 * Deal types with their stage definitions
 */
const DEAL_TYPES = {
  SELLER: {
    stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'APPOINTMENT_SET', 'LISTING_DISCUSSION',
             'LISTING_SIGNED', 'MARKETING', 'SHOWINGS', 'OFFER', 'CONTRACT', 'CLOSED_WON', 'CLOSED_LOST']
  },
  BUYER: {
    stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'SHORTLIST', 'APPOINTMENT_SET',
             'OFFER', 'CONTRACT', 'CLOSED_WON', 'CLOSED_LOST']
  },
  RENT: {
    stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'SHOWING', 'APPLICATION',
             'CONTRACT', 'HANDOVER', 'CLOSED_WON', 'CLOSED_LOST']
  },
  LAND: {
    stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'DOCS_REVIEW', 'SITE_VISIT',
             'OFFER', 'CONTRACT', 'CLOSED_WON', 'CLOSED_LOST']
  }
};

/**
 * Status values for INGEST_QUEUE
 */
const INGEST_STATUS = {
  NEW: 'new',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  SKIPPED: 'skipped'
};

/**
 * Audit contract string - EXACT match required
 */
const AUDIT_CONTRACT_STRING = 'stopped_on_first_failure (gap-free cursor)';

/**
 * Allowed ops_log scopes for V1.0
 */
const ALLOWED_SCOPES = [
  'manual_fix_json',
  'invalid_ingest_type',
  'manual_import',
  'audit_only',
  'hotfix_code',
  'hotfix_doc'
];

/**
 * Allowed risk_flags for V1.0
 */
const ALLOWED_RISK_FLAGS = [
  'DLQ_INGEST_ID_COL2_ASSUMED',
  'DLQ_HEADER_MISMATCH',
  'JOBRUN_NOTES_FALLBACK_LASTCOL',
  'JOBRUN_MESSAGE_USED',
  'CHECKED_BY_NO_HANDLE',
  'DEALS_LATEST_ROW_BY_ROWINDEX',
  'CONTACTS_HEADER_MISMATCH',
  'DEALS_HEADER_MISMATCH'
];
