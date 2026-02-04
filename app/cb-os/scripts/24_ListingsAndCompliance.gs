/**
 * CB-OS Listings, Agreements, Consents, and Conversion Queue
 * Minimal CRUD + queue helpers for new real-estate modules.
 */

const ListingsRepo = {
  createProperty: function(data) {
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    const property = {
      property_id: id_(),
      created_at: now,
      updated_at: now,
      deal_id: data.deal_id || '',
      property_type: data.property_type || '',
      status: data.status || 'DRAFT',
      title: data.title || '',
      address: data.address || '',
      city: data.city || '',
      district: data.district || '',
      size_m2: data.size_m2 || 0,
      price: data.price || 0,
      currency: data.currency || 'TRY',
      owner_contact_id: data.owner_contact_id || '',
      notes: data.notes || ''
    };
    
    appendRow_(SHEETS.PROPERTIES, property);
    EventsRepo.append({
      entity_type: 'PROPERTY',
      entity_id: property.property_id,
      event_type: 'PROPERTY_CREATED',
      payload: { status: property.status },
      source: 'system',
      idempotency_key: property.property_id + '_create'
    });
    
    return property;
  },
  
  updateProperty: function(propertyId, updates) {
    const allData = getSheetData_(SHEETS.PROPERTIES);
    const row = allData.find(r => r.property_id === propertyId);
    if (!row) return false;
    
    updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    updateRow_(SHEETS.PROPERTIES, row._rowIndex, updates);
    
    EventsRepo.append({
      entity_type: 'PROPERTY',
      entity_id: propertyId,
      event_type: 'PROPERTY_UPDATED',
      payload: updates,
      source: 'system',
      idempotency_key: propertyId + '_update_' + Date.now()
    });
    
    return true;
  }
};

const AgreementsRepo = {
  create: function(data) {
    const agreement = {
      agreement_id: id_(),
      property_id: data.property_id || '',
      contact_id: data.contact_id || '',
      agreement_type: data.agreement_type || '',
      start_date: data.start_date || '',
      end_date: data.end_date || '',
      commission_rate: data.commission_rate || 0,
      status: data.status || 'ACTIVE',
      notes: data.notes || ''
    };
    
    appendRow_(SHEETS.AGREEMENTS, agreement);
    EventsRepo.append({
      entity_type: 'AGREEMENT',
      entity_id: agreement.agreement_id,
      event_type: 'AGREEMENT_CREATED',
      payload: { status: agreement.status },
      source: 'system',
      idempotency_key: agreement.agreement_id + '_create'
    });
    
    return agreement;
  }
};

const ConsentRepo = {
  record: function(contactId, consentType, status, notes) {
    const consent = {
      consent_id: id_(),
      contact_id: contactId,
      consent_type: consentType || '',
      status: status || 'GIVEN',
      ts: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
      notes: notes || ''
    };
    appendRow_(SHEETS.CONSENTS, consent);
    return consent;
  }
};

const ConversionQueue = {
  enqueue: function(data) {
    const row = {
      conversion_id: id_(),
      gclid: data.gclid || '',
      event_type: data.event_type || '',
      event_value: data.event_value || 0,
      status: 'NEW',
      error: '',
      created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
      processed_at: ''
    };
    appendRow_(SHEETS.CONVERSION_QUEUE, row);
    return row;
  }
};
