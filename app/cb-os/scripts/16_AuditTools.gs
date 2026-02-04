// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 16_AuditTools.gs
 * CB-OS V1.0 - 16_AuditTools.gs
// EXPLAIN: * Audit checks - Appendix A FINAL compliant
 * Audit checks - Appendix A FINAL compliant
// EXPLAIN: * ops_log scope=audit_only
 * ops_log scope=audit_only
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Run all audit checks
 * Run all audit checks
// EXPLAIN: * @returns {Object} Audit results with NNO-1 status
 * @returns {Object} Audit results with NNO-1 status
// EXPLAIN: */
 */
// EXPLAIN: function runAuditChecks() {
function runAuditChecks() {
// EXPLAIN: Logger.log('========== AUDIT CHECKS START ==========');
  Logger.log('========== AUDIT CHECKS START ==========');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const results = {
  const results = {
// EXPLAIN: run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),
    checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),
// EXPLAIN: checks: [],
    checks: [],
// EXPLAIN: nno1_result: 'PASS',
    nno1_result: 'PASS',
// EXPLAIN: risk_flags: []
    risk_flags: []
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Check 1: received_at format validation
  // Check 1: received_at format validation
// EXPLAIN: results.checks.push(audit_receivedAtFormat_());
  results.checks.push(audit_receivedAtFormat_());
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Check 2: received_at offset consistency (no mix)
  // Check 2: received_at offset consistency (no mix)
// EXPLAIN: results.checks.push(audit_offsetConsistency_());
  results.checks.push(audit_offsetConsistency_());
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Check 3: cursor order in JOB_RUN_LOG
  // Check 3: cursor order in JOB_RUN_LOG
// EXPLAIN: results.checks.push(audit_cursorOrder_());
  results.checks.push(audit_cursorOrder_());
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Check 4: audit contract string exact match
  // Check 4: audit contract string exact match
// EXPLAIN: results.checks.push(audit_contractStringExact_());
  results.checks.push(audit_contractStringExact_());
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Determine NNO-1 result
  // Determine NNO-1 result
// EXPLAIN: for (const check of results.checks) {
  for (const check of results.checks) {
// EXPLAIN: if (check.result === 'FAIL') {
    if (check.result === 'FAIL') {
// EXPLAIN: results.nno1_result = 'FAIL';
      results.nno1_result = 'FAIL';
// EXPLAIN: }
    }
// EXPLAIN: if (check.risk_flags && check.risk_flags.length > 0) {
    if (check.risk_flags && check.risk_flags.length > 0) {
// EXPLAIN: results.risk_flags = results.risk_flags.concat(check.risk_flags);
      results.risk_flags = results.risk_flags.concat(check.risk_flags);
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // E-005 fix: Handle checked_by BEFORE formatting risk_flags string
  // E-005 fix: Handle checked_by BEFORE formatting risk_flags string
// EXPLAIN: // This ensures CHECKED_BY_NO_HANDLE is included in ops_log output
  // This ensures CHECKED_BY_NO_HANDLE is included in ops_log output
// EXPLAIN: let checkedBy = results.checked_by;
  let checkedBy = results.checked_by;
// EXPLAIN: if (!checkedBy || checkedBy === '' || checkedBy === '(-)') {
  if (!checkedBy || checkedBy === '' || checkedBy === '(-)') {
// EXPLAIN: if (!results.risk_flags.includes('CHECKED_BY_NO_HANDLE')) {
    if (!results.risk_flags.includes('CHECKED_BY_NO_HANDLE')) {
// EXPLAIN: results.risk_flags.push('CHECKED_BY_NO_HANDLE');
      results.risk_flags.push('CHECKED_BY_NO_HANDLE');
// EXPLAIN: }
    }
// EXPLAIN: checkedBy = '(-)';
    checkedBy = '(-)';
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Format risk_flags (now includes all flags including CHECKED_BY_NO_HANDLE)
  // Format risk_flags (now includes all flags including CHECKED_BY_NO_HANDLE)
// EXPLAIN: const riskFlagsStr = results.risk_flags.length > 0 ?
  const riskFlagsStr = results.risk_flags.length > 0 ? 
// EXPLAIN: results.risk_flags.join(',') : '-';
                       results.risk_flags.join(',') : '-';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('========== AUDIT CHECKS END ==========');
  Logger.log('========== AUDIT CHECKS END ==========');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Write ops_log (audit_only scope)
  // Write ops_log (audit_only scope)
// EXPLAIN: opsLog_({
  opsLog_({
// EXPLAIN: scope: 'audit_only',
    scope: 'audit_only',
// EXPLAIN: idempotency_key: '-',
    idempotency_key: '-',
// EXPLAIN: nno1_result: results.nno1_result,
    nno1_result: results.nno1_result,
// EXPLAIN: checked_by: checkedBy,
    checked_by: checkedBy,
// EXPLAIN: risk_flags: riskFlagsStr,
    risk_flags: riskFlagsStr,
// EXPLAIN: notes: 'Audit run completed. Checks: ' + results.checks.length +
    notes: 'Audit run completed. Checks: ' + results.checks.length + 
// EXPLAIN: ', Passed: ' + results.checks.filter(c => c.result === 'PASS').length
           ', Passed: ' + results.checks.filter(c => c.result === 'PASS').length
// EXPLAIN: });
  });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return results;
  return results;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Audit Check 1: received_at format validation
 * Audit Check 1: received_at format validation
// EXPLAIN: * Format: yyyy-MM-dd'T'HH:mm:ssXXX
 * Format: yyyy-MM-dd'T'HH:mm:ssXXX
// EXPLAIN: */
 */
// EXPLAIN: function audit_receivedAtFormat_() {
function audit_receivedAtFormat_() {
// EXPLAIN: const checkName = 'received_at_format';
  const checkName = 'received_at_format';
// EXPLAIN: Logger.log('AUDIT | ' + checkName + ' | START');
  Logger.log('AUDIT | ' + checkName + ' | START');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const queueData = getSheetData_(SHEETS.INGEST_QUEUE);
  const queueData = getSheetData_(SHEETS.INGEST_QUEUE);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: let invalidCount = 0;
  let invalidCount = 0;
// EXPLAIN: const invalidExamples = [];
  const invalidExamples = [];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const row of queueData) {
  for (const row of queueData) {
// EXPLAIN: if (row.received_at && !isValidIsoFormat_(row.received_at)) {
    if (row.received_at && !isValidIsoFormat_(row.received_at)) {
// EXPLAIN: invalidCount++;
      invalidCount++;
// EXPLAIN: if (invalidExamples.length < 3) {
      if (invalidExamples.length < 3) {
// EXPLAIN: invalidExamples.push(row.received_at);
        invalidExamples.push(row.received_at);
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const passed = invalidCount === 0;
  const passed = invalidCount === 0;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('AUDIT | ' + checkName + ' | total=' + queueData.length +
  Logger.log('AUDIT | ' + checkName + ' | total=' + queueData.length + 
// EXPLAIN: ', invalid=' + invalidCount);
             ', invalid=' + invalidCount);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: if (!passed) {
  if (!passed) {
// EXPLAIN: Logger.log('AUDIT | ' + checkName + ' | examples: ' + invalidExamples.join(', '));
    Logger.log('AUDIT | ' + checkName + ' | examples: ' + invalidExamples.join(', '));
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return {
  return {
// EXPLAIN: name: checkName,
    name: checkName,
// EXPLAIN: result: passed ? 'PASS' : 'FAIL',
    result: passed ? 'PASS' : 'FAIL',
// EXPLAIN: details: {
    details: {
// EXPLAIN: total: queueData.length,
      total: queueData.length,
// EXPLAIN: invalid: invalidCount,
      invalid: invalidCount,
// EXPLAIN: examples: invalidExamples
      examples: invalidExamples
// EXPLAIN: }
    }
// EXPLAIN: };
  };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Audit Check 2: received_at offset consistency
 * Audit Check 2: received_at offset consistency
// EXPLAIN: * All timestamps should have the same offset (no mix)
 * All timestamps should have the same offset (no mix)
// EXPLAIN: */
 */
// EXPLAIN: function audit_offsetConsistency_() {
function audit_offsetConsistency_() {
// EXPLAIN: const checkName = 'received_at_offset_consistency';
  const checkName = 'received_at_offset_consistency';
// EXPLAIN: Logger.log('AUDIT | ' + checkName + ' | START');
  Logger.log('AUDIT | ' + checkName + ' | START');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const queueData = getSheetData_(SHEETS.INGEST_QUEUE);
  const queueData = getSheetData_(SHEETS.INGEST_QUEUE);
// EXPLAIN: const timestamps = queueData.map(row => row.received_at).filter(t => t);
  const timestamps = queueData.map(row => row.received_at).filter(t => t);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const validation = validateOffsetConsistency_(timestamps);
  const validation = validateOffsetConsistency_(timestamps);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('AUDIT | ' + checkName + ' | offsets_found=' + validation.offsets.join(',') +
  Logger.log('AUDIT | ' + checkName + ' | offsets_found=' + validation.offsets.join(',') + 
// EXPLAIN: ' | valid=' + validation.valid);
             ' | valid=' + validation.valid);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return {
  return {
// EXPLAIN: name: checkName,
    name: checkName,
// EXPLAIN: result: validation.valid ? 'PASS' : 'FAIL',
    result: validation.valid ? 'PASS' : 'FAIL',
// EXPLAIN: details: {
    details: {
// EXPLAIN: offsets: validation.offsets,
      offsets: validation.offsets,
// EXPLAIN: message: validation.message
      message: validation.message
// EXPLAIN: }
    }
// EXPLAIN: };
  };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Audit Check 3: cursor order in JOB_RUN_LOG
 * Audit Check 3: cursor order in JOB_RUN_LOG
// EXPLAIN: * cursor_after should be >= cursor_before for successful runs
 * cursor_after should be >= cursor_before for successful runs
// EXPLAIN: */
 */
// EXPLAIN: function audit_cursorOrder_() {
function audit_cursorOrder_() {
// EXPLAIN: const checkName = 'cursor_order';
  const checkName = 'cursor_order';
// EXPLAIN: Logger.log('AUDIT | ' + checkName + ' | START');
  Logger.log('AUDIT | ' + checkName + ' | START');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const riskFlags = [];
  const riskFlags = [];
// EXPLAIN: const jobRunData = getSheetData_(SHEETS.JOB_RUN_LOG);
  const jobRunData = getSheetData_(SHEETS.JOB_RUN_LOG);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: let violationCount = 0;
  let violationCount = 0;
// EXPLAIN: const violations = [];
  const violations = [];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const row of jobRunData) {
  for (const row of jobRunData) {
// EXPLAIN: // Skip failed runs (they intentionally don't advance cursor)
    // Skip failed runs (they intentionally don't advance cursor)
// EXPLAIN: if (row.notes === AUDIT_CONTRACT_STRING) {
    if (row.notes === AUDIT_CONTRACT_STRING) {
// EXPLAIN: continue;
      continue;
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Check cursor order
    // Check cursor order
// EXPLAIN: if (row.cursor_before && row.cursor_after) {
    if (row.cursor_before && row.cursor_after) {
// EXPLAIN: if (row.cursor_after < row.cursor_before) {
      if (row.cursor_after < row.cursor_before) {
// EXPLAIN: violationCount++;
        violationCount++;
// EXPLAIN: if (violations.length < 3) {
        if (violations.length < 3) {
// EXPLAIN: violations.push({
          violations.push({
// EXPLAIN: job: row.job_name,
            job: row.job_name,
// EXPLAIN: before: row.cursor_before,
            before: row.cursor_before,
// EXPLAIN: after: row.cursor_after
            after: row.cursor_after
// EXPLAIN: });
          });
// EXPLAIN: }
        }
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Check for notes field usage (fallback detection)
    // Check for notes field usage (fallback detection)
// EXPLAIN: // E-003 fix: dedupe risk_flags to prevent duplicates in CSV
    // E-003 fix: dedupe risk_flags to prevent duplicates in CSV
// EXPLAIN: if (!row.notes && row.message) {
    if (!row.notes && row.message) {
// EXPLAIN: // Message used instead of notes for non-failure
      // Message used instead of notes for non-failure
// EXPLAIN: if (!riskFlags.includes('JOBRUN_MESSAGE_USED')) {
      if (!riskFlags.includes('JOBRUN_MESSAGE_USED')) {
// EXPLAIN: riskFlags.push('JOBRUN_MESSAGE_USED');
        riskFlags.push('JOBRUN_MESSAGE_USED');
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const passed = violationCount === 0;
  const passed = violationCount === 0;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('AUDIT | ' + checkName + ' | violations=' + violationCount);
  Logger.log('AUDIT | ' + checkName + ' | violations=' + violationCount);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return {
  return {
// EXPLAIN: name: checkName,
    name: checkName,
// EXPLAIN: result: passed ? 'PASS' : 'FAIL',
    result: passed ? 'PASS' : 'FAIL',
// EXPLAIN: details: {
    details: {
// EXPLAIN: violations: violationCount,
      violations: violationCount,
// EXPLAIN: examples: violations
      examples: violations
// EXPLAIN: },
    },
// EXPLAIN: risk_flags: riskFlags
    risk_flags: riskFlags
// EXPLAIN: };
  };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Audit Check 4: audit contract string exact match
 * Audit Check 4: audit contract string exact match
// EXPLAIN: * When failure occurs, notes must be EXACTLY "stopped_on_first_failure (gap-free cursor)"
 * When failure occurs, notes must be EXACTLY "stopped_on_first_failure (gap-free cursor)"
// EXPLAIN: */
 */
// EXPLAIN: function audit_contractStringExact_() {
function audit_contractStringExact_() {
// EXPLAIN: const checkName = 'audit_string_exact';
  const checkName = 'audit_string_exact';
// EXPLAIN: Logger.log('AUDIT | ' + checkName + ' | START');
  Logger.log('AUDIT | ' + checkName + ' | START');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const jobRunData = getSheetData_(SHEETS.JOB_RUN_LOG);
  const jobRunData = getSheetData_(SHEETS.JOB_RUN_LOG);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: let failureRuns = 0;
  let failureRuns = 0;
// EXPLAIN: let correctString = 0;
  let correctString = 0;
// EXPLAIN: let incorrectExamples = [];
  let incorrectExamples = [];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: for (const row of jobRunData) {
  for (const row of jobRunData) {
// EXPLAIN: // Check if this looks like a failure run (has error indication in message)
    // Check if this looks like a failure run (has error indication in message)
// EXPLAIN: if (row.message && row.message.includes('Failed')) {
    if (row.message && row.message.includes('Failed')) {
// EXPLAIN: failureRuns++;
      failureRuns++;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: // Check notes field for exact string
      // Check notes field for exact string
// EXPLAIN: if (row.notes === AUDIT_CONTRACT_STRING) {
      if (row.notes === AUDIT_CONTRACT_STRING) {
// EXPLAIN: correctString++;
        correctString++;
// EXPLAIN: } else if (row.notes && incorrectExamples.length < 3) {
      } else if (row.notes && incorrectExamples.length < 3) {
// EXPLAIN: incorrectExamples.push(row.notes);
        incorrectExamples.push(row.notes);
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Pass if all failure runs have correct string, or no failures
  // Pass if all failure runs have correct string, or no failures
// EXPLAIN: const passed = failureRuns === 0 || correctString === failureRuns;
  const passed = failureRuns === 0 || correctString === failureRuns;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('AUDIT | ' + checkName + ' | failure_runs=' + failureRuns +
  Logger.log('AUDIT | ' + checkName + ' | failure_runs=' + failureRuns + 
// EXPLAIN: ', correct_string=' + correctString);
             ', correct_string=' + correctString);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return {
  return {
// EXPLAIN: name: checkName,
    name: checkName,
// EXPLAIN: result: passed ? 'PASS' : 'FAIL',
    result: passed ? 'PASS' : 'FAIL',
// EXPLAIN: details: {
    details: {
// EXPLAIN: failure_runs: failureRuns,
      failure_runs: failureRuns,
// EXPLAIN: correct_string_count: correctString,
      correct_string_count: correctString,
// EXPLAIN: expected: AUDIT_CONTRACT_STRING,
      expected: AUDIT_CONTRACT_STRING,
// EXPLAIN: incorrect_examples: incorrectExamples
      incorrect_examples: incorrectExamples
// EXPLAIN: }
    }
// EXPLAIN: };
  };
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Generate Evidence Pack for audit
 * Generate Evidence Pack for audit
// EXPLAIN: * @returns {Object} Evidence pack data
 * @returns {Object} Evidence pack data
// EXPLAIN: */
 */
// EXPLAIN: function generateEvidencePack() {
function generateEvidencePack() {
// EXPLAIN: Logger.log('========== EVIDENCE PACK GENERATION ==========');
  Logger.log('========== EVIDENCE PACK GENERATION ==========');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const pack = {
  const pack = {
// EXPLAIN: generated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    generated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // These would be filled by actual sheet access
    // These would be filled by actual sheet access
// EXPLAIN: // Using UNKNOWN/SKIPPED_BY_POLICY as per requirements
    // Using UNKNOWN/SKIPPED_BY_POLICY as per requirements
// EXPLAIN: foreign_new_count: 'UNKNOWN',
    foreign_new_count: 'UNKNOWN',
// EXPLAIN: missing_deps: 'SKIPPED_BY_POLICY',
    missing_deps: 'SKIPPED_BY_POLICY',
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: smoke_checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),
    smoke_checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Logger RAW will be captured during smoke/audit runs
    // Logger RAW will be captured during smoke/audit runs
// EXPLAIN: logger_raw: 'See Logger output from runSmokeTests() and runAuditChecks()',
    logger_raw: 'See Logger output from runSmokeTests() and runAuditChecks()',
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Audit ops_log RAW
    // Audit ops_log RAW
// EXPLAIN: audit_ops_log_raw: 'See Logger output from runAuditChecks()',
    audit_ops_log_raw: 'See Logger output from runAuditChecks()',
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: risk_flags: '-',
    risk_flags: '-',
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Sheet evidence
    // Sheet evidence
// EXPLAIN: sheet_evidence: 'See EVIDENCE lines in Logger output'
    sheet_evidence: 'See EVIDENCE lines in Logger output'
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('EVIDENCE_PACK | ' + JSON.stringify(pack));
  Logger.log('EVIDENCE_PACK | ' + JSON.stringify(pack));
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return pack;
  return pack;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Full audit run (smoke + audit + evidence)
 * Full audit run (smoke + audit + evidence)
// EXPLAIN: * @returns {Object} Complete audit results
 * @returns {Object} Complete audit results
// EXPLAIN: */
 */
// EXPLAIN: function runFullAudit() {
function runFullAudit() {
// EXPLAIN: Logger.log('>>>>>>>>>> FULL AUDIT START <<<<<<<<<<');
  Logger.log('>>>>>>>>>> FULL AUDIT START <<<<<<<<<<');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const fullResults = {
  const fullResults = {
// EXPLAIN: smoke: runSmokeTests(),
    smoke: runSmokeTests(),
// EXPLAIN: audit: runAuditChecks(),
    audit: runAuditChecks(),
// EXPLAIN: evidence: generateEvidencePack()
    evidence: generateEvidencePack()
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Combine results
  // Combine results
// EXPLAIN: fullResults.overall_status =
  fullResults.overall_status = 
// EXPLAIN: fullResults.smoke.failed === 0 && fullResults.audit.nno1_result === 'PASS'
    fullResults.smoke.failed === 0 && fullResults.audit.nno1_result === 'PASS' 
// EXPLAIN: ? 'PASS' : 'FAIL';
      ? 'PASS' : 'FAIL';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('>>>>>>>>>> FULL AUDIT END <<<<<<<<<<');
  Logger.log('>>>>>>>>>> FULL AUDIT END <<<<<<<<<<');
// EXPLAIN: Logger.log('FULL_AUDIT_RESULT | status=' + fullResults.overall_status);
  Logger.log('FULL_AUDIT_RESULT | status=' + fullResults.overall_status);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return fullResults;
  return fullResults;
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
