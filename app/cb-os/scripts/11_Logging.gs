/**
 * CB-OS V1.0 - 11_Logging.gs
 * Logging utilities for JOB_RUN_LOG and ops_log
 * OPS_LOG timestamp standard: "YYYY-MM-DD HH:mm" (Europe/Istanbul)
 */

/**
 * Log a job run to JOB_RUN_LOG
 * @param {Object} ctx - Job context with orch_run_id
 * @param {string} jobName - Name of the job
 * @param {string} cursorBefore - Cursor value before processing
 * @param {string} cursorAfter - Cursor value after processing
 * @param {string} notes - Notes (for failure: EXACT audit contract string)
 * @param {string} message - Additional message
 */
function logJobRun_(ctx, jobName, cursorBefore, cursorAfter, notes, message) {
  const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  
  const logRow = {
    created_at: now,
    job_name: jobName,
    orch_run_id: ctx?.orch_run_id || '',
    cursor_before: cursorBefore || '',
    cursor_after: cursorAfter || '',
    notes: notes || '',
    message: message || ''
  };
  
  appendRow_(SHEETS.JOB_RUN_LOG, logRow);
  
  Logger.log('JOB_RUN_LOG | ' + jobName + ' | cursor: ' + cursorBefore + ' -> ' + cursorAfter);
}

/**
 * Format ops_log timestamp as "YYYY-MM-DD HH:mm" in Europe/Istanbul
 * @returns {string} Formatted timestamp
 */
function opsLogTimestamp_() {
  const tz = cfg_('TIMEZONE', DEFAULTS.TIMEZONE);
  const now = new Date();
  return Utilities.formatDate(now, tz, 'yyyy-MM-dd HH:mm');
}

/**
 * Log ops_log entry to Logger (audit-only scope)
 * Format: "YYYY-MM-DD HH:mm | ops_log | scope=audit_only | idempotency_key=- | NNO-1=PASS/FAIL | checked_by=<...> | notes=..."
 * @param {Object} params - Log parameters
 * @param {string} params.scope - Scope (must be from ALLOWED_SCOPES)
 * @param {string} params.idempotency_key - Idempotency key or "-"
 * @param {string} params.nno1_result - NNO-1 result (PASS/FAIL)
 * @param {string} params.checked_by - Who checked
 * @param {string} params.notes - Additional notes
 * @param {string} params.risk_flags - Risk flags CSV or "-"
 */
function opsLog_(params) {
  const timestamp = opsLogTimestamp_();
  const scope = params.scope || 'audit_only';
  const idempotencyKey = params.idempotency_key || '-';
  const nno1Result = params.nno1_result || 'UNKNOWN';
  const checkedBy = params.checked_by || cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent');
  const notes = params.notes || '';
  const riskFlags = params.risk_flags || '-';
  
  // Validate scope
  if (!ALLOWED_SCOPES.includes(scope)) {
    Logger.log('OPS_LOG | WARNING: Invalid scope "' + scope + '", using audit_only');
  }
  
  const logLine = timestamp + ' | ops_log | scope=' + scope + 
                  ' | idempotency_key=' + idempotencyKey + 
                  ' | NNO-1=' + nno1Result + 
                  ' | checked_by=' + checkedBy + 
                  ' | risk_flags=' + riskFlags +
                  ' | notes=' + notes;
  
  Logger.log(logLine);
  return logLine;
}

/**
 * Log smoke test result
 * Format: "SMOKE_TEST | <test> | PASS/FAIL | <notes>"
 * NOTE: ops_log is NOT called here - Hard-rule #3 compliance
 * @param {string} testName - Name of the test
 * @param {boolean} passed - Whether test passed
 * @param {string} notes - Test notes
 * @returns {Object} Test result object
 */
function logSmokeTest_(testName, passed, notes) {
  const result = passed ? 'PASS' : 'FAIL';
  const logLine = 'SMOKE_TEST | ' + testName + ' | ' + result + ' | ' + (notes || '');
  
  Logger.log(logLine);
  
  // Optionally write to SMOKE_TEST_LOG sheet
  const logSheet = sheet_(SHEETS.SMOKE_TEST_LOG, true);
  if (logSheet) {
    appendRow_(SHEETS.SMOKE_TEST_LOG, {
      run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
      test_name: testName,
      result: result,
      notes: notes || ''
    });
  }
  
  return { testName: testName, result: result, notes: notes, risk_flags: [] };
}

/**
 * Log evidence line for audit trail
 * Format: "EVIDENCE | <type> | <details>"
 * @param {string} evidenceType - Type of evidence
 * @param {string} details - Evidence details
 */
function logEvidence_(evidenceType, details) {
  const logLine = 'EVIDENCE | ' + evidenceType + ' | ' + details;
  Logger.log(logLine);
  return logLine;
}

/**
 * Dump sheet rows to Logger as evidence
 * @param {string} sheetName - Sheet to dump
 * @param {number} startRow - Start row (1-based)
 * @param {number} numRows - Number of rows to dump
 */
function dumpSheetEvidence_(sheetName, startRow, numRows) {
  const sheet = sheet_(sheetName, false);
  if (!sheet) {
    Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | NOT_FOUND');
    return;
  }
  
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  
  if (lastRow < startRow) {
    Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | NO_DATA_IN_RANGE');
    return;
  }
  
  const endRow = Math.min(startRow + numRows - 1, lastRow);
  const data = sheet.getRange(startRow, 1, endRow - startRow + 1, lastCol).getValues();
  
  Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | rows ' + startRow + '-' + endRow);
  for (let i = 0; i < data.length; i++) {
    Logger.log('EVIDENCE | ' + sheetName + ' | row_' + (startRow + i) + ' | ' + JSON.stringify(data[i]));
  }
}

/**
 * Get the last N JOB_RUN_LOG entries
 * @param {number} n - Number of entries
 * @returns {Array<Object>} Log entries
 */
function getRecentJobRuns_(n) {
  const allData = getSheetData_(SHEETS.JOB_RUN_LOG);
  
  // Sort by created_at DESC
  allData.sort((a, b) => {
    if (a.created_at > b.created_at) return -1;
    if (a.created_at < b.created_at) return 1;
    return 0;
  });
  
  return allData.slice(0, n || 10);
}

/**
 * Create a context object for job execution
 * @param {string} orchRunId - Orchestrator run ID (optional, will generate if not provided)
 * @returns {Object} Job context
 */
function createJobContext_(orchRunId) {
  return {
    orch_run_id: orchRunId || id_(),
    started_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    batch_size: cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE)
  };
}
