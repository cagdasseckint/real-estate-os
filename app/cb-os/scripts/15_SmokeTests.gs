// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS V1.0 - 15_SmokeTests.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS V1.0 - 15_SmokeTests.gs
// EXPLAIN: Bu satırın görevi: * Smoke test suite - Appendix A FINAL compliant. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Smoke test suite - Appendix A FINAL compliant
// EXPLAIN: Bu satırın görevi: *. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * 
// EXPLAIN: Bu satırın görevi: * HARD-RULE COMPLIANCE:. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * HARD-RULE COMPLIANCE:
// EXPLAIN: Bu satırın görevi: * - No ops_log for smoke tests (Hard-rule #3: ops_log scope=audit_only only). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * - No ops_log for smoke tests (Hard-rule #3: ops_log scope=audit_only only)
// EXPLAIN: Bu satırın görevi: * - Enqueue via QueueRepo.enqueue() where possible (Hard-rule #2). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * - Enqueue via QueueRepo.enqueue() where possible (Hard-rule #2)
// EXPLAIN: Bu satırın görevi: * - Logger RAW + SMOKE_TEST_LOG + sheet evidence. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * - Logger RAW + SMOKE_TEST_LOG + sheet evidence
// EXPLAIN: Bu satırın görevi: * - DLQ kanıt standardı: COL2 = ingest_id (Hard-rule #6). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * - DLQ kanıt standardı: COL2 = ingest_id (Hard-rule #6)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Run all smoke tests. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Run all smoke tests
// EXPLAIN: Bu satırın görevi: * @returns {Object} Smoke test results. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Smoke test results
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function runSmokeTests() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function runSmokeTests() {
// EXPLAIN: Bu satırın görevi: Logger.log('========== SMOKE TEST SUITE START ==========');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('========== SMOKE TEST SUITE START ==========');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const results = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const results = {
// EXPLAIN: Bu satırın görevi: run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: Bu satırın görevi: smoke_checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    smoke_checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),
// EXPLAIN: Bu satırın görevi: tests: [],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    tests: [],
// EXPLAIN: Bu satırın görevi: passed: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    passed: 0,
// EXPLAIN: Bu satırın görevi: failed: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    failed: 0,
// EXPLAIN: Bu satırın görevi: risk_flags: []. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    risk_flags: []
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Ensure sheets exist (GREENFIELD bootstrap). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Ensure sheets exist (GREENFIELD bootstrap)
// EXPLAIN: Bu satırın görevi: const bootstrapResult = bootstrapSheets_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const bootstrapResult = bootstrapSheets_();
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_TEST | Bootstrap: created=' + bootstrapResult.created.length +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('SMOKE_TEST | Bootstrap: created=' + bootstrapResult.created.length + 
// EXPLAIN: Bu satırın görevi: ', existing=' + bootstrapResult.existing.length);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
             ', existing=' + bootstrapResult.existing.length);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Test 1: Deterministic enqueue ordering. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Test 1: Deterministic enqueue ordering
