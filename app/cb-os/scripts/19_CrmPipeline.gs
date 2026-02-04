/**
 * CB-OS CRM & Pipeline Module (Sheets-only)
 * Single spreadsheet CRM setup with Contacts, Pipelines, Stages, Opportunities, ActivityLog, Reports
 */

const CRM_SHEETS = {
  CONTACTS: 'Contacts',
  PIPELINES: 'Pipelines',
  STAGES: 'Stages',
  OPPORTUNITIES: 'Opportunities',
  ACTIVITY_LOG: 'ActivityLog',
  REPORTS: 'Reports'
};

const CRM_HEADERS = {
  Contacts: [
    'contact_id', 'first_name', 'last_name', 'email', 'phone', 'source',
    'tags', 'owner', 'created_at', 'updated_at', 'status'
  ],
  Pipelines: ['pipeline_id', 'pipeline_name', 'stages'],
  Stages: ['stage_id', 'pipeline_id', 'stage_name', 'stage_order'],
  Opportunities: [
    'opp_id', 'contact_id', 'pipeline_id', 'stage_id', 'title', 'value_amount',
    'currency', 'probability', 'status', 'expected_close_date', 'owner',
    'created_at', 'updated_at'
  ],
  ActivityLog: ['log_id', 'ts', 'entity_type', 'entity_id', 'action', 'details_json', 'actor']
};

/**
 * Bootstrap CRM sheets with canonical headers and report tab
 */
function bootstrapCrmSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const created = [];
  Object.keys(CRM_HEADERS).forEach(name => {
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
      sheet.getRange(1, 1, 1, CRM_HEADERS[name].length).setValues([CRM_HEADERS[name]]);
      sheet.getRange(1, 1, 1, CRM_HEADERS[name].length).setFontWeight('bold');
      created.push(name);
    }
  });
  
  if (!ss.getSheetByName(CRM_SHEETS.REPORTS)) {
    const report = ss.insertSheet(CRM_SHEETS.REPORTS);
    report.getRange(1, 1, 1, 4).setValues([['stage_name', 'open_count', 'total_value', 'pipeline_name']]);
    report.getRange(1, 1, 1, 4).setFontWeight('bold');
    created.push(CRM_SHEETS.REPORTS);
  }
  
  return { created: created };
}

/**
 * UUID generator
 */
function generateUuid_() {
  return Utilities.getUuid();
}

/**
 * Normalize email
 */
function normalizeEmailCrm_(email) {
  if (!email) return '';
  return String(email).toLowerCase().trim();
}

/**
 * Normalize phone (basic digits-only)
 */
function normalizePhoneCrm_(phone) {
  if (!phone) return '';
  return String(phone).replace(/\D/g, '');
}

/**
 * Upsert contact by email (primary) or phone (fallback)
 * @param {Object} contact - contact fields
 * @returns {Object} contact record
 */
function upsertContact_(contact) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.CONTACTS);
  if (!sheet) throw new Error('Contacts sheet missing');
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0] || [];
  const now = new Date().toISOString();
  const email = normalizeEmailCrm_(contact.email);
  const phone = normalizePhoneCrm_(contact.phone);
  
  let existingRow = null;
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const rowEmail = normalizeEmailCrm_(row[headers.indexOf('email')]);
    const rowPhone = normalizePhoneCrm_(row[headers.indexOf('phone')]);
    if (email && rowEmail === email) {
      existingRow = i + 1;
      break;
    }
    if (!email && phone && rowPhone === phone) {
      existingRow = i + 1;
      break;
    }
  }
  
  const record = {
    contact_id: contact.contact_id || generateUuid_(),
    first_name: contact.first_name || '',
    last_name: contact.last_name || '',
    email: email,
    phone: phone,
    source: contact.source || 'manual',
    tags: contact.tags || '',
    owner: contact.owner || '',
    created_at: now,
    updated_at: now,
    status: contact.status || 'new'
  };
  
  if (existingRow) {
    record.created_at = sheet.getRange(existingRow, headers.indexOf('created_at') + 1).getValue();
    record.contact_id = sheet.getRange(existingRow, headers.indexOf('contact_id') + 1).getValue();
    sheet.getRange(existingRow, 1, 1, headers.length).setValues([headers.map(h => record[h] || '')]);
    logActivity_('contact', record.contact_id, 'update', { source: record.source });
  } else {
    sheet.appendRow(headers.map(h => record[h] || ''));
    logActivity_('contact', record.contact_id, 'create', { source: record.source });
  }
  
  return record;
}

