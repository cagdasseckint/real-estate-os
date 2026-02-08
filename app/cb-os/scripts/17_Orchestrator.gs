/**
 * Main orchestrator function - to be triggered every 15 minutes
 * Does NOT create trigger - trigger must be set up manually in Apps Script
 * @param {Object} e - Trigger event (optional)
 */
function ORCH_15MIN(e) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) {
    Logger.log('ORCH | Lock busy, skipping run');
    return { skipped: true, reason: 'lock_busy' };
  }
  
  const ctx = createJobContext_();
  
  Logger.log('========== ORCH_15MIN START ==========');
  Logger.log('ORCH | run_id=' + ctx.orch_run_id + ' | started_at=' + ctx.started_at);
  
  const results = {
    orch_run_id: ctx.orch_run_id,
    started_at: ctx.started_at,
    jobs: []
  };
  
  try {
    // Job 1: Ingest Process
    Logger.log('ORCH | Starting job 1: ingest_process_job');
    const ingestResult = runWithErrorBoundary_('ingest_process_job', () => ingest_process_job(ctx), {
      processed: 0,
      skipped: 0,
      failed: 0,
      stopped_on_failure: true
    });
    results.jobs.push({ name: 'ingest_process_job', result: ingestResult });
    
    // Job 2: Calendar Sync
    Logger.log('ORCH | Starting job 2: calendar_sync_job');
    const calendarResult = runWithErrorBoundary_('calendar_sync_job', () => calendar_sync_job(ctx), {
      synced: 0,
      skipped: 0,
      errors: 1
    });
    results.jobs.push({ name: 'calendar_sync_job', result: calendarResult });
    
    // Job 3: Gmail Scan
    Logger.log('ORCH | Starting job 3: gmail_scan_job');
    const gmailResult = runWithErrorBoundary_('gmail_scan_job', () => gmail_scan_job(ctx), {
      scanned: 0,
      leads_found: 0,
      errors: 1
    });
    results.jobs.push({ name: 'gmail_scan_job', result: gmailResult });
    
    // Job 4: Guardrails
    Logger.log('ORCH | Starting job 4: guardrails_job');
    const guardrailsResult = runWithErrorBoundary_('guardrails_job', () => guardrails_job(ctx), {
      stuck_deals: 0,
      overdue_tasks: 0,
      sla_violations: 0,
      alerts_created: 0,
      lead_scores: 0,
      draft_emails: 0
    });
    results.jobs.push({ name: 'guardrails_job', result: guardrailsResult });
    
    // Job 5: DLQ Retry
    Logger.log('ORCH | Starting job 5: dlq_retry_job');
    const dlqResult = runWithErrorBoundary_('dlq_retry_job', () => dlq_retry_job(ctx), {
      retried: 0,
      skipped: 0,
      max_retry_reached: 0
    });
    results.jobs.push({ name: 'dlq_retry_job', result: dlqResult });

    // Job 6: Extensions Summary (validations + role views)
    if (typeof extensions_summary_job === 'function') {
      Logger.log('ORCH | Starting job 6: extensions_summary_job');
      const extensionsResult = runWithErrorBoundary_('extensions_summary_job', () => extensions_summary_job(ctx), {
        validations_applied: 0,
        role_views_refreshed: 0
      });
      results.jobs.push({ name: 'extensions_summary_job', result: extensionsResult });
    }
    
  } catch (e) {
    Logger.log('ORCH | FATAL ERROR: ' + e.message);
    results.error = e.message;
  } finally {
    lock.releaseLock();
  }
  
  results.completed_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  
  Logger.log('ORCH | Complete. Jobs run: ' + results.jobs.length);
  Logger.log('========== ORCH_15MIN END ==========');
  
  return results;
}

/**
 * Calendar sync job - sync appointments with Google Calendar
 * @param {Object} ctx - Job context
 * @returns {Object} Job result
 */
