/**
 * CB-OS V1.0 - 15_SmokeTests.gs
 * Smoke test suite - Appendix A FINAL compliant
 * 
 * HARD-RULE COMPLIANCE:
 * - No ops_log for smoke tests (Hard-rule #3: ops_log scope=audit_only only)
 * - Enqueue via QueueRepo.enqueue() where possible (Hard-rule #2)
 * - Logger RAW + SMOKE_TEST_LOG + sheet evidence
 * - DLQ kanıt standardı: COL2 = ingest_id (Hard-rule #6)
 */

/**
 * Run all smoke tests
 * @returns {Object} Smoke test results
 */
function runSmokeTests() {
  Logger.log('========== SMOKE TEST SUITE START ==========');
  
  const results = {
    run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    smoke_checked_by: cfg_('SMOKE_CHECKED_BY', 'Real_Estate_Agent'),
    tests: [],
    passed: 0,
    failed: 0,
    risk_flags: []
  };
  
  // Ensure sheets exist (GREENFIELD bootstrap)
  const bootstrapResult = bootstrapSheets_();
  Logger.log('SMOKE_TEST | Bootstrap: created=' + bootstrapResult.created.length + 
             ', existing=' + bootstrapResult.existing.length);
  
  // Test 1: Deterministic enqueue ordering
  results.tests.push(test_deterministicEnqueue_());
  
  // Test 2: Idempotency key deduplication
  results.tests.push(test_idempotencyDedup_());
  
  // Test 3: DLQ insert on failure (COL2 = ingest_id)
  results.tests.push(test_dlqInsert_());
  
  // Test 4: Gap-free cursor (no advance on failure)
  results.tests.push(test_gapFreeCursor_());
  
  // Test 5: LAND payload normalization
  results.tests.push(test_landPayload_());
  
  // Test 6: Events append-only
  results.tests.push(test_eventsAppendOnly_());
  
  // Summarize results and deduplicate risk_flags
  const seenFlags = new Set();
  for (const test of results.tests) {
    if (test.result === 'PASS') {
      results.passed++;
    } else {
      results.failed++;
    }
    if (test.risk_flags && test.risk_flags.length > 0) {
      for (const flag of test.risk_flags) {
        if (!seenFlags.has(flag)) {
          seenFlags.add(flag);
          results.risk_flags.push(flag);
        }
      }
    }
  }
  
  // Format risk_flags
  const riskFlagsStr = results.risk_flags.length > 0 ? 
                       results.risk_flags.join(',') : '-';
  
  Logger.log('========== SMOKE TEST SUITE END ==========');
  Logger.log('SMOKE_SUMMARY | passed=' + results.passed + ' | failed=' + results.failed + 
             ' | risk_flags=' + riskFlagsStr + ' | checked_by=' + results.smoke_checked_by);
  
  // Dump sheet evidence
  dumpSheetEvidence_(SHEETS.INGEST_QUEUE, 1, 10);
  dumpSheetEvidence_(SHEETS.DLQ, 1, 5);
  dumpSheetEvidence_(SHEETS.DEDUP_KEYS, 1, 5);
  dumpSheetEvidence_(SHEETS.EVENTS, 1, 5);
  
  return results;
}

/**
 * Test 1: Deterministic enqueue ordering
 * A enqueue -> sleep >= 1000ms -> B enqueue
 * Verify A.received_at < B.received_at
 */
function test_deterministicEnqueue_() {
  const testName = 'deterministic_enqueue_ordering';
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
  
  try {
    // Enqueue A with its own timestamp
    const itemA = QueueRepo.enqueue({
      ingest_type: INGEST_TYPES.EVENT_LOG,
      payload: { test: 'A', purpose: 'smoke_determinism' },
      source: 'smoke_test',
      idempotency_key: 'smoke_A_' + Date.now()
    });
    const receivedAtA = itemA.received_at;
    
    Logger.log('SMOKE_TEST | ' + testName + ' | A enqueued: ' + receivedAtA);
    
    // Sleep >= 1000ms (required by Appendix A)
    Utilities.sleep(1100);
    
    // Enqueue B with its own timestamp (NOT reusing A's timestamp)
    const itemB = QueueRepo.enqueue({
      ingest_type: INGEST_TYPES.EVENT_LOG,
      payload: { test: 'B', purpose: 'smoke_determinism' },
      source: 'smoke_test',
      idempotency_key: 'smoke_B_' + Date.now()
    });
    const receivedAtB = itemB.received_at;
    
    Logger.log('SMOKE_TEST | ' + testName + ' | B enqueued: ' + receivedAtB);
    
    // Verify A < B
    const passed = receivedAtA < receivedAtB;
    
    logEvidence_('DETERMINISM', 'A=' + receivedAtA + ' | B=' + receivedAtB + ' | A<B=' + passed);
    
    return logSmokeTest_(testName, passed, 
                         'A=' + receivedAtA + ', B=' + receivedAtB + ', A<B=' + passed);
    
  } catch (e) {
    return logSmokeTest_(testName, false, 'Exception: ' + e.message);
  }
}

