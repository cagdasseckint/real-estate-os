/**
 * Schema mode detection cache
 */
let _schemaModeCache = {};
const SHEET_DATA_CACHE_TTL_MS = 5000;
let _sheetDataCache = {};

/**
 * Get or create a sheet by name
 * @param {string} name - Sheet name from SHEETS constant
 * @param {boolean} createIfMissing - Create sheet if not found (GREENFIELD only)
 * @returns {Sheet|null} Sheet object or null if not found and createIfMissing=false
 */
function sheet_(name, createIfMissing) {
  if (createIfMissing === undefined) createIfMissing = false;
  
  const ss = getWorkbook_();
  let sheet = ss.getSheetByName(name);
  
  if (sheet) {
    // SCHEMA LOCKED MODE - sheet exists
    _schemaModeCache[name] = 'SCHEMA_LOCKED';
    return sheet;
  }
  
  if (createIfMissing) {
    const schemaMode = cfg_('SCHEMA_MODE', DEFAULTS.SCHEMA_MODE || 'GREENFIELD');
    if (String(schemaMode).toUpperCase() === 'SCHEMA_LOCKED') {
      Logger.log('SCHEMA_LOCKED | Sheet missing: ' + name);
      return null;
    }
    // GREENFIELD MODE - create with canonical headers
    sheet = ss.insertSheet(name);
    _schemaModeCache[name] = 'GREENFIELD';
    
    // Set canonical headers if defined
    if (CANONICAL_HEADERS[name]) {
      sheet.getRange(1, 1, 1, CANONICAL_HEADERS[name].length)
           .setValues([CANONICAL_HEADERS[name]]);
      sheet.getRange(1, 1, 1, CANONICAL_HEADERS[name].length)
           .setFontWeight('bold');
    }
    
    Logger.log('GREENFIELD | Created sheet: ' + name + ' with canonical headers');
    return sheet;
  }
  
  return null;
}

/**
 * Ensure all required sheets exist (GREENFIELD bootstrap)
 * @returns {Object} Status report of sheet creation
 */
function bootstrapSheets_() {
  const report = {
    mode: 'GREENFIELD',
    created: [],
    existing: [],
    errors: []
  };
  
  const requiredSheets = [
    SHEETS.INGEST_QUEUE,
    SHEETS.DLQ,
    SHEETS.JOB_RUN_LOG,
    SHEETS.CONTACTS,
    SHEETS.DEALS,
    SHEETS.TASKS,
    SHEETS.EVENTS,
    SHEETS.APPOINTMENTS,
    SHEETS.DOCS,
    SHEETS.DEDUP_KEYS,
    SHEETS.CONFIG,
    SHEETS.STAGE_AUTOMATIONS,
    SHEETS.TASK_TEMPLATES,
    SHEETS.LEAD_SCORES,
    SHEETS.LEAD_SIGNALS,
    SHEETS.EMAIL_DRAFTS,
    SHEETS.FOLLOWUP_SEQUENCES,
    SHEETS.DOC_PACKAGES,
    SHEETS.DOC_TEMPLATES,
    SHEETS.OPS_DASHBOARD,
    SHEETS.DRIVE_SHARE_AUDIT,
    SHEETS.ACCESS_INVENTORY,
    SHEETS.SECURITY_SOP,
    SHEETS.PROPERTIES,
    SHEETS.AGREEMENTS,
    SHEETS.DOCUMENT_CHECKLISTS,
    SHEETS.VIEWINGS,
    SHEETS.OFFERS,
    SHEETS.PRICE_CHANGES,
    SHEETS.MARKETING_ASSETS,
    SHEETS.CONSENTS,
    SHEETS.CONVERSION_QUEUE,
    SHEETS.DAILY_SNAPSHOT,
    SHEETS.WEEKLY_SUMMARY,
    SHEETS.SMOKE_TEST_LOG,
    SHEETS.UNIFIED_TABLES,
    SHEETS.DASHBOARD_CHARTS,
    SHEETS.DASHBOARD_SUMMARY,
    SHEETS.DASHBOARD_PIPELINE,
    SHEETS.DASHBOARD_LEAD_SOURCES,
    SHEETS.DASHBOARD_SLA,
    SHEETS.REPUTATION_FEEDBACK,
    SHEETS.PORTAL_LINKS,
    SHEETS.OFFLINE_CONVERSIONS,
    SHEETS.CONTENT_LIBRARY,
    SHEETS.ADS_ATTRIBUTION_SUMMARY,
    SHEETS.BOOKING_SUMMARY,
    SHEETS.EMAIL_OUTREACH_SUMMARY,
    SHEETS.TENANTS,
    SHEETS.COURSE_SESSIONS,
    SHEETS.KNOWLEDGE_BASE,
    SHEETS.OPEN_HOUSES,
    SHEETS.OPEN_HOUSE_SIGNINS,
    SHEETS.OPEN_HOUSE_FOLLOWUPS,
    SHEETS.BUYER_PROFILES,
    SHEETS.SELLER_PROFILES,
    SHEETS.TIME_LOGS,
    SHEETS.CHART_OF_ACCOUNTS,
    SHEETS.GENERAL_LEDGER,
    SHEETS.TENANT_LEDGER,
    SHEETS.LANDLORD_LEDGER,
    SHEETS.CLOSING_COSTS,
    SHEETS.LISTING_EXPENSES,
    SHEETS.INVESTMENT_ANALYSIS,
    SHEETS.MORTGAGE_CALC,
    SHEETS.RENT_BUY_ANALYSIS,
    SHEETS.QUOTATIONS,
    SHEETS.INVOICES,
    SHEETS.RECEIPTS,
    SHEETS.PROJECTS,
    SHEETS.MILESTONES,
    SHEETS.PROJECT_BUDGETS,
    SHEETS.ROLE_VIEWS,
    SHEETS.FIN_PARAMS,
    SHEETS.FIN_PLAN,
    SHEETS.FIN_MONTHLY,
    SHEETS.FIN_SUMMARY,
    SHEETS.FIN_TRANSACTIONS,
    SHEETS.FIN_TAX,
    SHEETS.FIN_FX_RATES,
    SHEETS.FIN_FX_HISTORY,
    SHEETS.FIN_DUE_REALLOSS,
    SHEETS.FIN_EXPENSES,
    SHEETS.FIN_DASH_AGG,
    SHEETS.FIN_DASH_FX
  ];
  
  for (const sheetName of requiredSheets) {
    try {
      const ss = getWorkbook_();
      let sheet = ss.getSheetByName(sheetName);
      
      if (sheet) {
        report.existing.push(sheetName);
        // Validate headers in SCHEMA_LOCKED mode
        const headerValidation = validateHeaders_(sheet, sheetName);
        if (!headerValidation.valid) {
          report.errors.push({
            sheet: sheetName,
            issue: 'HEADER_MISMATCH',
            details: headerValidation.mismatches
          });
        }
      } else {
        // Create with canonical headers
        sheet_(sheetName, true);
        report.created.push(sheetName);
      }
    } catch (e) {
      report.errors.push({
        sheet: sheetName,
        issue: 'CREATE_ERROR',
        details: e.message
      });
    }
  }
  
  // Seed default CONFIG values if CONFIG was created
  if (report.created.includes(SHEETS.CONFIG)) {
    seedDefaultConfig_();
  }
  
  if (report.created.includes(SHEETS.TASK_TEMPLATES)) {
    seedDefaultTaskTemplates_();
  }
  
  if (report.created.includes(SHEETS.FOLLOWUP_SEQUENCES)) {
    seedDefaultFollowupSequences_();
  }

  if (report.created.includes(SHEETS.STAGE_AUTOMATIONS)) {
    seedDefaultStageAutomations_();
  }
  
  if (report.created.includes(SHEETS.SECURITY_SOP)) {
    seedSecuritySop_();
  }

  if (report.created.some(name => [
    SHEETS.FIN_PARAMS,
    SHEETS.FIN_PLAN,
    SHEETS.FIN_MONTHLY,
    SHEETS.FIN_SUMMARY,
    SHEETS.FIN_TRANSACTIONS,
    SHEETS.FIN_TAX,
    SHEETS.FIN_FX_RATES,
    SHEETS.FIN_FX_HISTORY,
    SHEETS.FIN_DUE_REALLOSS,
    SHEETS.FIN_EXPENSES,
    SHEETS.FIN_DASH_AGG,
    SHEETS.FIN_DASH_FX
  ].includes(name))) {
    seedFinanceSheets_();
  }

  if (report.created.some(name => [
    SHEETS.CHART_OF_ACCOUNTS,
    SHEETS.GENERAL_LEDGER,
    SHEETS.TENANT_LEDGER,
    SHEETS.LANDLORD_LEDGER
  ].includes(name))) {
    seedDefaultLedgerAccounts_();
  }

  if (report.created.some(name => [
    SHEETS.OPEN_HOUSES,
    SHEETS.OPEN_HOUSE_SIGNINS,
    SHEETS.OPEN_HOUSE_FOLLOWUPS,
    SHEETS.BUYER_PROFILES,
    SHEETS.SELLER_PROFILES,
    SHEETS.TIME_LOGS,
    SHEETS.CLOSING_COSTS,
    SHEETS.LISTING_EXPENSES,
    SHEETS.INVESTMENT_ANALYSIS,
    SHEETS.MORTGAGE_CALC,
    SHEETS.RENT_BUY_ANALYSIS,
    SHEETS.QUOTATIONS,
    SHEETS.INVOICES,
    SHEETS.RECEIPTS,
    SHEETS.PROJECTS,
    SHEETS.MILESTONES,
    SHEETS.PROJECT_BUDGETS,
    SHEETS.ROLE_VIEWS
  ].includes(name))) {
    seedExtensionsDefaults_();
  }

  if (typeof applyUiValidations_ === 'function') {
    applyUiValidations_();
  }
  
  Logger.log('BOOTSTRAP | Report: ' + JSON.stringify(report));
  return report;
}