function calendar_sync_job(ctx) {
  ctx = ctx || createJobContext_();
  const jobName = 'calendar_sync_job';
  
  const cursorBefore = getCursor_(CURSORS.CALENDAR_LAST_SYNCED_AT);
  let cursorAfter = cursorBefore;
  
  Logger.log('CALENDAR_SYNC | Starting (cursor=' + cursorBefore + ')');
  
  const result = {
    synced: 0,
    skipped: 0,
    errors: 0
  };
  
  try {
    const calendar = CalendarApp.getDefaultCalendar();
    const lookbackDays = cfg_('CALENDAR_SYNC_LOOKBACK_DAYS', DEFAULTS.CALENDAR_SYNC_LOOKBACK_DAYS);
    const lookaheadDays = cfg_('CALENDAR_SYNC_LOOKAHEAD_DAYS', DEFAULTS.CALENDAR_SYNC_LOOKAHEAD_DAYS);
    const now = new Date();
    const rangeStart = new Date(now);
    rangeStart.setDate(rangeStart.getDate() - Number(lookbackDays || 0));
    const rangeEnd = new Date(now);
    rangeEnd.setDate(rangeEnd.getDate() + Number(lookaheadDays || 0));
    const cursorBeforeMs = cursorBefore ? parseCbTimeMs_(cursorBefore) : null;
    
    // Get appointments without google_event_id
    const apptData = getSheetData_(SHEETS.APPOINTMENTS);
    const pending = apptData.filter(a => !a.google_event_id && a.status === 'scheduled');
    
    for (const appt of pending) {
      try {
        const scheduledAt = parseIso_(appt.scheduled_at) || new Date(appt.scheduled_at);
        if (!scheduledAt || isNaN(scheduledAt.getTime())) {
          Logger.log('CALENDAR_SYNC | Invalid scheduled_at: ' + appt.appointment_id);
          result.skipped++;
          continue;
        }
        
        const durationMinutes = Number(appt.duration_minutes) || 30;
        const endAt = new Date(scheduledAt.getTime() + durationMinutes * 60000);
        const title = appt.meeting_type ? 'CB-OS: ' + appt.meeting_type : 'CB-OS Appointment';
        const event = calendar.createEvent(title, scheduledAt, endAt, {
          location: appt.location || '',
          description: appt.notes || ''
        });
        
        updateRow_(SHEETS.APPOINTMENTS, appt._rowIndex, {
          google_event_id: event.getId()
        });
        
        result.synced++;
        
      } catch (e) {
        Logger.log('CALENDAR_SYNC | Error syncing ' + appt.appointment_id + ': ' + e.message);
        result.errors++;
      }
    }
    
    // Pull updates from calendar to sheet
    const events = calendar.getEvents(rangeStart, rangeEnd);
    const apptsByEventId = {};
    apptData.forEach(appt => {
      if (appt.google_event_id) {
        apptsByEventId[appt.google_event_id] = appt;
      }
    });
    
    for (const event of events) {
      const eventId = event.getId();
      const appt = apptsByEventId[eventId];
      if (!appt) continue;
      
      const lastUpdated = event.getLastUpdated();
      if (cursorBeforeMs && lastUpdated && lastUpdated.getTime() <= cursorBeforeMs) {
        continue;
      }
      
      const start = event.getStartTime();
      const end = event.getEndTime();
      const durationMinutes = Math.round((end.getTime() - start.getTime()) / 60000);
      
      updateRow_(SHEETS.APPOINTMENTS, appt._rowIndex, {
        scheduled_at: formatIsoWithOffset_(start, cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
        duration_minutes: durationMinutes,
        location: event.getLocation() || appt.location || '',
        notes: event.getDescription() || appt.notes || ''
      });
      
      result.synced++;
    }
    
    // Mark appointments with missing events as cancelled
    for (const appt of apptData) {
      if (!appt.google_event_id) continue;
      const event = calendar.getEventById(appt.google_event_id);
      if (!event && appt.status === 'scheduled') {
        updateRow_(SHEETS.APPOINTMENTS, appt._rowIndex, { status: 'cancelled' });
      }
    }
    
    cursorAfter = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    setCursor_(CURSORS.CALENDAR_LAST_SYNCED_AT, cursorAfter);
    
  } catch (e) {
    Logger.log('CALENDAR_SYNC | Job error: ' + e.message);
  }
  
  logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '', 
             'Synced=' + result.synced + ', Skipped=' + result.skipped);
  
  Logger.log('CALENDAR_SYNC | Complete: ' + JSON.stringify(result));
  return result;
}

