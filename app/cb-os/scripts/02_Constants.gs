// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS V1.0 - 02_Constants.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS V1.0 - 02_Constants.gs
// EXPLAIN: Bu satırın görevi: * Sheet names, cursor keys, and canonical column definitions. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Sheet names, cursor keys, and canonical column definitions
// EXPLAIN: Bu satırın görevi: *. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * 
// EXPLAIN: Bu satırın görevi: * V1.0 HARD-RULES REFERENCE:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * V1.0 HARD-RULES REFERENCE:
// EXPLAIN: Bu satırın görevi: * #1: ORCH_15MIN dışında trigger tasarlama yok. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * #1: ORCH_15MIN dışında trigger tasarlama yok
// EXPLAIN: Bu satırın görevi: * #2: SoT tablolara operatör manuel write yok; write-path yalnız job'lar üzerinden. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * #2: SoT tablolara operatör manuel write yok; write-path yalnız job'lar üzerinden
// EXPLAIN: Bu satırın görevi: * #3: ops_log yalnız scope=audit_only; smoke için ops_log YOK. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * #3: ops_log yalnız scope=audit_only; smoke için ops_log YOK
// EXPLAIN: Bu satırın görevi: * #4: received_at formatı: yyyy-MM-dd'T'HH:mm:ssXXX ve tek offset. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * #4: received_at formatı: yyyy-MM-dd'T'HH:mm:ssXXX ve tek offset
// EXPLAIN: Bu satırın görevi: * #5: Audit contract string EXACT: "stopped_on_first_failure (gap-free cursor)". Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * #5: Audit contract string EXACT: "stopped_on_first_failure (gap-free cursor)"
// EXPLAIN: Bu satırın görevi: * #6: DLQ kanıt standardı: COL2 = ingest_id. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * #6: DLQ kanıt standardı: COL2 = ingest_id
// EXPLAIN: Bu satırın görevi: * #7: risk_flags standardı: risk_flags=<CSV|->. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * #7: risk_flags standardı: risk_flags=<CSV|->
// EXPLAIN: Bu satırın görevi: * #8: PASS+RISK politikası: header mismatch = PASS + risk_flags. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * #8: PASS+RISK politikası: header mismatch = PASS + risk_flags
// EXPLAIN: Bu satırın görevi: * #9: "Appendix A yalnız kanıt üretir; aksiyon kaydı Appendix A dışı governance artefaktı". Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * #9: "Appendix A yalnız kanıt üretir; aksiyon kaydı Appendix A dışı governance artefaktı"
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Sheet name constants. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Sheet name constants
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: const SHEETS = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const SHEETS = {
// EXPLAIN: Bu satırın görevi: // SoT Tables (Business Truth). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // SoT Tables (Business Truth)
// EXPLAIN: Bu satırın görevi: CONTACTS: 'CONTACTS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  CONTACTS: 'CONTACTS',
// EXPLAIN: Bu satırın görevi: DEALS: 'DEALS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DEALS: 'DEALS',
// EXPLAIN: Bu satırın görevi: TASKS: 'TASKS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  TASKS: 'TASKS',
// EXPLAIN: Bu satırın görevi: EVENTS: 'EVENTS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EVENTS: 'EVENTS',
// EXPLAIN: Bu satırın görevi: APPOINTMENTS: 'APPOINTMENTS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  APPOINTMENTS: 'APPOINTMENTS',
// EXPLAIN: Bu satırın görevi: DOCS: 'DOCS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DOCS: 'DOCS',
// EXPLAIN: Bu satırın görevi: DEDUP_KEYS: 'DEDUP_KEYS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DEDUP_KEYS: 'DEDUP_KEYS',
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Operational Tables (Queue/Log). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Operational Tables (Queue/Log)
// EXPLAIN: Bu satırın görevi: INGEST_QUEUE: 'INGEST_QUEUE',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  INGEST_QUEUE: 'INGEST_QUEUE',
// EXPLAIN: Bu satırın görevi: DLQ: 'DLQ',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DLQ: 'DLQ',
// EXPLAIN: Bu satırın görevi: JOB_RUN_LOG: 'JOB_RUN_LOG',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  JOB_RUN_LOG: 'JOB_RUN_LOG',
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Config/Reference Tables. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Config/Reference Tables
// EXPLAIN: Bu satırın görevi: CONFIG: 'CONFIG',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  CONFIG: 'CONFIG',
// EXPLAIN: Bu satırın görevi: STAGE_AUTOMATIONS: 'STAGE_AUTOMATIONS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  STAGE_AUTOMATIONS: 'STAGE_AUTOMATIONS',
// EXPLAIN: Bu satırın görevi: TASK_TEMPLATES: 'TASK_TEMPLATES',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  TASK_TEMPLATES: 'TASK_TEMPLATES',
// EXPLAIN: Bu satırın görevi: LEAD_SCORES: 'LEAD_SCORES',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  LEAD_SCORES: 'LEAD_SCORES',
// EXPLAIN: Bu satırın görevi: LEAD_SIGNALS: 'LEAD_SIGNALS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  LEAD_SIGNALS: 'LEAD_SIGNALS',
// EXPLAIN: Bu satırın görevi: EMAIL_DRAFTS: 'EMAIL_DRAFTS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EMAIL_DRAFTS: 'EMAIL_DRAFTS',
// EXPLAIN: Bu satırın görevi: FOLLOWUP_SEQUENCES: 'FOLLOWUP_SEQUENCES',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  FOLLOWUP_SEQUENCES: 'FOLLOWUP_SEQUENCES',
// EXPLAIN: Bu satırın görevi: DOC_PACKAGES: 'DOC_PACKAGES',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DOC_PACKAGES: 'DOC_PACKAGES',
// EXPLAIN: Bu satırın görevi: DOC_TEMPLATES: 'DOC_TEMPLATES',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DOC_TEMPLATES: 'DOC_TEMPLATES',
// EXPLAIN: Bu satırın görevi: OPS_DASHBOARD: 'OPS_DASHBOARD',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  OPS_DASHBOARD: 'OPS_DASHBOARD',
// EXPLAIN: Bu satırın görevi: DRIVE_SHARE_AUDIT: 'DRIVE_SHARE_AUDIT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DRIVE_SHARE_AUDIT: 'DRIVE_SHARE_AUDIT',
// EXPLAIN: Bu satırın görevi: ACCESS_INVENTORY: 'ACCESS_INVENTORY',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ACCESS_INVENTORY: 'ACCESS_INVENTORY',
// EXPLAIN: Bu satırın görevi: SECURITY_SOP: 'SECURITY_SOP',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  SECURITY_SOP: 'SECURITY_SOP',
// EXPLAIN: Bu satırın görevi: PROPERTIES: 'PROPERTIES',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  PROPERTIES: 'PROPERTIES',
// EXPLAIN: Bu satırın görevi: AGREEMENTS: 'AGREEMENTS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  AGREEMENTS: 'AGREEMENTS',
// EXPLAIN: Bu satırın görevi: DOCUMENT_CHECKLISTS: 'DOCUMENT_CHECKLISTS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DOCUMENT_CHECKLISTS: 'DOCUMENT_CHECKLISTS',
// EXPLAIN: Bu satırın görevi: VIEWINGS: 'VIEWINGS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  VIEWINGS: 'VIEWINGS',
// EXPLAIN: Bu satırın görevi: OFFERS: 'OFFERS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  OFFERS: 'OFFERS',
// EXPLAIN: Bu satırın görevi: PRICE_CHANGES: 'PRICE_CHANGES',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  PRICE_CHANGES: 'PRICE_CHANGES',
// EXPLAIN: Bu satırın görevi: MARKETING_ASSETS: 'MARKETING_ASSETS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  MARKETING_ASSETS: 'MARKETING_ASSETS',
// EXPLAIN: Bu satırın görevi: CONSENTS: 'CONSENTS',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  CONSENTS: 'CONSENTS',
// EXPLAIN: Bu satırın görevi: CONVERSION_QUEUE: 'CONVERSION_QUEUE',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  CONVERSION_QUEUE: 'CONVERSION_QUEUE',
// EXPLAIN: Bu satırın görevi: SMOKE_TEST_LOG: 'SMOKE_TEST_LOG',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  SMOKE_TEST_LOG: 'SMOKE_TEST_LOG',
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Dashboard Tables. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Dashboard Tables
// EXPLAIN: Bu satırın görevi: DAILY_SNAPSHOT: 'DAILY_SNAPSHOT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DAILY_SNAPSHOT: 'DAILY_SNAPSHOT',
// EXPLAIN: Bu satırın görevi: WEEKLY_SUMMARY: 'WEEKLY_SUMMARY'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  WEEKLY_SUMMARY: 'WEEKLY_SUMMARY'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Cursor key constants for JOB_RUN_LOG tracking. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Cursor key constants for JOB_RUN_LOG tracking
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: const CURSORS = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const CURSORS = {
// EXPLAIN: Bu satırın görevi: INGEST_LAST_RECEIVED_AT: 'INGEST_LAST_RECEIVED_AT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  INGEST_LAST_RECEIVED_AT: 'INGEST_LAST_RECEIVED_AT',
// EXPLAIN: Bu satırın görevi: GMAIL_LAST_SCANNED_AT: 'GMAIL_LAST_SCANNED_AT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  GMAIL_LAST_SCANNED_AT: 'GMAIL_LAST_SCANNED_AT',
// EXPLAIN: Bu satırın görevi: CALENDAR_LAST_SYNCED_AT: 'CALENDAR_LAST_SYNCED_AT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  CALENDAR_LAST_SYNCED_AT: 'CALENDAR_LAST_SYNCED_AT',
// EXPLAIN: Bu satırın görevi: DLQ_LAST_PROCESSED_AT: 'DLQ_LAST_PROCESSED_AT'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DLQ_LAST_PROCESSED_AT: 'DLQ_LAST_PROCESSED_AT'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Canonical column definitions for GREENFIELD mode. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Canonical column definitions for GREENFIELD mode
// EXPLAIN: Bu satırın görevi: * Order is fixed and must not change. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Order is fixed and must not change
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: const CANONICAL_HEADERS = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const CANONICAL_HEADERS = {
// EXPLAIN: Bu satırın görevi: INGEST_QUEUE: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  INGEST_QUEUE: [
// EXPLAIN: Bu satırın görevi: 'status', 'ingest_id', 'received_at', 'ingest_type', 'payload_json',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'status', 'ingest_id', 'received_at', 'ingest_type', 'payload_json',
// EXPLAIN: Bu satırın görevi: 'source', 'source_ref_id', 'idempotency_key', 'error', 'processed_at'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'source', 'source_ref_id', 'idempotency_key', 'error', 'processed_at'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: DLQ: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DLQ: [
// EXPLAIN: Bu satırın görevi: 'created_at', 'ingest_id', 'source_ref_id', 'error_json', 'retry_count', 'last_retry_at'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'created_at', 'ingest_id', 'source_ref_id', 'error_json', 'retry_count', 'last_retry_at'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: JOB_RUN_LOG: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  JOB_RUN_LOG: [
// EXPLAIN: Bu satırın görevi: 'created_at', 'job_name', 'orch_run_id', 'cursor_before', 'cursor_after', 'notes', 'message'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'created_at', 'job_name', 'orch_run_id', 'cursor_before', 'cursor_after', 'notes', 'message'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: CONTACTS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  CONTACTS: [
// EXPLAIN: Bu satırın görevi: 'contact_id', 'created_at', 'updated_at', 'first_name', 'last_name',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'contact_id', 'created_at', 'updated_at', 'first_name', 'last_name',
// EXPLAIN: Bu satırın görevi: 'email', 'phone', 'whatsapp', 'source', 'source_ref_id', 'status',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'email', 'phone', 'whatsapp', 'source', 'source_ref_id', 'status',
// EXPLAIN: Bu satırın görevi: 'tags', 'notes', 'kvkk_consent', 'preferred_contact_method', 'last_contact_at'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'tags', 'notes', 'kvkk_consent', 'preferred_contact_method', 'last_contact_at'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: DEALS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DEALS: [
// EXPLAIN: Bu satırın görevi: 'deal_id', 'created_at', 'updated_at', 'contact_id', 'deal_type', 'stage',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'deal_id', 'created_at', 'updated_at', 'contact_id', 'deal_type', 'stage',
// EXPLAIN: Bu satırın görevi: 'deal_value', 'currency', 'expected_close_date', 'assigned_to', 'property_type',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'deal_value', 'currency', 'expected_close_date', 'assigned_to', 'property_type',
// EXPLAIN: Bu satırın görevi: 'property_address', 'listing_price', 'commission_rate', 'notes',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'property_address', 'listing_price', 'commission_rate', 'notes',
// EXPLAIN: Bu satırın görevi: 'docs_required', 'parcel_present', 'last_stage_change_at', 'lead_source',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'docs_required', 'parcel_present', 'last_stage_change_at', 'lead_source',
// EXPLAIN: Bu satırın görevi: 'intent', 'budget', 'region', 'timing', 'utm_source', 'utm_medium',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'intent', 'budget', 'region', 'timing', 'utm_source', 'utm_medium',
// EXPLAIN: Bu satırın görevi: 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'lost_reason',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'lost_reason',
// EXPLAIN: Bu satırın görevi: 'attribution_campaign', 'doc_package_url'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'attribution_campaign', 'doc_package_url'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: TASKS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  TASKS: [
// EXPLAIN: Bu satırın görevi: 'task_id', 'created_at', 'updated_at', 'entity_type', 'entity_id',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'task_id', 'created_at', 'updated_at', 'entity_type', 'entity_id',
// EXPLAIN: Bu satırın görevi: 'title', 'description', 'due_date', 'priority', 'status',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'title', 'description', 'due_date', 'priority', 'status',
// EXPLAIN: Bu satırın görevi: 'assigned_to', 'completed_at', 'google_task_id'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'assigned_to', 'completed_at', 'google_task_id'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: EVENTS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EVENTS: [
// EXPLAIN: Bu satırın görevi: 'event_id', 'occurred_at', 'entity_type', 'entity_id', 'event_type',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'event_id', 'occurred_at', 'entity_type', 'entity_id', 'event_type',
// EXPLAIN: Bu satırın görevi: 'payload_json', 'source', 'source_ref_id', 'idempotency_key'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'payload_json', 'source', 'source_ref_id', 'idempotency_key'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: APPOINTMENTS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  APPOINTMENTS: [
// EXPLAIN: Bu satırın görevi: 'appointment_id', 'created_at', 'contact_id', 'deal_id', 'scheduled_at',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'appointment_id', 'created_at', 'contact_id', 'deal_id', 'scheduled_at',
// EXPLAIN: Bu satırın görevi: 'duration_minutes', 'location', 'meeting_type', 'status',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'duration_minutes', 'location', 'meeting_type', 'status',
// EXPLAIN: Bu satırın görevi: 'google_event_id', 'notes', 'reminder_sent'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'google_event_id', 'notes', 'reminder_sent'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: DOCS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DOCS: [
// EXPLAIN: Bu satırın görevi: 'doc_id', 'created_at', 'entity_type', 'entity_id', 'doc_type',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'doc_id', 'created_at', 'entity_type', 'entity_id', 'doc_type',
// EXPLAIN: Bu satırın görevi: 'doc_url', 'status', 'signed_at', 'notes'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'doc_url', 'status', 'signed_at', 'notes'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: DEDUP_KEYS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DEDUP_KEYS: [
// EXPLAIN: Bu satırın görevi: 'key', 'created_at'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'key', 'created_at'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: CONFIG: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  CONFIG: [
// EXPLAIN: Bu satırın görevi: 'key', 'value', 'description'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'key', 'value', 'description'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: STAGE_AUTOMATIONS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  STAGE_AUTOMATIONS: [
// EXPLAIN: Bu satırın görevi: 'deal_type', 'from_stage', 'to_stage', 'trigger_condition', 'action_type',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'deal_type', 'from_stage', 'to_stage', 'trigger_condition', 'action_type',
// EXPLAIN: Bu satırın görevi: 'action_config', 'sla_days', 'task_template_id'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'action_config', 'sla_days', 'task_template_id'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: TASK_TEMPLATES: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  TASK_TEMPLATES: [
// EXPLAIN: Bu satırın görevi: 'template_id', 'name', 'entity_type', 'title', 'description', 'priority',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'template_id', 'name', 'entity_type', 'title', 'description', 'priority',
// EXPLAIN: Bu satırın görevi: 'due_in_days', 'due_in_hours', 'sequence_step', 'channel', 'draft_template_id'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'due_in_days', 'due_in_hours', 'sequence_step', 'channel', 'draft_template_id'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: LEAD_SCORES: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  LEAD_SCORES: [
// EXPLAIN: Bu satırın görevi: 'lead_id', 'contact_id', 'deal_id', 'score', 'score_breakdown', 'updated_at'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'lead_id', 'contact_id', 'deal_id', 'score', 'score_breakdown', 'updated_at'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: LEAD_SIGNALS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  LEAD_SIGNALS: [
// EXPLAIN: Bu satırın görevi: 'signal_id', 'lead_id', 'contact_id', 'deal_id', 'signal_type',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'signal_id', 'lead_id', 'contact_id', 'deal_id', 'signal_type',
// EXPLAIN: Bu satırın görevi: 'signal_value', 'weight', 'source', 'occurred_at'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'signal_value', 'weight', 'source', 'occurred_at'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: EMAIL_DRAFTS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EMAIL_DRAFTS: [
// EXPLAIN: Bu satırın görevi: 'draft_id', 'created_at', 'updated_at', 'contact_id', 'deal_id', 'to',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'draft_id', 'created_at', 'updated_at', 'contact_id', 'deal_id', 'to',
// EXPLAIN: Bu satırın görevi: 'subject', 'body', 'status', 'gmail_draft_id', 'task_id', 'scheduled_for'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'subject', 'body', 'status', 'gmail_draft_id', 'task_id', 'scheduled_for'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: FOLLOWUP_SEQUENCES: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  FOLLOWUP_SEQUENCES: [
// EXPLAIN: Bu satırın görevi: 'sequence_id', 'name', 'deal_type', 'stage', 'steps_json', 'enabled'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'sequence_id', 'name', 'deal_type', 'stage', 'steps_json', 'enabled'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: DOC_PACKAGES: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DOC_PACKAGES: [
// EXPLAIN: Bu satırın görevi: 'deal_type', 'template_folder_id', 'template_doc_id', 'package_name'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'deal_type', 'template_folder_id', 'template_doc_id', 'package_name'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: DOC_TEMPLATES: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DOC_TEMPLATES: [
// EXPLAIN: Bu satırın görevi: 'template_id', 'template_name', 'doc_id', 'output_folder_id',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'template_id', 'template_name', 'doc_id', 'output_folder_id',
// EXPLAIN: Bu satırın görevi: 'placeholders_json'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'placeholders_json'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: OPS_DASHBOARD: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  OPS_DASHBOARD: [
// EXPLAIN: Bu satırın görevi: 'run_at', 'ingest_pending', 'dlq_count', 'error_rate', 'cursor_drift_minutes'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'run_at', 'ingest_pending', 'dlq_count', 'error_rate', 'cursor_drift_minutes'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: DRIVE_SHARE_AUDIT: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DRIVE_SHARE_AUDIT: [
// EXPLAIN: Bu satırın görevi: 'run_at', 'folder_id', 'owner_email', 'sharing_state', 'issue'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'run_at', 'folder_id', 'owner_email', 'sharing_state', 'issue'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: ACCESS_INVENTORY: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ACCESS_INVENTORY: [
// EXPLAIN: Bu satırın görevi: 'system', 'account_owner', 'access_level', 'last_reviewed_at', 'notes'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'system', 'account_owner', 'access_level', 'last_reviewed_at', 'notes'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: SECURITY_SOP: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  SECURITY_SOP: [
// EXPLAIN: Bu satırın görevi: 'item_id', 'category', 'description', 'status', 'last_reviewed_at'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'item_id', 'category', 'description', 'status', 'last_reviewed_at'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: PROPERTIES: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  PROPERTIES: [
// EXPLAIN: Bu satırın görevi: 'property_id', 'created_at', 'updated_at', 'deal_id', 'property_type',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'property_id', 'created_at', 'updated_at', 'deal_id', 'property_type',
// EXPLAIN: Bu satırın görevi: 'status', 'title', 'address', 'city', 'district', 'size_m2',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'status', 'title', 'address', 'city', 'district', 'size_m2',
// EXPLAIN: Bu satırın görevi: 'price', 'currency', 'owner_contact_id', 'notes'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'price', 'currency', 'owner_contact_id', 'notes'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: AGREEMENTS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  AGREEMENTS: [
// EXPLAIN: Bu satırın görevi: 'agreement_id', 'property_id', 'contact_id', 'agreement_type',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'agreement_id', 'property_id', 'contact_id', 'agreement_type',
// EXPLAIN: Bu satırın görevi: 'start_date', 'end_date', 'commission_rate', 'status', 'notes'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'start_date', 'end_date', 'commission_rate', 'status', 'notes'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: DOCUMENT_CHECKLISTS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DOCUMENT_CHECKLISTS: [
// EXPLAIN: Bu satırın görevi: 'checklist_id', 'property_type', 'required_docs_json', 'lock_publish', 'updated_at'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'checklist_id', 'property_type', 'required_docs_json', 'lock_publish', 'updated_at'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: VIEWINGS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  VIEWINGS: [
// EXPLAIN: Bu satırın görevi: 'viewing_id', 'property_id', 'contact_id', 'scheduled_at',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'viewing_id', 'property_id', 'contact_id', 'scheduled_at',
// EXPLAIN: Bu satırın görevi: 'status', 'notes', 'google_event_id'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'status', 'notes', 'google_event_id'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: OFFERS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  OFFERS: [
// EXPLAIN: Bu satırın görevi: 'offer_id', 'property_id', 'contact_id', 'offer_price',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'offer_id', 'property_id', 'contact_id', 'offer_price',
// EXPLAIN: Bu satırın görevi: 'currency', 'status', 'created_at', 'notes'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'currency', 'status', 'created_at', 'notes'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: PRICE_CHANGES: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  PRICE_CHANGES: [
// EXPLAIN: Bu satırın görevi: 'change_id', 'property_id', 'old_price', 'new_price', 'changed_at'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'change_id', 'property_id', 'old_price', 'new_price', 'changed_at'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: MARKETING_ASSETS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  MARKETING_ASSETS: [
// EXPLAIN: Bu satırın görevi: 'asset_id', 'property_id', 'asset_type', 'drive_url', 'notes'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'asset_id', 'property_id', 'asset_type', 'drive_url', 'notes'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: CONSENTS: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  CONSENTS: [
// EXPLAIN: Bu satırın görevi: 'consent_id', 'contact_id', 'consent_type', 'status', 'ts', 'notes'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'consent_id', 'contact_id', 'consent_type', 'status', 'ts', 'notes'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: CONVERSION_QUEUE: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  CONVERSION_QUEUE: [
// EXPLAIN: Bu satırın görevi: 'conversion_id', 'gclid', 'event_type', 'event_value',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'conversion_id', 'gclid', 'event_type', 'event_value',
// EXPLAIN: Bu satırın görevi: 'status', 'error', 'created_at', 'processed_at'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'status', 'error', 'created_at', 'processed_at'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: SMOKE_TEST_LOG: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  SMOKE_TEST_LOG: [
// EXPLAIN: Bu satırın görevi: 'run_at', 'test_name', 'result', 'notes'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'run_at', 'test_name', 'result', 'notes'
// EXPLAIN: Bu satırın görevi: ]. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ]
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Ingest types supported by the system. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Ingest types supported by the system
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: const INGEST_TYPES = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const INGEST_TYPES = {
// EXPLAIN: Bu satırın görevi: NEW_LEAD: 'new_lead',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  NEW_LEAD: 'new_lead',
// EXPLAIN: Bu satırın görevi: FORM_LEAD: 'form_lead',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  FORM_LEAD: 'form_lead',
// EXPLAIN: Bu satırın görevi: GMAIL_SIGNAL: 'gmail_signal',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  GMAIL_SIGNAL: 'gmail_signal',
// EXPLAIN: Bu satırın görevi: EMAIL_DRAFT_REQUEST: 'email_draft_request',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EMAIL_DRAFT_REQUEST: 'email_draft_request',
// EXPLAIN: Bu satırın görevi: DOC_PACKAGE_CREATE: 'doc_package_create',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DOC_PACKAGE_CREATE: 'doc_package_create',
// EXPLAIN: Bu satırın görevi: DOC_GENERATE_REQUEST: 'doc_generate_request',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DOC_GENERATE_REQUEST: 'doc_generate_request',
// EXPLAIN: Bu satırın görevi: STAGE_TRANSITION: 'stage_transition',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  STAGE_TRANSITION: 'stage_transition',
// EXPLAIN: Bu satırın görevi: CONTACT_UPDATE: 'contact_update',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  CONTACT_UPDATE: 'contact_update',
// EXPLAIN: Bu satırın görevi: DEAL_UPDATE: 'deal_update',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DEAL_UPDATE: 'deal_update',
// EXPLAIN: Bu satırın görevi: TASK_CREATE: 'task_create',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  TASK_CREATE: 'task_create',
// EXPLAIN: Bu satırın görevi: TASK_UPDATE: 'task_update',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  TASK_UPDATE: 'task_update',
// EXPLAIN: Bu satırın görevi: EVENT_LOG: 'event_log',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EVENT_LOG: 'event_log',
// EXPLAIN: Bu satırın görevi: APPOINTMENT_CREATE: 'appointment_create',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  APPOINTMENT_CREATE: 'appointment_create',
// EXPLAIN: Bu satırın görevi: DOC_UPLOAD: 'doc_upload',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DOC_UPLOAD: 'doc_upload',
// EXPLAIN: Bu satırın görevi: MANUAL_IMPORT: 'manual_import'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  MANUAL_IMPORT: 'manual_import'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Deal types with their stage definitions. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Deal types with their stage definitions
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: const DEAL_TYPES = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const DEAL_TYPES = {
// EXPLAIN: Bu satırın görevi: SELLER: {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  SELLER: {
// EXPLAIN: Bu satırın görevi: stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'APPOINTMENT_SET', 'LISTING_DISCUSSION',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'APPOINTMENT_SET', 'LISTING_DISCUSSION',
// EXPLAIN: Bu satırın görevi: 'LISTING_SIGNED', 'MARKETING', 'SHOWINGS', 'OFFER', 'CONTRACT', 'CLOSED_WON', 'CLOSED_LOST']. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
             'LISTING_SIGNED', 'MARKETING', 'SHOWINGS', 'OFFER', 'CONTRACT', 'CLOSED_WON', 'CLOSED_LOST']
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satırın görevi: BUYER: {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  BUYER: {
// EXPLAIN: Bu satırın görevi: stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'SHORTLIST', 'APPOINTMENT_SET',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'SHORTLIST', 'APPOINTMENT_SET',
// EXPLAIN: Bu satırın görevi: 'OFFER', 'CONTRACT', 'CLOSED_WON', 'CLOSED_LOST']. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
             'OFFER', 'CONTRACT', 'CLOSED_WON', 'CLOSED_LOST']
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satırın görevi: RENT: {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  RENT: {
// EXPLAIN: Bu satırın görevi: stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'SHOWING', 'APPLICATION',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'SHOWING', 'APPLICATION',
// EXPLAIN: Bu satırın görevi: 'CONTRACT', 'HANDOVER', 'CLOSED_WON', 'CLOSED_LOST']. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
             'CONTRACT', 'HANDOVER', 'CLOSED_WON', 'CLOSED_LOST']
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satırın görevi: LAND: {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  LAND: {
// EXPLAIN: Bu satırın görevi: stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'DOCS_REVIEW', 'SITE_VISIT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    stages: ['NEW', 'FIRST_TOUCH', 'QUALIFIED', 'DOCS_REVIEW', 'SITE_VISIT',
// EXPLAIN: Bu satırın görevi: 'OFFER', 'CONTRACT', 'CLOSED_WON', 'CLOSED_LOST']. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
             'OFFER', 'CONTRACT', 'CLOSED_WON', 'CLOSED_LOST']
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Status values for INGEST_QUEUE. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Status values for INGEST_QUEUE
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: const INGEST_STATUS = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const INGEST_STATUS = {
// EXPLAIN: Bu satırın görevi: NEW: 'new',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  NEW: 'new',
// EXPLAIN: Bu satırın görevi: PROCESSING: 'processing',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  PROCESSING: 'processing',
// EXPLAIN: Bu satırın görevi: COMPLETED: 'completed',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  COMPLETED: 'completed',
// EXPLAIN: Bu satırın görevi: FAILED: 'failed',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  FAILED: 'failed',
// EXPLAIN: Bu satırın görevi: SKIPPED: 'skipped'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  SKIPPED: 'skipped'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Audit contract string - EXACT match required. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Audit contract string - EXACT match required
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: const AUDIT_CONTRACT_STRING = 'stopped_on_first_failure (gap-free cursor)';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const AUDIT_CONTRACT_STRING = 'stopped_on_first_failure (gap-free cursor)';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Allowed ops_log scopes for V1.0. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Allowed ops_log scopes for V1.0
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: const ALLOWED_SCOPES = [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const ALLOWED_SCOPES = [
// EXPLAIN: Bu satırın görevi: 'manual_fix_json',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'manual_fix_json',
// EXPLAIN: Bu satırın görevi: 'invalid_ingest_type',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'invalid_ingest_type',
// EXPLAIN: Bu satırın görevi: 'manual_import',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'manual_import',
// EXPLAIN: Bu satırın görevi: 'audit_only',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'audit_only',
// EXPLAIN: Bu satırın görevi: 'hotfix_code',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'hotfix_code',
// EXPLAIN: Bu satırın görevi: 'hotfix_doc'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'hotfix_doc'
// EXPLAIN: Bu satırın görevi: ];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Allowed risk_flags for V1.0. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Allowed risk_flags for V1.0
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: const ALLOWED_RISK_FLAGS = [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const ALLOWED_RISK_FLAGS = [
// EXPLAIN: Bu satırın görevi: 'DLQ_INGEST_ID_COL2_ASSUMED',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'DLQ_INGEST_ID_COL2_ASSUMED',
// EXPLAIN: Bu satırın görevi: 'DLQ_HEADER_MISMATCH',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'DLQ_HEADER_MISMATCH',
// EXPLAIN: Bu satırın görevi: 'JOBRUN_NOTES_FALLBACK_LASTCOL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'JOBRUN_NOTES_FALLBACK_LASTCOL',
// EXPLAIN: Bu satırın görevi: 'JOBRUN_MESSAGE_USED',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'JOBRUN_MESSAGE_USED',
// EXPLAIN: Bu satırın görevi: 'CHECKED_BY_NO_HANDLE',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'CHECKED_BY_NO_HANDLE',
// EXPLAIN: Bu satırın görevi: 'DEALS_LATEST_ROW_BY_ROWINDEX',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'DEALS_LATEST_ROW_BY_ROWINDEX',
// EXPLAIN: Bu satırın görevi: 'CONTACTS_HEADER_MISMATCH',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'CONTACTS_HEADER_MISMATCH',
// EXPLAIN: Bu satırın görevi: 'DEALS_HEADER_MISMATCH'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  'DEALS_HEADER_MISMATCH'
// EXPLAIN: Bu satırın görevi: ];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
];
// Çağdaş Seçkin Tüfekci - Real Estate Agent
