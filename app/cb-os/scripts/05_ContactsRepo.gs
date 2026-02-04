// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS V1.0 - 05_ContactsRepo.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS V1.0 - 05_ContactsRepo.gs
// EXPLAIN: Bu satırın görevi: * CONTACTS table operations. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CONTACTS table operations
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * ContactsRepo namespace for CONTACTS operations. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * ContactsRepo namespace for CONTACTS operations
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: const ContactsRepo = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const ContactsRepo = {
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Create a new contact. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Create a new contact
// EXPLAIN: Bu satırın görevi: * @param {Object} data - Contact data. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {Object} data - Contact data
// EXPLAIN: Bu satırın görevi: * @returns {Object} Created contact with contact_id. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Object} Created contact with contact_id
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: create: function(data) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  create: function(data) {
// EXPLAIN: Bu satırın görevi: const contactId = id_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const contactId = id_();
// EXPLAIN: Bu satırın görevi: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const contact = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const contact = {
// EXPLAIN: Bu satırın görevi: contact_id: contactId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      contact_id: contactId,
// EXPLAIN: Bu satırın görevi: created_at: now,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      created_at: now,
// EXPLAIN: Bu satırın görevi: updated_at: now,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      updated_at: now,
// EXPLAIN: Bu satırın görevi: first_name: data.first_name || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      first_name: data.first_name || '',
// EXPLAIN: Bu satırın görevi: last_name: data.last_name || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      last_name: data.last_name || '',
// EXPLAIN: Bu satırın görevi: email: data.email || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      email: data.email || '',
// EXPLAIN: Bu satırın görevi: phone: data.phone || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      phone: data.phone || '',
// EXPLAIN: Bu satırın görevi: whatsapp: data.whatsapp || data.phone || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      whatsapp: data.whatsapp || data.phone || '',
// EXPLAIN: Bu satırın görevi: source: data.source || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source: data.source || '',
// EXPLAIN: Bu satırın görevi: source_ref_id: data.source_ref_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source_ref_id: data.source_ref_id || '',
// EXPLAIN: Bu satırın görevi: status: data.status || 'active',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      status: data.status || 'active',
// EXPLAIN: Bu satırın görevi: tags: data.tags || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      tags: data.tags || '',
// EXPLAIN: Bu satırın görevi: notes: data.notes || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      notes: data.notes || '',
// EXPLAIN: Bu satırın görevi: kvkk_consent: data.kvkk_consent || 'pending',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      kvkk_consent: data.kvkk_consent || 'pending',
// EXPLAIN: Bu satırın görevi: preferred_contact_method: data.preferred_contact_method || 'phone',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      preferred_contact_method: data.preferred_contact_method || 'phone',
// EXPLAIN: Bu satırın görevi: last_contact_at: ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      last_contact_at: ''
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const rowNum = appendRow_(SHEETS.CONTACTS, contact);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const rowNum = appendRow_(SHEETS.CONTACTS, contact);
// EXPLAIN: Bu satırın görevi: contact._rowIndex = rowNum;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    contact._rowIndex = rowNum;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: Logger.log('CONTACTS | Created: ' + contactId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('CONTACTS | Created: ' + contactId);
// EXPLAIN: Bu satırın görevi: return contact;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return contact;
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Find contact by ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Find contact by ID
// EXPLAIN: Bu satırın görevi: * @param {string} contactId - Contact ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} contactId - Contact ID
// EXPLAIN: Bu satırın görevi: * @returns {Object|null} Contact or null. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Object|null} Contact or null
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: findById: function(contactId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  findById: function(contactId) {
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.CONTACTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.CONTACTS);
// EXPLAIN: Bu satırın görevi: return allData.find(row => row.contact_id === contactId) || null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.find(row => row.contact_id === contactId) || null;
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Find contact by email. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Find contact by email
// EXPLAIN: Bu satırın görevi: * @param {string} email - Email address. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} email - Email address
// EXPLAIN: Bu satırın görevi: * @returns {Object|null} Contact or null. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Object|null} Contact or null
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: findByEmail: function(email) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  findByEmail: function(email) {
// EXPLAIN: Bu satırın görevi: if (!email) return null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!email) return null;
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.CONTACTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.CONTACTS);
// EXPLAIN: Bu satırın görevi: return allData.find(row => row.email && row.email.toLowerCase() === email.toLowerCase()) || null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.find(row => row.email && row.email.toLowerCase() === email.toLowerCase()) || null;
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Find contact by phone. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Find contact by phone
// EXPLAIN: Bu satırın görevi: * @param {string} phone - Phone number. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} phone - Phone number
// EXPLAIN: Bu satırın görevi: * @returns {Object|null} Contact or null. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Object|null} Contact or null
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: findByPhone: function(phone) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  findByPhone: function(phone) {
// EXPLAIN: Bu satırın görevi: if (!phone) return null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!phone) return null;
// EXPLAIN: Bu satırın görevi: const normalized = normalizePhone_(phone);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const normalized = normalizePhone_(phone);
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.CONTACTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.CONTACTS);
// EXPLAIN: Bu satırın görevi: return allData.find(row => normalizePhone_(row.phone) === normalized) || null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.find(row => normalizePhone_(row.phone) === normalized) || null;
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Update contact. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Update contact
// EXPLAIN: Bu satırın görevi: * @param {string} contactId - Contact ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} contactId - Contact ID
// EXPLAIN: Bu satırın görevi: * @param {Object} updates - Fields to update. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {Object} updates - Fields to update
// EXPLAIN: Bu satırın görevi: * @returns {boolean} Success flag. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {boolean} Success flag
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: update: function(contactId, updates) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  update: function(contactId, updates) {
// EXPLAIN: Bu satırın görevi: const contact = this.findById(contactId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const contact = this.findById(contactId);
// EXPLAIN: Bu satırın görevi: if (!contact) return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!contact) return false;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satırın görevi: updateRow_(SHEETS.CONTACTS, contact._rowIndex, updates);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    updateRow_(SHEETS.CONTACTS, contact._rowIndex, updates);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: Logger.log('CONTACTS | Updated: ' + contactId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('CONTACTS | Updated: ' + contactId);
// EXPLAIN: Bu satırın görevi: return true;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return true;
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Update last contact timestamp. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Update last contact timestamp
// EXPLAIN: Bu satırın görevi: * @param {string} contactId - Contact ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} contactId - Contact ID
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: touchLastContact: function(contactId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  touchLastContact: function(contactId) {
// EXPLAIN: Bu satırın görevi: this.update(contactId, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    this.update(contactId, {
// EXPLAIN: Bu satırın görevi: last_contact_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      last_contact_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Find or create contact by email/phone. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Find or create contact by email/phone
// EXPLAIN: Bu satırın görevi: * @param {Object} data - Contact data with email or phone. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {Object} data - Contact data with email or phone
// EXPLAIN: Bu satırın görevi: * @returns {Object} Existing or new contact. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Object} Existing or new contact
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: findOrCreate: function(data) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  findOrCreate: function(data) {
// EXPLAIN: Bu satırın görevi: // Try to find by email first. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Try to find by email first
// EXPLAIN: Bu satırın görevi: if (data.email) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (data.email) {
// EXPLAIN: Bu satırın görevi: const byEmail = this.findByEmail(data.email);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const byEmail = this.findByEmail(data.email);
// EXPLAIN: Bu satırın görevi: if (byEmail) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (byEmail) {
// EXPLAIN: Bu satırın görevi: Logger.log('CONTACTS | Found by email: ' + byEmail.contact_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        Logger.log('CONTACTS | Found by email: ' + byEmail.contact_id);
// EXPLAIN: Bu satırın görevi: return byEmail;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        return byEmail;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Try to find by phone. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Try to find by phone
// EXPLAIN: Bu satırın görevi: if (data.phone) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (data.phone) {
// EXPLAIN: Bu satırın görevi: const byPhone = this.findByPhone(data.phone);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const byPhone = this.findByPhone(data.phone);
// EXPLAIN: Bu satırın görevi: if (byPhone) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (byPhone) {
// EXPLAIN: Bu satırın görevi: Logger.log('CONTACTS | Found by phone: ' + byPhone.contact_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        Logger.log('CONTACTS | Found by phone: ' + byPhone.contact_id);
// EXPLAIN: Bu satırın görevi: return byPhone;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        return byPhone;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Create new. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Create new
// EXPLAIN: Bu satırın görevi: return this.create(data);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return this.create(data);
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get all contacts. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get all contacts
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} All contacts. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Array<Object>} All contacts
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: getAll: function() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  getAll: function() {
// EXPLAIN: Bu satırın görevi: return getSheetData_(SHEETS.CONTACTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return getSheetData_(SHEETS.CONTACTS);
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get contacts by status. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get contacts by status
// EXPLAIN: Bu satırın görevi: * @param {string} status - Status filter. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} status - Status filter
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Filtered contacts. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Array<Object>} Filtered contacts
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: getByStatus: function(status) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  getByStatus: function(status) {
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.CONTACTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.CONTACTS);
// EXPLAIN: Bu satırın görevi: return allData.filter(row => row.status === status);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.filter(row => row.status === status);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Normalize phone number for comparison. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Normalize phone number for comparison
// EXPLAIN: Bu satırın görevi: * @param {string} phone - Phone number. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} phone - Phone number
// EXPLAIN: Bu satırın görevi: * @returns {string} Normalized phone. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {string} Normalized phone
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function normalizePhone_(phone) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizePhone_(phone) {
// EXPLAIN: Bu satırın görevi: if (!phone) return '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!phone) return '';
// EXPLAIN: Bu satırın görevi: // Remove all non-digit characters. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Remove all non-digit characters
// EXPLAIN: Bu satırın görevi: return String(phone).replace(/\D/g, '');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return String(phone).replace(/\D/g, '');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
