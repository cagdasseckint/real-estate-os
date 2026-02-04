// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS CRM & Pipeline Module (Sheets-only)
 * CB-OS CRM & Pipeline Module (Sheets-only)
// EXPLAIN: * Single spreadsheet CRM setup with Contacts, Pipelines, Stages, Opportunities, ActivityLog, Reports
 * Single spreadsheet CRM setup with Contacts, Pipelines, Stages, Opportunities, ActivityLog, Reports
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: const CRM_SHEETS = {
const CRM_SHEETS = {
// EXPLAIN: CONTACTS: 'Contacts',
  CONTACTS: 'Contacts',
// EXPLAIN: PIPELINES: 'Pipelines',
  PIPELINES: 'Pipelines',
// EXPLAIN: STAGES: 'Stages',
  STAGES: 'Stages',
// EXPLAIN: OPPORTUNITIES: 'Opportunities',
  OPPORTUNITIES: 'Opportunities',
// EXPLAIN: ACTIVITY_LOG: 'ActivityLog',
  ACTIVITY_LOG: 'ActivityLog',
// EXPLAIN: REPORTS: 'Reports'
  REPORTS: 'Reports'
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: const CRM_HEADERS = {
const CRM_HEADERS = {
// EXPLAIN: Contacts: [
  Contacts: [
// EXPLAIN: 'contact_id', 'first_name', 'last_name', 'email', 'phone', 'source',
    'contact_id', 'first_name', 'last_name', 'email', 'phone', 'source',
// EXPLAIN: 'tags', 'owner', 'created_at', 'updated_at', 'status'
    'tags', 'owner', 'created_at', 'updated_at', 'status'
// EXPLAIN: ],
  ],
// EXPLAIN: Pipelines: ['pipeline_id', 'pipeline_name', 'stages'],
  Pipelines: ['pipeline_id', 'pipeline_name', 'stages'],
// EXPLAIN: Stages: ['stage_id', 'pipeline_id', 'stage_name', 'stage_order'],
  Stages: ['stage_id', 'pipeline_id', 'stage_name', 'stage_order'],
// EXPLAIN: Opportunities: [
  Opportunities: [
// EXPLAIN: 'opp_id', 'contact_id', 'pipeline_id', 'stage_id', 'title', 'value_amount',
    'opp_id', 'contact_id', 'pipeline_id', 'stage_id', 'title', 'value_amount',
// EXPLAIN: 'currency', 'probability', 'status', 'expected_close_date', 'owner',
    'currency', 'probability', 'status', 'expected_close_date', 'owner',
// EXPLAIN: 'created_at', 'updated_at'
    'created_at', 'updated_at'
// EXPLAIN: ],
  ],
// EXPLAIN: ActivityLog: ['log_id', 'ts', 'entity_type', 'entity_id', 'action', 'details_json', 'actor']
  ActivityLog: ['log_id', 'ts', 'entity_type', 'entity_id', 'action', 'details_json', 'actor']
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Bootstrap CRM sheets with canonical headers and report tab
 * Bootstrap CRM sheets with canonical headers and report tab
// EXPLAIN: */
 */
// EXPLAIN: function bootstrapCrmSheets_() {
function bootstrapCrmSheets_() {
// EXPLAIN: const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: const created = [];
  const created = [];
// EXPLAIN: Object.keys(CRM_HEADERS).forEach(name => {
  Object.keys(CRM_HEADERS).forEach(name => {
// EXPLAIN: let sheet = ss.getSheetByName(name);
    let sheet = ss.getSheetByName(name);
// EXPLAIN: if (!sheet) {
    if (!sheet) {
// EXPLAIN: sheet = ss.insertSheet(name);
      sheet = ss.insertSheet(name);
// EXPLAIN: sheet.getRange(1, 1, 1, CRM_HEADERS[name].length).setValues([CRM_HEADERS[name]]);
      sheet.getRange(1, 1, 1, CRM_HEADERS[name].length).setValues([CRM_HEADERS[name]]);
// EXPLAIN: sheet.getRange(1, 1, 1, CRM_HEADERS[name].length).setFontWeight('bold');
      sheet.getRange(1, 1, 1, CRM_HEADERS[name].length).setFontWeight('bold');
// EXPLAIN: created.push(name);
      created.push(name);
// EXPLAIN: }
    }
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (!ss.getSheetByName(CRM_SHEETS.REPORTS)) {
  if (!ss.getSheetByName(CRM_SHEETS.REPORTS)) {
// EXPLAIN: const report = ss.insertSheet(CRM_SHEETS.REPORTS);
    const report = ss.insertSheet(CRM_SHEETS.REPORTS);
// EXPLAIN: report.getRange(1, 1, 1, 4).setValues([['stage_name', 'open_count', 'total_value', 'pipeline_name']]);
    report.getRange(1, 1, 1, 4).setValues([['stage_name', 'open_count', 'total_value', 'pipeline_name']]);
// EXPLAIN: report.getRange(1, 1, 1, 4).setFontWeight('bold');
    report.getRange(1, 1, 1, 4).setFontWeight('bold');
// EXPLAIN: created.push(CRM_SHEETS.REPORTS);
    created.push(CRM_SHEETS.REPORTS);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return { created: created };
  return { created: created };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * UUID generator
 * UUID generator
// EXPLAIN: */
 */
// EXPLAIN: function generateUuid_() {
function generateUuid_() {
// EXPLAIN: return Utilities.getUuid();
  return Utilities.getUuid();
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Normalize email
 * Normalize email
// EXPLAIN: */
 */
// EXPLAIN: function normalizeEmailCrm_(email) {
function normalizeEmailCrm_(email) {
// EXPLAIN: if (!email) return '';
  if (!email) return '';
// EXPLAIN: return String(email).toLowerCase().trim();
  return String(email).toLowerCase().trim();
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Normalize phone (basic digits-only)
 * Normalize phone (basic digits-only)
// EXPLAIN: */
 */
// EXPLAIN: function normalizePhoneCrm_(phone) {
function normalizePhoneCrm_(phone) {
// EXPLAIN: if (!phone) return '';
  if (!phone) return '';
// EXPLAIN: return String(phone).replace(/\D/g, '');
  return String(phone).replace(/\D/g, '');
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Upsert contact by email (primary) or phone (fallback)
 * Upsert contact by email (primary) or phone (fallback)
// EXPLAIN: * @param {Object} contact - contact fields
 * @param {Object} contact - contact fields
// EXPLAIN: * @returns {Object} contact record
 * @returns {Object} contact record
// EXPLAIN: */
 */
// EXPLAIN: function upsertContact_(contact) {
function upsertContact_(contact) {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.CONTACTS);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.CONTACTS);
// EXPLAIN: if (!sheet) throw new Error('Contacts sheet missing');
  if (!sheet) throw new Error('Contacts sheet missing');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: const headers = data[0] || [];
  const headers = data[0] || [];
// EXPLAIN: const now = new Date().toISOString();
  const now = new Date().toISOString();
// EXPLAIN: const email = normalizeEmailCrm_(contact.email);
  const email = normalizeEmailCrm_(contact.email);
// EXPLAIN: const phone = normalizePhoneCrm_(contact.phone);
  const phone = normalizePhoneCrm_(contact.phone);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: let existingRow = null;
  let existingRow = null;
// EXPLAIN: for (let i = 1; i < data.length; i++) {
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: const row = data[i];
    const row = data[i];
// EXPLAIN: const rowEmail = normalizeEmailCrm_(row[headers.indexOf('email')]);
    const rowEmail = normalizeEmailCrm_(row[headers.indexOf('email')]);
// EXPLAIN: const rowPhone = normalizePhoneCrm_(row[headers.indexOf('phone')]);
    const rowPhone = normalizePhoneCrm_(row[headers.indexOf('phone')]);
// EXPLAIN: if (email && rowEmail === email) {
    if (email && rowEmail === email) {
// EXPLAIN: existingRow = i + 1;
      existingRow = i + 1;
// EXPLAIN: break;
      break;
// EXPLAIN: }
    }
// EXPLAIN: if (!email && phone && rowPhone === phone) {
    if (!email && phone && rowPhone === phone) {
// EXPLAIN: existingRow = i + 1;
      existingRow = i + 1;
// EXPLAIN: break;
      break;
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const record = {
  const record = {
// EXPLAIN: contact_id: contact.contact_id || generateUuid_(),
    contact_id: contact.contact_id || generateUuid_(),
// EXPLAIN: first_name: contact.first_name || '',
    first_name: contact.first_name || '',
// EXPLAIN: last_name: contact.last_name || '',
    last_name: contact.last_name || '',
// EXPLAIN: email: email,
    email: email,
// EXPLAIN: phone: phone,
    phone: phone,
// EXPLAIN: source: contact.source || 'manual',
    source: contact.source || 'manual',
// EXPLAIN: tags: contact.tags || '',
    tags: contact.tags || '',
// EXPLAIN: owner: contact.owner || '',
    owner: contact.owner || '',
// EXPLAIN: created_at: now,
    created_at: now,
// EXPLAIN: updated_at: now,
    updated_at: now,
// EXPLAIN: status: contact.status || 'new'
    status: contact.status || 'new'
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (existingRow) {
  if (existingRow) {
// EXPLAIN: record.created_at = sheet.getRange(existingRow, headers.indexOf('created_at') + 1).getValue();
    record.created_at = sheet.getRange(existingRow, headers.indexOf('created_at') + 1).getValue();
// EXPLAIN: record.contact_id = sheet.getRange(existingRow, headers.indexOf('contact_id') + 1).getValue();
    record.contact_id = sheet.getRange(existingRow, headers.indexOf('contact_id') + 1).getValue();
// EXPLAIN: sheet.getRange(existingRow, 1, 1, headers.length).setValues([headers.map(h => record[h] || '')]);
    sheet.getRange(existingRow, 1, 1, headers.length).setValues([headers.map(h => record[h] || '')]);
// EXPLAIN: logActivity_('contact', record.contact_id, 'update', { source: record.source });
    logActivity_('contact', record.contact_id, 'update', { source: record.source });
// EXPLAIN: } else {
  } else {
// EXPLAIN: sheet.appendRow(headers.map(h => record[h] || ''));
    sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: logActivity_('contact', record.contact_id, 'create', { source: record.source });
    logActivity_('contact', record.contact_id, 'create', { source: record.source });
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return record;
  return record;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Create or update opportunity by opp_id if present
 * Create or update opportunity by opp_id if present
// EXPLAIN: * @param {Object} opp - opportunity fields
 * @param {Object} opp - opportunity fields
// EXPLAIN: */
 */
// EXPLAIN: function createOrUpdateOpportunity_(opp) {
function createOrUpdateOpportunity_(opp) {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.OPPORTUNITIES);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.OPPORTUNITIES);
// EXPLAIN: if (!sheet) throw new Error('Opportunities sheet missing');
  if (!sheet) throw new Error('Opportunities sheet missing');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: const headers = data[0] || [];
  const headers = data[0] || [];
// EXPLAIN: const now = new Date().toISOString();
  const now = new Date().toISOString();
// EXPLAIN: const oppId = opp.opp_id || generateUuid_();
  const oppId = opp.opp_id || generateUuid_();
// EXPLAIN: let existingRow = null;
  let existingRow = null;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (let i = 1; i < data.length; i++) {
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: if (data[i][headers.indexOf('opp_id')] === oppId) {
    if (data[i][headers.indexOf('opp_id')] === oppId) {
// EXPLAIN: existingRow = i + 1;
      existingRow = i + 1;
// EXPLAIN: break;
      break;
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const record = {
  const record = {
// EXPLAIN: opp_id: oppId,
    opp_id: oppId,
// EXPLAIN: contact_id: opp.contact_id || '',
    contact_id: opp.contact_id || '',
// EXPLAIN: pipeline_id: opp.pipeline_id || '',
    pipeline_id: opp.pipeline_id || '',
// EXPLAIN: stage_id: opp.stage_id || '',
    stage_id: opp.stage_id || '',
// EXPLAIN: title: opp.title || '',
    title: opp.title || '',
// EXPLAIN: value_amount: Number(opp.value_amount || 0),
    value_amount: Number(opp.value_amount || 0),
// EXPLAIN: currency: opp.currency || 'TRY',
    currency: opp.currency || 'TRY',
// EXPLAIN: probability: Number(opp.probability || 0),
    probability: Number(opp.probability || 0),
// EXPLAIN: status: opp.status || 'open',
    status: opp.status || 'open',
// EXPLAIN: expected_close_date: opp.expected_close_date || '',
    expected_close_date: opp.expected_close_date || '',
// EXPLAIN: owner: opp.owner || '',
    owner: opp.owner || '',
// EXPLAIN: created_at: now,
    created_at: now,
// EXPLAIN: updated_at: now
    updated_at: now
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (existingRow) {
  if (existingRow) {
// EXPLAIN: record.created_at = sheet.getRange(existingRow, headers.indexOf('created_at') + 1).getValue();
    record.created_at = sheet.getRange(existingRow, headers.indexOf('created_at') + 1).getValue();
// EXPLAIN: sheet.getRange(existingRow, 1, 1, headers.length).setValues([headers.map(h => record[h] || '')]);
    sheet.getRange(existingRow, 1, 1, headers.length).setValues([headers.map(h => record[h] || '')]);
// EXPLAIN: logActivity_('opportunity', record.opp_id, 'update', { stage_id: record.stage_id });
    logActivity_('opportunity', record.opp_id, 'update', { stage_id: record.stage_id });
// EXPLAIN: } else {
  } else {
// EXPLAIN: sheet.appendRow(headers.map(h => record[h] || ''));
    sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: logActivity_('opportunity', record.opp_id, 'create', { stage_id: record.stage_id });
    logActivity_('opportunity', record.opp_id, 'create', { stage_id: record.stage_id });
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return record;
  return record;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Change opportunity stage and log activity
 * Change opportunity stage and log activity
// EXPLAIN: */
 */
// EXPLAIN: function changeOpportunityStage_(oppId, newStageId) {
function changeOpportunityStage_(oppId, newStageId) {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.OPPORTUNITIES);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.OPPORTUNITIES);
// EXPLAIN: if (!sheet) throw new Error('Opportunities sheet missing');
  if (!sheet) throw new Error('Opportunities sheet missing');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: const headers = data[0] || [];
  const headers = data[0] || [];
// EXPLAIN: const stageIdx = headers.indexOf('stage_id');
  const stageIdx = headers.indexOf('stage_id');
// EXPLAIN: const updatedIdx = headers.indexOf('updated_at');
  const updatedIdx = headers.indexOf('updated_at');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (let i = 1; i < data.length; i++) {
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: if (data[i][headers.indexOf('opp_id')] === oppId) {
    if (data[i][headers.indexOf('opp_id')] === oppId) {
// EXPLAIN: sheet.getRange(i + 1, stageIdx + 1).setValue(newStageId);
      sheet.getRange(i + 1, stageIdx + 1).setValue(newStageId);
// EXPLAIN: sheet.getRange(i + 1, updatedIdx + 1).setValue(new Date().toISOString());
      sheet.getRange(i + 1, updatedIdx + 1).setValue(new Date().toISOString());
// EXPLAIN: logActivity_('opportunity', oppId, 'stage_change', { stage_id: newStageId });
      logActivity_('opportunity', oppId, 'stage_change', { stage_id: newStageId });
// EXPLAIN: return true;
      return true;
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return false;
  return false;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Append activity log
 * Append activity log
// EXPLAIN: */
 */
// EXPLAIN: function logActivity_(entityType, entityId, action, details) {
function logActivity_(entityType, entityId, action, details) {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.ACTIVITY_LOG);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.ACTIVITY_LOG);
// EXPLAIN: if (!sheet) return;
  if (!sheet) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const headers = sheet.getDataRange().getValues()[0] || CRM_HEADERS.ActivityLog;
  const headers = sheet.getDataRange().getValues()[0] || CRM_HEADERS.ActivityLog;
// EXPLAIN: const actor = Session.getActiveUser().getEmail() || 'system';
  const actor = Session.getActiveUser().getEmail() || 'system';
// EXPLAIN: const record = {
  const record = {
// EXPLAIN: log_id: generateUuid_(),
    log_id: generateUuid_(),
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
// EXPLAIN: actor: actor
    actor: actor
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: sheet.appendRow(headers.map(h => record[h] || ''));
  sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * onEdit trigger for Opportunities stage/status updates
 * onEdit trigger for Opportunities stage/status updates
// EXPLAIN: */
 */
// EXPLAIN: function onEdit(e) {
function onEdit(e) {
// EXPLAIN: const range = e.range;
  const range = e.range;
// EXPLAIN: const sheet = range.getSheet();
  const sheet = range.getSheet();
// EXPLAIN: if (sheet.getName() !== CRM_SHEETS.OPPORTUNITIES) return;
  if (sheet.getName() !== CRM_SHEETS.OPPORTUNITIES) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
// EXPLAIN: const row = range.getRow();
  const row = range.getRow();
// EXPLAIN: if (row === 1) return;
  if (row === 1) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const colName = headers[range.getColumn() - 1];
  const colName = headers[range.getColumn() - 1];
// EXPLAIN: const oppId = sheet.getRange(row, headers.indexOf('opp_id') + 1).getValue();
  const oppId = sheet.getRange(row, headers.indexOf('opp_id') + 1).getValue();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (colName === 'stage_id') {
  if (colName === 'stage_id') {
// EXPLAIN: logActivity_('opportunity', oppId, 'stage_change', { stage_id: range.getValue() });
    logActivity_('opportunity', oppId, 'stage_change', { stage_id: range.getValue() });
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (colName === 'status') {
  if (colName === 'status') {
// EXPLAIN: logActivity_('opportunity', oppId, 'update', { status: range.getValue() });
    logActivity_('opportunity', oppId, 'update', { status: range.getValue() });
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Generate basic stage report (open opp count + total value)
 * Generate basic stage report (open opp count + total value)
// EXPLAIN: */
 */
// EXPLAIN: function refreshCrmReport_() {
function refreshCrmReport_() {
// EXPLAIN: const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: const reportSheet = ss.getSheetByName(CRM_SHEETS.REPORTS);
  const reportSheet = ss.getSheetByName(CRM_SHEETS.REPORTS);
// EXPLAIN: const stagesSheet = ss.getSheetByName(CRM_SHEETS.STAGES);
  const stagesSheet = ss.getSheetByName(CRM_SHEETS.STAGES);
// EXPLAIN: const pipelinesSheet = ss.getSheetByName(CRM_SHEETS.PIPELINES);
  const pipelinesSheet = ss.getSheetByName(CRM_SHEETS.PIPELINES);
// EXPLAIN: const oppSheet = ss.getSheetByName(CRM_SHEETS.OPPORTUNITIES);
  const oppSheet = ss.getSheetByName(CRM_SHEETS.OPPORTUNITIES);
// EXPLAIN: if (!reportSheet || !stagesSheet || !pipelinesSheet || !oppSheet) return;
  if (!reportSheet || !stagesSheet || !pipelinesSheet || !oppSheet) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const stages = stagesSheet.getDataRange().getValues();
  const stages = stagesSheet.getDataRange().getValues();
// EXPLAIN: const pipelines = pipelinesSheet.getDataRange().getValues();
  const pipelines = pipelinesSheet.getDataRange().getValues();
// EXPLAIN: const opps = oppSheet.getDataRange().getValues();
  const opps = oppSheet.getDataRange().getValues();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const stageHeaders = stages[0] || [];
  const stageHeaders = stages[0] || [];
// EXPLAIN: const oppHeaders = opps[0] || [];
  const oppHeaders = opps[0] || [];
// EXPLAIN: const pipelineHeaders = pipelines[0] || [];
  const pipelineHeaders = pipelines[0] || [];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const pipelineMap = {};
  const pipelineMap = {};
// EXPLAIN: for (let i = 1; i < pipelines.length; i++) {
  for (let i = 1; i < pipelines.length; i++) {
// EXPLAIN: pipelineMap[pipelines[i][pipelineHeaders.indexOf('pipeline_id')]] = pipelines[i][pipelineHeaders.indexOf('pipeline_name')];
    pipelineMap[pipelines[i][pipelineHeaders.indexOf('pipeline_id')]] = pipelines[i][pipelineHeaders.indexOf('pipeline_name')];
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const reportRows = [];
  const reportRows = [];
// EXPLAIN: for (let i = 1; i < stages.length; i++) {
  for (let i = 1; i < stages.length; i++) {
// EXPLAIN: const stageId = stages[i][stageHeaders.indexOf('stage_id')];
    const stageId = stages[i][stageHeaders.indexOf('stage_id')];
// EXPLAIN: const stageName = stages[i][stageHeaders.indexOf('stage_name')];
    const stageName = stages[i][stageHeaders.indexOf('stage_name')];
// EXPLAIN: const pipelineId = stages[i][stageHeaders.indexOf('pipeline_id')];
    const pipelineId = stages[i][stageHeaders.indexOf('pipeline_id')];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: let count = 0;
    let count = 0;
// EXPLAIN: let total = 0;
    let total = 0;
// EXPLAIN: for (let j = 1; j < opps.length; j++) {
    for (let j = 1; j < opps.length; j++) {
// EXPLAIN: if (opps[j][oppHeaders.indexOf('stage_id')] === stageId &&
      if (opps[j][oppHeaders.indexOf('stage_id')] === stageId &&
// EXPLAIN: opps[j][oppHeaders.indexOf('status')] === 'open') {
          opps[j][oppHeaders.indexOf('status')] === 'open') {
// EXPLAIN: count++;
        count++;
// EXPLAIN: total += Number(opps[j][oppHeaders.indexOf('value_amount')] || 0);
        total += Number(opps[j][oppHeaders.indexOf('value_amount')] || 0);
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: reportRows.push([stageName, count, total, pipelineMap[pipelineId] || '']);
    reportRows.push([stageName, count, total, pipelineMap[pipelineId] || '']);
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: reportSheet.getRange(2, 1, reportSheet.getMaxRows(), 4).clearContent();
  reportSheet.getRange(2, 1, reportSheet.getMaxRows(), 4).clearContent();
// EXPLAIN: if (reportRows.length > 0) {
  if (reportRows.length > 0) {
// EXPLAIN: reportSheet.getRange(2, 1, reportRows.length, 4).setValues(reportRows);
    reportSheet.getRange(2, 1, reportRows.length, 4).setValues(reportRows);
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Seed sample data for testing
 * Seed sample data for testing
// EXPLAIN: */
 */
// EXPLAIN: function seedCrmSampleData_() {
function seedCrmSampleData_() {
// EXPLAIN: const pipelineId = generateUuid_();
  const pipelineId = generateUuid_();
// EXPLAIN: const stageIds = [generateUuid_(), generateUuid_(), generateUuid_()];
  const stageIds = [generateUuid_(), generateUuid_(), generateUuid_()];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const pipelineSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.PIPELINES);
  const pipelineSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.PIPELINES);
// EXPLAIN: const stagesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.STAGES);
  const stagesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.STAGES);
// EXPLAIN: if (!pipelineSheet || !stagesSheet) throw new Error('Missing pipeline/stages sheets');
  if (!pipelineSheet || !stagesSheet) throw new Error('Missing pipeline/stages sheets');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: pipelineSheet.appendRow([pipelineId, 'Default Pipeline', JSON.stringify(['New', 'Qualified', 'Won'])]);
  pipelineSheet.appendRow([pipelineId, 'Default Pipeline', JSON.stringify(['New', 'Qualified', 'Won'])]);
// EXPLAIN: stagesSheet.appendRow([stageIds[0], pipelineId, 'New', 1]);
  stagesSheet.appendRow([stageIds[0], pipelineId, 'New', 1]);
// EXPLAIN: stagesSheet.appendRow([stageIds[1], pipelineId, 'Qualified', 2]);
  stagesSheet.appendRow([stageIds[1], pipelineId, 'Qualified', 2]);
// EXPLAIN: stagesSheet.appendRow([stageIds[2], pipelineId, 'Won', 3]);
  stagesSheet.appendRow([stageIds[2], pipelineId, 'Won', 3]);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const contact = upsertContact_({
  const contact = upsertContact_({
// EXPLAIN: first_name: 'Ayşe',
    first_name: 'Ayşe',
// EXPLAIN: last_name: 'Yılmaz',
    last_name: 'Yılmaz',
// EXPLAIN: email: 'ayse@example.com',
    email: 'ayse@example.com',
// EXPLAIN: phone: '+90 555 000 0000',
    phone: '+90 555 000 0000',
// EXPLAIN: source: 'form'
    source: 'form'
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: createOrUpdateOpportunity_({
  createOrUpdateOpportunity_({
// EXPLAIN: contact_id: contact.contact_id,
    contact_id: contact.contact_id,
// EXPLAIN: pipeline_id: pipelineId,
    pipeline_id: pipelineId,
// EXPLAIN: stage_id: stageIds[0],
    stage_id: stageIds[0],
// EXPLAIN: title: 'Kadıköy Daire',
    title: 'Kadıköy Daire',
// EXPLAIN: value_amount: 2500000,
    value_amount: 2500000,
// EXPLAIN: probability: 20,
    probability: 20,
// EXPLAIN: owner: 'agent@example.com'
    owner: 'agent@example.com'
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: refreshCrmReport_();
  refreshCrmReport_();
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
