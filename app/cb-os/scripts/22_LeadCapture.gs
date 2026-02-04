/**
 * CB-OS Lead Capture (Forms -> Sheets -> CRM)
 * Upserts Contacts, assigns owner (round-robin), creates Opportunity, sends welcome email.
 */

const LEAD_SHEETS = {
  CONTACTS: 'Contacts',
  OPPORTUNITIES: 'Opportunities',
  ACTIVITY_LOG: 'ActivityLog',
  OWNERS: 'Owners'
};

const LEAD_OWNER_HEADERS = ['owner_email', 'is_active', 'last_assigned_at'];

/**
 * Bootstrap Owners sheet
 */
function bootstrapLeadOwnersSheet_() {
  if (!cfg_('MODULES_LEAD_CAPTURE_ENABLED', DEFAULTS.MODULES_LEAD_CAPTURE_ENABLED)) return;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(LEAD_SHEETS.OWNERS);
  if (!sheet) {
    sheet = ss.insertSheet(LEAD_SHEETS.OWNERS);
    sheet.getRange(1, 1, 1, LEAD_OWNER_HEADERS.length).setValues([LEAD_OWNER_HEADERS]);
    sheet.getRange(1, 1, 1, LEAD_OWNER_HEADERS.length).setFontWeight('bold');
  }
}

/**
 * Form submit handler for lead capture
 */
function leadOnFormSubmit(e) {
  if (!cfg_('MODULES_LEAD_CAPTURE_ENABLED', DEFAULTS.MODULES_LEAD_CAPTURE_ENABLED)) return;
  const payload = normalizeLeadPayload_(e);
  const ownerEmail = selectOwnerRoundRobin_();
  const contactResult = upsertContactLead_(payload, ownerEmail);
  
  if (contactResult.is_new) {
    sendWelcomeEmail_(payload, ownerEmail);
    try {
      if (typeof provisionClientFilesForContact_ === 'function') {
        provisionClientFilesForContact_(contactResult.contact_id);
      }
    } catch (e) {
      logLeadActivity_('contact', contactResult.contact_id, 'update', { error: e.message });
    }
  }
  
  const opp = createOpportunityForLead_(payload, contactResult.contact_id, ownerEmail);
  logLeadActivity_('opportunity', opp.opp_id, 'create', {
    owner: ownerEmail,
    source: payload.source
  });
}

function normalizeLeadPayload_(e) {
  const named = e && e.namedValues ? e.namedValues : {};
  const getValue = key => (named[key] && named[key][0]) ? String(named[key][0]).trim() : '';
  
  return {
    first_name: getValue('Ad'),
    last_name: getValue('Soyad'),
    email: normalizeEmailLead_(getValue('Email')),
    phone: normalizePhoneLead_(getValue('Telefon')),
    source: getValue('Kaynak'),
    service: getValue('İlgilendiği hizmet'),
    budget: getValue('Bütçe aralığı'),
    notes: getValue('Not')
  };
}

function normalizeEmailLead_(email) {
  if (!email) return '';
  return String(email).toLowerCase().trim();
}

function normalizePhoneLead_(phone) {
  if (!phone) return '';
  return String(phone).replace(/\D/g, '');
}

function buildLeadTags_(payload) {
  const tags = [];
  if (payload.source) tags.push('source:' + payload.source);
  if (payload.service) tags.push('service:' + payload.service);
  if (payload.budget) tags.push('budget:' + payload.budget);
  return tags.join(',');
}

/**
 * Upsert contact in Contacts sheet
 */
function upsertContactLead_(payload, ownerEmail) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.CONTACTS);
  if (!sheet) throw new Error('Contacts sheet missing');
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0] || [];
  const now = new Date().toISOString();
  let existingRow = null;
  
  for (let i = 1; i < data.length; i++) {
    const rowEmail = normalizeEmailLead_(data[i][headers.indexOf('email')]);
    const rowPhone = normalizePhoneLead_(data[i][headers.indexOf('phone')]);
    if (payload.email && rowEmail === payload.email) {
      existingRow = i + 1;
      break;
    }
    if (!payload.email && payload.phone && rowPhone === payload.phone) {
      existingRow = i + 1;
      break;
    }
  }
  
  const tags = buildLeadTags_(payload);
  const record = {
    contact_id: existingRow ? data[existingRow - 1][headers.indexOf('contact_id')] : Utilities.getUuid(),
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    phone: payload.phone,
    source: payload.source || 'form',
    tags: tags,
    owner: ownerEmail,
    created_at: existingRow ? data[existingRow - 1][headers.indexOf('created_at')] : now,
    updated_at: now,
    status: 'new'
  };
  
  if (existingRow) {
    sheet.getRange(existingRow, 1, 1, headers.length).setValues([headers.map(h => record[h] || '')]);
    logLeadActivity_('contact', record.contact_id, 'update', { owner: ownerEmail });
    return { contact_id: record.contact_id, is_new: false };
  }
  
  sheet.appendRow(headers.map(h => record[h] || ''));
  logLeadActivity_('contact', record.contact_id, 'create', { owner: ownerEmail });
  return { contact_id: record.contact_id, is_new: true };
}

