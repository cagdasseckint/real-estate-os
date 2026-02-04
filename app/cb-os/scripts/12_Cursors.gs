// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 12_Cursors.gs
 * CB-OS V1.0 - 12_Cursors.gs
// EXPLAIN: * Cursor management for gap-free processing
 * Cursor management for gap-free processing
// EXPLAIN: * Utility functions for ID generation and timestamp
 * Utility functions for ID generation and timestamp
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Cursor storage in CONFIG sheet
 * Cursor storage in CONFIG sheet
// EXPLAIN: * Key pattern: CURSOR_<cursor_name>
 * Key pattern: CURSOR_<cursor_name>
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Get cursor value from CONFIG
 * Get cursor value from CONFIG
// EXPLAIN: * @param {string} cursorKey - Cursor key from CURSORS constant
 * @param {string} cursorKey - Cursor key from CURSORS constant
// EXPLAIN: * @returns {string} Cursor value or empty string
 * @returns {string} Cursor value or empty string
// EXPLAIN: */
 */
// EXPLAIN: function getCursor_(cursorKey) {
function getCursor_(cursorKey) {
// EXPLAIN: const configKey = 'CURSOR_' + cursorKey;
  const configKey = 'CURSOR_' + cursorKey;
// EXPLAIN: const value = cfg_(configKey, '');
  const value = cfg_(configKey, '');
// EXPLAIN: return value || '';
  return value || '';
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Set cursor value in CONFIG
 * Set cursor value in CONFIG
// EXPLAIN: * @param {string} cursorKey - Cursor key from CURSORS constant
 * @param {string} cursorKey - Cursor key from CURSORS constant
// EXPLAIN: * @param {string} value - New cursor value
 * @param {string} value - New cursor value
// EXPLAIN: */
 */
// EXPLAIN: function setCursor_(cursorKey, value) {
function setCursor_(cursorKey, value) {
// EXPLAIN: const configKey = 'CURSOR_' + cursorKey;
  const configKey = 'CURSOR_' + cursorKey;
// EXPLAIN: const sheet = sheet_(SHEETS.CONFIG, true);
  const sheet = sheet_(SHEETS.CONFIG, true);
// EXPLAIN: if (!sheet) return;
  if (!sheet) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Find existing row
  // Find existing row
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: let rowIdx = -1;
  let rowIdx = -1;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (let i = 1; i < data.length; i++) {
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: if (data[i][0] === configKey) {
    if (data[i][0] === configKey) {
// EXPLAIN: rowIdx = i + 1; // 1-based
      rowIdx = i + 1; // 1-based
// EXPLAIN: break;
      break;
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (rowIdx > 0) {
  if (rowIdx > 0) {
// EXPLAIN: // Update existing
    // Update existing
// EXPLAIN: sheet.getRange(rowIdx, 2).setValue(value);
    sheet.getRange(rowIdx, 2).setValue(value);
// EXPLAIN: } else {
  } else {
// EXPLAIN: // Insert new
    // Insert new
// EXPLAIN: sheet.appendRow([configKey, value, 'Cursor for ' + cursorKey]);
    sheet.appendRow([configKey, value, 'Cursor for ' + cursorKey]);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('CURSOR | Set ' + cursorKey + ' = ' + value);
  Logger.log('CURSOR | Set ' + cursorKey + ' = ' + value);
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Generate unique ID (ULID-like for Apps Script)
 * Generate unique ID (ULID-like for Apps Script)
// EXPLAIN: * Format: timestamp_hex + random_hex
 * Format: timestamp_hex + random_hex
// EXPLAIN: * @returns {string} Unique ID
 * @returns {string} Unique ID
// EXPLAIN: */
 */
// EXPLAIN: function id_() {
function id_() {
// EXPLAIN: const timestamp = Date.now().toString(16).padStart(12, '0');
  const timestamp = Date.now().toString(16).padStart(12, '0');
// EXPLAIN: const random = Math.random().toString(16).substring(2, 10).padStart(8, '0');
  const random = Math.random().toString(16).substring(2, 10).padStart(8, '0');
// EXPLAIN: return timestamp + random;
  return timestamp + random;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Generate ISO timestamp with timezone offset
 * Generate ISO timestamp with timezone offset
// EXPLAIN: * Format: yyyy-MM-dd'T'HH:mm:ssXXX (e.g., 2026-01-15T14:30:00+03:00)
 * Format: yyyy-MM-dd'T'HH:mm:ssXXX (e.g., 2026-01-15T14:30:00+03:00)
// EXPLAIN: * @param {string} tz - Timezone (default: Europe/Istanbul)
 * @param {string} tz - Timezone (default: Europe/Istanbul)
// EXPLAIN: * @returns {string} ISO timestamp with offset
 * @returns {string} ISO timestamp with offset
// EXPLAIN: */
 */
// EXPLAIN: function nowIso_(tz) {
function nowIso_(tz) {
// EXPLAIN: const timezone = tz || cfg_('TIMEZONE', DEFAULTS.TIMEZONE);
  const timezone = tz || cfg_('TIMEZONE', DEFAULTS.TIMEZONE);
// EXPLAIN: const now = new Date();
  const now = new Date();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Try to use Utilities.formatDate with XXX pattern
  // Try to use Utilities.formatDate with XXX pattern
// EXPLAIN: // If not supported, calculate offset manually
  // If not supported, calculate offset manually
// EXPLAIN: try {
  try {
// EXPLAIN: // First try with XXX pattern
    // First try with XXX pattern
// EXPLAIN: const formatted = Utilities.formatDate(now, timezone, "yyyy-MM-dd'T'HH:mm:ssXXX");
    const formatted = Utilities.formatDate(now, timezone, "yyyy-MM-dd'T'HH:mm:ssXXX");
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Verify it has offset (XXX produces +03:00 format)
    // Verify it has offset (XXX produces +03:00 format)
// EXPLAIN: if (formatted.match(/[+-]\d{2}:\d{2}$/)) {
    if (formatted.match(/[+-]\d{2}:\d{2}$/)) {
// EXPLAIN: return formatted;
      return formatted;
// EXPLAIN: }
    }
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: // Fall through to manual calculation
    // Fall through to manual calculation
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Manual offset calculation
  // Manual offset calculation
// EXPLAIN: // Format base datetime
  // Format base datetime
// EXPLAIN: const basePart = Utilities.formatDate(now, timezone, "yyyy-MM-dd'T'HH:mm:ss");
  const basePart = Utilities.formatDate(now, timezone, "yyyy-MM-dd'T'HH:mm:ss");
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Calculate offset for Europe/Istanbul
  // Calculate offset for Europe/Istanbul
// EXPLAIN: // Turkey abolished DST in 2016, +03:00 is permanent (no seasonal changes)
  // Turkey abolished DST in 2016, +03:00 is permanent (no seasonal changes)
// EXPLAIN: // This hardcoded value is intentional and compliant with V1.0 hard-rule #4
  // This hardcoded value is intentional and compliant with V1.0 hard-rule #4
// EXPLAIN: const offset = '+03:00';
  const offset = '+03:00';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return basePart + offset;
  return basePart + offset;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Parse ISO timestamp to Date object
 * Parse ISO timestamp to Date object
// EXPLAIN: * @param {string} isoString - ISO timestamp
 * @param {string} isoString - ISO timestamp
// EXPLAIN: * @returns {Date} Date object
 * @returns {Date} Date object
// EXPLAIN: */
 */
// EXPLAIN: function parseIso_(isoString) {
function parseIso_(isoString) {
// EXPLAIN: if (!isoString) return null;
  if (!isoString) return null;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: return new Date(isoString);
    return new Date(isoString);
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: Logger.log('parseIso_ error: ' + e.message);
    Logger.log('parseIso_ error: ' + e.message);
// EXPLAIN: return null;
    return null;
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Compare two ISO timestamps
 * Compare two ISO timestamps
// EXPLAIN: * @param {string} a - First timestamp
 * @param {string} a - First timestamp
// EXPLAIN: * @param {string} b - Second timestamp
 * @param {string} b - Second timestamp
// EXPLAIN: * @returns {number} -1 if a < b, 0 if equal, 1 if a > b
 * @returns {number} -1 if a < b, 0 if equal, 1 if a > b
// EXPLAIN: */
 */
// EXPLAIN: function compareIso_(a, b) {
function compareIso_(a, b) {
// EXPLAIN: if (!a && !b) return 0;
  if (!a && !b) return 0;
// EXPLAIN: if (!a) return -1;
  if (!a) return -1;
// EXPLAIN: if (!b) return 1;
  if (!b) return 1;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (a < b) return -1;
  if (a < b) return -1;
// EXPLAIN: if (a > b) return 1;
  if (a > b) return 1;
// EXPLAIN: return 0;
  return 0;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Check if timestamp has valid format
 * Check if timestamp has valid format
// EXPLAIN: * @param {string} timestamp - Timestamp to validate
 * @param {string} timestamp - Timestamp to validate
// EXPLAIN: * @returns {boolean} True if valid format
 * @returns {boolean} True if valid format
// EXPLAIN: */
 */
// EXPLAIN: function isValidIsoFormat_(timestamp) {
function isValidIsoFormat_(timestamp) {
// EXPLAIN: if (!timestamp) return false;
  if (!timestamp) return false;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Pattern: yyyy-MM-dd'T'HH:mm:ss+XX:XX or yyyy-MM-dd'T'HH:mm:ss-XX:XX
  // Pattern: yyyy-MM-dd'T'HH:mm:ss+XX:XX or yyyy-MM-dd'T'HH:mm:ss-XX:XX
// EXPLAIN: const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;
  const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;
// EXPLAIN: return pattern.test(timestamp);
  return pattern.test(timestamp);
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Extract offset from ISO timestamp
 * Extract offset from ISO timestamp
// EXPLAIN: * @param {string} timestamp - ISO timestamp
 * @param {string} timestamp - ISO timestamp
// EXPLAIN: * @returns {string|null} Offset string (e.g., "+03:00") or null
 * @returns {string|null} Offset string (e.g., "+03:00") or null
// EXPLAIN: */
 */
// EXPLAIN: function extractOffset_(timestamp) {
function extractOffset_(timestamp) {
// EXPLAIN: if (!timestamp) return null;
  if (!timestamp) return null;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const match = timestamp.match(/([+-]\d{2}:\d{2})$/);
  const match = timestamp.match(/([+-]\d{2}:\d{2})$/);
// EXPLAIN: return match ? match[1] : null;
  return match ? match[1] : null;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Validate all timestamps in a list have the same offset (no mix)
 * Validate all timestamps in a list have the same offset (no mix)
// EXPLAIN: * @param {Array<string>} timestamps - List of timestamps
 * @param {Array<string>} timestamps - List of timestamps
// EXPLAIN: * @returns {Object} Validation result with valid flag and details
 * @returns {Object} Validation result with valid flag and details
// EXPLAIN: */
 */
// EXPLAIN: function validateOffsetConsistency_(timestamps) {
function validateOffsetConsistency_(timestamps) {
// EXPLAIN: const offsets = new Set();
  const offsets = new Set();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const ts of timestamps) {
  for (const ts of timestamps) {
// EXPLAIN: const offset = extractOffset_(ts);
    const offset = extractOffset_(ts);
// EXPLAIN: if (offset) {
    if (offset) {
// EXPLAIN: offsets.add(offset);
      offsets.add(offset);
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return {
  return {
// EXPLAIN: valid: offsets.size <= 1,
    valid: offsets.size <= 1,
// EXPLAIN: offsets: Array.from(offsets),
    offsets: Array.from(offsets),
// EXPLAIN: message: offsets.size > 1 ? 'Offset mix detected: ' + Array.from(offsets).join(', ') : 'OK'
    message: offsets.size > 1 ? 'Offset mix detected: ' + Array.from(offsets).join(', ') : 'OK'
// EXPLAIN: };
  };
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
