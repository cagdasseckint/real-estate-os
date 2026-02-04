// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 03_SheetsRepo.gs
 * CB-OS V1.0 - 03_SheetsRepo.gs
// EXPLAIN: * Sheet access, creation, and schema management
 * Sheet access, creation, and schema management
// EXPLAIN: * Handles GREENFIELD and SCHEMA_LOCKED modes
 * Handles GREENFIELD and SCHEMA_LOCKED modes
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Schema mode detection cache
 * Schema mode detection cache
// EXPLAIN: */
 */
// EXPLAIN: let _schemaModeCache = {};
let _schemaModeCache = {};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Get or create a sheet by name
 * Get or create a sheet by name
// EXPLAIN: * @param {string} name - Sheet name from SHEETS constant
 * @param {string} name - Sheet name from SHEETS constant
// EXPLAIN: * @param {boolean} createIfMissing - Create sheet if not found (GREENFIELD only)
 * @param {boolean} createIfMissing - Create sheet if not found (GREENFIELD only)
// EXPLAIN: * @returns {Sheet|null} Sheet object or null if not found and createIfMissing=false
 * @returns {Sheet|null} Sheet object or null if not found and createIfMissing=false
// EXPLAIN: */
 */
// EXPLAIN: function sheet_(name, createIfMissing) {
function sheet_(name, createIfMissing) {
// EXPLAIN: if (createIfMissing === undefined) createIfMissing = false;
  if (createIfMissing === undefined) createIfMissing = false;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const ss = getWorkbook_();
  const ss = getWorkbook_();
// EXPLAIN: let sheet = ss.getSheetByName(name);
  let sheet = ss.getSheetByName(name);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (sheet) {
  if (sheet) {
// EXPLAIN: // SCHEMA LOCKED MODE - sheet exists
    // SCHEMA LOCKED MODE - sheet exists
// EXPLAIN: _schemaModeCache[name] = 'SCHEMA_LOCKED';
    _schemaModeCache[name] = 'SCHEMA_LOCKED';
// EXPLAIN: return sheet;
    return sheet;
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (createIfMissing) {
  if (createIfMissing) {
// EXPLAIN: // GREENFIELD MODE - create with canonical headers
    // GREENFIELD MODE - create with canonical headers
// EXPLAIN: sheet = ss.insertSheet(name);
    sheet = ss.insertSheet(name);
// EXPLAIN: _schemaModeCache[name] = 'GREENFIELD';
    _schemaModeCache[name] = 'GREENFIELD';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Set canonical headers if defined
    // Set canonical headers if defined
// EXPLAIN: if (CANONICAL_HEADERS[name]) {
    if (CANONICAL_HEADERS[name]) {
// EXPLAIN: sheet.getRange(1, 1, 1, CANONICAL_HEADERS[name].length)
      sheet.getRange(1, 1, 1, CANONICAL_HEADERS[name].length)
// EXPLAIN: .setValues([CANONICAL_HEADERS[name]]);
           .setValues([CANONICAL_HEADERS[name]]);
// EXPLAIN: sheet.getRange(1, 1, 1, CANONICAL_HEADERS[name].length)
      sheet.getRange(1, 1, 1, CANONICAL_HEADERS[name].length)
// EXPLAIN: .setFontWeight('bold');
           .setFontWeight('bold');
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: Logger.log('GREENFIELD | Created sheet: ' + name + ' with canonical headers');
    Logger.log('GREENFIELD | Created sheet: ' + name + ' with canonical headers');
// EXPLAIN: return sheet;
    return sheet;
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return null;
  return null;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Ensure all required sheets exist (GREENFIELD bootstrap)
 * Ensure all required sheets exist (GREENFIELD bootstrap)
// EXPLAIN: * @returns {Object} Status report of sheet creation
 * @returns {Object} Status report of sheet creation
// EXPLAIN: */
 */
// EXPLAIN: function bootstrapSheets_() {
function bootstrapSheets_() {
// EXPLAIN: const report = {
  const report = {
// EXPLAIN: mode: 'GREENFIELD',
    mode: 'GREENFIELD',
// EXPLAIN: created: [],
    created: [],
// EXPLAIN: existing: [],
    existing: [],
// EXPLAIN: errors: []
    errors: []
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const requiredSheets = [
  const requiredSheets = [
// EXPLAIN: SHEETS.INGEST_QUEUE,
    SHEETS.INGEST_QUEUE,
// EXPLAIN: SHEETS.DLQ,
    SHEETS.DLQ,
// EXPLAIN: SHEETS.JOB_RUN_LOG,
    SHEETS.JOB_RUN_LOG,
// EXPLAIN: SHEETS.CONTACTS,
    SHEETS.CONTACTS,
// EXPLAIN: SHEETS.DEALS,
    SHEETS.DEALS,
// EXPLAIN: SHEETS.TASKS,
    SHEETS.TASKS,
// EXPLAIN: SHEETS.EVENTS,
    SHEETS.EVENTS,
// EXPLAIN: SHEETS.APPOINTMENTS,
    SHEETS.APPOINTMENTS,
// EXPLAIN: SHEETS.DOCS,
    SHEETS.DOCS,
// EXPLAIN: SHEETS.DEDUP_KEYS,
    SHEETS.DEDUP_KEYS,
// EXPLAIN: SHEETS.CONFIG,
    SHEETS.CONFIG,
// EXPLAIN: SHEETS.STAGE_AUTOMATIONS,
    SHEETS.STAGE_AUTOMATIONS,
// EXPLAIN: SHEETS.TASK_TEMPLATES,
    SHEETS.TASK_TEMPLATES,
// EXPLAIN: SHEETS.LEAD_SCORES,
    SHEETS.LEAD_SCORES,
// EXPLAIN: SHEETS.LEAD_SIGNALS,
    SHEETS.LEAD_SIGNALS,
// EXPLAIN: SHEETS.EMAIL_DRAFTS,
    SHEETS.EMAIL_DRAFTS,
// EXPLAIN: SHEETS.FOLLOWUP_SEQUENCES,
    SHEETS.FOLLOWUP_SEQUENCES,
// EXPLAIN: SHEETS.DOC_PACKAGES,
    SHEETS.DOC_PACKAGES,
// EXPLAIN: SHEETS.DOC_TEMPLATES,
    SHEETS.DOC_TEMPLATES,
// EXPLAIN: SHEETS.OPS_DASHBOARD,
    SHEETS.OPS_DASHBOARD,
// EXPLAIN: SHEETS.DRIVE_SHARE_AUDIT,
    SHEETS.DRIVE_SHARE_AUDIT,
// EXPLAIN: SHEETS.ACCESS_INVENTORY,
    SHEETS.ACCESS_INVENTORY,
// EXPLAIN: SHEETS.SECURITY_SOP,
    SHEETS.SECURITY_SOP,
// EXPLAIN: SHEETS.PROPERTIES,
    SHEETS.PROPERTIES,
// EXPLAIN: SHEETS.AGREEMENTS,
    SHEETS.AGREEMENTS,
// EXPLAIN: SHEETS.DOCUMENT_CHECKLISTS,
    SHEETS.DOCUMENT_CHECKLISTS,
// EXPLAIN: SHEETS.VIEWINGS,
    SHEETS.VIEWINGS,
// EXPLAIN: SHEETS.OFFERS,
    SHEETS.OFFERS,
// EXPLAIN: SHEETS.PRICE_CHANGES,
    SHEETS.PRICE_CHANGES,
// EXPLAIN: SHEETS.MARKETING_ASSETS,
    SHEETS.MARKETING_ASSETS,
// EXPLAIN: SHEETS.CONSENTS,
    SHEETS.CONSENTS,
// EXPLAIN: SHEETS.CONVERSION_QUEUE
    SHEETS.CONVERSION_QUEUE
// EXPLAIN: ];
  ];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const sheetName of requiredSheets) {
  for (const sheetName of requiredSheets) {
// EXPLAIN: try {
    try {
// EXPLAIN: const ss = getWorkbook_();
      const ss = getWorkbook_();
// EXPLAIN: let sheet = ss.getSheetByName(sheetName);
      let sheet = ss.getSheetByName(sheetName);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: if (sheet) {
      if (sheet) {
// EXPLAIN: report.existing.push(sheetName);
        report.existing.push(sheetName);
// EXPLAIN: // Validate headers in SCHEMA_LOCKED mode
        // Validate headers in SCHEMA_LOCKED mode
// EXPLAIN: const headerValidation = validateHeaders_(sheet, sheetName);
        const headerValidation = validateHeaders_(sheet, sheetName);
// EXPLAIN: if (!headerValidation.valid) {
        if (!headerValidation.valid) {
// EXPLAIN: report.errors.push({
          report.errors.push({
// EXPLAIN: sheet: sheetName,
            sheet: sheetName,
// EXPLAIN: issue: 'HEADER_MISMATCH',
            issue: 'HEADER_MISMATCH',
// EXPLAIN: details: headerValidation.mismatches
            details: headerValidation.mismatches
// EXPLAIN: });
          });
// EXPLAIN: }
        }
// EXPLAIN: } else {
      } else {
// EXPLAIN: // Create with canonical headers
        // Create with canonical headers
// EXPLAIN: sheet_(sheetName, true);
        sheet_(sheetName, true);
// EXPLAIN: report.created.push(sheetName);
        report.created.push(sheetName);
// EXPLAIN: }
      }
// EXPLAIN: } catch (e) {
    } catch (e) {
// EXPLAIN: report.errors.push({
      report.errors.push({
// EXPLAIN: sheet: sheetName,
        sheet: sheetName,
// EXPLAIN: issue: 'CREATE_ERROR',
        issue: 'CREATE_ERROR',
// EXPLAIN: details: e.message
        details: e.message
// EXPLAIN: });
      });
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Seed default CONFIG values if CONFIG was created
  // Seed default CONFIG values if CONFIG was created
// EXPLAIN: if (report.created.includes(SHEETS.CONFIG)) {
  if (report.created.includes(SHEETS.CONFIG)) {
// EXPLAIN: seedDefaultConfig_();
    seedDefaultConfig_();
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (report.created.includes(SHEETS.TASK_TEMPLATES)) {
  if (report.created.includes(SHEETS.TASK_TEMPLATES)) {
// EXPLAIN: seedDefaultTaskTemplates_();
    seedDefaultTaskTemplates_();
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (report.created.includes(SHEETS.FOLLOWUP_SEQUENCES)) {
  if (report.created.includes(SHEETS.FOLLOWUP_SEQUENCES)) {
// EXPLAIN: seedDefaultFollowupSequences_();
    seedDefaultFollowupSequences_();
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (report.created.includes(SHEETS.SECURITY_SOP)) {
  if (report.created.includes(SHEETS.SECURITY_SOP)) {
// EXPLAIN: seedSecuritySop_();
    seedSecuritySop_();
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('BOOTSTRAP | Report: ' + JSON.stringify(report));
  Logger.log('BOOTSTRAP | Report: ' + JSON.stringify(report));
// EXPLAIN: return report;
  return report;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Validate sheet headers against canonical definition
 * Validate sheet headers against canonical definition
// EXPLAIN: * @param {Sheet} sheet - Sheet to validate
 * @param {Sheet} sheet - Sheet to validate
// EXPLAIN: * @param {string} sheetName - Sheet name for canonical lookup
 * @param {string} sheetName - Sheet name for canonical lookup
// EXPLAIN: * @returns {Object} Validation result with valid flag and mismatches
 * @returns {Object} Validation result with valid flag and mismatches
// EXPLAIN: */
 */
// EXPLAIN: function validateHeaders_(sheet, sheetName) {
function validateHeaders_(sheet, sheetName) {
// EXPLAIN: const result = { valid: true, mismatches: [], aliasMap: {} };
  const result = { valid: true, mismatches: [], aliasMap: {} };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const canonical = CANONICAL_HEADERS[sheetName];
  const canonical = CANONICAL_HEADERS[sheetName];
// EXPLAIN: if (!canonical) {
  if (!canonical) {
// EXPLAIN: // No canonical definition, assume valid
    // No canonical definition, assume valid
// EXPLAIN: return result;
    return result;
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
// EXPLAIN: const actualHeaders = headerRange.getValues()[0];
  const actualHeaders = headerRange.getValues()[0];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Build alias map for read-only access
  // Build alias map for read-only access
// EXPLAIN: for (let i = 0; i < canonical.length; i++) {
  for (let i = 0; i < canonical.length; i++) {
// EXPLAIN: const expectedCol = canonical[i];
    const expectedCol = canonical[i];
// EXPLAIN: const actualIdx = actualHeaders.indexOf(expectedCol);
    const actualIdx = actualHeaders.indexOf(expectedCol);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: if (actualIdx === -1) {
    if (actualIdx === -1) {
// EXPLAIN: // Column missing
      // Column missing
// EXPLAIN: result.mismatches.push({
      result.mismatches.push({
// EXPLAIN: expected: expectedCol,
        expected: expectedCol,
// EXPLAIN: position: i,
        position: i,
// EXPLAIN: found: null
        found: null
// EXPLAIN: });
      });
// EXPLAIN: result.valid = false;
      result.valid = false;
// EXPLAIN: } else if (actualIdx !== i) {
    } else if (actualIdx !== i) {
// EXPLAIN: // Column exists but in different position
      // Column exists but in different position
// EXPLAIN: result.aliasMap[expectedCol] = actualIdx;
      result.aliasMap[expectedCol] = actualIdx;
// EXPLAIN: result.mismatches.push({
      result.mismatches.push({
// EXPLAIN: expected: expectedCol,
        expected: expectedCol,
// EXPLAIN: expectedPosition: i,
        expectedPosition: i,
// EXPLAIN: actualPosition: actualIdx
        actualPosition: actualIdx
// EXPLAIN: });
      });
// EXPLAIN: // SCHEMA_LOCKED: don't fail, just build alias map
      // SCHEMA_LOCKED: don't fail, just build alias map
// EXPLAIN: } else {
    } else {
// EXPLAIN: result.aliasMap[expectedCol] = i;
      result.aliasMap[expectedCol] = i;
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return result;
  return result;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Get column index by name (0-based) with alias support
 * Get column index by name (0-based) with alias support
// EXPLAIN: * @param {string} sheetName - Sheet name
 * @param {string} sheetName - Sheet name
// EXPLAIN: * @param {string} columnName - Column name
 * @param {string} columnName - Column name
// EXPLAIN: * @returns {number} Column index (0-based) or -1 if not found
 * @returns {number} Column index (0-based) or -1 if not found
// EXPLAIN: */
 */
// EXPLAIN: function getColIndex_(sheetName, columnName) {
function getColIndex_(sheetName, columnName) {
// EXPLAIN: // Prefer actual sheet headers to respect SCHEMA_LOCKED column order
  // Prefer actual sheet headers to respect SCHEMA_LOCKED column order
// EXPLAIN: const sheet = sheet_(sheetName, false);
  const sheet = sheet_(sheetName, false);
// EXPLAIN: if (sheet) {
  if (sheet) {
// EXPLAIN: const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
// EXPLAIN: const idx = headers.indexOf(columnName);
    const idx = headers.indexOf(columnName);
// EXPLAIN: if (idx !== -1) return idx;
    if (idx !== -1) return idx;
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Fallback to canonical definition
  // Fallback to canonical definition
// EXPLAIN: const canonical = CANONICAL_HEADERS[sheetName];
  const canonical = CANONICAL_HEADERS[sheetName];
// EXPLAIN: if (canonical) {
  if (canonical) {
// EXPLAIN: return canonical.indexOf(columnName);
    return canonical.indexOf(columnName);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return -1;
  return -1;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Seed default CONFIG values
 * Seed default CONFIG values
// EXPLAIN: */
 */
// EXPLAIN: function seedDefaultConfig_() {
function seedDefaultConfig_() {
// EXPLAIN: const sheet = sheet_(SHEETS.CONFIG, false);
  const sheet = sheet_(SHEETS.CONFIG, false);
// EXPLAIN: if (!sheet) return;
  if (!sheet) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const defaults = [
  const defaults = [
// EXPLAIN: ['TIMEZONE', DEFAULTS.TIMEZONE, 'System timezone'],
    ['TIMEZONE', DEFAULTS.TIMEZONE, 'System timezone'],
// EXPLAIN: ['WA_MODE', DEFAULTS.WA_MODE, 'WhatsApp mode: manual_logging'],
    ['WA_MODE', DEFAULTS.WA_MODE, 'WhatsApp mode: manual_logging'],
// EXPLAIN: ['WABA_POLICY_MODE', DEFAULTS.WABA_POLICY_MODE, 'WABA policy: draft_only'],
    ['WABA_POLICY_MODE', DEFAULTS.WABA_POLICY_MODE, 'WABA policy: draft_only'],
// EXPLAIN: ['BOOKING_MODE', DEFAULTS.BOOKING_MODE, 'Booking mode: manual'],
    ['BOOKING_MODE', DEFAULTS.BOOKING_MODE, 'Booking mode: manual'],
// EXPLAIN: ['SLA_FIRST_TOUCH_MINUTES', DEFAULTS.SLA_FIRST_TOUCH_MINUTES, 'SLA for first touch in minutes'],
    ['SLA_FIRST_TOUCH_MINUTES', DEFAULTS.SLA_FIRST_TOUCH_MINUTES, 'SLA for first touch in minutes'],
// EXPLAIN: ['FOLLOWUP_48H_ENABLED', DEFAULTS.FOLLOWUP_48H_ENABLED, 'Enable 48h follow-up reminders'],
    ['FOLLOWUP_48H_ENABLED', DEFAULTS.FOLLOWUP_48H_ENABLED, 'Enable 48h follow-up reminders'],
// EXPLAIN: ['ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE, 'Batch size for orchestrator jobs'],
    ['ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE, 'Batch size for orchestrator jobs'],
// EXPLAIN: ['GMAIL_SCAN_LABELS', DEFAULTS.GMAIL_SCAN_LABELS, 'Gmail labels to scan (comma-separated)'],
    ['GMAIL_SCAN_LABELS', DEFAULTS.GMAIL_SCAN_LABELS, 'Gmail labels to scan (comma-separated)'],
// EXPLAIN: ['STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD, 'Days before deal is stuck'],
    ['STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD, 'Days before deal is stuck'],
// EXPLAIN: ['HOT_RESPONSE_MINUTES_THRESHOLD', DEFAULTS.HOT_RESPONSE_MINUTES_THRESHOLD, 'Minutes threshold for hot response'],
    ['HOT_RESPONSE_MINUTES_THRESHOLD', DEFAULTS.HOT_RESPONSE_MINUTES_THRESHOLD, 'Minutes threshold for hot response'],
// EXPLAIN: ['SLA_ALERT_RECIPIENTS', DEFAULTS.SLA_ALERT_RECIPIENTS, 'Comma-separated SLA alert recipients'],
    ['SLA_ALERT_RECIPIENTS', DEFAULTS.SLA_ALERT_RECIPIENTS, 'Comma-separated SLA alert recipients'],
// EXPLAIN: ['LEAD_SCORE_TOP_N', DEFAULTS.LEAD_SCORE_TOP_N, 'Top N leads for follow-up tasks'],
    ['LEAD_SCORE_TOP_N', DEFAULTS.LEAD_SCORE_TOP_N, 'Top N leads for follow-up tasks'],
// EXPLAIN: ['LEAD_SCORE_MIN_THRESHOLD', DEFAULTS.LEAD_SCORE_MIN_THRESHOLD, 'Minimum score for follow-up list'],
    ['LEAD_SCORE_MIN_THRESHOLD', DEFAULTS.LEAD_SCORE_MIN_THRESHOLD, 'Minimum score for follow-up list'],
// EXPLAIN: ['FOLLOWUP_SEQUENCE_ENABLED', DEFAULTS.FOLLOWUP_SEQUENCE_ENABLED, 'Enable follow-up sequences'],
    ['FOLLOWUP_SEQUENCE_ENABLED', DEFAULTS.FOLLOWUP_SEQUENCE_ENABLED, 'Enable follow-up sequences'],
// EXPLAIN: ['EMAIL_DRAFTS_ENABLED', DEFAULTS.EMAIL_DRAFTS_ENABLED, 'Enable Gmail draft queue'],
    ['EMAIL_DRAFTS_ENABLED', DEFAULTS.EMAIL_DRAFTS_ENABLED, 'Enable Gmail draft queue'],
// EXPLAIN: ['DOC_PACKAGES_ENABLED', DEFAULTS.DOC_PACKAGES_ENABLED, 'Enable docs packages on deal creation'],
    ['DOC_PACKAGES_ENABLED', DEFAULTS.DOC_PACKAGES_ENABLED, 'Enable docs packages on deal creation'],
// EXPLAIN: ['DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID, 'Default folder for generated docs'],
    ['DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID, 'Default folder for generated docs'],
// EXPLAIN: ['WEEKLY_KPI_RECIPIENTS', DEFAULTS.WEEKLY_KPI_RECIPIENTS, 'Comma-separated KPI email recipients'],
    ['WEEKLY_KPI_RECIPIENTS', DEFAULTS.WEEKLY_KPI_RECIPIENTS, 'Comma-separated KPI email recipients'],
// EXPLAIN: ['WEEKLY_KPI_ENABLED', DEFAULTS.WEEKLY_KPI_ENABLED, 'Enable weekly KPI report'],
    ['WEEKLY_KPI_ENABLED', DEFAULTS.WEEKLY_KPI_ENABLED, 'Enable weekly KPI report'],
// EXPLAIN: ['DRIVE_SHARE_AUDIT_ENABLED', DEFAULTS.DRIVE_SHARE_AUDIT_ENABLED, 'Enable drive share audit reporting'],
    ['DRIVE_SHARE_AUDIT_ENABLED', DEFAULTS.DRIVE_SHARE_AUDIT_ENABLED, 'Enable drive share audit reporting'],
// EXPLAIN: ['WINBACK_ENABLED', DEFAULTS.WINBACK_ENABLED, 'Enable win-back sequences for lost deals'],
    ['WINBACK_ENABLED', DEFAULTS.WINBACK_ENABLED, 'Enable win-back sequences for lost deals'],
// EXPLAIN: ['CLOSE_CHECKLIST_ENABLED', DEFAULTS.CLOSE_CHECKLIST_ENABLED, 'Enable close checklist tasks'],
    ['CLOSE_CHECKLIST_ENABLED', DEFAULTS.CLOSE_CHECKLIST_ENABLED, 'Enable close checklist tasks'],
// EXPLAIN: ['DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY, 'Maximum DLQ retry attempts'],
    ['DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY, 'Maximum DLQ retry attempts'],
// EXPLAIN: ['SMOKE_CHECKED_BY', DEFAULTS.SMOKE_CHECKED_BY, 'Default smoke test checked_by']
    ['SMOKE_CHECKED_BY', DEFAULTS.SMOKE_CHECKED_BY, 'Default smoke test checked_by']
// EXPLAIN: ];
  ];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Append after header row
  // Append after header row
// EXPLAIN: if (defaults.length > 0) {
  if (defaults.length > 0) {
// EXPLAIN: sheet.getRange(2, 1, defaults.length, 3).setValues(defaults);
    sheet.getRange(2, 1, defaults.length, 3).setValues(defaults);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('CONFIG | Seeded default values');
  Logger.log('CONFIG | Seeded default values');
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Seed default task templates
 * Seed default task templates
// EXPLAIN: */
 */
// EXPLAIN: function seedDefaultTaskTemplates_() {
function seedDefaultTaskTemplates_() {
// EXPLAIN: const sheet = sheet_(SHEETS.TASK_TEMPLATES, false);
  const sheet = sheet_(SHEETS.TASK_TEMPLATES, false);
// EXPLAIN: if (!sheet) return;
  if (!sheet) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const templates = [
  const templates = [
// EXPLAIN: ['first_touch', 'first_touch', 'DEAL', 'İlk temas yap', 'Lead ile ilk iletişimi kur', 'high', 1, '', 1, 'task', ''],
    ['first_touch', 'first_touch', 'DEAL', 'İlk temas yap', 'Lead ile ilk iletişimi kur', 'high', 1, '', 1, 'task', ''],
// EXPLAIN: ['followup_48h', 'followup_48h', 'DEAL', '48 saat takip', '48 saat içinde takip iletişimi yap', 'medium', '', 48, 2, 'task', ''],
    ['followup_48h', 'followup_48h', 'DEAL', '48 saat takip', '48 saat içinde takip iletişimi yap', 'medium', '', 48, 2, 'task', ''],
// EXPLAIN: ['close_checklist', 'close_checklist', 'DEAL', 'Closing checklist', 'Kapanış için gerekli tüm maddeleri tamamla', 'high', 1, '', 1, 'task', '']
    ['close_checklist', 'close_checklist', 'DEAL', 'Closing checklist', 'Kapanış için gerekli tüm maddeleri tamamla', 'high', 1, '', 1, 'task', '']
// EXPLAIN: ];
  ];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: sheet.getRange(2, 1, templates.length, templates[0].length).setValues(templates);
  sheet.getRange(2, 1, templates.length, templates[0].length).setValues(templates);
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Seed default follow-up sequence definitions
 * Seed default follow-up sequence definitions
// EXPLAIN: */
 */
// EXPLAIN: function seedDefaultFollowupSequences_() {
function seedDefaultFollowupSequences_() {
// EXPLAIN: const sheet = sheet_(SHEETS.FOLLOWUP_SEQUENCES, false);
  const sheet = sheet_(SHEETS.FOLLOWUP_SEQUENCES, false);
// EXPLAIN: if (!sheet) return;
  if (!sheet) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const steps = JSON.stringify([
  const steps = JSON.stringify([
// EXPLAIN: { offset_days: 2, action: 'task', template: 'followup_48h' },
    { offset_days: 2, action: 'task', template: 'followup_48h' },
// EXPLAIN: { offset_days: 7, action: 'email', subject: 'Takip', body: 'Merhaba, tekrar iletişime geçiyorum.' },
    { offset_days: 7, action: 'email', subject: 'Takip', body: 'Merhaba, tekrar iletişime geçiyorum.' },
// EXPLAIN: { offset_days: 14, action: 'email', subject: 'Takip - 2', body: 'Merhaba, tekrar dönüş rica ederim.' }
    { offset_days: 14, action: 'email', subject: 'Takip - 2', body: 'Merhaba, tekrar dönüş rica ederim.' }
// EXPLAIN: ]);
  ]);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const rows = [
  const rows = [
// EXPLAIN: ['followup_default', 'Default Follow-up', '*', '*', steps, true]
    ['followup_default', 'Default Follow-up', '*', '*', steps, true]
// EXPLAIN: ];
  ];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Seed security SOP checklist
 * Seed security SOP checklist
// EXPLAIN: */
 */
// EXPLAIN: function seedSecuritySop_() {
function seedSecuritySop_() {
// EXPLAIN: const sheet = sheet_(SHEETS.SECURITY_SOP, false);
  const sheet = sheet_(SHEETS.SECURITY_SOP, false);
// EXPLAIN: if (!sheet) return;
  if (!sheet) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const rows = [
  const rows = [
// EXPLAIN: ['SOP-001', 'Passwords', 'Tek hesap/tek cihaz kuralı uygulanıyor', 'pending', ''],
    ['SOP-001', 'Passwords', 'Tek hesap/tek cihaz kuralı uygulanıyor', 'pending', ''],
// EXPLAIN: ['SOP-002', 'Passwords', 'Paylaşılan parola yok', 'pending', ''],
    ['SOP-002', 'Passwords', 'Paylaşılan parola yok', 'pending', ''],
// EXPLAIN: ['SOP-003', 'Access', 'Tüm erişimler envantere işlendi', 'pending', ''],
    ['SOP-003', 'Access', 'Tüm erişimler envantere işlendi', 'pending', ''],
// EXPLAIN: ['SOP-004', 'Access', 'Ayrılan kullanıcı erişimleri kapatıldı', 'pending', '']
    ['SOP-004', 'Access', 'Ayrılan kullanıcı erişimleri kapatıldı', 'pending', '']
// EXPLAIN: ];
  ];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Get all data from a sheet as array of objects
 * Get all data from a sheet as array of objects
// EXPLAIN: * @param {string} sheetName - Sheet name
 * @param {string} sheetName - Sheet name
// EXPLAIN: * @returns {Array<Object>} Array of row objects with column names as keys
 * @returns {Array<Object>} Array of row objects with column names as keys
// EXPLAIN: */
 */
// EXPLAIN: function getSheetData_(sheetName) {
function getSheetData_(sheetName) {
// EXPLAIN: const sheet = sheet_(sheetName, false);
  const sheet = sheet_(sheetName, false);
// EXPLAIN: if (!sheet) return [];
  if (!sheet) return [];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: if (data.length < 2) return []; // Header only
  if (data.length < 2) return []; // Header only
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const headers = data[0];
  const headers = data[0];
// EXPLAIN: const rows = [];
  const rows = [];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (let i = 1; i < data.length; i++) {
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: const row = {};
    const row = {};
// EXPLAIN: for (let j = 0; j < headers.length; j++) {
    for (let j = 0; j < headers.length; j++) {
// EXPLAIN: row[headers[j]] = data[i][j];
      row[headers[j]] = data[i][j];
// EXPLAIN: }
    }
// EXPLAIN: row._rowIndex = i + 1; // 1-based sheet row number
    row._rowIndex = i + 1; // 1-based sheet row number
// EXPLAIN: rows.push(row);
    rows.push(row);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return rows;
  return rows;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Append a row to a sheet
 * Append a row to a sheet
// EXPLAIN: * @param {string} sheetName - Sheet name
 * @param {string} sheetName - Sheet name
// EXPLAIN: * @param {Object} rowData - Object with column names as keys
 * @param {Object} rowData - Object with column names as keys
// EXPLAIN: * @returns {number} New row number (1-based)
 * @returns {number} New row number (1-based)
// EXPLAIN: */
 */
// EXPLAIN: function appendRow_(sheetName, rowData) {
function appendRow_(sheetName, rowData) {
// EXPLAIN: const sheet = sheet_(sheetName, true);
  const sheet = sheet_(sheetName, true);
// EXPLAIN: const headers = CANONICAL_HEADERS[sheetName] ||
  const headers = CANONICAL_HEADERS[sheetName] || 
// EXPLAIN: sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
                  sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const rowArray = headers.map(col => rowData[col] !== undefined ? rowData[col] : '');
  const rowArray = headers.map(col => rowData[col] !== undefined ? rowData[col] : '');
// EXPLAIN: sheet.appendRow(rowArray);
  sheet.appendRow(rowArray);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return sheet.getLastRow();
  return sheet.getLastRow();
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Update a specific cell in a sheet
 * Update a specific cell in a sheet
// EXPLAIN: * @param {string} sheetName - Sheet name
 * @param {string} sheetName - Sheet name
// EXPLAIN: * @param {number} rowIndex - Row number (1-based)
 * @param {number} rowIndex - Row number (1-based)
// EXPLAIN: * @param {string} columnName - Column name
 * @param {string} columnName - Column name
// EXPLAIN: * @param {*} value - New value
 * @param {*} value - New value
// EXPLAIN: */
 */
// EXPLAIN: function updateCell_(sheetName, rowIndex, columnName, value) {
function updateCell_(sheetName, rowIndex, columnName, value) {
// EXPLAIN: const sheet = sheet_(sheetName, false);
  const sheet = sheet_(sheetName, false);
// EXPLAIN: if (!sheet) return;
  if (!sheet) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const colIdx = getColIndex_(sheetName, columnName);
  const colIdx = getColIndex_(sheetName, columnName);
// EXPLAIN: if (colIdx === -1) return;
  if (colIdx === -1) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: sheet.getRange(rowIndex, colIdx + 1).setValue(value);
  sheet.getRange(rowIndex, colIdx + 1).setValue(value);
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Update multiple cells in a row
 * Update multiple cells in a row
// EXPLAIN: * @param {string} sheetName - Sheet name
 * @param {string} sheetName - Sheet name
// EXPLAIN: * @param {number} rowIndex - Row number (1-based)
 * @param {number} rowIndex - Row number (1-based)
// EXPLAIN: * @param {Object} updates - Object with column names as keys
 * @param {Object} updates - Object with column names as keys
// EXPLAIN: */
 */
// EXPLAIN: function updateRow_(sheetName, rowIndex, updates) {
function updateRow_(sheetName, rowIndex, updates) {
// EXPLAIN: const sheet = sheet_(sheetName, false);
  const sheet = sheet_(sheetName, false);
// EXPLAIN: if (!sheet) return;
  if (!sheet) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const [colName, value] of Object.entries(updates)) {
  for (const [colName, value] of Object.entries(updates)) {
// EXPLAIN: const colIdx = getColIndex_(sheetName, colName);
    const colIdx = getColIndex_(sheetName, colName);
// EXPLAIN: if (colIdx !== -1) {
    if (colIdx !== -1) {
// EXPLAIN: sheet.getRange(rowIndex, colIdx + 1).setValue(value);
      sheet.getRange(rowIndex, colIdx + 1).setValue(value);
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