/**
 * Owner round-robin selection
 */
function selectOwnerRoundRobin_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.OWNERS);
  if (!sheet) throw new Error('Owners sheet missing');
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0] || [];
  if (data.length < 2) {
    const fallback = Session.getActiveUser().getEmail() || 'unassigned';
    return fallback;
  }
  
  const activeOwners = data.slice(1).filter(row => {
    const isActive = String(row[headers.indexOf('is_active')]).toLowerCase() === 'true';
    return isActive;
  });
  
  if (activeOwners.length === 0) {
    return Session.getActiveUser().getEmail() || 'unassigned';
  }
  
  let selected = activeOwners[0];
  for (const owner of activeOwners) {
    const lastAssigned = owner[headers.indexOf('last_assigned_at')] || '';
    const selectedLast = selected[headers.indexOf('last_assigned_at')] || '';
    if (!selectedLast || (lastAssigned && lastAssigned < selectedLast)) {
      selected = owner;
    }
  }
  
  const ownerEmail = selected[headers.indexOf('owner_email')];
  const rowIndex = data.indexOf(selected) + 1;
  sheet.getRange(rowIndex, headers.indexOf('last_assigned_at') + 1).setValue(new Date().toISOString());
  return ownerEmail;
}

/**
 * Create Opportunity in Opportunities sheet
 */
function createOpportunityForLead_(payload, contactId, ownerEmail) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.OPPORTUNITIES);
  if (!sheet) throw new Error('Opportunities sheet missing');
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0] || [];
  const now = new Date().toISOString();
  const title = payload.first_name + ' ' + payload.last_name + ' - ' + payload.service;
  const stageInfo = getDefaultPipelineStage_();
  const record = {
    opp_id: Utilities.getUuid(),
    contact_id: contactId,
    pipeline_id: stageInfo.pipeline_id,
    stage_id: stageInfo.stage_id,
    title: title.trim(),
    value_amount: 0,
    currency: 'TRY',
    probability: 10,
    status: 'open',
    expected_close_date: '',
    owner: ownerEmail,
    created_at: now,
    updated_at: now
  };
  
  sheet.appendRow(headers.map(h => record[h] || ''));
  return record;
}

function getDefaultPipelineStage_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Stages');
  if (!sheet) return { pipeline_id: '', stage_id: 'NEW_LEAD' };
  const data = sheet.getDataRange().getValues();
  const headers = data[0] || [];
  let selected = null;
  for (let i = 1; i < data.length; i++) {
    const order = Number(data[i][headers.indexOf('stage_order')] || 0);
    if (!selected || order < selected.order) {
      selected = {
        stage_id: data[i][headers.indexOf('stage_id')],
        pipeline_id: data[i][headers.indexOf('pipeline_id')],
        order: order
      };
    }
  }
  return selected ? { pipeline_id: selected.pipeline_id, stage_id: selected.stage_id } : { pipeline_id: '', stage_id: 'NEW_LEAD' };
}

/**
 * Welcome email for new leads
 */
function sendWelcomeEmail_(payload, ownerEmail) {
  const subject = 'Hoş geldiniz - Talebiniz alındı';
  const body = [
    'Merhaba ' + payload.first_name + ',',
    'Talebinizi aldık. En kısa sürede sizinle iletişime geçeceğiz.',
    'Hizmet: ' + payload.service,
    'Sorumlu: ' + ownerEmail
  ].join('\n');
  GmailApp.sendEmail(payload.email, subject, body);
}

/**
 * Activity log writer
 */
function logLeadActivity_(entityType, entityId, action, details) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.ACTIVITY_LOG);
  if (!sheet) return;
  
  const headers = sheet.getDataRange().getValues()[0];
  const record = {
    log_id: Utilities.getUuid(),
    ts: new Date().toISOString(),
    entity_type: entityType,
    entity_id: entityId,
    action: action,
    details_json: JSON.stringify(details || {}),
    actor: 'system'
  };
  
  sheet.appendRow(headers.map(h => record[h] || ''));
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
