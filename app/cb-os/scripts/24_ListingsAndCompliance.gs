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
      notes: data.notes || '',
      zoning_status: data.zoning_status || '',
      occupancy_permit_status: data.occupancy_permit_status || '',
      title_deed_info: data.title_deed_info || '',
      building_age: data.building_age || '',
      current_usage: data.current_usage || '',
      floor: data.floor || '',
      facade: data.facade || '',
      view: data.view || '',
      transport_distance_meters: data.transport_distance_meters || '',
      social_facility_distance_meters: data.social_facility_distance_meters || '',
      room_count: data.room_count || '',
      living_room_count: data.living_room_count || '',
      bathroom_count: data.bathroom_count || '',
      toilet_count: data.toilet_count || '',
      balcony_count: data.balcony_count || '',
      interior_size_details: data.interior_size_details || '',
      building_type: data.building_type || '',
      amenities: data.amenities || '',
      land_share: data.land_share || '',
      emsal: data.emsal || '',
      max_building_height: data.max_building_height || '',
      planted_crop_exists: data.planted_crop_exists || '',
      encumbrances: data.encumbrances || '',
      property_legal_status: data.property_legal_status || '',
      neighborhood: data.neighborhood || '',
      street: data.street || '',
      building_name_no: data.building_name_no || '',
      apartment_no: data.apartment_no || '',
      parcel_info: data.parcel_info || '',
      credit_eligible: data.credit_eligible || '',
      title_deed_status: data.title_deed_status || '',
      renovation_year: data.renovation_year || '',
      parking_open: data.parking_open || '',
      parking_closed: data.parking_closed || '',
      dues_amount: data.dues_amount || '',
      housing_type: data.housing_type || '',
      housing_style: data.housing_style || '',
      building_floor_count: data.building_floor_count || '',
      site_activity_fitness: data.site_activity_fitness || '',
      site_activity_basketball: data.site_activity_basketball || '',
      site_activity_tennis: data.site_activity_tennis || '',
      site_activity_pool_open: data.site_activity_pool_open || '',
      site_activity_pool_closed: data.site_activity_pool_closed || '',
      site_activity_full_access: data.site_activity_full_access || '',
      security_present: data.security_present || '',
      elevator_present: data.elevator_present || '',
      balcony_present: data.balcony_present || '',
      furnished_status: data.furnished_status || '',
      occupancy_status: data.occupancy_status || '',
      heating_central: data.heating_central || '',
      heating_kombi: data.heating_kombi || '',
      heating_floor: data.heating_floor || '',
      heating_aircon: data.heating_aircon || '',
      bathroom_hilton: data.bathroom_hilton || '',
      bathroom_shower: data.bathroom_shower || '',
      bathroom_wc: data.bathroom_wc || '',
      kitchen_builtin: data.kitchen_builtin || '',
      kitchen_ready: data.kitchen_ready || '',
      room_1: data.room_1 || '',
      room_2: data.room_2 || '',
      room_3: data.room_3 || '',
      room_4: data.room_4 || '',
      room_5: data.room_5 || '',
      room_6: data.room_6 || '',
      deposit_amount: data.deposit_amount || '',
      owner_notes: data.owner_notes || '',
      asking_price_sale: data.asking_price_sale || '',
      sale_is_determined: data.sale_is_determined || '',
      sale_reason: data.sale_reason || '',
      sale_previous_occupancy: data.sale_previous_occupancy || '',
      sale_years_owned: data.sale_years_owned || '',
      sale_time_on_market: data.sale_time_on_market || '',
      sale_price_basis: data.sale_price_basis || '',
      sale_renovation_done: data.sale_renovation_done || '',
      sale_written_offer: data.sale_written_offer || '',
      sale_experience: data.sale_experience || '',
      sale_urgency: data.sale_urgency || '',
      asking_price_rent: data.asking_price_rent || '',
      rent_previously_leased: data.rent_previously_leased || '',
      rent_last_tenant_source: data.rent_last_tenant_source || '',
      rent_owner_occupied: data.rent_owner_occupied || '',
      rent_time_vacant: data.rent_time_vacant || '',
      rent_move_out_timeframe: data.rent_move_out_timeframe || '',
      rent_tenant_criteria: data.rent_tenant_criteria || '',
      rent_renovation_preference: data.rent_renovation_preference || '',
      rent_sell_if_good_offer: data.rent_sell_if_good_offer || '',
      rent_other_agents: data.rent_other_agents || '',
      rent_last_tenant_price: data.rent_last_tenant_price || ''
    };

    const propertyValidation = validatePropertyIntake_(property);
    if (!propertyValidation.ok) {
      Logger.log('PROPERTY | Missing required fields: ' + propertyValidation.missing.join(', '));
      return { error: 'missing_required_fields', missing: propertyValidation.missing };
    }

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

  findByDealId: function(dealId) {
    const allData = getSheetData_(SHEETS.PROPERTIES);
    return allData.find(row => row.deal_id === dealId) || null;
  },

  findById: function(propertyId) {
    const allData = getSheetData_(SHEETS.PROPERTIES);
    return allData.find(row => row.property_id === propertyId) || null;
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
    const agreementValidation = validateAgreementIntake_(data);
    if (!agreementValidation.ok) {
      Logger.log('AGREEMENT | Missing required fields: ' + agreementValidation.missing.join(', '));
      return { error: 'missing_required_fields', missing: agreementValidation.missing };
    }

    if (data.contact_id) {
      const contact = ContactsRepo.findById(data.contact_id);
      const contactValidation = validateContactOwnerFields_(contact);
      if (!contactValidation.ok) {
        Logger.log('AGREEMENT | Missing contact owner fields: ' + contactValidation.missing.join(', '));
        return { error: 'missing_contact_fields', missing: contactValidation.missing };
      }
    }

    const agreement = {
      agreement_id: id_(),
      property_id: data.property_id || '',
      contact_id: data.contact_id || '',
      agreement_type: data.agreement_type || '',
      start_date: data.start_date || '',
      end_date: data.end_date || '',
      commission_rate: data.commission_rate || 0,
      status: data.status || 'ACTIVE',
      notes: data.notes || '',
      agreement_number: data.agreement_number || '',
      agreement_signed_at: data.agreement_signed_at || '',
      agreement_copies: data.agreement_copies || '',
      agreement_doc_url: data.agreement_doc_url || '',
      broker_license_no: data.broker_license_no || '',
      broker_company_name: data.broker_company_name || '',
      broker_contact_email: data.broker_contact_email || '',
      broker_contact_phone: data.broker_contact_phone || '',
      responsible_agent_name: data.responsible_agent_name || '',
      responsible_agent_signature_ref: data.responsible_agent_signature_ref || '',
      owner_identity_type: data.owner_identity_type || '',
      owner_identity_no: data.owner_identity_no || '',
      owner_full_name: data.owner_full_name || '',
      owner_company_name: data.owner_company_name || '',
      owner_company_contact: data.owner_company_contact || '',
      owner_representative_name: data.owner_representative_name || '',
      owner_signature_ref: data.owner_signature_ref || '',
      services_description: data.services_description || '',
      service_fee_amount: data.service_fee_amount || '',
      service_fee_currency: data.service_fee_currency || '',
      rights_and_obligations_text: data.rights_and_obligations_text || '',
      cancellation_fee: data.cancellation_fee || '',
      cancellation_fee_type: data.cancellation_fee_type || '',
      penalty_clause_text: data.penalty_clause_text || '',
      broker_notice_address: data.broker_notice_address || '',
      owner_notice_address: data.owner_notice_address || '',
      property_legal_status: data.property_legal_status || '',
      buyer_or_tenant_role: data.buyer_or_tenant_role || '',
      additional_disclosures: data.additional_disclosures || '',
      info_source_type: data.info_source_type || '',
      owner_declaration_text: data.owner_declaration_text || '',
      owner_declaration_signed_at: data.owner_declaration_signed_at || ''
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
  },

  findByPropertyId: function(propertyId) {
    const allData = getSheetData_(SHEETS.AGREEMENTS);
    return allData.find(row => row.property_id === propertyId) || null;
  }
};

