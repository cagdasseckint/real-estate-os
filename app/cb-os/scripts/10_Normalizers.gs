/**
 * Normalize new lead payload into contact and deal data
 * @param {Object} payload - Raw payload from ingest
 * @returns {Object} Normalized data with contact and deal objects
 */
function normalizeNewLead_(payload) {
  const result = {
    contact: {},
    deal: {},
    errors: []
  };
  
  // Extract contact fields
  result.contact = {
    first_name: payload.first_name || payload.firstName || payload.name?.split(' ')[0] || '',
    last_name: payload.last_name || payload.lastName || payload.name?.split(' ').slice(1).join(' ') || '',
    email: normalizeEmail_(payload.email),
    phone: normalizePhone_(payload.phone || payload.tel || payload.mobile),
    whatsapp: normalizePhone_(payload.whatsapp || payload.phone || payload.tel),
    source: payload.source || 'unknown',
    source_ref_id: payload.source_ref_id || payload.source_id || '',
    notes: payload.notes || payload.message || '',
    preferred_contact_method: payload.preferred_contact_method || 'phone'
  };
  
  // Extract deal fields
  result.deal = {
    deal_type: normalizeDealType_(payload.deal_type || payload.type || payload.interest_type),
    stage: 'NEW',
    deal_value: normalizeNumber_(payload.deal_value || payload.value || payload.budget),
    currency: payload.currency || 'TRY',
    property_type: payload.property_type || payload.propertyType || '',
    property_address: payload.property_address || payload.address || payload.location || '',
    listing_price: normalizeNumber_(payload.listing_price || payload.price),
    notes: payload.deal_notes || '',
    docs_required: payload.docs_required || '',
    parcel_present: payload.parcel_present || payload.parcel || '',
    lead_source: payload.lead_source || payload.source || payload.channel || '',
    intent: payload.intent || payload.interest || '',
    budget: normalizeNumber_(payload.budget || payload.max_budget || payload.deal_value),
    region: payload.region || payload.area || payload.district || '',
    timing: payload.timing || payload.purchase_timeline || '',
    utm_source: payload.utm_source || payload.utmSource || '',
    utm_medium: payload.utm_medium || payload.utmMedium || '',
    utm_campaign: payload.utm_campaign || payload.utmCampaign || '',
    utm_term: payload.utm_term || payload.utmTerm || '',
    utm_content: payload.utm_content || payload.utmContent || '',
    gclid: payload.gclid || ''
  };
  
  // Validate required fields
  if (!result.contact.first_name && !result.contact.email && !result.contact.phone) {
    result.errors.push('Missing contact identifier (name, email, or phone)');
  }
  
  return result;
}

/**
 * Normalize LAND-specific payload
 * @param {Object} payload - Raw LAND payload
 * @returns {Object} Normalized LAND deal data
 */
function normalizeLandPayload_(payload) {
  const base = normalizeNewLead_(payload);
  
  // LAND-specific fields
  base.deal.deal_type = 'LAND';
  base.deal.docs_required = payload.docs_required || payload.required_docs || 
                            payload.docs?.join(',') || '';
  base.deal.parcel_present = String(payload.parcel_present || payload.parcel || 
                                    payload.has_parcel || 'unknown');
  
  // Additional LAND fields in notes
  const landNotes = [];
  if (payload.land_area) landNotes.push('Area: ' + payload.land_area);
  if (payload.zoning) landNotes.push('Zoning: ' + payload.zoning);
  if (payload.access_road) landNotes.push('Access: ' + payload.access_road);
  if (payload.utilities) landNotes.push('Utilities: ' + payload.utilities);
  
  if (landNotes.length > 0) {
    base.deal.notes = (base.deal.notes ? base.deal.notes + ' | ' : '') + landNotes.join(' | ');
  }
  
  return base;
}

/**
 * Normalize task payload
 * @param {Object} payload - Raw task payload
 * @returns {Object} Normalized task data
 */
function normalizeTask_(payload) {
  return {
    entity_type: payload.entity_type || '',
    entity_id: payload.entity_id || '',
    title: payload.title || payload.name || '',
    description: payload.description || payload.desc || '',
    due_date: normalizeDate_(payload.due_date || payload.due),
    priority: normalizePriority_(payload.priority),
    status: payload.status || 'pending',
    assigned_to: payload.assigned_to || payload.assignee || ''
  };
}

