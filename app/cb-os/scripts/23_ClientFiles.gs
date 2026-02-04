/**
 * CB-OS Client Files Provisioning (Drive + Docs + Tasks + Sheets)
 * Creates client folder, summary doc, onboarding tasks, and logs to ActivityLog.
 */

const CLIENT_SHEETS = {
  CONTACTS: 'Contacts',
  CLIENT_FILES: 'ClientFiles',
  DOC_TEMPLATES: 'DocTemplates',
  TASK_TEMPLATES: 'TaskTemplates',
  ACTIVITY_LOG: 'ActivityLog'
};

const CLIENT_HEADERS = {
  ClientFiles: [
    'contact_id', 'drive_folder_id', 'drive_folder_url',
    'summary_doc_id', 'summary_doc_url', 'created_at'
  ],
  DocTemplates: ['template_name', 'template_doc_id', 'output_filename_template'],
  TaskTemplates: ['template_name', 'tasks_json']
};

/**
 * Bootstrap ClientFiles, DocTemplates, TaskTemplates sheets
 */
function bootstrapClientFilesSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(CLIENT_HEADERS).forEach(name => {
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
      sheet.getRange(1, 1, 1, CLIENT_HEADERS[name].length).setValues([CLIENT_HEADERS[name]]);
      sheet.getRange(1, 1, 1, CLIENT_HEADERS[name].length).setFontWeight('bold');
    }
  });
}

/**
 * Main provisioning entry point (idempotent by contact_id)
 */
function provisionClientFilesForContact_(contactId) {
  const contact = getContactById_(contactId);
  if (!contact) throw new Error('Contact not found: ' + contactId);
  
  if (clientFilesExists_(contactId)) {
    return { skipped: true, reason: 'ClientFiles exists' };
  }
  
  const folder = createClientFolder_(contact);
  const docInfo = createSummaryDoc_(contact, folder);
  createOnboardingTasks_(contact);
  writeClientFilesRow_(contact.contact_id, folder, docInfo);
  
  logClientActivity_('contact', contact.contact_id, 'create', {
    drive_folder_id: folder.getId(),
    summary_doc_id: docInfo.docId
  });
  
  return { created: true, folder_id: folder.getId(), doc_id: docInfo.docId };
}

function getContactById_(contactId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.CONTACTS);
  if (!sheet) throw new Error('Contacts sheet missing');
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0] || [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][headers.indexOf('contact_id')] === contactId) {
      const row = {};
      headers.forEach((h, idx) => { row[h] = data[i][idx]; });
      return row;
    }
  }
  return null;
}

function clientFilesExists_(contactId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.CLIENT_FILES);
  if (!sheet) throw new Error('ClientFiles sheet missing');
  const data = sheet.getDataRange().getValues();
  const headers = data[0] || [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][headers.indexOf('contact_id')] === contactId) return true;
  }
  
  const contact = getContactById_(contactId);
  if (!contact) return false;
  const root = getOrCreateClientsRoot_();
  const folderName = contact.first_name + ' ' + contact.last_name + ' - ' + contact.contact_id;
  const folders = root.getFoldersByName(folderName);
  return folders.hasNext();
}

/**
 * Create client folder under Clients root
 */
function createClientFolder_(contact) {
  const root = getOrCreateClientsRoot_();
  const folderName = contact.first_name + ' ' + contact.last_name + ' - ' + contact.contact_id;
  const folder = root.createFolder(folderName);
  return folder;
}

function getOrCreateClientsRoot_() {
  const root = DriveApp.getRootFolder();
  const folders = root.getFoldersByName('Clients');
  if (folders.hasNext()) return folders.next();
  return root.createFolder('Clients');
}

/**
 * Create summary document from template and replace placeholders
 */
function createSummaryDoc_(contact, folder) {
  const template = getDocTemplateByName_('Müşteri Özet Dokümanı');
  if (!template) throw new Error('Doc template not found');
  
  const filename = renderClientTemplate_(template.output_filename_template || 'Müşteri Özeti', contact);
  const templateFile = DriveApp.getFileById(template.template_doc_id);
  const copy = templateFile.makeCopy(filename, folder);
  const doc = DocumentApp.openById(copy.getId());
  const body = doc.getBody();
  
  body.replaceText('{{first_name}}', contact.first_name || '');
  body.replaceText('{{last_name}}', contact.last_name || '');
  body.replaceText('{{email}}', contact.email || '');
  body.replaceText('{{phone}}', contact.phone || '');
  body.replaceText('{{source}}', contact.source || '');
  body.replaceText('{{created_at}}', contact.created_at || '');
  
  doc.saveAndClose();
  return { docId: copy.getId(), docUrl: copy.getUrl() };
}

function getDocTemplateByName_(name) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.DOC_TEMPLATES);
  if (!sheet) throw new Error('DocTemplates sheet missing');
  const data = sheet.getDataRange().getValues();
  const headers = data[0] || [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][headers.indexOf('template_name')] === name) {
      return {
        template_name: data[i][headers.indexOf('template_name')],
        template_doc_id: data[i][headers.indexOf('template_doc_id')],
        output_filename_template: data[i][headers.indexOf('output_filename_template')]
      };
    }
  }
  return null;
}

function renderClientTemplate_(template, contact) {
  if (!template) return '';
  return String(template)
    .replace('{{first_name}}', contact.first_name || '')
    .replace('{{last_name}}', contact.last_name || '')
    .replace('{{contact_id}}', contact.contact_id || '');
}

/**
 * Create onboarding tasks from TaskTemplates
 */
function createOnboardingTasks_(contact) {
  const template = getTaskTemplateByName_('Onboarding');
  if (!template) return;
  
  const tasks = parseJsonSafe_(template.tasks_json) || [];
  for (const taskDef of tasks) {
    const due = new Date();
    due.setDate(due.getDate() + Number(taskDef.due_days || 0));
    TasksApp.getDefaultTaskList().createTask(taskDef.title, {
      notes: 'Contact: ' + contact.first_name + ' ' + contact.last_name,
      due: due
    });
  }
}

function getTaskTemplateByName_(name) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.TASK_TEMPLATES);
  if (!sheet) throw new Error('TaskTemplates sheet missing');
  const data = sheet.getDataRange().getValues();
  const headers = data[0] || [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][headers.indexOf('template_name')] === name) {
      return {
        template_name: data[i][headers.indexOf('template_name')],
        tasks_json: data[i][headers.indexOf('tasks_json')]
      };
    }
  }
  return null;
}

function writeClientFilesRow_(contactId, folder, docInfo) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.CLIENT_FILES);
  if (!sheet) throw new Error('ClientFiles sheet missing');
  const row = {
    contact_id: contactId,
    drive_folder_id: folder.getId(),
    drive_folder_url: folder.getUrl(),
    summary_doc_id: docInfo.docId,
    summary_doc_url: docInfo.docUrl,
    created_at: new Date().toISOString()
  };
  sheet.appendRow(CLIENT_HEADERS.ClientFiles.map(h => row[h] || ''));
}

function logClientActivity_(entityType, entityId, action, details) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLIENT_SHEETS.ACTIVITY_LOG);
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
