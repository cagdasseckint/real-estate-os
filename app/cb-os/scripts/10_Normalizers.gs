// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 10_Normalizers.gs
 * CB-OS V1.0 - 10_Normalizers.gs
// EXPLAIN: * Data normalization functions for ingest processing
 * Data normalization functions for ingest processing
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Normalize new lead payload into contact and deal data
 * Normalize new lead payload into contact and deal data
// EXPLAIN: * @param {Object} payload - Raw payload from ingest
 * @param {Object} payload - Raw payload from ingest
// EXPLAIN: * @returns {Object} Normalized data with contact and deal objects
 * @returns {Object} Normalized data with contact and deal objects
// EXPLAIN: */
 */
// EXPLAIN: function normalizeNewLead_(payload) {
function normalizeNewLead_(payload) {
// EXPLAIN: const result = {
  const result = {
// EXPLAIN: contact: {},
    contact: {},
// EXPLAIN: deal: {},
    deal: {},
// EXPLAIN: errors: []
    errors: []
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Extract contact fields
  // Extract contact fields
// EXPLAIN: result.contact = {
  result.contact = {
// EXPLAIN: first_name: payload.first_name || payload.firstName || payload.name?.split(' ')[0] || '',
    first_name: payload.first_name || payload.firstName || payload.name?.split(' ')[0] || '',
// EXPLAIN: last_name: payload.last_name || payload.lastName || payload.name?.split(' ').slice(1).join(' ') || '',
    last_name: payload.last_name || payload.lastName || payload.name?.split(' ').slice(1).join(' ') || '',
// EXPLAIN: email: normalizeEmail_(payload.email),
    email: normalizeEmail_(payload.email),
// EXPLAIN: phone: normalizePhone_(payload.phone || payload.tel || payload.mobile),
    phone: normalizePhone_(payload.phone || payload.tel || payload.mobile),
// EXPLAIN: whatsapp: normalizePhone_(payload.whatsapp || payload.phone || payload.tel),
    whatsapp: normalizePhone_(payload.whatsapp || payload.phone || payload.tel),
// EXPLAIN: source: payload.source || 'unknown',
    source: payload.source || 'unknown',
// EXPLAIN: source_ref_id: payload.source_ref_id || payload.source_id || '',
    source_ref_id: payload.source_ref_id || payload.source_id || '',
// EXPLAIN: notes: payload.notes || payload.message || '',
    notes: payload.notes || payload.message || '',
// EXPLAIN: preferred_contact_method: payload.preferred_contact_method || 'phone'
    preferred_contact_method: payload.preferred_contact_method || 'phone'
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Extract deal fields
  // Extract deal fields
// EXPLAIN: result.deal = {
  result.deal = {
// EXPLAIN: deal_type: normalizeDealType_(payload.deal_type || payload.type || payload.interest_type),
    deal_type: normalizeDealType_(payload.deal_type || payload.type || payload.interest_type),
// EXPLAIN: stage: 'NEW',
    stage: 'NEW',
// EXPLAIN: deal_value: normalizeNumber_(payload.deal_value || payload.value || payload.budget),
    deal_value: normalizeNumber_(payload.deal_value || payload.value || payload.budget),
// EXPLAIN: currency: payload.currency || 'TRY',
    currency: payload.currency || 'TRY',
// EXPLAIN: property_type: payload.property_type || payload.propertyType || '',
    property_type: payload.property_type || payload.propertyType || '',
// EXPLAIN: property_address: payload.property_address || payload.address || payload.location || '',
    property_address: payload.property_address || payload.address || payload.location || '',
// EXPLAIN: listing_price: normalizeNumber_(payload.listing_price || payload.price),
    listing_price: normalizeNumber_(payload.listing_price || payload.price),
// EXPLAIN: notes: payload.deal_notes || '',
    notes: payload.deal_notes || '',
// EXPLAIN: docs_required: payload.docs_required || '',
    docs_required: payload.docs_required || '',
// EXPLAIN: parcel_present: payload.parcel_present || payload.parcel || '',
    parcel_present: payload.parcel_present || payload.parcel || '',
// EXPLAIN: lead_source: payload.lead_source || payload.source || payload.channel || '',
    lead_source: payload.lead_source || payload.source || payload.channel || '',
// EXPLAIN: intent: payload.intent || payload.interest || '',
    intent: payload.intent || payload.interest || '',
// EXPLAIN: budget: normalizeNumber_(payload.budget || payload.max_budget || payload.deal_value),
    budget: normalizeNumber_(payload.budget || payload.max_budget || payload.deal_value),
// EXPLAIN: region: payload.region || payload.area || payload.district || '',
    region: payload.region || payload.area || payload.district || '',
// EXPLAIN: timing: payload.timing || payload.purchase_timeline || '',
    timing: payload.timing || payload.purchase_timeline || '',
// EXPLAIN: utm_source: payload.utm_source || payload.utmSource || '',
    utm_source: payload.utm_source || payload.utmSource || '',
// EXPLAIN: utm_medium: payload.utm_medium || payload.utmMedium || '',
    utm_medium: payload.utm_medium || payload.utmMedium || '',
// EXPLAIN: utm_campaign: payload.utm_campaign || payload.utmCampaign || '',
    utm_campaign: payload.utm_campaign || payload.utmCampaign || '',
// EXPLAIN: utm_term: payload.utm_term || payload.utmTerm || '',
    utm_term: payload.utm_term || payload.utmTerm || '',
// EXPLAIN: utm_content: payload.utm_content || payload.utmContent || '',
    utm_content: payload.utm_content || payload.utmContent || '',
// EXPLAIN: gclid: payload.gclid || ''
    gclid: payload.gclid || ''
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Validate required fields
  // Validate required fields
// EXPLAIN: if (!result.contact.first_name && !result.contact.email && !result.contact.phone) {
  if (!result.contact.first_name && !result.contact.email && !result.contact.phone) {
// EXPLAIN: result.errors.push('Missing contact identifier (name, email, or phone)');
    result.errors.push('Missing contact identifier (name, email, or phone)');
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return result;
  return result;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Normalize LAND-specific payload
 * Normalize LAND-specific payload
// EXPLAIN: * @param {Object} payload - Raw LAND payload
 * @param {Object} payload - Raw LAND payload
// EXPLAIN: * @returns {Object} Normalized LAND deal data
 * @returns {Object} Normalized LAND deal data
// EXPLAIN: */
 */
// EXPLAIN: function normalizeLandPayload_(payload) {
function normalizeLandPayload_(payload) {
// EXPLAIN: const base = normalizeNewLead_(payload);
  const base = normalizeNewLead_(payload);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // LAND-specific fields
  // LAND-specific fields
// EXPLAIN: base.deal.deal_type = 'LAND';
  base.deal.deal_type = 'LAND';
// EXPLAIN: base.deal.docs_required = payload.docs_required || payload.required_docs ||
  base.deal.docs_required = payload.docs_required || payload.required_docs || 
// EXPLAIN: payload.docs?.join(',') || '';
                            payload.docs?.join(',') || '';
// EXPLAIN: base.deal.parcel_present = String(payload.parcel_present || payload.parcel ||
  base.deal.parcel_present = String(payload.parcel_present || payload.parcel || 
// EXPLAIN: payload.has_parcel || 'unknown');
                                    payload.has_parcel || 'unknown');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Additional LAND fields in notes
  // Additional LAND fields in notes
// EXPLAIN: const landNotes = [];
  const landNotes = [];
// EXPLAIN: if (payload.land_area) landNotes.push('Area: ' + payload.land_area);
  if (payload.land_area) landNotes.push('Area: ' + payload.land_area);
// EXPLAIN: if (payload.zoning) landNotes.push('Zoning: ' + payload.zoning);
  if (payload.zoning) landNotes.push('Zoning: ' + payload.zoning);
// EXPLAIN: if (payload.access_road) landNotes.push('Access: ' + payload.access_road);
  if (payload.access_road) landNotes.push('Access: ' + payload.access_road);
// EXPLAIN: if (payload.utilities) landNotes.push('Utilities: ' + payload.utilities);
  if (payload.utilities) landNotes.push('Utilities: ' + payload.utilities);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (landNotes.length > 0) {
  if (landNotes.length > 0) {
// EXPLAIN: base.deal.notes = (base.deal.notes ? base.deal.notes + ' | ' : '') + landNotes.join(' | ');
    base.deal.notes = (base.deal.notes ? base.deal.notes + ' | ' : '') + landNotes.join(' | ');
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return base;
  return base;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Normalize task payload
 * Normalize task payload
// EXPLAIN: * @param {Object} payload - Raw task payload
 * @param {Object} payload - Raw task payload
// EXPLAIN: * @returns {Object} Normalized task data
 * @returns {Object} Normalized task data
// EXPLAIN: */
 */
// EXPLAIN: function normalizeTask_(payload) {
function normalizeTask_(payload) {
// EXPLAIN: return {
  return {
// EXPLAIN: entity_type: payload.entity_type || '',
    entity_type: payload.entity_type || '',
// EXPLAIN: entity_id: payload.entity_id || '',
    entity_id: payload.entity_id || '',
// EXPLAIN: title: payload.title || payload.name || '',
    title: payload.title || payload.name || '',
// EXPLAIN: description: payload.description || payload.desc || '',
    description: payload.description || payload.desc || '',
// EXPLAIN: due_date: normalizeDate_(payload.due_date || payload.due),
    due_date: normalizeDate_(payload.due_date || payload.due),
// EXPLAIN: priority: normalizePriority_(payload.priority),
    priority: normalizePriority_(payload.priority),
// EXPLAIN: status: payload.status || 'pending',
    status: payload.status || 'pending',
// EXPLAIN: assigned_to: payload.assigned_to || payload.assignee || ''
    assigned_to: payload.assigned_to || payload.assignee || ''
// EXPLAIN: };
  };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Normalize appointment payload
 * Normalize appointment payload
// EXPLAIN: * @param {Object} payload - Raw appointment payload
 * @param {Object} payload - Raw appointment payload
// EXPLAIN: * @returns {Object} Normalized appointment data
 * @returns {Object} Normalized appointment data
// EXPLAIN: */
 */
// EXPLAIN: function normalizeAppointment_(payload) {
function normalizeAppointment_(payload) {
// EXPLAIN: return {
  return {
// EXPLAIN: contact_id: payload.contact_id || '',
    contact_id: payload.contact_id || '',
// EXPLAIN: deal_id: payload.deal_id || '',
    deal_id: payload.deal_id || '',
// EXPLAIN: scheduled_at: normalizeDateTime_(payload.scheduled_at || payload.datetime || payload.date),
    scheduled_at: normalizeDateTime_(payload.scheduled_at || payload.datetime || payload.date),
// EXPLAIN: duration_minutes: normalizeNumber_(payload.duration_minutes || payload.duration) || 60,
    duration_minutes: normalizeNumber_(payload.duration_minutes || payload.duration) || 60,
// EXPLAIN: location: payload.location || payload.address || '',
    location: payload.location || payload.address || '',
// EXPLAIN: meeting_type: payload.meeting_type || payload.type || 'in_person',
    meeting_type: payload.meeting_type || payload.type || 'in_person',
// EXPLAIN: notes: payload.notes || ''
    notes: payload.notes || ''
// EXPLAIN: };
  };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Normalize email to lowercase, trim
 * Normalize email to lowercase, trim
// EXPLAIN: * @param {string} email - Raw email
 * @param {string} email - Raw email
// EXPLAIN: * @returns {string} Normalized email
 * @returns {string} Normalized email
// EXPLAIN: */
 */
// EXPLAIN: function normalizeEmail_(email) {
function normalizeEmail_(email) {
// EXPLAIN: if (!email) return '';
  if (!email) return '';
// EXPLAIN: return String(email).toLowerCase().trim();
  return String(email).toLowerCase().trim();
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Normalize deal type to valid DEAL_TYPES key
 * Normalize deal type to valid DEAL_TYPES key
// EXPLAIN: * @param {string} type - Raw deal type
 * @param {string} type - Raw deal type
// EXPLAIN: * @returns {string} Normalized deal type
 * @returns {string} Normalized deal type
// EXPLAIN: */
 */
// EXPLAIN: function normalizeDealType_(type) {
function normalizeDealType_(type) {
// EXPLAIN: if (!type) return 'BUYER'; // Default
  if (!type) return 'BUYER'; // Default
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const upper = String(type).toUpperCase().trim();
  const upper = String(type).toUpperCase().trim();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Direct match
  // Direct match
// EXPLAIN: if (DEAL_TYPES[upper]) return upper;
  if (DEAL_TYPES[upper]) return upper;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Aliases
  // Aliases
// EXPLAIN: const aliases = {
  const aliases = {
// EXPLAIN: 'SELL': 'SELLER',
    'SELL': 'SELLER',
// EXPLAIN: 'SELLING': 'SELLER',
    'SELLING': 'SELLER',
// EXPLAIN: 'SATICI': 'SELLER',
    'SATICI': 'SELLER',
// EXPLAIN: 'SATILIK': 'SELLER',
    'SATILIK': 'SELLER',
// EXPLAIN: 'BUY': 'BUYER',
    'BUY': 'BUYER',
// EXPLAIN: 'BUYING': 'BUYER',
    'BUYING': 'BUYER',
// EXPLAIN: 'ALICI': 'BUYER',
    'ALICI': 'BUYER',
// EXPLAIN: 'RENTAL': 'RENT',
    'RENTAL': 'RENT',
// EXPLAIN: 'RENTING': 'RENT',
    'RENTING': 'RENT',
// EXPLAIN: 'KIRALAMA': 'RENT',
    'KIRALAMA': 'RENT',
// EXPLAIN: 'KIRALIK': 'RENT',
    'KIRALIK': 'RENT',
// EXPLAIN: 'ARSA': 'LAND',
    'ARSA': 'LAND',
// EXPLAIN: 'ARAZI': 'LAND',
    'ARAZI': 'LAND',
// EXPLAIN: 'TARLA': 'LAND'
    'TARLA': 'LAND'
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return aliases[upper] || 'BUYER';
  return aliases[upper] || 'BUYER';
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Normalize priority to valid level
 * Normalize priority to valid level
// EXPLAIN: * @param {string} priority - Raw priority
 * @param {string} priority - Raw priority
// EXPLAIN: * @returns {string} Normalized priority (high, medium, low)
 * @returns {string} Normalized priority (high, medium, low)
// EXPLAIN: */
 */
// EXPLAIN: function normalizePriority_(priority) {
function normalizePriority_(priority) {
// EXPLAIN: if (!priority) return 'medium';
  if (!priority) return 'medium';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const lower = String(priority).toLowerCase().trim();
  const lower = String(priority).toLowerCase().trim();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const highAliases = ['high', 'yuksek', 'yüksek', 'urgent', 'acil', '1', 'h'];
  const highAliases = ['high', 'yuksek', 'yüksek', 'urgent', 'acil', '1', 'h'];
// EXPLAIN: const lowAliases = ['low', 'dusuk', 'düşük', '3', 'l'];
  const lowAliases = ['low', 'dusuk', 'düşük', '3', 'l'];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (highAliases.includes(lower)) return 'high';
  if (highAliases.includes(lower)) return 'high';
// EXPLAIN: if (lowAliases.includes(lower)) return 'low';
  if (lowAliases.includes(lower)) return 'low';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return 'medium';
  return 'medium';
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Normalize number (handle string numbers, currency symbols, etc.)
 * Normalize number (handle string numbers, currency symbols, etc.)
// EXPLAIN: * @param {*} value - Raw value
 * @param {*} value - Raw value
// EXPLAIN: * @returns {number} Normalized number
 * @returns {number} Normalized number
// EXPLAIN: */
 */
// EXPLAIN: function normalizeNumber_(value) {
function normalizeNumber_(value) {
// EXPLAIN: if (value === undefined || value === null || value === '') return 0;
  if (value === undefined || value === null || value === '') return 0;
// EXPLAIN: if (typeof value === 'number') return value;
  if (typeof value === 'number') return value;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Remove currency symbols and whitespace
  // Remove currency symbols and whitespace
// EXPLAIN: const cleaned = String(value)
  const cleaned = String(value)
// EXPLAIN: .replace(/[^\d.,\-]/g, '')
    .replace(/[^\d.,\-]/g, '')
// EXPLAIN: .replace(/\./g, '') // Remove thousand separators
    .replace(/\./g, '') // Remove thousand separators
// EXPLAIN: .replace(',', '.'); // Convert decimal comma to dot
    .replace(',', '.'); // Convert decimal comma to dot
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const num = parseFloat(cleaned);
  const num = parseFloat(cleaned);
// EXPLAIN: return isNaN(num) ? 0 : num;
  return isNaN(num) ? 0 : num;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Normalize date to ISO format (date only)
 * Normalize date to ISO format (date only)
// EXPLAIN: * @param {*} value - Raw date value
 * @param {*} value - Raw date value
// EXPLAIN: * @returns {string} ISO date string (YYYY-MM-DD) or empty
 * @returns {string} ISO date string (YYYY-MM-DD) or empty
// EXPLAIN: */
 */
// EXPLAIN: function normalizeDate_(value) {
function normalizeDate_(value) {
// EXPLAIN: if (!value) return '';
  if (!value) return '';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: const date = new Date(value);
    const date = new Date(value);
// EXPLAIN: if (isNaN(date.getTime())) return '';
    if (isNaN(date.getTime())) return '';
// EXPLAIN: return date.toISOString().split('T')[0];
    return date.toISOString().split('T')[0];
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: return '';
    return '';
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Normalize datetime to ISO format
 * Normalize datetime to ISO format
// EXPLAIN: * @param {*} value - Raw datetime value
 * @param {*} value - Raw datetime value
// EXPLAIN: * @returns {string} ISO datetime string or empty
 * @returns {string} ISO datetime string or empty
// EXPLAIN: */
 */
// EXPLAIN: function normalizeDateTime_(value) {
function normalizeDateTime_(value) {
// EXPLAIN: if (!value) return '';
  if (!value) return '';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: const date = new Date(value);
    const date = new Date(value);
// EXPLAIN: if (isNaN(date.getTime())) return '';
    if (isNaN(date.getTime())) return '';
// EXPLAIN: return date.toISOString();
    return date.toISOString();
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: return '';
    return '';
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Parse JSON safely
 * Parse JSON safely
// EXPLAIN: * @param {string} jsonStr - JSON string
 * @param {string} jsonStr - JSON string
// EXPLAIN: * @returns {Object} Parsed object or null on error
 * @returns {Object} Parsed object or null on error
// EXPLAIN: */
 */
// EXPLAIN: function parseJsonSafe_(jsonStr) {
function parseJsonSafe_(jsonStr) {
// EXPLAIN: if (!jsonStr) return null;
  if (!jsonStr) return null;
// EXPLAIN: if (typeof jsonStr === 'object') return jsonStr;
  if (typeof jsonStr === 'object') return jsonStr;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: return JSON.parse(jsonStr);
    return JSON.parse(jsonStr);
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: Logger.log('JSON parse error: ' + e.message);
    Logger.log('JSON parse error: ' + e.message);
// EXPLAIN: return null;
    return null;
// EXPLAIN: }
  }
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
