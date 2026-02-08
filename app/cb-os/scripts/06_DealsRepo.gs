/**
 * DealsRepo namespace for DEALS operations
 */
const DealsRepo = {
  
  /**
   * Create a new deal
   * @param {Object} data - Deal data
   * @returns {Object} Created deal with deal_id
   */
  create: function(data) {
    const dealId = id_();
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    
    // Validate deal_type
    const dealType = (data.deal_type || 'BUYER').toUpperCase();
    if (!DEAL_TYPES[dealType]) {
      Logger.log('DEALS | Invalid deal_type: ' + dealType + ', defaulting to BUYER');
    }
    
    const deal = {
      deal_id: dealId,
      created_at: now,
      updated_at: now,
      contact_id: data.contact_id || '',
      deal_type: dealType,
      stage: data.stage || 'NEW',
      deal_value: data.deal_value || 0,
      currency: data.currency || 'TRY',
      expected_close_date: data.expected_close_date || '',
      assigned_to: data.assigned_to || '',
      property_type: data.property_type || '',
      property_address: data.property_address || '',
      listing_price: data.listing_price || 0,
      commission_rate: data.commission_rate || 0,
      notes: data.notes || '',
      docs_required: data.docs_required || '',
      parcel_present: data.parcel_present || '',
      last_stage_change_at: now,
      lead_source: data.lead_source || data.source || '',
      intent: data.intent || '',
      budget: data.budget || 0,
      region: data.region || '',
      timing: data.timing || '',
      utm_source: data.utm_source || '',
      utm_medium: data.utm_medium || '',
      utm_campaign: data.utm_campaign || '',
      utm_term: data.utm_term || '',
      utm_content: data.utm_content || '',
      gclid: data.gclid || '',
      lost_reason: data.lost_reason || '',
      attribution_campaign: data.attribution_campaign || data.utm_campaign || '',
      doc_package_url: data.doc_package_url || ''
    };
    
    const rowNum = appendRow_(SHEETS.DEALS, deal);
    deal._rowIndex = rowNum;
    
    if (cfg_('DOC_PACKAGES_ENABLED', DEFAULTS.DOC_PACKAGES_ENABLED)) {
      const packageInfo = createDocsPackageForDeal_(deal);
      if (packageInfo && packageInfo.url) {
        updateCell_(SHEETS.DEALS, rowNum, 'doc_package_url', packageInfo.url);
        deal.doc_package_url = packageInfo.url;
      }
    }
    
    Logger.log('DEALS | Created: ' + dealId + ' type=' + dealType + ' stage=' + deal.stage);
    return deal;
  },
  
  /**
   * Find deal by ID
   * @param {string} dealId - Deal ID
   * @returns {Object|null} Deal or null
   */
  findById: function(dealId) {
    const allData = getSheetData_(SHEETS.DEALS);
    return allData.find(row => row.deal_id === dealId) || null;
  },
  
  /**
   * Find deals by contact ID
   * @param {string} contactId - Contact ID
   * @returns {Array<Object>} Deals for contact
   */
  findByContactId: function(contactId) {
    const allData = getSheetData_(SHEETS.DEALS);
    return allData.filter(row => row.contact_id === contactId);
  },
  
  /**
   * Update deal
   * @param {string} dealId - Deal ID
   * @param {Object} updates - Fields to update
   * @returns {boolean} Success flag
   */
  update: function(dealId, updates) {
    const deal = this.findById(dealId);
    if (!deal) return false;
    
    updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    
    // Track stage change
    if (updates.stage && updates.stage !== deal.stage) {
      updates.last_stage_change_at = updates.updated_at;
    }
    
    updateRow_(SHEETS.DEALS, deal._rowIndex, updates);
    
    Logger.log('DEALS | Updated: ' + dealId);
    return true;
  },
  
  /**
   * Change deal stage with validation
   * @param {string} dealId - Deal ID
   * @param {string} newStage - New stage
   * @returns {Object} Result with success flag and message
   */
  changeStage: function(dealId, newStage) {
    const deal = this.findById(dealId);
    if (!deal) {
      return { success: false, message: 'Deal not found' };
    }
    
    const dealType = deal.deal_type;
    const validStages = DEAL_TYPES[dealType]?.stages || [];
    
    if (!validStages.includes(newStage)) {
      return { 
        success: false, 
        message: 'Invalid stage ' + newStage + ' for deal type ' + dealType 
      };
    }
    
    if (newStage === 'LISTING_SIGNED') {
      const property = ListingsRepo.findByDealId(dealId);
      const propertyValidation = validatePropertyCompliance_(property);
      if (!propertyValidation.ok) {
        return {
          success: false,
          message: 'Property compliance missing fields: ' + propertyValidation.missing.join(', ')
        };
      }

      const agreement = AgreementsRepo.findByPropertyId(property.property_id);
      const agreementValidation = validateAgreementCompliance_(agreement);
      if (!agreementValidation.ok) {
        return {
          success: false,
          message: 'Agreement compliance missing fields: ' + agreementValidation.missing.join(', ')
        };
      }
    }

    const oldStage = deal.stage;
    this.update(dealId, { stage: newStage });
    
    applyStageAutomations_(deal, oldStage, newStage);
    
    // Log stage change event
    EventsRepo.append({
      entity_type: 'DEAL',
      entity_id: dealId,
      event_type: 'STAGE_CHANGE',
      payload: { from: oldStage, to: newStage },
      source: 'system',
      idempotency_key: dealId + '_stage_' + newStage + '_' + Date.now()
    });
    
    Logger.log('DEALS | Stage change: ' + dealId + ' ' + oldStage + ' -> ' + newStage);
    return { success: true, message: 'Stage changed', oldStage: oldStage, newStage: newStage };
  },
  
  /**
   * Get deals by stage
   * @param {string} stage - Stage filter
   * @returns {Array<Object>} Deals in stage
   */
  getByStage: function(stage) {
    const allData = getSheetData_(SHEETS.DEALS);
    return allData.filter(row => row.stage === stage);
  },
  
  /**
   * Get deals by type
   * @param {string} dealType - Deal type (SELLER, BUYER, RENT, LAND)
   * @returns {Array<Object>} Deals of type
   */
  getByType: function(dealType) {
    const allData = getSheetData_(SHEETS.DEALS);
    return allData.filter(row => row.deal_type === dealType.toUpperCase());
  },
  
  /**
   * Get stuck deals (no stage change for X days)
   * @param {number} days - Days threshold
   * @returns {Array<Object>} Stuck deals
   */
  getStuck: function(days) {
    const threshold = days || cfg_('STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - threshold);
    const cutoffMs = cutoff.getTime();
    
    const allData = getSheetData_(SHEETS.DEALS);
    return allData.filter(row => {
      // Exclude closed deals
      if (row.stage === 'CLOSED_WON' || row.stage === 'CLOSED_LOST') return false;
      // Check last stage change
      const lastChangeMs = parseCbTimeMs_(row.last_stage_change_at);
      return lastChangeMs !== null && lastChangeMs < cutoffMs;
    });
  },
  
  /**
   * Get all active deals (not closed)
   * @returns {Array<Object>} Active deals
   */
  getActive: function() {
    const allData = getSheetData_(SHEETS.DEALS);
    return allData.filter(row => 
      row.stage !== 'CLOSED_WON' && row.stage !== 'CLOSED_LOST'
    );
  },
  
  /**
   * Get pipeline summary (count by stage for each deal type)
   * @returns {Object} Pipeline summary
   */
  getPipelineSummary: function() {
    const allData = getSheetData_(SHEETS.DEALS);
    const summary = {};
    
    for (const dealType of Object.keys(DEAL_TYPES)) {
      summary[dealType] = {};
      for (const stage of DEAL_TYPES[dealType].stages) {
        summary[dealType][stage] = 0;
      }
    }
    
    for (const deal of allData) {
      if (summary[deal.deal_type] && summary[deal.deal_type].hasOwnProperty(deal.stage)) {
        summary[deal.deal_type][deal.stage]++;
      }
    }
    
    return summary;
  }
};
// Çağdaş Seçkin Tüfekci - Real Estate Agent
