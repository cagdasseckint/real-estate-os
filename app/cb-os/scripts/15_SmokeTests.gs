// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 15_SmokeTests.gs
 * CB-OS V1.0 - 15_SmokeTests.gs
// EXPLAIN: * Smoke test suite - Appendix A FINAL compliant
 * Smoke test suite - Appendix A FINAL compliant
// EXPLAIN: *
 * 
// EXPLAIN: * HARD-RULE COMPLIANCE:
 * HARD-RULE COMPLIANCE:
// EXPLAIN: * - No ops_log for smoke tests (Hard-rule #3: ops_log scope=audit_only only)
 * - No ops_log for smoke tests (Hard-rule #3: ops_log scope=audit_only only)
// EXPLAIN: * - Enqueue via QueueRepo.enqueue() where possible (Hard-rule #2)
 * - Enqueue via QueueRepo.enqueue() where possible (Hard-rule #2)
// EXPLAIN: * - Logger RAW + SMOKE_TEST_LOG + sheet evidence
 * - Logger RAW + SMOKE_TEST_LOG + sheet evidence
// EXPLAIN: * - DLQ kanıt standardı: COL2 = ingest_id (Hard-rule #6)
 * - DLQ kanıt standardı: COL2 = ingest_id (Hard-rule #6)
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Run all smoke tests
 * Run all smoke tests
// EXPLAIN: * @returns {Object} Smoke test results
 * @returns {Object} Smoke test results
// EXPLAIN: */
 */
// EXPLAIN: function runSmokeTests() {
function runSmokeTests() {
// EXPLAIN: Logger.log('========== SMOKE TEST SUITE START ==========');
  Logger.log('========== SMOKE TEST SUITE START ==========');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const results = {
  const results = {
// EXPLAIN: run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: smoke_checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),
    smoke_checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),
// EXPLAIN: tests: [],
    tests: [],
// EXPLAIN: passed: 0,
    passed: 0,
// EXPLAIN: failed: 0,
    failed: 0,
// EXPLAIN: risk_flags: []
    risk_flags: []
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Ensure sheets exist (GREENFIELD bootstrap)
  // Ensure sheets exist (GREENFIELD bootstrap)
// EXPLAIN: const bootstrapResult = bootstrapSheets_();
  const bootstrapResult = bootstrapSheets_();
// EXPLAIN: Logger.log('SMOKE_TEST | Bootstrap: created=' + bootstrapResult.created.length +
  Logger.log('SMOKE_TEST | Bootstrap: created=' + bootstrapResult.created.length + 
// EXPLAIN: ', existing=' + bootstrapResult.existing.length);
             ', existing=' + bootstrapResult.existing.length);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Test 1: Deterministic enqueue ordering
  // Test 1: Deterministic enqueue ordering
// EXPLAIN: results.tests.push(test_deterministicEnqueue_());
  results.tests.push(test_deterministicEnqueue_());
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Test 2: Idempotency key deduplication
  // Test 2: Idempotency key deduplication
// EXPLAIN: results.tests.push(test_idempotencyDedup_());
  results.tests.push(test_idempotencyDedup_());
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Test 3: DLQ insert on failure (COL2 = ingest_id)
  // Test 3: DLQ insert on failure (COL2 = ingest_id)
// EXPLAIN: results.tests.push(test_dlqInsert_());
  results.tests.push(test_dlqInsert_());
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Test 4: Gap-free cursor (no advance on failure)
  // Test 4: Gap-free cursor (no advance on failure)
// EXPLAIN: results.tests.push(test_gapFreeCursor_());
  results.tests.push(test_gapFreeCursor_());
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Test 5: LAND payload normalization
  // Test 5: LAND payload normalization
// EXPLAIN: results.tests.push(test_landPayload_());
  results.tests.push(test_landPayload_());
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Test 6: Events append-only
  // Test 6: Events append-only
// EXPLAIN: results.tests.push(test_eventsAppendOnly_());
  results.tests.push(test_eventsAppendOnly_());
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Summarize results and deduplicate risk_flags
  // Summarize results and deduplicate risk_flags
// EXPLAIN: const seenFlags = new Set();
  const seenFlags = new Set();
// EXPLAIN: for (const test of results.tests) {
  for (const test of results.tests) {
// EXPLAIN: if (test.result === 'PASS') {
    if (test.result === 'PASS') {
// EXPLAIN: results.passed++;
      results.passed++;
// EXPLAIN: } else {
    } else {
// EXPLAIN: results.failed++;
      results.failed++;
// EXPLAIN: }
    }
// EXPLAIN: if (test.risk_flags && test.risk_flags.length > 0) {
    if (test.risk_flags && test.risk_flags.length > 0) {
// EXPLAIN: for (const flag of test.risk_flags) {
      for (const flag of test.risk_flags) {
// EXPLAIN: if (!seenFlags.has(flag)) {
        if (!seenFlags.has(flag)) {
// EXPLAIN: seenFlags.add(flag);
          seenFlags.add(flag);
// EXPLAIN: results.risk_flags.push(flag);
          results.risk_flags.push(flag);
// EXPLAIN: }
        }
// EXPLAIN: }
      }
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Format risk_flags
  // Format risk_flags
// EXPLAIN: const riskFlagsStr = results.risk_flags.length > 0 ?
  const riskFlagsStr = results.risk_flags.length > 0 ? 
// EXPLAIN: results.risk_flags.join(',') : '-';
                       results.risk_flags.join(',') : '-';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: Logger.log('========== SMOKE TEST SUITE END ==========');
  Logger.log('========== SMOKE TEST SUITE END ==========');
// EXPLAIN: Logger.log('SMOKE_SUMMARY | passed=' + results.passed + ' | failed=' + results.failed +
  Logger.log('SMOKE_SUMMARY | passed=' + results.passed + ' | failed=' + results.failed + 
// EXPLAIN: ' | risk_flags=' + riskFlagsStr + ' | checked_by=' + results.smoke_checked_by);
             ' | risk_flags=' + riskFlagsStr + ' | checked_by=' + results.smoke_checked_by);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: // Dump sheet evidence
  // Dump sheet evidence
// EXPLAIN: dumpSheetEvidence_(SHEETS.INGEST_QUEUE, 1, 10);
  dumpSheetEvidence_(SHEETS.INGEST_QUEUE, 1, 10);
// EXPLAIN: dumpSheetEvidence_(SHEETS.DLQ, 1, 5);
  dumpSheetEvidence_(SHEETS.DLQ, 1, 5);
// EXPLAIN: dumpSheetEvidence_(SHEETS.DEDUP_KEYS, 1, 5);
  dumpSheetEvidence_(SHEETS.DEDUP_KEYS, 1, 5);
// EXPLAIN: dumpSheetEvidence_(SHEETS.EVENTS, 1, 5);
  dumpSheetEvidence_(SHEETS.EVENTS, 1, 5);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return results;
  return results;
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Test 1: Deterministic enqueue ordering
 * Test 1: Deterministic enqueue ordering
// EXPLAIN: * A enqueue -> sleep >= 1000ms -> B enqueue
 * A enqueue -> sleep >= 1000ms -> B enqueue
// EXPLAIN: * Verify A.received_at < B.received_at
 * Verify A.received_at < B.received_at
// EXPLAIN: */
 */
// EXPLAIN: function test_deterministicEnqueue_() {
function test_deterministicEnqueue_() {
// EXPLAIN: const testName = 'deterministic_enqueue_ordering';
  const testName = 'deterministic_enqueue_ordering';
// EXPLAIN: Logger.log('SMOKE_TEST | ' + testName + ' | START');
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: // Enqueue A with its own timestamp
    // Enqueue A with its own timestamp
// EXPLAIN: const itemA = QueueRepo.enqueue({
    const itemA = QueueRepo.enqueue({
// EXPLAIN: ingest_type: INGEST_TYPES.EVENT_LOG,
      ingest_type: INGEST_TYPES.EVENT_LOG,
// EXPLAIN: payload: { test: 'A', purpose: 'smoke_determinism' },
      payload: { test: 'A', purpose: 'smoke_determinism' },
// EXPLAIN: source: 'smoke_test',
      source: 'smoke_test',
// EXPLAIN: idempotency_key: 'smoke_A_' + Date.now()
      idempotency_key: 'smoke_A_' + Date.now()
// EXPLAIN: });
    });
// EXPLAIN: const receivedAtA = itemA.received_at;
    const receivedAtA = itemA.received_at;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: Logger.log('SMOKE_TEST | ' + testName + ' | A enqueued: ' + receivedAtA);
    Logger.log('SMOKE_TEST | ' + testName + ' | A enqueued: ' + receivedAtA);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Sleep >= 1000ms (required by Appendix A)
    // Sleep >= 1000ms (required by Appendix A)
// EXPLAIN: Utilities.sleep(1100);
    Utilities.sleep(1100);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Enqueue B with its own timestamp (NOT reusing A's timestamp)
    // Enqueue B with its own timestamp (NOT reusing A's timestamp)
// EXPLAIN: const itemB = QueueRepo.enqueue({
    const itemB = QueueRepo.enqueue({
// EXPLAIN: ingest_type: INGEST_TYPES.EVENT_LOG,
      ingest_type: INGEST_TYPES.EVENT_LOG,
// EXPLAIN: payload: { test: 'B', purpose: 'smoke_determinism' },
      payload: { test: 'B', purpose: 'smoke_determinism' },
// EXPLAIN: source: 'smoke_test',
      source: 'smoke_test',
// EXPLAIN: idempotency_key: 'smoke_B_' + Date.now()
      idempotency_key: 'smoke_B_' + Date.now()
// EXPLAIN: });
    });
// EXPLAIN: const receivedAtB = itemB.received_at;
    const receivedAtB = itemB.received_at;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: Logger.log('SMOKE_TEST | ' + testName + ' | B enqueued: ' + receivedAtB);
    Logger.log('SMOKE_TEST | ' + testName + ' | B enqueued: ' + receivedAtB);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Verify A < B
    // Verify A < B
// EXPLAIN: const passed = receivedAtA < receivedAtB;
    const passed = receivedAtA < receivedAtB;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: logEvidence_('DETERMINISM', 'A=' + receivedAtA + ' | B=' + receivedAtB + ' | A<B=' + passed);
    logEvidence_('DETERMINISM', 'A=' + receivedAtA + ' | B=' + receivedAtB + ' | A<B=' + passed);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return logSmokeTest_(testName, passed,
    return logSmokeTest_(testName, passed, 
// EXPLAIN: 'A=' + receivedAtA + ', B=' + receivedAtB + ', A<B=' + passed);
                         'A=' + receivedAtA + ', B=' + receivedAtB + ', A<B=' + passed);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: return logSmokeTest_(testName, false, 'Exception: ' + e.message);
    return logSmokeTest_(testName, false, 'Exception: ' + e.message);
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Test 2: Idempotency key deduplication
 * Test 2: Idempotency key deduplication
// EXPLAIN: */
 */
// EXPLAIN: function test_idempotencyDedup_() {
function test_idempotencyDedup_() {
// EXPLAIN: const testName = 'idempotency_dedup';
  const testName = 'idempotency_dedup';
// EXPLAIN: Logger.log('SMOKE_TEST | ' + testName + ' | START');
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: const uniqueKey = 'smoke_dedup_' + Date.now();
    const uniqueKey = 'smoke_dedup_' + Date.now();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // First insert should succeed
    // First insert should succeed
// EXPLAIN: const result1 = DedupRepo.insertIfNotExists(uniqueKey);
    const result1 = DedupRepo.insertIfNotExists(uniqueKey);
// EXPLAIN: Logger.log('SMOKE_TEST | ' + testName + ' | First insert: ' + result1.inserted);
    Logger.log('SMOKE_TEST | ' + testName + ' | First insert: ' + result1.inserted);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Second insert should fail (duplicate)
    // Second insert should fail (duplicate)
// EXPLAIN: const result2 = DedupRepo.insertIfNotExists(uniqueKey);
    const result2 = DedupRepo.insertIfNotExists(uniqueKey);
// EXPLAIN: Logger.log('SMOKE_TEST | ' + testName + ' | Second insert: ' + result2.inserted);
    Logger.log('SMOKE_TEST | ' + testName + ' | Second insert: ' + result2.inserted);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const passed = result1.inserted === true && result2.inserted === false;
    const passed = result1.inserted === true && result2.inserted === false;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: logEvidence_('IDEMPOTENCY', 'key=' + uniqueKey + ' | first=' + result1.inserted +
    logEvidence_('IDEMPOTENCY', 'key=' + uniqueKey + ' | first=' + result1.inserted + 
// EXPLAIN: ' | second=' + result2.inserted);
                 ' | second=' + result2.inserted);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return logSmokeTest_(testName, passed,
    return logSmokeTest_(testName, passed, 
// EXPLAIN: 'First=' + result1.inserted + ', Second=' + result2.inserted);
                         'First=' + result1.inserted + ', Second=' + result2.inserted);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: return logSmokeTest_(testName, false, 'Exception: ' + e.message);
    return logSmokeTest_(testName, false, 'Exception: ' + e.message);
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Test 3: DLQ insert on failure (verify COL2 = ingest_id)
 * Test 3: DLQ insert on failure (verify COL2 = ingest_id)
// EXPLAIN: */
 */
// EXPLAIN: function test_dlqInsert_() {
function test_dlqInsert_() {
// EXPLAIN: const testName = 'dlq_insert_col2_ingest_id';
  const testName = 'dlq_insert_col2_ingest_id';
// EXPLAIN: Logger.log('SMOKE_TEST | ' + testName + ' | START');
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const riskFlags = [];
  const riskFlags = [];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: // Enqueue item with invalid JSON payload (will fail parsing)
    // Enqueue item with invalid JSON payload (will fail parsing)
// EXPLAIN: const testIngestId = 'smoke_dlq_' + Date.now();
    const testIngestId = 'smoke_dlq_' + Date.now();
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Manually insert to queue with malformed payload (E-002 fix: removed unused variable)
    // Manually insert to queue with malformed payload (E-002 fix: removed unused variable)
// EXPLAIN: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: appendRow_(SHEETS.INGEST_QUEUE, {
    appendRow_(SHEETS.INGEST_QUEUE, {
// EXPLAIN: status: INGEST_STATUS.NEW,
      status: INGEST_STATUS.NEW,
// EXPLAIN: ingest_id: testIngestId,
      ingest_id: testIngestId,
// EXPLAIN: received_at: now,
      received_at: now,
// EXPLAIN: ingest_type: 'invalid_type_for_test',
      ingest_type: 'invalid_type_for_test',
// EXPLAIN: payload_json: '{invalid json',  // Malformed JSON
      payload_json: '{invalid json',  // Malformed JSON
// EXPLAIN: source: 'smoke_test',
      source: 'smoke_test',
// EXPLAIN: source_ref_id: '',
      source_ref_id: '',
// EXPLAIN: idempotency_key: 'smoke_dlq_key_' + Date.now(),
      idempotency_key: 'smoke_dlq_key_' + Date.now(),
// EXPLAIN: error: '',
      error: '',
// EXPLAIN: processed_at: ''
      processed_at: ''
// EXPLAIN: });
    });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: Logger.log('SMOKE_TEST | ' + testName + ' | Queued invalid item: ' + testIngestId);
    Logger.log('SMOKE_TEST | ' + testName + ' | Queued invalid item: ' + testIngestId);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Run ingest process
    // Run ingest process
// EXPLAIN: const ctx = createJobContext_();
    const ctx = createJobContext_();
// EXPLAIN: ingest_process_job(ctx);
    ingest_process_job(ctx);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Check DLQ for our item
    // Check DLQ for our item
// EXPLAIN: const dlqSheet = sheet_(SHEETS.DLQ, false);
    const dlqSheet = sheet_(SHEETS.DLQ, false);
// EXPLAIN: if (!dlqSheet) {
    if (!dlqSheet) {
// EXPLAIN: return logSmokeTest_(testName, false, 'DLQ sheet not found');
      return logSmokeTest_(testName, false, 'DLQ sheet not found');
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Verify DLQ header structure (COL2 should be ingest_id)
    // Verify DLQ header structure (COL2 should be ingest_id)
// EXPLAIN: const dlqHeaders = dlqSheet.getRange(1, 1, 1, dlqSheet.getLastColumn()).getValues()[0];
    const dlqHeaders = dlqSheet.getRange(1, 1, 1, dlqSheet.getLastColumn()).getValues()[0];
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: if (dlqHeaders[1] !== 'ingest_id') {
    if (dlqHeaders[1] !== 'ingest_id') {
// EXPLAIN: riskFlags.push('DLQ_HEADER_MISMATCH');
      riskFlags.push('DLQ_HEADER_MISMATCH');
// EXPLAIN: Logger.log('SMOKE_TEST | ' + testName + ' | DLQ COL2 is "' + dlqHeaders[1] + '" not "ingest_id"');
      Logger.log('SMOKE_TEST | ' + testName + ' | DLQ COL2 is "' + dlqHeaders[1] + '" not "ingest_id"');
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Find our DLQ entry
    // Find our DLQ entry
// EXPLAIN: const dlqData = getSheetData_(SHEETS.DLQ);
    const dlqData = getSheetData_(SHEETS.DLQ);
// EXPLAIN: const dlqEntry = dlqData.find(row => row.ingest_id === testIngestId);
    const dlqEntry = dlqData.find(row => row.ingest_id === testIngestId);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const passed = dlqEntry !== undefined;
    const passed = dlqEntry !== undefined;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: logEvidence_('DLQ_INSERT', 'ingest_id=' + testIngestId + ' | found_in_dlq=' + passed +
    logEvidence_('DLQ_INSERT', 'ingest_id=' + testIngestId + ' | found_in_dlq=' + passed + 
// EXPLAIN: ' | dlq_col2_header=' + dlqHeaders[1]);
                 ' | dlq_col2_header=' + dlqHeaders[1]);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const result = logSmokeTest_(testName, passed,
    const result = logSmokeTest_(testName, passed, 
// EXPLAIN: 'ingest_id=' + testIngestId + ' found in DLQ: ' + passed);
                                 'ingest_id=' + testIngestId + ' found in DLQ: ' + passed);
// EXPLAIN: result.risk_flags = riskFlags;
    result.risk_flags = riskFlags;
// EXPLAIN: return result;
    return result;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: const result = logSmokeTest_(testName, false, 'Exception: ' + e.message);
    const result = logSmokeTest_(testName, false, 'Exception: ' + e.message);
// EXPLAIN: result.risk_flags = riskFlags;
    result.risk_flags = riskFlags;
// EXPLAIN: return result;
    return result;
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Test 4: Gap-free cursor (cursor should not advance on failure)
 * Test 4: Gap-free cursor (cursor should not advance on failure)
// EXPLAIN: */
 */
// EXPLAIN: function test_gapFreeCursor_() {
function test_gapFreeCursor_() {
// EXPLAIN: const testName = 'gap_free_cursor';
  const testName = 'gap_free_cursor';
// EXPLAIN: Logger.log('SMOKE_TEST | ' + testName + ' | START');
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: // Get current cursor
    // Get current cursor
// EXPLAIN: const cursorBefore = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);
    const cursorBefore = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);
// EXPLAIN: Logger.log('SMOKE_TEST | ' + testName + ' | Cursor before: ' + cursorBefore);
    Logger.log('SMOKE_TEST | ' + testName + ' | Cursor before: ' + cursorBefore);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // The previous test should have caused a failure
    // The previous test should have caused a failure
// EXPLAIN: // Check that JOB_RUN_LOG contains the audit contract string
    // Check that JOB_RUN_LOG contains the audit contract string
// EXPLAIN: const recentRuns = getRecentJobRuns_(5);
    const recentRuns = getRecentJobRuns_(5);
// EXPLAIN: const failedRun = recentRuns.find(run =>
    const failedRun = recentRuns.find(run => 
// EXPLAIN: run.job_name === 'ingest_process_job' &&
      run.job_name === 'ingest_process_job' && 
// EXPLAIN: (run.notes === AUDIT_CONTRACT_STRING || run.message?.includes('Failed'))
      (run.notes === AUDIT_CONTRACT_STRING || run.message?.includes('Failed'))
// EXPLAIN: );
    );
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: let passed = false;
    let passed = false;
// EXPLAIN: if (failedRun) {
    if (failedRun) {
// EXPLAIN: // Verify notes contains EXACT audit contract string
      // Verify notes contains EXACT audit contract string
// EXPLAIN: passed = failedRun.notes === AUDIT_CONTRACT_STRING;
      passed = failedRun.notes === AUDIT_CONTRACT_STRING;
// EXPLAIN: Logger.log('SMOKE_TEST | ' + testName + ' | Found failed run with notes: ' + failedRun.notes);
      Logger.log('SMOKE_TEST | ' + testName + ' | Found failed run with notes: ' + failedRun.notes);
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: logEvidence_('GAP_FREE', 'audit_string_match=' + passed +
    logEvidence_('GAP_FREE', 'audit_string_match=' + passed + 
// EXPLAIN: ' | expected="' + AUDIT_CONTRACT_STRING + '"');
                 ' | expected="' + AUDIT_CONTRACT_STRING + '"');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return logSmokeTest_(testName, passed,
    return logSmokeTest_(testName, passed, 
// EXPLAIN: 'Audit contract string exact match: ' + passed);
                         'Audit contract string exact match: ' + passed);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: return logSmokeTest_(testName, false, 'Exception: ' + e.message);
    return logSmokeTest_(testName, false, 'Exception: ' + e.message);
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Test 5: LAND payload normalization (docs_required, parcel_present)
 * Test 5: LAND payload normalization (docs_required, parcel_present)
// EXPLAIN: */
 */
// EXPLAIN: function test_landPayload_() {
function test_landPayload_() {
// EXPLAIN: const testName = 'land_payload_normalization';
  const testName = 'land_payload_normalization';
// EXPLAIN: Logger.log('SMOKE_TEST | ' + testName + ' | START');
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: const landPayload = {
    const landPayload = {
// EXPLAIN: first_name: 'Test',
      first_name: 'Test',
// EXPLAIN: last_name: 'Land Lead',
      last_name: 'Land Lead',
// EXPLAIN: phone: '+905551234567',
      phone: '+905551234567',
// EXPLAIN: deal_type: 'LAND',
      deal_type: 'LAND',
// EXPLAIN: docs_required: 'tapu,imar,kadastro',
      docs_required: 'tapu,imar,kadastro',
// EXPLAIN: parcel_present: 'yes',
      parcel_present: 'yes',
// EXPLAIN: land_area: '5000m2',
      land_area: '5000m2',
// EXPLAIN: zoning: 'imarlı'
      zoning: 'imarlı'
// EXPLAIN: };
    };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const normalized = normalizeLandPayload_(landPayload);
    const normalized = normalizeLandPayload_(landPayload);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const passed = normalized.deal.deal_type === 'LAND' &&
    const passed = normalized.deal.deal_type === 'LAND' &&
// EXPLAIN: normalized.deal.docs_required === 'tapu,imar,kadastro' &&
                   normalized.deal.docs_required === 'tapu,imar,kadastro' &&
// EXPLAIN: normalized.deal.parcel_present === 'yes';
                   normalized.deal.parcel_present === 'yes';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: logEvidence_('LAND_PAYLOAD', 'deal_type=' + normalized.deal.deal_type +
    logEvidence_('LAND_PAYLOAD', 'deal_type=' + normalized.deal.deal_type + 
// EXPLAIN: ' | docs_required=' + normalized.deal.docs_required +
                 ' | docs_required=' + normalized.deal.docs_required +
// EXPLAIN: ' | parcel_present=' + normalized.deal.parcel_present);
                 ' | parcel_present=' + normalized.deal.parcel_present);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return logSmokeTest_(testName, passed,
    return logSmokeTest_(testName, passed, 
// EXPLAIN: 'LAND fields normalized correctly: ' + passed);
                         'LAND fields normalized correctly: ' + passed);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: return logSmokeTest_(testName, false, 'Exception: ' + e.message);
    return logSmokeTest_(testName, false, 'Exception: ' + e.message);
// EXPLAIN: }
  }
// EXPLAIN: }
}
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Test 6: Events append-only (no update/delete)
 * Test 6: Events append-only (no update/delete)
// EXPLAIN: */
 */
// EXPLAIN: function test_eventsAppendOnly_() {
function test_eventsAppendOnly_() {
// EXPLAIN: const testName = 'events_append_only';
  const testName = 'events_append_only';
// EXPLAIN: Logger.log('SMOKE_TEST | ' + testName + ' | START');
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: try {
  try {
// EXPLAIN: // Append an event
    // Append an event
// EXPLAIN: const result = EventsRepo.append({
    const result = EventsRepo.append({
// EXPLAIN: entity_type: 'TEST',
      entity_type: 'TEST',
// EXPLAIN: entity_id: 'smoke_test',
      entity_id: 'smoke_test',
// EXPLAIN: event_type: 'SMOKE_TEST',
      event_type: 'SMOKE_TEST',
// EXPLAIN: payload: { test: true },
      payload: { test: true },
// EXPLAIN: source: 'smoke_test',
      source: 'smoke_test',
// EXPLAIN: idempotency_key: 'smoke_event_' + Date.now()
      idempotency_key: 'smoke_event_' + Date.now()
// EXPLAIN: });
    });
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Verify it was appended
    // Verify it was appended
// EXPLAIN: const events = EventsRepo.getByEntity('TEST', 'smoke_test');
    const events = EventsRepo.getByEntity('TEST', 'smoke_test');
// EXPLAIN: const found = events.some(e => e.event_id === result.event_id);
    const found = events.some(e => e.event_id === result.event_id);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Verify EventsRepo has no update or delete methods exposed
    // Verify EventsRepo has no update or delete methods exposed
// EXPLAIN: const hasUpdate = typeof EventsRepo.update === 'function';
    const hasUpdate = typeof EventsRepo.update === 'function';
// EXPLAIN: const hasDelete = typeof EventsRepo.delete === 'function';
    const hasDelete = typeof EventsRepo.delete === 'function';
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const passed = found && !hasUpdate && !hasDelete;
    const passed = found && !hasUpdate && !hasDelete;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: logEvidence_('EVENTS_APPEND_ONLY', 'appended=' + found +
    logEvidence_('EVENTS_APPEND_ONLY', 'appended=' + found + 
// EXPLAIN: ' | has_update=' + hasUpdate + ' | has_delete=' + hasDelete);
                 ' | has_update=' + hasUpdate + ' | has_delete=' + hasDelete);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return logSmokeTest_(testName, passed,
    return logSmokeTest_(testName, passed, 
// EXPLAIN: 'Event appended: ' + found + ', No update/delete: ' + (!hasUpdate && !hasDelete));
                         'Event appended: ' + found + ', No update/delete: ' + (!hasUpdate && !hasDelete));
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: } catch (e) {
  } catch (e) {
// EXPLAIN: return logSmokeTest_(testName, false, 'Exception: ' + e.message);
    return logSmokeTest_(testName, false, 'Exception: ' + e.message);
// EXPLAIN: }
  }
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