/**
 * Create or update opportunity by opp_id if present
 * @param {Object} opp - opportunity fields
 */
function createOrUpdateOpportunity_(opp) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.OPPORTUNITIES);
  if (!sheet) throw new Error('Opportunities sheet missing');
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0] || [];
  const now = new Date().toISOString();
  const oppId = opp.opp_id || generateUuid_();
  let existingRow = null;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][headers.indexOf('opp_id')] === oppId) {
      existingRow = i + 1;
      break;
    }
  }
  
  const record = {
    opp_id: oppId,
    contact_id: opp.contact_id || '',
    pipeline_id: opp.pipeline_id || '',
    stage_id: opp.stage_id || '',
    title: opp.title || '',
    value_amount: Number(opp.value_amount || 0),
    currency: opp.currency || 'TRY',
    probability: Number(opp.probability || 0),
    status: opp.status || 'open',
    expected_close_date: opp.expected_close_date || '',
    owner: opp.owner || '',
    created_at: now,
    updated_at: now
  };
  
  if (existingRow) {
    record.created_at = sheet.getRange(existingRow, headers.indexOf('created_at') + 1).getValue();
    sheet.getRange(existingRow, 1, 1, headers.length).setValues([headers.map(h => record[h] || '')]);
    logActivity_('opportunity', record.opp_id, 'update', { stage_id: record.stage_id });
  } else {
    sheet.appendRow(headers.map(h => record[h] || ''));
    logActivity_('opportunity', record.opp_id, 'create', { stage_id: record.stage_id });
  }
  
  return record;
}

/**
 * Change opportunity stage and log activity
 */
function changeOpportunityStage_(oppId, newStageId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.OPPORTUNITIES);
  if (!sheet) throw new Error('Opportunities sheet missing');
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0] || [];
  const stageIdx = headers.indexOf('stage_id');
  const updatedIdx = headers.indexOf('updated_at');
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][headers.indexOf('opp_id')] === oppId) {
      sheet.getRange(i + 1, stageIdx + 1).setValue(newStageId);
      sheet.getRange(i + 1, updatedIdx + 1).setValue(new Date().toISOString());
      logActivity_('opportunity', oppId, 'stage_change', { stage_id: newStageId });
      return true;
    }
  }
  
  return false;
}

/**
 * Append activity log
 */
function logActivity_(entityType, entityId, action, details) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.ACTIVITY_LOG);
  if (!sheet) return;
  
  const headers = sheet.getDataRange().getValues()[0] || CRM_HEADERS.ActivityLog;
  const actor = Session.getActiveUser().getEmail() || 'system';
  const record = {
    log_id: generateUuid_(),
    ts: new Date().toISOString(),
    entity_type: entityType,
    entity_id: entityId,
    action: action,
    details_json: JSON.stringify(details || {}),
    actor: actor
  };
  
  sheet.appendRow(headers.map(h => record[h] || ''));
}

/**
 * onEdit trigger for Opportunities stage/status updates
 */
