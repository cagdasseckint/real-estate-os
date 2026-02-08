/**
 * ContactsRepo namespace for CONTACTS operations
 */
const ContactsRepo = {
  
  /**
   * Create a new contact
   * @param {Object} data - Contact data
   * @returns {Object} Created contact with contact_id
   */
  create: function(data) {
    const contactId = id_();
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    
    const contact = {
      contact_id: contactId,
      created_at: now,
      updated_at: now,
      first_name: data.first_name || '',
      last_name: data.last_name || '',
      email: data.email || '',
      phone: data.phone || '',
      whatsapp: data.whatsapp || data.phone || '',
      source: data.source || '',
      source_ref_id: data.source_ref_id || '',
      status: data.status || 'active',
      tags: normalizeTags_(data.tags || ''),
      notes: data.notes || '',
      kvkk_consent: data.kvkk_consent || 'pending',
      preferred_contact_method: data.preferred_contact_method || 'phone',
      last_contact_at: '',
      phone_alt: data.phone_alt || '',
      profession: data.profession || '',
      address: data.address || '',
      fax: data.fax || '',
      work_phone: data.work_phone || '',
      authorized_name: data.authorized_name || '',
      authorized_phone: data.authorized_phone || '',
      contact_role: data.contact_role || '',
      follow_up: data.follow_up || '',
      next_contact_at: data.next_contact_at || ''
    };
    
    const rowNum = appendRow_(SHEETS.CONTACTS, contact);
    contact._rowIndex = rowNum;
    
    Logger.log('CONTACTS | Created: ' + contactId);
    return contact;
  },
  
  /**
   * Find contact by ID
   * @param {string} contactId - Contact ID
   * @returns {Object|null} Contact or null
   */
  findById: function(contactId) {
    const allData = getSheetData_(SHEETS.CONTACTS);
    return allData.find(row => row.contact_id === contactId) || null;
  },
  
  /**
   * Find contact by email
   * @param {string} email - Email address
   * @returns {Object|null} Contact or null
   */
  findByEmail: function(email) {
    if (!email) return null;
    const allData = getSheetData_(SHEETS.CONTACTS);
    return allData.find(row => row.email && row.email.toLowerCase() === email.toLowerCase()) || null;
  },
  
  /**
   * Find contact by phone
   * @param {string} phone - Phone number
   * @returns {Object|null} Contact or null
   */
  findByPhone: function(phone) {
    if (!phone) return null;
    const normalized = normalizePhone_(phone);
    const allData = getSheetData_(SHEETS.CONTACTS);
    return allData.find(row => normalizePhone_(row.phone) === normalized) || null;
  },
  
  /**
   * Update contact
   * @param {string} contactId - Contact ID
   * @param {Object} updates - Fields to update
   * @returns {boolean} Success flag
   */
  update: function(contactId, updates) {
    const contact = this.findById(contactId);
    if (!contact) return false;
    if (Object.prototype.hasOwnProperty.call(updates, 'tags')) {
      updates.tags = normalizeTags_(updates.tags || '');
    }
    updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    updateRow_(SHEETS.CONTACTS, contact._rowIndex, updates);
    
    Logger.log('CONTACTS | Updated: ' + contactId);
    return true;
  },
  
  /**
   * Update last contact timestamp
   * @param {string} contactId - Contact ID
   */
  touchLastContact: function(contactId) {
    this.update(contactId, {
      last_contact_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
    });
  },
  
  /**
   * Find or create contact by email/phone
   * @param {Object} data - Contact data with email or phone
   * @returns {Object} Existing or new contact
   */
  findOrCreate: function(data) {
    // Try to find by email first
    if (data.email) {
      const byEmail = this.findByEmail(data.email);
      if (byEmail) {
        Logger.log('CONTACTS | Found by email: ' + byEmail.contact_id);
        return byEmail;
      }
    }
    
    // Try to find by phone
    if (data.phone) {
      const byPhone = this.findByPhone(data.phone);
      if (byPhone) {
        Logger.log('CONTACTS | Found by phone: ' + byPhone.contact_id);
        return byPhone;
      }
    }
    
    // Create new
    return this.create(data);
  },
  
  /**
   * Get all contacts
   * @returns {Array<Object>} All contacts
   */
  getAll: function() {
    return getSheetData_(SHEETS.CONTACTS);
  },
  
  /**
   * Get contacts by status
   * @param {string} status - Status filter
   * @returns {Array<Object>} Filtered contacts
   */
  getByStatus: function(status) {
    const allData = getSheetData_(SHEETS.CONTACTS);
    return allData.filter(row => row.status === status);
  }
};

/**
 * Normalize phone number for comparison
 * @param {string} phone - Phone number
 * @returns {string} Normalized phone
 */
function normalizePhone_(phone) {
  if (!phone) return '';
  // Remove all non-digit characters
  return String(phone).replace(/\D/g, '');
}

/**
 * Normalize tags and validate against allowed taxonomy.
 * @param {string} tags - Comma-separated tags
 * @returns {string} Normalized comma-separated tags
 */
function normalizeTags_(tags) {
  if (!tags) return '';
  const normalized = String(tags)
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean);
  validateContactTags_(normalized);
  return normalized.join(',');
}

/**
 * Validate contact tags against allowed taxonomy or prefixes.
 * @param {Array<string>} tags - Normalized tags
 */
function validateContactTags_(tags) {
  if (!tags || !tags.length) return;
  const allowed = new Set(CONTACT_TAGS);
  const invalid = tags.filter(tag => !isAllowedContactTag_(tag, allowed));
  if (invalid.length) {
    throw new Error('Invalid CONTACTS.tags value(s): ' + invalid.join(', '));
  }
}

/**
 * Check if tag is allowed via taxonomy or prefix.
 * @param {string} tag - Tag value
 * @param {Set<string>} allowed
 * @returns {boolean}
 */
function isAllowedContactTag_(tag, allowed) {
  if (allowed.has(tag)) return true;
  const parts = String(tag).split(':');
  if (parts.length < 2) return false;
  const prefix = parts[0].trim();
  return CONTACT_TAG_PREFIXES.indexOf(prefix) !== -1;
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
