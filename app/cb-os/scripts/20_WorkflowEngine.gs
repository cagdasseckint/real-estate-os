// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS Workflow Engine (Sheets-driven)
 * CB-OS Workflow Engine (Sheets-driven)
// EXPLAIN: * Supports triggers: FORM_SUBMIT, TIME, SHEET_EDIT
 * Supports triggers: FORM_SUBMIT, TIME, SHEET_EDIT
// EXPLAIN: * Actions: SEND_EMAIL, CREATE_TASK, CREATE_CAL_EVENT, UPDATE_SHEET, CREATE_DOC_FROM_TEMPLATE
 * Actions: SEND_EMAIL, CREATE_TASK, CREATE_CAL_EVENT, UPDATE_SHEET, CREATE_DOC_FROM_TEMPLATE
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: const WF_SHEETS = {
const WF_SHEETS = {
// EXPLAIN: RULES: 'WorkflowRules',
  RULES: 'WorkflowRules',
// EXPLAIN: RUNS: 'WorkflowRuns'
  RUNS: 'WorkflowRuns'
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: const WF_HEADERS = {
const WF_HEADERS = {
// EXPLAIN: WorkflowRules: [
  WorkflowRules: [
// EXPLAIN: 'rule_id', 'is_active', 'trigger_type', 'trigger_filter_json',
    'rule_id', 'is_active', 'trigger_type', 'trigger_filter_json',
// EXPLAIN: 'conditions_json', 'actions_json', 'throttle_minutes'
    'conditions_json', 'actions_json', 'throttle_minutes'
// EXPLAIN: ],
  ],
// EXPLAIN: WorkflowRuns: [
  WorkflowRuns: [
// EXPLAIN: 'run_id', 'ts', 'rule_id', 'entity_type', 'entity_id', 'status',
    'run_id', 'ts', 'rule_id', 'entity_type', 'entity_id', 'status',
// EXPLAIN: 'error_message', 'output_json'
    'error_message', 'output_json'
// EXPLAIN: ]
  ]
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Bootstrap workflow sheets with headers
 * Bootstrap workflow sheets with headers
// EXPLAIN: */
 */
// EXPLAIN: function bootstrapWorkflowSheets_() {
function bootstrapWorkflowSheets_() {
// EXPLAIN: const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: Object.keys(WF_HEADERS).forEach(name => {
  Object.keys(WF_HEADERS).forEach(name => {
// EXPLAIN: let sheet = ss.getSheetByName(name);
    let sheet = ss.getSheetByName(name);
// EXPLAIN: if (!sheet) {
    if (!sheet) {
// EXPLAIN: sheet = ss.insertSheet(name);
      sheet = ss.insertSheet(name);
// EXPLAIN: sheet.getRange(1, 1, 1, WF_HEADERS[name].length).setValues([WF_HEADERS[name]]);
      sheet.getRange(1, 1, 1, WF_HEADERS[name].length).setValues([WF_HEADERS[name]]);
// EXPLAIN: sheet.getRange(1, 1, 1, WF_HEADERS[name].length).setFontWeight('bold');
      sheet.getRange(1, 1, 1, WF_HEADERS[name].length).setFontWeight('bold');
// EXPLAIN: }
    }
// EXPLAIN: });
  });
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Trigger handler for form submit
 * Trigger handler for form submit
// EXPLAIN: */
 */
// EXPLAIN: function onFormSubmit(e) {
function onFormSubmit(e) {
// EXPLAIN: const payload = e && e.namedValues ? e.namedValues : {};
  const payload = e && e.namedValues ? e.namedValues : {};
// EXPLAIN: runWorkflowEngine_('FORM_SUBMIT', {
  runWorkflowEngine_('FORM_SUBMIT', {
// EXPLAIN: entity_type: 'FORM',
    entity_type: 'FORM',
// EXPLAIN: entity_id: String(new Date().getTime()),
    entity_id: String(new Date().getTime()),
// EXPLAIN: payload: payload
    payload: payload
// EXPLAIN: });
  });
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Trigger handler for time-based
 * Trigger handler for time-based
// EXPLAIN: */
 */
// EXPLAIN: function workflowTimeTrigger_() {
function workflowTimeTrigger_() {
// EXPLAIN: runWorkflowEngine_('TIME', {
  runWorkflowEngine_('TIME', {
// EXPLAIN: entity_type: 'TIME',
    entity_type: 'TIME',
// EXPLAIN: entity_id: String(new Date().getTime()),
    entity_id: String(new Date().getTime()),
// EXPLAIN: payload: {}
    payload: {}
// EXPLAIN: });
  });
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Trigger handler for sheet edit (CRM)
 * Trigger handler for sheet edit (CRM)
// EXPLAIN: */
 */
// EXPLAIN: function workflowOnEdit(e) {
function workflowOnEdit(e) {
// EXPLAIN: const range = e.range;
  const range = e.range;
// EXPLAIN: const sheet = range.getSheet();
  const sheet = range.getSheet();
// EXPLAIN: const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
// EXPLAIN: const row = range.getRow();
  const row = range.getRow();
// EXPLAIN: if (row === 1) return;
  if (row === 1) return;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const rowData = {};
  const rowData = {};
// EXPLAIN: const values = sheet.getRange(row, 1, 1, headers.length).getValues()[0];
  const values = sheet.getRange(row, 1, 1, headers.length).getValues()[0];
// EXPLAIN: headers.forEach((h, idx) => { rowData[h] = values[idx]; });
  headers.forEach((h, idx) => { rowData[h] = values[idx]; });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: runWorkflowEngine_('SHEET_EDIT', {
  runWorkflowEngine_('SHEET_EDIT', {
// EXPLAIN: entity_type: sheet.getName(),
    entity_type: sheet.getName(),
// EXPLAIN: entity_id: rowData.opp_id || rowData.contact_id || String(row),
    entity_id: rowData.opp_id || rowData.contact_id || String(row),
// EXPLAIN: payload: {
    payload: {
// EXPLAIN: sheet: sheet.getName(),
      sheet: sheet.getName(),
// EXPLAIN: row: row,
      row: row,
// EXPLAIN: column: headers[range.getColumn() - 1],
      column: headers[range.getColumn() - 1],
// EXPLAIN: new_value: range.getValue(),
      new_value: range.getValue(),
// EXPLAIN: old_value: e.oldValue || '',
      old_value: e.oldValue || '',
// EXPLAIN: row_data: rowData
      row_data: rowData
// EXPLAIN: }
    }
// EXPLAIN: });
  });
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Main workflow engine
 * Main workflow engine
// EXPLAIN: */
 */
// EXPLAIN: function runWorkflowEngine_(triggerType, ctx) {
function runWorkflowEngine_(triggerType, ctx) {
// EXPLAIN: const rules = getWorkflowRules_();
  const rules = getWorkflowRules_();
// EXPLAIN: for (const rule of rules) {
  for (const rule of rules) {
// EXPLAIN: if (!rule.is_active || rule.trigger_type !== triggerType) continue;
    if (!rule.is_active || rule.trigger_type !== triggerType) continue;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: if (!triggerMatches_(rule, ctx)) continue;
    if (!triggerMatches_(rule, ctx)) continue;
// EXPLAIN: if (!conditionsMet_(rule, ctx)) continue;
    if (!conditionsMet_(rule, ctx)) continue;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const throttleMinutes = Number(rule.throttle_minutes || 0);
    const throttleMinutes = Number(rule.throttle_minutes || 0);
// EXPLAIN: if (throttleMinutes > 0 && isThrottled_(rule, ctx, throttleMinutes)) {
    if (throttleMinutes > 0 && isThrottled_(rule, ctx, throttleMinutes)) {
// EXPLAIN: logWorkflowRun_(rule, ctx, 'skipped', 'throttled', {});
      logWorkflowRun_(rule, ctx, 'skipped', 'throttled', {});
// EXPLAIN: continue;
      continue;
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: try {
    try {
// EXPLAIN: const output = executeActions_(rule, ctx);
      const output = executeActions_(rule, ctx);
// EXPLAIN: logWorkflowRun_(rule, ctx, 'ok', '', output);
      logWorkflowRun_(rule, ctx, 'ok', '', output);
// EXPLAIN: } catch (e) {
    } catch (e) {
// EXPLAIN: logWorkflowRun_(rule, ctx, 'error', e.message, { stack: e.stack });
      logWorkflowRun_(rule, ctx, 'error', e.message, { stack: e.stack });
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Load active workflow rules
 * Load active workflow rules
// EXPLAIN: */
 */
// EXPLAIN: function getWorkflowRules_() {
function getWorkflowRules_() {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RULES);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RULES);
// EXPLAIN: if (!sheet) return [];
  if (!sheet) return [];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: if (data.length < 2) return [];
  if (data.length < 2) return [];
// EXPLAIN: const headers = data[0];
  const headers = data[0];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return data.slice(1).map(row => {
  return data.slice(1).map(row => {
// EXPLAIN: const obj = {};
    const obj = {};
// EXPLAIN: headers.forEach((h, idx) => { obj[h] = row[idx]; });
    headers.forEach((h, idx) => { obj[h] = row[idx]; });
// EXPLAIN: obj.is_active = String(obj.is_active).toLowerCase() === 'true';
    obj.is_active = String(obj.is_active).toLowerCase() === 'true';
// EXPLAIN: return obj;
    return obj;
// EXPLAIN: });
  });
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function triggerMatches_(rule, ctx) {
function triggerMatches_(rule, ctx) {
// EXPLAIN: const filter = parseJsonSafe_(rule.trigger_filter_json) || {};
  const filter = parseJsonSafe_(rule.trigger_filter_json) || {};
// EXPLAIN: if (rule.trigger_type === 'SHEET_EDIT') {
  if (rule.trigger_type === 'SHEET_EDIT') {
// EXPLAIN: if (filter.sheet && filter.sheet !== ctx.payload.sheet) return false;
    if (filter.sheet && filter.sheet !== ctx.payload.sheet) return false;
// EXPLAIN: if (filter.column && filter.column !== ctx.payload.column) return false;
    if (filter.column && filter.column !== ctx.payload.column) return false;
// EXPLAIN: if (filter.from !== undefined && filter.from !== ctx.payload.old_value) return false;
    if (filter.from !== undefined && filter.from !== ctx.payload.old_value) return false;
// EXPLAIN: if (filter.to !== undefined && filter.to !== ctx.payload.new_value) return false;
    if (filter.to !== undefined && filter.to !== ctx.payload.new_value) return false;
// EXPLAIN: }
  }
// EXPLAIN: return true;
  return true;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function conditionsMet_(rule, ctx) {
function conditionsMet_(rule, ctx) {
// EXPLAIN: const cond = parseJsonSafe_(rule.conditions_json);
  const cond = parseJsonSafe_(rule.conditions_json);
// EXPLAIN: if (!cond) return true;
  if (!cond) return true;
// EXPLAIN: return evaluateConditions_(cond, ctx.payload.row_data || ctx.payload);
  return evaluateConditions_(cond, ctx.payload.row_data || ctx.payload);
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function evaluateConditions_(cond, data) {
function evaluateConditions_(cond, data) {
// EXPLAIN: if (cond.and) return cond.and.every(c => evaluateConditions_(c, data));
  if (cond.and) return cond.and.every(c => evaluateConditions_(c, data));
// EXPLAIN: if (cond.or) return cond.or.some(c => evaluateConditions_(c, data));
  if (cond.or) return cond.or.some(c => evaluateConditions_(c, data));
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const field = cond.field;
  const field = cond.field;
// EXPLAIN: const op = cond.op || cond.operator || '=';
  const op = cond.op || cond.operator || '=';
// EXPLAIN: const val = cond.value;
  const val = cond.value;
// EXPLAIN: const actual = getNestedValue_(data, field);
  const actual = getNestedValue_(data, field);
// EXPLAIN: if (op === '=') return String(actual) === String(val);
  if (op === '=') return String(actual) === String(val);
// EXPLAIN: if (op === '>') return Number(actual) > Number(val);
  if (op === '>') return Number(actual) > Number(val);
// EXPLAIN: if (op === '<') return Number(actual) < Number(val);
  if (op === '<') return Number(actual) < Number(val);
// EXPLAIN: if (op === '!=') return String(actual) !== String(val);
  if (op === '!=') return String(actual) !== String(val);
// EXPLAIN: return false;
  return false;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function executeActions_(rule, ctx) {
function executeActions_(rule, ctx) {
// EXPLAIN: const actions = parseJsonSafe_(rule.actions_json) || [];
  const actions = parseJsonSafe_(rule.actions_json) || [];
// EXPLAIN: const outputs = [];
  const outputs = [];
// EXPLAIN: for (const action of actions) {
  for (const action of actions) {
// EXPLAIN: if (action.type === 'SEND_EMAIL') {
    if (action.type === 'SEND_EMAIL') {
// EXPLAIN: outputs.push(handleSendEmail_(action, ctx));
      outputs.push(handleSendEmail_(action, ctx));
// EXPLAIN: } else if (action.type === 'CREATE_TASK') {
    } else if (action.type === 'CREATE_TASK') {
// EXPLAIN: outputs.push(handleCreateTask_(action, ctx));
      outputs.push(handleCreateTask_(action, ctx));
// EXPLAIN: } else if (action.type === 'CREATE_CAL_EVENT') {
    } else if (action.type === 'CREATE_CAL_EVENT') {
// EXPLAIN: outputs.push(handleCreateCalendarEvent_(action, ctx));
      outputs.push(handleCreateCalendarEvent_(action, ctx));
// EXPLAIN: } else if (action.type === 'UPDATE_SHEET') {
    } else if (action.type === 'UPDATE_SHEET') {
// EXPLAIN: outputs.push(handleUpdateSheet_(action, ctx));
      outputs.push(handleUpdateSheet_(action, ctx));
// EXPLAIN: } else if (action.type === 'CREATE_DOC_FROM_TEMPLATE') {
    } else if (action.type === 'CREATE_DOC_FROM_TEMPLATE') {
// EXPLAIN: outputs.push(handleCreateDocFromTemplate_(action, ctx));
      outputs.push(handleCreateDocFromTemplate_(action, ctx));
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: return outputs;
  return outputs;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function handleSendEmail_(action, ctx) {
function handleSendEmail_(action, ctx) {
// EXPLAIN: const to = renderTemplate_(action.to || '', ctx.payload);
  const to = renderTemplate_(action.to || '', ctx.payload);
// EXPLAIN: const subject = renderTemplate_(action.subject_template || '', ctx.payload);
  const subject = renderTemplate_(action.subject_template || '', ctx.payload);
// EXPLAIN: const body = renderTemplate_(action.body_template || '', ctx.payload);
  const body = renderTemplate_(action.body_template || '', ctx.payload);
// EXPLAIN: GmailApp.sendEmail(to, subject, body);
  GmailApp.sendEmail(to, subject, body);
// EXPLAIN: return { action: 'SEND_EMAIL', to: to };
  return { action: 'SEND_EMAIL', to: to };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function handleCreateTask_(action, ctx) {
function handleCreateTask_(action, ctx) {
// EXPLAIN: const title = renderTemplate_(action.title_template || '', ctx.payload);
  const title = renderTemplate_(action.title_template || '', ctx.payload);
// EXPLAIN: const notes = renderTemplate_(action.notes_template || '', ctx.payload);
  const notes = renderTemplate_(action.notes_template || '', ctx.payload);
// EXPLAIN: const dueDays = Number(action.due_days_offset || 0);
  const dueDays = Number(action.due_days_offset || 0);
// EXPLAIN: const due = new Date();
  const due = new Date();
// EXPLAIN: due.setDate(due.getDate() + dueDays);
  due.setDate(due.getDate() + dueDays);
// EXPLAIN: const task = TasksApp.getDefaultTaskList().createTask(title, { notes: notes, due: due });
  const task = TasksApp.getDefaultTaskList().createTask(title, { notes: notes, due: due });
// EXPLAIN: return { action: 'CREATE_TASK', task_id: task.getId() };
  return { action: 'CREATE_TASK', task_id: task.getId() };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function handleCreateCalendarEvent_(action, ctx) {
function handleCreateCalendarEvent_(action, ctx) {
// EXPLAIN: const calendarId = action.calendar_id || CalendarApp.getDefaultCalendar().getId();
  const calendarId = action.calendar_id || CalendarApp.getDefaultCalendar().getId();
// EXPLAIN: const calendar = CalendarApp.getCalendarById(calendarId);
  const calendar = CalendarApp.getCalendarById(calendarId);
// EXPLAIN: const title = renderTemplate_(action.title_template || '', ctx.payload);
  const title = renderTemplate_(action.title_template || '', ctx.payload);
// EXPLAIN: const startOffset = Number(action.start_minutes_offset || 0);
  const startOffset = Number(action.start_minutes_offset || 0);
// EXPLAIN: const duration = Number(action.duration_minutes || 30);
  const duration = Number(action.duration_minutes || 30);
// EXPLAIN: const start = new Date();
  const start = new Date();
// EXPLAIN: start.setMinutes(start.getMinutes() + startOffset);
  start.setMinutes(start.getMinutes() + startOffset);
// EXPLAIN: const end = new Date(start.getTime() + duration * 60000);
  const end = new Date(start.getTime() + duration * 60000);
// EXPLAIN: const guests = renderTemplate_(action.guests_csv || '', ctx.payload);
  const guests = renderTemplate_(action.guests_csv || '', ctx.payload);
// EXPLAIN: const eventOptions = guests ? { guests: guests } : {};
  const eventOptions = guests ? { guests: guests } : {};
// EXPLAIN: const event = calendar.createEvent(title, start, end, eventOptions);
  const event = calendar.createEvent(title, start, end, eventOptions);
// EXPLAIN: return { action: 'CREATE_CAL_EVENT', event_id: event.getId() };
  return { action: 'CREATE_CAL_EVENT', event_id: event.getId() };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function handleUpdateSheet_(action, ctx) {
function handleUpdateSheet_(action, ctx) {
// EXPLAIN: const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: const sheet = ss.getSheetByName(action.sheet);
  const sheet = ss.getSheetByName(action.sheet);
// EXPLAIN: if (!sheet) throw new Error('Sheet not found: ' + action.sheet);
  if (!sheet) throw new Error('Sheet not found: ' + action.sheet);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
// EXPLAIN: const lookupField = action.lookup_field;
  const lookupField = action.lookup_field;
// EXPLAIN: const lookupValue = renderTemplate_(action.lookup_value_template || '', ctx.payload);
  const lookupValue = renderTemplate_(action.lookup_value_template || '', ctx.payload);
// EXPLAIN: const updates = parseJsonSafe_(action.updates_json) || {};
  const updates = parseJsonSafe_(action.updates_json) || {};
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: for (let i = 1; i < data.length; i++) {
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: if (String(data[i][headers.indexOf(lookupField)]) === String(lookupValue)) {
    if (String(data[i][headers.indexOf(lookupField)]) === String(lookupValue)) {
// EXPLAIN: Object.keys(updates).forEach(key => {
      Object.keys(updates).forEach(key => {
// EXPLAIN: const col = headers.indexOf(key);
        const col = headers.indexOf(key);
// EXPLAIN: if (col !== -1) {
        if (col !== -1) {
// EXPLAIN: const value = renderTemplate_(updates[key], ctx.payload);
          const value = renderTemplate_(updates[key], ctx.payload);
// EXPLAIN: sheet.getRange(i + 1, col + 1).setValue(value);
          sheet.getRange(i + 1, col + 1).setValue(value);
// EXPLAIN: }
        }
// EXPLAIN: });
      });
// EXPLAIN: return { action: 'UPDATE_SHEET', sheet: action.sheet, row: i + 1 };
      return { action: 'UPDATE_SHEET', sheet: action.sheet, row: i + 1 };
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: return { action: 'UPDATE_SHEET', sheet: action.sheet, row: null };
  return { action: 'UPDATE_SHEET', sheet: action.sheet, row: null };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function handleCreateDocFromTemplate_(action, ctx) {
function handleCreateDocFromTemplate_(action, ctx) {
// EXPLAIN: const templateId = action.template_doc_id;
  const templateId = action.template_doc_id;
// EXPLAIN: const folderId = action.output_folder_id;
  const folderId = action.output_folder_id;
// EXPLAIN: const filename = renderTemplate_(action.filename_template || 'Document', ctx.payload);
  const filename = renderTemplate_(action.filename_template || 'Document', ctx.payload);
// EXPLAIN: const templateFile = DriveApp.getFileById(templateId);
  const templateFile = DriveApp.getFileById(templateId);
// EXPLAIN: const folder = DriveApp.getFolderById(folderId);
  const folder = DriveApp.getFolderById(folderId);
// EXPLAIN: const copy = templateFile.makeCopy(filename, folder);
  const copy = templateFile.makeCopy(filename, folder);
// EXPLAIN: const doc = DocumentApp.openById(copy.getId());
  const doc = DocumentApp.openById(copy.getId());
// EXPLAIN: replaceDocPlaceholders_(doc, ctx.payload);
  replaceDocPlaceholders_(doc, ctx.payload);
// EXPLAIN: doc.saveAndClose();
  doc.saveAndClose();
// EXPLAIN: return { action: 'CREATE_DOC_FROM_TEMPLATE', doc_id: copy.getId() };
  return { action: 'CREATE_DOC_FROM_TEMPLATE', doc_id: copy.getId() };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Render {{field}} templates with nested value support
 * Render {{field}} templates with nested value support
// EXPLAIN: */
 */
// EXPLAIN: function renderTemplate_(template, data) {
function renderTemplate_(template, data) {
// EXPLAIN: if (!template) return '';
  if (!template) return '';
// EXPLAIN: if (typeof template !== 'string') {
  if (typeof template !== 'string') {
// EXPLAIN: return template;
    return template;
// EXPLAIN: }
  }
// EXPLAIN: return String(template).replace(/{{\s*([^}]+)\s*}}/g, function(_, key) {
  return String(template).replace(/{{\s*([^}]+)\s*}}/g, function(_, key) {
// EXPLAIN: const value = getNestedValue_(data, key.trim());
    const value = getNestedValue_(data, key.trim());
// EXPLAIN: return value !== undefined && value !== null ? String(value) : '';
    return value !== undefined && value !== null ? String(value) : '';
// EXPLAIN: });
  });
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function getNestedValue_(obj, path) {
function getNestedValue_(obj, path) {
// EXPLAIN: if (!obj || !path) return '';
  if (!obj || !path) return '';
// EXPLAIN: return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : ''), obj);
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : ''), obj);
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function replaceDocPlaceholders_(doc, data) {
function replaceDocPlaceholders_(doc, data) {
// EXPLAIN: const body = doc.getBody();
  const body = doc.getBody();
// EXPLAIN: const text = body.getText();
  const text = body.getText();
// EXPLAIN: const matches = text.match(/{{\s*[^}]+\s*}}/g) || [];
  const matches = text.match(/{{\s*[^}]+\s*}}/g) || [];
// EXPLAIN: const unique = [...new Set(matches)];
  const unique = [...new Set(matches)];
// EXPLAIN: for (const placeholder of unique) {
  for (const placeholder of unique) {
// EXPLAIN: const key = placeholder.replace(/{{|}}/g, '').trim();
    const key = placeholder.replace(/{{|}}/g, '').trim();
// EXPLAIN: const value = getNestedValue_(data, key);
    const value = getNestedValue_(data, key);
// EXPLAIN: body.replaceText(escapeRegex_(placeholder), value !== undefined && value !== null ? String(value) : '');
    body.replaceText(escapeRegex_(placeholder), value !== undefined && value !== null ? String(value) : '');
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function escapeRegex_(value) {
function escapeRegex_(value) {
// EXPLAIN: return String(value).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  return String(value).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function isThrottled_(rule, ctx, minutes) {
function isThrottled_(rule, ctx, minutes) {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RUNS);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RUNS);
// EXPLAIN: if (!sheet) return false;
  if (!sheet) return false;
// EXPLAIN: const data = sheet.getDataRange().getValues();
  const data = sheet.getDataRange().getValues();
// EXPLAIN: if (data.length < 2) return false;
  if (data.length < 2) return false;
// EXPLAIN: const headers = data[0];
  const headers = data[0];
// EXPLAIN: const cutoff = new Date(Date.now() - minutes * 60000);
  const cutoff = new Date(Date.now() - minutes * 60000);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (let i = data.length - 1; i >= 1; i--) {
  for (let i = data.length - 1; i >= 1; i--) {
// EXPLAIN: if (data[i][headers.indexOf('rule_id')] !== rule.rule_id) continue;
    if (data[i][headers.indexOf('rule_id')] !== rule.rule_id) continue;
// EXPLAIN: if (data[i][headers.indexOf('entity_id')] !== ctx.entity_id) continue;
    if (data[i][headers.indexOf('entity_id')] !== ctx.entity_id) continue;
// EXPLAIN: const ts = new Date(data[i][headers.indexOf('ts')]);
    const ts = new Date(data[i][headers.indexOf('ts')]);
// EXPLAIN: if (ts > cutoff) return true;
    if (ts > cutoff) return true;
// EXPLAIN: }
  }
// EXPLAIN: return false;
  return false;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: function logWorkflowRun_(rule, ctx, status, errorMessage, output) {
function logWorkflowRun_(rule, ctx, status, errorMessage, output) {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RUNS);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RUNS);
// EXPLAIN: if (!sheet) return;
  if (!sheet) return;
// EXPLAIN: const headers = sheet.getDataRange().getValues()[0] || WF_HEADERS.WorkflowRuns;
  const headers = sheet.getDataRange().getValues()[0] || WF_HEADERS.WorkflowRuns;
// EXPLAIN: const record = {
  const record = {
// EXPLAIN: run_id: Utilities.getUuid(),
    run_id: Utilities.getUuid(),
// EXPLAIN: ts: new Date().toISOString(),
    ts: new Date().toISOString(),
// EXPLAIN: rule_id: rule.rule_id,
    rule_id: rule.rule_id,
// EXPLAIN: entity_type: ctx.entity_type,
    entity_type: ctx.entity_type,
// EXPLAIN: entity_id: ctx.entity_id,
    entity_id: ctx.entity_id,
// EXPLAIN: status: status,
    status: status,
// EXPLAIN: error_message: errorMessage || '',
    error_message: errorMessage || '',
// EXPLAIN: output_json: JSON.stringify(output || {})
    output_json: JSON.stringify(output || {})
// EXPLAIN: };
  };
// EXPLAIN: sheet.appendRow(headers.map(h => record[h] || ''));
  sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Seed example workflow rules (3 examples)
 * Seed example workflow rules (3 examples)
// EXPLAIN: */
 */
// EXPLAIN: function seedWorkflowRules_() {
function seedWorkflowRules_() {
// EXPLAIN: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RULES);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RULES);
// EXPLAIN: if (!sheet) throw new Error('WorkflowRules sheet missing');
  if (!sheet) throw new Error('WorkflowRules sheet missing');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: sheet.appendRow([
  sheet.appendRow([
// EXPLAIN: Utilities.getUuid(),
    Utilities.getUuid(),
// EXPLAIN: true,
    true,
// EXPLAIN: 'SHEET_EDIT',
    'SHEET_EDIT',
// EXPLAIN: JSON.stringify({ sheet: 'Opportunities', column: 'stage_id', from: 'NEW', to: 'QUALIFIED' }),
    JSON.stringify({ sheet: 'Opportunities', column: 'stage_id', from: 'NEW', to: 'QUALIFIED' }),
// EXPLAIN: JSON.stringify({ and: [{ field: 'value_amount', op: '>', value: 50000 }, { field: 'status', op: '=', value: 'open' }] }),
    JSON.stringify({ and: [{ field: 'value_amount', op: '>', value: 50000 }, { field: 'status', op: '=', value: 'open' }] }),
// EXPLAIN: JSON.stringify([
    JSON.stringify([
// EXPLAIN: { type: 'CREATE_TASK', title_template: 'Follow-up {{title}}', notes_template: 'Stage upgraded', due_days_offset: 1 }
      { type: 'CREATE_TASK', title_template: 'Follow-up {{title}}', notes_template: 'Stage upgraded', due_days_offset: 1 }
// EXPLAIN: ]),
    ]),
// EXPLAIN: 60
    60
// EXPLAIN: ]);
  ]);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: sheet.appendRow([
  sheet.appendRow([
// EXPLAIN: Utilities.getUuid(),
    Utilities.getUuid(),
// EXPLAIN: true,
    true,
// EXPLAIN: 'TIME',
    'TIME',
// EXPLAIN: JSON.stringify({}),
    JSON.stringify({}),
// EXPLAIN: JSON.stringify({ and: [{ field: 'status', op: '=', value: 'open' }] }),
    JSON.stringify({ and: [{ field: 'status', op: '=', value: 'open' }] }),
// EXPLAIN: JSON.stringify([
    JSON.stringify([
// EXPLAIN: { type: 'SEND_EMAIL', to: 'owner@example.com', subject_template: 'Daily open opps', body_template: 'Open opps check' }
      { type: 'SEND_EMAIL', to: 'owner@example.com', subject_template: 'Daily open opps', body_template: 'Open opps check' }
// EXPLAIN: ]),
    ]),
// EXPLAIN: 1440
    1440
// EXPLAIN: ]);
  ]);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: sheet.appendRow([
  sheet.appendRow([
// EXPLAIN: Utilities.getUuid(),
    Utilities.getUuid(),
// EXPLAIN: true,
    true,
// EXPLAIN: 'FORM_SUBMIT',
    'FORM_SUBMIT',
// EXPLAIN: JSON.stringify({}),
    JSON.stringify({}),
// EXPLAIN: JSON.stringify({}),
    JSON.stringify({}),
// EXPLAIN: JSON.stringify([
    JSON.stringify([
// EXPLAIN: { type: 'CREATE_DOC_FROM_TEMPLATE', template_doc_id: 'TEMPLATE_ID', output_folder_id: 'FOLDER_ID', filename_template: 'Lead {{email}}' }
      { type: 'CREATE_DOC_FROM_TEMPLATE', template_doc_id: 'TEMPLATE_ID', output_folder_id: 'FOLDER_ID', filename_template: 'Lead {{email}}' }
// EXPLAIN: ]),
    ]),
// EXPLAIN: 0
    0
// EXPLAIN: ]);
  ]);
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