/**
 * Gmail scan job - scan labeled emails for leads/interactions
 * @param {Object} ctx - Job context
 * @returns {Object} Job result
 */
function gmail_scan_job(ctx) {
  ctx = ctx || createJobContext_();
  const jobName = 'gmail_scan_job';
  
  const cursorBefore = getCursor_(CURSORS.GMAIL_LAST_SCANNED_AT);
  let cursorAfter = cursorBefore;
  
  Logger.log('GMAIL_SCAN | Starting (cursor=' + cursorBefore + ')');
  
  const result = {
    scanned: 0,
    leads_found: 0,
    errors: 0
  };
  
  try {
    const labels = cfg_('GMAIL_SCAN_LABELS', DEFAULTS.GMAIL_SCAN_LABELS).split(',');
    
    for (const label of labels) {
      try {
        const labelName = label.trim();
        Logger.log('GMAIL_SCAN | Scanning label: ' + labelName);
        const signalResult = processGmailSignals_(labelName, cursorBefore);
        result.scanned += signalResult.scanned;
        result.leads_found += signalResult.enqueued;
        
      } catch (e) {
        Logger.log('GMAIL_SCAN | Error scanning label ' + label + ': ' + e.message);
        result.errors++;
      }
    }
    
    cursorAfter = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    setCursor_(CURSORS.GMAIL_LAST_SCANNED_AT, cursorAfter);
    
  } catch (e) {
    Logger.log('GMAIL_SCAN | Job error: ' + e.message);
  }
  
  logJobRun_(ctx, jobName, cursorBefore, cursorAfter, '', 
             'Scanned=' + result.scanned + ', Leads=' + result.leads_found);
  
  Logger.log('GMAIL_SCAN | Complete: ' + JSON.stringify(result));
  return result;
}

/**
 * Guardrails job - check SLA violations, stuck deals, overdue tasks
 * @param {Object} ctx - Job context
 * @returns {Object} Job result
 */
