/**
 * DedupRepo namespace for DEDUP_KEYS operations
 */
const DedupRepo = {
  
  /**
   * Check if key exists (without inserting)
   * @param {string} key - Idempotency key to check
   * @returns {boolean} True if key exists
   */
  exists: function(key) {
    if (!key) return false;
    
    const allData = getSheetData_(SHEETS.DEDUP_KEYS);
    return allData.some(row => row.key === key);
  },
  
  /**
   * Insert key if not exists (atomic operation with lock)
   * This is the main idempotency check method
   * @param {string} key - Idempotency key to insert
   * @returns {Object} Result with inserted flag and message
   */
  insertIfNotExists: function(key) {
    if (!key) {
      return { inserted: false, message: 'empty_key' };
    }
    
    // Acquire lock to prevent race condition
    const lock = LockService.getScriptLock();
    
    try {
      // Wait up to 10 seconds for lock
      lock.waitLock(10000);
      
      // Double-check after acquiring lock
      if (this.exists(key)) {
        return { inserted: false, message: 'duplicate_key' };
      }
      
      // Insert new key
      const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
      appendRow_(SHEETS.DEDUP_KEYS, {
        key: key,
        created_at: now
      });
      
      Logger.log('DEDUP | Inserted key: ' + key);
      return { inserted: true, message: 'ok' };
      
    } catch (e) {
      Logger.log('DEDUP | Lock error: ' + e.message);
      return { inserted: false, message: 'lock_error: ' + e.message };
    } finally {
      // Always release lock
      try { lock.releaseLock(); } catch (e) {}
    }
  },
  
  /**
   * Get key record
   * @param {string} key - Key to lookup
   * @returns {Object|null} Key record or null
   */
  get: function(key) {
    if (!key) return null;
    
    const allData = getSheetData_(SHEETS.DEDUP_KEYS);
    return allData.find(row => row.key === key) || null;
  },
  
  /**
   * Get all keys (for debugging/audit)
   * @returns {Array<Object>} All dedup keys
   */
  getAll: function() {
    return getSheetData_(SHEETS.DEDUP_KEYS);
  },
  
  /**
   * Get keys created after a certain date
   * @param {string} afterDate - ISO date string
   * @returns {Array<Object>} Keys created after date
   */
  getAfter: function(afterDate) {
    const allData = getSheetData_(SHEETS.DEDUP_KEYS);
    return allData.filter(row => row.created_at > afterDate);
  },
  
  /**
   * Count total keys
   * @returns {number} Total key count
   */
  count: function() {
    return getSheetData_(SHEETS.DEDUP_KEYS).length;
  }
};
// Çağdaş Seçkin Tüfekci - Real Estate Agent
