/**
 * CB-OS Workflow Engine (Sheets-driven)
 * Supports triggers: FORM_SUBMIT, TIME, SHEET_EDIT
 * Actions: SEND_EMAIL, CREATE_TASK, CREATE_CAL_EVENT, UPDATE_SHEET, CREATE_DOC_FROM_TEMPLATE
 */

const WF_SHEETS = {
  RULES: 'WorkflowRules',
  RUNS: 'WorkflowRuns'
};

const WF_HEADERS = {
  WorkflowRules: [
    'rule_id', 'is_active', 'trigger_type', 'trigger_filter_json',
    'conditions_json', 'actions_json', 'throttle_minutes'
  ],
  WorkflowRuns: [
    'run_id', 'ts', 'rule_id', 'entity_type', 'entity_id', 'status',
    'error_message', 'output_json'
  ]
};

/**
 * Bootstrap workflow sheets with headers
 */
function bootstrapWorkflowSheets_() {
  if (!cfg_('MODULES_WORKFLOW_ENABLED', DEFAULTS.MODULES_WORKFLOW_ENABLED)) return;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(WF_HEADERS).forEach(name => {
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
      sheet.getRange(1, 1, 1, WF_HEADERS[name].length).setValues([WF_HEADERS[name]]);
      sheet.getRange(1, 1, 1, WF_HEADERS[name].length).setFontWeight('bold');
    }
  });
}

/**
 * Trigger handler for form submit
 */
function onFormSubmit(e) {
  const payload = e && e.namedValues ? e.namedValues : {};
  if (cfg_('MODULES_WORKFLOW_ENABLED', DEFAULTS.MODULES_WORKFLOW_ENABLED)) {
    runWorkflowEngine_('FORM_SUBMIT', {
      entity_type: 'FORM',
      entity_id: String(new Date().getTime()),
      payload: payload
    });
  }
  
  if (cfg_('MODULES_LEAD_CAPTURE_ENABLED', DEFAULTS.MODULES_LEAD_CAPTURE_ENABLED)) {
    if (typeof leadOnFormSubmit === 'function') {
      leadOnFormSubmit(e);
    }
  }
  
  if (cfg_('BOOKING_MODE', DEFAULTS.BOOKING_MODE) !== 'manual') {
    if (typeof bookingOnFormSubmit === 'function') {
      bookingOnFormSubmit(e);
    }
  }
}

/**
 * Trigger handler for time-based
 */
function workflowTimeTrigger_() {
  if (!cfg_('MODULES_WORKFLOW_ENABLED', DEFAULTS.MODULES_WORKFLOW_ENABLED)) return;
  runWorkflowEngine_('TIME', {
    entity_type: 'TIME',
    entity_id: String(new Date().getTime()),
    payload: {}
  });
}

/**
 * Trigger handler for sheet edit (CRM)
 */
function workflowOnEdit(e) {
  if (!cfg_('MODULES_WORKFLOW_ENABLED', DEFAULTS.MODULES_WORKFLOW_ENABLED)) return;
  const range = e.range;
  const sheet = range.getSheet();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = range.getRow();
  if (row === 1) return;
  
  const rowData = {};
  const values = sheet.getRange(row, 1, 1, headers.length).getValues()[0];
  headers.forEach((h, idx) => { rowData[h] = values[idx]; });
  
  runWorkflowEngine_('SHEET_EDIT', {
    entity_type: sheet.getName(),
    entity_id: rowData.opp_id || rowData.contact_id || String(row),
    payload: {
      sheet: sheet.getName(),
      row: row,
      column: headers[range.getColumn() - 1],
      new_value: range.getValue(),
      old_value: e.oldValue || '',
      row_data: rowData
    }
  });
}

/**
 * Main workflow engine
 */
function runWorkflowEngine_(triggerType, ctx) {
  const rules = getWorkflowRules_();
  for (const rule of rules) {
    if (!rule.is_active || rule.trigger_type !== triggerType) continue;
    
    if (!triggerMatches_(rule, ctx)) continue;
    if (!conditionsMet_(rule, ctx)) continue;
    
    const throttleMinutes = Number(rule.throttle_minutes || 0);
    if (throttleMinutes > 0 && isThrottled_(rule, ctx, throttleMinutes)) {
      logWorkflowRun_(rule, ctx, 'skipped', 'throttled', {});
      continue;
    }
    
    try {
      const output = executeActions_(rule, ctx);
      logWorkflowRun_(rule, ctx, 'ok', '', output);
    } catch (e) {
      logWorkflowRun_(rule, ctx, 'error', e.message, { stack: e.stack });
    }
  }
}

/**
 * Load active workflow rules
 */