function onEdit(e) {
  const range = e.range;
  const sheet = range.getSheet();
  if (sheet.getName() !== CRM_SHEETS.OPPORTUNITIES) return;
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = range.getRow();
  if (row === 1) return;
  
  const colName = headers[range.getColumn() - 1];
  const oppId = sheet.getRange(row, headers.indexOf('opp_id') + 1).getValue();
  
  if (colName === 'stage_id') {
    logActivity_('opportunity', oppId, 'stage_change', { stage_id: range.getValue() });
  }
  
  if (colName === 'status') {
    logActivity_('opportunity', oppId, 'update', { status: range.getValue() });
  }
}

/**
 * Generate basic stage report (open opp count + total value)
 */
function refreshCrmReport_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const reportSheet = ss.getSheetByName(CRM_SHEETS.REPORTS);
  const stagesSheet = ss.getSheetByName(CRM_SHEETS.STAGES);
  const pipelinesSheet = ss.getSheetByName(CRM_SHEETS.PIPELINES);
  const oppSheet = ss.getSheetByName(CRM_SHEETS.OPPORTUNITIES);
  if (!reportSheet || !stagesSheet || !pipelinesSheet || !oppSheet) return;
  
  const stages = stagesSheet.getDataRange().getValues();
  const pipelines = pipelinesSheet.getDataRange().getValues();
  const opps = oppSheet.getDataRange().getValues();
  
  const stageHeaders = stages[0] || [];
  const oppHeaders = opps[0] || [];
  const pipelineHeaders = pipelines[0] || [];
  
  const pipelineMap = {};
  for (let i = 1; i < pipelines.length; i++) {
    pipelineMap[pipelines[i][pipelineHeaders.indexOf('pipeline_id')]] = pipelines[i][pipelineHeaders.indexOf('pipeline_name')];
  }
  
  const reportRows = [];
  for (let i = 1; i < stages.length; i++) {
    const stageId = stages[i][stageHeaders.indexOf('stage_id')];
    const stageName = stages[i][stageHeaders.indexOf('stage_name')];
    const pipelineId = stages[i][stageHeaders.indexOf('pipeline_id')];
    
    let count = 0;
    let total = 0;
    for (let j = 1; j < opps.length; j++) {
      if (opps[j][oppHeaders.indexOf('stage_id')] === stageId &&
          opps[j][oppHeaders.indexOf('status')] === 'open') {
        count++;
        total += Number(opps[j][oppHeaders.indexOf('value_amount')] || 0);
      }
    }
    
    reportRows.push([stageName, count, total, pipelineMap[pipelineId] || '']);
  }
  
  reportSheet.getRange(2, 1, reportSheet.getMaxRows(), 4).clearContent();
  if (reportRows.length > 0) {
    reportSheet.getRange(2, 1, reportRows.length, 4).setValues(reportRows);
  }
}

/**
 * Seed sample data for testing
 */
function seedCrmSampleData_() {
  const pipelineId = generateUuid_();
  const stageIds = [generateUuid_(), generateUuid_(), generateUuid_()];
  
  const pipelineSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.PIPELINES);
  const stagesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.STAGES);
  if (!pipelineSheet || !stagesSheet) throw new Error('Missing pipeline/stages sheets');
  
  pipelineSheet.appendRow([pipelineId, 'Default Pipeline', JSON.stringify(['New', 'Qualified', 'Won'])]);
  stagesSheet.appendRow([stageIds[0], pipelineId, 'New', 1]);
  stagesSheet.appendRow([stageIds[1], pipelineId, 'Qualified', 2]);
  stagesSheet.appendRow([stageIds[2], pipelineId, 'Won', 3]);
  
  const contact = upsertContact_({
    first_name: 'Ayşe',
    last_name: 'Yılmaz',
    email: 'ayse@example.com',
    phone: '+90 555 000 0000',
    source: 'form'
  });
  
  createOrUpdateOpportunity_({
    contact_id: contact.contact_id,
    pipeline_id: pipelineId,
    stage_id: stageIds[0],
    title: 'Kadıköy Daire',
    value_amount: 2500000,
    probability: 20,
    owner: 'agent@example.com'
  });
  
  refreshCrmReport_();
}
