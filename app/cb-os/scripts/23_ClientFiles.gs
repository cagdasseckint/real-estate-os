// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS Client Files Provisioning (Drive + Docs + Tasks + Sheets). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS Client Files Provisioning (Drive + Docs + Tasks + Sheets)
// EXPLAIN: Bu satırın görevi: * Creates client folder, summary doc, onboarding tasks, and logs to ActivityLog.. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Creates client folder, summary doc, onboarding tasks, and logs to ActivityLog.
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: const CLIENT_SHEETS = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const CLIENT_SHEETS = {
// EXPLAIN: Bu satırın görevi: CONTACTS: 'Contacts',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  CONTACTS: 'Contacts',
// EXPLAIN: Bu satırın görevi: CLIENT_FILES: 'ClientFiles',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  CLIENT_FILES: 'ClientFiles',
// EXPLAIN: Bu satırın görevi: DOC_TEMPLATES: 'DocTemplates',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DOC_TEMPLATES: 'DocTemplates',
// EXPLAIN: Bu satırın görevi: TASK_TEMPLATES: 'TaskTemplates',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  TASK_TEMPLATES: 'TaskTemplates',
// EXPLAIN: Bu satırın görevi: ACTIVITY_LOG: 'ActivityLog'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ACTIVITY_LOG: 'ActivityLog'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: const CLIENT_HEADERS = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const CLIENT_HEADERS = {
// EXPLAIN: Bu satırın görevi: ClientFiles: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ClientFiles: [
// EXPLAIN: Bu satırın görevi: 'contact_id', 'drive_folder_id', 'drive_folder_url',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'contact_id', 'drive_folder_id', 'drive_folder_url',
// EXPLAIN: Bu satırın görevi: 'summary_doc_id', 'summary_doc_url', 'created_at'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'summary_doc_id', 'summary_doc_url', 'created_at'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satırın görevi: DocTemplates: ['template_name', 'template_doc_id', 'output_filename_template'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  DocTemplates: ['template_name', 'template_doc_id', 'output_filename_template'],
// EXPLAIN: Bu satırın görevi: TaskTemplates: ['template_name', 'tasks_json']. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  TaskTemplates: ['template_name', 'tasks_json']
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Bootstrap ClientFiles, DocTemplates, TaskTemplates sheets. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Bootstrap ClientFiles, DocTemplates, TaskTemplates sheets
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function bootstrapClientFilesSheets_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function bootstrapClientFilesSheets_() {
// EXPLAIN: Bu satırın görevi: const ss = SpreadsheetApp.getActiveSpreadsheet();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const ss = SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: Bu satırın görevi: Object.keys(CLIENT_HEADERS).forEach(name => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Object.keys(CLIENT_HEADERS).forEach(name => {
// EXPLAIN: Bu satırın görevi: let sheet = ss.getSheetByName(name);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    let sheet = ss.getSheetByName(name);
// EXPLAIN: Bu satırın görevi: if (!sheet) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!sheet) {
// EXPLAIN: Bu satırın görevi: sheet = ss.insertSheet(name);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet = ss.insertSheet(name);
// EXPLAIN: Bu satırın görevi: sheet.getRange(1, 1, 1, CLIENT_HEADERS[name].length).setValues([CLIENT_HEADERS[name]]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet.getRange(1, 1, 1, CLIENT_HEADERS[name].length).setValues([CLIENT_HEADERS[name]]);
// EXPLAIN: Bu satırın görevi: sheet.getRange(1, 1, 1, CLIENT_HEADERS[name].length).setFontWeight('bold');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet.getRange(1, 1, 1, CLIENT_HEADERS[name].length).setFontWeight('bold');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Main provisioning entry point (idempotent by contact_id). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Main provisioning entry point (idempotent by contact_id)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function provisionClientFilesForContact_(contactId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function provisionClientFilesForContact_(contactId) {
// EXPLAIN: Bu satırın görevi: const contact = getContactById_(contactId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const contact = getContactById_(contactId);
// EXPLAIN: Bu satırın görevi: if (!contact) throw new Error('Contact not found: ' + contactId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!contact) throw new Error('Contact not found: ' + contactId);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (clientFilesExists_(contactId)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (clientFilesExists_(contactId)) {
// EXPLAIN: Bu satırın görevi: return { skipped: true, reason: 'ClientFiles exists' };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { skipped: true, reason: 'ClientFiles exists' };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const folder = createClientFolder_(contact);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const folder = createClientFolder_(contact);
// EXPLAIN: Bu satırın görevi: const docInfo = createSummaryDoc_(contact, folder);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const docInfo = createSummaryDoc_(contact, folder);
// EXPLAIN: Bu satırın görevi: createOnboardingTasks_(contact);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  createOnboardingTasks_(contact);
// EXPLAIN: Bu satırın görevi: writeClientFilesRow_(contact.contact_id, folder, docInfo);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  writeClientFilesRow_(contact.contact_id, folder, docInfo);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: logClientActivity_('contact', contact.contact_id, 'create', {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  logClientActivity_('contact', contact.contact_id, 'create', {
// EXPLAIN: Bu satırın görevi: drive_folder_id: folder.getId(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    drive_folder_id: folder.getId(),
// EXPLAIN: Bu satırın görevi: summary_doc_id: docInfo.docId. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    summary_doc_id: docInfo.docId
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return { created: true, folder_id: folder.getId(), doc_id: docInfo.docId };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { created: true, folder_id: folder.getId(), doc_id: docInfo.docId };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function getContactById_(contactId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function getContactById_(contactId) {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.CONTACTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.CONTACTS);
// EXPLAIN: Bu satırın görevi: if (!sheet) throw new Error('Contacts sheet missing');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) throw new Error('Contacts sheet missing');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: const headers = data[0] || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = data[0] || [];
// EXPLAIN: Bu satırın görevi: for (let i = 1; i < data.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: Bu satırın görevi: if (data[i][headers.indexOf('contact_id')] === contactId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (data[i][headers.indexOf('contact_id')] === contactId) {
// EXPLAIN: Bu satırın görevi: const row = {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const row = {};
// EXPLAIN: Bu satırın görevi: headers.forEach((h, idx) => { row[h] = data[i][idx]; });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      headers.forEach((h, idx) => { row[h] = data[i][idx]; });
// EXPLAIN: Bu satırın görevi: return row;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return row;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: return null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return null;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function clientFilesExists_(contactId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function clientFilesExists_(contactId) {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.CLIENT_FILES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.CLIENT_FILES);
// EXPLAIN: Bu satırın görevi: if (!sheet) throw new Error('ClientFiles sheet missing');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) throw new Error('ClientFiles sheet missing');
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: const headers = data[0] || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = data[0] || [];
// EXPLAIN: Bu satırın görevi: for (let i = 1; i < data.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: Bu satırın görevi: if (data[i][headers.indexOf('contact_id')] === contactId) return true;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (data[i][headers.indexOf('contact_id')] === contactId) return true;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const contact = getContactById_(contactId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const contact = getContactById_(contactId);
// EXPLAIN: Bu satırın görevi: if (!contact) return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!contact) return false;
// EXPLAIN: Bu satırın görevi: const root = getOrCreateClientsRoot_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const root = getOrCreateClientsRoot_();
// EXPLAIN: Bu satırın görevi: const folderName = contact.first_name + ' ' + contact.last_name + ' - ' + contact.contact_id;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const folderName = contact.first_name + ' ' + contact.last_name + ' - ' + contact.contact_id;
// EXPLAIN: Bu satırın görevi: const folders = root.getFoldersByName(folderName);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const folders = root.getFoldersByName(folderName);
// EXPLAIN: Bu satırın görevi: return folders.hasNext();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return folders.hasNext();
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Create client folder under Clients root. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Create client folder under Clients root
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function createClientFolder_(contact) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function createClientFolder_(contact) {
// EXPLAIN: Bu satırın görevi: const root = getOrCreateClientsRoot_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const root = getOrCreateClientsRoot_();
// EXPLAIN: Bu satırın görevi: const folderName = contact.first_name + ' ' + contact.last_name + ' - ' + contact.contact_id;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const folderName = contact.first_name + ' ' + contact.last_name + ' - ' + contact.contact_id;
// EXPLAIN: Bu satırın görevi: const folder = root.createFolder(folderName);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const folder = root.createFolder(folderName);
// EXPLAIN: Bu satırın görevi: return folder;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return folder;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function getOrCreateClientsRoot_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function getOrCreateClientsRoot_() {
// EXPLAIN: Bu satırın görevi: const root = DriveApp.getRootFolder();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const root = DriveApp.getRootFolder();
// EXPLAIN: Bu satırın görevi: const folders = root.getFoldersByName('Clients');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const folders = root.getFoldersByName('Clients');
// EXPLAIN: Bu satırın görevi: if (folders.hasNext()) return folders.next();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (folders.hasNext()) return folders.next();
// EXPLAIN: Bu satırın görevi: return root.createFolder('Clients');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return root.createFolder('Clients');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Create summary document from template and replace placeholders. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Create summary document from template and replace placeholders
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function createSummaryDoc_(contact, folder) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function createSummaryDoc_(contact, folder) {
// EXPLAIN: Bu satırın görevi: const template = getDocTemplateByName_('Müşteri Özet Dokümanı');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const template = getDocTemplateByName_('Müşteri Özet Dokümanı');
// EXPLAIN: Bu satırın görevi: if (!template) throw new Error('Doc template not found');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!template) throw new Error('Doc template not found');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const filename = renderClientTemplate_(template.output_filename_template || 'Müşteri Özeti', contact);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const filename = renderClientTemplate_(template.output_filename_template || 'Müşteri Özeti', contact);
// EXPLAIN: Bu satırın görevi: const templateFile = DriveApp.getFileById(template.template_doc_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const templateFile = DriveApp.getFileById(template.template_doc_id);
// EXPLAIN: Bu satırın görevi: const copy = templateFile.makeCopy(filename, folder);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const copy = templateFile.makeCopy(filename, folder);
// EXPLAIN: Bu satırın görevi: const doc = DocumentApp.openById(copy.getId());. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const doc = DocumentApp.openById(copy.getId());
// EXPLAIN: Bu satırın görevi: const body = doc.getBody();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const body = doc.getBody();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: body.replaceText('{{first_name}}', contact.first_name || '');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  body.replaceText('{{first_name}}', contact.first_name || '');
// EXPLAIN: Bu satırın görevi: body.replaceText('{{last_name}}', contact.last_name || '');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  body.replaceText('{{last_name}}', contact.last_name || '');
// EXPLAIN: Bu satırın görevi: body.replaceText('{{email}}', contact.email || '');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  body.replaceText('{{email}}', contact.email || '');
// EXPLAIN: Bu satırın görevi: body.replaceText('{{phone}}', contact.phone || '');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  body.replaceText('{{phone}}', contact.phone || '');
// EXPLAIN: Bu satırın görevi: body.replaceText('{{source}}', contact.source || '');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  body.replaceText('{{source}}', contact.source || '');
// EXPLAIN: Bu satırın görevi: body.replaceText('{{created_at}}', contact.created_at || '');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  body.replaceText('{{created_at}}', contact.created_at || '');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: doc.saveAndClose();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  doc.saveAndClose();
// EXPLAIN: Bu satırın görevi: return { docId: copy.getId(), docUrl: copy.getUrl() };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { docId: copy.getId(), docUrl: copy.getUrl() };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function getDocTemplateByName_(name) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function getDocTemplateByName_(name) {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.DOC_TEMPLATES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.DOC_TEMPLATES);
// EXPLAIN: Bu satırın görevi: if (!sheet) throw new Error('DocTemplates sheet missing');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) throw new Error('DocTemplates sheet missing');
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: const headers = data[0] || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = data[0] || [];
// EXPLAIN: Bu satırın görevi: for (let i = 1; i < data.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: Bu satırın görevi: if (data[i][headers.indexOf('template_name')] === name) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (data[i][headers.indexOf('template_name')] === name) {
// EXPLAIN: Bu satırın görevi: return {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return {
// EXPLAIN: Bu satırın görevi: template_name: data[i][headers.indexOf('template_name')],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        template_name: data[i][headers.indexOf('template_name')],
// EXPLAIN: Bu satırın görevi: template_doc_id: data[i][headers.indexOf('template_doc_id')],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        template_doc_id: data[i][headers.indexOf('template_doc_id')],
// EXPLAIN: Bu satırın görevi: output_filename_template: data[i][headers.indexOf('output_filename_template')]. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        output_filename_template: data[i][headers.indexOf('output_filename_template')]
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: return null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return null;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function renderClientTemplate_(template, contact) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function renderClientTemplate_(template, contact) {
// EXPLAIN: Bu satırın görevi: if (!template) return '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!template) return '';
// EXPLAIN: Bu satırın görevi: return String(template). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return String(template)
// EXPLAIN: Bu satırın görevi: .replace('{{first_name}}', contact.first_name || ''). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    .replace('{{first_name}}', contact.first_name || '')
// EXPLAIN: Bu satırın görevi: .replace('{{last_name}}', contact.last_name || ''). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    .replace('{{last_name}}', contact.last_name || '')
// EXPLAIN: Bu satırın görevi: .replace('{{contact_id}}', contact.contact_id || '');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    .replace('{{contact_id}}', contact.contact_id || '');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Create onboarding tasks from TaskTemplates. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Create onboarding tasks from TaskTemplates
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function createOnboardingTasks_(contact) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function createOnboardingTasks_(contact) {
// EXPLAIN: Bu satırın görevi: const template = getTaskTemplateByName_('Onboarding');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const template = getTaskTemplateByName_('Onboarding');
// EXPLAIN: Bu satırın görevi: if (!template) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!template) return;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const tasks = parseJsonSafe_(template.tasks_json) || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const tasks = parseJsonSafe_(template.tasks_json) || [];
// EXPLAIN: Bu satırın görevi: for (const taskDef of tasks) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const taskDef of tasks) {
// EXPLAIN: Bu satırın görevi: const due = new Date();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const due = new Date();
// EXPLAIN: Bu satırın görevi: due.setDate(due.getDate() + Number(taskDef.due_days || 0));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    due.setDate(due.getDate() + Number(taskDef.due_days || 0));
// EXPLAIN: Bu satırın görevi: TasksApp.getDefaultTaskList().createTask(taskDef.title, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    TasksApp.getDefaultTaskList().createTask(taskDef.title, {
// EXPLAIN: Bu satırın görevi: notes: 'Contact: ' + contact.first_name + ' ' + contact.last_name,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      notes: 'Contact: ' + contact.first_name + ' ' + contact.last_name,
// EXPLAIN: Bu satırın görevi: due: due. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      due: due
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function getTaskTemplateByName_(name) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function getTaskTemplateByName_(name) {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.TASK_TEMPLATES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.TASK_TEMPLATES);
// EXPLAIN: Bu satırın görevi: if (!sheet) throw new Error('TaskTemplates sheet missing');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) throw new Error('TaskTemplates sheet missing');
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: const headers = data[0] || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = data[0] || [];
// EXPLAIN: Bu satırın görevi: for (let i = 1; i < data.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: Bu satırın görevi: if (data[i][headers.indexOf('template_name')] === name) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (data[i][headers.indexOf('template_name')] === name) {
// EXPLAIN: Bu satırın görevi: return {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return {
// EXPLAIN: Bu satırın görevi: template_name: data[i][headers.indexOf('template_name')],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        template_name: data[i][headers.indexOf('template_name')],
// EXPLAIN: Bu satırın görevi: tasks_json: data[i][headers.indexOf('tasks_json')]. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        tasks_json: data[i][headers.indexOf('tasks_json')]
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: return null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return null;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function writeClientFilesRow_(contactId, folder, docInfo) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function writeClientFilesRow_(contactId, folder, docInfo) {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.CLIENT_FILES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.CLIENT_FILES);
// EXPLAIN: Bu satırın görevi: if (!sheet) throw new Error('ClientFiles sheet missing');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) throw new Error('ClientFiles sheet missing');
// EXPLAIN: Bu satırın görevi: const row = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const row = {
// EXPLAIN: Bu satırın görevi: contact_id: contactId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    contact_id: contactId,
// EXPLAIN: Bu satırın görevi: drive_folder_id: folder.getId(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    drive_folder_id: folder.getId(),
// EXPLAIN: Bu satırın görevi: drive_folder_url: folder.getUrl(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    drive_folder_url: folder.getUrl(),
// EXPLAIN: Bu satırın görevi: summary_doc_id: docInfo.docId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    summary_doc_id: docInfo.docId,
// EXPLAIN: Bu satırın görevi: summary_doc_url: docInfo.docUrl,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    summary_doc_url: docInfo.docUrl,
// EXPLAIN: Bu satırın görevi: created_at: new Date().toISOString(). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    created_at: new Date().toISOString()
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satırın görevi: sheet.appendRow(CLIENT_HEADERS.ClientFiles.map(h => row[h] || ''));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.appendRow(CLIENT_HEADERS.ClientFiles.map(h => row[h] || ''));
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function logClientActivity_(entityType, entityId, action, details) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function logClientActivity_(entityType, entityId, action, details) {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.ACTIVITY_LOG);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.ACTIVITY_LOG);
// EXPLAIN: Bu satırın görevi: if (!sheet) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) return;
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
// EXPLAIN: Bu satırın görevi: sheet.appendRow(headers.map(h => record[h] || ''));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