function validatePropertyIntake_(property) {
  const missing = [];

  if (!property) {
    return { ok: false, missing: ['property_record'] };
  }

  const requiredFields = [
    'district',
    'neighborhood',
    'street',
    'building_name_no',
    'apartment_no',
    'floor',
    'parcel_info',
    'credit_eligible',
    'title_deed_status',
    'renovation_year',
    'building_age',
    'parking_open',
    'parking_closed',
    'dues_amount',
    'housing_type',
    'housing_style',
    'building_floor_count',
    'security_present',
    'elevator_present',
    'balcony_present',
    'furnished_status',
    'occupancy_status',
    'heating_central',
    'heating_kombi',
    'heating_floor',
    'heating_aircon',
    'bathroom_hilton',
    'bathroom_shower',
    'bathroom_wc',
    'kitchen_builtin',
    'kitchen_ready',
    'room_1',
    'room_2',
    'room_3',
    'room_4',
    'room_5',
    'room_6',
    'deposit_amount',
    'owner_notes',
    'asking_price_sale',
    'sale_is_determined',
    'sale_reason',
    'sale_previous_occupancy',
    'sale_years_owned',
    'sale_time_on_market',
    'sale_price_basis',
    'sale_renovation_done',
    'sale_written_offer',
    'sale_experience',
    'sale_urgency',
    'asking_price_rent',
    'rent_previously_leased',
    'rent_last_tenant_source',
    'rent_owner_occupied',
    'rent_time_vacant',
    'rent_move_out_timeframe',
    'rent_tenant_criteria',
    'rent_renovation_preference',
    'rent_sell_if_good_offer',
    'rent_other_agents',
    'rent_last_tenant_price'
  ];

  requiredFields.forEach(field => {
    if (!property[field]) missing.push(field);
  });

  return { ok: missing.length === 0, missing: missing };
}