/**
 * Validate sheet headers against canonical definition
 * @param {Sheet} sheet - Sheet to validate
 * @param {string} sheetName - Sheet name for canonical lookup
 * @returns {Object} Validation result with valid flag and mismatches
 */
function validateHeaders_(sheet, sheetName) {
  const result = { valid: true, mismatches: [], aliasMap: {} };
  
  const canonical = CANONICAL_HEADERS[sheetName];
  if (!canonical) {
    // No canonical definition, assume valid
    return result;
  }
  
  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  const actualHeaders = headerRange.getValues()[0];
  
  // Build alias map for read-only access
  for (let i = 0; i < canonical.length; i++) {
    const expectedCol = canonical[i];
    const actualIdx = actualHeaders.indexOf(expectedCol);
    
    if (actualIdx === -1) {
      // Column missing
      result.mismatches.push({
        expected: expectedCol,
        position: i,
        found: null
      });
      result.valid = false;
    } else if (actualIdx !== i) {
      // Column exists but in different position
      result.aliasMap[expectedCol] = actualIdx;
      result.mismatches.push({
        expected: expectedCol,
        expectedPosition: i,
        actualPosition: actualIdx
      });
      // SCHEMA_LOCKED: don't fail, just build alias map
    } else {
      result.aliasMap[expectedCol] = i;
    }
  }
  
  return result;
}

/**
 * Get column index by name (0-based) with alias support
 * @param {string} sheetName - Sheet name
 * @param {string} columnName - Column name
 * @returns {number} Column index (0-based) or -1 if not found
 */
function getColIndex_(sheetName, columnName) {
  // Prefer actual sheet headers to respect SCHEMA_LOCKED column order
  const sheet = sheet_(sheetName, false);
  if (sheet) {
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const idx = headers.indexOf(columnName);
    if (idx !== -1) return idx;
  }
  
  // Fallback to canonical definition
  const canonical = CANONICAL_HEADERS[sheetName];
  if (canonical) {
    return canonical.indexOf(columnName);
  }
  
  return -1;
}

/**
 * Seed default CONFIG values
 */
