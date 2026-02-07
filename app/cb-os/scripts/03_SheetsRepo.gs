/**
 * Schema mode detection cache
 */
let _schemaModeCache = {};

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
    SHEETS.KNOWLEDGE_BASE
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
  
  if (report.created.includes(SHEETS.SECURITY_SOP)) {
    seedSecuritySop_();
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
    ['MODULES_LEAD_CAPTURE_ENABLED', DEFAULTS.MODULES_LEAD_CAPTURE_ENABLED, 'Enable lead capture module (22_LeadCapture)']
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
    ['close_checklist', 'close_checklist', 'DEAL', 'Closing checklist', 'Kapanış için gerekli tüm maddeleri tamamla', 'high', 1, '', 1, 'task', '']
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
  
  const rows = [
    ['followup_default', 'Default Follow-up', '*', '*', steps, true]
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
 * Get all data from a sheet as array of objects
 * @param {string} sheetName - Sheet name
 * @returns {Array<Object>} Array of row objects with column names as keys
 */
function getSheetData_(sheetName) {
  const sheet = sheet_(sheetName, false);
  if (!sheet) return [];
  
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
  
  for (const [colName, value] of Object.entries(updates)) {
    const colIdx = getColIndex_(sheetName, colName);
    if (colIdx !== -1) {
      sheet.getRange(rowIndex, colIdx + 1).setValue(value);
    }
  }
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
