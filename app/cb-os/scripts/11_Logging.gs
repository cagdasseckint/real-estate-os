// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS V1.0 - 11_Logging.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS V1.0 - 11_Logging.gs
// EXPLAIN: Bu satırın görevi: * Logging utilities for JOB_RUN_LOG and ops_log. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Logging utilities for JOB_RUN_LOG and ops_log
// EXPLAIN: Bu satırın görevi: * OPS_LOG timestamp standard: "YYYY-MM-DD HH:mm" (Europe/Istanbul). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * OPS_LOG timestamp standard: "YYYY-MM-DD HH:mm" (Europe/Istanbul)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Log a job run to JOB_RUN_LOG. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Log a job run to JOB_RUN_LOG
// EXPLAIN: Bu satırın görevi: * @param {Object} ctx - Job context with orch_run_id. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} ctx - Job context with orch_run_id
// EXPLAIN: Bu satırın görevi: * @param {string} jobName - Name of the job. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} jobName - Name of the job
// EXPLAIN: Bu satırın görevi: * @param {string} cursorBefore - Cursor value before processing. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} cursorBefore - Cursor value before processing
// EXPLAIN: Bu satırın görevi: * @param {string} cursorAfter - Cursor value after processing. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} cursorAfter - Cursor value after processing
// EXPLAIN: Bu satırın görevi: * @param {string} notes - Notes (for failure: EXACT audit contract string). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} notes - Notes (for failure: EXACT audit contract string)
// EXPLAIN: Bu satırın görevi: * @param {string} message - Additional message. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} message - Additional message
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function logJobRun_(ctx, jobName, cursorBefore, cursorAfter, notes, message) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function logJobRun_(ctx, jobName, cursorBefore, cursorAfter, notes, message) {
// EXPLAIN: Bu satırın görevi: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const logRow = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const logRow = {
// EXPLAIN: Bu satırın görevi: created_at: now,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    created_at: now,
// EXPLAIN: Bu satırın görevi: job_name: jobName,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    job_name: jobName,
// EXPLAIN: Bu satırın görevi: orch_run_id: ctx?.orch_run_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    orch_run_id: ctx?.orch_run_id || '',
// EXPLAIN: Bu satırın görevi: cursor_before: cursorBefore || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    cursor_before: cursorBefore || '',
// EXPLAIN: Bu satırın görevi: cursor_after: cursorAfter || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    cursor_after: cursorAfter || '',
// EXPLAIN: Bu satırın görevi: notes: notes || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    notes: notes || '',
// EXPLAIN: Bu satırın görevi: message: message || ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    message: message || ''
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: appendRow_(SHEETS.JOB_RUN_LOG, logRow);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  appendRow_(SHEETS.JOB_RUN_LOG, logRow);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('JOB_RUN_LOG | ' + jobName + ' | cursor: ' + cursorBefore + ' -> ' + cursorAfter);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('JOB_RUN_LOG | ' + jobName + ' | cursor: ' + cursorBefore + ' -> ' + cursorAfter);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Format ops_log timestamp as "YYYY-MM-DD HH:mm" in Europe/Istanbul. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Format ops_log timestamp as "YYYY-MM-DD HH:mm" in Europe/Istanbul
// EXPLAIN: Bu satırın görevi: * @returns {string} Formatted timestamp. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {string} Formatted timestamp
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function opsLogTimestamp_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function opsLogTimestamp_() {
// EXPLAIN: Bu satırın görevi: const tz = cfg_('TIMEZONE', DEFAULTS.TIMEZONE);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const tz = cfg_('TIMEZONE', DEFAULTS.TIMEZONE);
// EXPLAIN: Bu satırın görevi: const now = new Date();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const now = new Date();
// EXPLAIN: Bu satırın görevi: return Utilities.formatDate(now, tz, 'yyyy-MM-dd HH:mm');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return Utilities.formatDate(now, tz, 'yyyy-MM-dd HH:mm');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Log ops_log entry to Logger (audit-only scope). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Log ops_log entry to Logger (audit-only scope)
// EXPLAIN: Bu satırın görevi: * Format: "YYYY-MM-DD HH:mm | ops_log | scope=audit_only | idempotency_key=- | NNO-1=PASS/FAIL | checked_by=<...> | notes=...". Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Format: "YYYY-MM-DD HH:mm | ops_log | scope=audit_only | idempotency_key=- | NNO-1=PASS/FAIL | checked_by=<...> | notes=..."
// EXPLAIN: Bu satırın görevi: * @param {Object} params - Log parameters. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} params - Log parameters
// EXPLAIN: Bu satırın görevi: * @param {string} params.scope - Scope (must be from ALLOWED_SCOPES). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} params.scope - Scope (must be from ALLOWED_SCOPES)
// EXPLAIN: Bu satırın görevi: * @param {string} params.idempotency_key - Idempotency key or "-". Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} params.idempotency_key - Idempotency key or "-"
// EXPLAIN: Bu satırın görevi: * @param {string} params.nno1_result - NNO-1 result (PASS/FAIL). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} params.nno1_result - NNO-1 result (PASS/FAIL)
// EXPLAIN: Bu satırın görevi: * @param {string} params.checked_by - Who checked. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} params.checked_by - Who checked
// EXPLAIN: Bu satırın görevi: * @param {string} params.notes - Additional notes. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} params.notes - Additional notes
// EXPLAIN: Bu satırın görevi: * @param {string} params.risk_flags - Risk flags CSV or "-". Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} params.risk_flags - Risk flags CSV or "-"
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function opsLog_(params) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function opsLog_(params) {
// EXPLAIN: Bu satırın görevi: const timestamp = opsLogTimestamp_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const timestamp = opsLogTimestamp_();
// EXPLAIN: Bu satırın görevi: const scope = params.scope || 'audit_only';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const scope = params.scope || 'audit_only';
// EXPLAIN: Bu satırın görevi: const idempotencyKey = params.idempotency_key || '-';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const idempotencyKey = params.idempotency_key || '-';
// EXPLAIN: Bu satırın görevi: const nno1Result = params.nno1_result || 'UNKNOWN';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const nno1Result = params.nno1_result || 'UNKNOWN';
// EXPLAIN: Bu satırın görevi: const checkedBy = params.checked_by || cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const checkedBy = params.checked_by || cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent');
// EXPLAIN: Bu satırın görevi: const notes = params.notes || '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const notes = params.notes || '';
// EXPLAIN: Bu satırın görevi: const riskFlags = params.risk_flags || '-';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const riskFlags = params.risk_flags || '-';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Validate scope. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Validate scope
// EXPLAIN: Bu satırın görevi: if (!ALLOWED_SCOPES.includes(scope)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!ALLOWED_SCOPES.includes(scope)) {
// EXPLAIN: Bu satırın görevi: Logger.log('OPS_LOG | WARNING: Invalid scope "' + scope + '", using audit_only');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('OPS_LOG | WARNING: Invalid scope "' + scope + '", using audit_only');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const logLine = timestamp + ' | ops_log | scope=' + scope +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const logLine = timestamp + ' | ops_log | scope=' + scope + 
// EXPLAIN: Bu satırın görevi: ' | idempotency_key=' + idempotencyKey +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                  ' | idempotency_key=' + idempotencyKey + 
// EXPLAIN: Bu satırın görevi: ' | NNO-1=' + nno1Result +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                  ' | NNO-1=' + nno1Result + 
// EXPLAIN: Bu satırın görevi: ' | checked_by=' + checkedBy +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                  ' | checked_by=' + checkedBy + 
// EXPLAIN: Bu satırın görevi: ' | risk_flags=' + riskFlags +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                  ' | risk_flags=' + riskFlags +
// EXPLAIN: Bu satırın görevi: ' | notes=' + notes;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                  ' | notes=' + notes;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log(logLine);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log(logLine);
// EXPLAIN: Bu satırın görevi: return logLine;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return logLine;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Log smoke test result. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Log smoke test result
// EXPLAIN: Bu satırın görevi: * Format: "SMOKE_TEST | <test> | PASS/FAIL | <notes>". Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Format: "SMOKE_TEST | <test> | PASS/FAIL | <notes>"
// EXPLAIN: Bu satırın görevi: * NOTE: ops_log is NOT called here - Hard-rule #3 compliance. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * NOTE: ops_log is NOT called here - Hard-rule #3 compliance
// EXPLAIN: Bu satırın görevi: * @param {string} testName - Name of the test. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} testName - Name of the test
// EXPLAIN: Bu satırın görevi: * @param {boolean} passed - Whether test passed. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {boolean} passed - Whether test passed
// EXPLAIN: Bu satırın görevi: * @param {string} notes - Test notes. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} notes - Test notes
// EXPLAIN: Bu satırın görevi: * @returns {Object} Test result object. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Test result object
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function logSmokeTest_(testName, passed, notes) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function logSmokeTest_(testName, passed, notes) {
// EXPLAIN: Bu satırın görevi: const result = passed ? 'PASS' : 'FAIL';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const result = passed ? 'PASS' : 'FAIL';
// EXPLAIN: Bu satırın görevi: const logLine = 'SMOKE_TEST | ' + testName + ' | ' + result + ' | ' + (notes || '');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const logLine = 'SMOKE_TEST | ' + testName + ' | ' + result + ' | ' + (notes || '');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log(logLine);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log(logLine);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Optionally write to SMOKE_TEST_LOG sheet. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Optionally write to SMOKE_TEST_LOG sheet
// EXPLAIN: Bu satırın görevi: const logSheet = sheet_(SHEETS.SMOKE_TEST_LOG, true);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const logSheet = sheet_(SHEETS.SMOKE_TEST_LOG, true);
// EXPLAIN: Bu satırın görevi: if (logSheet) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (logSheet) {
// EXPLAIN: Bu satırın görevi: appendRow_(SHEETS.SMOKE_TEST_LOG, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    appendRow_(SHEETS.SMOKE_TEST_LOG, {
// EXPLAIN: Bu satırın görevi: run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: Bu satırın görevi: test_name: testName,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      test_name: testName,
// EXPLAIN: Bu satırın görevi: result: result,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      result: result,
// EXPLAIN: Bu satırın görevi: notes: notes || ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      notes: notes || ''
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return { testName: testName, result: result, notes: notes, risk_flags: [] };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { testName: testName, result: result, notes: notes, risk_flags: [] };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Log evidence line for audit trail. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Log evidence line for audit trail
// EXPLAIN: Bu satırın görevi: * Format: "EVIDENCE | <type> | <details>". Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Format: "EVIDENCE | <type> | <details>"
// EXPLAIN: Bu satırın görevi: * @param {string} evidenceType - Type of evidence. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} evidenceType - Type of evidence
// EXPLAIN: Bu satırın görevi: * @param {string} details - Evidence details. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} details - Evidence details
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function logEvidence_(evidenceType, details) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function logEvidence_(evidenceType, details) {
// EXPLAIN: Bu satırın görevi: const logLine = 'EVIDENCE | ' + evidenceType + ' | ' + details;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const logLine = 'EVIDENCE | ' + evidenceType + ' | ' + details;
// EXPLAIN: Bu satırın görevi: Logger.log(logLine);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log(logLine);
// EXPLAIN: Bu satırın görevi: return logLine;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return logLine;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Dump sheet rows to Logger as evidence. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Dump sheet rows to Logger as evidence
// EXPLAIN: Bu satırın görevi: * @param {string} sheetName - Sheet to dump. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} sheetName - Sheet to dump
// EXPLAIN: Bu satırın görevi: * @param {number} startRow - Start row (1-based). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {number} startRow - Start row (1-based)
// EXPLAIN: Bu satırın görevi: * @param {number} numRows - Number of rows to dump. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {number} numRows - Number of rows to dump
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function dumpSheetEvidence_(sheetName, startRow, numRows) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function dumpSheetEvidence_(sheetName, startRow, numRows) {
// EXPLAIN: Bu satırın görevi: const sheet = sheet_(sheetName, false);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = sheet_(sheetName, false);
// EXPLAIN: Bu satırın görevi: if (!sheet) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) {
// EXPLAIN: Bu satırın görevi: Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | NOT_FOUND');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | NOT_FOUND');
// EXPLAIN: Bu satırın görevi: return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const lastRow = sheet.getLastRow();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const lastRow = sheet.getLastRow();
// EXPLAIN: Bu satırın görevi: const lastCol = sheet.getLastColumn();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const lastCol = sheet.getLastColumn();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (lastRow < startRow) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (lastRow < startRow) {
// EXPLAIN: Bu satırın görevi: Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | NO_DATA_IN_RANGE');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | NO_DATA_IN_RANGE');
// EXPLAIN: Bu satırın görevi: return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const endRow = Math.min(startRow + numRows - 1, lastRow);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const endRow = Math.min(startRow + numRows - 1, lastRow);
// EXPLAIN: Bu satırın görevi: const data = sheet.getRange(startRow, 1, endRow - startRow + 1, lastCol).getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getRange(startRow, 1, endRow - startRow + 1, lastCol).getValues();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | rows ' + startRow + '-' + endRow);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('EVIDENCE | SHEET_DUMP | ' + sheetName + ' | rows ' + startRow + '-' + endRow);
// EXPLAIN: Bu satırın görevi: for (let i = 0; i < data.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = 0; i < data.length; i++) {
// EXPLAIN: Bu satırın görevi: Logger.log('EVIDENCE | ' + sheetName + ' | row_' + (startRow + i) + ' | ' + JSON.stringify(data[i]));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('EVIDENCE | ' + sheetName + ' | row_' + (startRow + i) + ' | ' + JSON.stringify(data[i]));
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Get the last N JOB_RUN_LOG entries. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Get the last N JOB_RUN_LOG entries
// EXPLAIN: Bu satırın görevi: * @param {number} n - Number of entries. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {number} n - Number of entries
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Log entries. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Array<Object>} Log entries
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function getRecentJobRuns_(n) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function getRecentJobRuns_(n) {
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.JOB_RUN_LOG);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const allData = getSheetData_(SHEETS.JOB_RUN_LOG);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Sort by created_at DESC. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Sort by created_at DESC
// EXPLAIN: Bu satırın görevi: allData.sort((a, b) => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  allData.sort((a, b) => {
// EXPLAIN: Bu satırın görevi: if (a.created_at > b.created_at) return -1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (a.created_at > b.created_at) return -1;
// EXPLAIN: Bu satırın görevi: if (a.created_at < b.created_at) return 1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (a.created_at < b.created_at) return 1;
// EXPLAIN: Bu satırın görevi: return 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return 0;
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return allData.slice(0, n || 10);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return allData.slice(0, n || 10);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Create a context object for job execution. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Create a context object for job execution
// EXPLAIN: Bu satırın görevi: * @param {string} orchRunId - Orchestrator run ID (optional, will generate if not provided). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} orchRunId - Orchestrator run ID (optional, will generate if not provided)
// EXPLAIN: Bu satırın görevi: * @returns {Object} Job context. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Job context
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function createJobContext_(orchRunId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function createJobContext_(orchRunId) {
// EXPLAIN: Bu satırın görevi: return {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return {
// EXPLAIN: Bu satırın görevi: orch_run_id: orchRunId || id_(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    orch_run_id: orchRunId || id_(),
// EXPLAIN: Bu satırın görevi: started_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    started_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: Bu satırın görevi: batch_size: cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    batch_size: cfg_('ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE)
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
