// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS Listings, Agreements, Consents, and Conversion Queue
 * CB-OS Listings, Agreements, Consents, and Conversion Queue
// EXPLAIN: * Minimal CRUD + queue helpers for new real-estate modules.
 * Minimal CRUD + queue helpers for new real-estate modules.
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: const ListingsRepo = {
const ListingsRepo = {
// EXPLAIN: createProperty: function(data) {
  createProperty: function(data) {
// EXPLAIN: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: const property = {
    const property = {
// EXPLAIN: property_id: id_(),
      property_id: id_(),
// EXPLAIN: created_at: now,
      created_at: now,
// EXPLAIN: updated_at: now,
      updated_at: now,
// EXPLAIN: deal_id: data.deal_id || '',
      deal_id: data.deal_id || '',
// EXPLAIN: property_type: data.property_type || '',
      property_type: data.property_type || '',
// EXPLAIN: status: data.status || 'DRAFT',
      status: data.status || 'DRAFT',
// EXPLAIN: title: data.title || '',
      title: data.title || '',
// EXPLAIN: address: data.address || '',
      address: data.address || '',
// EXPLAIN: city: data.city || '',
      city: data.city || '',
// EXPLAIN: district: data.district || '',
      district: data.district || '',
// EXPLAIN: size_m2: data.size_m2 || 0,
      size_m2: data.size_m2 || 0,
// EXPLAIN: price: data.price || 0,
      price: data.price || 0,
// EXPLAIN: currency: data.currency || 'TRY',
      currency: data.currency || 'TRY',
// EXPLAIN: owner_contact_id: data.owner_contact_id || '',
      owner_contact_id: data.owner_contact_id || '',
// EXPLAIN: notes: data.notes || ''
      notes: data.notes || ''
// EXPLAIN: };
    };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: appendRow_(SHEETS.PROPERTIES, property);
    appendRow_(SHEETS.PROPERTIES, property);
// EXPLAIN: EventsRepo.append({
    EventsRepo.append({
// EXPLAIN: entity_type: 'PROPERTY',
      entity_type: 'PROPERTY',
// EXPLAIN: entity_id: property.property_id,
      entity_id: property.property_id,
// EXPLAIN: event_type: 'PROPERTY_CREATED',
      event_type: 'PROPERTY_CREATED',
// EXPLAIN: payload: { status: property.status },
      payload: { status: property.status },
// EXPLAIN: source: 'system',
      source: 'system',
// EXPLAIN: idempotency_key: property.property_id + '_create'
      idempotency_key: property.property_id + '_create'
// EXPLAIN: });
    });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return property;
    return property;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: updateProperty: function(propertyId, updates) {
  updateProperty: function(propertyId, updates) {
// EXPLAIN: const allData = getSheetData_(SHEETS.PROPERTIES);
    const allData = getSheetData_(SHEETS.PROPERTIES);
// EXPLAIN: const row = allData.find(r => r.property_id === propertyId);
    const row = allData.find(r => r.property_id === propertyId);
// EXPLAIN: if (!row) return false;
    if (!row) return false;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: updateRow_(SHEETS.PROPERTIES, row._rowIndex, updates);
    updateRow_(SHEETS.PROPERTIES, row._rowIndex, updates);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: EventsRepo.append({
    EventsRepo.append({
// EXPLAIN: entity_type: 'PROPERTY',
      entity_type: 'PROPERTY',
// EXPLAIN: entity_id: propertyId,
      entity_id: propertyId,
// EXPLAIN: event_type: 'PROPERTY_UPDATED',
      event_type: 'PROPERTY_UPDATED',
// EXPLAIN: payload: updates,
      payload: updates,
// EXPLAIN: source: 'system',
      source: 'system',
// EXPLAIN: idempotency_key: propertyId + '_update_' + Date.now()
      idempotency_key: propertyId + '_update_' + Date.now()
// EXPLAIN: });
    });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return true;
    return true;
// EXPLAIN: }
  }
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: const AgreementsRepo = {
const AgreementsRepo = {
// EXPLAIN: create: function(data) {
  create: function(data) {
// EXPLAIN: const agreement = {
    const agreement = {
// EXPLAIN: agreement_id: id_(),
      agreement_id: id_(),
// EXPLAIN: property_id: data.property_id || '',
      property_id: data.property_id || '',
// EXPLAIN: contact_id: data.contact_id || '',
      contact_id: data.contact_id || '',
// EXPLAIN: agreement_type: data.agreement_type || '',
      agreement_type: data.agreement_type || '',
// EXPLAIN: start_date: data.start_date || '',
      start_date: data.start_date || '',
// EXPLAIN: end_date: data.end_date || '',
      end_date: data.end_date || '',
// EXPLAIN: commission_rate: data.commission_rate || 0,
      commission_rate: data.commission_rate || 0,
// EXPLAIN: status: data.status || 'ACTIVE',
      status: data.status || 'ACTIVE',
// EXPLAIN: notes: data.notes || ''
      notes: data.notes || ''
// EXPLAIN: };
    };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: appendRow_(SHEETS.AGREEMENTS, agreement);
    appendRow_(SHEETS.AGREEMENTS, agreement);
// EXPLAIN: EventsRepo.append({
    EventsRepo.append({
// EXPLAIN: entity_type: 'AGREEMENT',
      entity_type: 'AGREEMENT',
// EXPLAIN: entity_id: agreement.agreement_id,
      entity_id: agreement.agreement_id,
// EXPLAIN: event_type: 'AGREEMENT_CREATED',
      event_type: 'AGREEMENT_CREATED',
// EXPLAIN: payload: { status: agreement.status },
      payload: { status: agreement.status },
// EXPLAIN: source: 'system',
      source: 'system',
// EXPLAIN: idempotency_key: agreement.agreement_id + '_create'
      idempotency_key: agreement.agreement_id + '_create'
// EXPLAIN: });
    });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return agreement;
    return agreement;
// EXPLAIN: }
  }
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: const ConsentRepo = {
const ConsentRepo = {
// EXPLAIN: record: function(contactId, consentType, status, notes) {
  record: function(contactId, consentType, status, notes) {
// EXPLAIN: const consent = {
    const consent = {
// EXPLAIN: consent_id: id_(),
      consent_id: id_(),
// EXPLAIN: contact_id: contactId,
      contact_id: contactId,
// EXPLAIN: consent_type: consentType || '',
      consent_type: consentType || '',
// EXPLAIN: status: status || 'GIVEN',
      status: status || 'GIVEN',
// EXPLAIN: ts: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
      ts: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: notes: notes || ''
      notes: notes || ''
// EXPLAIN: };
    };
// EXPLAIN: appendRow_(SHEETS.CONSENTS, consent);
    appendRow_(SHEETS.CONSENTS, consent);
// EXPLAIN: return consent;
    return consent;
// EXPLAIN: }
  }
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: const ConversionQueue = {
const ConversionQueue = {
// EXPLAIN: enqueue: function(data) {
  enqueue: function(data) {
// EXPLAIN: const row = {
    const row = {
// EXPLAIN: conversion_id: id_(),
      conversion_id: id_(),
// EXPLAIN: gclid: data.gclid || '',
      gclid: data.gclid || '',
// EXPLAIN: event_type: data.event_type || '',
      event_type: data.event_type || '',
// EXPLAIN: event_value: data.event_value || 0,
      event_value: data.event_value || 0,
// EXPLAIN: status: 'NEW',
      status: 'NEW',
// EXPLAIN: error: '',
      error: '',
// EXPLAIN: created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
      created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: processed_at: ''
      processed_at: ''
// EXPLAIN: };
    };
// EXPLAIN: appendRow_(SHEETS.CONVERSION_QUEUE, row);
    appendRow_(SHEETS.CONVERSION_QUEUE, row);
// EXPLAIN: return row;
    return row;
// EXPLAIN: }
  }
// EXPLAIN: };
};
// Çağdaş Seçkin Tüfekci - Real Estate Agent
