/**
 * HTML dashboard panel for CB-OS (sidebar).
 * Provides live charts + KPI summary for real-estate operations.
 */

/**
 * Open the dashboard sidebar panel.
 */
function showDashboardPanel() {
  const html = HtmlService.createHtmlOutputFromFile('DashboardPanel')
    .setTitle('CB-OS Live Dashboard');
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Get dashboard data payload for the HTML panel.
 * @returns {Object} Dashboard payload
 */
function getDashboardPanelData_() {
  const runAt = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  const deals = getSheetData_(SHEETS.DEALS);
  const contacts = getSheetData_(SHEETS.CONTACTS);
  const tasks = getSheetData_(SHEETS.TASKS);
  const opsRows = getSheetData_(SHEETS.OPS_DASHBOARD);
  const dailySnapshots = getSheetData_(SHEETS.DAILY_SNAPSHOT);

  const pipelineMap = {};
  deals.forEach(deal => {
    const key = [deal.deal_type || '-', deal.stage || '-'].join('|');
    pipelineMap[key] = (pipelineMap[key] || 0) + 1;
  });
  const pipeline = Object.keys(pipelineMap).map(key => {
    const parts = key.split('|');
    return { deal_type: parts[0], stage: parts[1], count: pipelineMap[key] };
  });

  const leadSourceMap = {};
  deals.forEach(deal => {
    const source = deal.lead_source || deal.source || '-';
    leadSourceMap[source] = (leadSourceMap[source] || 0) + 1;
  });
  const leadSources = Object.keys(leadSourceMap).map(source => ({
    lead_source: source,
    count: leadSourceMap[source]
  }));

  const opsLatest = opsRows.length > 0 ? opsRows[opsRows.length - 1] : {};
  const ingestPending = QueueRepo.getPending().length;
  const dlqCount = getSheetData_(SHEETS.DLQ).length;
  const totalIngest = getSheetData_(SHEETS.INGEST_QUEUE).length;
  const errorRate = totalIngest > 0 ? (dlqCount / totalIngest) : 0;

  const cursor = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);
  let cursorDriftMinutes = 0;
  if (cursor) {
    const cursorDate = new Date(cursor);
    cursorDriftMinutes = Math.round((Date.now() - cursorDate.getTime()) / 60000);
  }

  return {
    run_at: runAt,
    kpis: {
      contacts_total: contacts.length,
      deals_total: deals.length,
      tasks_open: tasks.filter(t => t.status === 'pending').length,
      tasks_overdue: tasks.filter(t => t.status === 'pending' && isPastDate_(t.due_date)).length,
      sla_first_touch_breach: countFirstTouchBreaches_(deals),
      stuck_stage_over_threshold: countStuckStage_(deals)
    },
    pipeline: pipeline,
    lead_sources: leadSources,
    ops: {
      ingest_pending: ingestPending,
      dlq_count: dlqCount,
      error_rate: errorRate,
      cursor_drift_minutes: cursorDriftMinutes,
      latest_snapshot: opsLatest
    },
    daily_snapshots: dailySnapshots.slice(-30)
  };
}