function validateContactOwnerFields_(contact) {
  const missing = [];

  if (!contact) {
    return { ok: false, missing: ['contact_record'] };
  }

  const requiredFields = [
    'first_name',
    'last_name',
    'phone',
    'phone_alt',
    'profession',
    'address',
    'email',
    'fax',
    'work_phone',
    'authorized_name',
    'authorized_phone'
  ];

  requiredFields.forEach(field => {
    if (!contact[field]) missing.push(field);
  });

  return { ok: missing.length === 0, missing: missing };
}

function validateAgreementIntake_(data) {
  const missing = [];

  if (!data) {
    return { ok: false, missing: ['agreement_record'] };
  }

  const requiredFields = [
    'property_id',
    'contact_id',
    'agreement_type',
    'start_date',
    'end_date',
    'agreement_number',
    'agreement_signed_at',
    'agreement_doc_url'
  ];

  requiredFields.forEach(field => {
    if (!data[field]) missing.push(field);
  });

  return { ok: missing.length === 0, missing: missing };
}

function validateAgreementCompliance_(agreement) {
  const missing = [];

  if (!agreement) {
    return { ok: false, missing: ['agreement_record'] };
  }

  const requiredFields = [
    'property_id',
    'agreement_type',
    'start_date',
    'end_date',
    'agreement_number',
    'agreement_signed_at',
    'agreement_doc_url',
    'broker_license_no',
    'broker_company_name',
    'responsible_agent_name',
    'services_description',
    'rights_and_obligations_text',
    'broker_notice_address',
    'owner_notice_address',
    'info_source_type'
  ];

  requiredFields.forEach(field => {
    if (!agreement[field]) missing.push(field);
  });

  const copies = Number(agreement.agreement_copies || 0);
  if (!copies || copies < 2) missing.push('agreement_copies');

  if (!agreement.owner_identity_type) {
    missing.push('owner_identity_type');
  } else if (agreement.owner_identity_type === 'COMPANY') {
    if (!agreement.owner_company_name) missing.push('owner_company_name');
    if (!agreement.owner_representative_name) missing.push('owner_representative_name');
  } else {
    if (!agreement.owner_full_name) missing.push('owner_full_name');
    if (!agreement.owner_identity_no) missing.push('owner_identity_no');
  }

  return { ok: missing.length === 0, missing: missing };
}

function validatePropertyCompliance_(property) {
  const missing = [];

  if (!property) {
    return { ok: false, missing: ['property_record'] };
  }

  const requiredFields = [
    'property_type',
    'address',
    'city',
    'district',
    'size_m2',
    'zoning_status',
    'occupancy_permit_status',
    'title_deed_info',
    'building_age',
    'current_usage',
    'floor',
    'facade',
    'view',
    'transport_distance_meters',
    'social_facility_distance_meters',
    'room_count',
    'living_room_count',
    'bathroom_count',
    'toilet_count',
    'balcony_count',
    'building_type',
    'encumbrances'
  ];

  requiredFields.forEach(field => {
    if (!property[field]) missing.push(field);
  });

  const isLand = String(property.property_type || '').toUpperCase() === 'LAND';
  if (isLand) {
    ['land_share', 'emsal', 'max_building_height', 'planted_crop_exists'].forEach(field => {
      if (!property[field]) missing.push(field);
    });
  }

  return { ok: missing.length === 0, missing: missing };
}

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
// Çağdaş Seçkin Tüfekci - Real Estate Agent