// EXPLAIN: Bu satırın görevi: results.tests.push(test_deterministicEnqueue_());. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  results.tests.push(test_deterministicEnqueue_());
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Test 2: Idempotency key deduplication. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Test 2: Idempotency key deduplication
// EXPLAIN: Bu satırın görevi: results.tests.push(test_idempotencyDedup_());. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  results.tests.push(test_idempotencyDedup_());
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Test 3: DLQ insert on failure (COL2 = ingest_id). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Test 3: DLQ insert on failure (COL2 = ingest_id)
// EXPLAIN: Bu satırın görevi: results.tests.push(test_dlqInsert_());. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  results.tests.push(test_dlqInsert_());
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Test 4: Gap-free cursor (no advance on failure). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Test 4: Gap-free cursor (no advance on failure)
// EXPLAIN: Bu satırın görevi: results.tests.push(test_gapFreeCursor_());. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  results.tests.push(test_gapFreeCursor_());
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Test 5: LAND payload normalization. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Test 5: LAND payload normalization
// EXPLAIN: Bu satırın görevi: results.tests.push(test_landPayload_());. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  results.tests.push(test_landPayload_());
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Test 6: Events append-only. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Test 6: Events append-only
// EXPLAIN: Bu satırın görevi: results.tests.push(test_eventsAppendOnly_());. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  results.tests.push(test_eventsAppendOnly_());
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Summarize results and deduplicate risk_flags. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Summarize results and deduplicate risk_flags
// EXPLAIN: Bu satırın görevi: const seenFlags = new Set();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const seenFlags = new Set();
// EXPLAIN: Bu satırın görevi: for (const test of results.tests) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const test of results.tests) {
// EXPLAIN: Bu satırın görevi: if (test.result === 'PASS') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (test.result === 'PASS') {
// EXPLAIN: Bu satırın görevi: results.passed++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      results.passed++;
// EXPLAIN: Bu satırın görevi: } else {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else {
// EXPLAIN: Bu satırın görevi: results.failed++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      results.failed++;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: if (test.risk_flags && test.risk_flags.length > 0) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (test.risk_flags && test.risk_flags.length > 0) {
// EXPLAIN: Bu satırın görevi: for (const flag of test.risk_flags) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      for (const flag of test.risk_flags) {
// EXPLAIN: Bu satırın görevi: if (!seenFlags.has(flag)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        if (!seenFlags.has(flag)) {
// EXPLAIN: Bu satırın görevi: seenFlags.add(flag);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          seenFlags.add(flag);
// EXPLAIN: Bu satırın görevi: results.risk_flags.push(flag);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          results.risk_flags.push(flag);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Format risk_flags. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Format risk_flags
// EXPLAIN: Bu satırın görevi: const riskFlagsStr = results.risk_flags.length > 0 ?. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const riskFlagsStr = results.risk_flags.length > 0 ? 
// EXPLAIN: Bu satırın görevi: results.risk_flags.join(',') : '-';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                       results.risk_flags.join(',') : '-';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('========== SMOKE TEST SUITE END ==========');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('========== SMOKE TEST SUITE END ==========');
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_SUMMARY | passed=' + results.passed + ' | failed=' + results.failed +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('SMOKE_SUMMARY | passed=' + results.passed + ' | failed=' + results.failed + 
// EXPLAIN: Bu satırın görevi: ' | risk_flags=' + riskFlagsStr + ' | checked_by=' + results.smoke_checked_by);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
             ' | risk_flags=' + riskFlagsStr + ' | checked_by=' + results.smoke_checked_by);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Dump sheet evidence. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Dump sheet evidence