function seedDefaultConfig_() {
  const sheet = sheet_(SHEETS.CONFIG, false);
  if (!sheet) return;
  
  const defaults = [
    ['TIMEZONE', DEFAULTS.TIMEZONE, 'System timezone'],
    ['WA_MODE', DEFAULTS.WA_MODE, 'WhatsApp mode: manual_logging'],
    ['WABA_POLICY_MODE', DEFAULTS.WABA_POLICY_MODE, 'WABA policy: draft_only'],
    ['BOOKING_MODE', DEFAULTS.BOOKING_MODE, 'Booking mode: manual'],
    ['SLA_FIRST_TOUCH_MINUTES', DEFAULTS.SLA_FIRST_TOUCH_MINUTES, 'SLA for first touch in minutes'],
    ['FOLLOWUP_48H_ENABLED', DEFAULTS.FOLLOWUP_48H_ENABLED, 'Enable 48h follow-up reminders'],
    ['ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE, 'Batch size for orchestrator jobs'],
    ['GMAIL_SCAN_LABELS', DEFAULTS.GMAIL_SCAN_LABELS, 'Gmail labels to scan (comma-separated)'],
    ['STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD, 'Days before deal is stuck'],
    ['HOT_RESPONSE_MINUTES_THRESHOLD', DEFAULTS.HOT_RESPONSE_MINUTES_THRESHOLD, 'Minutes threshold for hot response'],
    ['SLA_ALERT_RECIPIENTS', DEFAULTS.SLA_ALERT_RECIPIENTS, 'Comma-separated SLA alert recipients'],
    ['LEAD_SCORE_TOP_N', DEFAULTS.LEAD_SCORE_TOP_N, 'Top N leads for follow-up tasks'],
    ['LEAD_SCORE_MIN_THRESHOLD', DEFAULTS.LEAD_SCORE_MIN_THRESHOLD, 'Minimum score for follow-up list'],
    ['FOLLOWUP_SEQUENCE_ENABLED', DEFAULTS.FOLLOWUP_SEQUENCE_ENABLED, 'Enable follow-up sequences'],
    ['EMAIL_DRAFTS_ENABLED', DEFAULTS.EMAIL_DRAFTS_ENABLED, 'Enable Gmail draft queue'],
    ['DOC_PACKAGES_ENABLED', DEFAULTS.DOC_PACKAGES_ENABLED, 'Enable docs packages on deal creation'],
    ['DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID, 'Default folder for generated docs'],
    ['WEEKLY_KPI_RECIPIENTS', DEFAULTS.WEEKLY_KPI_RECIPIENTS, 'Comma-separated KPI email recipients'],
    ['WEEKLY_KPI_ENABLED', DEFAULTS.WEEKLY_KPI_ENABLED, 'Enable weekly KPI report'],
    ['DRIVE_SHARE_AUDIT_ENABLED', DEFAULTS.DRIVE_SHARE_AUDIT_ENABLED, 'Enable drive share audit reporting'],
    ['WINBACK_ENABLED', DEFAULTS.WINBACK_ENABLED, 'Enable win-back sequences for lost deals'],
    ['CLOSE_CHECKLIST_ENABLED', DEFAULTS.CLOSE_CHECKLIST_ENABLED, 'Enable close checklist tasks'],
    ['ARCHIVE_ENABLED', DEFAULTS.ARCHIVE_ENABLED, 'Enable sheet archival for operational tables'],
    ['ARCHIVE_THRESHOLD_INGEST_QUEUE', DEFAULTS.ARCHIVE_THRESHOLD_INGEST_QUEUE, 'Row threshold for INGEST_QUEUE archival'],
    ['ARCHIVE_THRESHOLD_EVENTS', DEFAULTS.ARCHIVE_THRESHOLD_EVENTS, 'Row threshold for EVENTS archival'],
    ['ARCHIVE_SPREADSHEET_ID', DEFAULTS.ARCHIVE_SPREADSHEET_ID, 'Target spreadsheet ID for archives (auto-created if blank)'],
    ['CALENDAR_SYNC_LOOKBACK_DAYS', DEFAULTS.CALENDAR_SYNC_LOOKBACK_DAYS, 'Calendar sync lookback window in days'],
    ['CALENDAR_SYNC_LOOKAHEAD_DAYS', DEFAULTS.CALENDAR_SYNC_LOOKAHEAD_DAYS, 'Calendar sync lookahead window in days'],
    ['SCHEMA_MODE', DEFAULTS.SCHEMA_MODE, 'Schema mode: GREENFIELD or SCHEMA_LOCKED'],
    ['DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY, 'Maximum DLQ retry attempts'],
    ['SMOKE_CHECKED_BY', DEFAULTS.SMOKE_CHECKED_BY, 'Default smoke test checked_by'],
    ['MODULES_CRM_ENABLED', DEFAULTS.MODULES_CRM_ENABLED, 'Enable CRM module (19_CrmPipeline)'],
    ['MODULES_WORKFLOW_ENABLED', DEFAULTS.MODULES_WORKFLOW_ENABLED, 'Enable workflow engine module (20_WorkflowEngine)'],
    ['MODULES_LEAD_CAPTURE_ENABLED', DEFAULTS.MODULES_LEAD_CAPTURE_ENABLED, 'Enable lead capture module (22_LeadCapture)'],
    ['MODULES_OPEN_HOUSE_ENABLED', DEFAULTS.MODULES_OPEN_HOUSE_ENABLED, 'Enable open house/sign-in module'],
    ['MODULES_PROFILES_ENABLED', DEFAULTS.MODULES_PROFILES_ENABLED, 'Enable buyer/seller profile module'],
    ['MODULES_TIMESHEET_ENABLED', DEFAULTS.MODULES_TIMESHEET_ENABLED, 'Enable timesheet/time log module'],
    ['MODULES_LEDGER_ENABLED', DEFAULTS.MODULES_LEDGER_ENABLED, 'Enable chart of accounts/ledger module'],
    ['MODULES_CLOSING_COSTS_ENABLED', DEFAULTS.MODULES_CLOSING_COSTS_ENABLED, 'Enable closing costs breakdown module'],
    ['MODULES_LISTING_EXPENSES_ENABLED', DEFAULTS.MODULES_LISTING_EXPENSES_ENABLED, 'Enable listing expense tracker module'],
    ['MODULES_INVESTMENT_ENABLED', DEFAULTS.MODULES_INVESTMENT_ENABLED, 'Enable investment analysis module'],
    ['MODULES_MORTGAGE_ENABLED', DEFAULTS.MODULES_MORTGAGE_ENABLED, 'Enable mortgage calculators module'],
    ['MODULES_DOCS_BILLING_ENABLED', DEFAULTS.MODULES_DOCS_BILLING_ENABLED, 'Enable quotation/invoice/receipt module'],
    ['MODULES_PROJECTS_ENABLED', DEFAULTS.MODULES_PROJECTS_ENABLED, 'Enable project management module'],
    ['MODULES_UI_VALIDATION_ENABLED', DEFAULTS.MODULES_UI_VALIDATION_ENABLED, 'Enable data validation helper'],
    ['MODULES_ROLE_VIEWS_ENABLED', DEFAULTS.MODULES_ROLE_VIEWS_ENABLED, 'Enable role-based views helper']
  ];
  
  // Append after header row
  if (defaults.length > 0) {
    sheet.getRange(2, 1, defaults.length, 3).setValues(defaults);
  }
  
  Logger.log('CONFIG | Seeded default values');
}

/**
 * Seed default task templates
 */
function seedDefaultTaskTemplates_() {
  const sheet = sheet_(SHEETS.TASK_TEMPLATES, false);
  if (!sheet) return;
  
  const templates = [
    ['first_touch', 'first_touch', 'DEAL', 'İlk temas yap', 'Lead ile ilk iletişimi kur', 'high', 1, '', 1, 'task', ''],
    ['followup_48h', 'followup_48h', 'DEAL', '48 saat takip', '48 saat içinde takip iletişimi yap', 'medium', '', 48, 2, 'task', ''],
    ['close_checklist', 'close_checklist', 'DEAL', 'Closing checklist', 'Kapanış için gerekli tüm maddeleri tamamla', 'high', 1, '', 1, 'task', ''],
    ['portf_yetki_form', 'portf_yetki_form', 'DEAL', 'Yetki belgesi + intranet formu tamamla', 'Yetki belgesi ve intranet formu eksiksiz doldurulacak', 'high', 0, '', '', 'admin', ''],
    ['portf_tapu_copy', 'portf_tapu_copy', 'DEAL', 'Tapu fotokopisi al', 'Tapu fotokopisi sisteme yüklenecek', 'high', 1, '', '', 'admin', ''],
    ['portf_tapu_signature', 'portf_tapu_signature', 'DEAL', 'Tapu sahibi imzası / vekalet al', 'İmza veya vekalet örneği temin edilecek', 'high', 2, '', '', 'admin', ''],
    ['portf_listing_publish', 'portf_listing_publish', 'DEAL', 'İlanları 3 gün içinde yayınla', 'CB, Sahibinden, Hürriyet, Zingat, Emlakjet', 'high', 3, '', '', 'marketing', ''],
    ['portf_listing_content', 'portf_listing_content', 'DEAL', 'İlan içerik kontrolü', 'Başlık küçük harf, 10+ cümle açıklama, çevre/ulaşım bilgisi', 'high', 3, '', '', 'marketing', ''],
    ['portf_branda', 'portf_branda', 'DEAL', 'Branda as ve fotoğrafı ilet', 'Branda fotoğrafı + açık adres', 'medium', 5, '', '', 'onsite', ''],
    ['portf_brochure', 'portf_brochure', 'DEAL', '1000 adet broşür dağıt', '“DUYDUNUZ MU?” broşürü 10 gün içinde dağıtılacak', 'medium', 10, '', '', 'marketing', ''],
    ['portf_newspaper', 'portf_newspaper', 'DEAL', 'Gazete ilanı ver', '10 gün içinde gazeteye ilan', 'medium', 10, '', '', 'marketing', ''],
    ['portf_media_shoot', 'portf_media_shoot', 'DEAL', 'Fotoğraf/video/drone çekimi', '10 gün içinde çekim yapılacak', 'medium', 10, '', '', 'media', ''],
    ['portf_cooperation', 'portf_cooperation', 'DEAL', 'Cooperation çalışması', 'İş ortakları ile portföy iş birliği', 'medium', 7, '', '', 'marketing', ''],
    ['portf_newsletter', 'portf_newsletter', 'DEAL', 'Gayrimenkul haber bülteni', 'Portföy bülteninde yayınla', 'medium', 7, '', '', 'marketing', ''],
    ['portf_profile_mail', 'portf_profile_mail', 'DEAL', 'Hedef profil postalamasi', 'Hedef profile postalama / dağıtım', 'medium', 7, '', '', 'marketing', ''],
    ['portf_door_knock', 'portf_door_knock', 'DEAL', 'Çat kapı alıcılar', 'Bölge içinde çat kapı ziyaretleri', 'medium', 7, '', '', 'onsite', ''],
    ['portf_open_invite', 'portf_open_invite', 'DEAL', 'Açık davet', 'Açık davet / open house planla', 'medium', 14, '', '', 'onsite', ''],
    ['portf_rpa', 'portf_rpa', 'DEAL', 'RPA yap ve mail gönder', 'Sevgi Hançer’e bbc-cc mail', 'high', 2, '', '', 'admin', ''],
    ['portf_social_share', 'portf_social_share', 'DEAL', 'Sosyal medya paylaşımı', 'CB.COM linki ile paylaşım', 'medium', 3, '', '', 'marketing', ''],
    ['portf_referral', 'portf_referral', 'DEAL', 'Referral çalışması', 'Referans kanalıyla portföy duyurusu', 'medium', 7, '', '', 'marketing', ''],
    ['portf_profile_page', 'portf_profile_page', 'DEAL', 'Portföy profil sayfası', 'Portföy profil sayfası hazırla', 'medium', 5, '', '', 'marketing', ''],
    ['portf_mas', 'portf_mas', 'DEAL', 'MAS', 'MAS kanalı üzerinden pazarlama', 'medium', 7, '', '', 'marketing', ''],
    ['portf_buyer_profile', 'portf_buyer_profile', 'DEAL', 'Alıcı profil çalışması', 'Alıcı profili çıkarma ve eşleştirme', 'medium', 7, '', '', 'marketing', ''],
    ['portf_weekly_call', 'portf_weekly_call', 'DEAL', 'Haftalık bilgilendirme araması', 'Cuma/Cumartesi arama yapılacak', 'medium', 7, '', '', 'phone', ''],
    ['portf_presentation_send', 'portf_presentation_send', 'DEAL', 'Sunum dosyası gönder', 'Yetki alan kişiye sunum dosyası e-mail/WhatsApp', 'medium', 3, '', '', 'email', ''],
    ['portf_print_approval', 'portf_print_approval', 'DEAL', 'Branda/afiş/broşür onay al', 'Baskı öncesi ofis direktörü onayı', 'high', 1, '', '', 'admin', '']
  ];
  
  sheet.getRange(2, 1, templates.length, templates[0].length).setValues(templates);
}

/**
 * Seed default follow-up sequence definitions
 */
function seedDefaultFollowupSequences_() {
  const sheet = sheet_(SHEETS.FOLLOWUP_SEQUENCES, false);
  if (!sheet) return;
  
  const steps = JSON.stringify([
    { offset_days: 2, action: 'task', template: 'followup_48h' },
    { offset_days: 7, action: 'email', subject: 'Takip', body: 'Merhaba, tekrar iletişime geçiyorum.' },
    { offset_days: 14, action: 'email', subject: 'Takip - 2', body: 'Merhaba, tekrar dönüş rica ederim.' }
  ]);

  const portfoySteps = JSON.stringify([
    { offset_days: 10, action: 'email', subject: 'Portföy Bilgilendirme Raporu (İlk 10 Gün)', body: 'Merhaba {{owner_name}},\n\nPortföyünüz için ilk 10 gün içinde yapılan çalışmaların özeti:\n- Arayanlar: {{inbound_calls}}\n- Portföyü görenlerin genel fikirleri: {{viewer_feedback}}\n- Teklifler: {{offers_summary}}\n\nNot: Tekliflerin WhatsApp üzerinden yapılmaması, e-posta ya da yüz yüze iletilmesi esastır.\n\nSaygılarımızla,\n{{agent_name}}' },
    { offset_days: 30, action: 'email', subject: 'Portföy Bilgilendirme Raporu (30. Gün)', body: 'Merhaba {{owner_name}},\n\nPortföyünüz için 30. gün raporu:\n- Arayanlar: {{inbound_calls}}\n- Portföyü görenlerin genel fikirleri: {{viewer_feedback}}\n- Teklifler: {{offers_summary}}\n\nSaygılarımızla,\n{{agent_name}}' },
    { offset_days: 50, action: 'email', subject: 'Portföy Bilgilendirme Raporu (50. Gün)', body: 'Merhaba {{owner_name}},\n\nPortföyünüz için 50. gün raporu:\n- Arayanlar: {{inbound_calls}}\n- Portföyü görenlerin genel fikirleri: {{viewer_feedback}}\n- Teklifler: {{offers_summary}}\n\nSaygılarımızla,\n{{agent_name}}' },
    { offset_days: 7, action: 'task', template: 'portf_weekly_call' },
    { offset_days: 3, action: 'task', template: 'portf_social_share' }
  ]);
  
  const rows = [
    ['followup_default', 'Default Follow-up', '*', '*', steps, true],
    ['portfoy_intake', 'Portföy Bilgilendirme', 'SELLER', 'LISTING_SIGNED', portfoySteps, true]
  ];
  
  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}

/**
 * Seed default stage automations
 */
function seedDefaultStageAutomations_() {
  const sheet = sheet_(SHEETS.STAGE_AUTOMATIONS, false);
  if (!sheet) return;

  const rows = [
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_yetki_form'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_tapu_copy'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_tapu_signature'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_listing_publish'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_listing_content'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_branda'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_brochure'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_newspaper'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_media_shoot'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_cooperation'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_newsletter'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_profile_mail'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_door_knock'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_open_invite'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_rpa'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_social_share'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_referral'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_profile_page'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_mas'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_buyer_profile'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_weekly_call'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_presentation_send'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'TASK_TEMPLATE', '', '', 'portf_print_approval'],
    ['SELLER', '*', 'LISTING_SIGNED', '', 'FOLLOWUP_SEQUENCE', '', '', '']
  ];

  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}

/**
 * Seed security SOP checklist
 */
function seedSecuritySop_() {
  const sheet = sheet_(SHEETS.SECURITY_SOP, false);
  if (!sheet) return;
  
  const rows = [
    ['SOP-001', 'Passwords', 'Tek hesap/tek cihaz kuralı uygulanıyor', 'pending', ''],
    ['SOP-002', 'Passwords', 'Paylaşılan parola yok', 'pending', ''],
    ['SOP-003', 'Access', 'Tüm erişimler envantere işlendi', 'pending', ''],
    ['SOP-004', 'Access', 'Ayrılan kullanıcı erişimleri kapatıldı', 'pending', '']
  ];
  
  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}

/**
 * Seed finance sheets with default parameters and formulas.
 */
function seedFinanceSheets_() {
  seedFinanceParams_();
  seedFinancePlan_();
  seedFinanceMonthly_();
  seedFinanceSummary_();
  seedFinanceTransactions_();
  seedFinanceTax_();
  seedFinanceFxRates_();
  seedFinanceFxHistory_();
  seedFinanceDueRealLoss_();
  seedFinanceExpenses_();
}

function seedFinanceParams_() {
  const sheet = sheet_(SHEETS.FIN_PARAMS, false);
  if (!sheet || sheet.getLastRow() > 1) return;

  const rows = [
    ['office_share_rate', 0.455, 'Ofis payı oranı'],
    ['cbtr_share_rate', 0.09, 'CBTR payı oranı'],
    ['default_service_fee_rate', 0.02, 'Varsayılan hizmet bedeli oranı'],
    ['vat_rate', 0.20, 'KDV oranı'],
    ['vat_included', false, 'KDV dahil hesaplama modu (true/false)'],
    ['share_tax_rate', 0.20, 'Pay bazlı stopaj/vergi oranı'],
    ['listing_to_sale_conv_rate', 0.30, 'Yetki → Satış dönüşüm oranı'],
    ['appointment_to_listing_conv_rate', 0.20, 'Randevu → Yetki dönüşüm oranı'],
    ['year_tax_threshold_1', 190000, 'Gelir vergisi 1. dilim üst sınırı'],
    ['year_tax_threshold_2', 400000, 'Gelir vergisi 2. dilim üst sınırı'],
    ['year_tax_threshold_3', 1500000, 'Gelir vergisi 3. dilim üst sınırı'],
    ['year_tax_threshold_4', 5300000, 'Gelir vergisi 4. dilim üst sınırı'],
    ['tax_base_1', 28500, '2. dilim taban vergi tutarı'],
    ['tax_base_2', 70500, '3. dilim taban vergi tutarı'],
    ['tax_base_3', 367500, '4. dilim taban vergi tutarı'],
    ['tax_base_4', 1697500, '5. dilim taban vergi tutarı']
  ];

  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}

function seedFinancePlan_() {
  const sheet = sheet_(SHEETS.FIN_PLAN, false);
  if (!sheet || sheet.getLastRow() > 1) return;

  sheet.getRange('E2').setFormula('=PARAMS!$B$3');
  sheet.getRange('F2').setFormula('=PARAMS!$B$1');
  sheet.getRange('G2').setFormula('=PARAMS!$B$2');
  sheet.getRange('J2').setFormula('=PARAMS!$B$7');
  sheet.getRange('K2').setFormula('=PARAMS!$B$8');

  const formulas = [
    '=IF(C2="","",C2*(F2+G2))',
    '=IF(C2="","",C2*(1-(F2+G2)))',
    '=IF(M2="","",M2-H2-I2)',
    '=IF(AND(D2<>"",E2<>""),D2*E2*(1-(F2+G2)),"")',
    '=IF(O2="","",C2/O2)',
    '=IF(P2="","",P2/12)',
    '=IF(J2="","",P2/J2)',
    '=IF(R2="","",R2/12)',
    '=IF(K2="","",R2/K2)',
    '=IF(T2="","",T2/12)',
    '=IF(C2="","",C2/12)',
    '=IF(M2="","",IFS(M2<=PARAMS!$B$9,M2*0.15,M2<=PARAMS!$B$10,PARAMS!$B$13+(M2-PARAMS!$B$9)*0.20,M2<=PARAMS!$B$11,PARAMS!$B$14+(M2-PARAMS!$B$10)*0.27,M2<=PARAMS!$B$12,PARAMS!$B$15+(M2-PARAMS!$B$11)*0.35,TRUE,PARAMS!$B$16+(M2-PARAMS!$B$12)*0.40))',
    '=IF(M2="","",M2-W2)',
    '=IF(X2="","",X2-H2-I2)'
  ];

  sheet.getRange(2, 12, 1, formulas.length).setFormulas([formulas]);
}

function seedFinanceMonthly_() {
  const sheet = sheet_(SHEETS.FIN_MONTHLY, false);
  if (!sheet || sheet.getLastRow() > 1) return;
  sheet.getRange('E2').setFormula('=IF(AND($A2<>"",$C2<>""),XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$C2),PLAN!$U:$U),"")');
  sheet.getRange('G2').setFormula('=IF(E2=0,"",F2/E2)');
  sheet.getRange('H2').setFormula('=IF(AND($A2<>"",$C2<>""),XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$C2),PLAN!$S:$S),"")');
  sheet.getRange('J2').setFormula('=IF(H2=0,"",I2/H2)');
  sheet.getRange('K2').setFormula('=IF(AND($A2<>"",$C2<>""),XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$C2),PLAN!$Q:$Q),"")');
  sheet.getRange('M2').setFormula('=IF(K2=0,"",L2/K2)');
  sheet.getRange('N2').setFormula('=IF(AND($A2<>"",$C2<>""),XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$C2),PLAN!$V:$V),"")');
  sheet.getRange('P2').setFormula('=IF(N2=0,"",O2/N2)');
  sheet.getRange('Q2').setFormula('=IF(AND(A2<>"",B2<>""),SUMIFS(TRANSACTIONS!$L:$L,TRANSACTIONS!$A:$A,">="&DATE(A2,B2,1),TRANSACTIONS!$A:$A,"<="&EOMONTH(DATE(A2,B2,1),0)),"")');
}

function seedFinanceSummary_() {
  const sheet = sheet_(SHEETS.FIN_SUMMARY, false);
  if (!sheet || sheet.getLastRow() > 1) return;

  const formulas = [
    '=IF(AND($A2<>"",$B2<>""),XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$B2),PLAN!$T:$T),"")',
    '=IF(AND($A2<>"",$B2<>""),SUMIFS(MONTHLY!F:F,MONTHLY!A:A,A2,MONTHLY!C:C,B2),"")',
    '=IF(AND($A2<>"",$B2<>""),XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$B2),PLAN!$R:$R),"")',
    '=IF(AND($A2<>"",$B2<>""),SUMIFS(MONTHLY!I:I,MONTHLY!A:A,A2,MONTHLY!C:C,B2),"")',
    '=IF(AND($A2<>"",$B2<>""),XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$B2),PLAN!$P:$P),"")',
    '=IF(AND($A2<>"",$B2<>""),SUMIFS(MONTHLY!L:L,MONTHLY!A:A,A2,MONTHLY!C:C,B2),"")',
    '=IF(AND($A2<>"",$B2<>""),XLOOKUP(1,(PLAN!$A:$A=$A2)*(PLAN!$B:$B=$B2),PLAN!$C:$C),"")',
    '=IF(AND($A2<>"",$B2<>""),SUMIFS(MONTHLY!O:O,MONTHLY!A:A,A2,MONTHLY!C:C,B2),"")',
    '=IF(A2<>"",SUMIFS(TRANSACTIONS!$L:$L,TRANSACTIONS!$A:$A,">="&DATE(A2,1,1),TRANSACTIONS!$A:$A,"<="&DATE(A2,12,31)),"")'
  ];

  sheet.getRange(2, 3, 1, formulas.length).setFormulas([formulas]);
}

function seedFinanceTransactions_() {
  const sheet = sheet_(SHEETS.FIN_TRANSACTIONS, false);
  if (!sheet || sheet.getLastRow() > 1) return;

  sheet.getRange('D2').setFormula('=IF(C2="","",PARAMS!$B$3)');
  sheet.getRange('E2').setValue('Çift');

  const formulas = [
    '=IF(C2="","",IF(PARAMS!$B$5,C2*D2*IF(OR(E2="Çift",E2=""),2,1)/(1+PARAMS!$B$4),C2*D2*IF(OR(E2="Çift",E2=""),2,1)))',
    '=IF(F2="","",F2*PARAMS!$B$4)',
    '=IF(F2="","",F2+G2)',
    '=IF(OR(E2="Alıcı",E2="Çift",E2=""),IF(PARAMS!$B$5,C2*D2/(1+PARAMS!$B$4),C2*D2),0)',
    '=IF(I2="","",I2*PARAMS!$B$4)',
    '=IF(I2="","",I2+J2)',
    '=IF(H2="","",H2+K2)',
    '=IF(L2="","",L2*PARAMS!$B$1)',
    '=IF(L2="","",L2*PARAMS!$B$2)',
    '=IF(L2="","",L2-(M2+N2))',
    '=IF(M2="","",M2*PARAMS!$B$6)',
    '=IF(N2="","",N2*PARAMS!$B$6)',
    '=IF(O2="","",O2*PARAMS!$B$6)',
    '=IF(M2="","",M2-P2)',
    '=IF(N2="","",N2-Q2)',
    '=IF(O2="","",O2-R2)'
  ];

  sheet.getRange(2, 6, 1, formulas.length).setFormulas([formulas]);
}

function seedFinanceTax_() {
  const sheet = sheet_(SHEETS.FIN_TAX, false);
  if (!sheet || sheet.getLastRow() > 1) return;

  const rows = [
    ['annual_net_income', '', 'Danışman net geliri (yıllık)'],
    ['annual_income_tax', '', 'Gelir vergisi (yıllık)'],
    ['monthly_tax_accrual', '', 'Aylık vergi karşılığı']
  ];

  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  sheet.getRange(2, 2).setFormula('=SUM(TRANSACTIONS!O:O)');
  sheet.getRange(3, 2).setFormula('=IFS(B2<=PARAMS!$B$9,B2*0.15,B2<=PARAMS!$B$10,PARAMS!$B$13+(B2-PARAMS!$B$9)*0.20,B2<=PARAMS!$B$11,PARAMS!$B$14+(B2-PARAMS!$B$10)*0.27,B2<=PARAMS!$B$12,PARAMS!$B$15+(B2-PARAMS!$B$11)*0.35,TRUE,PARAMS!$B$16+(B2-PARAMS!$B$12)*0.40)');
  sheet.getRange(4, 2).setFormula('=IF(B3="","",B3/12)');
}

function seedFinanceFxRates_() {
  const sheet = sheet_(SHEETS.FIN_FX_RATES, false);
  if (!sheet || sheet.getLastRow() > 1) return;

  const rows = [
    ['USDTRY', '', '', 'USD/TRY açılış-kapanış'],
    ['EURTRY', '', '', 'EUR/TRY açılış-kapanış'],
    ['GBPTRY', '', '', 'GBP/TRY açılış-kapanış'],
    ['EURUSD', '', '', 'EUR/USD açılış-kapanış'],
    ['JPYTRY', '', '', 'JPY/TRY açılış-kapanış'],
    ['CHFTRY', '', '', 'CHF/TRY açılış-kapanış'],
    ['RUBTRY', '', '', 'RUB/TRY açılış-kapanış'],
    ['CNYTRY', '', '', 'CNY/TRY açılış-kapanış']
  ];

  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);

  for (let i = 0; i < rows.length; i++) {
    const rowIndex = i + 2;
    const pair = rows[i][0];
    sheet.getRange(rowIndex, 2).setFormula('=IFERROR(INDEX(GOOGLEFINANCE("CURRENCY:' + pair + '","open",TODAY()),2,2),"")');
    sheet.getRange(rowIndex, 3).setFormula('=IFERROR(INDEX(GOOGLEFINANCE("CURRENCY:' + pair + '","price",TODAY()-1),2,2),"")');
  }
}

function seedFinanceFxHistory_() {
  const sheet = sheet_(SHEETS.FIN_FX_HISTORY, false);
  if (!sheet || sheet.getLastRow() > 1) return;

  sheet.getRange(2, 1).setFormula('=GOOGLEFINANCE("CURRENCY:USDTRY","price",TODAY()-365,TODAY(),"DAILY")');
  sheet.getRange(2, 3).setFormula('=ARRAYFORMULA(IF(A2:A="",,VLOOKUP(A2:A,GOOGLEFINANCE("CURRENCY:EURTRY","price",TODAY()-365,TODAY(),"DAILY"),2,false)))');
  sheet.getRange(2, 4).setFormula('=ARRAYFORMULA(IF(A2:A="",,VLOOKUP(A2:A,GOOGLEFINANCE("CURRENCY:GBPTRY","price",TODAY()-365,TODAY(),"DAILY"),2,false)))');
  sheet.getRange(2, 5).setFormula('=ARRAYFORMULA(IF(A2:A="",,VLOOKUP(A2:A,GOOGLEFINANCE("CURRENCY:JPYTRY","price",TODAY()-365,TODAY(),"DAILY"),2,false)))');
  sheet.getRange(2, 6).setFormula('=ARRAYFORMULA(IF(A2:A="",,VLOOKUP(A2:A,GOOGLEFINANCE("CURRENCY:CHFTRY","price",TODAY()-365,TODAY(),"DAILY"),2,false)))');
  sheet.getRange(2, 7).setFormula('=ARRAYFORMULA(IF(A2:A="",,VLOOKUP(A2:A,GOOGLEFINANCE("CURRENCY:RUBTRY","price",TODAY()-365,TODAY(),"DAILY"),2,false)))');
  sheet.getRange(2, 8).setFormula('=ARRAYFORMULA(IF(A2:A="",,VLOOKUP(A2:A,GOOGLEFINANCE("CURRENCY:CNYTRY","price",TODAY()-365,TODAY(),"DAILY"),2,false)))');
}

function seedFinanceDueRealLoss_() {
  const sheet = sheet_(SHEETS.FIN_DUE_REALLOSS, false);
  if (!sheet || sheet.getLastRow() > 1) return;

  sheet.getRange('E2').setValue('USDTRY');

  sheet.getRange('A2').setFormula('=IF(TRANSACTIONS!A2="","",ROW()-1)');
  sheet.getRange('B2').setFormula('=IF(TRANSACTIONS!A2="","",TRANSACTIONS!A2)');
  sheet.getRange('C2').setFormula('=IF(TRANSACTIONS!B2="","",TRANSACTIONS!B2)');
  sheet.getRange('D2').setFormula('=IF(TRANSACTIONS!O2="","",TRANSACTIONS!O2)');
  sheet.getRange('F2').setFormula('=IF(E2="","",SWITCH(E2,"USDTRY",XLOOKUP(B2,FX_HISTORY!$A:$A,FX_HISTORY!$B:$B),"EURTRY",XLOOKUP(B2,FX_HISTORY!$A:$A,FX_HISTORY!$C:$C),"GBPTRY",XLOOKUP(B2,FX_HISTORY!$A:$A,FX_HISTORY!$D:$D),"JPYTRY",XLOOKUP(B2,FX_HISTORY!$A:$A,FX_HISTORY!$E:$E),"CHFTRY",XLOOKUP(B2,FX_HISTORY!$A:$A,FX_HISTORY!$F:$F),"RUBTRY",XLOOKUP(B2,FX_HISTORY!$A:$A,FX_HISTORY!$G:$G),"CNYTRY",XLOOKUP(B2,FX_HISTORY!$A:$A,FX_HISTORY!$H:$H),""))');
  sheet.getRange('G2').setFormula('=IF(E2="","",SWITCH(E2,"USDTRY",XLOOKUP(C2,FX_HISTORY!$A:$A,FX_HISTORY!$B:$B),"EURTRY",XLOOKUP(C2,FX_HISTORY!$A:$A,FX_HISTORY!$C:$C),"GBPTRY",XLOOKUP(C2,FX_HISTORY!$A:$A,FX_HISTORY!$D:$D),"JPYTRY",XLOOKUP(C2,FX_HISTORY!$A:$A,FX_HISTORY!$E:$E),"CHFTRY",XLOOKUP(C2,FX_HISTORY!$A:$A,FX_HISTORY!$F:$F),"RUBTRY",XLOOKUP(C2,FX_HISTORY!$A:$A,FX_HISTORY!$G:$G),"CNYTRY",XLOOKUP(C2,FX_HISTORY!$A:$A,FX_HISTORY!$H:$H),""))');
  sheet.getRange('H2').setFormula('=IF(F2="","",D2/F2)');
  sheet.getRange('I2').setFormula('=IF(AND(H2<>"",G2<>""),H2*G2,"")');
  sheet.getRange('J2').setFormula('=IF(I2="","",I2-D2)');
}

function seedFinanceExpenses_() {
  const sheet = sheet_(SHEETS.FIN_EXPENSES, false);
  if (!sheet || sheet.getLastRow() > 1) return;

  const rows = [
    [new Date(), 'Reklam', '', 'Örnek gider satırı'],
    [new Date(), 'Yaşam', '', 'Örnek gider satırı']
  ];

  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}

/**
 * Seed chart of accounts and ledger templates.
 */
function seedDefaultLedgerAccounts_() {
  const accountsSheet = sheet_(SHEETS.CHART_OF_ACCOUNTS, false);
  if (accountsSheet && accountsSheet.getLastRow() <= 1) {
    const rows = [
      ['COA-1000', 'Cash', 'Asset', 'Current Assets', true, ''],
      ['COA-1100', 'Accounts Receivable', 'Asset', 'Current Assets', true, ''],
      ['COA-2000', 'Accounts Payable', 'Liability', 'Current Liabilities', true, ''],
      ['COA-4000', 'Commission Income', 'Revenue', 'Sales', true, ''],
      ['COA-5000', 'Marketing Expenses', 'Expense', 'Operating Expenses', true, ''],
      ['COA-5100', 'Travel Expenses', 'Expense', 'Operating Expenses', true, ''],
      ['COA-5200', 'Professional Fees', 'Expense', 'Operating Expenses', true, '']
    ];
    accountsSheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  }
}

/**
 * Seed extension modules with starter rows.
 */
function seedExtensionsDefaults_() {
  const roleSheet = sheet_(SHEETS.ROLE_VIEWS, false);
  if (roleSheet && roleSheet.getLastRow() <= 1) {
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    const rows = [
      ['VIEW-AGENT', 'agent', 'DASHBOARD_SUMMARY', JSON.stringify({}), now, 'Default agent KPI view'],
      ['VIEW-BROKER', 'broker', 'DASHBOARD_PIPELINE', JSON.stringify({}), now, 'Default broker pipeline view'],
      ['VIEW-ACCOUNTING', 'accounting', 'FIN_DASH_AGG', JSON.stringify({}), now, 'Default finance summary view']
    ];
    roleSheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  }
}

/**
 * Get all data from a sheet as array of objects
 * @param {string} sheetName - Sheet name
 * @returns {Array<Object>} Array of row objects with column names as keys
 */
function getSheetData_(sheetName) {
  const sheet = sheet_(sheetName, false);
  if (!sheet) return [];

  const cached = _sheetDataCache[sheetName];
  const now = Date.now();
  if (cached && (now - cached.cached_at) < SHEET_DATA_CACHE_TTL_MS) {
    return cached.rows;
  }

  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return []; // Header only

  const headers = data[0];
  const rows = [];

  for (let i = 1; i < data.length; i++) {
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = data[i][j];
    }
    row._rowIndex = i + 1; // 1-based sheet row number
    rows.push(row);
  }

  _sheetDataCache[sheetName] = {
    cached_at: now,
    rows: rows
  };

  return rows;
}

/**
 * Append a row to a sheet
 * @param {string} sheetName - Sheet name
 * @param {Object} rowData - Object with column names as keys
 * @returns {number} New row number (1-based)
 */
function appendRow_(sheetName, rowData) {
  const sheet = sheet_(sheetName, true);
  if (!sheet) {
    const message = 'APPEND_ROW | Sheet not found: ' + sheetName;
    Logger.log(message);
    throw new Error(message);
  }
  const actualHeaders = sheet.getLastColumn() > 0
    ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    : [];
  const canonicalHeaders = CANONICAL_HEADERS[sheetName] || [];
  const headers = actualHeaders && actualHeaders.length > 0 && actualHeaders.some(h => h)
    ? actualHeaders
    : (canonicalHeaders.length > 0 ? canonicalHeaders : Object.keys(rowData || {}));

  const rowArray = headers.map(col => rowData[col] !== undefined ? rowData[col] : '');
  sheet.appendRow(rowArray);
  invalidateSheetCache_(sheetName);
  
  return sheet.getLastRow();
}

/**
 * Update a specific cell in a sheet
 * @param {string} sheetName - Sheet name
 * @param {number} rowIndex - Row number (1-based)
 * @param {string} columnName - Column name
 * @param {*} value - New value
 */
function updateCell_(sheetName, rowIndex, columnName, value) {
  const sheet = sheet_(sheetName, false);
  if (!sheet) return;
  
  const colIdx = getColIndex_(sheetName, columnName);
  if (colIdx === -1) return;
  
  sheet.getRange(rowIndex, colIdx + 1).setValue(value);
  invalidateSheetCache_(sheetName);
}

/**
 * Update multiple cells in a row
 * @param {string} sheetName - Sheet name
 * @param {number} rowIndex - Row number (1-based)
 * @param {Object} updates - Object with column names as keys
 */
function updateRow_(sheetName, rowIndex, updates) {
  const sheet = sheet_(sheetName, false);
  if (!sheet) return;

  const lastColumn = sheet.getLastColumn();
  if (lastColumn === 0) return;
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const rowRange = sheet.getRange(rowIndex, 1, 1, lastColumn);
  const rowValues = rowRange.getValues()[0];

  for (const [colName, value] of Object.entries(updates)) {
    const colIdx = headers.indexOf(colName);
    if (colIdx !== -1) {
      rowValues[colIdx] = value;
    }
  }

  rowRange.setValues([rowValues]);
  invalidateSheetCache_(sheetName);
}

/**
 * Invalidate cached sheet data.
 * @param {string} sheetName - Sheet name
 */
function invalidateSheetCache_(sheetName) {
  if (!sheetName) return;
  delete _sheetDataCache[sheetName];
}

/**
 * Get or create the archive spreadsheet ID.
 * @returns {string|null} Spreadsheet ID or null if disabled.
 */
function getArchiveSpreadsheetId_() {
  if (!cfg_('ARCHIVE_ENABLED', DEFAULTS.ARCHIVE_ENABLED)) return null;
  let archiveId = cfg_('ARCHIVE_SPREADSHEET_ID', DEFAULTS.ARCHIVE_SPREADSHEET_ID);
  if (archiveId) return archiveId;
  
  const ss = SpreadsheetApp.create('CB-OS Archive');
  archiveId = ss.getId();
  setConfigValue_('ARCHIVE_SPREADSHEET_ID', archiveId, 'Auto-created archive spreadsheet ID');
  return archiveId;
}

/**
 * Ensure a sheet exists inside archive spreadsheet with canonical headers.
 * @param {Spreadsheet} archiveSs - Archive spreadsheet instance
 * @param {string} sheetName - Sheet name to ensure
 * @returns {Sheet|null} Archive sheet
 */
function ensureArchiveSheet_(archiveSs, sheetName) {
  if (!archiveSs) return null;
  let sheet = archiveSs.getSheetByName(sheetName);
  if (sheet) return sheet;
  
  sheet = archiveSs.insertSheet(sheetName);
  const headers = CANONICAL_HEADERS[sheetName] || [];
  if (headers.length > 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

/**
 * Archive oldest rows for a sheet when row threshold is exceeded.
 * @param {string} sheetName - Source sheet name
 * @param {number} threshold - Max number of data rows to keep
 * @returns {Object} Archive result
 */
function archiveRowsIfNeeded_(sheetName, threshold) {
  if (!cfg_('ARCHIVE_ENABLED', DEFAULTS.ARCHIVE_ENABLED)) {
    return { archived: 0, skipped: true, reason: 'ARCHIVE_DISABLED' };
  }
  
  const sheet = sheet_(sheetName, false);
  if (!sheet) return { archived: 0, skipped: true, reason: 'SHEET_MISSING' };
  
  const dataRows = sheet.getLastRow() - 1;
  if (dataRows <= (threshold || 0)) {
    return { archived: 0, skipped: true, reason: 'BELOW_THRESHOLD' };
  }
  
  const rowsToArchive = dataRows - threshold;
  if (rowsToArchive <= 0) return { archived: 0, skipped: true, reason: 'NO_ROWS' };
  
  const archiveId = getArchiveSpreadsheetId_();
  if (!archiveId) return { archived: 0, skipped: true, reason: 'ARCHIVE_ID_MISSING' };
  const archiveSs = SpreadsheetApp.openById(archiveId);
  const archiveSheet = ensureArchiveSheet_(archiveSs, sheetName);
  if (!archiveSheet) return { archived: 0, skipped: true, reason: 'ARCHIVE_SHEET_MISSING' };
  
  const columnCount = sheet.getLastColumn();
  const sourceRange = sheet.getRange(2, 1, rowsToArchive, columnCount);
  const values = sourceRange.getValues();
  
  const archiveStartRow = archiveSheet.getLastRow() + 1;
  archiveSheet.getRange(archiveStartRow, 1, values.length, values[0].length).setValues(values);
  
  sheet.deleteRows(2, rowsToArchive);
  
  Logger.log('ARCHIVE | ' + sheetName + ' archived rows=' + rowsToArchive + ' to spreadsheet=' + archiveId);
  
  return { archived: rowsToArchive, skipped: false };
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
