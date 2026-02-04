// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS V1.0 - 09_DedupRepo.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS V1.0 - 09_DedupRepo.gs
// EXPLAIN: Bu satırın görevi: * DEDUP_KEYS table operations for idempotency control. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * DEDUP_KEYS table operations for idempotency control
// EXPLAIN: Bu satırın görevi: * Uses LockService to prevent race conditions. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Uses LockService to prevent race conditions
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * DedupRepo namespace for DEDUP_KEYS operations. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * DedupRepo namespace for DEDUP_KEYS operations
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: const DedupRepo = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const DedupRepo = {
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Check if key exists (without inserting). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Check if key exists (without inserting)
// EXPLAIN: Bu satırın görevi: * @param {string} key - Idempotency key to check. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} key - Idempotency key to check
// EXPLAIN: Bu satırın görevi: * @returns {boolean} True if key exists. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {boolean} True if key exists
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: exists: function(key) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  exists: function(key) {
// EXPLAIN: Bu satırın görevi: if (!key) return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!key) return false;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.DEDUP_KEYS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.DEDUP_KEYS);
// EXPLAIN: Bu satırın görevi: return allData.some(row => row.key === key);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.some(row => row.key === key);
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Insert key if not exists (atomic operation with lock). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Insert key if not exists (atomic operation with lock)
// EXPLAIN: Bu satırın görevi: * This is the main idempotency check method. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * This is the main idempotency check method
// EXPLAIN: Bu satırın görevi: * @param {string} key - Idempotency key to insert. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} key - Idempotency key to insert
// EXPLAIN: Bu satırın görevi: * @returns {Object} Result with inserted flag and message. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Object} Result with inserted flag and message
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: insertIfNotExists: function(key) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  insertIfNotExists: function(key) {
// EXPLAIN: Bu satırın görevi: if (!key) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!key) {
// EXPLAIN: Bu satırın görevi: return { inserted: false, message: 'empty_key' };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return { inserted: false, message: 'empty_key' };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Acquire lock to prevent race condition. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Acquire lock to prevent race condition
// EXPLAIN: Bu satırın görevi: const lock = LockService.getScriptLock();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const lock = LockService.getScriptLock();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    try {
// EXPLAIN: Bu satırın görevi: // Wait up to 10 seconds for lock. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      // Wait up to 10 seconds for lock
// EXPLAIN: Bu satırın görevi: lock.waitLock(10000);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      lock.waitLock(10000);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: // Double-check after acquiring lock. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      // Double-check after acquiring lock
// EXPLAIN: Bu satırın görevi: if (this.exists(key)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (this.exists(key)) {
// EXPLAIN: Bu satırın görevi: return { inserted: false, message: 'duplicate_key' };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        return { inserted: false, message: 'duplicate_key' };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: // Insert new key. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      // Insert new key
// EXPLAIN: Bu satırın görevi: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satırın görevi: appendRow_(SHEETS.DEDUP_KEYS, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      appendRow_(SHEETS.DEDUP_KEYS, {
// EXPLAIN: Bu satırın görevi: key: key,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        key: key,
// EXPLAIN: Bu satırın görevi: created_at: now. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        created_at: now
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: Logger.log('DEDUP | Inserted key: ' + key);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      Logger.log('DEDUP | Inserted key: ' + key);
// EXPLAIN: Bu satırın görevi: return { inserted: true, message: 'ok' };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return { inserted: true, message: 'ok' };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } catch (e) {
// EXPLAIN: Bu satırın görevi: Logger.log('DEDUP | Lock error: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      Logger.log('DEDUP | Lock error: ' + e.message);
// EXPLAIN: Bu satırın görevi: return { inserted: false, message: 'lock_error: ' + e.message };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return { inserted: false, message: 'lock_error: ' + e.message };
// EXPLAIN: Bu satırın görevi: } finally {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } finally {
// EXPLAIN: Bu satırın görevi: // Always release lock. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      // Always release lock
// EXPLAIN: Bu satırın görevi: try { lock.releaseLock(); } catch (e) {}. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      try { lock.releaseLock(); } catch (e) {}
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get key record. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get key record
// EXPLAIN: Bu satırın görevi: * @param {string} key - Key to lookup. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} key - Key to lookup
// EXPLAIN: Bu satırın görevi: * @returns {Object|null} Key record or null. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Object|null} Key record or null
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: get: function(key) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  get: function(key) {
// EXPLAIN: Bu satırın görevi: if (!key) return null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!key) return null;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.DEDUP_KEYS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.DEDUP_KEYS);
// EXPLAIN: Bu satırın görevi: return allData.find(row => row.key === key) || null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.find(row => row.key === key) || null;
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get all keys (for debugging/audit). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get all keys (for debugging/audit)
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} All dedup keys. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Array<Object>} All dedup keys
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: getAll: function() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  getAll: function() {
// EXPLAIN: Bu satırın görevi: return getSheetData_(SHEETS.DEDUP_KEYS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return getSheetData_(SHEETS.DEDUP_KEYS);
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get keys created after a certain date. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get keys created after a certain date
// EXPLAIN: Bu satırın görevi: * @param {string} afterDate - ISO date string. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} afterDate - ISO date string
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Keys created after date. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Array<Object>} Keys created after date
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: getAfter: function(afterDate) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  getAfter: function(afterDate) {
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.DEDUP_KEYS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.DEDUP_KEYS);
// EXPLAIN: Bu satırın görevi: return allData.filter(row => row.created_at > afterDate);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.filter(row => row.created_at > afterDate);
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Count total keys. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Count total keys
// EXPLAIN: Bu satırın görevi: * @returns {number} Total key count. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {number} Total key count
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: count: function() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  count: function() {
// EXPLAIN: Bu satırın görevi: return getSheetData_(SHEETS.DEDUP_KEYS).length;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return getSheetData_(SHEETS.DEDUP_KEYS).length;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// Çağdaş Seçkin Tüfekci - Real Estate Agent
