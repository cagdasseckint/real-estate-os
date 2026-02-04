// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 06_DealsRepo.gs
 * CB-OS V1.0 - 06_DealsRepo.gs
// EXPLAIN: * DEALS table operations with pipeline stage management
 * DEALS table operations with pipeline stage management
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * DealsRepo namespace for DEALS operations
 * DealsRepo namespace for DEALS operations
// EXPLAIN: */
 */
// EXPLAIN: const DealsRepo = {
const DealsRepo = {
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Create a new deal
   * Create a new deal
// EXPLAIN: * @param {Object} data - Deal data
   * @param {Object} data - Deal data
// EXPLAIN: * @returns {Object} Created deal with deal_id
   * @returns {Object} Created deal with deal_id
// EXPLAIN: */
   */
// EXPLAIN: create: function(data) {
  create: function(data) {
// EXPLAIN: const dealId = id_();
    const dealId = id_();
// EXPLAIN: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Validate deal_type
    // Validate deal_type
// EXPLAIN: const dealType = (data.deal_type || 'BUYER').toUpperCase();
    const dealType = (data.deal_type || 'BUYER').toUpperCase();
// EXPLAIN: if (!DEAL_TYPES[dealType]) {
    if (!DEAL_TYPES[dealType]) {
// EXPLAIN: Logger.log('DEALS | Invalid deal_type: ' + dealType + ', defaulting to BUYER');
      Logger.log('DEALS | Invalid deal_type: ' + dealType + ', defaulting to BUYER');
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const deal = {
    const deal = {
// EXPLAIN: deal_id: dealId,
      deal_id: dealId,
// EXPLAIN: created_at: now,
      created_at: now,
// EXPLAIN: updated_at: now,
      updated_at: now,
// EXPLAIN: contact_id: data.contact_id || '',
      contact_id: data.contact_id || '',
// EXPLAIN: deal_type: dealType,
      deal_type: dealType,
// EXPLAIN: stage: data.stage || 'NEW',
      stage: data.stage || 'NEW',
// EXPLAIN: deal_value: data.deal_value || 0,
      deal_value: data.deal_value || 0,
// EXPLAIN: currency: data.currency || 'TRY',
      currency: data.currency || 'TRY',
// EXPLAIN: expected_close_date: data.expected_close_date || '',
      expected_close_date: data.expected_close_date || '',
// EXPLAIN: assigned_to: data.assigned_to || '',
      assigned_to: data.assigned_to || '',
// EXPLAIN: property_type: data.property_type || '',
      property_type: data.property_type || '',
// EXPLAIN: property_address: data.property_address || '',
      property_address: data.property_address || '',
// EXPLAIN: listing_price: data.listing_price || 0,
      listing_price: data.listing_price || 0,
// EXPLAIN: commission_rate: data.commission_rate || 0,
      commission_rate: data.commission_rate || 0,
// EXPLAIN: notes: data.notes || '',
      notes: data.notes || '',
// EXPLAIN: docs_required: data.docs_required || '',
      docs_required: data.docs_required || '',
// EXPLAIN: parcel_present: data.parcel_present || '',
      parcel_present: data.parcel_present || '',
// EXPLAIN: last_stage_change_at: now,
      last_stage_change_at: now,
// EXPLAIN: lead_source: data.lead_source || data.source || '',
      lead_source: data.lead_source || data.source || '',
// EXPLAIN: intent: data.intent || '',
      intent: data.intent || '',
// EXPLAIN: budget: data.budget || 0,
      budget: data.budget || 0,
// EXPLAIN: region: data.region || '',
      region: data.region || '',
// EXPLAIN: timing: data.timing || '',
      timing: data.timing || '',
// EXPLAIN: utm_source: data.utm_source || '',
      utm_source: data.utm_source || '',
// EXPLAIN: utm_medium: data.utm_medium || '',
      utm_medium: data.utm_medium || '',
// EXPLAIN: utm_campaign: data.utm_campaign || '',
      utm_campaign: data.utm_campaign || '',
// EXPLAIN: utm_term: data.utm_term || '',
      utm_term: data.utm_term || '',
// EXPLAIN: utm_content: data.utm_content || '',
      utm_content: data.utm_content || '',
// EXPLAIN: gclid: data.gclid || '',
      gclid: data.gclid || '',
// EXPLAIN: lost_reason: data.lost_reason || '',
      lost_reason: data.lost_reason || '',
// EXPLAIN: attribution_campaign: data.attribution_campaign || data.utm_campaign || '',
      attribution_campaign: data.attribution_campaign || data.utm_campaign || '',
// EXPLAIN: doc_package_url: data.doc_package_url || ''
      doc_package_url: data.doc_package_url || ''
// EXPLAIN: };
    };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const rowNum = appendRow_(SHEETS.DEALS, deal);
    const rowNum = appendRow_(SHEETS.DEALS, deal);
// EXPLAIN: deal._rowIndex = rowNum;
    deal._rowIndex = rowNum;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: if (cfg_('DOC_PACKAGES_ENABLED', DEFAULTS.DOC_PACKAGES_ENABLED)) {
    if (cfg_('DOC_PACKAGES_ENABLED', DEFAULTS.DOC_PACKAGES_ENABLED)) {
// EXPLAIN: const packageInfo = createDocsPackageForDeal_(deal);
      const packageInfo = createDocsPackageForDeal_(deal);
// EXPLAIN: if (packageInfo && packageInfo.url) {
      if (packageInfo && packageInfo.url) {
// EXPLAIN: updateCell_(SHEETS.DEALS, rowNum, 'doc_package_url', packageInfo.url);
        updateCell_(SHEETS.DEALS, rowNum, 'doc_package_url', packageInfo.url);
// EXPLAIN: deal.doc_package_url = packageInfo.url;
        deal.doc_package_url = packageInfo.url;
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: Logger.log('DEALS | Created: ' + dealId + ' type=' + dealType + ' stage=' + deal.stage);
    Logger.log('DEALS | Created: ' + dealId + ' type=' + dealType + ' stage=' + deal.stage);
// EXPLAIN: return deal;
    return deal;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Find deal by ID
   * Find deal by ID
// EXPLAIN: * @param {string} dealId - Deal ID
   * @param {string} dealId - Deal ID
// EXPLAIN: * @returns {Object|null} Deal or null
   * @returns {Object|null} Deal or null
// EXPLAIN: */
   */
// EXPLAIN: findById: function(dealId) {
  findById: function(dealId) {
// EXPLAIN: const allData = getSheetData_(SHEETS.DEALS);
    const allData = getSheetData_(SHEETS.DEALS);
// EXPLAIN: return allData.find(row => row.deal_id === dealId) || null;
    return allData.find(row => row.deal_id === dealId) || null;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Find deals by contact ID
   * Find deals by contact ID
// EXPLAIN: * @param {string} contactId - Contact ID
   * @param {string} contactId - Contact ID
// EXPLAIN: * @returns {Array<Object>} Deals for contact
   * @returns {Array<Object>} Deals for contact
// EXPLAIN: */
   */
// EXPLAIN: findByContactId: function(contactId) {
  findByContactId: function(contactId) {
// EXPLAIN: const allData = getSheetData_(SHEETS.DEALS);
    const allData = getSheetData_(SHEETS.DEALS);
// EXPLAIN: return allData.filter(row => row.contact_id === contactId);
    return allData.filter(row => row.contact_id === contactId);
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Update deal
   * Update deal
// EXPLAIN: * @param {string} dealId - Deal ID
   * @param {string} dealId - Deal ID
// EXPLAIN: * @param {Object} updates - Fields to update
   * @param {Object} updates - Fields to update
// EXPLAIN: * @returns {boolean} Success flag
   * @returns {boolean} Success flag
// EXPLAIN: */
   */
// EXPLAIN: update: function(dealId, updates) {
  update: function(dealId, updates) {
// EXPLAIN: const deal = this.findById(dealId);
    const deal = this.findById(dealId);
// EXPLAIN: if (!deal) return false;
    if (!deal) return false;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Track stage change
    // Track stage change
// EXPLAIN: if (updates.stage && updates.stage !== deal.stage) {
    if (updates.stage && updates.stage !== deal.stage) {
// EXPLAIN: updates.last_stage_change_at = updates.updated_at;
      updates.last_stage_change_at = updates.updated_at;
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: updateRow_(SHEETS.DEALS, deal._rowIndex, updates);
    updateRow_(SHEETS.DEALS, deal._rowIndex, updates);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: Logger.log('DEALS | Updated: ' + dealId);
    Logger.log('DEALS | Updated: ' + dealId);
// EXPLAIN: return true;
    return true;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Change deal stage with validation
   * Change deal stage with validation
// EXPLAIN: * @param {string} dealId - Deal ID
   * @param {string} dealId - Deal ID
// EXPLAIN: * @param {string} newStage - New stage
   * @param {string} newStage - New stage
// EXPLAIN: * @returns {Object} Result with success flag and message
   * @returns {Object} Result with success flag and message
// EXPLAIN: */
   */
// EXPLAIN: changeStage: function(dealId, newStage) {
  changeStage: function(dealId, newStage) {
// EXPLAIN: const deal = this.findById(dealId);
    const deal = this.findById(dealId);
// EXPLAIN: if (!deal) {
    if (!deal) {
// EXPLAIN: return { success: false, message: 'Deal not found' };
      return { success: false, message: 'Deal not found' };
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const dealType = deal.deal_type;
    const dealType = deal.deal_type;
// EXPLAIN: const validStages = DEAL_TYPES[dealType]?.stages || [];
    const validStages = DEAL_TYPES[dealType]?.stages || [];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: if (!validStages.includes(newStage)) {
    if (!validStages.includes(newStage)) {
// EXPLAIN: return {
      return { 
// EXPLAIN: success: false,
        success: false, 
// EXPLAIN: message: 'Invalid stage ' + newStage + ' for deal type ' + dealType
        message: 'Invalid stage ' + newStage + ' for deal type ' + dealType 
// EXPLAIN: };
      };
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const oldStage = deal.stage;
    const oldStage = deal.stage;
// EXPLAIN: this.update(dealId, { stage: newStage });
    this.update(dealId, { stage: newStage });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: applyStageAutomations_(deal, oldStage, newStage);
    applyStageAutomations_(deal, oldStage, newStage);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Log stage change event
    // Log stage change event
// EXPLAIN: EventsRepo.append({
    EventsRepo.append({
// EXPLAIN: entity_type: 'DEAL',
      entity_type: 'DEAL',
// EXPLAIN: entity_id: dealId,
      entity_id: dealId,
// EXPLAIN: event_type: 'STAGE_CHANGE',
      event_type: 'STAGE_CHANGE',
// EXPLAIN: payload: { from: oldStage, to: newStage },
      payload: { from: oldStage, to: newStage },
// EXPLAIN: source: 'system',
      source: 'system',
// EXPLAIN: idempotency_key: dealId + '_stage_' + newStage + '_' + Date.now()
      idempotency_key: dealId + '_stage_' + newStage + '_' + Date.now()
// EXPLAIN: });
    });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: Logger.log('DEALS | Stage change: ' + dealId + ' ' + oldStage + ' -> ' + newStage);
    Logger.log('DEALS | Stage change: ' + dealId + ' ' + oldStage + ' -> ' + newStage);
// EXPLAIN: return { success: true, message: 'Stage changed', oldStage: oldStage, newStage: newStage };
    return { success: true, message: 'Stage changed', oldStage: oldStage, newStage: newStage };
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get deals by stage
   * Get deals by stage
// EXPLAIN: * @param {string} stage - Stage filter
   * @param {string} stage - Stage filter
// EXPLAIN: * @returns {Array<Object>} Deals in stage
   * @returns {Array<Object>} Deals in stage
// EXPLAIN: */
   */
// EXPLAIN: getByStage: function(stage) {
  getByStage: function(stage) {
// EXPLAIN: const allData = getSheetData_(SHEETS.DEALS);
    const allData = getSheetData_(SHEETS.DEALS);
// EXPLAIN: return allData.filter(row => row.stage === stage);
    return allData.filter(row => row.stage === stage);
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get deals by type
   * Get deals by type
// EXPLAIN: * @param {string} dealType - Deal type (SELLER, BUYER, RENT, LAND)
   * @param {string} dealType - Deal type (SELLER, BUYER, RENT, LAND)
// EXPLAIN: * @returns {Array<Object>} Deals of type
   * @returns {Array<Object>} Deals of type
// EXPLAIN: */
   */
// EXPLAIN: getByType: function(dealType) {
  getByType: function(dealType) {
// EXPLAIN: const allData = getSheetData_(SHEETS.DEALS);
    const allData = getSheetData_(SHEETS.DEALS);
// EXPLAIN: return allData.filter(row => row.deal_type === dealType.toUpperCase());
    return allData.filter(row => row.deal_type === dealType.toUpperCase());
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get stuck deals (no stage change for X days)
   * Get stuck deals (no stage change for X days)
// EXPLAIN: * @param {number} days - Days threshold
   * @param {number} days - Days threshold
// EXPLAIN: * @returns {Array<Object>} Stuck deals
   * @returns {Array<Object>} Stuck deals
// EXPLAIN: */
   */
// EXPLAIN: getStuck: function(days) {
  getStuck: function(days) {
// EXPLAIN: const threshold = days || cfg_('STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD);
    const threshold = days || cfg_('STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD);
// EXPLAIN: const cutoff = new Date();
    const cutoff = new Date();
// EXPLAIN: cutoff.setDate(cutoff.getDate() - threshold);
    cutoff.setDate(cutoff.getDate() - threshold);
// EXPLAIN: const cutoffIso = cutoff.toISOString();
    const cutoffIso = cutoff.toISOString();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const allData = getSheetData_(SHEETS.DEALS);
    const allData = getSheetData_(SHEETS.DEALS);
// EXPLAIN: return allData.filter(row => {
    return allData.filter(row => {
// EXPLAIN: // Exclude closed deals
      // Exclude closed deals
// EXPLAIN: if (row.stage === 'CLOSED_WON' || row.stage === 'CLOSED_LOST') return false;
      if (row.stage === 'CLOSED_WON' || row.stage === 'CLOSED_LOST') return false;
// EXPLAIN: // Check last stage change
      // Check last stage change
// EXPLAIN: return row.last_stage_change_at && row.last_stage_change_at < cutoffIso;
      return row.last_stage_change_at && row.last_stage_change_at < cutoffIso;
// EXPLAIN: });
    });
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get all active deals (not closed)
   * Get all active deals (not closed)
// EXPLAIN: * @returns {Array<Object>} Active deals
   * @returns {Array<Object>} Active deals
// EXPLAIN: */
   */
// EXPLAIN: getActive: function() {
  getActive: function() {
// EXPLAIN: const allData = getSheetData_(SHEETS.DEALS);
    const allData = getSheetData_(SHEETS.DEALS);
// EXPLAIN: return allData.filter(row =>
    return allData.filter(row => 
// EXPLAIN: row.stage !== 'CLOSED_WON' && row.stage !== 'CLOSED_LOST'
      row.stage !== 'CLOSED_WON' && row.stage !== 'CLOSED_LOST'
// EXPLAIN: );
    );
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get pipeline summary (count by stage for each deal type)
   * Get pipeline summary (count by stage for each deal type)
// EXPLAIN: * @returns {Object} Pipeline summary
   * @returns {Object} Pipeline summary
// EXPLAIN: */
   */
// EXPLAIN: getPipelineSummary: function() {
  getPipelineSummary: function() {
// EXPLAIN: const allData = getSheetData_(SHEETS.DEALS);
    const allData = getSheetData_(SHEETS.DEALS);
// EXPLAIN: const summary = {};
    const summary = {};
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: for (const dealType of Object.keys(DEAL_TYPES)) {
    for (const dealType of Object.keys(DEAL_TYPES)) {
// EXPLAIN: summary[dealType] = {};
      summary[dealType] = {};
// EXPLAIN: for (const stage of DEAL_TYPES[dealType].stages) {
      for (const stage of DEAL_TYPES[dealType].stages) {
// EXPLAIN: summary[dealType][stage] = 0;
        summary[dealType][stage] = 0;
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: for (const deal of allData) {
    for (const deal of allData) {
// EXPLAIN: if (summary[deal.deal_type] && summary[deal.deal_type].hasOwnProperty(deal.stage)) {
      if (summary[deal.deal_type] && summary[deal.deal_type].hasOwnProperty(deal.stage)) {
// EXPLAIN: summary[deal.deal_type][deal.stage]++;
        summary[deal.deal_type][deal.stage]++;
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return summary;
    return summary;
// EXPLAIN: }
  }
// EXPLAIN: };
};
// Çağdaş Seçkin Tüfekci - Real Estate Agent
