/**
 * V1.4.0 HARD-RULES REFERENCE:
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
  PROPERTIES: 'PROPERTIES',
  AGREEMENTS: 'AGREEMENTS',
  DOCUMENT_CHECKLISTS: 'DOCUMENT_CHECKLISTS',
  VIEWINGS: 'VIEWINGS',
  OFFERS: 'OFFERS',
  PRICE_CHANGES: 'PRICE_CHANGES',
  MARKETING_ASSETS: 'MARKETING_ASSETS',
  CONSENTS: 'CONSENTS',
  CONVERSION_QUEUE: 'CONVERSION_QUEUE',
  SMOKE_TEST_LOG: 'SMOKE_TEST_LOG',
  UNIFIED_TABLES: 'UNIFIED_TABLES',
  DASHBOARD_CHARTS: 'DASHBOARD_CHARTS',
  DASHBOARD_SUMMARY: 'DASHBOARD_SUMMARY',
  DASHBOARD_PIPELINE: 'DASHBOARD_PIPELINE',
  DASHBOARD_LEAD_SOURCES: 'DASHBOARD_LEAD_SOURCES',
  DASHBOARD_SLA: 'DASHBOARD_SLA',
  REPUTATION_FEEDBACK: 'REPUTATION_FEEDBACK',
  PORTAL_LINKS: 'PORTAL_LINKS',
  OFFLINE_CONVERSIONS: 'OFFLINE_CONVERSIONS',
  CONTENT_LIBRARY: 'CONTENT_LIBRARY',
  ADS_ATTRIBUTION_SUMMARY: 'ADS_ATTRIBUTION_SUMMARY',
  BOOKING_SUMMARY: 'BOOKING_SUMMARY',
  EMAIL_OUTREACH_SUMMARY: 'EMAIL_OUTREACH_SUMMARY',
  TENANTS: 'TENANTS',
  COURSE_SESSIONS: 'COURSE_SESSIONS',
  KNOWLEDGE_BASE: 'KNOWLEDGE_BASE',
  OPEN_HOUSES: 'OPEN_HOUSES',
  OPEN_HOUSE_SIGNINS: 'OPEN_HOUSE_SIGNINS',
  OPEN_HOUSE_FOLLOWUPS: 'OPEN_HOUSE_FOLLOWUPS',
  BUYER_PROFILES: 'BUYER_PROFILES',
  SELLER_PROFILES: 'SELLER_PROFILES',
  TIME_LOGS: 'TIME_LOGS',
  CHART_OF_ACCOUNTS: 'CHART_OF_ACCOUNTS',
  GENERAL_LEDGER: 'GENERAL_LEDGER',
  TENANT_LEDGER: 'TENANT_LEDGER',
  LANDLORD_LEDGER: 'LANDLORD_LEDGER',
  CLOSING_COSTS: 'CLOSING_COSTS',
  LISTING_EXPENSES: 'LISTING_EXPENSES',
  INVESTMENT_ANALYSIS: 'INVESTMENT_ANALYSIS',
  MORTGAGE_CALC: 'MORTGAGE_CALC',
  RENT_BUY_ANALYSIS: 'RENT_BUY_ANALYSIS',
  QUOTATIONS: 'QUOTATIONS',
  INVOICES: 'INVOICES',
  RECEIPTS: 'RECEIPTS',
  PROJECTS: 'PROJECTS',
  MILESTONES: 'MILESTONES',
  PROJECT_BUDGETS: 'PROJECT_BUDGETS',
  ROLE_VIEWS: 'ROLE_VIEWS',
  
  // Finance Tables
  FIN_PARAMS: 'PARAMS',
  FIN_PLAN: 'PLAN',
  FIN_MONTHLY: 'MONTHLY',
  FIN_SUMMARY: 'SUMMARY',
  FIN_TRANSACTIONS: 'TRANSACTIONS',
  FIN_TAX: 'TAX',
  FIN_FX_RATES: 'FX_RATES',
  FIN_FX_HISTORY: 'FX_HISTORY',
  FIN_DUE_REALLOSS: 'DUE_REALLOSS',
  FIN_EXPENSES: 'EXPENSES',
  FIN_DASH_AGG: 'DASH_AGG_FINANCE',
  FIN_DASH_FX: 'DASH_AGG_FX',
  
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
    'status', 'ingest_id', 'received_at', 'sequence_id', 'ingest_type', 'payload_json',
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
    'tags', 'notes', 'kvkk_consent', 'preferred_contact_method', 'last_contact_at',
    'phone_alt', 'profession', 'address', 'fax', 'work_phone', 'authorized_name',
    'authorized_phone', 'contact_role', 'follow_up', 'next_contact_at'
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
  
  PROPERTIES: [
    'property_id', 'created_at', 'updated_at', 'deal_id', 'property_type',
    'status', 'title', 'address', 'city', 'district', 'size_m2',
    'price', 'currency', 'owner_contact_id', 'notes',
    'zoning_status', 'occupancy_permit_status', 'title_deed_info',
    'building_age', 'current_usage', 'floor', 'facade', 'view',
    'transport_distance_meters', 'social_facility_distance_meters',
    'room_count', 'living_room_count', 'bathroom_count', 'toilet_count',
    'balcony_count', 'interior_size_details', 'building_type', 'amenities',
    'land_share', 'emsal', 'max_building_height', 'planted_crop_exists',
    'encumbrances', 'property_legal_status', 'neighborhood', 'street',
    'building_name_no', 'apartment_no', 'parcel_info', 'credit_eligible',
    'title_deed_status', 'renovation_year', 'parking_open', 'parking_closed',
    'dues_amount', 'housing_type', 'housing_style', 'building_floor_count',
    'site_activity_fitness', 'site_activity_basketball', 'site_activity_tennis',
    'site_activity_pool_open', 'site_activity_pool_closed', 'site_activity_full_access',
    'security_present', 'elevator_present', 'balcony_present',
    'furnished_status', 'occupancy_status',
    'heating_central', 'heating_kombi', 'heating_floor', 'heating_aircon',
    'bathroom_hilton', 'bathroom_shower', 'bathroom_wc',
    'kitchen_builtin', 'kitchen_ready',
    'room_1', 'room_2', 'room_3', 'room_4', 'room_5', 'room_6',
    'deposit_amount',
    'owner_notes', 'asking_price_sale', 'sale_is_determined', 'sale_reason',
    'sale_previous_occupancy', 'sale_years_owned', 'sale_time_on_market',
    'sale_price_basis', 'sale_renovation_done', 'sale_written_offer',
    'sale_experience', 'sale_urgency',
    'asking_price_rent', 'rent_previously_leased', 'rent_last_tenant_source',
    'rent_owner_occupied', 'rent_time_vacant', 'rent_move_out_timeframe',
    'rent_tenant_criteria', 'rent_renovation_preference', 'rent_sell_if_good_offer',
    'rent_other_agents', 'rent_last_tenant_price'
  ],
  
  AGREEMENTS: [
    'agreement_id', 'property_id', 'contact_id', 'agreement_type',
    'start_date', 'end_date', 'commission_rate', 'status', 'notes',
    'agreement_number', 'agreement_signed_at', 'agreement_copies', 'agreement_doc_url',
    'broker_license_no', 'broker_company_name', 'broker_contact_email',
    'broker_contact_phone', 'responsible_agent_name', 'responsible_agent_signature_ref',
    'owner_identity_type', 'owner_identity_no', 'owner_full_name', 'owner_company_name',
    'owner_company_contact', 'owner_representative_name', 'owner_signature_ref',
    'services_description', 'service_fee_amount', 'service_fee_currency',
    'rights_and_obligations_text', 'cancellation_fee', 'cancellation_fee_type',
    'penalty_clause_text', 'broker_notice_address', 'owner_notice_address',
    'property_legal_status', 'buyer_or_tenant_role', 'additional_disclosures',
    'info_source_type', 'owner_declaration_text', 'owner_declaration_signed_at'
  ],
  
  DOCUMENT_CHECKLISTS: [
    'checklist_id', 'property_type', 'required_docs_json', 'lock_publish', 'updated_at'
  ],
  
  VIEWINGS: [
    'viewing_id', 'property_id', 'contact_id', 'scheduled_at',
    'status', 'notes', 'google_event_id'
  ],
  
  OFFERS: [
    'offer_id', 'property_id', 'contact_id', 'offer_price',
    'currency', 'status', 'created_at', 'notes'
  ],
  
  PRICE_CHANGES: [
    'change_id', 'property_id', 'old_price', 'new_price', 'changed_at'
  ],
  
  MARKETING_ASSETS: [
    'asset_id', 'property_id', 'asset_type', 'drive_url', 'notes'
  ],
  
  CONSENTS: [
    'consent_id', 'contact_id', 'consent_type', 'status', 'ts', 'notes'
  ],
  
  CONVERSION_QUEUE: [
    'conversion_id', 'gclid', 'event_type', 'event_value',
    'status', 'error', 'created_at', 'processed_at'
  ],
  
  DAILY_SNAPSHOT: [
    'snapshot_date', 'run_at', 'leads_created', 'deals_created',
    'conversion_rate', 'first_touch_count', 'avg_first_touch_minutes'
  ],
  
  WEEKLY_SUMMARY: [
    'week_start', 'week_end', 'run_at', 'leads_created', 'deals_created',
    'conversion_rate', 'first_touch_count', 'avg_first_touch_minutes'
  ],
  
  SMOKE_TEST_LOG: [
    'run_at', 'test_name', 'result', 'notes'
  ],

  UNIFIED_TABLES: [
    'source_table', 'row_id', 'updated_at', 'data_json'
  ],

  DASHBOARD_SUMMARY: [
    'metric', 'value', 'run_at'
  ],

  DASHBOARD_PIPELINE: [
    'deal_type', 'stage', 'count', 'run_at'
  ],

  DASHBOARD_LEAD_SOURCES: [
    'lead_source', 'count', 'run_at'
  ],

  DASHBOARD_SLA: [
    'metric', 'count', 'run_at'
  ],

  REPUTATION_FEEDBACK: [
    'feedback_id', 'submitted_at', 'contact_id', 'deal_id', 'rating', 'comment',
    'source', 'status'
  ],

  PORTAL_LINKS: [
    'contact_id', 'contact_name', 'drive_folder_url', 'summary_doc_url', 'updated_at'
  ],

  OFFLINE_CONVERSIONS: [
    'conversion_id', 'gclid', 'conversion_time', 'conversion_value', 'currency',
    'conversion_name', 'status'
  ],

  CONTENT_LIBRARY: [
    'content_id', 'title', 'type', 'drive_url', 'access_level', 'notes', 'updated_at'
  ],

  ADS_ATTRIBUTION_SUMMARY: [
    'metric', 'value', 'run_at'
  ],

  BOOKING_SUMMARY: [
    'metric', 'value', 'run_at'
  ],

  EMAIL_OUTREACH_SUMMARY: [
    'metric', 'value', 'run_at'
  ],

  TENANTS: [
    'tenant_id', 'tenant_name', 'workbook_id', 'drive_root_id', 'status', 'created_at'
  ],

  COURSE_SESSIONS: [
    'session_id', 'title', 'meeting_link', 'scheduled_at', 'host_email', 'notes', 'status'
  ],

  KNOWLEDGE_BASE: [
    'kb_id', 'title', 'category', 'doc_url', 'owner', 'updated_at'
  ],

  OPEN_HOUSES: [
    'open_house_id', 'property_id', 'deal_id', 'title', 'event_date',
    'start_time', 'end_time', 'location', 'host', 'notes', 'status'
  ],

  OPEN_HOUSE_SIGNINS: [
    'signin_id', 'open_house_id', 'contact_id', 'full_name', 'email',
    'phone', 'interested_in', 'created_at', 'notes'
  ],

  OPEN_HOUSE_FOLLOWUPS: [
    'followup_id', 'open_house_id', 'contact_id', 'deal_id', 'status',
    'next_step', 'next_step_date', 'assigned_to', 'created_at', 'updated_at', 'notes'
  ],

  BUYER_PROFILES: [
    'buyer_profile_id', 'contact_id', 'deal_id', 'budget_min', 'budget_max',
    'preferred_regions', 'property_type', 'bedrooms', 'bathrooms',
    'financing_status', 'must_have', 'nice_to_have', 'timeline', 'notes', 'updated_at'
  ],

  SELLER_PROFILES: [
    'seller_profile_id', 'contact_id', 'deal_id', 'target_price', 'price_floor',
    'timeline', 'reason_for_sale', 'property_type', 'property_address',
    'occupancy_status', 'notes', 'updated_at'
  ],

  TIME_LOGS: [
    'time_log_id', 'log_date', 'activity_type', 'duration_minutes', 'contact_id',
    'deal_id', 'property_id', 'notes', 'created_at'
  ],

  CHART_OF_ACCOUNTS: [
    'account_id', 'account_name', 'account_type', 'account_category', 'is_active', 'notes'
  ],

  GENERAL_LEDGER: [
    'entry_id', 'entry_date', 'account_id', 'debit', 'credit', 'currency',
    'reference_type', 'reference_id', 'notes', 'created_at'
  ],

  TENANT_LEDGER: [
    'entry_id', 'entry_date', 'tenant_id', 'property_id', 'debit', 'credit',
    'currency', 'reference', 'notes', 'created_at'
  ],

  LANDLORD_LEDGER: [
    'entry_id', 'entry_date', 'landlord_id', 'property_id', 'debit', 'credit',
    'currency', 'reference', 'notes', 'created_at'
  ],

  CLOSING_COSTS: [
    'closing_cost_id', 'deal_id', 'party', 'cost_type', 'amount', 'currency',
    'cost_date', 'notes', 'created_at'
  ],

  LISTING_EXPENSES: [
    'listing_expense_id', 'property_id', 'deal_id', 'expense_type', 'amount',
    'currency', 'expense_date', 'vendor', 'notes', 'created_at'
  ],

  INVESTMENT_ANALYSIS: [
    'analysis_id', 'deal_id', 'property_id', 'noi', 'cap_rate', 'roi',
    'payback_years', 'cashflow_annual', 'vacancy_rate', 'assumptions', 'updated_at'
  ],

  MORTGAGE_CALC: [
    'calc_id', 'principal', 'interest_rate', 'term_years', 'down_payment',
    'monthly_payment', 'total_interest', 'created_at', 'notes'
  ],

  RENT_BUY_ANALYSIS: [
    'analysis_id', 'monthly_rent', 'home_price', 'down_payment', 'interest_rate',
    'term_years', 'rent_growth_rate', 'home_appreciation_rate', 'monthly_cost_diff',
    'break_even_years', 'created_at', 'notes'
  ],

  QUOTATIONS: [
    'quotation_id', 'contact_id', 'deal_id', 'property_id', 'quote_date',
    'status', 'total_amount', 'currency', 'doc_url', 'notes', 'created_at'
  ],

  INVOICES: [
    'invoice_id', 'contact_id', 'deal_id', 'property_id', 'invoice_date',
    'due_date', 'status', 'subtotal', 'tax_amount', 'total_amount',
    'currency', 'doc_url', 'notes', 'created_at'
  ],

  RECEIPTS: [
    'receipt_id', 'contact_id', 'deal_id', 'property_id', 'receipt_date',
    'amount', 'currency', 'payment_method', 'doc_url', 'notes', 'created_at'
  ],

  PROJECTS: [
    'project_id', 'project_name', 'project_type', 'start_date', 'end_date',
    'status', 'owner', 'budget_total', 'notes', 'created_at'
  ],

  MILESTONES: [
    'milestone_id', 'project_id', 'title', 'target_date', 'status',
    'progress_pct', 'notes', 'created_at'
  ],

  PROJECT_BUDGETS: [
    'budget_id', 'project_id', 'category', 'planned_amount', 'actual_amount',
    'currency', 'notes', 'updated_at'
  ],

  ROLE_VIEWS: [
    'view_id', 'role', 'sheet_name', 'filter_json', 'created_at', 'notes'
  ],
  
  PARAMS: [
    'param_key', 'param_value', 'description'
  ],
  
  PLAN: [
    'year', 'consultant', 'annual_gross_ciro_target', 'avg_sale_price',
    'service_fee_rate', 'office_share_rate', 'cbtr_share_rate',
    'annual_living_cost', 'operating_cost', 'listing_to_sale_conv_rate',
    'appointment_to_listing_conv_rate', 'office_cbtr_share_amount',
    'annual_net_ciro', 'annual_profit_target', 'avg_fee_income_per_deal',
    'annual_sales_target', 'monthly_sales_target', 'annual_listing_target',
    'monthly_listing_target', 'annual_appointment_target',
    'monthly_appointment_target', 'monthly_ciro_target',
    'annual_income_tax_estimate', 'post_tax_ciro_target',
    'post_expense_ciro_target'
  ],
  
  MONTHLY: [
    'year', 'month', 'consultant', 'plan_year_key',
    'appointment_target', 'appointment_actual', 'appointment_target_pct',
    'listing_target', 'listing_actual', 'listing_target_pct',
    'sales_target', 'sales_actual', 'sales_target_pct',
    'ciro_target', 'ciro_actual', 'ciro_target_pct',
    'transaction_net_ciro_month'
  ],
  
  SUMMARY: [
    'year', 'consultant',
    'appointment_target_year', 'appointment_actual_year',
    'listing_target_year', 'listing_actual_year',
    'sales_target_year', 'sales_actual_year',
    'ciro_target_year', 'ciro_actual_year',
    'transaction_net_ciro_year'
  ],
  
  TRANSACTIONS: [
    'transaction_date', 'due_date', 'sale_price', 'service_fee_rate', 'transaction_type',
    'buyer_service_fee', 'buyer_vat', 'buyer_net_ciro',
    'seller_service_fee', 'seller_vat', 'seller_net_ciro',
    'transaction_total_net_ciro', 'office_share_amount', 'cbtr_share_amount',
    'consultant_net_ciro', 'office_tax', 'cbtr_tax', 'consultant_tax',
    'office_net_after_tax', 'cbtr_net_after_tax', 'consultant_net_after_tax'
  ],
  
  TAX: [
    'metric', 'value', 'notes'
  ],
  
  FX_RATES: [
    'currency_pair', 'open_rate', 'close_rate', 'notes'
  ],
  
  FX_HISTORY: [
    'date', 'usd_try', 'eur_try', 'gbp_try', 'jpy_try', 'chf_try', 'rub_try', 'cny_try'
  ],
  
  DUE_REALLOSS: [
    'transaction_id', 'transaction_date', 'due_date',
    'nominal_amount_try', 'fx_pair', 'fx_rate_at_transaction',
    'fx_rate_at_due_date', 'real_amount_base',
    'due_date_real_amount_try', 'real_gain_loss_try'
  ],

  EXPENSES: [
    'expense_date', 'expense_category', 'expense_amount', 'notes'
  ],
  
  DASH_AGG_FINANCE: [
    'metric', 'value', 'run_at'
  ],
  
  DASH_AGG_FX: [
    'currency_pair', 'open_rate', 'close_rate', 'run_at'
  ]
};

/**
 * Ingest types supported by the system
 */
