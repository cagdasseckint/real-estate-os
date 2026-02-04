// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS Workflow Engine (Sheets-driven). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS Workflow Engine (Sheets-driven)
// EXPLAIN: Bu satırın görevi: * Supports triggers: FORM_SUBMIT, TIME, SHEET_EDIT. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Supports triggers: FORM_SUBMIT, TIME, SHEET_EDIT
// EXPLAIN: Bu satırın görevi: * Actions: SEND_EMAIL, CREATE_TASK, CREATE_CAL_EVENT, UPDATE_SHEET, CREATE_DOC_FROM_TEMPLATE. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Actions: SEND_EMAIL, CREATE_TASK, CREATE_CAL_EVENT, UPDATE_SHEET, CREATE_DOC_FROM_TEMPLATE
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: const WF_SHEETS = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const WF_SHEETS = {
// EXPLAIN: Bu satırın görevi: RULES: 'WorkflowRules',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  RULES: 'WorkflowRules',
// EXPLAIN: Bu satırın görevi: RUNS: 'WorkflowRuns'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  RUNS: 'WorkflowRuns'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: const WF_HEADERS = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const WF_HEADERS = {
// EXPLAIN: Bu satırın görevi: WorkflowRules: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  WorkflowRules: [
// EXPLAIN: Bu satırın görevi: 'rule_id', 'is_active', 'trigger_type', 'trigger_filter_json',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'rule_id', 'is_active', 'trigger_type', 'trigger_filter_json',
// EXPLAIN: Bu satırın görevi: 'conditions_json', 'actions_json', 'throttle_minutes'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'conditions_json', 'actions_json', 'throttle_minutes'
// EXPLAIN: Bu satırın görevi: ],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ],
// EXPLAIN: Bu satırın görevi: WorkflowRuns: [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  WorkflowRuns: [
// EXPLAIN: Bu satırın görevi: 'run_id', 'ts', 'rule_id', 'entity_type', 'entity_id', 'status',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'run_id', 'ts', 'rule_id', 'entity_type', 'entity_id', 'status',
// EXPLAIN: Bu satırın görevi: 'error_message', 'output_json'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'error_message', 'output_json'
// EXPLAIN: Bu satırın görevi: ]. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ]
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Bootstrap workflow sheets with headers. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Bootstrap workflow sheets with headers
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function bootstrapWorkflowSheets_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function bootstrapWorkflowSheets_() {
// EXPLAIN: Bu satırın görevi: const ss = SpreadsheetApp.getActiveSpreadsheet();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const ss = SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: Bu satırın görevi: Object.keys(WF_HEADERS).forEach(name => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Object.keys(WF_HEADERS).forEach(name => {
// EXPLAIN: Bu satırın görevi: let sheet = ss.getSheetByName(name);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    let sheet = ss.getSheetByName(name);
// EXPLAIN: Bu satırın görevi: if (!sheet) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!sheet) {
// EXPLAIN: Bu satırın görevi: sheet = ss.insertSheet(name);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet = ss.insertSheet(name);
// EXPLAIN: Bu satırın görevi: sheet.getRange(1, 1, 1, WF_HEADERS[name].length).setValues([WF_HEADERS[name]]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet.getRange(1, 1, 1, WF_HEADERS[name].length).setValues([WF_HEADERS[name]]);
// EXPLAIN: Bu satırın görevi: sheet.getRange(1, 1, 1, WF_HEADERS[name].length).setFontWeight('bold');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet.getRange(1, 1, 1, WF_HEADERS[name].length).setFontWeight('bold');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Trigger handler for form submit. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Trigger handler for form submit
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function onFormSubmit(e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function onFormSubmit(e) {
// EXPLAIN: Bu satırın görevi: const payload = e && e.namedValues ? e.namedValues : {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const payload = e && e.namedValues ? e.namedValues : {};
// EXPLAIN: Bu satırın görevi: runWorkflowEngine_('FORM_SUBMIT', {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  runWorkflowEngine_('FORM_SUBMIT', {
// EXPLAIN: Bu satırın görevi: entity_type: 'FORM',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: 'FORM',
// EXPLAIN: Bu satırın görevi: entity_id: String(new Date().getTime()),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: String(new Date().getTime()),
// EXPLAIN: Bu satırın görevi: payload: payload. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    payload: payload
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Trigger handler for time-based. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Trigger handler for time-based
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function workflowTimeTrigger_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function workflowTimeTrigger_() {
// EXPLAIN: Bu satırın görevi: runWorkflowEngine_('TIME', {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  runWorkflowEngine_('TIME', {
// EXPLAIN: Bu satırın görevi: entity_type: 'TIME',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: 'TIME',
// EXPLAIN: Bu satırın görevi: entity_id: String(new Date().getTime()),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: String(new Date().getTime()),
// EXPLAIN: Bu satırın görevi: payload: {}. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    payload: {}
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Trigger handler for sheet edit (CRM). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Trigger handler for sheet edit (CRM)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function workflowOnEdit(e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function workflowOnEdit(e) {
// EXPLAIN: Bu satırın görevi: const range = e.range;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const range = e.range;
// EXPLAIN: Bu satırın görevi: const sheet = range.getSheet();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = range.getSheet();
// EXPLAIN: Bu satırın görevi: const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
// EXPLAIN: Bu satırın görevi: const row = range.getRow();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const row = range.getRow();
// EXPLAIN: Bu satırın görevi: if (row === 1) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (row === 1) return;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const rowData = {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const rowData = {};
// EXPLAIN: Bu satırın görevi: const values = sheet.getRange(row, 1, 1, headers.length).getValues()[0];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const values = sheet.getRange(row, 1, 1, headers.length).getValues()[0];
// EXPLAIN: Bu satırın görevi: headers.forEach((h, idx) => { rowData[h] = values[idx]; });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  headers.forEach((h, idx) => { rowData[h] = values[idx]; });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: runWorkflowEngine_('SHEET_EDIT', {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  runWorkflowEngine_('SHEET_EDIT', {
// EXPLAIN: Bu satırın görevi: entity_type: sheet.getName(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: sheet.getName(),
// EXPLAIN: Bu satırın görevi: entity_id: rowData.opp_id || rowData.contact_id || String(row),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: rowData.opp_id || rowData.contact_id || String(row),
// EXPLAIN: Bu satırın görevi: payload: {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    payload: {
// EXPLAIN: Bu satırın görevi: sheet: sheet.getName(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet: sheet.getName(),
// EXPLAIN: Bu satırın görevi: row: row,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      row: row,
// EXPLAIN: Bu satırın görevi: column: headers[range.getColumn() - 1],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      column: headers[range.getColumn() - 1],
// EXPLAIN: Bu satırın görevi: new_value: range.getValue(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      new_value: range.getValue(),
// EXPLAIN: Bu satırın görevi: old_value: e.oldValue || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      old_value: e.oldValue || '',
// EXPLAIN: Bu satırın görevi: row_data: rowData. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      row_data: rowData
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Main workflow engine. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Main workflow engine
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function runWorkflowEngine_(triggerType, ctx) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function runWorkflowEngine_(triggerType, ctx) {
// EXPLAIN: Bu satırın görevi: const rules = getWorkflowRules_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const rules = getWorkflowRules_();
// EXPLAIN: Bu satırın görevi: for (const rule of rules) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const rule of rules) {
// EXPLAIN: Bu satırın görevi: if (!rule.is_active || rule.trigger_type !== triggerType) continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!rule.is_active || rule.trigger_type !== triggerType) continue;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: if (!triggerMatches_(rule, ctx)) continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!triggerMatches_(rule, ctx)) continue;
// EXPLAIN: Bu satırın görevi: if (!conditionsMet_(rule, ctx)) continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!conditionsMet_(rule, ctx)) continue;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const throttleMinutes = Number(rule.throttle_minutes || 0);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const throttleMinutes = Number(rule.throttle_minutes || 0);
// EXPLAIN: Bu satırın görevi: if (throttleMinutes > 0 && isThrottled_(rule, ctx, throttleMinutes)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (throttleMinutes > 0 && isThrottled_(rule, ctx, throttleMinutes)) {
// EXPLAIN: Bu satırın görevi: logWorkflowRun_(rule, ctx, 'skipped', 'throttled', {});. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      logWorkflowRun_(rule, ctx, 'skipped', 'throttled', {});
// EXPLAIN: Bu satırın görevi: continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      continue;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    try {
// EXPLAIN: Bu satırın görevi: const output = executeActions_(rule, ctx);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const output = executeActions_(rule, ctx);
// EXPLAIN: Bu satırın görevi: logWorkflowRun_(rule, ctx, 'ok', '', output);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      logWorkflowRun_(rule, ctx, 'ok', '', output);
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } catch (e) {
// EXPLAIN: Bu satırın görevi: logWorkflowRun_(rule, ctx, 'error', e.message, { stack: e.stack });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      logWorkflowRun_(rule, ctx, 'error', e.message, { stack: e.stack });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Load active workflow rules. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Load active workflow rules
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function getWorkflowRules_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function getWorkflowRules_() {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RULES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RULES);
// EXPLAIN: Bu satırın görevi: if (!sheet) return [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) return [];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: if (data.length < 2) return [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (data.length < 2) return [];
// EXPLAIN: Bu satırın görevi: const headers = data[0];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = data[0];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return data.slice(1).map(row => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return data.slice(1).map(row => {
// EXPLAIN: Bu satırın görevi: const obj = {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const obj = {};
// EXPLAIN: Bu satırın görevi: headers.forEach((h, idx) => { obj[h] = row[idx]; });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    headers.forEach((h, idx) => { obj[h] = row[idx]; });
// EXPLAIN: Bu satırın görevi: obj.is_active = String(obj.is_active).toLowerCase() === 'true';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    obj.is_active = String(obj.is_active).toLowerCase() === 'true';
// EXPLAIN: Bu satırın görevi: return obj;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return obj;
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function triggerMatches_(rule, ctx) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function triggerMatches_(rule, ctx) {
// EXPLAIN: Bu satırın görevi: const filter = parseJsonSafe_(rule.trigger_filter_json) || {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const filter = parseJsonSafe_(rule.trigger_filter_json) || {};
// EXPLAIN: Bu satırın görevi: if (rule.trigger_type === 'SHEET_EDIT') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (rule.trigger_type === 'SHEET_EDIT') {
// EXPLAIN: Bu satırın görevi: if (filter.sheet && filter.sheet !== ctx.payload.sheet) return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (filter.sheet && filter.sheet !== ctx.payload.sheet) return false;
// EXPLAIN: Bu satırın görevi: if (filter.column && filter.column !== ctx.payload.column) return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (filter.column && filter.column !== ctx.payload.column) return false;
// EXPLAIN: Bu satırın görevi: if (filter.from !== undefined && filter.from !== ctx.payload.old_value) return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (filter.from !== undefined && filter.from !== ctx.payload.old_value) return false;
// EXPLAIN: Bu satırın görevi: if (filter.to !== undefined && filter.to !== ctx.payload.new_value) return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (filter.to !== undefined && filter.to !== ctx.payload.new_value) return false;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: return true;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return true;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function conditionsMet_(rule, ctx) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function conditionsMet_(rule, ctx) {
// EXPLAIN: Bu satırın görevi: const cond = parseJsonSafe_(rule.conditions_json);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const cond = parseJsonSafe_(rule.conditions_json);
// EXPLAIN: Bu satırın görevi: if (!cond) return true;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!cond) return true;
// EXPLAIN: Bu satırın görevi: return evaluateConditions_(cond, ctx.payload.row_data || ctx.payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return evaluateConditions_(cond, ctx.payload.row_data || ctx.payload);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function evaluateConditions_(cond, data) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function evaluateConditions_(cond, data) {
// EXPLAIN: Bu satırın görevi: if (cond.and) return cond.and.every(c => evaluateConditions_(c, data));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (cond.and) return cond.and.every(c => evaluateConditions_(c, data));
// EXPLAIN: Bu satırın görevi: if (cond.or) return cond.or.some(c => evaluateConditions_(c, data));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (cond.or) return cond.or.some(c => evaluateConditions_(c, data));
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const field = cond.field;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const field = cond.field;
// EXPLAIN: Bu satırın görevi: const op = cond.op || cond.operator || '=';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const op = cond.op || cond.operator || '=';
// EXPLAIN: Bu satırın görevi: const val = cond.value;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const val = cond.value;
// EXPLAIN: Bu satırın görevi: const actual = getNestedValue_(data, field);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const actual = getNestedValue_(data, field);
// EXPLAIN: Bu satırın görevi: if (op === '=') return String(actual) === String(val);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (op === '=') return String(actual) === String(val);
// EXPLAIN: Bu satırın görevi: if (op === '>') return Number(actual) > Number(val);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (op === '>') return Number(actual) > Number(val);
// EXPLAIN: Bu satırın görevi: if (op === '<') return Number(actual) < Number(val);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (op === '<') return Number(actual) < Number(val);
// EXPLAIN: Bu satırın görevi: if (op === '!=') return String(actual) !== String(val);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (op === '!=') return String(actual) !== String(val);
// EXPLAIN: Bu satırın görevi: return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return false;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function executeActions_(rule, ctx) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function executeActions_(rule, ctx) {
// EXPLAIN: Bu satırın görevi: const actions = parseJsonSafe_(rule.actions_json) || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const actions = parseJsonSafe_(rule.actions_json) || [];
// EXPLAIN: Bu satırın görevi: const outputs = [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const outputs = [];
// EXPLAIN: Bu satırın görevi: for (const action of actions) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const action of actions) {
// EXPLAIN: Bu satırın görevi: if (action.type === 'SEND_EMAIL') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (action.type === 'SEND_EMAIL') {
// EXPLAIN: Bu satırın görevi: outputs.push(handleSendEmail_(action, ctx));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      outputs.push(handleSendEmail_(action, ctx));
// EXPLAIN: Bu satırın görevi: } else if (action.type === 'CREATE_TASK') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else if (action.type === 'CREATE_TASK') {
// EXPLAIN: Bu satırın görevi: outputs.push(handleCreateTask_(action, ctx));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      outputs.push(handleCreateTask_(action, ctx));
// EXPLAIN: Bu satırın görevi: } else if (action.type === 'CREATE_CAL_EVENT') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else if (action.type === 'CREATE_CAL_EVENT') {
// EXPLAIN: Bu satırın görevi: outputs.push(handleCreateCalendarEvent_(action, ctx));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      outputs.push(handleCreateCalendarEvent_(action, ctx));
// EXPLAIN: Bu satırın görevi: } else if (action.type === 'UPDATE_SHEET') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else if (action.type === 'UPDATE_SHEET') {
// EXPLAIN: Bu satırın görevi: outputs.push(handleUpdateSheet_(action, ctx));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      outputs.push(handleUpdateSheet_(action, ctx));
// EXPLAIN: Bu satırın görevi: } else if (action.type === 'CREATE_DOC_FROM_TEMPLATE') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else if (action.type === 'CREATE_DOC_FROM_TEMPLATE') {
// EXPLAIN: Bu satırın görevi: outputs.push(handleCreateDocFromTemplate_(action, ctx));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      outputs.push(handleCreateDocFromTemplate_(action, ctx));
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: return outputs;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return outputs;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function handleSendEmail_(action, ctx) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function handleSendEmail_(action, ctx) {
// EXPLAIN: Bu satırın görevi: const to = renderTemplate_(action.to || '', ctx.payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const to = renderTemplate_(action.to || '', ctx.payload);
// EXPLAIN: Bu satırın görevi: const subject = renderTemplate_(action.subject_template || '', ctx.payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const subject = renderTemplate_(action.subject_template || '', ctx.payload);
// EXPLAIN: Bu satırın görevi: const body = renderTemplate_(action.body_template || '', ctx.payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const body = renderTemplate_(action.body_template || '', ctx.payload);
// EXPLAIN: Bu satırın görevi: GmailApp.sendEmail(to, subject, body);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  GmailApp.sendEmail(to, subject, body);
// EXPLAIN: Bu satırın görevi: return { action: 'SEND_EMAIL', to: to };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { action: 'SEND_EMAIL', to: to };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function handleCreateTask_(action, ctx) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function handleCreateTask_(action, ctx) {
// EXPLAIN: Bu satırın görevi: const title = renderTemplate_(action.title_template || '', ctx.payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const title = renderTemplate_(action.title_template || '', ctx.payload);
// EXPLAIN: Bu satırın görevi: const notes = renderTemplate_(action.notes_template || '', ctx.payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const notes = renderTemplate_(action.notes_template || '', ctx.payload);
// EXPLAIN: Bu satırın görevi: const dueDays = Number(action.due_days_offset || 0);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const dueDays = Number(action.due_days_offset || 0);
// EXPLAIN: Bu satırın görevi: const due = new Date();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const due = new Date();
// EXPLAIN: Bu satırın görevi: due.setDate(due.getDate() + dueDays);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  due.setDate(due.getDate() + dueDays);
// EXPLAIN: Bu satırın görevi: const task = TasksApp.getDefaultTaskList().createTask(title, { notes: notes, due: due });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const task = TasksApp.getDefaultTaskList().createTask(title, { notes: notes, due: due });
// EXPLAIN: Bu satırın görevi: return { action: 'CREATE_TASK', task_id: task.getId() };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { action: 'CREATE_TASK', task_id: task.getId() };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function handleCreateCalendarEvent_(action, ctx) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function handleCreateCalendarEvent_(action, ctx) {
// EXPLAIN: Bu satırın görevi: const calendarId = action.calendar_id || CalendarApp.getDefaultCalendar().getId();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const calendarId = action.calendar_id || CalendarApp.getDefaultCalendar().getId();
// EXPLAIN: Bu satırın görevi: const calendar = CalendarApp.getCalendarById(calendarId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const calendar = CalendarApp.getCalendarById(calendarId);
// EXPLAIN: Bu satırın görevi: const title = renderTemplate_(action.title_template || '', ctx.payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const title = renderTemplate_(action.title_template || '', ctx.payload);
// EXPLAIN: Bu satırın görevi: const startOffset = Number(action.start_minutes_offset || 0);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const startOffset = Number(action.start_minutes_offset || 0);
// EXPLAIN: Bu satırın görevi: const duration = Number(action.duration_minutes || 30);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const duration = Number(action.duration_minutes || 30);
// EXPLAIN: Bu satırın görevi: const start = new Date();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const start = new Date();
// EXPLAIN: Bu satırın görevi: start.setMinutes(start.getMinutes() + startOffset);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  start.setMinutes(start.getMinutes() + startOffset);
// EXPLAIN: Bu satırın görevi: const end = new Date(start.getTime() + duration * 60000);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const end = new Date(start.getTime() + duration * 60000);
// EXPLAIN: Bu satırın görevi: const guests = renderTemplate_(action.guests_csv || '', ctx.payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const guests = renderTemplate_(action.guests_csv || '', ctx.payload);
// EXPLAIN: Bu satırın görevi: const eventOptions = guests ? { guests: guests } : {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const eventOptions = guests ? { guests: guests } : {};
// EXPLAIN: Bu satırın görevi: const event = calendar.createEvent(title, start, end, eventOptions);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const event = calendar.createEvent(title, start, end, eventOptions);
// EXPLAIN: Bu satırın görevi: return { action: 'CREATE_CAL_EVENT', event_id: event.getId() };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { action: 'CREATE_CAL_EVENT', event_id: event.getId() };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function handleUpdateSheet_(action, ctx) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function handleUpdateSheet_(action, ctx) {
// EXPLAIN: Bu satırın görevi: const ss = SpreadsheetApp.getActiveSpreadsheet();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const ss = SpreadsheetApp.getActiveSpreadsheet();
// EXPLAIN: Bu satırın görevi: const sheet = ss.getSheetByName(action.sheet);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = ss.getSheetByName(action.sheet);
// EXPLAIN: Bu satırın görevi: if (!sheet) throw new Error('Sheet not found: ' + action.sheet);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) throw new Error('Sheet not found: ' + action.sheet);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
// EXPLAIN: Bu satırın görevi: const lookupField = action.lookup_field;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const lookupField = action.lookup_field;
// EXPLAIN: Bu satırın görevi: const lookupValue = renderTemplate_(action.lookup_value_template || '', ctx.payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const lookupValue = renderTemplate_(action.lookup_value_template || '', ctx.payload);
// EXPLAIN: Bu satırın görevi: const updates = parseJsonSafe_(action.updates_json) || {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const updates = parseJsonSafe_(action.updates_json) || {};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: for (let i = 1; i < data.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: Bu satırın görevi: if (String(data[i][headers.indexOf(lookupField)]) === String(lookupValue)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (String(data[i][headers.indexOf(lookupField)]) === String(lookupValue)) {
// EXPLAIN: Bu satırın görevi: Object.keys(updates).forEach(key => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      Object.keys(updates).forEach(key => {
// EXPLAIN: Bu satırın görevi: const col = headers.indexOf(key);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        const col = headers.indexOf(key);
// EXPLAIN: Bu satırın görevi: if (col !== -1) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        if (col !== -1) {
// EXPLAIN: Bu satırın görevi: const value = renderTemplate_(updates[key], ctx.payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          const value = renderTemplate_(updates[key], ctx.payload);
// EXPLAIN: Bu satırın görevi: sheet.getRange(i + 1, col + 1).setValue(value);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          sheet.getRange(i + 1, col + 1).setValue(value);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        }
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      });
// EXPLAIN: Bu satırın görevi: return { action: 'UPDATE_SHEET', sheet: action.sheet, row: i + 1 };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return { action: 'UPDATE_SHEET', sheet: action.sheet, row: i + 1 };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: return { action: 'UPDATE_SHEET', sheet: action.sheet, row: null };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { action: 'UPDATE_SHEET', sheet: action.sheet, row: null };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function handleCreateDocFromTemplate_(action, ctx) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function handleCreateDocFromTemplate_(action, ctx) {
// EXPLAIN: Bu satırın görevi: const templateId = action.template_doc_id;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const templateId = action.template_doc_id;
// EXPLAIN: Bu satırın görevi: const folderId = action.output_folder_id;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const folderId = action.output_folder_id;
// EXPLAIN: Bu satırın görevi: const filename = renderTemplate_(action.filename_template || 'Document', ctx.payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const filename = renderTemplate_(action.filename_template || 'Document', ctx.payload);
// EXPLAIN: Bu satırın görevi: const templateFile = DriveApp.getFileById(templateId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const templateFile = DriveApp.getFileById(templateId);
// EXPLAIN: Bu satırın görevi: const folder = DriveApp.getFolderById(folderId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const folder = DriveApp.getFolderById(folderId);
// EXPLAIN: Bu satırın görevi: const copy = templateFile.makeCopy(filename, folder);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const copy = templateFile.makeCopy(filename, folder);
// EXPLAIN: Bu satırın görevi: const doc = DocumentApp.openById(copy.getId());. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const doc = DocumentApp.openById(copy.getId());
// EXPLAIN: Bu satırın görevi: replaceDocPlaceholders_(doc, ctx.payload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  replaceDocPlaceholders_(doc, ctx.payload);
// EXPLAIN: Bu satırın görevi: doc.saveAndClose();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  doc.saveAndClose();
// EXPLAIN: Bu satırın görevi: return { action: 'CREATE_DOC_FROM_TEMPLATE', doc_id: copy.getId() };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { action: 'CREATE_DOC_FROM_TEMPLATE', doc_id: copy.getId() };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Render {{field}} templates with nested value support. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Render {{field}} templates with nested value support
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function renderTemplate_(template, data) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function renderTemplate_(template, data) {
// EXPLAIN: Bu satırın görevi: if (!template) return '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!template) return '';
// EXPLAIN: Bu satırın görevi: if (typeof template !== 'string') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (typeof template !== 'string') {
// EXPLAIN: Bu satırın görevi: return template;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return template;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: return String(template).replace(/{{\s*([^}]+)\s*}}/g, function(_, key) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return String(template).replace(/{{\s*([^}]+)\s*}}/g, function(_, key) {
// EXPLAIN: Bu satırın görevi: const value = getNestedValue_(data, key.trim());. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const value = getNestedValue_(data, key.trim());
// EXPLAIN: Bu satırın görevi: return value !== undefined && value !== null ? String(value) : '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return value !== undefined && value !== null ? String(value) : '';
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function getNestedValue_(obj, path) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function getNestedValue_(obj, path) {
// EXPLAIN: Bu satırın görevi: if (!obj || !path) return '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!obj || !path) return '';
// EXPLAIN: Bu satırın görevi: return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : ''), obj);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : ''), obj);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function replaceDocPlaceholders_(doc, data) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function replaceDocPlaceholders_(doc, data) {
// EXPLAIN: Bu satırın görevi: const body = doc.getBody();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const body = doc.getBody();
// EXPLAIN: Bu satırın görevi: const text = body.getText();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const text = body.getText();
// EXPLAIN: Bu satırın görevi: const matches = text.match(/{{\s*[^}]+\s*}}/g) || [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const matches = text.match(/{{\s*[^}]+\s*}}/g) || [];
// EXPLAIN: Bu satırın görevi: const unique = [...new Set(matches)];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const unique = [...new Set(matches)];
// EXPLAIN: Bu satırın görevi: for (const placeholder of unique) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const placeholder of unique) {
// EXPLAIN: Bu satırın görevi: const key = placeholder.replace(/{{|}}/g, '').trim();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const key = placeholder.replace(/{{|}}/g, '').trim();
// EXPLAIN: Bu satırın görevi: const value = getNestedValue_(data, key);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const value = getNestedValue_(data, key);
// EXPLAIN: Bu satırın görevi: body.replaceText(escapeRegex_(placeholder), value !== undefined && value !== null ? String(value) : '');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    body.replaceText(escapeRegex_(placeholder), value !== undefined && value !== null ? String(value) : '');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function escapeRegex_(value) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function escapeRegex_(value) {
// EXPLAIN: Bu satırın görevi: return String(value).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return String(value).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function isThrottled_(rule, ctx, minutes) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function isThrottled_(rule, ctx, minutes) {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RUNS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RUNS);
// EXPLAIN: Bu satırın görevi: if (!sheet) return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) return false;
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: if (data.length < 2) return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (data.length < 2) return false;
// EXPLAIN: Bu satırın görevi: const headers = data[0];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = data[0];
// EXPLAIN: Bu satırın görevi: const cutoff = new Date(Date.now() - minutes * 60000);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const cutoff = new Date(Date.now() - minutes * 60000);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (let i = data.length - 1; i >= 1; i--) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = data.length - 1; i >= 1; i--) {
// EXPLAIN: Bu satırın görevi: if (data[i][headers.indexOf('rule_id')] !== rule.rule_id) continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (data[i][headers.indexOf('rule_id')] !== rule.rule_id) continue;
// EXPLAIN: Bu satırın görevi: if (data[i][headers.indexOf('entity_id')] !== ctx.entity_id) continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (data[i][headers.indexOf('entity_id')] !== ctx.entity_id) continue;
// EXPLAIN: Bu satırın görevi: const ts = new Date(data[i][headers.indexOf('ts')]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const ts = new Date(data[i][headers.indexOf('ts')]);
// EXPLAIN: Bu satırın görevi: if (ts > cutoff) return true;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (ts > cutoff) return true;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return false;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: function logWorkflowRun_(rule, ctx, status, errorMessage, output) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function logWorkflowRun_(rule, ctx, status, errorMessage, output) {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RUNS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RUNS);
// EXPLAIN: Bu satırın görevi: if (!sheet) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) return;
// EXPLAIN: Bu satırın görevi: const headers = sheet.getDataRange().getValues()[0] || WF_HEADERS.WorkflowRuns;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = sheet.getDataRange().getValues()[0] || WF_HEADERS.WorkflowRuns;
// EXPLAIN: Bu satırın görevi: const record = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const record = {
// EXPLAIN: Bu satırın görevi: run_id: Utilities.getUuid(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    run_id: Utilities.getUuid(),
// EXPLAIN: Bu satırın görevi: ts: new Date().toISOString(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ts: new Date().toISOString(),
// EXPLAIN: Bu satırın görevi: rule_id: rule.rule_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    rule_id: rule.rule_id,
// EXPLAIN: Bu satırın görevi: entity_type: ctx.entity_type,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: ctx.entity_type,
// EXPLAIN: Bu satırın görevi: entity_id: ctx.entity_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: ctx.entity_id,
// EXPLAIN: Bu satırın görevi: status: status,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    status: status,
// EXPLAIN: Bu satırın görevi: error_message: errorMessage || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    error_message: errorMessage || '',
// EXPLAIN: Bu satırın görevi: output_json: JSON.stringify(output || {}). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    output_json: JSON.stringify(output || {})
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satırın görevi: sheet.appendRow(headers.map(h => record[h] || ''));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.appendRow(headers.map(h => record[h] || ''));
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Seed example workflow rules (3 examples). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Seed example workflow rules (3 examples)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function seedWorkflowRules_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function seedWorkflowRules_() {
// EXPLAIN: Bu satırın görevi: const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RULES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(WF_SHEETS.RULES);
// EXPLAIN: Bu satırın görevi: if (!sheet) throw new Error('WorkflowRules sheet missing');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) throw new Error('WorkflowRules sheet missing');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: sheet.appendRow([. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.appendRow([
// EXPLAIN: Bu satırın görevi: Utilities.getUuid(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Utilities.getUuid(),
// EXPLAIN: Bu satırın görevi: true,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    true,
// EXPLAIN: Bu satırın görevi: 'SHEET_EDIT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'SHEET_EDIT',
// EXPLAIN: Bu satırın görevi: JSON.stringify({ sheet: 'Opportunities', column: 'stage_id', from: 'NEW', to: 'QUALIFIED' }),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    JSON.stringify({ sheet: 'Opportunities', column: 'stage_id', from: 'NEW', to: 'QUALIFIED' }),
// EXPLAIN: Bu satırın görevi: JSON.stringify({ and: [{ field: 'value_amount', op: '>', value: 50000 }, { field: 'status', op: '=', value: 'open' }] }),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    JSON.stringify({ and: [{ field: 'value_amount', op: '>', value: 50000 }, { field: 'status', op: '=', value: 'open' }] }),
// EXPLAIN: Bu satırın görevi: JSON.stringify([. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    JSON.stringify([
// EXPLAIN: Bu satırın görevi: { type: 'CREATE_TASK', title_template: 'Follow-up {{title}}', notes_template: 'Stage upgraded', due_days_offset: 1 }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      { type: 'CREATE_TASK', title_template: 'Follow-up {{title}}', notes_template: 'Stage upgraded', due_days_offset: 1 }
// EXPLAIN: Bu satırın görevi: ]),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ]),
// EXPLAIN: Bu satırın görevi: 60. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    60
// EXPLAIN: Bu satırın görevi: ]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ]);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: sheet.appendRow([. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.appendRow([
// EXPLAIN: Bu satırın görevi: Utilities.getUuid(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Utilities.getUuid(),
// EXPLAIN: Bu satırın görevi: true,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    true,
// EXPLAIN: Bu satırın görevi: 'TIME',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'TIME',
// EXPLAIN: Bu satırın görevi: JSON.stringify({}),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    JSON.stringify({}),
// EXPLAIN: Bu satırın görevi: JSON.stringify({ and: [{ field: 'status', op: '=', value: 'open' }] }),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    JSON.stringify({ and: [{ field: 'status', op: '=', value: 'open' }] }),
// EXPLAIN: Bu satırın görevi: JSON.stringify([. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    JSON.stringify([
// EXPLAIN: Bu satırın görevi: { type: 'SEND_EMAIL', to: 'owner@example.com', subject_template: 'Daily open opps', body_template: 'Open opps check' }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      { type: 'SEND_EMAIL', to: 'owner@example.com', subject_template: 'Daily open opps', body_template: 'Open opps check' }
// EXPLAIN: Bu satırın görevi: ]),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ]),
// EXPLAIN: Bu satırın görevi: 1440. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    1440
// EXPLAIN: Bu satırın görevi: ]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ]);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: sheet.appendRow([. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.appendRow([
// EXPLAIN: Bu satırın görevi: Utilities.getUuid(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Utilities.getUuid(),
// EXPLAIN: Bu satırın görevi: true,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    true,
// EXPLAIN: Bu satırın görevi: 'FORM_SUBMIT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'FORM_SUBMIT',
// EXPLAIN: Bu satırın görevi: JSON.stringify({}),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    JSON.stringify({}),
// EXPLAIN: Bu satırın görevi: JSON.stringify({}),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    JSON.stringify({}),
// EXPLAIN: Bu satırın görevi: JSON.stringify([. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    JSON.stringify([
// EXPLAIN: Bu satırın görevi: { type: 'CREATE_DOC_FROM_TEMPLATE', template_doc_id: 'TEMPLATE_ID', output_folder_id: 'FOLDER_ID', filename_template: 'Lead {{email}}' }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      { type: 'CREATE_DOC_FROM_TEMPLATE', template_doc_id: 'TEMPLATE_ID', output_folder_id: 'FOLDER_ID', filename_template: 'Lead {{email}}' }
// EXPLAIN: Bu satırın görevi: ]),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ]),
// EXPLAIN: Bu satırın görevi: 0. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    0
// EXPLAIN: Bu satırın görevi: ]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ]);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