function guardrails_job(ctx) {
  ctx = ctx || createJobContext_();
  const jobName = 'guardrails_job';
  
  Logger.log('GUARDRAILS | Starting');
  
  const result = {
    stuck_deals: 0,
    overdue_tasks: 0,
    sla_violations: 0,
    alerts_created: 0,
    lead_scores: 0,
    draft_emails: 0
  };
  
  try {
    // Check stuck deals
    const stuckDeals = DealsRepo.getStuck();
    result.stuck_deals = stuckDeals.length;
    
    for (const deal of stuckDeals) {
      Logger.log('GUARDRAILS | Stuck deal: ' + deal.deal_id + ' in stage ' + deal.stage);
      
      // Create alert task
      TasksRepo.create({
        entity_type: 'DEAL',
        entity_id: deal.deal_id,
        title: 'ALERT: Deal stuck in ' + deal.stage,
        description: 'This deal has been in ' + deal.stage + ' for more than ' + 
                     cfg_('STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD) + ' days',
        priority: 'high',
        status: 'pending'
      });
      result.alerts_created++;
    }
    
    // Check overdue tasks
    const overdueTasks = TasksRepo.getOverdue();
    result.overdue_tasks = overdueTasks.length;
    
    for (const task of overdueTasks) {
      Logger.log('GUARDRAILS | Overdue task: ' + task.task_id + ' - ' + task.title);
    }
    
    // Check SLA violations (first touch within 30 minutes)
    // This would check EVENTS for new leads without first touch event within SLA
    const slaMinutes = cfg_('SLA_FIRST_TOUCH_MINUTES', DEFAULTS.SLA_FIRST_TOUCH_MINUTES);
    Logger.log('GUARDRAILS | SLA threshold: ' + slaMinutes + ' minutes');
    
    // Simplified SLA check - in production would be more sophisticated
    const recentEvents = EventsRepo.getRecent(24);
    const newLeadEvents = recentEvents.filter(e => e.event_type === 'CONTACT_CREATED');
    const firstTouchEvents = recentEvents.filter(e => e.event_type === 'FIRST_TOUCH');
    
    // Count leads without first touch
    for (const leadEvent of newLeadEvents) {
      const hasFirstTouch = firstTouchEvents.some(ft => ft.entity_id === leadEvent.entity_id);
      if (!hasFirstTouch) {
        result.sla_violations++;
      }
    }
    
    // Stage-level SLA checks
    for (const deal of DealsRepo.getActive()) {
      const slaDays = getStageSlaDays_(deal.deal_type, deal.stage);
      if (!slaDays || !deal.last_stage_change_at) continue;
      
      const cutoff = new Date(deal.last_stage_change_at);
      cutoff.setDate(cutoff.getDate() + Number(slaDays));
      if (new Date() > cutoff) {
        result.sla_violations++;
        TasksRepo.create({
          entity_type: 'DEAL',
          entity_id: deal.deal_id,
          title: 'SLA Breach: ' + deal.stage,
          description: 'Stage SLA ' + slaDays + ' gün aşıldı.',
          priority: 'high',
          status: 'pending'
        });
        result.alerts_created++;
      }
    }
    
    // Lead scoring + top follow-ups
    const scores = computeLeadScores_();
    result.lead_scores = scores.length;
    createTopFollowupTasks_(scores);
    
    // Email draft queue
    const draftResult = processEmailDraftQueue_();
    result.draft_emails = draftResult.drafted;
    
    // Ops dashboard snapshot
    updateOpsDashboard_();
    updateDailySnapshot_();
    refreshFinanceDashboard_();
    archiveOperationalTables_();
    
    // Drive share audit
    runDriveShareAudit_();
    
    // SLA/stuck summary email
    const recipients = cfg_('SLA_ALERT_RECIPIENTS', DEFAULTS.SLA_ALERT_RECIPIENTS);
    if (recipients && (result.sla_violations > 0 || result.stuck_deals > 0)) {
      const subject = 'CB-OS SLA & Stuck Deal Uyarısı';
      const body = [
        'SLA ihlalleri: ' + result.sla_violations,
        'Stuck deal sayısı: ' + result.stuck_deals,
        'Overdue task sayısı: ' + result.overdue_tasks
      ].join('\n');
      sendEmailSafe_(recipients, subject, body);
    }
    
  } catch (e) {
    Logger.log('GUARDRAILS | Job error: ' + e.message);
  }
  
  logJobRun_(ctx, jobName, '', '', '', 
             'Stuck=' + result.stuck_deals + ', Overdue=' + result.overdue_tasks + 
             ', SLA=' + result.sla_violations + ', LeadScores=' + result.lead_scores);
  
  Logger.log('GUARDRAILS | Complete: ' + JSON.stringify(result));
  return result;
}

/**
 * Manual trigger setup instructions
 * User should create a time-driven trigger manually:
 * 1. Open Apps Script editor
 * 2. Go to Triggers (clock icon)
 * 3. Add Trigger:
 *    - Function: ORCH_15MIN
 *    - Event source: Time-driven
 *    - Type: Minutes timer
 *    - Interval: Every 15 minutes
 */
function showTriggerSetupInstructions() {
  const instructions = `
========================================
ORCH_15MIN TRIGGER SETUP INSTRUCTIONS
========================================

To enable automatic orchestration every 15 minutes:

1. In Apps Script editor, click the clock icon (Triggers)
2. Click "+ Add Trigger"
3. Configure:
   - Choose function: ORCH_15MIN
   - Choose deployment: Head
   - Event source: Time-driven
   - Type of time based trigger: Minutes timer
   - Select minute interval: Every 15 minutes
4. Click Save

The orchestrator will then run automatically every 15 minutes,
executing jobs in this order:
  1. ingest_process_job
  2. calendar_sync_job
  3. gmail_scan_job
  4. guardrails_job
  5. dlq_retry_job

========================================
  `;
  
  Logger.log(instructions);
  return instructions;
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
