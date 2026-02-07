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
 * Safely log evidence without throwing if logEvidence_ is missing.
 * @param {string} evidenceType - Type of evidence
 * @param {string} details - Evidence details
 */
function logEvidenceSafe_(evidenceType, details) {
  if (typeof logEvidence_ === 'function') {
    logEvidence_(evidenceType, details);
    return;
  }
  Logger.log('EVIDENCE | ' + evidenceType + ' | ' + details);
}

/**
 * Safely dump sheet evidence without throwing if dumpSheetEvidence_ is missing.
 * @param {string} sheetName - Sheet to dump
 * @param {number} startRow - Start row (1-based)
 * @param {number} numRows - Number of rows to dump
 */
function dumpSheetEvidenceSafe_(sheetName, startRow, numRows) {
  if (typeof dumpSheetEvidence_ === 'function') {
    dumpSheetEvidence_(sheetName, startRow, numRows);
    return;
  }
  Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | SKIPPED (missing dump helper)');
}

/**
 * Safely log job run without throwing if logJobRun_ is missing.
 * @param {Object} ctx - Job context with orch_run_id
 * @param {string} jobName - Name of the job
 * @param {string} cursorBefore - Cursor value before processing
 * @param {string} cursorAfter - Cursor value after processing
 * @param {string} notes - Notes (for failure: EXACT audit contract string)
 * @param {string} message - Additional message
 */
function logJobRunSafe_(ctx, jobName, cursorBefore, cursorAfter, notes, message) {
  try {
    if (typeof logJobRun_ === 'function') {
      logJobRun_(ctx, jobName, cursorBefore, cursorAfter, notes, message);
      return;
    }
  } catch (e) {
    // Fallback to Logger below when logJobRun_ is unavailable.
  }
  Logger.log('JOB_RUN_LOG | ' + jobName + ' | cursor: ' + cursorBefore + ' -> ' + cursorAfter +
             ' | notes=' + (notes || '') + ' | message=' + (message || ''));
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

/**
 * Build a job context safely without throwing if helper is missing.
 * @returns {Object} Job context
 */
function createJobContextSafe_() {
  if (typeof createJobContext_ === 'function') {
    return createJobContext_();
  }
  const timezone = (typeof cfg_ === 'function' && typeof DEFAULTS !== 'undefined')
    ? cfg_('TIMEZONE', DEFAULTS.TIMEZONE)
    : (typeof Session !== 'undefined' && Session.getScriptTimeZone ? Session.getScriptTimeZone() : 'UTC');
  const batchSize = (typeof cfg_ === 'function' && typeof DEFAULTS !== 'undefined')
    ? cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE)
    : 50;
  const startedAt = typeof nowIso_ === 'function'
    ? nowIso_(timezone)
    : Utilities.formatDate(new Date(), timezone, "yyyy-MM-dd'T'HH:mm:ssXXX");
  const orchRunId = typeof id_ === 'function'
    ? id_()
    : 'run_' + new Date().getTime();
  return {
    orch_run_id: orchRunId,
    started_at: startedAt,
    batch_size: batchSize
  };
}

/**
 * Safely get recent job runs.
 * @param {number} n - Number of entries
 * @returns {Array<Object>} Job run entries
 */
function getRecentJobRunsSafe_(n) {
  if (typeof getRecentJobRuns_ === 'function') {
    return getRecentJobRuns_(n);
  }
  if (typeof getSheetData_ !== 'function') {
    return [];
  }
  const data = getSheetData_(SHEETS.JOB_RUN_LOG);
  data.sort((a, b) => {
    if (a.created_at > b.created_at) return -1;
    if (a.created_at < b.created_at) return 1;
    return 0;
  });
  return data.slice(0, n || 10);
}

/**
 * Safely get an ISO timestamp using configured timezone.
 * @returns {string} ISO timestamp
 */
function nowIsoSafe_() {
  if (typeof nowIso_ === 'function') {
    const timezone = (typeof cfg_ === 'function' && typeof DEFAULTS !== 'undefined')
      ? cfg_('TIMEZONE', DEFAULTS.TIMEZONE)
      : (typeof Session !== 'undefined' && Session.getScriptTimeZone ? Session.getScriptTimeZone() : 'UTC');
    return nowIso_(timezone);
  }
  const timezone = (typeof cfg_ === 'function' && typeof DEFAULTS !== 'undefined')
    ? cfg_('TIMEZONE', DEFAULTS.TIMEZONE)
    : (typeof Session !== 'undefined' && Session.getScriptTimeZone ? Session.getScriptTimeZone() : 'UTC');
  return Utilities.formatDate(new Date(), timezone, "yyyy-MM-dd'T'HH:mm:ssXXX");
}

/**
 * Run a function with error boundary.
 * @param {string} label - Label for logging
 * @param {Function} fn - Function to run
 * @param {*} fallback - Fallback value on error
 * @returns {*}
 */
function runWithErrorBoundary_(label, fn, fallback) {
  try {
    return fn();
  } catch (e) {
    Logger.log('ERROR_BOUNDARY | ' + label + ' | ' + e.message);
    return fallback;
  }
}

/**
 * Check remaining email quota and send safely.
 * @param {string} to - Recipient
 * @param {string} subject - Email subject
 * @param {string} body - Email body
 * @returns {boolean} True if sent
 */
function sendEmailSafe_(to, subject, body) {
  const remaining = typeof MailApp !== 'undefined'
    ? MailApp.getRemainingDailyQuota()
    : 0;
  if (!to || remaining <= 0) {
    Logger.log('EMAIL | Skipped (quota or missing recipient)');
    return false;
  }
  GmailApp.sendEmail(to, subject, body);
  return true;
}

/**
 * Create a task using the Tasks advanced service.
 * @param {string} title - Task title
 * @param {string} notes - Task notes
 * @param {Date} due - Due date
 * @returns {Object|null} Task response
 */
function createTaskAdvanced_(title, notes, due) {
  const tasklists = Tasks.Tasklists.list();
  const listId = tasklists.items && tasklists.items.length > 0 ? tasklists.items[0].id : null;
  if (!listId) {
    Logger.log('TASKS | No task list available');
    return null;
  }
  const task = {
    title: title || '',
    notes: notes || '',
    due: due ? new Date(due).toISOString() : undefined
  };
  return Tasks.Tasks.insert(task, listId);
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