function getWorkflowRules_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RULES);
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = row[idx]; });
    obj.is_active = String(obj.is_active).toLowerCase() === 'true';
    return obj;
  });
}

function triggerMatches_(rule, ctx) {
  const filter = parseJsonSafe_(rule.trigger_filter_json) || {};
  if (rule.trigger_type === 'SHEET_EDIT') {
    if (filter.sheet && filter.sheet !== ctx.payload.sheet) return false;
    if (filter.column && filter.column !== ctx.payload.column) return false;
    if (filter.from !== undefined && filter.from !== ctx.payload.old_value) return false;
    if (filter.to !== undefined && filter.to !== ctx.payload.new_value) return false;
  }
  return true;
}

function conditionsMet_(rule, ctx) {
  const cond = parseJsonSafe_(rule.conditions_json);
  if (!cond) return true;
  return evaluateConditions_(cond, ctx.payload.row_data || ctx.payload);
}

function evaluateConditions_(cond, data) {
  if (cond.and) return cond.and.every(c => evaluateConditions_(c, data));
  if (cond.or) return cond.or.some(c => evaluateConditions_(c, data));
  
  const field = cond.field;
  const op = cond.op || cond.operator || '=';
  const val = cond.value;
  const actual = getNestedValue_(data, field);
  if (op === '=') return String(actual) === String(val);
  if (op === '>') return Number(actual) > Number(val);
  if (op === '<') return Number(actual) < Number(val);
  if (op === '!=') return String(actual) !== String(val);
  return false;
}

function executeActions_(rule, ctx) {
  const actions = parseJsonSafe_(rule.actions_json) || [];
  const outputs = [];
  for (const action of actions) {
    if (action.type === 'SEND_EMAIL') {
      outputs.push(handleSendEmail_(action, ctx));
    } else if (action.type === 'CREATE_TASK') {
      outputs.push(handleCreateTask_(action, ctx));
    } else if (action.type === 'CREATE_CAL_EVENT') {
      outputs.push(handleCreateCalendarEvent_(action, ctx));
    } else if (action.type === 'UPDATE_SHEET') {
      outputs.push(handleUpdateSheet_(action, ctx));
    } else if (action.type === 'CREATE_DOC_FROM_TEMPLATE') {
      outputs.push(handleCreateDocFromTemplate_(action, ctx));
    }
  }
  return outputs;
}

function handleSendEmail_(action, ctx) {
  const to = renderTemplate_(action.to || '', ctx.payload);
  const subject = renderTemplate_(action.subject_template || '', ctx.payload);
  const body = renderTemplate_(action.body_template || '', ctx.payload);
  sendEmailSafe_(to, subject, body);
  return { action: 'SEND_EMAIL', to: to };
}

function handleCreateTask_(action, ctx) {
  const title = renderTemplate_(action.title_template || '', ctx.payload);
  const notes = renderTemplate_(action.notes_template || '', ctx.payload);
  const dueDays = Number(action.due_days_offset || 0);
  const due = new Date();
  due.setDate(due.getDate() + dueDays);
  const task = createTaskAdvanced_(title, notes, due);
  return { action: 'CREATE_TASK', task_id: task ? task.id : '' };
}

function handleCreateCalendarEvent_(action, ctx) {
  const calendarId = action.calendar_id || CalendarApp.getDefaultCalendar().getId();
  const calendar = CalendarApp.getCalendarById(calendarId);
  const title = renderTemplate_(action.title_template || '', ctx.payload);
  const startOffset = Number(action.start_minutes_offset || 0);
  const duration = Number(action.duration_minutes || 30);
  const start = new Date();
  start.setMinutes(start.getMinutes() + startOffset);
  const end = new Date(start.getTime() + duration * 60000);
  const guests = renderTemplate_(action.guests_csv || '', ctx.payload);
  const eventOptions = guests ? { guests: guests } : {};
  const event = calendar.createEvent(title, start, end, eventOptions);
  return { action: 'CREATE_CAL_EVENT', event_id: event.getId() };
}

function handleUpdateSheet_(action, ctx) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(action.sheet);
  if (!sheet) throw new Error('Sheet not found: ' + action.sheet);
  
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const lookupField = action.lookup_field;
  const lookupValue = renderTemplate_(action.lookup_value_template || '', ctx.payload);
  const updates = parseJsonSafe_(action.updates_json) || {};
  
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][headers.indexOf(lookupField)]) === String(lookupValue)) {
      Object.keys(updates).forEach(key => {
        const col = headers.indexOf(key);
        if (col !== -1) {
          const value = renderTemplate_(updates[key], ctx.payload);
          sheet.getRange(i + 1, col + 1).setValue(value);
        }
      });
      return { action: 'UPDATE_SHEET', sheet: action.sheet, row: i + 1 };
    }
  }
  return { action: 'UPDATE_SHEET', sheet: action.sheet, row: null };
}

