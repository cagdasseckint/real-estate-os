// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 11_Logging.gs
 * CB-OS V1.0 - 11_Logging.gs
// EXPLAIN: * Logging utilities for JOB_RUN_LOG and ops_log
 * Logging utilities for JOB_RUN_LOG and ops_log
// EXPLAIN: * OPS_LOG timestamp standard: "YYYY-MM-DD HH:mm" (Europe/Istanbul)
 * OPS_LOG timestamp standard: "YYYY-MM-DD HH:mm" (Europe/Istanbul)
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Log a job run to JOB_RUN_LOG
 * Log a job run to JOB_RUN_LOG
// EXPLAIN: * @param {Object} ctx - Job context with orch_run_id
 * @param {Object} ctx - Job context with orch_run_id
// EXPLAIN: * @param {string} jobName - Name of the job
 * @param {string} jobName - Name of the job
// EXPLAIN: * @param {string} cursorBefore - Cursor value before processing
 * @param {string} cursorBefore - Cursor value before processing
// EXPLAIN: * @param {string} cursorAfter - Cursor value after processing
 * @param {string} cursorAfter - Cursor value after processing
// EXPLAIN: * @param {string} notes - Notes (for failure: EXACT audit contract string)
 * @param {string} notes - Notes (for failure: EXACT audit contract string)
// EXPLAIN: * @param {string} message - Additional message
 * @param {string} message - Additional message
// EXPLAIN: */
 */
