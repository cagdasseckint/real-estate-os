/**
 * Unified tables and charts dashboard utilities.
 */

/**
 * Bootstrap dashboard sheets (unified table + charts).
 * Uses canonical headers for UNIFIED_TABLES.
 */
function bootstrapDashboardSheets_() {
  sheet_(SHEETS.UNIFIED_TABLES, true);
  sheet_(SHEETS.DASHBOARD_CHARTS, true);
  sheet_(SHEETS.DASHBOARD_SUMMARY, true);
  sheet_(SHEETS.DASHBOARD_PIPELINE, true);
  sheet_(SHEETS.DASHBOARD_LEAD_SOURCES, true);
  sheet_(SHEETS.DASHBOARD_SLA, true);
}

/**
 * Refresh a unified table view by combining all CB-OS sheets into one table.
 * Each row is stored as JSON to preserve the original schema.
 * @param {Object} options - Refresh options
 * @param {boolean} options.incremental - Use incremental mode (default false)
 * @param {Array<string>} options.include_tables - Limit to specific tables
 * @param {Array<string>} options.exclude_tables - Tables to skip
 * @param {number} options.max_rows - Max rows to append per run (incremental only)
 * @param {string} options.since_iso - Only include rows with updated_at >= since_iso
 * @returns {Object} Refresh summary
 */
function refreshUnifiedTables_(options) {
  const opts = options || {};
  bootstrapDashboardSheets_();
  const unifiedSheet = sheet_(SHEETS.UNIFIED_TABLES, false);
  if (!unifiedSheet) return { ok: false, reason: 'missing_unified_sheet' };

  const allTables = Object.values(SHEETS).filter(name => !isDashboardSheet_(name));
  let tableNames = allTables.slice();
  if (opts.include_tables && opts.include_tables.length > 0) {
    tableNames = tableNames.filter(name => opts.include_tables.indexOf(name) !== -1);
  }
  if (opts.exclude_tables && opts.exclude_tables.length > 0) {
    tableNames = tableNames.filter(name => opts.exclude_tables.indexOf(name) === -1);
  }

  const incremental = Boolean(opts.incremental);
  const sinceIso = opts.since_iso || (incremental ? getUnifiedCursor_() : '');
  const maxRows = Number(opts.max_rows || 0);

  const rows = [];
  for (const tableName of tableNames) {
    const data = getSheetData_(tableName);
    for (const row of data) {
      const updatedAt = extractUnifiedTimestamp_(row);
      if (sinceIso && updatedAt && updatedAt < sinceIso) {
        continue;
      }
      const rowId = buildUnifiedRowId_(tableName, row);
      const rowCopy = Object.assign({}, row);
      delete rowCopy._rowIndex;
      rows.push([
        tableName,
        rowId,
        updatedAt,
        JSON.stringify(rowCopy)
      ]);
      if (incremental && maxRows > 0 && rows.length >= maxRows) {
        break;
      }
    }
    if (incremental && maxRows > 0 && rows.length >= maxRows) {
      break;
    }
  }

  if (!incremental) {
    unifiedSheet.clearContents();
    unifiedSheet.getRange(1, 1, 1, CANONICAL_HEADERS[SHEETS.UNIFIED_TABLES].length)
      .setValues([CANONICAL_HEADERS[SHEETS.UNIFIED_TABLES]]);
    unifiedSheet.getRange(1, 1, 1, CANONICAL_HEADERS[SHEETS.UNIFIED_TABLES].length)
      .setFontWeight('bold');
  }

  if (rows.length > 0) {
    const startRow = incremental ? unifiedSheet.getLastRow() + 1 : 2;
    unifiedSheet.getRange(startRow, 1, rows.length, rows[0].length).setValues(rows);
  }

  if (incremental) {
    setUnifiedCursor_(nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)));
  }

  return {
    ok: true,
    rows: rows.length,
    tables: tableNames.length,
    incremental: incremental,
    since: sinceIso || ''
  };
}

/**
 * Build a stable row id for the unified table.
 * @param {string} tableName - Sheet/table name
 * @param {Object} row - Row data
 * @returns {string} Row identifier
 */
function buildUnifiedRowId_(tableName, row) {
  const preferredKeys = [
    'ingest_id', 'contact_id', 'deal_id', 'task_id', 'event_id', 'appointment_id',
    'doc_id', 'key', 'draft_id', 'signal_id', 'sequence_id', 'template_id',
    'property_id', 'agreement_id', 'consent_id', 'conversion_id', 'offer_id',
    'viewing_id', 'change_id', 'asset_id', 'run_id', 'rule_id', 'request_id'
  ];
  for (const key of preferredKeys) {
    if (row[key]) return String(row[key]);
  }
  return tableName + ':' + String(row._rowIndex || '');
}