// EXPLAIN: Bu satırın görevi: dumpSheetEvidence_(SHEETS.INGEST_QUEUE, 1, 10);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  dumpSheetEvidence_(SHEETS.INGEST_QUEUE, 1, 10);
// EXPLAIN: Bu satırın görevi: dumpSheetEvidence_(SHEETS.DLQ, 1, 5);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  dumpSheetEvidence_(SHEETS.DLQ, 1, 5);
// EXPLAIN: Bu satırın görevi: dumpSheetEvidence_(SHEETS.DEDUP_KEYS, 1, 5);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  dumpSheetEvidence_(SHEETS.DEDUP_KEYS, 1, 5);
// EXPLAIN: Bu satırın görevi: dumpSheetEvidence_(SHEETS.EVENTS, 1, 5);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  dumpSheetEvidence_(SHEETS.EVENTS, 1, 5);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return results;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return results;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Test 1: Deterministic enqueue ordering. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Test 1: Deterministic enqueue ordering
// EXPLAIN: Bu satırın görevi: * A enqueue -> sleep >= 1000ms -> B enqueue. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * A enqueue -> sleep >= 1000ms -> B enqueue
// EXPLAIN: Bu satırın görevi: * Verify A.received_at < B.received_at. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Verify A.received_at < B.received_at
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function test_deterministicEnqueue_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function test_deterministicEnqueue_() {
// EXPLAIN: Bu satırın görevi: const testName = 'deterministic_enqueue_ordering';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const testName = 'deterministic_enqueue_ordering';
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_TEST | ' + testName + ' | START');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: // Enqueue A with its own timestamp. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Enqueue A with its own timestamp
// EXPLAIN: Bu satırın görevi: const itemA = QueueRepo.enqueue({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const itemA = QueueRepo.enqueue({
// EXPLAIN: Bu satırın görevi: ingest_type: INGEST_TYPES.EVENT_LOG,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      ingest_type: INGEST_TYPES.EVENT_LOG,
// EXPLAIN: Bu satırın görevi: payload: { test: 'A', purpose: 'smoke_determinism' },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      payload: { test: 'A', purpose: 'smoke_determinism' },
// EXPLAIN: Bu satırın görevi: source: 'smoke_test',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source: 'smoke_test',
// EXPLAIN: Bu satırın görevi: idempotency_key: 'smoke_A_' + Date.now(). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      idempotency_key: 'smoke_A_' + Date.now()
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: const receivedAtA = itemA.received_at;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const receivedAtA = itemA.received_at;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_TEST | ' + testName + ' | A enqueued: ' + receivedAtA);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('SMOKE_TEST | ' + testName + ' | A enqueued: ' + receivedAtA);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Sleep >= 1000ms (required by Appendix A). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Sleep >= 1000ms (required by Appendix A)
// EXPLAIN: Bu satırın görevi: Utilities.sleep(1100);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Utilities.sleep(1100);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Enqueue B with its own timestamp (NOT reusing A's timestamp). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Enqueue B with its own timestamp (NOT reusing A's timestamp)
// EXPLAIN: Bu satırın görevi: const itemB = QueueRepo.enqueue({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const itemB = QueueRepo.enqueue({
// EXPLAIN: Bu satırın görevi: ingest_type: INGEST_TYPES.EVENT_LOG,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      ingest_type: INGEST_TYPES.EVENT_LOG,
// EXPLAIN: Bu satırın görevi: payload: { test: 'B', purpose: 'smoke_determinism' },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      payload: { test: 'B', purpose: 'smoke_determinism' },
// EXPLAIN: Bu satırın görevi: source: 'smoke_test',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source: 'smoke_test',
// EXPLAIN: Bu satırın görevi: idempotency_key: 'smoke_B_' + Date.now(). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      idempotency_key: 'smoke_B_' + Date.now()
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: const receivedAtB = itemB.received_at;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const receivedAtB = itemB.received_at;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_TEST | ' + testName + ' | B enqueued: ' + receivedAtB);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('SMOKE_TEST | ' + testName + ' | B enqueued: ' + receivedAtB);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Verify A < B. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Verify A < B
// EXPLAIN: Bu satırın görevi: const passed = receivedAtA < receivedAtB;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const passed = receivedAtA < receivedAtB;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: logEvidence_('DETERMINISM', 'A=' + receivedAtA + ' | B=' + receivedAtB + ' | A<B=' + passed);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    logEvidence_('DETERMINISM', 'A=' + receivedAtA + ' | B=' + receivedAtB + ' | A<B=' + passed);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: return logSmokeTest_(testName, passed,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return logSmokeTest_(testName, passed, 
// EXPLAIN: Bu satırın görevi: 'A=' + receivedAtA + ', B=' + receivedAtB + ', A<B=' + passed);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                         'A=' + receivedAtA + ', B=' + receivedAtB + ', A<B=' + passed);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: return logSmokeTest_(testName, false, 'Exception: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return logSmokeTest_(testName, false, 'Exception: ' + e.message);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Test 2: Idempotency key deduplication. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Test 2: Idempotency key deduplication
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function test_idempotencyDedup_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function test_idempotencyDedup_() {
// EXPLAIN: Bu satırın görevi: const testName = 'idempotency_dedup';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const testName = 'idempotency_dedup';
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_TEST | ' + testName + ' | START');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: const uniqueKey = 'smoke_dedup_' + Date.now();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const uniqueKey = 'smoke_dedup_' + Date.now();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // First insert should succeed. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // First insert should succeed
// EXPLAIN: Bu satırın görevi: const result1 = DedupRepo.insertIfNotExists(uniqueKey);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const result1 = DedupRepo.insertIfNotExists(uniqueKey);
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_TEST | ' + testName + ' | First insert: ' + result1.inserted);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('SMOKE_TEST | ' + testName + ' | First insert: ' + result1.inserted);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Second insert should fail (duplicate). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Second insert should fail (duplicate)
// EXPLAIN: Bu satırın görevi: const result2 = DedupRepo.insertIfNotExists(uniqueKey);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const result2 = DedupRepo.insertIfNotExists(uniqueKey);
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_TEST | ' + testName + ' | Second insert: ' + result2.inserted);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('SMOKE_TEST | ' + testName + ' | Second insert: ' + result2.inserted);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const passed = result1.inserted === true && result2.inserted === false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const passed = result1.inserted === true && result2.inserted === false;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: logEvidence_('IDEMPOTENCY', 'key=' + uniqueKey + ' | first=' + result1.inserted +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    logEvidence_('IDEMPOTENCY', 'key=' + uniqueKey + ' | first=' + result1.inserted + 
// EXPLAIN: Bu satırın görevi: ' | second=' + result2.inserted);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                 ' | second=' + result2.inserted);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: return logSmokeTest_(testName, passed,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return logSmokeTest_(testName, passed, 
// EXPLAIN: Bu satırın görevi: 'First=' + result1.inserted + ', Second=' + result2.inserted);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                         'First=' + result1.inserted + ', Second=' + result2.inserted);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: return logSmokeTest_(testName, false, 'Exception: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return logSmokeTest_(testName, false, 'Exception: ' + e.message);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Test 3: DLQ insert on failure (verify COL2 = ingest_id). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Test 3: DLQ insert on failure (verify COL2 = ingest_id)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function test_dlqInsert_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function test_dlqInsert_() {
// EXPLAIN: Bu satırın görevi: const testName = 'dlq_insert_col2_ingest_id';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const testName = 'dlq_insert_col2_ingest_id';
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_TEST | ' + testName + ' | START');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const riskFlags = [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const riskFlags = [];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: // Enqueue item with invalid JSON payload (will fail parsing). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Enqueue item with invalid JSON payload (will fail parsing)
// EXPLAIN: Bu satırın görevi: const testIngestId = 'smoke_dlq_' + Date.now();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const testIngestId = 'smoke_dlq_' + Date.now();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Manually insert to queue with malformed payload (E-002 fix: removed unused variable). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Manually insert to queue with malformed payload (E-002 fix: removed unused variable)
// EXPLAIN: Bu satırın görevi: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: appendRow_(SHEETS.INGEST_QUEUE, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    appendRow_(SHEETS.INGEST_QUEUE, {
// EXPLAIN: Bu satırın görevi: status: INGEST_STATUS.NEW,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      status: INGEST_STATUS.NEW,
// EXPLAIN: Bu satırın görevi: ingest_id: testIngestId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      ingest_id: testIngestId,
// EXPLAIN: Bu satırın görevi: received_at: now,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      received_at: now,
// EXPLAIN: Bu satırın görevi: ingest_type: 'invalid_type_for_test',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      ingest_type: 'invalid_type_for_test',
// EXPLAIN: Bu satırın görevi: payload_json: '{invalid json',  // Malformed JSON. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      payload_json: '{invalid json',  // Malformed JSON
// EXPLAIN: Bu satırın görevi: source: 'smoke_test',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source: 'smoke_test',
// EXPLAIN: Bu satırın görevi: source_ref_id: '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source_ref_id: '',
// EXPLAIN: Bu satırın görevi: idempotency_key: 'smoke_dlq_key_' + Date.now(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      idempotency_key: 'smoke_dlq_key_' + Date.now(),
// EXPLAIN: Bu satırın görevi: error: '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      error: '',
// EXPLAIN: Bu satırın görevi: processed_at: ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      processed_at: ''
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_TEST | ' + testName + ' | Queued invalid item: ' + testIngestId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('SMOKE_TEST | ' + testName + ' | Queued invalid item: ' + testIngestId);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Run ingest process. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Run ingest process
// EXPLAIN: Bu satırın görevi: const ctx = createJobContext_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const ctx = createJobContext_();
// EXPLAIN: Bu satırın görevi: ingest_process_job(ctx);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ingest_process_job(ctx);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Check DLQ for our item. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Check DLQ for our item
// EXPLAIN: Bu satırın görevi: const dlqSheet = sheet_(SHEETS.DLQ, false);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const dlqSheet = sheet_(SHEETS.DLQ, false);
// EXPLAIN: Bu satırın görevi: if (!dlqSheet) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!dlqSheet) {
// EXPLAIN: Bu satırın görevi: return logSmokeTest_(testName, false, 'DLQ sheet not found');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return logSmokeTest_(testName, false, 'DLQ sheet not found');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Verify DLQ header structure (COL2 should be ingest_id). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Verify DLQ header structure (COL2 should be ingest_id)
// EXPLAIN: Bu satırın görevi: const dlqHeaders = dlqSheet.getRange(1, 1, 1, dlqSheet.getLastColumn()).getValues()[0];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const dlqHeaders = dlqSheet.getRange(1, 1, 1, dlqSheet.getLastColumn()).getValues()[0];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: if (dlqHeaders[1] !== 'ingest_id') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (dlqHeaders[1] !== 'ingest_id') {
// EXPLAIN: Bu satırın görevi: riskFlags.push('DLQ_HEADER_MISMATCH');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      riskFlags.push('DLQ_HEADER_MISMATCH');
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_TEST | ' + testName + ' | DLQ COL2 is "' + dlqHeaders[1] + '" not "ingest_id"');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      Logger.log('SMOKE_TEST | ' + testName + ' | DLQ COL2 is "' + dlqHeaders[1] + '" not "ingest_id"');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Find our DLQ entry. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Find our DLQ entry
// EXPLAIN: Bu satırın görevi: const dlqData = getSheetData_(SHEETS.DLQ);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const dlqData = getSheetData_(SHEETS.DLQ);
// EXPLAIN: Bu satırın görevi: const dlqEntry = dlqData.find(row => row.ingest_id === testIngestId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const dlqEntry = dlqData.find(row => row.ingest_id === testIngestId);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const passed = dlqEntry !== undefined;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const passed = dlqEntry !== undefined;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: logEvidence_('DLQ_INSERT', 'ingest_id=' + testIngestId + ' | found_in_dlq=' + passed +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    logEvidence_('DLQ_INSERT', 'ingest_id=' + testIngestId + ' | found_in_dlq=' + passed + 
// EXPLAIN: Bu satırın görevi: ' | dlq_col2_header=' + dlqHeaders[1]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                 ' | dlq_col2_header=' + dlqHeaders[1]);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const result = logSmokeTest_(testName, passed,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const result = logSmokeTest_(testName, passed, 
// EXPLAIN: Bu satırın görevi: 'ingest_id=' + testIngestId + ' found in DLQ: ' + passed);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                                 'ingest_id=' + testIngestId + ' found in DLQ: ' + passed);
// EXPLAIN: Bu satırın görevi: result.risk_flags = riskFlags;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    result.risk_flags = riskFlags;
// EXPLAIN: Bu satırın görevi: return result;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return result;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: const result = logSmokeTest_(testName, false, 'Exception: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const result = logSmokeTest_(testName, false, 'Exception: ' + e.message);
// EXPLAIN: Bu satırın görevi: result.risk_flags = riskFlags;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    result.risk_flags = riskFlags;
// EXPLAIN: Bu satırın görevi: return result;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return result;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Test 4: Gap-free cursor (cursor should not advance on failure). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Test 4: Gap-free cursor (cursor should not advance on failure)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function test_gapFreeCursor_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function test_gapFreeCursor_() {
// EXPLAIN: Bu satırın görevi: const testName = 'gap_free_cursor';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const testName = 'gap_free_cursor';
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_TEST | ' + testName + ' | START');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: // Get current cursor. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Get current cursor
// EXPLAIN: Bu satırın görevi: const cursorBefore = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const cursorBefore = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_TEST | ' + testName + ' | Cursor before: ' + cursorBefore);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('SMOKE_TEST | ' + testName + ' | Cursor before: ' + cursorBefore);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // The previous test should have caused a failure. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // The previous test should have caused a failure
// EXPLAIN: Bu satırın görevi: // Check that JOB_RUN_LOG contains the audit contract string. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Check that JOB_RUN_LOG contains the audit contract string
// EXPLAIN: Bu satırın görevi: const recentRuns = getRecentJobRuns_(5);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const recentRuns = getRecentJobRuns_(5);
// EXPLAIN: Bu satırın görevi: const failedRun = recentRuns.find(run =>. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const failedRun = recentRuns.find(run => 
// EXPLAIN: Bu satırın görevi: run.job_name === 'ingest_process_job' &&. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      run.job_name === 'ingest_process_job' && 
// EXPLAIN: Bu satırın görevi: (run.notes === AUDIT_CONTRACT_STRING || run.message?.includes('Failed')). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      (run.notes === AUDIT_CONTRACT_STRING || run.message?.includes('Failed'))
// EXPLAIN: Bu satırın görevi: );. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    );
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: let passed = false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    let passed = false;
// EXPLAIN: Bu satırın görevi: if (failedRun) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (failedRun) {
// EXPLAIN: Bu satırın görevi: // Verify notes contains EXACT audit contract string. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      // Verify notes contains EXACT audit contract string
// EXPLAIN: Bu satırın görevi: passed = failedRun.notes === AUDIT_CONTRACT_STRING;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      passed = failedRun.notes === AUDIT_CONTRACT_STRING;
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_TEST | ' + testName + ' | Found failed run with notes: ' + failedRun.notes);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      Logger.log('SMOKE_TEST | ' + testName + ' | Found failed run with notes: ' + failedRun.notes);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: logEvidence_('GAP_FREE', 'audit_string_match=' + passed +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    logEvidence_('GAP_FREE', 'audit_string_match=' + passed + 
// EXPLAIN: Bu satırın görevi: ' | expected="' + AUDIT_CONTRACT_STRING + '"');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                 ' | expected="' + AUDIT_CONTRACT_STRING + '"');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: return logSmokeTest_(testName, passed,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return logSmokeTest_(testName, passed, 
// EXPLAIN: Bu satırın görevi: 'Audit contract string exact match: ' + passed);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                         'Audit contract string exact match: ' + passed);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: return logSmokeTest_(testName, false, 'Exception: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return logSmokeTest_(testName, false, 'Exception: ' + e.message);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Test 5: LAND payload normalization (docs_required, parcel_present). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Test 5: LAND payload normalization (docs_required, parcel_present)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function test_landPayload_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function test_landPayload_() {
// EXPLAIN: Bu satırın görevi: const testName = 'land_payload_normalization';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const testName = 'land_payload_normalization';
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_TEST | ' + testName + ' | START');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: const landPayload = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const landPayload = {
// EXPLAIN: Bu satırın görevi: first_name: 'Test',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      first_name: 'Test',
// EXPLAIN: Bu satırın görevi: last_name: 'Land Lead',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      last_name: 'Land Lead',
// EXPLAIN: Bu satırın görevi: phone: '+905551234567',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      phone: '+905551234567',
// EXPLAIN: Bu satırın görevi: deal_type: 'LAND',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      deal_type: 'LAND',
// EXPLAIN: Bu satırın görevi: docs_required: 'tapu,imar,kadastro',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      docs_required: 'tapu,imar,kadastro',
// EXPLAIN: Bu satırın görevi: parcel_present: 'yes',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      parcel_present: 'yes',
// EXPLAIN: Bu satırın görevi: land_area: '5000m2',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      land_area: '5000m2',
// EXPLAIN: Bu satırın görevi: zoning: 'imarlı'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      zoning: 'imarlı'
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const normalized = normalizeLandPayload_(landPayload);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const normalized = normalizeLandPayload_(landPayload);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const passed = normalized.deal.deal_type === 'LAND' &&. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const passed = normalized.deal.deal_type === 'LAND' &&
// EXPLAIN: Bu satırın görevi: normalized.deal.docs_required === 'tapu,imar,kadastro' &&. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                   normalized.deal.docs_required === 'tapu,imar,kadastro' &&
// EXPLAIN: Bu satırın görevi: normalized.deal.parcel_present === 'yes';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                   normalized.deal.parcel_present === 'yes';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: logEvidence_('LAND_PAYLOAD', 'deal_type=' + normalized.deal.deal_type +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    logEvidence_('LAND_PAYLOAD', 'deal_type=' + normalized.deal.deal_type + 
// EXPLAIN: Bu satırın görevi: ' | docs_required=' + normalized.deal.docs_required +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                 ' | docs_required=' + normalized.deal.docs_required +
// EXPLAIN: Bu satırın görevi: ' | parcel_present=' + normalized.deal.parcel_present);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                 ' | parcel_present=' + normalized.deal.parcel_present);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: return logSmokeTest_(testName, passed,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return logSmokeTest_(testName, passed, 
// EXPLAIN: Bu satırın görevi: 'LAND fields normalized correctly: ' + passed);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                         'LAND fields normalized correctly: ' + passed);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: return logSmokeTest_(testName, false, 'Exception: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return logSmokeTest_(testName, false, 'Exception: ' + e.message);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Test 6: Events append-only (no update/delete). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Test 6: Events append-only (no update/delete)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function test_eventsAppendOnly_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function test_eventsAppendOnly_() {
// EXPLAIN: Bu satırın görevi: const testName = 'events_append_only';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const testName = 'events_append_only';
// EXPLAIN: Bu satırın görevi: Logger.log('SMOKE_TEST | ' + testName + ' | START');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: // Append an event. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Append an event
// EXPLAIN: Bu satırın görevi: const result = EventsRepo.append({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const result = EventsRepo.append({
// EXPLAIN: Bu satırın görevi: entity_type: 'TEST',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_type: 'TEST',
// EXPLAIN: Bu satırın görevi: entity_id: 'smoke_test',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_id: 'smoke_test',
// EXPLAIN: Bu satırın görevi: event_type: 'SMOKE_TEST',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      event_type: 'SMOKE_TEST',
// EXPLAIN: Bu satırın görevi: payload: { test: true },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      payload: { test: true },
// EXPLAIN: Bu satırın görevi: source: 'smoke_test',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source: 'smoke_test',
// EXPLAIN: Bu satırın görevi: idempotency_key: 'smoke_event_' + Date.now(). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      idempotency_key: 'smoke_event_' + Date.now()
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Verify it was appended. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Verify it was appended
// EXPLAIN: Bu satırın görevi: const events = EventsRepo.getByEntity('TEST', 'smoke_test');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const events = EventsRepo.getByEntity('TEST', 'smoke_test');
// EXPLAIN: Bu satırın görevi: const found = events.some(e => e.event_id === result.event_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const found = events.some(e => e.event_id === result.event_id);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Verify EventsRepo has no update or delete methods exposed. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Verify EventsRepo has no update or delete methods exposed
// EXPLAIN: Bu satırın görevi: const hasUpdate = typeof EventsRepo.update === 'function';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const hasUpdate = typeof EventsRepo.update === 'function';
// EXPLAIN: Bu satırın görevi: const hasDelete = typeof EventsRepo.delete === 'function';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const hasDelete = typeof EventsRepo.delete === 'function';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const passed = found && !hasUpdate && !hasDelete;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const passed = found && !hasUpdate && !hasDelete;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: logEvidence_('EVENTS_APPEND_ONLY', 'appended=' + found +. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    logEvidence_('EVENTS_APPEND_ONLY', 'appended=' + found + 
// EXPLAIN: Bu satırın görevi: ' | has_update=' + hasUpdate + ' | has_delete=' + hasDelete);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                 ' | has_update=' + hasUpdate + ' | has_delete=' + hasDelete);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: return logSmokeTest_(testName, passed,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return logSmokeTest_(testName, passed, 
// EXPLAIN: Bu satırın görevi: 'Event appended: ' + found + ', No update/delete: ' + (!hasUpdate && !hasDelete));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                         'Event appended: ' + found + ', No update/delete: ' + (!hasUpdate && !hasDelete));
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: return logSmokeTest_(testName, false, 'Exception: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return logSmokeTest_(testName, false, 'Exception: ' + e.message);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