// EXPLAIN: function logJobRun_(ctx, jobName, cursorBefore, cursorAfter, notes, message) {
function logJobRun_(ctx, jobName, cursorBefore, cursorAfter, notes, message) {
// EXPLAIN: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const logRow = {
  const logRow = {
// EXPLAIN: created_at: now,
    created_at: now,
// EXPLAIN: job_name: jobName,
    job_name: jobName,
// EXPLAIN: orch_run_id: ctx?.orch_run_id || '',
    orch_run_id: ctx?.orch_run_id || '',
// EXPLAIN: cursor_before: cursorBefore || '',
    cursor_before: cursorBefore || '',
// EXPLAIN: cursor_after: cursorAfter || '',
    cursor_after: cursorAfter || '',
// EXPLAIN: notes: notes || '',
    notes: notes || '',
// EXPLAIN: message: message || ''
    message: message || ''
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: appendRow_(SHEETS.JOB_RUN_LOG, logRow);
  appendRow_(SHEETS.JOB_RUN_LOG, logRow);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('JOB_RUN_LOG | ' + jobName + ' | cursor: ' + cursorBefore + ' -> ' + cursorAfter);
  Logger.log('JOB_RUN_LOG | ' + jobName + ' | cursor: ' + cursorBefore + ' -> ' + cursorAfter);
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Format ops_log timestamp as "YYYY-MM-DD HH:mm" in Europe/Istanbul
 * Format ops_log timestamp as "YYYY-MM-DD HH:mm" in Europe/Istanbul
// EXPLAIN: * @returns {string} Formatted timestamp
 * @returns {string} Formatted timestamp
// EXPLAIN: */
 */
// EXPLAIN: function opsLogTimestamp_() {
function opsLogTimestamp_() {
// EXPLAIN: const tz = cfg_('TIMEZONE', DEFAULTS.TIMEZONE);
  const tz = cfg_('TIMEZONE', DEFAULTS.TIMEZONE);
// EXPLAIN: const now = new Date();
  const now = new Date();
// EXPLAIN: return Utilities.formatDate(now, tz, 'yyyy-MM-dd HH:mm');
  return Utilities.formatDate(now, tz, 'yyyy-MM-dd HH:mm');
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Log ops_log entry to Logger (audit-only scope)
 * Log ops_log entry to Logger (audit-only scope)
// EXPLAIN: * Format: "YYYY-MM-DD HH:mm | ops_log | scope=audit_only | idempotency_key=- | NNO-1=PASS/FAIL | checked_by=<...> | notes=..."
 * Format: "YYYY-MM-DD HH:mm | ops_log | scope=audit_only | idempotency_key=- | NNO-1=PASS/FAIL | checked_by=<...> | notes=..."
// EXPLAIN: * @param {Object} params - Log parameters
 * @param {Object} params - Log parameters
// EXPLAIN: * @param {string} params.scope - Scope (must be from ALLOWED_SCOPES)
 * @param {string} params.scope - Scope (must be from ALLOWED_SCOPES)
// EXPLAIN: * @param {string} params.idempotency_key - Idempotency key or "-"
 * @param {string} params.idempotency_key - Idempotency key or "-"
// EXPLAIN: * @param {string} params.nno1_result - NNO-1 result (PASS/FAIL)
 * @param {string} params.nno1_result - NNO-1 result (PASS/FAIL)
// EXPLAIN: * @param {string} params.checked_by - Who checked
 * @param {string} params.checked_by - Who checked
// EXPLAIN: * @param {string} params.notes - Additional notes
 * @param {string} params.notes - Additional notes
// EXPLAIN: * @param {string} params.risk_flags - Risk flags CSV or "-"
 * @param {string} params.risk_flags - Risk flags CSV or "-"
// EXPLAIN: */
 */
// EXPLAIN: function opsLog_(params) {
function opsLog_(params) {
// EXPLAIN: const timestamp = opsLogTimestamp_();
  const timestamp = opsLogTimestamp_();
// EXPLAIN: const scope = params.scope || 'audit_only';
  const scope = params.scope || 'audit_only';
// EXPLAIN: const idempotencyKey = params.idempotency_key || '-';
  const idempotencyKey = params.idempotency_key || '-';
// EXPLAIN: const nno1Result = params.nno1_result || 'UNKNOWN';
  const nno1Result = params.nno1_result || 'UNKNOWN';
// EXPLAIN: const checkedBy = params.checked_by || cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent');
  const checkedBy = params.checked_by || cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent');
// EXPLAIN: const notes = params.notes || '';
  const notes = params.notes || '';
// EXPLAIN: const riskFlags = params.risk_flags || '-';
  const riskFlags = params.risk_flags || '-';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Validate scope
  // Validate scope
// EXPLAIN: if (!ALLOWED_SCOPES.includes(scope)) {
  if (!ALLOWED_SCOPES.includes(scope)) {
// EXPLAIN: Logger.log('OPS_LOG | WARNING: Invalid scope "' + scope + '", using audit_only');
    Logger.log('OPS_LOG | WARNING: Invalid scope "' + scope + '", using audit_only');
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const logLine = timestamp + ' | ops_log | scope=' + scope +
  const logLine = timestamp + ' | ops_log | scope=' + scope + 
// EXPLAIN: ' | idempotency_key=' + idempotencyKey +
                  ' | idempotency_key=' + idempotencyKey + 
// EXPLAIN: ' | NNO-1=' + nno1Result +
                  ' | NNO-1=' + nno1Result + 
// EXPLAIN: ' | checked_by=' + checkedBy +
                  ' | checked_by=' + checkedBy + 
// EXPLAIN: ' | risk_flags=' + riskFlags +
                  ' | risk_flags=' + riskFlags +
// EXPLAIN: ' | notes=' + notes;
                  ' | notes=' + notes;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log(logLine);
  Logger.log(logLine);
// EXPLAIN: return logLine;
  return logLine;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Log smoke test result
 * Log smoke test result
// EXPLAIN: * Format: "SMOKE_TEST | <test> | PASS/FAIL | <notes>"
 * Format: "SMOKE_TEST | <test> | PASS/FAIL | <notes>"
// EXPLAIN: * NOTE: ops_log is NOT called here - Hard-rule #3 compliance
 * NOTE: ops_log is NOT called here - Hard-rule #3 compliance
// EXPLAIN: * @param {string} testName - Name of the test
 * @param {string} testName - Name of the test
// EXPLAIN: * @param {boolean} passed - Whether test passed
 * @param {boolean} passed - Whether test passed
// EXPLAIN: * @param {string} notes - Test notes
 * @param {string} notes - Test notes
// EXPLAIN: * @returns {Object} Test result object
 * @returns {Object} Test result object
// EXPLAIN: */
 */
// EXPLAIN: function logSmokeTest_(testName, passed, notes) {
function logSmokeTest_(testName, passed, notes) {
// EXPLAIN: const result = passed ? 'PASS' : 'FAIL';
  const result = passed ? 'PASS' : 'FAIL';
// EXPLAIN: const logLine = 'SMOKE_TEST | ' + testName + ' | ' + result + ' | ' + (notes || '');
  const logLine = 'SMOKE_TEST | ' + testName + ' | ' + result + ' | ' + (notes || '');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log(logLine);
  Logger.log(logLine);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Optionally write to SMOKE_TEST_LOG sheet
  // Optionally write to SMOKE_TEST_LOG sheet
// EXPLAIN: const logSheet = sheet_(SHEETS.SMOKE_TEST_LOG, true);
  const logSheet = sheet_(SHEETS.SMOKE_TEST_LOG, true);
// EXPLAIN: if (logSheet) {
  if (logSheet) {
// EXPLAIN: appendRow_(SHEETS.SMOKE_TEST_LOG, {
    appendRow_(SHEETS.SMOKE_TEST_LOG, {
// EXPLAIN: run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
      run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: test_name: testName,
      test_name: testName,
// EXPLAIN: result: result,
      result: result,
// EXPLAIN: notes: notes || ''
      notes: notes || ''
// EXPLAIN: });
    });
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return { testName: testName, result: result, notes: notes, risk_flags: [] };
  return { testName: testName, result: result, notes: notes, risk_flags: [] };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Log evidence line for audit trail
 * Log evidence line for audit trail
// EXPLAIN: * Format: "EVIDENCE | <type> | <details>"
 * Format: "EVIDENCE | <type> | <details>"
// EXPLAIN: * @param {string} evidenceType - Type of evidence
 * @param {string} evidenceType - Type of evidence
// EXPLAIN: * @param {string} details - Evidence details
 * @param {string} details - Evidence details
// EXPLAIN: */
 */
// EXPLAIN: function logEvidence_(evidenceType, details) {
function logEvidence_(evidenceType, details) {
// EXPLAIN: const logLine = 'EVIDENCE | ' + evidenceType + ' | ' + details;
  const logLine = 'EVIDENCE | ' + evidenceType + ' | ' + details;
// EXPLAIN: Logger.log(logLine);
  Logger.log(logLine);
// EXPLAIN: return logLine;
  return logLine;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Dump sheet rows to Logger as evidence
 * Dump sheet rows to Logger as evidence
// EXPLAIN: * @param {string} sheetName - Sheet to dump
 * @param {string} sheetName - Sheet to dump
// EXPLAIN: * @param {number} startRow - Start row (1-based)
 * @param {number} startRow - Start row (1-based)
// EXPLAIN: * @param {number} numRows - Number of rows to dump
 * @param {number} numRows - Number of rows to dump
// EXPLAIN: */
 */
// EXPLAIN: function dumpSheetEvidence_(sheetName, startRow, numRows) {
function dumpSheetEvidence_(sheetName, startRow, numRows) {
// EXPLAIN: const sheet = sheet_(sheetName, false);
  const sheet = sheet_(sheetName, false);
// EXPLAIN: if (!sheet) {
  if (!sheet) {
// EXPLAIN: Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | NOT_FOUND');
    Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | NOT_FOUND');
// EXPLAIN: return;
    return;
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const lastRow = sheet.getLastRow();
  const lastRow = sheet.getLastRow();
// EXPLAIN: const lastCol = sheet.getLastColumn();
  const lastCol = sheet.getLastColumn();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (lastRow < startRow) {
  if (lastRow < startRow) {
// EXPLAIN: Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | NO_DATA_IN_RANGE');
    Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | NO_DATA_IN_RANGE');
// EXPLAIN: return;
    return;
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const endRow = Math.min(startRow + numRows - 1, lastRow);
  const endRow = Math.min(startRow + numRows - 1, lastRow);
// EXPLAIN: const data = sheet.getRange(startRow, 1, endRow - startRow + 1, lastCol).getValues();
  const data = sheet.getRange(startRow, 1, endRow - startRow + 1, lastCol).getValues();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | rows ' + startRow + '-' + endRow);
  Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | rows ' + startRow + '-' + endRow);
// EXPLAIN: for (let i = 0; i < data.length; i++) {
  for (let i = 0; i < data.length; i++) {
// EXPLAIN: Logger.log('EVIDENCE | ' + sheetName + ' | row_' + (startRow + i) + ' | ' + JSON.stringify(data[i]));
    Logger.log('EVIDENCE | ' + sheetName + ' | row_' + (startRow + i) + ' | ' + JSON.stringify(data[i]));
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Get the last N JOB_RUN_LOG entries
 * Get the last N JOB_RUN_LOG entries
// EXPLAIN: * @param {number} n - Number of entries
 * @param {number} n - Number of entries
// EXPLAIN: * @returns {Array<Object>} Log entries
 * @returns {Array<Object>} Log entries
// EXPLAIN: */
 */
// EXPLAIN: function getRecentJobRuns_(n) {
function getRecentJobRuns_(n) {
// EXPLAIN: const allData = getSheetData_(SHEETS.JOB_RUN_LOG);
  const allData = getSheetData_(SHEETS.JOB_RUN_LOG);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Sort by created_at DESC
  // Sort by created_at DESC
// EXPLAIN: allData.sort((a, b) => {
  allData.sort((a, b) => {
// EXPLAIN: if (a.created_at > b.created_at) return -1;
    if (a.created_at > b.created_at) return -1;
// EXPLAIN: if (a.created_at < b.created_at) return 1;
    if (a.created_at < b.created_at) return 1;
// EXPLAIN: return 0;
    return 0;
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return allData.slice(0, n || 10);
  return allData.slice(0, n || 10);
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Create a context object for job execution
 * Create a context object for job execution
// EXPLAIN: * @param {string} orchRunId - Orchestrator run ID (optional, will generate if not provided)
 * @param {string} orchRunId - Orchestrator run ID (optional, will generate if not provided)
// EXPLAIN: * @returns {Object} Job context
 * @returns {Object} Job context
// EXPLAIN: */
 */
// EXPLAIN: function createJobContext_(orchRunId) {
function createJobContext_(orchRunId) {
// EXPLAIN: return {
  return {
// EXPLAIN: orch_run_id: orchRunId || id_(),
    orch_run_id: orchRunId || id_(),
// EXPLAIN: started_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    started_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: batch_size: cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE)
    batch_size: cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE)
// EXPLAIN: };
  };
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
