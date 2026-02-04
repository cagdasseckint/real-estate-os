// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 01_Config.gs
 * CB-OS V1.0 - 01_Config.gs
// EXPLAIN: * Configuration management with Sheets-based CONFIG table
 * Configuration management with Sheets-based CONFIG table
// EXPLAIN: * Timezone: Europe/Istanbul
 * Timezone: Europe/Istanbul
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Default configuration values
 * Default configuration values
// EXPLAIN: * Used when CONFIG sheet doesn't have a key
 * Used when CONFIG sheet doesn't have a key
// EXPLAIN: */
 */
// EXPLAIN: const DEFAULTS = {
const DEFAULTS = {
// EXPLAIN: TIMEZONE: 'Europe/Istanbul',
  TIMEZONE: 'Europe/Istanbul',
// EXPLAIN: WA_MODE: 'manual_logging',
  WA_MODE: 'manual_logging',
// EXPLAIN: WABA_POLICY_MODE: 'draft_only',
  WABA_POLICY_MODE: 'draft_only',
// EXPLAIN: BOOKING_MODE: 'manual',
  BOOKING_MODE: 'manual',
// EXPLAIN: SLA_FIRST_TOUCH_MINUTES: 30,
  SLA_FIRST_TOUCH_MINUTES: 30,
// EXPLAIN: FOLLOWUP_48H_ENABLED: true,
  FOLLOWUP_48H_ENABLED: true,
// EXPLAIN: ORCH_BATCH_SIZE: 30,
  ORCH_BATCH_SIZE: 30,
// EXPLAIN: GMAIL_SCAN_LABELS: 'LEAD,HOT',
  GMAIL_SCAN_LABELS: 'LEAD,HOT',
// EXPLAIN: STUCK_STAGE_DAYS_THRESHOLD: 7,
  STUCK_STAGE_DAYS_THRESHOLD: 7,
// EXPLAIN: HOT_RESPONSE_MINUTES_THRESHOLD: 30,
  HOT_RESPONSE_MINUTES_THRESHOLD: 30,
// EXPLAIN: SLA_ALERT_RECIPIENTS: '',
  SLA_ALERT_RECIPIENTS: '',
// EXPLAIN: LEAD_SCORE_TOP_N: 10,
  LEAD_SCORE_TOP_N: 10,
// EXPLAIN: LEAD_SCORE_MIN_THRESHOLD: 50,
  LEAD_SCORE_MIN_THRESHOLD: 50,
// EXPLAIN: FOLLOWUP_SEQUENCE_ENABLED: true,
  FOLLOWUP_SEQUENCE_ENABLED: true,
// EXPLAIN: EMAIL_DRAFTS_ENABLED: true,
  EMAIL_DRAFTS_ENABLED: true,
// EXPLAIN: DOC_PACKAGES_ENABLED: true,
  DOC_PACKAGES_ENABLED: true,
// EXPLAIN: DOC_TEMPLATE_OUTPUT_FOLDER_ID: '',
  DOC_TEMPLATE_OUTPUT_FOLDER_ID: '',
// EXPLAIN: WEEKLY_KPI_RECIPIENTS: '',
  WEEKLY_KPI_RECIPIENTS: '',
// EXPLAIN: WEEKLY_KPI_ENABLED: false,
  WEEKLY_KPI_ENABLED: false,
// EXPLAIN: DRIVE_SHARE_AUDIT_ENABLED: true,
  DRIVE_SHARE_AUDIT_ENABLED: true,
// EXPLAIN: WINBACK_ENABLED: true,
  WINBACK_ENABLED: true,
// EXPLAIN: CLOSE_CHECKLIST_ENABLED: true,
  CLOSE_CHECKLIST_ENABLED: true,
// EXPLAIN: EVENTS_APPEND_ONLY: true,
  EVENTS_APPEND_ONLY: true,
// EXPLAIN: TASKS_SOT: 'sheets',
  TASKS_SOT: 'sheets',
// EXPLAIN: TASKS_PROVIDER: 'google_tasks',
  TASKS_PROVIDER: 'google_tasks',
// EXPLAIN: WRITE_PATH_RULE: 'all_external_inputs_to_ingest_queue_only',
  WRITE_PATH_RULE: 'all_external_inputs_to_ingest_queue_only',
// EXPLAIN: DLQ_MAX_RETRY: 3,
  DLQ_MAX_RETRY: 3,
// EXPLAIN: SMOKE_CHECKED_BY: 'Real_Estate_Agent'
  SMOKE_CHECKED_BY: 'Real_Estate_Agent'
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * In-memory config cache to reduce sheet reads
 * In-memory config cache to reduce sheet reads
// EXPLAIN: */
 */
// EXPLAIN: let _configCache = null;
let _configCache = null;
// EXPLAIN: let _configCacheTime = 0;
let _configCacheTime = 0;
// EXPLAIN: const CONFIG_CACHE_TTL_MS = 60000; // 1 minute
const CONFIG_CACHE_TTL_MS = 60000; // 1 minute
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Get configuration value from CONFIG sheet or defaults
 * Get configuration value from CONFIG sheet or defaults
// EXPLAIN: * @param {string} key - Configuration key
 * @param {string} key - Configuration key
// EXPLAIN: * @param {*} defaultValue - Default if not found (optional, uses DEFAULTS)
 * @param {*} defaultValue - Default if not found (optional, uses DEFAULTS)
// EXPLAIN: * @returns {*} Configuration value
 * @returns {*} Configuration value
// EXPLAIN: */
 */
// EXPLAIN: function cfg_(key, defaultValue) {
function cfg_(key, defaultValue) {
// EXPLAIN: const now = Date.now();
  const now = Date.now();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Refresh cache if expired
  // Refresh cache if expired
// EXPLAIN: if (!_configCache || (now - _configCacheTime) > CONFIG_CACHE_TTL_MS) {
  if (!_configCache || (now - _configCacheTime) > CONFIG_CACHE_TTL_MS) {
// EXPLAIN: _configCache = _loadConfigFromSheet();
    _configCache = _loadConfigFromSheet();
// EXPLAIN: _configCacheTime = now;
    _configCacheTime = now;
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Check cache first
  // Check cache first
// EXPLAIN: if (_configCache && _configCache.hasOwnProperty(key)) {
  if (_configCache && _configCache.hasOwnProperty(key)) {
// EXPLAIN: return _configCache[key];
    return _configCache[key];
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Fall back to DEFAULTS
  // Fall back to DEFAULTS
// EXPLAIN: if (DEFAULTS.hasOwnProperty(key)) {
  if (DEFAULTS.hasOwnProperty(key)) {
// EXPLAIN: return DEFAULTS[key];
    return DEFAULTS[key];
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Finally use provided default
  // Finally use provided default
// EXPLAIN: return defaultValue !== undefined ? defaultValue : null;
  return defaultValue !== undefined ? defaultValue : null;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Load all config from CONFIG sheet into memory
 * Load all config from CONFIG sheet into memory
// EXPLAIN: * Uses lazy initialization to avoid dependency issues with file load order
 * Uses lazy initialization to avoid dependency issues with file load order
// EXPLAIN: * @returns {Object} Key-value config map
 * @returns {Object} Key-value config map
// EXPLAIN: */
 */
// EXPLAIN: function _loadConfigFromSheet() {
function _loadConfigFromSheet() {
// EXPLAIN: try {
  try {
// EXPLAIN: // Lazy check: ensure dependencies are loaded (fixes E-001 BLOCKER)
    // Lazy check: ensure dependencies are loaded (fixes E-001 BLOCKER)
// EXPLAIN: // sheet_ is defined in 03_SheetsRepo.gs, SHEETS in 02_Constants.gs
    // sheet_ is defined in 03_SheetsRepo.gs, SHEETS in 02_Constants.gs
// EXPLAIN: if (typeof sheet_ !== 'function' || typeof SHEETS === 'undefined') {
    if (typeof sheet_ !== 'function' || typeof SHEETS === 'undefined') {
// EXPLAIN: Logger.log('CONFIG | Dependencies not yet loaded, using DEFAULTS only');
      Logger.log('CONFIG | Dependencies not yet loaded, using DEFAULTS only');
// EXPLAIN: return {};
      return {};
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const sheet = sheet_(SHEETS.CONFIG, false);
    const sheet = sheet_(SHEETS.CONFIG, false);
// EXPLAIN: if (!sheet) {
    if (!sheet) {
// EXPLAIN: Logger.log('CONFIG sheet not found, using DEFAULTS only');
      Logger.log('CONFIG sheet not found, using DEFAULTS only');
// EXPLAIN: return {};
      return {};
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const data = sheet.getDataRange().getValues();
    const data = sheet.getDataRange().getValues();
// EXPLAIN: if (data.length < 2) return {}; // Header only or empty
    if (data.length < 2) return {}; // Header only or empty
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const config = {};
    const config = {};
// EXPLAIN: // Assuming columns: key, value, description
    // Assuming columns: key, value, description
// EXPLAIN: for (let i = 1; i < data.length; i++) {
    for (let i = 1; i < data.length; i++) {
// EXPLAIN: const key = String(data[i][0]).trim();
      const key = String(data[i][0]).trim();
// EXPLAIN: let value = data[i][1];
      let value = data[i][1];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: if (key) {
      if (key) {
// EXPLAIN: // Type coercion for known types
        // Type coercion for known types
// EXPLAIN: if (value === 'true') value = true;
        if (value === 'true') value = true;
// EXPLAIN: else if (value === 'false') value = false;
        else if (value === 'false') value = false;
// EXPLAIN: else if (!isNaN(value) && value !== '') value = Number(value);
        else if (!isNaN(value) && value !== '') value = Number(value);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
        
// EXPLAIN: config[key] = value;
        config[key] = value;
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return config;
    return config;
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: Logger.log('Error loading CONFIG: ' + e.message);
    Logger.log('Error loading CONFIG: ' + e.message);
// EXPLAIN: return {};
    return {};
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Force refresh config cache
 * Force refresh config cache
// EXPLAIN: */
 */
// EXPLAIN: function refreshConfig_() {
function refreshConfig_() {
// EXPLAIN: _configCache = null;
  _configCache = null;
// EXPLAIN: _configCacheTime = 0;
  _configCacheTime = 0;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Get the CB-OS workbook (spreadsheet)
 * Get the CB-OS workbook (spreadsheet)
// EXPLAIN: * @returns {Spreadsheet} Active spreadsheet
 * @returns {Spreadsheet} Active spreadsheet
// EXPLAIN: */
 */
// EXPLAIN: function getWorkbook_() {
function getWorkbook_() {
// EXPLAIN: return SpreadsheetApp.getActiveSpreadsheet();
  return SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
