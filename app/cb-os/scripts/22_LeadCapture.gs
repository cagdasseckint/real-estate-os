// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS Lead Capture (Forms -> Sheets -> CRM). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS Lead Capture (Forms -> Sheets -> CRM)
// EXPLAIN: Bu satırın görevi: * Upserts Contacts, assigns owner (round-robin), creates Opportunity, sends welcome email.. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Upserts Contacts, assigns owner (round-robin), creates Opportunity, sends welcome email.
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: const LEAD_SHEETS = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const LEAD_SHEETS = {
// EXPLAIN: Bu satırın görevi: CONTACTS: 'Contacts',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  CONTACTS: 'Contacts',
// EXPLAIN: Bu satırın görevi: OPPORTUNITIES: 'Opportunities',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  OPPORTUNITIES: 'Opportunities',
// EXPLAIN: Bu satırın görevi: ACTIVITY_LOG: 'ActivityLog',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ACTIVITY_LOG: 'ActivityLog',
// EXPLAIN: Bu satırın görevi: OWNERS: 'Owners'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  OWNERS: 'Owners'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: const LEAD_OWNER_HEADERS = ['owner_email', 'is_active', 'last_assigned_at'];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const LEAD_OWNER_HEADERS = ['owner_email', 'is_active', 'last_assigned_at'];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Bootstrap Owners sheet. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Bootstrap Owners sheet
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function bootstrapLeadOwnersSheet_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function bootstrapLeadOwnersSheet_() {
// EXPLAIN: Bu satırın görevi: const ss = SpreadsheetApp.getActiveSpreadsheet();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const ss = SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: Bu satırın görevi: let sheet = ss.getSheetByName(LEAD_SHEETS.OWNERS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let sheet = ss.getSheetByName(LEAD_SHEETS.OWNERS);
// EXPLAIN: Bu satırın görevi: if (!sheet) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) {
// EXPLAIN: Bu satırın görevi: sheet = ss.insertSheet(LEAD_SHEETS.OWNERS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sheet = ss.insertSheet(LEAD_SHEETS.OWNERS);
// EXPLAIN: Bu satırın görevi: sheet.getRange(1, 1, 1, LEAD_OWNER_HEADERS.length).setValues([LEAD_OWNER_HEADERS]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sheet.getRange(1, 1, 1, LEAD_OWNER_HEADERS.length).setValues([LEAD_OWNER_HEADERS]);
// EXPLAIN: Bu satırın görevi: sheet.getRange(1, 1, 1, LEAD_OWNER_HEADERS.length).setFontWeight('bold');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sheet.getRange(1, 1, 1, LEAD_OWNER_HEADERS.length).setFontWeight('bold');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Form submit handler for lead capture. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Form submit handler for lead capture
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function leadOnFormSubmit(e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function leadOnFormSubmit(e) {
// EXPLAIN: Bu satırın görevi: const payload = normalizeLeadPayload_(e);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const payload = normalizeLeadPayload_(e);
// EXPLAIN: Bu satırın görevi: const ownerEmail = selectOwnerRoundRobin_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const ownerEmail = selectOwnerRoundRobin_();
// EXPLAIN: Bu satırın görevi: const contactResult = upsertContactLead_(payload, ownerEmail);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const contactResult = upsertContactLead_(payload, ownerEmail);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (contactResult.is_new) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (contactResult.is_new) {
// EXPLAIN: Bu satırın görevi: sendWelcomeEmail_(payload, ownerEmail);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sendWelcomeEmail_(payload, ownerEmail);
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    try {
// EXPLAIN: Bu satırın görevi: if (typeof provisionClientFilesForContact_ === 'function') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (typeof provisionClientFilesForContact_ === 'function') {
// EXPLAIN: Bu satırın görevi: provisionClientFilesForContact_(contactResult.contact_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        provisionClientFilesForContact_(contactResult.contact_id);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } catch (e) {
// EXPLAIN: Bu satırın görevi: logLeadActivity_('contact', contactResult.contact_id, 'update', { error: e.message });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      logLeadActivity_('contact', contactResult.contact_id, 'update', { error: e.message });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const opp = createOpportunityForLead_(payload, contactResult.contact_id, ownerEmail);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const opp = createOpportunityForLead_(payload, contactResult.contact_id, ownerEmail);
// EXPLAIN: Bu satırın görevi: logLeadActivity_('opportunity', opp.opp_id, 'create', {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  logLeadActivity_('opportunity', opp.opp_id, 'create', {
// EXPLAIN: Bu satırın görevi: owner: ownerEmail,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    owner: ownerEmail,
// EXPLAIN: Bu satırın görevi: source: payload.source. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source: payload.source
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function normalizeLeadPayload_(e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizeLeadPayload_(e) {
// EXPLAIN: Bu satırın görevi: const named = e && e.namedValues ? e.namedValues : {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const named = e && e.namedValues ? e.namedValues : {};
// EXPLAIN: Bu satırın görevi: const getValue = key => (named[key] && named[key][0]) ? String(named[key][0]).trim() : '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const getValue = key => (named[key] && named[key][0]) ? String(named[key][0]).trim() : '';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return {
// EXPLAIN: Bu satırın görevi: first_name: getValue('Ad'),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    first_name: getValue('Ad'),
// EXPLAIN: Bu satırın görevi: last_name: getValue('Soyad'),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    last_name: getValue('Soyad'),
// EXPLAIN: Bu satırın görevi: email: normalizeEmailLead_(getValue('Email')),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    email: normalizeEmailLead_(getValue('Email')),
// EXPLAIN: Bu satırın görevi: phone: normalizePhoneLead_(getValue('Telefon')),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    phone: normalizePhoneLead_(getValue('Telefon')),
// EXPLAIN: Bu satırın görevi: source: getValue('Kaynak'),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source: getValue('Kaynak'),
// EXPLAIN: Bu satırın görevi: service: getValue('İlgilendiği hizmet'),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    service: getValue('İlgilendiği hizmet'),
// EXPLAIN: Bu satırın görevi: budget: getValue('Bütçe aralığı'),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    budget: getValue('Bütçe aralığı'),
// EXPLAIN: Bu satırın görevi: notes: getValue('Not'). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    notes: getValue('Not')
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function normalizeEmailLead_(email) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizeEmailLead_(email) {
// EXPLAIN: Bu satırın görevi: if (!email) return '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!email) return '';
// EXPLAIN: Bu satırın görevi: return String(email).toLowerCase().trim();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return String(email).toLowerCase().trim();
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function normalizePhoneLead_(phone) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function normalizePhoneLead_(phone) {
// EXPLAIN: Bu satırın görevi: if (!phone) return '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!phone) return '';
// EXPLAIN: Bu satırın görevi: return String(phone).replace(/\D/g, '');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return String(phone).replace(/\D/g, '');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function buildLeadTags_(payload) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function buildLeadTags_(payload) {
// EXPLAIN: Bu satırın görevi: const tags = [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const tags = [];
// EXPLAIN: Bu satırın görevi: if (payload.source) tags.push('source:' + payload.source);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (payload.source) tags.push('source:' + payload.source);
// EXPLAIN: Bu satırın görevi: if (payload.service) tags.push('service:' + payload.service);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (payload.service) tags.push('service:' + payload.service);
// EXPLAIN: Bu satırın görevi: if (payload.budget) tags.push('budget:' + payload.budget);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (payload.budget) tags.push('budget:' + payload.budget);
// EXPLAIN: Bu satırın görevi: return tags.join(',');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return tags.join(',');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Upsert contact in Contacts sheet. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Upsert contact in Contacts sheet
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function upsertContactLead_(payload, ownerEmail) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function upsertContactLead_(payload, ownerEmail) {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.CONTACTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.CONTACTS);
// EXPLAIN: Bu satırın görevi: if (!sheet) throw new Error('Contacts sheet missing');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) throw new Error('Contacts sheet missing');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: const headers = data[0] || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = data[0] || [];
// EXPLAIN: Bu satırın görevi: const now = new Date().toISOString();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const now = new Date().toISOString();
// EXPLAIN: Bu satırın görevi: let existingRow = null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let existingRow = null;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (let i = 1; i < data.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: Bu satırın görevi: const rowEmail = normalizeEmailLead_(data[i][headers.indexOf('email')]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const rowEmail = normalizeEmailLead_(data[i][headers.indexOf('email')]);
// EXPLAIN: Bu satırın görevi: const rowPhone = normalizePhoneLead_(data[i][headers.indexOf('phone')]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const rowPhone = normalizePhoneLead_(data[i][headers.indexOf('phone')]);
// EXPLAIN: Bu satırın görevi: if (payload.email && rowEmail === payload.email) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (payload.email && rowEmail === payload.email) {
// EXPLAIN: Bu satırın görevi: existingRow = i + 1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      existingRow = i + 1;
// EXPLAIN: Bu satırın görevi: break;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      break;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: if (!payload.email && payload.phone && rowPhone === payload.phone) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!payload.email && payload.phone && rowPhone === payload.phone) {
// EXPLAIN: Bu satırın görevi: existingRow = i + 1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      existingRow = i + 1;
// EXPLAIN: Bu satırın görevi: break;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      break;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const tags = buildLeadTags_(payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const tags = buildLeadTags_(payload);
// EXPLAIN: Bu satırın görevi: const record = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const record = {
// EXPLAIN: Bu satırın görevi: contact_id: existingRow ? data[existingRow - 1][headers.indexOf('contact_id')] : Utilities.getUuid(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    contact_id: existingRow ? data[existingRow - 1][headers.indexOf('contact_id')] : Utilities.getUuid(),
// EXPLAIN: Bu satırın görevi: first_name: payload.first_name,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    first_name: payload.first_name,
// EXPLAIN: Bu satırın görevi: last_name: payload.last_name,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    last_name: payload.last_name,
// EXPLAIN: Bu satırın görevi: email: payload.email,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    email: payload.email,
// EXPLAIN: Bu satırın görevi: phone: payload.phone,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    phone: payload.phone,
// EXPLAIN: Bu satırın görevi: source: payload.source || 'form',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source: payload.source || 'form',
// EXPLAIN: Bu satırın görevi: tags: tags,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    tags: tags,
// EXPLAIN: Bu satırın görevi: owner: ownerEmail,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    owner: ownerEmail,
// EXPLAIN: Bu satırın görevi: created_at: existingRow ? data[existingRow - 1][headers.indexOf('created_at')] : now,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    created_at: existingRow ? data[existingRow - 1][headers.indexOf('created_at')] : now,
// EXPLAIN: Bu satırın görevi: updated_at: now,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    updated_at: now,
// EXPLAIN: Bu satırın görevi: status: 'new'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    status: 'new'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (existingRow) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (existingRow) {
// EXPLAIN: Bu satırın görevi: sheet.getRange(existingRow, 1, 1, headers.length).setValues([headers.map(h => record[h] || '')]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sheet.getRange(existingRow, 1, 1, headers.length).setValues([headers.map(h => record[h] || '')]);
// EXPLAIN: Bu satırın görevi: logLeadActivity_('contact', record.contact_id, 'update', { owner: ownerEmail });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    logLeadActivity_('contact', record.contact_id, 'update', { owner: ownerEmail });
// EXPLAIN: Bu satırın görevi: return { contact_id: record.contact_id, is_new: false };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { contact_id: record.contact_id, is_new: false };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: sheet.appendRow(headers.map(h => record[h] || ''));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: Bu satırın görevi: logLeadActivity_('contact', record.contact_id, 'create', { owner: ownerEmail });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  logLeadActivity_('contact', record.contact_id, 'create', { owner: ownerEmail });
// EXPLAIN: Bu satırın görevi: return { contact_id: record.contact_id, is_new: true };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { contact_id: record.contact_id, is_new: true };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Owner round-robin selection. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Owner round-robin selection
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function selectOwnerRoundRobin_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function selectOwnerRoundRobin_() {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.OWNERS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.OWNERS);
// EXPLAIN: Bu satırın görevi: if (!sheet) throw new Error('Owners sheet missing');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) throw new Error('Owners sheet missing');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: const headers = data[0] || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = data[0] || [];
// EXPLAIN: Bu satırın görevi: if (data.length < 2) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (data.length < 2) {
// EXPLAIN: Bu satırın görevi: const fallback = Session.getActiveUser().getEmail() || 'unassigned';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const fallback = Session.getActiveUser().getEmail() || 'unassigned';
// EXPLAIN: Bu satırın görevi: return fallback;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return fallback;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const activeOwners = data.slice(1).filter(row => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const activeOwners = data.slice(1).filter(row => {
// EXPLAIN: Bu satırın görevi: const isActive = String(row[headers.indexOf('is_active')]).toLowerCase() === 'true';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const isActive = String(row[headers.indexOf('is_active')]).toLowerCase() === 'true';
// EXPLAIN: Bu satırın görevi: return isActive;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return isActive;
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (activeOwners.length === 0) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (activeOwners.length === 0) {
// EXPLAIN: Bu satırın görevi: return Session.getActiveUser().getEmail() || 'unassigned';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return Session.getActiveUser().getEmail() || 'unassigned';
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: let selected = activeOwners[0];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let selected = activeOwners[0];
// EXPLAIN: Bu satırın görevi: for (const owner of activeOwners) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const owner of activeOwners) {
// EXPLAIN: Bu satırın görevi: const lastAssigned = owner[headers.indexOf('last_assigned_at')] || '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const lastAssigned = owner[headers.indexOf('last_assigned_at')] || '';
// EXPLAIN: Bu satırın görevi: const selectedLast = selected[headers.indexOf('last_assigned_at')] || '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const selectedLast = selected[headers.indexOf('last_assigned_at')] || '';
// EXPLAIN: Bu satırın görevi: if (!selectedLast || (lastAssigned && lastAssigned < selectedLast)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!selectedLast || (lastAssigned && lastAssigned < selectedLast)) {
// EXPLAIN: Bu satırın görevi: selected = owner;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      selected = owner;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const ownerEmail = selected[headers.indexOf('owner_email')];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const ownerEmail = selected[headers.indexOf('owner_email')];
// EXPLAIN: Bu satırın görevi: const rowIndex = data.indexOf(selected) + 1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const rowIndex = data.indexOf(selected) + 1;
// EXPLAIN: Bu satırın görevi: sheet.getRange(rowIndex, headers.indexOf('last_assigned_at') + 1).setValue(new Date().toISOString());. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.getRange(rowIndex, headers.indexOf('last_assigned_at') + 1).setValue(new Date().toISOString());
// EXPLAIN: Bu satırın görevi: return ownerEmail;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return ownerEmail;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Create Opportunity in Opportunities sheet. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Create Opportunity in Opportunities sheet
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function createOpportunityForLead_(payload, contactId, ownerEmail) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function createOpportunityForLead_(payload, contactId, ownerEmail) {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.OPPORTUNITIES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.OPPORTUNITIES);
// EXPLAIN: Bu satırın görevi: if (!sheet) throw new Error('Opportunities sheet missing');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) throw new Error('Opportunities sheet missing');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: const headers = data[0] || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = data[0] || [];
// EXPLAIN: Bu satırın görevi: const now = new Date().toISOString();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const now = new Date().toISOString();
// EXPLAIN: Bu satırın görevi: const title = payload.first_name + ' ' + payload.last_name + ' - ' + payload.service;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const title = payload.first_name + ' ' + payload.last_name + ' - ' + payload.service;
// EXPLAIN: Bu satırın görevi: const stageInfo = getDefaultPipelineStage_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const stageInfo = getDefaultPipelineStage_();
// EXPLAIN: Bu satırın görevi: const record = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const record = {
// EXPLAIN: Bu satırın görevi: opp_id: Utilities.getUuid(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    opp_id: Utilities.getUuid(),
// EXPLAIN: Bu satırın görevi: contact_id: contactId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    contact_id: contactId,
// EXPLAIN: Bu satırın görevi: pipeline_id: stageInfo.pipeline_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    pipeline_id: stageInfo.pipeline_id,
// EXPLAIN: Bu satırın görevi: stage_id: stageInfo.stage_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    stage_id: stageInfo.stage_id,
// EXPLAIN: Bu satırın görevi: title: title.trim(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    title: title.trim(),
// EXPLAIN: Bu satırın görevi: value_amount: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    value_amount: 0,
// EXPLAIN: Bu satırın görevi: currency: 'TRY',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    currency: 'TRY',
// EXPLAIN: Bu satırın görevi: probability: 10,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    probability: 10,
// EXPLAIN: Bu satırın görevi: status: 'open',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    status: 'open',
// EXPLAIN: Bu satırın görevi: expected_close_date: '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    expected_close_date: '',
// EXPLAIN: Bu satırın görevi: owner: ownerEmail,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    owner: ownerEmail,
// EXPLAIN: Bu satırın görevi: created_at: now,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    created_at: now,
// EXPLAIN: Bu satırın görevi: updated_at: now. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    updated_at: now
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: sheet.appendRow(headers.map(h => record[h] || ''));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: Bu satırın görevi: return record;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return record;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function getDefaultPipelineStage_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function getDefaultPipelineStage_() {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Stages');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Stages');
// EXPLAIN: Bu satırın görevi: if (!sheet) return { pipeline_id: '', stage_id: 'NEW_LEAD' };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) return { pipeline_id: '', stage_id: 'NEW_LEAD' };
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: const headers = data[0] || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = data[0] || [];
// EXPLAIN: Bu satırın görevi: let selected = null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let selected = null;
// EXPLAIN: Bu satırın görevi: for (let i = 1; i < data.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: Bu satırın görevi: const order = Number(data[i][headers.indexOf('stage_order')] || 0);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const order = Number(data[i][headers.indexOf('stage_order')] || 0);
// EXPLAIN: Bu satırın görevi: if (!selected || order < selected.order) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!selected || order < selected.order) {
// EXPLAIN: Bu satırın görevi: selected = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      selected = {
// EXPLAIN: Bu satırın görevi: stage_id: data[i][headers.indexOf('stage_id')],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        stage_id: data[i][headers.indexOf('stage_id')],
// EXPLAIN: Bu satırın görevi: pipeline_id: data[i][headers.indexOf('pipeline_id')],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        pipeline_id: data[i][headers.indexOf('pipeline_id')],
// EXPLAIN: Bu satırın görevi: order: order. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        order: order
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: return selected ? { pipeline_id: selected.pipeline_id, stage_id: selected.stage_id } : { pipeline_id: '', stage_id: 'NEW_LEAD' };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return selected ? { pipeline_id: selected.pipeline_id, stage_id: selected.stage_id } : { pipeline_id: '', stage_id: 'NEW_LEAD' };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Welcome email for new leads. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Welcome email for new leads
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function sendWelcomeEmail_(payload, ownerEmail) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function sendWelcomeEmail_(payload, ownerEmail) {
// EXPLAIN: Bu satırın görevi: const subject = 'Hoş geldiniz - Talebiniz alındı';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const subject = 'Hoş geldiniz - Talebiniz alındı';
// EXPLAIN: Bu satırın görevi: const body = [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const body = [
// EXPLAIN: Bu satırın görevi: 'Merhaba ' + payload.first_name + ',',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Merhaba ' + payload.first_name + ',',
// EXPLAIN: Bu satırın görevi: 'Talebinizi aldık. En kısa sürede sizinle iletişime geçeceğiz.',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Talebinizi aldık. En kısa sürede sizinle iletişime geçeceğiz.',
// EXPLAIN: Bu satırın görevi: 'Hizmet: ' + payload.service,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Hizmet: ' + payload.service,
// EXPLAIN: Bu satırın görevi: 'Sorumlu: ' + ownerEmail. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Sorumlu: ' + ownerEmail
// EXPLAIN: Bu satırın görevi: ].join('\n');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ].join('\n');
// EXPLAIN: Bu satırın görevi: GmailApp.sendEmail(payload.email, subject, body);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  GmailApp.sendEmail(payload.email, subject, body);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Activity log writer. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Activity log writer
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function logLeadActivity_(entityType, entityId, action, details) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function logLeadActivity_(entityType, entityId, action, details) {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.ACTIVITY_LOG);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LEAD_SHEETS.ACTIVITY_LOG);
// EXPLAIN: Bu satırın görevi: if (!sheet) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) return;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const headers = sheet.getDataRange().getValues()[0];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = sheet.getDataRange().getValues()[0];
// EXPLAIN: Bu satırın görevi: const record = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const record = {
// EXPLAIN: Bu satırın görevi: log_id: Utilities.getUuid(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    log_id: Utilities.getUuid(),
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
// EXPLAIN: Bu satırın görevi: actor: 'system'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    actor: 'system'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: sheet.appendRow(headers.map(h => record[h] || ''));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