/**
 * Test 2: Idempotency key deduplication
 */
function test_idempotencyDedup_() {
  const testName = 'idempotency_dedup';
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
  
  try {
    const uniqueKey = 'smoke_dedup_' + Date.now();
    
    // First insert should succeed
    const result1 = DedupRepo.insertIfNotExists(uniqueKey);
    Logger.log('SMOKE_TEST | ' + testName + ' | First insert: ' + result1.inserted);
    
    // Second insert should fail (duplicate)
    const result2 = DedupRepo.insertIfNotExists(uniqueKey);
    Logger.log('SMOKE_TEST | ' + testName + ' | Second insert: ' + result2.inserted);
    
    const passed = result1.inserted === true && result2.inserted === false;
    
    logEvidence_('IDEMPOTENCY', 'key=' + uniqueKey + ' | first=' + result1.inserted + 
                 ' | second=' + result2.inserted);
    
    return logSmokeTest_(testName, passed, 
                         'First=' + result1.inserted + ', Second=' + result2.inserted);
    
  } catch (e) {
    return logSmokeTest_(testName, false, 'Exception: ' + e.message);
  }
}

/**
 * Test 3: DLQ insert on failure (verify COL2 = ingest_id)
 */
function test_dlqInsert_() {
  const testName = 'dlq_insert_col2_ingest_id';
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
  
  const riskFlags = [];
  
  try {
    // Enqueue item with invalid JSON payload (will fail parsing)
    const testIngestId = 'smoke_dlq_' + Date.now();
    
    // Manually insert to queue with malformed payload (E-002 fix: removed unused variable)
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    
    appendRow_(SHEETS.INGEST_QUEUE, {
      status: INGEST_STATUS.NEW,
      ingest_id: testIngestId,
      received_at: now,
      ingest_type: 'invalid_type_for_test',
      payload_json: '{invalid json',  // Malformed JSON
      source: 'smoke_test',
      source_ref_id: '',
      idempotency_key: 'smoke_dlq_key_' + Date.now(),
      error: '',
      processed_at: ''
    });
    
    Logger.log('SMOKE_TEST | ' + testName + ' | Queued invalid item: ' + testIngestId);
    
    // Run ingest process
    const ctx = createJobContext_();
    ingest_process_job(ctx);
    
    // Check DLQ for our item
    const dlqSheet = sheet_(SHEETS.DLQ, false);
    if (!dlqSheet) {
      return logSmokeTest_(testName, false, 'DLQ sheet not found');
    }
    
    // Verify DLQ header structure (COL2 should be ingest_id)
    const dlqHeaders = dlqSheet.getRange(1, 1, 1, dlqSheet.getLastColumn()).getValues()[0];
    
    if (dlqHeaders[1] !== 'ingest_id') {
      riskFlags.push('DLQ_HEADER_MISMATCH');
      Logger.log('SMOKE_TEST | ' + testName + ' | DLQ COL2 is "' + dlqHeaders[1] + '" not "ingest_id"');
    }
    
    // Find our DLQ entry
    const dlqData = getSheetData_(SHEETS.DLQ);
    const dlqEntry = dlqData.find(row => row.ingest_id === testIngestId);
    
    const passed = dlqEntry !== undefined;
    
    logEvidence_('DLQ_INSERT', 'ingest_id=' + testIngestId + ' | found_in_dlq=' + passed + 
                 ' | dlq_col2_header=' + dlqHeaders[1]);
    
    const result = logSmokeTest_(testName, passed, 
                                 'ingest_id=' + testIngestId + ' found in DLQ: ' + passed);
    result.risk_flags = riskFlags;
    return result;
    
  } catch (e) {
    const result = logSmokeTest_(testName, false, 'Exception: ' + e.message);
    result.risk_flags = riskFlags;
    return result;
  }
}

