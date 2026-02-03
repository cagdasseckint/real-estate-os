/**
 * CB-OS V1.0 - 03_SheetsRepo.gs
 * Sheet access, creation, and schema management
 * Handles GREENFIELD and SCHEMA_LOCKED modes
 */

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
    SHEETS.STAGE_AUTOMATIONS
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
  const canonical = CANONICAL_HEADERS[sheetName];
  if (canonical) {
    const idx = canonical.indexOf(columnName);
    if (idx !== -1) return idx;
  }
  
  // Fallback: read from actual sheet
  const sheet = sheet_(sheetName, false);
  if (!sheet) return -1;
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  return headers.indexOf(columnName);
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
    ['DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY, 'Maximum DLQ retry attempts'],
    ['SMOKE_CHECKED_BY', DEFAULTS.SMOKE_CHECKED_BY, 'Default smoke test checked_by']
  ];
  
  // Append after header row
  if (defaults.length > 0) {
    sheet.getRange(2, 1, defaults.length, 3).setValues(defaults);
  }
  
  Logger.log('CONFIG | Seeded default values');
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
  const headers = CANONICAL_HEADERS[sheetName] || 
                  sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
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