/**
 * Normalize appointment payload
 * @param {Object} payload - Raw appointment payload
 * @returns {Object} Normalized appointment data
 */
function normalizeAppointment_(payload) {
  return {
    contact_id: payload.contact_id || '',
    deal_id: payload.deal_id || '',
    scheduled_at: normalizeDateTime_(payload.scheduled_at || payload.datetime || payload.date),
    duration_minutes: normalizeNumber_(payload.duration_minutes || payload.duration) || 60,
    location: payload.location || payload.address || '',
    meeting_type: payload.meeting_type || payload.type || 'in_person',
    notes: payload.notes || ''
  };
}

/**
 * Normalize email to lowercase, trim
 * @param {string} email - Raw email
 * @returns {string} Normalized email
 */
function normalizeEmail_(email) {
  if (!email) return '';
  return String(email).toLowerCase().trim();
}

/**
 * Normalize deal type to valid DEAL_TYPES key
 * @param {string} type - Raw deal type
 * @returns {string} Normalized deal type
 */
function normalizeDealType_(type) {
  if (!type) return 'BUYER'; // Default
  
  const upper = String(type).toUpperCase().trim();
  
  // Direct match
  if (DEAL_TYPES[upper]) return upper;
  
  // Aliases
  const aliases = {
    'SELL': 'SELLER',
    'SELLING': 'SELLER',
    'SATICI': 'SELLER',
    'SATILIK': 'SELLER',
    'BUY': 'BUYER',
    'BUYING': 'BUYER',
    'ALICI': 'BUYER',
    'RENTAL': 'RENT',
    'RENTING': 'RENT',
    'KIRALAMA': 'RENT',
    'KIRALIK': 'RENT',
    'ARSA': 'LAND',
    'ARAZI': 'LAND',
    'TARLA': 'LAND'
  };
  
  return aliases[upper] || 'BUYER';
}

/**
 * Normalize priority to valid level
 * @param {string} priority - Raw priority
 * @returns {string} Normalized priority (high, medium, low)
 */
function normalizePriority_(priority) {
  if (!priority) return 'medium';
  
  const lower = String(priority).toLowerCase().trim();
  
  const highAliases = ['high', 'yuksek', 'yüksek', 'urgent', 'acil', '1', 'h'];
  const lowAliases = ['low', 'dusuk', 'düşük', '3', 'l'];
  
  if (highAliases.includes(lower)) return 'high';
  if (lowAliases.includes(lower)) return 'low';
  
  return 'medium';
}

/**
 * Normalize number (handle string numbers, currency symbols, etc.)
 * @param {*} value - Raw value
 * @returns {number} Normalized number
 */
function normalizeNumber_(value) {
  if (value === undefined || value === null || value === '') return 0;
  if (typeof value === 'number') return value;
  
  // Remove currency symbols and whitespace
  const cleaned = String(value)
    .replace(/[^\d.,\-]/g, '')
    .replace(/\./g, '') // Remove thousand separators
    .replace(',', '.'); // Convert decimal comma to dot
  
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Normalize date to ISO format (date only)
 * @param {*} value - Raw date value
 * @returns {string} ISO date string (YYYY-MM-DD) or empty
 */
function normalizeDate_(value) {
  if (!value) return '';
  
  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  } catch (e) {
    return '';
  }
}

/**
 * Normalize datetime to ISO format
 * @param {*} value - Raw datetime value
 * @returns {string} ISO datetime string or empty
 */
function normalizeDateTime_(value) {
  if (!value) return '';
  
  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) return '';
    return date.toISOString();
  } catch (e) {
    return '';
  }
}

/**
 * Parse JSON safely
 * @param {string} jsonStr - JSON string
 * @returns {Object} Parsed object or null on error
 */
function parseJsonSafe_(jsonStr) {
  if (!jsonStr) return null;
  if (typeof jsonStr === 'object') return jsonStr;
  
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    Logger.log('JSON parse error: ' + e.message);
    return null;
  }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
