// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS V1.0 - 10_Normalizers.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS V1.0 - 10_Normalizers.gs
// EXPLAIN: Bu satırın görevi: * Data normalization functions for ingest processing. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Data normalization functions for ingest processing
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Normalize new lead payload into contact and deal data. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Normalize new lead payload into contact and deal data
// EXPLAIN: Bu satırın görevi: * @param {Object} payload - Raw payload from ingest. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} payload - Raw payload from ingest
// EXPLAIN: Bu satırın görevi: * @returns {Object} Normalized data with contact and deal objects. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Normalized data with contact and deal objects
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function normalizeNewLead_(payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizeNewLead_(payload) {
// EXPLAIN: Bu satırın görevi: const result = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const result = {
// EXPLAIN: Bu satırın görevi: contact: {},. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    contact: {},
// EXPLAIN: Bu satırın görevi: deal: {},. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    deal: {},
// EXPLAIN: Bu satırın görevi: errors: []. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    errors: []
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Extract contact fields. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Extract contact fields
// EXPLAIN: Bu satırın görevi: result.contact = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  result.contact = {
// EXPLAIN: Bu satırın görevi: first_name: payload.first_name || payload.firstName || payload.name?.split(' ')[0] || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    first_name: payload.first_name || payload.firstName || payload.name?.split(' ')[0] || '',
// EXPLAIN: Bu satırın görevi: last_name: payload.last_name || payload.lastName || payload.name?.split(' ').slice(1).join(' ') || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    last_name: payload.last_name || payload.lastName || payload.name?.split(' ').slice(1).join(' ') || '',
// EXPLAIN: Bu satırın görevi: email: normalizeEmail_(payload.email),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    email: normalizeEmail_(payload.email),
// EXPLAIN: Bu satırın görevi: phone: normalizePhone_(payload.phone || payload.tel || payload.mobile),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    phone: normalizePhone_(payload.phone || payload.tel || payload.mobile),
// EXPLAIN: Bu satırın görevi: whatsapp: normalizePhone_(payload.whatsapp || payload.phone || payload.tel),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    whatsapp: normalizePhone_(payload.whatsapp || payload.phone || payload.tel),
// EXPLAIN: Bu satırın görevi: source: payload.source || 'unknown',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source: payload.source || 'unknown',
// EXPLAIN: Bu satırın görevi: source_ref_id: payload.source_ref_id || payload.source_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source_ref_id: payload.source_ref_id || payload.source_id || '',
// EXPLAIN: Bu satırın görevi: notes: payload.notes || payload.message || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    notes: payload.notes || payload.message || '',
// EXPLAIN: Bu satırın görevi: preferred_contact_method: payload.preferred_contact_method || 'phone'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    preferred_contact_method: payload.preferred_contact_method || 'phone'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Extract deal fields. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Extract deal fields
// EXPLAIN: Bu satırın görevi: result.deal = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  result.deal = {
// EXPLAIN: Bu satırın görevi: deal_type: normalizeDealType_(payload.deal_type || payload.type || payload.interest_type),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    deal_type: normalizeDealType_(payload.deal_type || payload.type || payload.interest_type),
// EXPLAIN: Bu satırın görevi: stage: 'NEW',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    stage: 'NEW',
// EXPLAIN: Bu satırın görevi: deal_value: normalizeNumber_(payload.deal_value || payload.value || payload.budget),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    deal_value: normalizeNumber_(payload.deal_value || payload.value || payload.budget),
// EXPLAIN: Bu satırın görevi: currency: payload.currency || 'TRY',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    currency: payload.currency || 'TRY',
// EXPLAIN: Bu satırın görevi: property_type: payload.property_type || payload.propertyType || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    property_type: payload.property_type || payload.propertyType || '',
// EXPLAIN: Bu satırın görevi: property_address: payload.property_address || payload.address || payload.location || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    property_address: payload.property_address || payload.address || payload.location || '',
// EXPLAIN: Bu satırın görevi: listing_price: normalizeNumber_(payload.listing_price || payload.price),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    listing_price: normalizeNumber_(payload.listing_price || payload.price),
// EXPLAIN: Bu satırın görevi: notes: payload.deal_notes || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    notes: payload.deal_notes || '',
// EXPLAIN: Bu satırın görevi: docs_required: payload.docs_required || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    docs_required: payload.docs_required || '',
// EXPLAIN: Bu satırın görevi: parcel_present: payload.parcel_present || payload.parcel || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    parcel_present: payload.parcel_present || payload.parcel || '',
// EXPLAIN: Bu satırın görevi: lead_source: payload.lead_source || payload.source || payload.channel || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    lead_source: payload.lead_source || payload.source || payload.channel || '',
// EXPLAIN: Bu satırın görevi: intent: payload.intent || payload.interest || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    intent: payload.intent || payload.interest || '',
// EXPLAIN: Bu satırın görevi: budget: normalizeNumber_(payload.budget || payload.max_budget || payload.deal_value),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    budget: normalizeNumber_(payload.budget || payload.max_budget || payload.deal_value),
// EXPLAIN: Bu satırın görevi: region: payload.region || payload.area || payload.district || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    region: payload.region || payload.area || payload.district || '',
// EXPLAIN: Bu satırın görevi: timing: payload.timing || payload.purchase_timeline || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    timing: payload.timing || payload.purchase_timeline || '',
// EXPLAIN: Bu satırın görevi: utm_source: payload.utm_source || payload.utmSource || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    utm_source: payload.utm_source || payload.utmSource || '',
// EXPLAIN: Bu satırın görevi: utm_medium: payload.utm_medium || payload.utmMedium || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    utm_medium: payload.utm_medium || payload.utmMedium || '',
// EXPLAIN: Bu satırın görevi: utm_campaign: payload.utm_campaign || payload.utmCampaign || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    utm_campaign: payload.utm_campaign || payload.utmCampaign || '',
// EXPLAIN: Bu satırın görevi: utm_term: payload.utm_term || payload.utmTerm || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    utm_term: payload.utm_term || payload.utmTerm || '',
// EXPLAIN: Bu satırın görevi: utm_content: payload.utm_content || payload.utmContent || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    utm_content: payload.utm_content || payload.utmContent || '',
// EXPLAIN: Bu satırın görevi: gclid: payload.gclid || ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    gclid: payload.gclid || ''
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Validate required fields. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Validate required fields
// EXPLAIN: Bu satırın görevi: if (!result.contact.first_name && !result.contact.email && !result.contact.phone) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!result.contact.first_name && !result.contact.email && !result.contact.phone) {
// EXPLAIN: Bu satırın görevi: result.errors.push('Missing contact identifier (name, email, or phone)');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    result.errors.push('Missing contact identifier (name, email, or phone)');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return result;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return result;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Normalize LAND-specific payload. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Normalize LAND-specific payload
// EXPLAIN: Bu satırın görevi: * @param {Object} payload - Raw LAND payload. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} payload - Raw LAND payload
// EXPLAIN: Bu satırın görevi: * @returns {Object} Normalized LAND deal data. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Normalized LAND deal data
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function normalizeLandPayload_(payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizeLandPayload_(payload) {
// EXPLAIN: Bu satırın görevi: const base = normalizeNewLead_(payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const base = normalizeNewLead_(payload);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // LAND-specific fields. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // LAND-specific fields
// EXPLAIN: Bu satırın görevi: base.deal.deal_type = 'LAND';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  base.deal.deal_type = 'LAND';
// EXPLAIN: Bu satırın görevi: base.deal.docs_required = payload.docs_required || payload.required_docs ||. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  base.deal.docs_required = payload.docs_required || payload.required_docs || 
// EXPLAIN: Bu satırın görevi: payload.docs?.join(',') || '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                            payload.docs?.join(',') || '';
// EXPLAIN: Bu satırın görevi: base.deal.parcel_present = String(payload.parcel_present || payload.parcel ||. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  base.deal.parcel_present = String(payload.parcel_present || payload.parcel || 
// EXPLAIN: Bu satırın görevi: payload.has_parcel || 'unknown');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                                    payload.has_parcel || 'unknown');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Additional LAND fields in notes. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Additional LAND fields in notes
// EXPLAIN: Bu satırın görevi: const landNotes = [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const landNotes = [];
// EXPLAIN: Bu satırın görevi: if (payload.land_area) landNotes.push('Area: ' + payload.land_area);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (payload.land_area) landNotes.push('Area: ' + payload.land_area);
// EXPLAIN: Bu satırın görevi: if (payload.zoning) landNotes.push('Zoning: ' + payload.zoning);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (payload.zoning) landNotes.push('Zoning: ' + payload.zoning);
// EXPLAIN: Bu satırın görevi: if (payload.access_road) landNotes.push('Access: ' + payload.access_road);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (payload.access_road) landNotes.push('Access: ' + payload.access_road);
// EXPLAIN: Bu satırın görevi: if (payload.utilities) landNotes.push('Utilities: ' + payload.utilities);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (payload.utilities) landNotes.push('Utilities: ' + payload.utilities);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (landNotes.length > 0) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (landNotes.length > 0) {
// EXPLAIN: Bu satırın görevi: base.deal.notes = (base.deal.notes ? base.deal.notes + ' | ' : '') + landNotes.join(' | ');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    base.deal.notes = (base.deal.notes ? base.deal.notes + ' | ' : '') + landNotes.join(' | ');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return base;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return base;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Normalize task payload. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Normalize task payload
// EXPLAIN: Bu satırın görevi: * @param {Object} payload - Raw task payload. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} payload - Raw task payload
// EXPLAIN: Bu satırın görevi: * @returns {Object} Normalized task data. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Normalized task data
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function normalizeTask_(payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizeTask_(payload) {
// EXPLAIN: Bu satırın görevi: return {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return {
// EXPLAIN: Bu satırın görevi: entity_type: payload.entity_type || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: payload.entity_type || '',
// EXPLAIN: Bu satırın görevi: entity_id: payload.entity_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: payload.entity_id || '',
// EXPLAIN: Bu satırın görevi: title: payload.title || payload.name || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    title: payload.title || payload.name || '',
// EXPLAIN: Bu satırın görevi: description: payload.description || payload.desc || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    description: payload.description || payload.desc || '',
// EXPLAIN: Bu satırın görevi: due_date: normalizeDate_(payload.due_date || payload.due),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    due_date: normalizeDate_(payload.due_date || payload.due),
// EXPLAIN: Bu satırın görevi: priority: normalizePriority_(payload.priority),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    priority: normalizePriority_(payload.priority),
// EXPLAIN: Bu satırın görevi: status: payload.status || 'pending',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    status: payload.status || 'pending',
// EXPLAIN: Bu satırın görevi: assigned_to: payload.assigned_to || payload.assignee || ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    assigned_to: payload.assigned_to || payload.assignee || ''
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Normalize appointment payload. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Normalize appointment payload
// EXPLAIN: Bu satırın görevi: * @param {Object} payload - Raw appointment payload. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} payload - Raw appointment payload
// EXPLAIN: Bu satırın görevi: * @returns {Object} Normalized appointment data. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Normalized appointment data
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function normalizeAppointment_(payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizeAppointment_(payload) {
// EXPLAIN: Bu satırın görevi: return {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return {
// EXPLAIN: Bu satırın görevi: contact_id: payload.contact_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    contact_id: payload.contact_id || '',
// EXPLAIN: Bu satırın görevi: deal_id: payload.deal_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    deal_id: payload.deal_id || '',
// EXPLAIN: Bu satırın görevi: scheduled_at: normalizeDateTime_(payload.scheduled_at || payload.datetime || payload.date),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    scheduled_at: normalizeDateTime_(payload.scheduled_at || payload.datetime || payload.date),
// EXPLAIN: Bu satırın görevi: duration_minutes: normalizeNumber_(payload.duration_minutes || payload.duration) || 60,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    duration_minutes: normalizeNumber_(payload.duration_minutes || payload.duration) || 60,
// EXPLAIN: Bu satırın görevi: location: payload.location || payload.address || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    location: payload.location || payload.address || '',
// EXPLAIN: Bu satırın görevi: meeting_type: payload.meeting_type || payload.type || 'in_person',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    meeting_type: payload.meeting_type || payload.type || 'in_person',
// EXPLAIN: Bu satırın görevi: notes: payload.notes || ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    notes: payload.notes || ''
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Normalize email to lowercase, trim. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Normalize email to lowercase, trim
// EXPLAIN: Bu satırın görevi: * @param {string} email - Raw email. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} email - Raw email
// EXPLAIN: Bu satırın görevi: * @returns {string} Normalized email. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {string} Normalized email
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function normalizeEmail_(email) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizeEmail_(email) {
// EXPLAIN: Bu satırın görevi: if (!email) return '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!email) return '';
// EXPLAIN: Bu satırın görevi: return String(email).toLowerCase().trim();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return String(email).toLowerCase().trim();
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Normalize deal type to valid DEAL_TYPES key. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Normalize deal type to valid DEAL_TYPES key
// EXPLAIN: Bu satırın görevi: * @param {string} type - Raw deal type. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} type - Raw deal type
// EXPLAIN: Bu satırın görevi: * @returns {string} Normalized deal type. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {string} Normalized deal type
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function normalizeDealType_(type) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizeDealType_(type) {
// EXPLAIN: Bu satırın görevi: if (!type) return 'BUYER'; // Default. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!type) return 'BUYER'; // Default
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const upper = String(type).toUpperCase().trim();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const upper = String(type).toUpperCase().trim();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Direct match. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Direct match
// EXPLAIN: Bu satırın görevi: if (DEAL_TYPES[upper]) return upper;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (DEAL_TYPES[upper]) return upper;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Aliases. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Aliases
// EXPLAIN: Bu satırın görevi: const aliases = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const aliases = {
// EXPLAIN: Bu satırın görevi: 'SELL': 'SELLER',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'SELL': 'SELLER',
// EXPLAIN: Bu satırın görevi: 'SELLING': 'SELLER',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'SELLING': 'SELLER',
// EXPLAIN: Bu satırın görevi: 'SATICI': 'SELLER',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'SATICI': 'SELLER',
// EXPLAIN: Bu satırın görevi: 'SATILIK': 'SELLER',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'SATILIK': 'SELLER',
// EXPLAIN: Bu satırın görevi: 'BUY': 'BUYER',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'BUY': 'BUYER',
// EXPLAIN: Bu satırın görevi: 'BUYING': 'BUYER',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'BUYING': 'BUYER',
// EXPLAIN: Bu satırın görevi: 'ALICI': 'BUYER',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'ALICI': 'BUYER',
// EXPLAIN: Bu satırın görevi: 'RENTAL': 'RENT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'RENTAL': 'RENT',
// EXPLAIN: Bu satırın görevi: 'RENTING': 'RENT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'RENTING': 'RENT',
// EXPLAIN: Bu satırın görevi: 'KIRALAMA': 'RENT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'KIRALAMA': 'RENT',
// EXPLAIN: Bu satırın görevi: 'KIRALIK': 'RENT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'KIRALIK': 'RENT',
// EXPLAIN: Bu satırın görevi: 'ARSA': 'LAND',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'ARSA': 'LAND',
// EXPLAIN: Bu satırın görevi: 'ARAZI': 'LAND',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'ARAZI': 'LAND',
// EXPLAIN: Bu satırın görevi: 'TARLA': 'LAND'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'TARLA': 'LAND'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return aliases[upper] || 'BUYER';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return aliases[upper] || 'BUYER';
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Normalize priority to valid level. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Normalize priority to valid level
// EXPLAIN: Bu satırın görevi: * @param {string} priority - Raw priority. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} priority - Raw priority
// EXPLAIN: Bu satırın görevi: * @returns {string} Normalized priority (high, medium, low). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {string} Normalized priority (high, medium, low)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function normalizePriority_(priority) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizePriority_(priority) {
// EXPLAIN: Bu satırın görevi: if (!priority) return 'medium';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!priority) return 'medium';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const lower = String(priority).toLowerCase().trim();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const lower = String(priority).toLowerCase().trim();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const highAliases = ['high', 'yuksek', 'yüksek', 'urgent', 'acil', '1', 'h'];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const highAliases = ['high', 'yuksek', 'yüksek', 'urgent', 'acil', '1', 'h'];
// EXPLAIN: Bu satırın görevi: const lowAliases = ['low', 'dusuk', 'düşük', '3', 'l'];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const lowAliases = ['low', 'dusuk', 'düşük', '3', 'l'];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (highAliases.includes(lower)) return 'high';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (highAliases.includes(lower)) return 'high';
// EXPLAIN: Bu satırın görevi: if (lowAliases.includes(lower)) return 'low';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (lowAliases.includes(lower)) return 'low';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return 'medium';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return 'medium';
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Normalize number (handle string numbers, currency symbols, etc.). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Normalize number (handle string numbers, currency symbols, etc.)
// EXPLAIN: Bu satırın görevi: * @param {*} value - Raw value. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {*} value - Raw value
// EXPLAIN: Bu satırın görevi: * @returns {number} Normalized number. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {number} Normalized number
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function normalizeNumber_(value) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizeNumber_(value) {
// EXPLAIN: Bu satırın görevi: if (value === undefined || value === null || value === '') return 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (value === undefined || value === null || value === '') return 0;
// EXPLAIN: Bu satırın görevi: if (typeof value === 'number') return value;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (typeof value === 'number') return value;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Remove currency symbols and whitespace. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Remove currency symbols and whitespace
// EXPLAIN: Bu satırın görevi: const cleaned = String(value). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const cleaned = String(value)
// EXPLAIN: Bu satırın görevi: .replace(/[^\d.,\-]/g, ''). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    .replace(/[^\d.,\-]/g, '')
// EXPLAIN: Bu satırın görevi: .replace(/\./g, '') // Remove thousand separators. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    .replace(/\./g, '') // Remove thousand separators
// EXPLAIN: Bu satırın görevi: .replace(',', '.'); // Convert decimal comma to dot. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    .replace(',', '.'); // Convert decimal comma to dot
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const num = parseFloat(cleaned);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const num = parseFloat(cleaned);
// EXPLAIN: Bu satırın görevi: return isNaN(num) ? 0 : num;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return isNaN(num) ? 0 : num;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Normalize date to ISO format (date only). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Normalize date to ISO format (date only)
// EXPLAIN: Bu satırın görevi: * @param {*} value - Raw date value. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {*} value - Raw date value
// EXPLAIN: Bu satırın görevi: * @returns {string} ISO date string (YYYY-MM-DD) or empty. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {string} ISO date string (YYYY-MM-DD) or empty
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function normalizeDate_(value) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizeDate_(value) {
// EXPLAIN: Bu satırın görevi: if (!value) return '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!value) return '';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: const date = new Date(value);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const date = new Date(value);
// EXPLAIN: Bu satırın görevi: if (isNaN(date.getTime())) return '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (isNaN(date.getTime())) return '';
// EXPLAIN: Bu satırın görevi: return date.toISOString().split('T')[0];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return date.toISOString().split('T')[0];
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: return '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return '';
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Normalize datetime to ISO format. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Normalize datetime to ISO format
// EXPLAIN: Bu satırın görevi: * @param {*} value - Raw datetime value. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {*} value - Raw datetime value
// EXPLAIN: Bu satırın görevi: * @returns {string} ISO datetime string or empty. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {string} ISO datetime string or empty
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function normalizeDateTime_(value) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizeDateTime_(value) {
// EXPLAIN: Bu satırın görevi: if (!value) return '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!value) return '';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: const date = new Date(value);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const date = new Date(value);
// EXPLAIN: Bu satırın görevi: if (isNaN(date.getTime())) return '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (isNaN(date.getTime())) return '';
// EXPLAIN: Bu satırın görevi: return date.toISOString();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return date.toISOString();
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: return '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return '';
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Parse JSON safely. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Parse JSON safely
// EXPLAIN: Bu satırın görevi: * @param {string} jsonStr - JSON string. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} jsonStr - JSON string
// EXPLAIN: Bu satırın görevi: * @returns {Object} Parsed object or null on error. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Parsed object or null on error
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function parseJsonSafe_(jsonStr) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function parseJsonSafe_(jsonStr) {
// EXPLAIN: Bu satırın görevi: if (!jsonStr) return null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!jsonStr) return null;
// EXPLAIN: Bu satırın görevi: if (typeof jsonStr === 'object') return jsonStr;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (typeof jsonStr === 'object') return jsonStr;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: return JSON.parse(jsonStr);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return JSON.parse(jsonStr);
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: Logger.log('JSON parse error: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('JSON parse error: ' + e.message);
// EXPLAIN: Bu satırın görevi: return null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return null;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
