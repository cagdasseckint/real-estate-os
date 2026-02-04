// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS Client Files Provisioning (Drive + Docs + Tasks + Sheets)
 * CB-OS Client Files Provisioning (Drive + Docs + Tasks + Sheets)
// EXPLAIN: * Creates client folder, summary doc, onboarding tasks, and logs to ActivityLog.
 * Creates client folder, summary doc, onboarding tasks, and logs to ActivityLog.
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: const CLIENT_SHEETS = {
const CLIENT_SHEETS = {
// EXPLAIN: CONTACTS: 'Contacts',
  CONTACTS: 'Contacts',
// EXPLAIN: CLIENT_FILES: 'ClientFiles',
  CLIENT_FILES: 'ClientFiles',
// EXPLAIN: DOC_TEMPLATES: 'DocTemplates',
  DOC_TEMPLATES: 'DocTemplates',
// EXPLAIN: TASK_TEMPLATES: 'TaskTemplates',
  TASK_TEMPLATES: 'TaskTemplates',
// EXPLAIN: ACTIVITY_LOG: 'ActivityLog'
  ACTIVITY_LOG: 'ActivityLog'
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: const CLIENT_HEADERS = {
const CLIENT_HEADERS = {
// EXPLAIN: ClientFiles: [
  ClientFiles: [
// EXPLAIN: 'contact_id', 'drive_folder_id', 'drive_folder_url',
    'contact_id', 'drive_folder_id', 'drive_folder_url',
// EXPLAIN: 'summary_doc_id', 'summary_doc_url', 'created_at'
    'summary_doc_id', 'summary_doc_url', 'created_at'
// EXPLAIN: ],
  ],
// EXPLAIN: DocTemplates: ['template_name', 'template_doc_id', 'output_filename_template'],
  DocTemplates: ['template_name', 'template_doc_id', 'output_filename_template'],
// EXPLAIN: TaskTemplates: ['template_name', 'tasks_json']
  TaskTemplates: ['template_name', 'tasks_json']
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Bootstrap ClientFiles, DocTemplates, TaskTemplates sheets
 * Bootstrap ClientFiles, DocTemplates, TaskTemplates sheets
// EXPLAIN: */
 */
// EXPLAIN: function bootstrapClientFilesSheets_() {
function bootstrapClientFilesSheets_() {
// EXPLAIN: const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: Object.keys(CLIENT_HEADERS).forEach(name => {
  Object.keys(CLIENT_HEADERS).forEach(name => {
// EXPLAIN: let sheet = ss.getSheetByName(name);
    let sheet = ss.getSheetByName(name);
// EXPLAIN: if (!sheet) {
    if (!sheet) {
// EXPLAIN: sheet = ss.insertSheet(name);
      sheet = ss.insertSheet(name);
// EXPLAIN: sheet.getRange(1, 1, 1, CLIENT_HEADERS[name].length).setValues([CLIENT_HEADERS[name]]);
      sheet.getRange(1, 1, 1, CLIENT_HEADERS[name].length).setValues([CLIENT_HEADERS[name]]);
// EXPLAIN: sheet.getRange(1, 1, 1, CLIENT_HEADERS[name].length).setFontWeight('bold');
      sheet.getRange(1, 1, 1, CLIENT_HEADERS[name].length).setFontWeight('bold');
// EXPLAIN: }
    }
// EXPLAIN: });
  });
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Main provisioning entry point (idempotent by contact_id)
 * Main provisioning entry point (idempotent by contact_id)
// EXPLAIN: */
 */
// EXPLAIN: function provisionClientFilesForContact_(contactId) {
function provisionClientFilesForContact_(contactId) {
// EXPLAIN: const contact = getContactById_(contactId);
  const contact = getContactById_(contactId);
// EXPLAIN: if (!contact) throw new Error('Contact not found: ' + contactId);
  if (!contact) throw new Error('Contact not found: ' + contactId);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (clientFilesExists_(contactId)) {
  if (clientFilesExists_(contactId)) {
// EXPLAIN: return { skipped: true, reason: 'ClientFiles exists' };
    return { skipped: true, reason: 'ClientFiles exists' };
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const folder = createClientFolder_(contact);
  const folder = createClientFolder_(contact);
// EXPLAIN: const docInfo = createSummaryDoc_(contact, folder);
  const docInfo = createSummaryDoc_(contact, folder);
// EXPLAIN: createOnboardingTasks_(contact);
  createOnboardingTasks_(contact);
// EXPLAIN: writeClientFilesRow_(contact.contact_id, folder, docInfo);
  writeClientFilesRow_(contact.contact_id, folder, docInfo);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: logClientActivity_('contact', contact.contact_id, 'create', {
  logClientActivity_('contact', contact.contact_id, 'create', {
// EXPLAIN: drive_folder_id: folder.getId(),
    drive_folder_id: folder.getId(),
// EXPLAIN: summary_doc_id: docInfo.docId
    summary_doc_id: docInfo.docId
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return { created: true, folder_id: folder.getId(), doc_id: docInfo.docId };
  return { created: true, folder_id: folder.getId(), doc_id: docInfo.docId };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function getContactById_(contactId) {
function getContactById_(contactId) {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.CONTACTS);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.CONTACTS);
// EXPLAIN: if (!sheet) throw new Error('Contacts sheet missing');
  if (!sheet) throw new Error('Contacts sheet missing');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: const headers = data[0] || [];
  const headers = data[0] || [];
// EXPLAIN: for (let i = 1; i < data.length; i++) {
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: if (data[i][headers.indexOf('contact_id')] === contactId) {
    if (data[i][headers.indexOf('contact_id')] === contactId) {
// EXPLAIN: const row = {};
      const row = {};
// EXPLAIN: headers.forEach((h, idx) => { row[h] = data[i][idx]; });
      headers.forEach((h, idx) => { row[h] = data[i][idx]; });
// EXPLAIN: return row;
      return row;
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: return null;
  return null;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function clientFilesExists_(contactId) {
function clientFilesExists_(contactId) {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.CLIENT_FILES);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.CLIENT_FILES);
// EXPLAIN: if (!sheet) throw new Error('ClientFiles sheet missing');
  if (!sheet) throw new Error('ClientFiles sheet missing');
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: const headers = data[0] || [];
  const headers = data[0] || [];
// EXPLAIN: for (let i = 1; i < data.length; i++) {
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: if (data[i][headers.indexOf('contact_id')] === contactId) return true;
    if (data[i][headers.indexOf('contact_id')] === contactId) return true;
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const contact = getContactById_(contactId);
  const contact = getContactById_(contactId);
// EXPLAIN: if (!contact) return false;
  if (!contact) return false;
// EXPLAIN: const root = getOrCreateClientsRoot_();
  const root = getOrCreateClientsRoot_();
// EXPLAIN: const folderName = contact.first_name + ' ' + contact.last_name + ' - ' + contact.contact_id;
  const folderName = contact.first_name + ' ' + contact.last_name + ' - ' + contact.contact_id;
// EXPLAIN: const folders = root.getFoldersByName(folderName);
  const folders = root.getFoldersByName(folderName);
// EXPLAIN: return folders.hasNext();
  return folders.hasNext();
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Create client folder under Clients root
 * Create client folder under Clients root
// EXPLAIN: */
 */
// EXPLAIN: function createClientFolder_(contact) {
function createClientFolder_(contact) {
// EXPLAIN: const root = getOrCreateClientsRoot_();
  const root = getOrCreateClientsRoot_();
// EXPLAIN: const folderName = contact.first_name + ' ' + contact.last_name + ' - ' + contact.contact_id;
  const folderName = contact.first_name + ' ' + contact.last_name + ' - ' + contact.contact_id;
// EXPLAIN: const folder = root.createFolder(folderName);
  const folder = root.createFolder(folderName);
// EXPLAIN: return folder;
  return folder;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function getOrCreateClientsRoot_() {
function getOrCreateClientsRoot_() {
// EXPLAIN: const root = DriveApp.getRootFolder();
  const root = DriveApp.getRootFolder();
// EXPLAIN: const folders = root.getFoldersByName('Clients');
  const folders = root.getFoldersByName('Clients');
// EXPLAIN: if (folders.hasNext()) return folders.next();
  if (folders.hasNext()) return folders.next();
// EXPLAIN: return root.createFolder('Clients');
  return root.createFolder('Clients');
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Create summary document from template and replace placeholders
 * Create summary document from template and replace placeholders
// EXPLAIN: */
 */
// EXPLAIN: function createSummaryDoc_(contact, folder) {
function createSummaryDoc_(contact, folder) {
// EXPLAIN: const template = getDocTemplateByName_('Müşteri Özet Dokümanı');
  const template = getDocTemplateByName_('Müşteri Özet Dokümanı');
// EXPLAIN: if (!template) throw new Error('Doc template not found');
  if (!template) throw new Error('Doc template not found');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const filename = renderClientTemplate_(template.output_filename_template || 'Müşteri Özeti', contact);
  const filename = renderClientTemplate_(template.output_filename_template || 'Müşteri Özeti', contact);
// EXPLAIN: const templateFile = DriveApp.getFileById(template.template_doc_id);
  const templateFile = DriveApp.getFileById(template.template_doc_id);
// EXPLAIN: const copy = templateFile.makeCopy(filename, folder);
  const copy = templateFile.makeCopy(filename, folder);
// EXPLAIN: const doc = DocumentApp.openById(copy.getId());
  const doc = DocumentApp.openById(copy.getId());
// EXPLAIN: const body = doc.getBody();
  const body = doc.getBody();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: body.replaceText('{{first_name}}', contact.first_name || '');
  body.replaceText('{{first_name}}', contact.first_name || '');
// EXPLAIN: body.replaceText('{{last_name}}', contact.last_name || '');
  body.replaceText('{{last_name}}', contact.last_name || '');
// EXPLAIN: body.replaceText('{{email}}', contact.email || '');
  body.replaceText('{{email}}', contact.email || '');
// EXPLAIN: body.replaceText('{{phone}}', contact.phone || '');
  body.replaceText('{{phone}}', contact.phone || '');
// EXPLAIN: body.replaceText('{{source}}', contact.source || '');
  body.replaceText('{{source}}', contact.source || '');
// EXPLAIN: body.replaceText('{{created_at}}', contact.created_at || '');
  body.replaceText('{{created_at}}', contact.created_at || '');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: doc.saveAndClose();
  doc.saveAndClose();
// EXPLAIN: return { docId: copy.getId(), docUrl: copy.getUrl() };
  return { docId: copy.getId(), docUrl: copy.getUrl() };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function getDocTemplateByName_(name) {
function getDocTemplateByName_(name) {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.DOC_TEMPLATES);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.DOC_TEMPLATES);
// EXPLAIN: if (!sheet) throw new Error('DocTemplates sheet missing');
  if (!sheet) throw new Error('DocTemplates sheet missing');
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: const headers = data[0] || [];
  const headers = data[0] || [];
// EXPLAIN: for (let i = 1; i < data.length; i++) {
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: if (data[i][headers.indexOf('template_name')] === name) {
    if (data[i][headers.indexOf('template_name')] === name) {
// EXPLAIN: return {
      return {
// EXPLAIN: template_name: data[i][headers.indexOf('template_name')],
        template_name: data[i][headers.indexOf('template_name')],
// EXPLAIN: template_doc_id: data[i][headers.indexOf('template_doc_id')],
        template_doc_id: data[i][headers.indexOf('template_doc_id')],
// EXPLAIN: output_filename_template: data[i][headers.indexOf('output_filename_template')]
        output_filename_template: data[i][headers.indexOf('output_filename_template')]
// EXPLAIN: };
      };
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: return null;
  return null;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function renderClientTemplate_(template, contact) {
function renderClientTemplate_(template, contact) {
// EXPLAIN: if (!template) return '';
  if (!template) return '';
// EXPLAIN: return String(template)
  return String(template)
// EXPLAIN: .replace('{{first_name}}', contact.first_name || '')
    .replace('{{first_name}}', contact.first_name || '')
// EXPLAIN: .replace('{{last_name}}', contact.last_name || '')
    .replace('{{last_name}}', contact.last_name || '')
// EXPLAIN: .replace('{{contact_id}}', contact.contact_id || '');
    .replace('{{contact_id}}', contact.contact_id || '');
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Create onboarding tasks from TaskTemplates
 * Create onboarding tasks from TaskTemplates
// EXPLAIN: */
 */
// EXPLAIN: function createOnboardingTasks_(contact) {
function createOnboardingTasks_(contact) {
// EXPLAIN: const template = getTaskTemplateByName_('Onboarding');
  const template = getTaskTemplateByName_('Onboarding');
// EXPLAIN: if (!template) return;
  if (!template) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const tasks = parseJsonSafe_(template.tasks_json) || [];
  const tasks = parseJsonSafe_(template.tasks_json) || [];
// EXPLAIN: for (const taskDef of tasks) {
  for (const taskDef of tasks) {
// EXPLAIN: const due = new Date();
    const due = new Date();
// EXPLAIN: due.setDate(due.getDate() + Number(taskDef.due_days || 0));
    due.setDate(due.getDate() + Number(taskDef.due_days || 0));
// EXPLAIN: TasksApp.getDefaultTaskList().createTask(taskDef.title, {
    TasksApp.getDefaultTaskList().createTask(taskDef.title, {
// EXPLAIN: notes: 'Contact: ' + contact.first_name + ' ' + contact.last_name,
      notes: 'Contact: ' + contact.first_name + ' ' + contact.last_name,
// EXPLAIN: due: due
      due: due
// EXPLAIN: });
    });
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function getTaskTemplateByName_(name) {
function getTaskTemplateByName_(name) {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.TASK_TEMPLATES);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.TASK_TEMPLATES);
// EXPLAIN: if (!sheet) throw new Error('TaskTemplates sheet missing');
  if (!sheet) throw new Error('TaskTemplates sheet missing');
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: const headers = data[0] || [];
  const headers = data[0] || [];
// EXPLAIN: for (let i = 1; i < data.length; i++) {
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: if (data[i][headers.indexOf('template_name')] === name) {
    if (data[i][headers.indexOf('template_name')] === name) {
// EXPLAIN: return {
      return {
// EXPLAIN: template_name: data[i][headers.indexOf('template_name')],
        template_name: data[i][headers.indexOf('template_name')],
// EXPLAIN: tasks_json: data[i][headers.indexOf('tasks_json')]
        tasks_json: data[i][headers.indexOf('tasks_json')]
// EXPLAIN: };
      };
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: return null;
  return null;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function writeClientFilesRow_(contactId, folder, docInfo) {
function writeClientFilesRow_(contactId, folder, docInfo) {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.CLIENT_FILES);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.CLIENT_FILES);
// EXPLAIN: if (!sheet) throw new Error('ClientFiles sheet missing');
  if (!sheet) throw new Error('ClientFiles sheet missing');
// EXPLAIN: const row = {
  const row = {
// EXPLAIN: contact_id: contactId,
    contact_id: contactId,
// EXPLAIN: drive_folder_id: folder.getId(),
    drive_folder_id: folder.getId(),
// EXPLAIN: drive_folder_url: folder.getUrl(),
    drive_folder_url: folder.getUrl(),
// EXPLAIN: summary_doc_id: docInfo.docId,
    summary_doc_id: docInfo.docId,
// EXPLAIN: summary_doc_url: docInfo.docUrl,
    summary_doc_url: docInfo.docUrl,
// EXPLAIN: created_at: new Date().toISOString()
    created_at: new Date().toISOString()
// EXPLAIN: };
  };
// EXPLAIN: sheet.appendRow(CLIENT_HEADERS.ClientFiles.map(h => row[h] || ''));
  sheet.appendRow(CLIENT_HEADERS.ClientFiles.map(h => row[h] || ''));
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function logClientActivity_(entityType, entityId, action, details) {
function logClientActivity_(entityType, entityId, action, details) {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.ACTIVITY_LOG);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.ACTIVITY_LOG);
// EXPLAIN: if (!sheet) return;
  if (!sheet) return;
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
// EXPLAIN: sheet.appendRow(headers.map(h => record[h] || ''));
  sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
