/**
 * CB-OS V1.0 - 01_Config.gs
 * Configuration management with Sheets-based CONFIG table
 * Timezone: Europe/Istanbul
 */

/**
 * Default configuration values
 * Used when CONFIG sheet doesn't have a key
 */
const DEFAULTS = {
  TIMEZONE: 'Europe/Istanbul',
  WA_MODE: 'manual_logging',
  WABA_POLICY_MODE: 'draft_only',
  BOOKING_MODE: 'manual',
  SLA_FIRST_TOUCH_MINUTES: 30,
  FOLLOWUP_48H_ENABLED: true,
  ORCH_BATCH_SIZE: 30,
  GMAIL_SCAN_LABELS: 'LEAD,HOT',
  STUCK_STAGE_DAYS_THRESHOLD: 7,
  HOT_RESPONSE_MINUTES_THRESHOLD: 30,
  SLA_ALERT_RECIPIENTS: '',
  LEAD_SCORE_TOP_N: 10,
  LEAD_SCORE_MIN_THRESHOLD: 50,
  FOLLOWUP_SEQUENCE_ENABLED: true,
  EMAIL_DRAFTS_ENABLED: true,
  DOC_PACKAGES_ENABLED: true,
  DOC_TEMPLATE_OUTPUT_FOLDER_ID: '',
  WEEKLY_KPI_RECIPIENTS: '',
  WEEKLY_KPI_ENABLED: false,
  DRIVE_SHARE_AUDIT_ENABLED: true,
  WINBACK_ENABLED: true,
  CLOSE_CHECKLIST_ENABLED: true,
  ARCHIVE_ENABLED: true,
  ARCHIVE_THRESHOLD_INGEST_QUEUE: 10000,
  ARCHIVE_THRESHOLD_EVENTS: 10000,
  ARCHIVE_SPREADSHEET_ID: '',
  CALENDAR_SYNC_LOOKBACK_DAYS: 30,
  CALENDAR_SYNC_LOOKAHEAD_DAYS: 90,
  EVENTS_APPEND_ONLY: true,
  TASKS_SOT: 'sheets',
  TASKS_PROVIDER: 'google_tasks',
  WRITE_PATH_RULE: 'all_external_inputs_to_ingest_queue_only',
  SCHEMA_MODE: 'GREENFIELD',
  DLQ_MAX_RETRY: 3,
  SMOKE_CHECKED_BY: 'Real_Estate_Agent',
  MODULES_CRM_ENABLED: false,
  MODULES_WORKFLOW_ENABLED: false,
  MODULES_LEAD_CAPTURE_ENABLED: false
};

/**
 * In-memory config cache to reduce sheet reads
 */
let _configCache = null;
let _configCacheTime = 0;
const CONFIG_CACHE_TTL_MS = 60000; // 1 minute

/**
 * Get configuration value from CONFIG sheet or defaults
 * @param {string} key - Configuration key
 * @param {*} defaultValue - Default if not found (optional, uses DEFAULTS)
 * @returns {*} Configuration value
 */
function cfg_(key, defaultValue) {
  const now = Date.now();
  
  // Refresh cache if expired
  if (!_configCache || (now - _configCacheTime) > CONFIG_CACHE_TTL_MS) {
    _configCache = _loadConfigFromSheet();
    _configCacheTime = now;
  }
  
  // Check cache first
  if (_configCache && _configCache.hasOwnProperty(key)) {
    return _configCache[key];
  }
  
  // Fall back to DEFAULTS
  if (DEFAULTS.hasOwnProperty(key)) {
    return DEFAULTS[key];
  }
  
  // Finally use provided default
  return defaultValue !== undefined ? defaultValue : null;
}

/**
 * Persist configuration value to CONFIG sheet.
 * @param {string} key - Configuration key
 * @param {*} value - Value to store
 * @param {string} description - Optional description
 */
function setConfigValue_(key, value, description) {
  if (!key) return;
  const sheet = sheet_(SHEETS.CONFIG, false);
  if (!sheet) return;
  
  const data = sheet.getDataRange().getValues();
  let rowIdx = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      rowIdx = i + 1;
      break;
    }
  }
  
  const descValue = description !== undefined ? description : (rowIdx > 0 ? data[rowIdx - 1][2] : '');
  if (rowIdx > 0) {
    sheet.getRange(rowIdx, 2).setValue(value);
    if (description !== undefined) {
      sheet.getRange(rowIdx, 3).setValue(descValue || '');
    }
  } else {
    sheet.appendRow([key, value, descValue || '']);
  }
  
  if (_configCache) {
    _configCache[key] = value;
  }
}

/**
 * Load all config from CONFIG sheet into memory
 * Uses lazy initialization to avoid dependency issues with file load order
 * @returns {Object} Key-value config map
 */
function _loadConfigFromSheet() {
  try {
    // Lazy check: ensure dependencies are loaded (fixes E-001 BLOCKER)
    // sheet_ is defined in 03_SheetsRepo.gs, SHEETS in 02_Constants.gs
    if (typeof sheet_ !== 'function' || typeof SHEETS === 'undefined') {
      Logger.log('CONFIG | Dependencies not yet loaded, using DEFAULTS only');
      return {};
    }
    
    const sheet = sheet_(SHEETS.CONFIG, false);
    if (!sheet) {
      Logger.log('CONFIG sheet not found, using DEFAULTS only');
      return {};
    }
    
    const data = sheet.getDataRange().getValues();
    if (data.length < 2) return {}; // Header only or empty
    
    const config = {};
    // Assuming columns: key, value, description
    for (let i = 1; i < data.length; i++) {
      const key = String(data[i][0]).trim();
      let value = data[i][1];
      
      if (key) {
        // Type coercion for known types
        if (value === 'true') value = true;
        else if (value === 'false') value = false;
        else if (!isNaN(value) && value !== '') value = Number(value);
        
        config[key] = value;
      }
    }
    
    return config;
  } catch (e) {
    Logger.log('Error loading CONFIG: ' + e.message);
    return {};
  }
}

/**
 * Force refresh config cache
 */
function refreshConfig_() {
  _configCache = null;
  _configCacheTime = 0;
}

/**
 * Get the CB-OS workbook (spreadsheet)
 * @returns {Spreadsheet} Active spreadsheet
 */
function getWorkbook_() {
  return SpreadsheetApp.getActiveSpreadsheet();
}
