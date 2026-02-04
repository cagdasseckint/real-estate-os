// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS Lead Capture (Forms -> Sheets -> CRM)
 * CB-OS Lead Capture (Forms -> Sheets -> CRM)
// EXPLAIN: * Upserts Contacts, assigns owner (round-robin), creates Opportunity, sends welcome email.
 * Upserts Contacts, assigns owner (round-robin), creates Opportunity, sends welcome email.
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: const LEAD_SHEETS = {
const LEAD_SHEETS = {
// EXPLAIN: CONTACTS: 'Contacts',
  CONTACTS: 'Contacts',
// EXPLAIN: OPPORTUNITIES: 'Opportunities',
  OPPORTUNITIES: 'Opportunities',
// EXPLAIN: ACTIVITY_LOG: 'ActivityLog',
  ACTIVITY_LOG: 'ActivityLog',
// EXPLAIN: OWNERS: 'Owners'
  OWNERS: 'Owners'
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: const LEAD_OWNER_HEADERS = ['owner_email', 'is_active', 'last_assigned_at'];
const LEAD_OWNER_HEADERS = ['owner_email', 'is_active', 'last_assigned_at'];
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Bootstrap Owners sheet
 * Bootstrap Owners sheet
// EXPLAIN: */
 */
// EXPLAIN: function bootstrapLeadOwnersSheet_() {
function bootstrapLeadOwnersSheet_() {
// EXPLAIN: const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: let sheet = ss.getSheetByName(LEAD_SHEETS.OWNERS);
  let sheet = ss.getSheetByName(LEAD_SHEETS.OWNERS);
// EXPLAIN: if (!sheet) {
  if (!sheet) {
// EXPLAIN: sheet = ss.insertSheet(LEAD_SHEETS.OWNERS);
    sheet = ss.insertSheet(LEAD_SHEETS.OWNERS);
// EXPLAIN: sheet.getRange(1, 1, 1, LEAD_OWNER_HEADERS.length).setValues([LEAD_OWNER_HEADERS]);
    sheet.getRange(1, 1, 1, LEAD_OWNER_HEADERS.length).setValues([LEAD_OWNER_HEADERS]);
// EXPLAIN: sheet.getRange(1, 1, 1, LEAD_OWNER_HEADERS.length).setFontWeight('bold');
    sheet.getRange(1, 1, 1, LEAD_OWNER_HEADERS.length).setFontWeight('bold');
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Form submit handler for lead capture
 * Form submit handler for lead capture
// EXPLAIN: */
 */
// EXPLAIN: function leadOnFormSubmit(e) {
function leadOnFormSubmit(e) {
// EXPLAIN: const payload = normalizeLeadPayload_(e);
  const payload = normalizeLeadPayload_(e);
// EXPLAIN: const ownerEmail = selectOwnerRoundRobin_();
  const ownerEmail = selectOwnerRoundRobin_();
// EXPLAIN: const contactResult = upsertContactLead_(payload, ownerEmail);
  const contactResult = upsertContactLead_(payload, ownerEmail);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (contactResult.is_new) {
  if (contactResult.is_new) {
// EXPLAIN: sendWelcomeEmail_(payload, ownerEmail);
    sendWelcomeEmail_(payload, ownerEmail);
// EXPLAIN: try {
    try {
// EXPLAIN: if (typeof provisionClientFilesForContact_ === 'function') {
      if (typeof provisionClientFilesForContact_ === 'function') {
// EXPLAIN: provisionClientFilesForContact_(contactResult.contact_id);
        provisionClientFilesForContact_(contactResult.contact_id);
// EXPLAIN: }
      }
// EXPLAIN: } catch (e) {
    } catch (e) {
// EXPLAIN: logLeadActivity_('contact', contactResult.contact_id, 'update', { error: e.message });
      logLeadActivity_('contact', contactResult.contact_id, 'update', { error: e.message });
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const opp = createOpportunityForLead_(payload, contactResult.contact_id, ownerEmail);
  const opp = createOpportunityForLead_(payload, contactResult.contact_id, ownerEmail);
// EXPLAIN: logLeadActivity_('opportunity', opp.opp_id, 'create', {
  logLeadActivity_('opportunity', opp.opp_id, 'create', {
// EXPLAIN: owner: ownerEmail,
    owner: ownerEmail,
// EXPLAIN: source: payload.source
    source: payload.source
// EXPLAIN: });
  });
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function normalizeLeadPayload_(e) {
function normalizeLeadPayload_(e) {
// EXPLAIN: const named = e && e.namedValues ? e.namedValues : {};
  const named = e && e.namedValues ? e.namedValues : {};
// EXPLAIN: const getValue = key => (named[key] && named[key][0]) ? String(named[key][0]).trim() : '';
  const getValue = key => (named[key] && named[key][0]) ? String(named[key][0]).trim() : '';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return {
  return {
// EXPLAIN: first_name: getValue('Ad'),
    first_name: getValue('Ad'),
// EXPLAIN: last_name: getValue('Soyad'),
    last_name: getValue('Soyad'),
// EXPLAIN: email: normalizeEmailLead_(getValue('Email')),
    email: normalizeEmailLead_(getValue('Email')),
// EXPLAIN: phone: normalizePhoneLead_(getValue('Telefon')),
    phone: normalizePhoneLead_(getValue('Telefon')),
// EXPLAIN: source: getValue('Kaynak'),
    source: getValue('Kaynak'),
// EXPLAIN: service: getValue('İlgilendiği hizmet'),
    service: getValue('İlgilendiği hizmet'),
// EXPLAIN: budget: getValue('Bütçe aralığı'),
    budget: getValue('Bütçe aralığı'),
// EXPLAIN: notes: getValue('Not')
    notes: getValue('Not')
// EXPLAIN: };
  };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function normalizeEmailLead_(email) {
function normalizeEmailLead_(email) {
// EXPLAIN: if (!email) return '';
  if (!email) return '';
// EXPLAIN: return String(email).toLowerCase().trim();
  return String(email).toLowerCase().trim();
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function normalizePhoneLead_(phone) {
function normalizePhoneLead_(phone) {
// EXPLAIN: if (!phone) return '';
  if (!phone) return '';
// EXPLAIN: return String(phone).replace(/\D/g, '');
  return String(phone).replace(/\D/g, '');
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function buildLeadTags_(payload) {
function buildLeadTags_(payload) {
// EXPLAIN: const tags = [];
  const tags = [];
// EXPLAIN: if (payload.source) tags.push('source:' + payload.source);
  if (payload.source) tags.push('source:' + payload.source);
// EXPLAIN: if (payload.service) tags.push('service:' + payload.service);
  if (payload.service) tags.push('service:' + payload.service);
// EXPLAIN: if (payload.budget) tags.push('budget:' + payload.budget);
  if (payload.budget) tags.push('budget:' + payload.budget);
// EXPLAIN: return tags.join(',');
  return tags.join(',');
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Upsert contact in Contacts sheet
 * Upsert contact in Contacts sheet
// EXPLAIN: */
 */
// EXPLAIN: function upsertContactLead_(payload, ownerEmail) {
function upsertContactLead_(payload, ownerEmail) {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.CONTACTS);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.CONTACTS);
// EXPLAIN: if (!sheet) throw new Error('Contacts sheet missing');
  if (!sheet) throw new Error('Contacts sheet missing');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: const headers = data[0] || [];
  const headers = data[0] || [];
// EXPLAIN: const now = new Date().toISOString();
  const now = new Date().toISOString();
// EXPLAIN: let existingRow = null;
  let existingRow = null;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (let i = 1; i < data.length; i++) {
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: const rowEmail = normalizeEmailLead_(data[i][headers.indexOf('email')]);
    const rowEmail = normalizeEmailLead_(data[i][headers.indexOf('email')]);
// EXPLAIN: const rowPhone = normalizePhoneLead_(data[i][headers.indexOf('phone')]);
    const rowPhone = normalizePhoneLead_(data[i][headers.indexOf('phone')]);
// EXPLAIN: if (payload.email && rowEmail === payload.email) {
    if (payload.email && rowEmail === payload.email) {
// EXPLAIN: existingRow = i + 1;
      existingRow = i + 1;
// EXPLAIN: break;
      break;
// EXPLAIN: }
    }
// EXPLAIN: if (!payload.email && payload.phone && rowPhone === payload.phone) {
    if (!payload.email && payload.phone && rowPhone === payload.phone) {
// EXPLAIN: existingRow = i + 1;
      existingRow = i + 1;
// EXPLAIN: break;
      break;
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const tags = buildLeadTags_(payload);
  const tags = buildLeadTags_(payload);
// EXPLAIN: const record = {
  const record = {
// EXPLAIN: contact_id: existingRow ? data[existingRow - 1][headers.indexOf('contact_id')] : Utilities.getUuid(),
    contact_id: existingRow ? data[existingRow - 1][headers.indexOf('contact_id')] : Utilities.getUuid(),
// EXPLAIN: first_name: payload.first_name,
    first_name: payload.first_name,
// EXPLAIN: last_name: payload.last_name,
    last_name: payload.last_name,
// EXPLAIN: email: payload.email,
    email: payload.email,
// EXPLAIN: phone: payload.phone,
    phone: payload.phone,
// EXPLAIN: source: payload.source || 'form',
    source: payload.source || 'form',
// EXPLAIN: tags: tags,
    tags: tags,
// EXPLAIN: owner: ownerEmail,
    owner: ownerEmail,
// EXPLAIN: created_at: existingRow ? data[existingRow - 1][headers.indexOf('created_at')] : now,
    created_at: existingRow ? data[existingRow - 1][headers.indexOf('created_at')] : now,
// EXPLAIN: updated_at: now,
    updated_at: now,
// EXPLAIN: status: 'new'
    status: 'new'
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (existingRow) {
  if (existingRow) {
// EXPLAIN: sheet.getRange(existingRow, 1, 1, headers.length).setValues([headers.map(h => record[h] || '')]);
    sheet.getRange(existingRow, 1, 1, headers.length).setValues([headers.map(h => record[h] || '')]);
// EXPLAIN: logLeadActivity_('contact', record.contact_id, 'update', { owner: ownerEmail });
    logLeadActivity_('contact', record.contact_id, 'update', { owner: ownerEmail });
// EXPLAIN: return { contact_id: record.contact_id, is_new: false };
    return { contact_id: record.contact_id, is_new: false };
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: sheet.appendRow(headers.map(h => record[h] || ''));
  sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: logLeadActivity_('contact', record.contact_id, 'create', { owner: ownerEmail });
  logLeadActivity_('contact', record.contact_id, 'create', { owner: ownerEmail });
// EXPLAIN: return { contact_id: record.contact_id, is_new: true };
  return { contact_id: record.contact_id, is_new: true };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Owner round-robin selection
 * Owner round-robin selection
// EXPLAIN: */
 */
// EXPLAIN: function selectOwnerRoundRobin_() {
function selectOwnerRoundRobin_() {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.OWNERS);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.OWNERS);
// EXPLAIN: if (!sheet) throw new Error('Owners sheet missing');
  if (!sheet) throw new Error('Owners sheet missing');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: const headers = data[0] || [];
  const headers = data[0] || [];
// EXPLAIN: if (data.length < 2) {
  if (data.length < 2) {
// EXPLAIN: const fallback = Session.getActiveUser().getEmail() || 'unassigned';
    const fallback = Session.getActiveUser().getEmail() || 'unassigned';
// EXPLAIN: return fallback;
    return fallback;
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const activeOwners = data.slice(1).filter(row => {
  const activeOwners = data.slice(1).filter(row => {
// EXPLAIN: const isActive = String(row[headers.indexOf('is_active')]).toLowerCase() === 'true';
    const isActive = String(row[headers.indexOf('is_active')]).toLowerCase() === 'true';
// EXPLAIN: return isActive;
    return isActive;
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (activeOwners.length === 0) {
  if (activeOwners.length === 0) {
// EXPLAIN: return Session.getActiveUser().getEmail() || 'unassigned';
    return Session.getActiveUser().getEmail() || 'unassigned';
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: let selected = activeOwners[0];
  let selected = activeOwners[0];
// EXPLAIN: for (const owner of activeOwners) {
  for (const owner of activeOwners) {
// EXPLAIN: const lastAssigned = owner[headers.indexOf('last_assigned_at')] || '';
    const lastAssigned = owner[headers.indexOf('last_assigned_at')] || '';
// EXPLAIN: const selectedLast = selected[headers.indexOf('last_assigned_at')] || '';
    const selectedLast = selected[headers.indexOf('last_assigned_at')] || '';
// EXPLAIN: if (!selectedLast || (lastAssigned && lastAssigned < selectedLast)) {
    if (!selectedLast || (lastAssigned && lastAssigned < selectedLast)) {
// EXPLAIN: selected = owner;
      selected = owner;
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const ownerEmail = selected[headers.indexOf('owner_email')];
  const ownerEmail = selected[headers.indexOf('owner_email')];
// EXPLAIN: const rowIndex = data.indexOf(selected) + 1;
  const rowIndex = data.indexOf(selected) + 1;
// EXPLAIN: sheet.getRange(rowIndex, headers.indexOf('last_assigned_at') + 1).setValue(new Date().toISOString());
  sheet.getRange(rowIndex, headers.indexOf('last_assigned_at') + 1).setValue(new Date().toISOString());
// EXPLAIN: return ownerEmail;
  return ownerEmail;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Create Opportunity in Opportunities sheet
 * Create Opportunity in Opportunities sheet
// EXPLAIN: */
 */
// EXPLAIN: function createOpportunityForLead_(payload, contactId, ownerEmail) {
function createOpportunityForLead_(payload, contactId, ownerEmail) {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.OPPORTUNITIES);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.OPPORTUNITIES);
// EXPLAIN: if (!sheet) throw new Error('Opportunities sheet missing');
  if (!sheet) throw new Error('Opportunities sheet missing');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: const headers = data[0] || [];
  const headers = data[0] || [];
// EXPLAIN: const now = new Date().toISOString();
  const now = new Date().toISOString();
// EXPLAIN: const title = payload.first_name + ' ' + payload.last_name + ' - ' + payload.service;
  const title = payload.first_name + ' ' + payload.last_name + ' - ' + payload.service;
// EXPLAIN: const stageInfo = getDefaultPipelineStage_();
  const stageInfo = getDefaultPipelineStage_();
// EXPLAIN: const record = {
  const record = {
// EXPLAIN: opp_id: Utilities.getUuid(),
    opp_id: Utilities.getUuid(),
// EXPLAIN: contact_id: contactId,
    contact_id: contactId,
// EXPLAIN: pipeline_id: stageInfo.pipeline_id,
    pipeline_id: stageInfo.pipeline_id,
// EXPLAIN: stage_id: stageInfo.stage_id,
    stage_id: stageInfo.stage_id,
// EXPLAIN: title: title.trim(),
    title: title.trim(),
// EXPLAIN: value_amount: 0,
    value_amount: 0,
// EXPLAIN: currency: 'TRY',
    currency: 'TRY',
// EXPLAIN: probability: 10,
    probability: 10,
// EXPLAIN: status: 'open',
    status: 'open',
// EXPLAIN: expected_close_date: '',
    expected_close_date: '',
// EXPLAIN: owner: ownerEmail,
    owner: ownerEmail,
// EXPLAIN: created_at: now,
    created_at: now,
// EXPLAIN: updated_at: now
    updated_at: now
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: sheet.appendRow(headers.map(h => record[h] || ''));
  sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: return record;
  return record;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function getDefaultPipelineStage_() {
function getDefaultPipelineStage_() {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Stages');
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Stages');
// EXPLAIN: if (!sheet) return { pipeline_id: '', stage_id: 'NEW_LEAD' };
  if (!sheet) return { pipeline_id: '', stage_id: 'NEW_LEAD' };
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: const headers = data[0] || [];
  const headers = data[0] || [];
// EXPLAIN: let selected = null;
  let selected = null;
// EXPLAIN: for (let i = 1; i < data.length; i++) {
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: const order = Number(data[i][headers.indexOf('stage_order')] || 0);
    const order = Number(data[i][headers.indexOf('stage_order')] || 0);
// EXPLAIN: if (!selected || order < selected.order) {
    if (!selected || order < selected.order) {
// EXPLAIN: selected = {
      selected = {
// EXPLAIN: stage_id: data[i][headers.indexOf('stage_id')],
        stage_id: data[i][headers.indexOf('stage_id')],
// EXPLAIN: pipeline_id: data[i][headers.indexOf('pipeline_id')],
        pipeline_id: data[i][headers.indexOf('pipeline_id')],
// EXPLAIN: order: order
        order: order
// EXPLAIN: };
      };
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: return selected ? { pipeline_id: selected.pipeline_id, stage_id: selected.stage_id } : { pipeline_id: '', stage_id: 'NEW_LEAD' };
  return selected ? { pipeline_id: selected.pipeline_id, stage_id: selected.stage_id } : { pipeline_id: '', stage_id: 'NEW_LEAD' };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Welcome email for new leads
 * Welcome email for new leads
// EXPLAIN: */
 */
// EXPLAIN: function sendWelcomeEmail_(payload, ownerEmail) {
function sendWelcomeEmail_(payload, ownerEmail) {
// EXPLAIN: const subject = 'Hoş geldiniz - Talebiniz alındı';
  const subject = 'Hoş geldiniz - Talebiniz alındı';
// EXPLAIN: const body = [
  const body = [
// EXPLAIN: 'Merhaba ' + payload.first_name + ',',
    'Merhaba ' + payload.first_name + ',',
// EXPLAIN: 'Talebinizi aldık. En kısa sürede sizinle iletişime geçeceğiz.',
    'Talebinizi aldık. En kısa sürede sizinle iletişime geçeceğiz.',
// EXPLAIN: 'Hizmet: ' + payload.service,
    'Hizmet: ' + payload.service,
// EXPLAIN: 'Sorumlu: ' + ownerEmail
    'Sorumlu: ' + ownerEmail
// EXPLAIN: ].join('\n');
  ].join('\n');
// EXPLAIN: GmailApp.sendEmail(payload.email, subject, body);
  GmailApp.sendEmail(payload.email, subject, body);
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Activity log writer
 * Activity log writer
// EXPLAIN: */
 */
// EXPLAIN: function logLeadActivity_(entityType, entityId, action, details) {
function logLeadActivity_(entityType, entityId, action, details) {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.ACTIVITY_LOG);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.ACTIVITY_LOG);
// EXPLAIN: if (!sheet) return;
  if (!sheet) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const headers = sheet.getDataRange().getValues()[0];
  const headers = sheet.getDataRange().getValues()[0];
// EXPLAIN: const record = {
  const record = {
// EXPLAIN: log_id: Utilities.getUuid(),
    log_id: Utilities.getUuid(),
// EXPLAIN: ts: new Date().toISOString(),
    ts: new Date().toISOString(),
// EXPLAIN: entity_type: entityType,
    entity_type: entityType,
// EXPLAIN: entity_id: entityId,
    entity_id: entityId,
// EXPLAIN: action: action,
    action: action,
// EXPLAIN: details_json: JSON.stringify(details || {}),
    details_json: JSON.stringify(details || {}),
// EXPLAIN: actor: 'system'
    actor: 'system'
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: sheet.appendRow(headers.map(h => record[h] || ''));
  sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
