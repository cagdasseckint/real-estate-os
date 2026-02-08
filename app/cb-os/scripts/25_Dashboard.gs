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
 * Seed sample data to visualize dashboard metrics.
 * @param {Object} options - Seeding options
 * @param {boolean} options.force - Seed even if previously seeded
 * @returns {Object} Seeding summary
 */
function seedDashboardTestData_(options) {
  const opts = options || {};
  const force = Boolean(opts.force);
  const seedKey = 'DASHBOARD_SAMPLE_DATA_SEEDED';
  if (cfg_(seedKey, false) && !force) {
    return { ok: false, reason: 'already_seeded' };
  }

  const timezone = cfg_('TIMEZONE', DEFAULTS.TIMEZONE);
  const now = new Date();
  const toIso = (dateObj) => formatIsoWithOffset_(dateObj, timezone);
  const toDay = (dateObj) => Utilities.formatDate(dateObj, timezone, 'yyyy-MM-dd');
  const shiftDays = (days, hourShift) => {
    const dateObj = new Date(now);
    dateObj.setDate(dateObj.getDate() + Number(days || 0));
    if (hourShift) {
      dateObj.setHours(dateObj.getHours() + Number(hourShift));
    }
    return dateObj;
  };

  const contactSpecs = [
    { first_name: 'Ayşe', last_name: 'Yılmaz', email: 'ayse.yilmaz@example.com', phone: '+90 555 100 1001', source: 'instagram', tags: 'source:instagram,budget:3m', days_ago: 6 },
    { first_name: 'Mehmet', last_name: 'Kaya', email: 'mehmet.kaya@example.com', phone: '+90 555 100 1002', source: 'referral', tags: 'Arkadaşlarınız', days_ago: 4 },
    { first_name: 'Elif', last_name: 'Demir', email: 'elif.demir@example.com', phone: '+90 555 100 1003', source: 'sahibinden', tags: 'source:sahibinden,budget:2m', days_ago: 3 },
    { first_name: 'Can', last_name: 'Koç', email: 'can.koc@example.com', phone: '+90 555 100 1004', source: 'web', tags: 'source:web', days_ago: 2 },
    { first_name: 'Zeynep', last_name: 'Arslan', email: 'zeynep.arslan@example.com', phone: '+90 555 100 1005', source: 'facebook', tags: 'source:facebook,budget:4m', days_ago: 1 }
  ];

  const contacts = contactSpecs.map((spec) => {
    const contact = ContactsRepo.create({
      first_name: spec.first_name,
      last_name: spec.last_name,
      email: spec.email,
      phone: spec.phone,
      source: spec.source,
      tags: spec.tags
    });
    const createdAt = toIso(shiftDays(-spec.days_ago, 2));
    updateRow_(SHEETS.CONTACTS, contact._rowIndex, {
      created_at: createdAt,
      updated_at: createdAt,
      last_contact_at: toIso(shiftDays(-spec.days_ago + 1, 4))
    });
    return contact;
  });

  const dealSpecs = [
    { contact_index: 0, deal_type: 'BUYER', stage: 'FIRST_TOUCH', value: 2500000, source: 'instagram', days_ago: 5, last_stage_days_ago: 4, intent: 'urgent', region: 'Kadıköy' },
    { contact_index: 1, deal_type: 'SELLER', stage: 'QUALIFIED', value: 4800000, source: 'referral', days_ago: 4, last_stage_days_ago: 1, intent: 'medium', region: 'Üsküdar' },
    { contact_index: 2, deal_type: 'RENT', stage: 'SHOWING', value: 45000, source: 'sahibinden', days_ago: 3, last_stage_days_ago: 2, intent: 'low', region: 'Beşiktaş' },
    { contact_index: 3, deal_type: 'BUYER', stage: 'OFFER', value: 3200000, source: 'web', days_ago: 2, last_stage_days_ago: 10, intent: 'urgent', region: 'Ataşehir' },
    { contact_index: 4, deal_type: 'SELLER', stage: 'CLOSED_WON', value: 6200000, source: 'facebook', days_ago: 7, last_stage_days_ago: 6, intent: 'high', region: 'Sarıyer' }
  ];

  const deals = dealSpecs.map((spec) => {
    const contact = contacts[spec.contact_index];
    const deal = DealsRepo.create({
      contact_id: contact ? contact.contact_id : '',
      deal_type: spec.deal_type,
      stage: spec.stage,
      deal_value: spec.value,
      currency: 'TRY',
      lead_source: spec.source,
      intent: spec.intent,
      region: spec.region,
      expected_close_date: toDay(shiftDays(21, 0)),
      property_type: spec.deal_type === 'RENT' ? 'apartment' : 'residential'
    });
    const createdAt = toIso(shiftDays(-spec.days_ago, 1));
    const lastStageAt = toIso(shiftDays(-spec.last_stage_days_ago, 3));
    updateRow_(SHEETS.DEALS, deal._rowIndex, {
      created_at: createdAt,
      updated_at: toIso(shiftDays(-spec.last_stage_days_ago, 5)),
      last_stage_change_at: lastStageAt
    });
    return deal;
  });

  const taskSpecs = [
    { title: 'Kadıköy lead görüşmesi', deal_index: 0, days_from_now: -1, priority: 'high' },
    { title: 'Sarıyer fiyat analizi', deal_index: 4, days_from_now: 2, priority: 'medium' },
    { title: 'Üsküdar ilan onayı', deal_index: 1, days_from_now: 5, priority: 'low' }
  ];

  taskSpecs.forEach((spec) => {
    const deal = deals[spec.deal_index];
    TasksRepo.create({
      entity_type: 'DEAL',
      entity_id: deal ? deal.deal_id : '',
      title: spec.title,
      description: 'Dashboard test verisi görevi',
      due_date: toDay(shiftDays(spec.days_from_now, 0)),
      priority: spec.priority,
      status: 'pending',
      assigned_to: 'agent@example.com'
    });
  });

  const eventSpecs = [
    { deal_index: 0, event_type: 'FIRST_TOUCH', days_ago: 5, hour_shift: 4 },
    { deal_index: 1, event_type: 'STAGE_CHANGE', days_ago: 4, hour_shift: 6, payload: { from: 'NEW', to: 'QUALIFIED' } },
    { deal_index: 2, event_type: 'FIRST_TOUCH', days_ago: 3, hour_shift: 5 },
    { deal_index: 3, event_type: 'STAGE_CHANGE', days_ago: 2, hour_shift: 2, payload: { from: 'QUALIFIED', to: 'OFFER' } }
  ];

  eventSpecs.forEach((spec) => {
    const deal = deals[spec.deal_index];
    EventsRepo.append({
      entity_type: 'DEAL',
      entity_id: deal ? deal.deal_id : '',
      event_type: spec.event_type,
      occurred_at: toIso(shiftDays(-spec.days_ago, spec.hour_shift)),
      payload: spec.payload || {}
    });
  });

  for (let i = 9; i >= 0; i -= 1) {
    const runDate = shiftDays(-i, 1);
    appendRow_(SHEETS.OPS_DASHBOARD, {
      run_at: toIso(runDate),
      ingest_pending: Math.max(0, 12 - i),
      dlq_count: i % 3,
      error_rate: (i % 3) / 10,
      cursor_drift_minutes: 15 + i
    });

    const leadCount = 3 + (9 - i);
    const dealCount = Math.max(1, Math.round(leadCount * 0.6));
    appendRow_(SHEETS.DAILY_SNAPSHOT, {
      snapshot_date: toDay(runDate),
      run_at: toIso(runDate),
      leads_created: leadCount,
      deals_created: dealCount,
      conversion_rate: dealCount / leadCount,
      first_touch_count: Math.max(1, Math.round(leadCount * 0.5)),
      avg_first_touch_minutes: 45 + i
    });
  }

  setConfigValue_(seedKey, nowIso_(timezone), 'Seeded dashboard sample data');
  refreshConfig_();
  const summary = refreshDashboardSummary_();
  refreshDashboardCharts_();

  return {
    ok: true,
    contacts: contacts.length,
    deals: deals.length,
    tasks: taskSpecs.length,
    ops_rows: 10,
    snapshot_rows: 10,
    dashboard_summary: summary
  };
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
