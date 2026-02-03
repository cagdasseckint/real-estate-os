/**
 * CB-OS V1.0 - 16_AuditTools.gs
 * Audit checks - Appendix A FINAL compliant
 * ops_log scope=audit_only
 */

/**
 * Run all audit checks
 * @returns {Object} Audit results with NNO-1 status
 */
function runAuditChecks() {
  Logger.log('========== AUDIT CHECKS START ==========');
  
  const results = {
    run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),
    checks: [],
    nno1_result: 'PASS',
    risk_flags: []
  };
  
  // Check 1: received_at format validation
  results.checks.push(audit_receivedAtFormat_());
  
  // Check 2: received_at offset consistency (no mix)
  results.checks.push(audit_offsetConsistency_());
  
  // Check 3: cursor order in JOB_RUN_LOG
  results.checks.push(audit_cursorOrder_());
  
  // Check 4: audit contract string exact match
  results.checks.push(audit_contractStringExact_());
  
  // Determine NNO-1 result
  for (const check of results.checks) {
    if (check.result === 'FAIL') {
      results.nno1_result = 'FAIL';
    }
    if (check.risk_flags && check.risk_flags.length > 0) {
      results.risk_flags = results.risk_flags.concat(check.risk_flags);
    }
  }
  
  // E-005 fix: Handle checked_by BEFORE formatting risk_flags string
  // This ensures CHECKED_BY_NO_HANDLE is included in ops_log output
  let checkedBy = results.checked_by;
  if (!checkedBy || checkedBy === '' || checkedBy === '(-)') {
    if (!results.risk_flags.includes('CHECKED_BY_NO_HANDLE')) {
      results.risk_flags.push('CHECKED_BY_NO_HANDLE');
    }
    checkedBy = '(-)';
  }
  
  // Format risk_flags (now includes all flags including CHECKED_BY_NO_HANDLE)
  const riskFlagsStr = results.risk_flags.length > 0 ? 
                       results.risk_flags.join(',') : '-';
  
  Logger.log('========== AUDIT CHECKS END ==========');
  
  // Write ops_log (audit_only scope)
  opsLog_({
    scope: 'audit_only',
    idempotency_key: '-',
    nno1_result: results.nno1_result,
    checked_by: checkedBy,
    risk_flags: riskFlagsStr,
    notes: 'Audit run completed. Checks: ' + results.checks.length + 
           ', Passed: ' + results.checks.filter(c => c.result === 'PASS').length
  });
  
  return results;
}

/**
 * Audit Check 1: received_at format validation
 * Format: yyyy-MM-dd'T'HH:mm:ssXXX
 */
function audit_receivedAtFormat_() {
  const checkName = 'received_at_format';
  Logger.log('AUDIT | ' + checkName + ' | START');
  
  const queueData = getSheetData_(SHEETS.INGEST_QUEUE);
  
  let invalidCount = 0;
  const invalidExamples = [];
  
  for (const row of queueData) {
    if (row.received_at && !isValidIsoFormat_(row.received_at)) {
      invalidCount++;
      if (invalidExamples.length < 3) {
        invalidExamples.push(row.received_at);
      }
    }
  }
  
  const passed = invalidCount === 0;
  
  Logger.log('AUDIT | ' + checkName + ' | total=' + queueData.length + 
             ', invalid=' + invalidCount);
  
  if (!passed) {
    Logger.log('AUDIT | ' + checkName + ' | examples: ' + invalidExamples.join(', '));
  }
  
  return {
    name: checkName,
    result: passed ? 'PASS' : 'FAIL',
    details: {
      total: queueData.length,
      invalid: invalidCount,
      examples: invalidExamples
    }
  };
}

/**
 * Audit Check 2: received_at offset consistency
 * All timestamps should have the same offset (no mix)
 */
function audit_offsetConsistency_() {
  const checkName = 'received_at_offset_consistency';
  Logger.log('AUDIT | ' + checkName + ' | START');
  
  const queueData = getSheetData_(SHEETS.INGEST_QUEUE);
  const timestamps = queueData.map(row => row.received_at).filter(t => t);
  
  const validation = validateOffsetConsistency_(timestamps);
  
  Logger.log('AUDIT | ' + checkName + ' | offsets_found=' + validation.offsets.join(',') + 
             ' | valid=' + validation.valid);
  
  return {
    name: checkName,
    result: validation.valid ? 'PASS' : 'FAIL',
    details: {
      offsets: validation.offsets,
      message: validation.message
    }
  };
}

/**
 * Audit Check 3: cursor order in JOB_RUN_LOG
 * cursor_after should be >= cursor_before for successful runs
 */
