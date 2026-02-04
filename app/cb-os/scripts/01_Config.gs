// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS V1.0 - 01_Config.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS V1.0 - 01_Config.gs
// EXPLAIN: Bu satırın görevi: * Configuration management with Sheets-based CONFIG table. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Configuration management with Sheets-based CONFIG table
// EXPLAIN: Bu satırın görevi: * Timezone: Europe/Istanbul. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Timezone: Europe/Istanbul
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Default configuration values. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Default configuration values
// EXPLAIN: Bu satırın görevi: * Used when CONFIG sheet doesn't have a key. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Used when CONFIG sheet doesn't have a key
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: const DEFAULTS = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const DEFAULTS = {
// EXPLAIN: Bu satırın görevi: TIMEZONE: 'Europe/Istanbul',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  TIMEZONE: 'Europe/Istanbul',
// EXPLAIN: Bu satırın görevi: WA_MODE: 'manual_logging',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  WA_MODE: 'manual_logging',
// EXPLAIN: Bu satırın görevi: WABA_POLICY_MODE: 'draft_only',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  WABA_POLICY_MODE: 'draft_only',
// EXPLAIN: Bu satırın görevi: BOOKING_MODE: 'manual',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  BOOKING_MODE: 'manual',
// EXPLAIN: Bu satırın görevi: SLA_FIRST_TOUCH_MINUTES: 30,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  SLA_FIRST_TOUCH_MINUTES: 30,
// EXPLAIN: Bu satırın görevi: FOLLOWUP_48H_ENABLED: true,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  FOLLOWUP_48H_ENABLED: true,
// EXPLAIN: Bu satırın görevi: ORCH_BATCH_SIZE: 30,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ORCH_BATCH_SIZE: 30,
// EXPLAIN: Bu satırın görevi: GMAIL_SCAN_LABELS: 'LEAD,HOT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  GMAIL_SCAN_LABELS: 'LEAD,HOT',
// EXPLAIN: Bu satırın görevi: STUCK_STAGE_DAYS_THRESHOLD: 7,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  STUCK_STAGE_DAYS_THRESHOLD: 7,
// EXPLAIN: Bu satırın görevi: HOT_RESPONSE_MINUTES_THRESHOLD: 30,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  HOT_RESPONSE_MINUTES_THRESHOLD: 30,
// EXPLAIN: Bu satırın görevi: SLA_ALERT_RECIPIENTS: '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  SLA_ALERT_RECIPIENTS: '',
// EXPLAIN: Bu satırın görevi: LEAD_SCORE_TOP_N: 10,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  LEAD_SCORE_TOP_N: 10,
// EXPLAIN: Bu satırın görevi: LEAD_SCORE_MIN_THRESHOLD: 50,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  LEAD_SCORE_MIN_THRESHOLD: 50,
// EXPLAIN: Bu satırın görevi: FOLLOWUP_SEQUENCE_ENABLED: true,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  FOLLOWUP_SEQUENCE_ENABLED: true,
// EXPLAIN: Bu satırın görevi: EMAIL_DRAFTS_ENABLED: true,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EMAIL_DRAFTS_ENABLED: true,
// EXPLAIN: Bu satırın görevi: DOC_PACKAGES_ENABLED: true,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DOC_PACKAGES_ENABLED: true,
// EXPLAIN: Bu satırın görevi: DOC_TEMPLATE_OUTPUT_FOLDER_ID: '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DOC_TEMPLATE_OUTPUT_FOLDER_ID: '',
// EXPLAIN: Bu satırın görevi: WEEKLY_KPI_RECIPIENTS: '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  WEEKLY_KPI_RECIPIENTS: '',
// EXPLAIN: Bu satırın görevi: WEEKLY_KPI_ENABLED: false,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  WEEKLY_KPI_ENABLED: false,
// EXPLAIN: Bu satırın görevi: DRIVE_SHARE_AUDIT_ENABLED: true,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DRIVE_SHARE_AUDIT_ENABLED: true,
// EXPLAIN: Bu satırın görevi: WINBACK_ENABLED: true,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  WINBACK_ENABLED: true,
// EXPLAIN: Bu satırın görevi: CLOSE_CHECKLIST_ENABLED: true,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  CLOSE_CHECKLIST_ENABLED: true,
// EXPLAIN: Bu satırın görevi: EVENTS_APPEND_ONLY: true,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  EVENTS_APPEND_ONLY: true,
// EXPLAIN: Bu satırın görevi: TASKS_SOT: 'sheets',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  TASKS_SOT: 'sheets',
// EXPLAIN: Bu satırın görevi: TASKS_PROVIDER: 'google_tasks',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  TASKS_PROVIDER: 'google_tasks',
// EXPLAIN: Bu satırın görevi: WRITE_PATH_RULE: 'all_external_inputs_to_ingest_queue_only',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  WRITE_PATH_RULE: 'all_external_inputs_to_ingest_queue_only',
// EXPLAIN: Bu satırın görevi: DLQ_MAX_RETRY: 3,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DLQ_MAX_RETRY: 3,
// EXPLAIN: Bu satırın görevi: SMOKE_CHECKED_BY: 'Real_Estate_Agent'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  SMOKE_CHECKED_BY: 'Real_Estate_Agent'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * In-memory config cache to reduce sheet reads. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * In-memory config cache to reduce sheet reads
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: let _configCache = null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
let _configCache = null;
// EXPLAIN: Bu satırın görevi: let _configCacheTime = 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
let _configCacheTime = 0;
// EXPLAIN: Bu satırın görevi: const CONFIG_CACHE_TTL_MS = 60000; // 1 minute. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const CONFIG_CACHE_TTL_MS = 60000; // 1 minute
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Get configuration value from CONFIG sheet or defaults. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Get configuration value from CONFIG sheet or defaults
// EXPLAIN: Bu satırın görevi: * @param {string} key - Configuration key. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} key - Configuration key
// EXPLAIN: Bu satırın görevi: * @param {*} defaultValue - Default if not found (optional, uses DEFAULTS). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {*} defaultValue - Default if not found (optional, uses DEFAULTS)
// EXPLAIN: Bu satırın görevi: * @returns {*} Configuration value. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {*} Configuration value
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function cfg_(key, defaultValue) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function cfg_(key, defaultValue) {
// EXPLAIN: Bu satırın görevi: const now = Date.now();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const now = Date.now();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Refresh cache if expired. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Refresh cache if expired
// EXPLAIN: Bu satırın görevi: if (!_configCache || (now - _configCacheTime) > CONFIG_CACHE_TTL_MS) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!_configCache || (now - _configCacheTime) > CONFIG_CACHE_TTL_MS) {
// EXPLAIN: Bu satırın görevi: _configCache = _loadConfigFromSheet();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    _configCache = _loadConfigFromSheet();
// EXPLAIN: Bu satırın görevi: _configCacheTime = now;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    _configCacheTime = now;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Check cache first. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Check cache first
// EXPLAIN: Bu satırın görevi: if (_configCache && _configCache.hasOwnProperty(key)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (_configCache && _configCache.hasOwnProperty(key)) {
// EXPLAIN: Bu satırın görevi: return _configCache[key];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return _configCache[key];
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Fall back to DEFAULTS. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Fall back to DEFAULTS
// EXPLAIN: Bu satırın görevi: if (DEFAULTS.hasOwnProperty(key)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (DEFAULTS.hasOwnProperty(key)) {
// EXPLAIN: Bu satırın görevi: return DEFAULTS[key];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return DEFAULTS[key];
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Finally use provided default. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Finally use provided default
// EXPLAIN: Bu satırın görevi: return defaultValue !== undefined ? defaultValue : null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return defaultValue !== undefined ? defaultValue : null;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Load all config from CONFIG sheet into memory. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Load all config from CONFIG sheet into memory
// EXPLAIN: Bu satırın görevi: * Uses lazy initialization to avoid dependency issues with file load order. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Uses lazy initialization to avoid dependency issues with file load order
// EXPLAIN: Bu satırın görevi: * @returns {Object} Key-value config map. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Key-value config map
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function _loadConfigFromSheet() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function _loadConfigFromSheet() {
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: // Lazy check: ensure dependencies are loaded (fixes E-001 BLOCKER). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Lazy check: ensure dependencies are loaded (fixes E-001 BLOCKER)
// EXPLAIN: Bu satırın görevi: // sheet_ is defined in 03_SheetsRepo.gs, SHEETS in 02_Constants.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // sheet_ is defined in 03_SheetsRepo.gs, SHEETS in 02_Constants.gs
// EXPLAIN: Bu satırın görevi: if (typeof sheet_ !== 'function' || typeof SHEETS === 'undefined') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (typeof sheet_ !== 'function' || typeof SHEETS === 'undefined') {
// EXPLAIN: Bu satırın görevi: Logger.log('CONFIG | Dependencies not yet loaded, using DEFAULTS only');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      Logger.log('CONFIG | Dependencies not yet loaded, using DEFAULTS only');
// EXPLAIN: Bu satırın görevi: return {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return {};
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const sheet = sheet_(SHEETS.CONFIG, false);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const sheet = sheet_(SHEETS.CONFIG, false);
// EXPLAIN: Bu satırın görevi: if (!sheet) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!sheet) {
// EXPLAIN: Bu satırın görevi: Logger.log('CONFIG sheet not found, using DEFAULTS only');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      Logger.log('CONFIG sheet not found, using DEFAULTS only');
// EXPLAIN: Bu satırın görevi: return {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return {};
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: if (data.length < 2) return {}; // Header only or empty. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (data.length < 2) return {}; // Header only or empty
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const config = {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const config = {};
// EXPLAIN: Bu satırın görevi: // Assuming columns: key, value, description. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Assuming columns: key, value, description
// EXPLAIN: Bu satırın görevi: for (let i = 1; i < data.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    for (let i = 1; i < data.length; i++) {
// EXPLAIN: Bu satırın görevi: const key = String(data[i][0]).trim();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const key = String(data[i][0]).trim();
// EXPLAIN: Bu satırın görevi: let value = data[i][1];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      let value = data[i][1];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: if (key) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (key) {
// EXPLAIN: Bu satırın görevi: // Type coercion for known types. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // Type coercion for known types
// EXPLAIN: Bu satırın görevi: if (value === 'true') value = true;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        if (value === 'true') value = true;
// EXPLAIN: Bu satırın görevi: else if (value === 'false') value = false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        else if (value === 'false') value = false;
// EXPLAIN: Bu satırın görevi: else if (!isNaN(value) && value !== '') value = Number(value);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        else if (!isNaN(value) && value !== '') value = Number(value);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
        
// EXPLAIN: Bu satırın görevi: config[key] = value;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        config[key] = value;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: return config;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return config;
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: Logger.log('Error loading CONFIG: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('Error loading CONFIG: ' + e.message);
// EXPLAIN: Bu satırın görevi: return {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return {};
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Force refresh config cache. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Force refresh config cache
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function refreshConfig_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function refreshConfig_() {
// EXPLAIN: Bu satırın görevi: _configCache = null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  _configCache = null;
// EXPLAIN: Bu satırın görevi: _configCacheTime = 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  _configCacheTime = 0;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Get the CB-OS workbook (spreadsheet). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Get the CB-OS workbook (spreadsheet)
// EXPLAIN: Bu satırın görevi: * @returns {Spreadsheet} Active spreadsheet. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Spreadsheet} Active spreadsheet
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function getWorkbook_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function getWorkbook_() {
// EXPLAIN: Bu satırın görevi: return SpreadsheetApp.getActiveSpreadsheet();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