/**
 * Extract a meaningful timestamp for the unified table.
 * @param {Object} row - Row data
 * @returns {string} Timestamp string or empty
 */
function extractUnifiedTimestamp_(row) {
  const candidates = [
    'updated_at', 'created_at', 'received_at', 'occurred_at', 'processed_at',
    'scheduled_at', 'run_at', 'ts'
  ];
  for (const key of candidates) {
    if (row[key]) return String(row[key]);
  }
  return '';
}

/**
 * Refresh summary tabs for dashboard.
 * @returns {Object} Summary refresh result
 */
function refreshDashboardSummary_() {
  bootstrapDashboardSheets_();
  const runAt = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));

  const deals = getSheetData_(SHEETS.DEALS);
  const contacts = getSheetData_(SHEETS.CONTACTS);
  const tasks = getSheetData_(SHEETS.TASKS);

  const summaryRows = [
    ['contacts_total', contacts.length, runAt],
    ['deals_total', deals.length, runAt],
    ['tasks_open', tasks.filter(t => t.status === 'pending').length, runAt],
    ['tasks_overdue', tasks.filter(t => t.status === 'pending' && isPastDate_(t.due_date)).length, runAt]
  ];

  const pipelineRows = [];
  const pipelineMap = {};
  deals.forEach(deal => {
    const key = [deal.deal_type || '-', deal.stage || '-'].join('|');
    pipelineMap[key] = (pipelineMap[key] || 0) + 1;
  });
  Object.keys(pipelineMap).forEach(key => {
    const parts = key.split('|');
    pipelineRows.push([parts[0], parts[1], pipelineMap[key], runAt]);
  });

  const leadSourceRows = [];
  const leadSourceMap = {};
  deals.forEach(deal => {
    const source = deal.lead_source || deal.source || '-';
    leadSourceMap[source] = (leadSourceMap[source] || 0) + 1;
  });
  Object.keys(leadSourceMap).forEach(source => {
    leadSourceRows.push([source, leadSourceMap[source], runAt]);
  });

  const slaRows = [
    ['first_touch_over_sla', countFirstTouchBreaches_(deals), runAt],
    ['stuck_stage_over_threshold', countStuckStage_(deals), runAt]
  ];

  writeDashboardTable_(SHEETS.DASHBOARD_SUMMARY, summaryRows);
  writeDashboardTable_(SHEETS.DASHBOARD_PIPELINE, pipelineRows);
  writeDashboardTable_(SHEETS.DASHBOARD_LEAD_SOURCES, leadSourceRows);
  writeDashboardTable_(SHEETS.DASHBOARD_SLA, slaRows);

  return {
    ok: true,
    summary: summaryRows.length,
    pipeline: pipelineRows.length,
    lead_sources: leadSourceRows.length,
    sla: slaRows.length
  };
}

/**
 * Refresh dashboard charts sheet.
 * Builds charts from OPS_DASHBOARD and DAILY_SNAPSHOT.
 * @returns {Object} Refresh summary
 */
function refreshDashboardCharts_() {
  bootstrapDashboardSheets_();
  const dashboardSheet = sheet_(SHEETS.DASHBOARD_CHARTS, false);
  if (!dashboardSheet) return { ok: false, reason: 'missing_dashboard_sheet' };

  dashboardSheet.clear();
  dashboardSheet.getRange(1, 1).setValue('CB-OS Dashboard');
  dashboardSheet.getRange(1, 1).setFontWeight('bold');

  const opsSheet = sheet_(SHEETS.OPS_DASHBOARD, false);
  if (opsSheet && opsSheet.getLastRow() > 1) {
    const opsChart = dashboardSheet.newChart()
      .setChartType(Charts.ChartType.LINE)
      .addRange(opsSheet.getRange(1, 1, opsSheet.getLastRow(), 3))
      .setPosition(3, 1, 0, 0)
      .setOption('title', 'Ingest Pending vs DLQ Count')
      .build();
    dashboardSheet.insertChart(opsChart);
  }

  const snapshotSheet = sheet_(SHEETS.DAILY_SNAPSHOT, false);
  if (snapshotSheet && snapshotSheet.getLastRow() > 1) {
    const snapshotChart = dashboardSheet.newChart()
      .setChartType(Charts.ChartType.COLUMN)
      .addRange(snapshotSheet.getRange(1, 1, snapshotSheet.getLastRow(), 4))
      .setPosition(20, 1, 0, 0)
      .setOption('title', 'Daily Leads & Deals')
      .build();
    dashboardSheet.insertChart(snapshotChart);
  }

  const pipelineSheet = sheet_(SHEETS.DASHBOARD_PIPELINE, false);
  if (pipelineSheet && pipelineSheet.getLastRow() > 1) {
    const pipelineChart = dashboardSheet.newChart()
      .setChartType(Charts.ChartType.BAR)
      .addRange(pipelineSheet.getRange(1, 1, pipelineSheet.getLastRow(), 3))
      .setPosition(36, 1, 0, 0)
      .setOption('title', 'Pipeline Stage Counts')
      .build();
    dashboardSheet.insertChart(pipelineChart);
  }

  return { ok: true };
}

