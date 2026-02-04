// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS CRM & Pipeline Module (Sheets-only). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS CRM & Pipeline Module (Sheets-only)
// EXPLAIN: Bu satırın görevi: * Single spreadsheet CRM setup with Contacts, Pipelines, Stages, Opportunities, ActivityLog, Reports. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Single spreadsheet CRM setup with Contacts, Pipelines, Stages, Opportunities, ActivityLog, Reports
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: const CRM_SHEETS = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const CRM_SHEETS = {
// EXPLAIN: Bu satırın görevi: CONTACTS: 'Contacts',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  CONTACTS: 'Contacts',
// EXPLAIN: Bu satırın görevi: PIPELINES: 'Pipelines',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  PIPELINES: 'Pipelines',
// EXPLAIN: Bu satırın görevi: STAGES: 'Stages',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  STAGES: 'Stages',
// EXPLAIN: Bu satırın görevi: OPPORTUNITIES: 'Opportunities',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  OPPORTUNITIES: 'Opportunities',
// EXPLAIN: Bu satırın görevi: ACTIVITY_LOG: 'ActivityLog',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ACTIVITY_LOG: 'ActivityLog',
// EXPLAIN: Bu satırın görevi: REPORTS: 'Reports'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  REPORTS: 'Reports'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: const CRM_HEADERS = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const CRM_HEADERS = {
// EXPLAIN: Bu satırın görevi: Contacts: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Contacts: [
// EXPLAIN: Bu satırın görevi: 'contact_id', 'first_name', 'last_name', 'email', 'phone', 'source',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'contact_id', 'first_name', 'last_name', 'email', 'phone', 'source',
// EXPLAIN: Bu satırın görevi: 'tags', 'owner', 'created_at', 'updated_at', 'status'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'tags', 'owner', 'created_at', 'updated_at', 'status'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satırın görevi: Pipelines: ['pipeline_id', 'pipeline_name', 'stages'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Pipelines: ['pipeline_id', 'pipeline_name', 'stages'],
// EXPLAIN: Bu satırın görevi: Stages: ['stage_id', 'pipeline_id', 'stage_name', 'stage_order'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Stages: ['stage_id', 'pipeline_id', 'stage_name', 'stage_order'],
// EXPLAIN: Bu satırın görevi: Opportunities: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Opportunities: [
// EXPLAIN: Bu satırın görevi: 'opp_id', 'contact_id', 'pipeline_id', 'stage_id', 'title', 'value_amount',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'opp_id', 'contact_id', 'pipeline_id', 'stage_id', 'title', 'value_amount',
// EXPLAIN: Bu satırın görevi: 'currency', 'probability', 'status', 'expected_close_date', 'owner',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'currency', 'probability', 'status', 'expected_close_date', 'owner',
// EXPLAIN: Bu satırın görevi: 'created_at', 'updated_at'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'created_at', 'updated_at'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satırın görevi: ActivityLog: ['log_id', 'ts', 'entity_type', 'entity_id', 'action', 'details_json', 'actor']. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ActivityLog: ['log_id', 'ts', 'entity_type', 'entity_id', 'action', 'details_json', 'actor']
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Bootstrap CRM sheets with canonical headers and report tab. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Bootstrap CRM sheets with canonical headers and report tab
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function bootstrapCrmSheets_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function bootstrapCrmSheets_() {
// EXPLAIN: Bu satırın görevi: const ss = SpreadsheetApp.getActiveSpreadsheet();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const ss = SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: Bu satırın görevi: const created = [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const created = [];
// EXPLAIN: Bu satırın görevi: Object.keys(CRM_HEADERS).forEach(name => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Object.keys(CRM_HEADERS).forEach(name => {
// EXPLAIN: Bu satırın görevi: let sheet = ss.getSheetByName(name);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    let sheet = ss.getSheetByName(name);
// EXPLAIN: Bu satırın görevi: if (!sheet) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!sheet) {
// EXPLAIN: Bu satırın görevi: sheet = ss.insertSheet(name);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet = ss.insertSheet(name);
// EXPLAIN: Bu satırın görevi: sheet.getRange(1, 1, 1, CRM_HEADERS[name].length).setValues([CRM_HEADERS[name]]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet.getRange(1, 1, 1, CRM_HEADERS[name].length).setValues([CRM_HEADERS[name]]);
// EXPLAIN: Bu satırın görevi: sheet.getRange(1, 1, 1, CRM_HEADERS[name].length).setFontWeight('bold');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet.getRange(1, 1, 1, CRM_HEADERS[name].length).setFontWeight('bold');
// EXPLAIN: Bu satırın görevi: created.push(name);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      created.push(name);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (!ss.getSheetByName(CRM_SHEETS.REPORTS)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!ss.getSheetByName(CRM_SHEETS.REPORTS)) {
// EXPLAIN: Bu satırın görevi: const report = ss.insertSheet(CRM_SHEETS.REPORTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const report = ss.insertSheet(CRM_SHEETS.REPORTS);
// EXPLAIN: Bu satırın görevi: report.getRange(1, 1, 1, 4).setValues([['stage_name', 'open_count', 'total_value', 'pipeline_name']]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    report.getRange(1, 1, 1, 4).setValues([['stage_name', 'open_count', 'total_value', 'pipeline_name']]);
// EXPLAIN: Bu satırın görevi: report.getRange(1, 1, 1, 4).setFontWeight('bold');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    report.getRange(1, 1, 1, 4).setFontWeight('bold');
// EXPLAIN: Bu satırın görevi: created.push(CRM_SHEETS.REPORTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    created.push(CRM_SHEETS.REPORTS);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return { created: created };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { created: created };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * UUID generator. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * UUID generator
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function generateUuid_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function generateUuid_() {
// EXPLAIN: Bu satırın görevi: return Utilities.getUuid();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return Utilities.getUuid();
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Normalize email. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Normalize email
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function normalizeEmailCrm_(email) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizeEmailCrm_(email) {
// EXPLAIN: Bu satırın görevi: if (!email) return '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!email) return '';
// EXPLAIN: Bu satırın görevi: return String(email).toLowerCase().trim();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return String(email).toLowerCase().trim();
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Normalize phone (basic digits-only). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Normalize phone (basic digits-only)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function normalizePhoneCrm_(phone) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizePhoneCrm_(phone) {
// EXPLAIN: Bu satırın görevi: if (!phone) return '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!phone) return '';
// EXPLAIN: Bu satırın görevi: return String(phone).replace(/\D/g, '');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return String(phone).replace(/\D/g, '');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Upsert contact by email (primary) or phone (fallback). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Upsert contact by email (primary) or phone (fallback)
// EXPLAIN: Bu satırın görevi: * @param {Object} contact - contact fields. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} contact - contact fields
// EXPLAIN: Bu satırın görevi: * @returns {Object} contact record. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} contact record
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function upsertContact_(contact) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function upsertContact_(contact) {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.CONTACTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.CONTACTS);
// EXPLAIN: Bu satırın görevi: if (!sheet) throw new Error('Contacts sheet missing');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) throw new Error('Contacts sheet missing');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: const headers = data[0] || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = data[0] || [];
// EXPLAIN: Bu satırın görevi: const now = new Date().toISOString();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const now = new Date().toISOString();
// EXPLAIN: Bu satırın görevi: const email = normalizeEmailCrm_(contact.email);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const email = normalizeEmailCrm_(contact.email);
// EXPLAIN: Bu satırın görevi: const phone = normalizePhoneCrm_(contact.phone);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const phone = normalizePhoneCrm_(contact.phone);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: let existingRow = null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let existingRow = null;
// EXPLAIN: Bu satırın görevi: for (let i = 1; i < data.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: Bu satırın görevi: const row = data[i];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const row = data[i];
// EXPLAIN: Bu satırın görevi: const rowEmail = normalizeEmailCrm_(row[headers.indexOf('email')]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const rowEmail = normalizeEmailCrm_(row[headers.indexOf('email')]);
// EXPLAIN: Bu satırın görevi: const rowPhone = normalizePhoneCrm_(row[headers.indexOf('phone')]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const rowPhone = normalizePhoneCrm_(row[headers.indexOf('phone')]);
// EXPLAIN: Bu satırın görevi: if (email && rowEmail === email) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (email && rowEmail === email) {
// EXPLAIN: Bu satırın görevi: existingRow = i + 1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      existingRow = i + 1;
// EXPLAIN: Bu satırın görevi: break;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      break;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: if (!email && phone && rowPhone === phone) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!email && phone && rowPhone === phone) {
// EXPLAIN: Bu satırın görevi: existingRow = i + 1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      existingRow = i + 1;
// EXPLAIN: Bu satırın görevi: break;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      break;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const record = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const record = {
// EXPLAIN: Bu satırın görevi: contact_id: contact.contact_id || generateUuid_(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    contact_id: contact.contact_id || generateUuid_(),
// EXPLAIN: Bu satırın görevi: first_name: contact.first_name || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    first_name: contact.first_name || '',
// EXPLAIN: Bu satırın görevi: last_name: contact.last_name || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    last_name: contact.last_name || '',
// EXPLAIN: Bu satırın görevi: email: email,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    email: email,
// EXPLAIN: Bu satırın görevi: phone: phone,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    phone: phone,
// EXPLAIN: Bu satırın görevi: source: contact.source || 'manual',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source: contact.source || 'manual',
// EXPLAIN: Bu satırın görevi: tags: contact.tags || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    tags: contact.tags || '',
// EXPLAIN: Bu satırın görevi: owner: contact.owner || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    owner: contact.owner || '',
// EXPLAIN: Bu satırın görevi: created_at: now,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    created_at: now,
// EXPLAIN: Bu satırın görevi: updated_at: now,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    updated_at: now,
// EXPLAIN: Bu satırın görevi: status: contact.status || 'new'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    status: contact.status || 'new'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (existingRow) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (existingRow) {
// EXPLAIN: Bu satırın görevi: record.created_at = sheet.getRange(existingRow, headers.indexOf('created_at') + 1).getValue();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    record.created_at = sheet.getRange(existingRow, headers.indexOf('created_at') + 1).getValue();
// EXPLAIN: Bu satırın görevi: record.contact_id = sheet.getRange(existingRow, headers.indexOf('contact_id') + 1).getValue();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    record.contact_id = sheet.getRange(existingRow, headers.indexOf('contact_id') + 1).getValue();
// EXPLAIN: Bu satırın görevi: sheet.getRange(existingRow, 1, 1, headers.length).setValues([headers.map(h => record[h] || '')]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sheet.getRange(existingRow, 1, 1, headers.length).setValues([headers.map(h => record[h] || '')]);
// EXPLAIN: Bu satırın görevi: logActivity_('contact', record.contact_id, 'update', { source: record.source });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    logActivity_('contact', record.contact_id, 'update', { source: record.source });
// EXPLAIN: Bu satırın görevi: } else {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } else {
// EXPLAIN: Bu satırın görevi: sheet.appendRow(headers.map(h => record[h] || ''));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: Bu satırın görevi: logActivity_('contact', record.contact_id, 'create', { source: record.source });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    logActivity_('contact', record.contact_id, 'create', { source: record.source });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return record;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return record;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Create or update opportunity by opp_id if present. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Create or update opportunity by opp_id if present
// EXPLAIN: Bu satırın görevi: * @param {Object} opp - opportunity fields. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} opp - opportunity fields
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function createOrUpdateOpportunity_(opp) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function createOrUpdateOpportunity_(opp) {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.OPPORTUNITIES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.OPPORTUNITIES);
// EXPLAIN: Bu satırın görevi: if (!sheet) throw new Error('Opportunities sheet missing');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) throw new Error('Opportunities sheet missing');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: const headers = data[0] || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = data[0] || [];
// EXPLAIN: Bu satırın görevi: const now = new Date().toISOString();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const now = new Date().toISOString();
// EXPLAIN: Bu satırın görevi: const oppId = opp.opp_id || generateUuid_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const oppId = opp.opp_id || generateUuid_();
// EXPLAIN: Bu satırın görevi: let existingRow = null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let existingRow = null;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (let i = 1; i < data.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: Bu satırın görevi: if (data[i][headers.indexOf('opp_id')] === oppId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (data[i][headers.indexOf('opp_id')] === oppId) {
// EXPLAIN: Bu satırın görevi: existingRow = i + 1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      existingRow = i + 1;
// EXPLAIN: Bu satırın görevi: break;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      break;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const record = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const record = {
// EXPLAIN: Bu satırın görevi: opp_id: oppId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    opp_id: oppId,
// EXPLAIN: Bu satırın görevi: contact_id: opp.contact_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    contact_id: opp.contact_id || '',
// EXPLAIN: Bu satırın görevi: pipeline_id: opp.pipeline_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    pipeline_id: opp.pipeline_id || '',
// EXPLAIN: Bu satırın görevi: stage_id: opp.stage_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    stage_id: opp.stage_id || '',
// EXPLAIN: Bu satırın görevi: title: opp.title || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    title: opp.title || '',
// EXPLAIN: Bu satırın görevi: value_amount: Number(opp.value_amount || 0),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    value_amount: Number(opp.value_amount || 0),
// EXPLAIN: Bu satırın görevi: currency: opp.currency || 'TRY',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    currency: opp.currency || 'TRY',
// EXPLAIN: Bu satırın görevi: probability: Number(opp.probability || 0),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    probability: Number(opp.probability || 0),
// EXPLAIN: Bu satırın görevi: status: opp.status || 'open',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    status: opp.status || 'open',
// EXPLAIN: Bu satırın görevi: expected_close_date: opp.expected_close_date || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    expected_close_date: opp.expected_close_date || '',
// EXPLAIN: Bu satırın görevi: owner: opp.owner || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    owner: opp.owner || '',
// EXPLAIN: Bu satırın görevi: created_at: now,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    created_at: now,
// EXPLAIN: Bu satırın görevi: updated_at: now. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    updated_at: now
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (existingRow) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (existingRow) {
// EXPLAIN: Bu satırın görevi: record.created_at = sheet.getRange(existingRow, headers.indexOf('created_at') + 1).getValue();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    record.created_at = sheet.getRange(existingRow, headers.indexOf('created_at') + 1).getValue();
// EXPLAIN: Bu satırın görevi: sheet.getRange(existingRow, 1, 1, headers.length).setValues([headers.map(h => record[h] || '')]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sheet.getRange(existingRow, 1, 1, headers.length).setValues([headers.map(h => record[h] || '')]);
// EXPLAIN: Bu satırın görevi: logActivity_('opportunity', record.opp_id, 'update', { stage_id: record.stage_id });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    logActivity_('opportunity', record.opp_id, 'update', { stage_id: record.stage_id });
// EXPLAIN: Bu satırın görevi: } else {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } else {
// EXPLAIN: Bu satırın görevi: sheet.appendRow(headers.map(h => record[h] || ''));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: Bu satırın görevi: logActivity_('opportunity', record.opp_id, 'create', { stage_id: record.stage_id });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    logActivity_('opportunity', record.opp_id, 'create', { stage_id: record.stage_id });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return record;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return record;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Change opportunity stage and log activity. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Change opportunity stage and log activity
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function changeOpportunityStage_(oppId, newStageId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function changeOpportunityStage_(oppId, newStageId) {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.OPPORTUNITIES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.OPPORTUNITIES);
// EXPLAIN: Bu satırın görevi: if (!sheet) throw new Error('Opportunities sheet missing');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) throw new Error('Opportunities sheet missing');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: const headers = data[0] || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = data[0] || [];
// EXPLAIN: Bu satırın görevi: const stageIdx = headers.indexOf('stage_id');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const stageIdx = headers.indexOf('stage_id');
// EXPLAIN: Bu satırın görevi: const updatedIdx = headers.indexOf('updated_at');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const updatedIdx = headers.indexOf('updated_at');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (let i = 1; i < data.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: Bu satırın görevi: if (data[i][headers.indexOf('opp_id')] === oppId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (data[i][headers.indexOf('opp_id')] === oppId) {
// EXPLAIN: Bu satırın görevi: sheet.getRange(i + 1, stageIdx + 1).setValue(newStageId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet.getRange(i + 1, stageIdx + 1).setValue(newStageId);
// EXPLAIN: Bu satırın görevi: sheet.getRange(i + 1, updatedIdx + 1).setValue(new Date().toISOString());. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet.getRange(i + 1, updatedIdx + 1).setValue(new Date().toISOString());
// EXPLAIN: Bu satırın görevi: logActivity_('opportunity', oppId, 'stage_change', { stage_id: newStageId });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      logActivity_('opportunity', oppId, 'stage_change', { stage_id: newStageId });
// EXPLAIN: Bu satırın görevi: return true;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return true;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return false;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Append activity log. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Append activity log
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function logActivity_(entityType, entityId, action, details) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function logActivity_(entityType, entityId, action, details) {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.ACTIVITY_LOG);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.ACTIVITY_LOG);
// EXPLAIN: Bu satırın görevi: if (!sheet) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) return;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const headers = sheet.getDataRange().getValues()[0] || CRM_HEADERS.ActivityLog;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = sheet.getDataRange().getValues()[0] || CRM_HEADERS.ActivityLog;
// EXPLAIN: Bu satırın görevi: const actor = Session.getActiveUser().getEmail() || 'system';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const actor = Session.getActiveUser().getEmail() || 'system';
// EXPLAIN: Bu satırın görevi: const record = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const record = {
// EXPLAIN: Bu satırın görevi: log_id: generateUuid_(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    log_id: generateUuid_(),
// EXPLAIN: Bu satırın görevi: ts: new Date().toISOString(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ts: new Date().toISOString(),
// EXPLAIN: Bu satırın görevi: entity_type: entityType,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: entityType,
// EXPLAIN: Bu satırın görevi: entity_id: entityId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: entityId,
// EXPLAIN: Bu satırın görevi: action: action,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    action: action,
// EXPLAIN: Bu satırın görevi: details_json: JSON.stringify(details || {}),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    details_json: JSON.stringify(details || {}),
// EXPLAIN: Bu satırın görevi: actor: actor. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    actor: actor
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: sheet.appendRow(headers.map(h => record[h] || ''));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * onEdit trigger for Opportunities stage/status updates. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * onEdit trigger for Opportunities stage/status updates
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function onEdit(e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function onEdit(e) {
// EXPLAIN: Bu satırın görevi: const range = e.range;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const range = e.range;
// EXPLAIN: Bu satırın görevi: const sheet = range.getSheet();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = range.getSheet();
// EXPLAIN: Bu satırın görevi: if (sheet.getName() !== CRM_SHEETS.OPPORTUNITIES) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (sheet.getName() !== CRM_SHEETS.OPPORTUNITIES) return;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
// EXPLAIN: Bu satırın görevi: const row = range.getRow();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const row = range.getRow();
// EXPLAIN: Bu satırın görevi: if (row === 1) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (row === 1) return;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const colName = headers[range.getColumn() - 1];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const colName = headers[range.getColumn() - 1];
// EXPLAIN: Bu satırın görevi: const oppId = sheet.getRange(row, headers.indexOf('opp_id') + 1).getValue();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const oppId = sheet.getRange(row, headers.indexOf('opp_id') + 1).getValue();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (colName === 'stage_id') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (colName === 'stage_id') {
// EXPLAIN: Bu satırın görevi: logActivity_('opportunity', oppId, 'stage_change', { stage_id: range.getValue() });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    logActivity_('opportunity', oppId, 'stage_change', { stage_id: range.getValue() });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (colName === 'status') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (colName === 'status') {
// EXPLAIN: Bu satırın görevi: logActivity_('opportunity', oppId, 'update', { status: range.getValue() });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    logActivity_('opportunity', oppId, 'update', { status: range.getValue() });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Generate basic stage report (open opp count + total value). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Generate basic stage report (open opp count + total value)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function refreshCrmReport_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function refreshCrmReport_() {
// EXPLAIN: Bu satırın görevi: const ss = SpreadsheetApp.getActiveSpreadsheet();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const ss = SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: Bu satırın görevi: const reportSheet = ss.getSheetByName(CRM_SHEETS.REPORTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const reportSheet = ss.getSheetByName(CRM_SHEETS.REPORTS);
// EXPLAIN: Bu satırın görevi: const stagesSheet = ss.getSheetByName(CRM_SHEETS.STAGES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const stagesSheet = ss.getSheetByName(CRM_SHEETS.STAGES);
// EXPLAIN: Bu satırın görevi: const pipelinesSheet = ss.getSheetByName(CRM_SHEETS.PIPELINES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const pipelinesSheet = ss.getSheetByName(CRM_SHEETS.PIPELINES);
// EXPLAIN: Bu satırın görevi: const oppSheet = ss.getSheetByName(CRM_SHEETS.OPPORTUNITIES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const oppSheet = ss.getSheetByName(CRM_SHEETS.OPPORTUNITIES);
// EXPLAIN: Bu satırın görevi: if (!reportSheet || !stagesSheet || !pipelinesSheet || !oppSheet) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!reportSheet || !stagesSheet || !pipelinesSheet || !oppSheet) return;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const stages = stagesSheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const stages = stagesSheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: const pipelines = pipelinesSheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const pipelines = pipelinesSheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: const opps = oppSheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const opps = oppSheet.getDataRange().getValues();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const stageHeaders = stages[0] || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const stageHeaders = stages[0] || [];
// EXPLAIN: Bu satırın görevi: const oppHeaders = opps[0] || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const oppHeaders = opps[0] || [];
// EXPLAIN: Bu satırın görevi: const pipelineHeaders = pipelines[0] || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const pipelineHeaders = pipelines[0] || [];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const pipelineMap = {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const pipelineMap = {};
// EXPLAIN: Bu satırın görevi: for (let i = 1; i < pipelines.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = 1; i < pipelines.length; i++) {
// EXPLAIN: Bu satırın görevi: pipelineMap[pipelines[i][pipelineHeaders.indexOf('pipeline_id')]] = pipelines[i][pipelineHeaders.indexOf('pipeline_name')];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    pipelineMap[pipelines[i][pipelineHeaders.indexOf('pipeline_id')]] = pipelines[i][pipelineHeaders.indexOf('pipeline_name')];
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const reportRows = [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const reportRows = [];
// EXPLAIN: Bu satırın görevi: for (let i = 1; i < stages.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = 1; i < stages.length; i++) {
// EXPLAIN: Bu satırın görevi: const stageId = stages[i][stageHeaders.indexOf('stage_id')];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const stageId = stages[i][stageHeaders.indexOf('stage_id')];
// EXPLAIN: Bu satırın görevi: const stageName = stages[i][stageHeaders.indexOf('stage_name')];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const stageName = stages[i][stageHeaders.indexOf('stage_name')];
// EXPLAIN: Bu satırın görevi: const pipelineId = stages[i][stageHeaders.indexOf('pipeline_id')];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const pipelineId = stages[i][stageHeaders.indexOf('pipeline_id')];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: let count = 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    let count = 0;
// EXPLAIN: Bu satırın görevi: let total = 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    let total = 0;
// EXPLAIN: Bu satırın görevi: for (let j = 1; j < opps.length; j++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    for (let j = 1; j < opps.length; j++) {
// EXPLAIN: Bu satırın görevi: if (opps[j][oppHeaders.indexOf('stage_id')] === stageId &&. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (opps[j][oppHeaders.indexOf('stage_id')] === stageId &&
// EXPLAIN: Bu satırın görevi: opps[j][oppHeaders.indexOf('status')] === 'open') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          opps[j][oppHeaders.indexOf('status')] === 'open') {
// EXPLAIN: Bu satırın görevi: count++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        count++;
// EXPLAIN: Bu satırın görevi: total += Number(opps[j][oppHeaders.indexOf('value_amount')] || 0);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        total += Number(opps[j][oppHeaders.indexOf('value_amount')] || 0);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: reportRows.push([stageName, count, total, pipelineMap[pipelineId] || '']);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    reportRows.push([stageName, count, total, pipelineMap[pipelineId] || '']);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: reportSheet.getRange(2, 1, reportSheet.getMaxRows(), 4).clearContent();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  reportSheet.getRange(2, 1, reportSheet.getMaxRows(), 4).clearContent();
// EXPLAIN: Bu satırın görevi: if (reportRows.length > 0) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (reportRows.length > 0) {
// EXPLAIN: Bu satırın görevi: reportSheet.getRange(2, 1, reportRows.length, 4).setValues(reportRows);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    reportSheet.getRange(2, 1, reportRows.length, 4).setValues(reportRows);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Seed sample data for testing. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Seed sample data for testing
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function seedCrmSampleData_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function seedCrmSampleData_() {
// EXPLAIN: Bu satırın görevi: const pipelineId = generateUuid_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const pipelineId = generateUuid_();
// EXPLAIN: Bu satırın görevi: const stageIds = [generateUuid_(), generateUuid_(), generateUuid_()];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const stageIds = [generateUuid_(), generateUuid_(), generateUuid_()];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const pipelineSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.PIPELINES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const pipelineSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.PIPELINES);
// EXPLAIN: Bu satırın görevi: const stagesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.STAGES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const stagesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CRM_SHEETS.STAGES);
// EXPLAIN: Bu satırın görevi: if (!pipelineSheet || !stagesSheet) throw new Error('Missing pipeline/stages sheets');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!pipelineSheet || !stagesSheet) throw new Error('Missing pipeline/stages sheets');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: pipelineSheet.appendRow([pipelineId, 'Default Pipeline', JSON.stringify(['New', 'Qualified', 'Won'])]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  pipelineSheet.appendRow([pipelineId, 'Default Pipeline', JSON.stringify(['New', 'Qualified', 'Won'])]);
// EXPLAIN: Bu satırın görevi: stagesSheet.appendRow([stageIds[0], pipelineId, 'New', 1]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  stagesSheet.appendRow([stageIds[0], pipelineId, 'New', 1]);
// EXPLAIN: Bu satırın görevi: stagesSheet.appendRow([stageIds[1], pipelineId, 'Qualified', 2]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  stagesSheet.appendRow([stageIds[1], pipelineId, 'Qualified', 2]);
// EXPLAIN: Bu satırın görevi: stagesSheet.appendRow([stageIds[2], pipelineId, 'Won', 3]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  stagesSheet.appendRow([stageIds[2], pipelineId, 'Won', 3]);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const contact = upsertContact_({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const contact = upsertContact_({
// EXPLAIN: Bu satırın görevi: first_name: 'Ayşe',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    first_name: 'Ayşe',
// EXPLAIN: Bu satırın görevi: last_name: 'Yılmaz',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    last_name: 'Yılmaz',
// EXPLAIN: Bu satırın görevi: email: 'ayse@example.com',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    email: 'ayse@example.com',
// EXPLAIN: Bu satırın görevi: phone: '+90 555 000 0000',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    phone: '+90 555 000 0000',
// EXPLAIN: Bu satırın görevi: source: 'form'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source: 'form'
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: createOrUpdateOpportunity_({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  createOrUpdateOpportunity_({
// EXPLAIN: Bu satırın görevi: contact_id: contact.contact_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    contact_id: contact.contact_id,
// EXPLAIN: Bu satırın görevi: pipeline_id: pipelineId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    pipeline_id: pipelineId,
// EXPLAIN: Bu satırın görevi: stage_id: stageIds[0],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    stage_id: stageIds[0],
// EXPLAIN: Bu satırın görevi: title: 'Kadıköy Daire',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    title: 'Kadıköy Daire',
// EXPLAIN: Bu satırın görevi: value_amount: 2500000,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    value_amount: 2500000,
// EXPLAIN: Bu satırın görevi: probability: 20,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    probability: 20,
// EXPLAIN: Bu satırın görevi: owner: 'agent@example.com'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    owner: 'agent@example.com'
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: refreshCrmReport_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  refreshCrmReport_();
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