const INGEST_TYPES = {
  NEW_LEAD: 'new_lead',
  FORM_LEAD: 'form_lead',
  GMAIL_SIGNAL: 'gmail_signal',
  EMAIL_DRAFT_REQUEST: 'email_draft_request',
  DOC_PACKAGE_CREATE: 'doc_package_create',
  DOC_GENERATE_REQUEST: 'doc_generate_request',
  STAGE_TRANSITION: 'stage_transition',
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
 * Allowed ops_log scopes for V1.4.0
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
 * Allowed risk_flags for V1.4.0
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

/**
 * Allowed contact tags taxonomy
 */
const CONTACT_TAGS = [
  'Aileniz',
  'Akrabalarınız',
  'Arkadaşlarınız',
  'Komşularınız',
  'Eski İş Arkadaşlarınız',
  'Gayrimenkul Danışmanları',
  'Öğretmenleriniz / çocuğunuzun öğretmenleri',
  'Kulüpler / Dernekler',
  'Spor Salonu Grubunuz',
  'Kuaförünüz / Berberiniz',
  'Doktorlarınız',
  'Dişçiniz',
  'Bankacınız / Sigortacınız',
  'Eski Okul Arkadaşlarınız',
  'Askerlik Arkadaşlarınız',
  'Eski Komşularınız',
  'Site / Apt. Yönetimi',
  'Avukatınız / Ailenizin Avukatı',
  'Çözüm Ortakları (nakliyeci, boyacı vs.)',
  'Reklamcınız / matbaacınız',
  'Mali Müşaviriniz',
  'Eczacınız',
  'Veterineriniz',
  'Terziniz / Kurutemizlemeciniz',
  'En Sık Gittiğiniz Restoran',
  'Postacınız',
  'Katıldığınız Kurslar',
  'Çocuğunuzun Katıldığı Kurslar',
  'Çiçekçiniz',
  'Eski Müşterileriniz',
  'Sosyal Medyadan Tanıdıklarınız',
  'Kapanan Şirketler',
  'En Sık Alışveriş Yaptığınız Mağazalar',
  'Oto Yıkamacınız',
  'Gönüllü olduğunuz Sivil Toplum Kuruluşları',
  'Çocuğunuzun Veli Grupları',
  'Mahalle Esnafı (kasap / manav vs.)',
  'Arkadaşlarınızın Arkadaşları',
  'En Sık Benzin Aldığınız Yer',
  'Diğer'
];

/**
 * Allowed tag prefixes for dynamic tags (ex: source:..., service:...)
 */
const CONTACT_TAG_PREFIXES = [
  'source',
  'service',
  'budget'
];
// Çağdaş Seçkin Tüfekci - Real Estate Agent
