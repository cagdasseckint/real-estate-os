/**
 * CB-OS V1.0 - 12_Cursors.gs
 * Cursor management for gap-free processing
 * Utility functions for ID generation and timestamp
 */

/**
 * Cursor storage in CONFIG sheet
 * Key pattern: CURSOR_<cursor_name>
 */

/**
 * Get cursor value from CONFIG
 * @param {string} cursorKey - Cursor key from CURSORS constant
 * @returns {string} Cursor value or empty string
 */
function getCursor_(cursorKey) {
  const configKey = 'CURSOR_' + cursorKey;
  const value = cfg_(configKey, '');
  return value || '';
}

/**
 * Set cursor value in CONFIG
 * @param {string} cursorKey - Cursor key from CURSORS constant
 * @param {string} value - New cursor value
 */
function setCursor_(cursorKey, value) {
  const configKey = 'CURSOR_' + cursorKey;
  const sheet = sheet_(SHEETS.CONFIG, true);
  if (!sheet) return;
  
  // Find existing row
  const data = sheet.getDataRange().getValues();
  let rowIdx = -1;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === configKey) {
      rowIdx = i + 1; // 1-based
      break;
    }
  }
  
  if (rowIdx > 0) {
    // Update existing
    sheet.getRange(rowIdx, 2).setValue(value);
  } else {
    // Insert new
    sheet.appendRow([configKey, value, 'Cursor for ' + cursorKey]);
  }
  
  Logger.log('CURSOR | Set ' + cursorKey + ' = ' + value);
}

/**
 * Generate unique ID (ULID-like for Apps Script)
 * Format: timestamp_hex + random_hex
 * @returns {string} Unique ID
 */
function id_() {
  const timestamp = Date.now().toString(16).padStart(12, '0');
  const random = Math.random().toString(16).substring(2, 10).padStart(8, '0');
  return timestamp + random;
}

/**
 * Generate ISO timestamp with timezone offset
 * Format: yyyy-MM-dd'T'HH:mm:ssXXX (e.g., 2026-01-15T14:30:00+03:00)
 * @param {string} tz - Timezone (default: Europe/Istanbul)
 * @returns {string} ISO timestamp with offset
 */
function nowIso_(tz) {
  const timezone = tz || cfg_('TIMEZONE', DEFAULTS.TIMEZONE);
  return formatIsoWithOffset_(new Date(), timezone);
}

/**
 * Format a Date to ISO string with timezone offset (no milliseconds).
 * @param {Date} dateObj - Date instance
 * @param {string} tz - Timezone (default: Europe/Istanbul)
 * @returns {string} ISO timestamp with offset
 */
function formatIsoWithOffset_(dateObj, tz) {
  const timezone = tz || cfg_('TIMEZONE', DEFAULTS.TIMEZONE);
  const date = dateObj || new Date();
  
  try {
    const formatted = Utilities.formatDate(date, timezone, "yyyy-MM-dd'T'HH:mm:ssXXX");
    if (formatted.match(/[+-]\d{2}:\d{2}$/)) {
      return formatted;
    }
  } catch (e) {
    // Fall through to manual calculation
  }
  
  const basePart = Utilities.formatDate(date, timezone, "yyyy-MM-dd'T'HH:mm:ss");
  const offset = '+03:00';
  return basePart + offset;
}

/**
 * Parse ISO timestamp to Date object
 * @param {string} isoString - ISO timestamp
 * @returns {Date} Date object
 */
function parseIso_(isoString) {
  if (!isoString) return null;
  
  try {
    return new Date(isoString);
  } catch (e) {
    Logger.log('parseIso_ error: ' + e.message);
    return null;
  }
}

/**
 * Parse ISO timestamp to epoch milliseconds
 * Accepts both +03:00 and Z formats.
 * @param {string} isoString - ISO timestamp
 * @returns {number|null} Epoch milliseconds or null
 */
function parseCbTimeMs_(isoString) {
  if (!isoString) return null;
  const parsed = new Date(isoString);
  const ms = parsed.getTime();
  return isNaN(ms) ? null : ms;
}

/**
 * Compare two ISO timestamps
 * @param {string} a - First timestamp
 * @param {string} b - Second timestamp
 * @returns {number} -1 if a < b, 0 if equal, 1 if a > b
 */
function compareIso_(a, b) {
  if (!a && !b) return 0;
  if (!a) return -1;
  if (!b) return 1;
  
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * Check if timestamp has valid format
 * @param {string} timestamp - Timestamp to validate
 * @returns {boolean} True if valid format
 */
function isValidIsoFormat_(timestamp) {
  if (!timestamp) return false;
  
  // Pattern: yyyy-MM-dd'T'HH:mm:ss+XX:XX or yyyy-MM-dd'T'HH:mm:ss-XX:XX
  const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;
  return pattern.test(timestamp);
}

/**
 * Build composite cursor value for ingest ordering (received_at + ingest_id)
 * @param {string} receivedAt - ISO timestamp
 * @param {string} ingestId - Ingest ID
 * @returns {string} Composite cursor value
 */
function buildIngestCursor_(receivedAt, ingestId) {
  return (receivedAt || '') + '|' + (ingestId || '');
}

/**
 * Parse composite cursor value into parts
 * @param {string} cursorValue - Cursor string
 * @returns {Object} Parsed cursor with received_at and ingest_id
 */
function parseIngestCursor_(cursorValue) {
  if (!cursorValue) return { received_at: '', ingest_id: '' };
  const parts = String(cursorValue).split('|');
  return {
    received_at: parts[0] || '',
    ingest_id: parts[1] || ''
  };
}

/**
 * Compare two ingest cursors
 * @param {Object} a - Cursor {received_at, ingest_id}
 * @param {Object} b - Cursor {received_at, ingest_id}
 * @returns {number} -1 if a < b, 0 if equal, 1 if a > b
 */
function compareIngestCursor_(a, b) {
  const tsCompare = compareIso_(a.received_at, b.received_at);
  if (tsCompare !== 0) return tsCompare;
  if (a.ingest_id < b.ingest_id) return -1;
  if (a.ingest_id > b.ingest_id) return 1;
  return 0;
}

/**
 * Extract offset from ISO timestamp
 * @param {string} timestamp - ISO timestamp
 * @returns {string|null} Offset string (e.g., "+03:00") or null
 */
function extractOffset_(timestamp) {
  if (!timestamp) return null;
  
  const match = timestamp.match(/([+-]\d{2}:\d{2})$/);
  return match ? match[1] : null;
}

/**
 * Validate all timestamps in a list have the same offset (no mix)
 * @param {Array<string>} timestamps - List of timestamps
 * @returns {Object} Validation result with valid flag and details
 */
function validateOffsetConsistency_(timestamps) {
  const offsets = new Set();
  
  for (const ts of timestamps) {
    const offset = extractOffset_(ts);
    if (offset) {
      offsets.add(offset);
    }
  }
  
  return {
    valid: offsets.size <= 1,
    offsets: Array.from(offsets),
    message: offsets.size > 1 ? 'Offset mix detected: ' + Array.from(offsets).join(', ') : 'OK'
  };
}