function handleCreateDocFromTemplate_(action, ctx) {
  const templateId = action.template_doc_id;
  const folderId = action.output_folder_id;
  const filename = renderTemplate_(action.filename_template || 'Document', ctx.payload);
  const templateFile = DriveApp.getFileById(templateId);
  const folder = DriveApp.getFolderById(folderId);
  const copy = templateFile.makeCopy(filename, folder);
  const doc = DocumentApp.openById(copy.getId());
  replaceDocPlaceholders_(doc, ctx.payload);
  doc.saveAndClose();
  return { action: 'CREATE_DOC_FROM_TEMPLATE', doc_id: copy.getId() };
}

/**
 * Render {{field}} templates with nested value support
 */
function renderTemplate_(template, data) {
  if (!template) return '';
  if (typeof template !== 'string') {
    return template;
  }
  return String(template).replace(/{{\s*([^}]+)\s*}}/g, function(_, key) {
    const value = getNestedValue_(data, key.trim());
    return value !== undefined && value !== null ? String(value) : '';
  });
}

function getNestedValue_(obj, path) {
  if (!obj || !path) return '';
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : ''), obj);
}

function replaceDocPlaceholders_(doc, data) {
  const body = doc.getBody();
  const text = body.getText();
  const matches = text.match(/{{\s*[^}]+\s*}}/g) || [];
  const unique = [...new Set(matches)];
  for (const placeholder of unique) {
    const key = placeholder.replace(/{{|}}/g, '').trim();
    const value = getNestedValue_(data, key);
    body.replaceText(escapeRegex_(placeholder), value !== undefined && value !== null ? String(value) : '');
  }
}

function escapeRegex_(value) {
  return String(value).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function isThrottled_(rule, ctx, minutes) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RUNS);
  if (!sheet) return false;
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return false;
  const headers = data[0];
  const cutoff = new Date(Date.now() - minutes * 60000);
  
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][headers.indexOf('rule_id')] !== rule.rule_id) continue;
    if (data[i][headers.indexOf('entity_id')] !== ctx.entity_id) continue;
    const ts = new Date(data[i][headers.indexOf('ts')]);
    if (ts > cutoff) return true;
  }
  return false;
}

function logWorkflowRun_(rule, ctx, status, errorMessage, output) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RUNS);
  if (!sheet) return;
  const headers = sheet.getDataRange().getValues()[0] || WF_HEADERS.WorkflowRuns;
  const record = {
    run_id: Utilities.getUuid(),
    ts: new Date().toISOString(),
    rule_id: rule.rule_id,
    entity_type: ctx.entity_type,
    entity_id: ctx.entity_id,
    status: status,
    error_message: errorMessage || '',
    output_json: JSON.stringify(output || {})
  };
  sheet.appendRow(headers.map(h => record[h] || ''));
}

/**
 * Seed example workflow rules (3 examples)
 */
function seedWorkflowRules_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RULES);
  if (!sheet) throw new Error('WorkflowRules sheet missing');
  
  sheet.appendRow([
    Utilities.getUuid(),
    true,
    'SHEET_EDIT',
    JSON.stringify({ sheet: 'Opportunities', column: 'stage_id', from: 'NEW', to: 'QUALIFIED' }),
    JSON.stringify({ and: [{ field: 'value_amount', op: '>', value: 50000 }, { field: 'status', op: '=', value: 'open' }] }),
    JSON.stringify([
      { type: 'CREATE_TASK', title_template: 'Follow-up {{title}}', notes_template: 'Stage upgraded', due_days_offset: 1 }
    ]),
    60
  ]);
  
  sheet.appendRow([
    Utilities.getUuid(),
    true,
    'TIME',
    JSON.stringify({}),
    JSON.stringify({ and: [{ field: 'status', op: '=', value: 'open' }] }),
    JSON.stringify([
      { type: 'SEND_EMAIL', to: 'owner@example.com', subject_template: 'Daily open opps', body_template: 'Open opps check' }
    ]),
    1440
  ]);
  
  sheet.appendRow([
    Utilities.getUuid(),
    true,
    'FORM_SUBMIT',
    JSON.stringify({}),
    JSON.stringify({}),
    JSON.stringify([
      { type: 'CREATE_DOC_FROM_TEMPLATE', template_doc_id: 'TEMPLATE_ID', output_folder_id: 'FOLDER_ID', filename_template: 'Lead {{email}}' }
    ]),
    0
  ]);
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