/**
 * Check if a sheet is part of dashboard utility tables.
 * @param {string} sheetName - Sheet name
 * @returns {boolean} True if dashboard table
 */
function isDashboardSheet_(sheetName) {
  return [
    SHEETS.UNIFIED_TABLES,
    SHEETS.DASHBOARD_CHARTS,
    SHEETS.DASHBOARD_SUMMARY,
    SHEETS.DASHBOARD_PIPELINE,
    SHEETS.DASHBOARD_LEAD_SOURCES,
    SHEETS.DASHBOARD_SLA,
    SHEETS.ADS_ATTRIBUTION_SUMMARY,
    SHEETS.BOOKING_SUMMARY,
    SHEETS.EMAIL_OUTREACH_SUMMARY,
    SHEETS.REPUTATION_FEEDBACK,
    SHEETS.PORTAL_LINKS,
    SHEETS.OFFLINE_CONVERSIONS,
    SHEETS.CONTENT_LIBRARY,
    SHEETS.FIN_DASH_AGG,
    SHEETS.FIN_DASH_FX,
    SHEETS.TENANTS,
    SHEETS.COURSE_SESSIONS,
    SHEETS.KNOWLEDGE_BASE
  ].indexOf(sheetName) !== -1;
}

/**
 * Get unified table cursor from CONFIG.
 * @returns {string} Cursor ISO string
 */
function getUnifiedCursor_() {
  return cfg_('UNIFIED_TABLES_LAST_UPDATED_AT', '');
}

/**
 * Set unified table cursor in CONFIG.
 * @param {string} isoString - ISO timestamp
 */
function setUnifiedCursor_(isoString) {
  setConfigValue_('UNIFIED_TABLES_LAST_UPDATED_AT', isoString || '', 'Unified tables cursor');
  refreshConfig_();
}

/**
 * Write a dashboard table with canonical headers.
 * @param {string} sheetName - Sheet name
 * @param {Array<Array<*>>} rows - Data rows
 */
function writeDashboardTable_(sheetName, rows) {
  const sheet = sheet_(sheetName, false);
  if (!sheet) return;
  sheet.clearContents();
  sheet.getRange(1, 1, 1, CANONICAL_HEADERS[sheetName].length)
    .setValues([CANONICAL_HEADERS[sheetName]]);
  sheet.getRange(1, 1, 1, CANONICAL_HEADERS[sheetName].length)
    .setFontWeight('bold');
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  }
}

function isPastDate_(dateValue) {
  if (!dateValue) return false;
  const parsed = new Date(dateValue);
  if (isNaN(parsed.getTime())) return false;
  return parsed.getTime() < Date.now();
}

function countFirstTouchBreaches_(deals) {
  const threshold = Number(cfg_('SLA_FIRST_TOUCH_MINUTES', DEFAULTS.SLA_FIRST_TOUCH_MINUTES));
  let count = 0;
  deals.forEach(deal => {
    const created = parseCbTimeMs_(deal.created_at);
    const touched = parseCbTimeMs_(deal.last_stage_change_at || deal.updated_at);
    if (!created || !touched) return;
    const diffMinutes = Math.round((touched - created) / 60000);
    if (diffMinutes > threshold) count++;
  });
  return count;
}

function countStuckStage_(deals) {
  const thresholdDays = Number(cfg_('STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD));
  let count = 0;
  deals.forEach(deal => {
    const lastChange = parseCbTimeMs_(deal.last_stage_change_at || deal.updated_at);
    if (!lastChange) return;
    const diffDays = Math.round((Date.now() - lastChange) / 86400000);
    if (diffDays > thresholdDays) count++;
  });
  return count;
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