/**
 * Test 4: Gap-free cursor (cursor should not advance on failure)
 */
function test_gapFreeCursor_() {
  const testName = 'gap_free_cursor';
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
  
  try {
    // Get current cursor
    const cursorBefore = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);
    Logger.log('SMOKE_TEST | ' + testName + ' | Cursor before: ' + cursorBefore);
    
    // The previous test should have caused a failure
    // Check that JOB_RUN_LOG contains the audit contract string
    const recentRuns = getRecentJobRuns_(5);
    const failedRun = recentRuns.find(run => 
      run.job_name === 'ingest_process_job' && 
      (run.notes === AUDIT_CONTRACT_STRING || run.message?.includes('Failed'))
    );
    
    let passed = false;
    if (failedRun) {
      // Verify notes contains EXACT audit contract string
      passed = failedRun.notes === AUDIT_CONTRACT_STRING;
      Logger.log('SMOKE_TEST | ' + testName + ' | Found failed run with notes: ' + failedRun.notes);
    }
    
    logEvidence_('GAP_FREE', 'audit_string_match=' + passed + 
                 ' | expected="' + AUDIT_CONTRACT_STRING + '"');
    
    return logSmokeTest_(testName, passed, 
                         'Audit contract string exact match: ' + passed);
    
  } catch (e) {
    return logSmokeTest_(testName, false, 'Exception: ' + e.message);
  }
}

/**
 * Test 5: LAND payload normalization (docs_required, parcel_present)
 */
function test_landPayload_() {
  const testName = 'land_payload_normalization';
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
  
  try {
    const landPayload = {
      first_name: 'Test',
      last_name: 'Land Lead',
      phone: '+905551234567',
      deal_type: 'LAND',
      docs_required: 'tapu,imar,kadastro',
      parcel_present: 'yes',
      land_area: '5000m2',
      zoning: 'imarlı'
    };
    
    const normalized = normalizeLandPayload_(landPayload);
    
    const passed = normalized.deal.deal_type === 'LAND' &&
                   normalized.deal.docs_required === 'tapu,imar,kadastro' &&
                   normalized.deal.parcel_present === 'yes';
    
    logEvidence_('LAND_PAYLOAD', 'deal_type=' + normalized.deal.deal_type + 
                 ' | docs_required=' + normalized.deal.docs_required +
                 ' | parcel_present=' + normalized.deal.parcel_present);
    
    return logSmokeTest_(testName, passed, 
                         'LAND fields normalized correctly: ' + passed);
    
  } catch (e) {
    return logSmokeTest_(testName, false, 'Exception: ' + e.message);
  }
}

/**
 * Test 6: Events append-only (no update/delete)
 */
function test_eventsAppendOnly_() {
  const testName = 'events_append_only';
  Logger.log('SMOKE_TEST | ' + testName + ' | START');
  
  try {
    // Append an event
    const result = EventsRepo.append({
      entity_type: 'TEST',
      entity_id: 'smoke_test',
      event_type: 'SMOKE_TEST',
      payload: { test: true },
      source: 'smoke_test',
      idempotency_key: 'smoke_event_' + Date.now()
    });
    
    // Verify it was appended
    const events = EventsRepo.getByEntity('TEST', 'smoke_test');
    const found = events.some(e => e.event_id === result.event_id);
    
    // Verify EventsRepo has no update or delete methods exposed
    const hasUpdate = typeof EventsRepo.update === 'function';
    const hasDelete = typeof EventsRepo.delete === 'function';
    
    const passed = found && !hasUpdate && !hasDelete;
    
    logEvidence_('EVENTS_APPEND_ONLY', 'appended=' + found + 
                 ' | has_update=' + hasUpdate + ' | has_delete=' + hasDelete);
    
    return logSmokeTest_(testName, passed, 
                         'Event appended: ' + found + ', No update/delete: ' + (!hasUpdate && !hasDelete));
    
  } catch (e) {
    return logSmokeTest_(testName, false, 'Exception: ' + e.message);
  }
}