function audit_cursorOrder_() {
  const checkName = 'cursor_order';
  Logger.log('AUDIT | ' + checkName + ' | START');
  
  const riskFlags = [];
  const jobRunData = getSheetData_(SHEETS.JOB_RUN_LOG);
  
  let violationCount = 0;
  const violations = [];
  
  for (const row of jobRunData) {
    // Skip failed runs (they intentionally don't advance cursor)
    if (row.notes === AUDIT_CONTRACT_STRING) {
      continue;
    }
    
    // Check cursor order
    if (row.cursor_before && row.cursor_after) {
      if (row.cursor_after < row.cursor_before) {
        violationCount++;
        if (violations.length < 3) {
          violations.push({
            job: row.job_name,
            before: row.cursor_before,
            after: row.cursor_after
          });
        }
      }
    }
    
    // Check for notes field usage (fallback detection)
    // E-003 fix: dedupe risk_flags to prevent duplicates in CSV
    if (!row.notes && row.message) {
      // Message used instead of notes for non-failure
      if (!riskFlags.includes('JOBRUN_MESSAGE_USED')) {
        riskFlags.push('JOBRUN_MESSAGE_USED');
      }
    }
  }
  
  const passed = violationCount === 0;
  
  Logger.log('AUDIT | ' + checkName + ' | violations=' + violationCount);
  
  return {
    name: checkName,
    result: passed ? 'PASS' : 'FAIL',
    details: {
      violations: violationCount,
      examples: violations
    },
    risk_flags: riskFlags
  };
}

/**
 * Audit Check 4: audit contract string exact match
 * When failure occurs, notes must be EXACTLY "stopped_on_first_failure (gap-free cursor)"
 */
function audit_contractStringExact_() {
  const checkName = 'audit_string_exact';
  Logger.log('AUDIT | ' + checkName + ' | START');
  
  const jobRunData = getSheetData_(SHEETS.JOB_RUN_LOG);
  
  let failureRuns = 0;
  let correctString = 0;
  let incorrectExamples = [];
  
  for (const row of jobRunData) {
    // Check if this looks like a failure run (has error indication in message)
    if (row.message && row.message.includes('Failed')) {
      failureRuns++;
      
      // Check notes field for exact string
      if (row.notes === AUDIT_CONTRACT_STRING) {
        correctString++;
      } else if (row.notes && incorrectExamples.length < 3) {
        incorrectExamples.push(row.notes);
      }
    }
  }
  
  // Pass if all failure runs have correct string, or no failures
  const passed = failureRuns === 0 || correctString === failureRuns;
  
  Logger.log('AUDIT | ' + checkName + ' | failure_runs=' + failureRuns + 
             ', correct_string=' + correctString);
  
  return {
    name: checkName,
    result: passed ? 'PASS' : 'FAIL',
    details: {
      failure_runs: failureRuns,
      correct_string_count: correctString,
      expected: AUDIT_CONTRACT_STRING,
      incorrect_examples: incorrectExamples
    }
  };
}

/**
 * Generate Evidence Pack for audit
 * @returns {Object} Evidence pack data
 */
function generateEvidencePack() {
  Logger.log('========== EVIDENCE PACK GENERATION ==========');
  
  const pack = {
    generated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    
    // These would be filled by actual sheet access
    // Using UNKNOWN/SKIPPED_BY_POLICY as per requirements
    foreign_new_count: 'UNKNOWN',
    missing_deps: 'SKIPPED_BY_POLICY',
    
    smoke_checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),
    
    // Logger RAW will be captured during smoke/audit runs
    logger_raw: 'See Logger output from runSmokeTests() and runAuditChecks()',
    
    // Audit ops_log RAW
    audit_ops_log_raw: 'See Logger output from runAuditChecks()',
    
    risk_flags: '-',
    
    // Sheet evidence
    sheet_evidence: 'See EVIDENCE lines in Logger output'
  };
  
  Logger.log('EVIDENCE_PACK | ' + JSON.stringify(pack));
  
  return pack;
}

/**
 * Full audit run (smoke + audit + evidence)
 * @returns {Object} Complete audit results
 */
function runFullAudit() {
  Logger.log('>>>>>>>>>> FULL AUDIT START <<<<<<<<<<');
  
  const fullResults = {
    smoke: runSmokeTests(),
    audit: runAuditChecks(),
    evidence: generateEvidencePack()
  };
  
  // Combine results
  fullResults.overall_status = 
    fullResults.smoke.failed === 0 && fullResults.audit.nno1_result === 'PASS' 
      ? 'PASS' : 'FAIL';
  
  Logger.log('>>>>>>>>>> FULL AUDIT END <<<<<<<<<<');
  Logger.log('FULL_AUDIT_RESULT | status=' + fullResults.overall_status);
  
  return fullResults;
}
