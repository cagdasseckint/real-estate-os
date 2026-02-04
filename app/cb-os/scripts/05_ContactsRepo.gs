// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 05_ContactsRepo.gs
 * CB-OS V1.0 - 05_ContactsRepo.gs
// EXPLAIN: * CONTACTS table operations
 * CONTACTS table operations
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * ContactsRepo namespace for CONTACTS operations
 * ContactsRepo namespace for CONTACTS operations
// EXPLAIN: */
 */
// EXPLAIN: const ContactsRepo = {
const ContactsRepo = {
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Create a new contact
   * Create a new contact
// EXPLAIN: * @param {Object} data - Contact data
   * @param {Object} data - Contact data
// EXPLAIN: * @returns {Object} Created contact with contact_id
   * @returns {Object} Created contact with contact_id
// EXPLAIN: */
   */
// EXPLAIN: create: function(data) {
  create: function(data) {
// EXPLAIN: const contactId = id_();
    const contactId = id_();
// EXPLAIN: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const contact = {
    const contact = {
// EXPLAIN: contact_id: contactId,
      contact_id: contactId,
// EXPLAIN: created_at: now,
      created_at: now,
// EXPLAIN: updated_at: now,
      updated_at: now,
// EXPLAIN: first_name: data.first_name || '',
      first_name: data.first_name || '',
// EXPLAIN: last_name: data.last_name || '',
      last_name: data.last_name || '',
// EXPLAIN: email: data.email || '',
      email: data.email || '',
// EXPLAIN: phone: data.phone || '',
      phone: data.phone || '',
// EXPLAIN: whatsapp: data.whatsapp || data.phone || '',
      whatsapp: data.whatsapp || data.phone || '',
// EXPLAIN: source: data.source || '',
      source: data.source || '',
// EXPLAIN: source_ref_id: data.source_ref_id || '',
      source_ref_id: data.source_ref_id || '',
// EXPLAIN: status: data.status || 'active',
      status: data.status || 'active',
// EXPLAIN: tags: data.tags || '',
      tags: data.tags || '',
// EXPLAIN: notes: data.notes || '',
      notes: data.notes || '',
// EXPLAIN: kvkk_consent: data.kvkk_consent || 'pending',
      kvkk_consent: data.kvkk_consent || 'pending',
// EXPLAIN: preferred_contact_method: data.preferred_contact_method || 'phone',
      preferred_contact_method: data.preferred_contact_method || 'phone',
// EXPLAIN: last_contact_at: ''
      last_contact_at: ''
// EXPLAIN: };
    };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const rowNum = appendRow_(SHEETS.CONTACTS, contact);
    const rowNum = appendRow_(SHEETS.CONTACTS, contact);
// EXPLAIN: contact._rowIndex = rowNum;
    contact._rowIndex = rowNum;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: Logger.log('CONTACTS | Created: ' + contactId);
    Logger.log('CONTACTS | Created: ' + contactId);
// EXPLAIN: return contact;
    return contact;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Find contact by ID
   * Find contact by ID
// EXPLAIN: * @param {string} contactId - Contact ID
   * @param {string} contactId - Contact ID
// EXPLAIN: * @returns {Object|null} Contact or null
   * @returns {Object|null} Contact or null
// EXPLAIN: */
   */
// EXPLAIN: findById: function(contactId) {
  findById: function(contactId) {
// EXPLAIN: const allData = getSheetData_(SHEETS.CONTACTS);
    const allData = getSheetData_(SHEETS.CONTACTS);
// EXPLAIN: return allData.find(row => row.contact_id === contactId) || null;
    return allData.find(row => row.contact_id === contactId) || null;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Find contact by email
   * Find contact by email
// EXPLAIN: * @param {string} email - Email address
   * @param {string} email - Email address
// EXPLAIN: * @returns {Object|null} Contact or null
   * @returns {Object|null} Contact or null
// EXPLAIN: */
   */
// EXPLAIN: findByEmail: function(email) {
  findByEmail: function(email) {
// EXPLAIN: if (!email) return null;
    if (!email) return null;
// EXPLAIN: const allData = getSheetData_(SHEETS.CONTACTS);
    const allData = getSheetData_(SHEETS.CONTACTS);
// EXPLAIN: return allData.find(row => row.email && row.email.toLowerCase() === email.toLowerCase()) || null;
    return allData.find(row => row.email && row.email.toLowerCase() === email.toLowerCase()) || null;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Find contact by phone
   * Find contact by phone
// EXPLAIN: * @param {string} phone - Phone number
   * @param {string} phone - Phone number
// EXPLAIN: * @returns {Object|null} Contact or null
   * @returns {Object|null} Contact or null
// EXPLAIN: */
   */
// EXPLAIN: findByPhone: function(phone) {
  findByPhone: function(phone) {
// EXPLAIN: if (!phone) return null;
    if (!phone) return null;
// EXPLAIN: const normalized = normalizePhone_(phone);
    const normalized = normalizePhone_(phone);
// EXPLAIN: const allData = getSheetData_(SHEETS.CONTACTS);
    const allData = getSheetData_(SHEETS.CONTACTS);
// EXPLAIN: return allData.find(row => normalizePhone_(row.phone) === normalized) || null;
    return allData.find(row => normalizePhone_(row.phone) === normalized) || null;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Update contact
   * Update contact
// EXPLAIN: * @param {string} contactId - Contact ID
   * @param {string} contactId - Contact ID
// EXPLAIN: * @param {Object} updates - Fields to update
   * @param {Object} updates - Fields to update
// EXPLAIN: * @returns {boolean} Success flag
   * @returns {boolean} Success flag
// EXPLAIN: */
   */
// EXPLAIN: update: function(contactId, updates) {
  update: function(contactId, updates) {
// EXPLAIN: const contact = this.findById(contactId);
    const contact = this.findById(contactId);
// EXPLAIN: if (!contact) return false;
    if (!contact) return false;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: updateRow_(SHEETS.CONTACTS, contact._rowIndex, updates);
    updateRow_(SHEETS.CONTACTS, contact._rowIndex, updates);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: Logger.log('CONTACTS | Updated: ' + contactId);
    Logger.log('CONTACTS | Updated: ' + contactId);
// EXPLAIN: return true;
    return true;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Update last contact timestamp
   * Update last contact timestamp
// EXPLAIN: * @param {string} contactId - Contact ID
   * @param {string} contactId - Contact ID
// EXPLAIN: */
   */
// EXPLAIN: touchLastContact: function(contactId) {
  touchLastContact: function(contactId) {
// EXPLAIN: this.update(contactId, {
    this.update(contactId, {
// EXPLAIN: last_contact_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
      last_contact_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
// EXPLAIN: });
    });
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Find or create contact by email/phone
   * Find or create contact by email/phone
// EXPLAIN: * @param {Object} data - Contact data with email or phone
   * @param {Object} data - Contact data with email or phone
// EXPLAIN: * @returns {Object} Existing or new contact
   * @returns {Object} Existing or new contact
// EXPLAIN: */
   */
// EXPLAIN: findOrCreate: function(data) {
  findOrCreate: function(data) {
// EXPLAIN: // Try to find by email first
    // Try to find by email first
// EXPLAIN: if (data.email) {
    if (data.email) {
// EXPLAIN: const byEmail = this.findByEmail(data.email);
      const byEmail = this.findByEmail(data.email);
// EXPLAIN: if (byEmail) {
      if (byEmail) {
// EXPLAIN: Logger.log('CONTACTS | Found by email: ' + byEmail.contact_id);
        Logger.log('CONTACTS | Found by email: ' + byEmail.contact_id);
// EXPLAIN: return byEmail;
        return byEmail;
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Try to find by phone
    // Try to find by phone
// EXPLAIN: if (data.phone) {
    if (data.phone) {
// EXPLAIN: const byPhone = this.findByPhone(data.phone);
      const byPhone = this.findByPhone(data.phone);
// EXPLAIN: if (byPhone) {
      if (byPhone) {
// EXPLAIN: Logger.log('CONTACTS | Found by phone: ' + byPhone.contact_id);
        Logger.log('CONTACTS | Found by phone: ' + byPhone.contact_id);
// EXPLAIN: return byPhone;
        return byPhone;
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Create new
    // Create new
// EXPLAIN: return this.create(data);
    return this.create(data);
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get all contacts
   * Get all contacts
// EXPLAIN: * @returns {Array<Object>} All contacts
   * @returns {Array<Object>} All contacts
// EXPLAIN: */
   */
// EXPLAIN: getAll: function() {
  getAll: function() {
// EXPLAIN: return getSheetData_(SHEETS.CONTACTS);
    return getSheetData_(SHEETS.CONTACTS);
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get contacts by status
   * Get contacts by status
// EXPLAIN: * @param {string} status - Status filter
   * @param {string} status - Status filter
// EXPLAIN: * @returns {Array<Object>} Filtered contacts
   * @returns {Array<Object>} Filtered contacts
// EXPLAIN: */
   */
// EXPLAIN: getByStatus: function(status) {
  getByStatus: function(status) {
// EXPLAIN: const allData = getSheetData_(SHEETS.CONTACTS);
    const allData = getSheetData_(SHEETS.CONTACTS);
// EXPLAIN: return allData.filter(row => row.status === status);
    return allData.filter(row => row.status === status);
// EXPLAIN: }
  }
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Normalize phone number for comparison
 * Normalize phone number for comparison
// EXPLAIN: * @param {string} phone - Phone number
 * @param {string} phone - Phone number
// EXPLAIN: * @returns {string} Normalized phone
 * @returns {string} Normalized phone
// EXPLAIN: */
 */
// EXPLAIN: function normalizePhone_(phone) {
function normalizePhone_(phone) {
// EXPLAIN: if (!phone) return '';
  if (!phone) return '';
// EXPLAIN: // Remove all non-digit characters
  // Remove all non-digit characters
// EXPLAIN: return String(phone).replace(/\D/g, '');
  return String(phone).replace(/\D/g, '');
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
