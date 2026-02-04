// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 09_DedupRepo.gs
 * CB-OS V1.0 - 09_DedupRepo.gs
// EXPLAIN: * DEDUP_KEYS table operations for idempotency control
 * DEDUP_KEYS table operations for idempotency control
// EXPLAIN: * Uses LockService to prevent race conditions
 * Uses LockService to prevent race conditions
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * DedupRepo namespace for DEDUP_KEYS operations
 * DedupRepo namespace for DEDUP_KEYS operations
// EXPLAIN: */
 */
// EXPLAIN: const DedupRepo = {
const DedupRepo = {
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Check if key exists (without inserting)
   * Check if key exists (without inserting)
// EXPLAIN: * @param {string} key - Idempotency key to check
   * @param {string} key - Idempotency key to check
// EXPLAIN: * @returns {boolean} True if key exists
   * @returns {boolean} True if key exists
// EXPLAIN: */
   */
// EXPLAIN: exists: function(key) {
  exists: function(key) {
// EXPLAIN: if (!key) return false;
    if (!key) return false;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const allData = getSheetData_(SHEETS.DEDUP_KEYS);
    const allData = getSheetData_(SHEETS.DEDUP_KEYS);
// EXPLAIN: return allData.some(row => row.key === key);
    return allData.some(row => row.key === key);
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Insert key if not exists (atomic operation with lock)
   * Insert key if not exists (atomic operation with lock)
// EXPLAIN: * This is the main idempotency check method
   * This is the main idempotency check method
// EXPLAIN: * @param {string} key - Idempotency key to insert
   * @param {string} key - Idempotency key to insert
// EXPLAIN: * @returns {Object} Result with inserted flag and message
   * @returns {Object} Result with inserted flag and message
// EXPLAIN: */
   */
// EXPLAIN: insertIfNotExists: function(key) {
  insertIfNotExists: function(key) {
// EXPLAIN: if (!key) {
    if (!key) {
// EXPLAIN: return { inserted: false, message: 'empty_key' };
      return { inserted: false, message: 'empty_key' };
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Acquire lock to prevent race condition
    // Acquire lock to prevent race condition
// EXPLAIN: const lock = LockService.getScriptLock();
    const lock = LockService.getScriptLock();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: try {
    try {
// EXPLAIN: // Wait up to 10 seconds for lock
      // Wait up to 10 seconds for lock
// EXPLAIN: lock.waitLock(10000);
      lock.waitLock(10000);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: // Double-check after acquiring lock
      // Double-check after acquiring lock
// EXPLAIN: if (this.exists(key)) {
      if (this.exists(key)) {
// EXPLAIN: return { inserted: false, message: 'duplicate_key' };
        return { inserted: false, message: 'duplicate_key' };
// EXPLAIN: }
      }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: // Insert new key
      // Insert new key
// EXPLAIN: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
      const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: appendRow_(SHEETS.DEDUP_KEYS, {
      appendRow_(SHEETS.DEDUP_KEYS, {
// EXPLAIN: key: key,
        key: key,
// EXPLAIN: created_at: now
        created_at: now
// EXPLAIN: });
      });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: Logger.log('DEDUP | Inserted key: ' + key);
      Logger.log('DEDUP | Inserted key: ' + key);
// EXPLAIN: return { inserted: true, message: 'ok' };
      return { inserted: true, message: 'ok' };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: } catch (e) {
    } catch (e) {
// EXPLAIN: Logger.log('DEDUP | Lock error: ' + e.message);
      Logger.log('DEDUP | Lock error: ' + e.message);
// EXPLAIN: return { inserted: false, message: 'lock_error: ' + e.message };
      return { inserted: false, message: 'lock_error: ' + e.message };
// EXPLAIN: } finally {
    } finally {
// EXPLAIN: // Always release lock
      // Always release lock
// EXPLAIN: try { lock.releaseLock(); } catch (e) {}
      try { lock.releaseLock(); } catch (e) {}
// EXPLAIN: }
    }
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get key record
   * Get key record
// EXPLAIN: * @param {string} key - Key to lookup
   * @param {string} key - Key to lookup
// EXPLAIN: * @returns {Object|null} Key record or null
   * @returns {Object|null} Key record or null
// EXPLAIN: */
   */
// EXPLAIN: get: function(key) {
  get: function(key) {
// EXPLAIN: if (!key) return null;
    if (!key) return null;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const allData = getSheetData_(SHEETS.DEDUP_KEYS);
    const allData = getSheetData_(SHEETS.DEDUP_KEYS);
// EXPLAIN: return allData.find(row => row.key === key) || null;
    return allData.find(row => row.key === key) || null;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get all keys (for debugging/audit)
   * Get all keys (for debugging/audit)
// EXPLAIN: * @returns {Array<Object>} All dedup keys
   * @returns {Array<Object>} All dedup keys
// EXPLAIN: */
   */
// EXPLAIN: getAll: function() {
  getAll: function() {
// EXPLAIN: return getSheetData_(SHEETS.DEDUP_KEYS);
    return getSheetData_(SHEETS.DEDUP_KEYS);
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get keys created after a certain date
   * Get keys created after a certain date
// EXPLAIN: * @param {string} afterDate - ISO date string
   * @param {string} afterDate - ISO date string
// EXPLAIN: * @returns {Array<Object>} Keys created after date
   * @returns {Array<Object>} Keys created after date
// EXPLAIN: */
   */
// EXPLAIN: getAfter: function(afterDate) {
  getAfter: function(afterDate) {
// EXPLAIN: const allData = getSheetData_(SHEETS.DEDUP_KEYS);
    const allData = getSheetData_(SHEETS.DEDUP_KEYS);
// EXPLAIN: return allData.filter(row => row.created_at > afterDate);
    return allData.filter(row => row.created_at > afterDate);
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Count total keys
   * Count total keys
// EXPLAIN: * @returns {number} Total key count
   * @returns {number} Total key count
// EXPLAIN: */
   */
// EXPLAIN: count: function() {
  count: function() {
// EXPLAIN: return getSheetData_(SHEETS.DEDUP_KEYS).length;
    return getSheetData_(SHEETS.DEDUP_KEYS).length;
// EXPLAIN: }
  }
// EXPLAIN: };
};
// Çağdaş Seçkin Tüfekci - Real Estate Agent
