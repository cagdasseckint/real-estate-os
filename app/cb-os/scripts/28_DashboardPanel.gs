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
  const financeRows = getSheetData_(SHEETS.FIN_DASH_AGG);
  const fxRows = getSheetData_(SHEETS.FIN_DASH_FX);
  const bookingRows = getSheetData_(SHEETS.BOOKING_SUMMARY);
  const adsRows = getSheetData_(SHEETS.ADS_ATTRIBUTION_SUMMARY);
  const emailOutreachRows = getSheetData_(SHEETS.EMAIL_OUTREACH_SUMMARY);
  const driveShareRows = getSheetData_(SHEETS.DRIVE_SHARE_AUDIT);
  const securitySopRows = getSheetData_(SHEETS.SECURITY_SOP);
  const smokeRows = getSheetData_(SHEETS.SMOKE_TEST_LOG);
  const jobRuns = getSheetData_(SHEETS.JOB_RUN_LOG);
  const properties = getSheetData_(SHEETS.PROPERTIES);
  const agreements = getSheetData_(SHEETS.AGREEMENTS);
  const dlqRows = getSheetData_(SHEETS.DLQ);

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

  const financeSummary = normalizeMetricSummary_(financeRows);
  const fxSummary = normalizeFxSummary_(fxRows);
  const bookingSummary = normalizeMetricSummary_(bookingRows);
  const adsSummary = normalizeMetricSummary_(adsRows);
  const emailOutreachSummary = normalizeMetricSummary_(emailOutreachRows);
  const driveShareIssues = driveShareRows.filter(row => String(row.issue || '').trim()).length;
  const securitySopPending = securitySopRows.filter(row => String(row.status || '').toLowerCase() === 'pending').length;
  const smokeLatest = getLatestSmokeRun_(smokeRows);
  const jobRunErrors = jobRuns.filter(row => String(row.notes || '').trim() === AUDIT_CONTRACT_STRING).length;
  const complianceSummary = getComplianceSummary_(properties, agreements);
  const contactsById = {};
  contacts.forEach(row => {
    if (row.contact_id) contactsById[row.contact_id] = row._rowIndex;
  });
  const overdueTasksRaw = tasks.filter(t => t.status === 'pending' && isPastDate_(t.due_date));
  const overdueTasks = mapOverdueTasks_(overdueTasksRaw).slice(0, 20);
  const stuckDealsRaw = deals.filter(d => d.stage !== 'CLOSED_WON' && d.stage !== 'CLOSED_LOST')
    .filter(d => isStuckDeal_(d));
  const stuckDeals = mapStuckDeals_(stuckDealsRaw, contactsById, cfg_('STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD)).slice(0, 20);
  const dlqItems = mapDlqItems_(dlqRows).slice(0, 20);
  const jobRunRecent = mapJobRuns_(jobRuns).slice(0, 20);
  const driveShareIssuesList = mapDriveShareIssues_(driveShareRows.filter(row => String(row.issue || '').trim())).slice(0, 20);
  const complianceIssues = getComplianceIssues_(properties, agreements, 20);

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
    governance: {
      smoke_latest: smokeLatest.result || '-'
    },
    daily_snapshots: dailySnapshots.slice(-30),
    ops_series: opsRows.slice(-60),
    finance_summary: financeSummary,
    fx_summary: fxSummary,
    booking_summary: bookingSummary,
    marketing_summary: adsSummary.concat(emailOutreachSummary),
    governance_summary: [
      { metric: 'smoke_failed', value: smokeLatest.failed || 0, run_at: smokeLatest.run_at || runAt },
      { metric: 'job_run_errors', value: jobRunErrors, run_at: runAt }
    ],
    compliance_summary: complianceSummary,
    security_summary: [
      { metric: 'drive_share_issues', value: driveShareIssues, run_at: runAt },
      { metric: 'security_sop_pending', value: securitySopPending, run_at: runAt }
    ],
    drilldown: {
      overdue_tasks: {
        items: overdueTasks,
        stats: {
          total: overdueTasksRaw.length,
          avg_days_overdue: averageDays_(overdueTasksRaw.map(t => daysSince_(t.due_date)).filter(Boolean))
        }
      },
      stuck_deals: {
        items: stuckDeals,
        stats: {
          total: stuckDealsRaw.length,
          avg_days_in_stage: averageDays_(stuckDealsRaw.map(d => daysSince_(d.last_stage_change_at || d.updated_at)).filter(Boolean)),
          threshold_days: cfg_('STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD)
        }
      },
      dlq_items: {
        items: dlqItems,
        stats: {
          total: dlqRows.length,
          max_retry: maxNumber_(dlqRows.map(r => Number(r.retry_count || r.retries || 0))),
          dlq_max_retry: cfg_('DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY)
        }
      },
      job_runs: {
        items: jobRunRecent,
        stats: {
          total: jobRuns.length,
          failed: jobRunErrors
        }
      },
      drive_share_issues: {
        items: driveShareIssuesList,
        stats: {
          total: driveShareIssues
        }
      },
      compliance_summary: {
        items: complianceSummary,
        stats: {
          total: complianceSummary.reduce((sum, row) => sum + Number(row.value || 0), 0)
        }
      },
      compliance_issues: {
        items: complianceIssues.items,
        stats: complianceIssues.stats
      },
      finance_summary: {
        items: financeSummary,
        stats: { total: financeSummary.length }
      },
      marketing_summary: {
        items: adsSummary.concat(emailOutreachSummary),
        stats: { total: adsSummary.length + emailOutreachSummary.length }
      }
    }
  };
}

function normalizeMetricSummary_(rows) {
  if (!rows || rows.length === 0) return [];
  return rows.map(row => ({
    metric: row.metric || row.currency_pair || row.status || '',
    value: row.value !== undefined ? row.value : (row.open_rate || ''),
    run_at: row.run_at || row.timestamp || row.created_at || ''
  }));
}

function normalizeFxSummary_(rows) {
  if (!rows || rows.length === 0) return [];
  return rows.map(row => ({
    metric: row.currency_pair || '',
    value: row.close_rate || row.open_rate || '',
    open_rate: row.open_rate || '',
    close_rate: row.close_rate || '',
    run_at: row.run_at || ''
  }));
}

function getLatestSmokeRun_(rows) {
  if (!rows || rows.length === 0) return { result: '-', failed: 0, run_at: '' };
  const sorted = rows.slice().sort((a, b) => {
    if (a.run_at > b.run_at) return -1;
    if (a.run_at < b.run_at) return 1;
    return 0;
  });
  const latest = sorted[0];
  return {
    result: latest.result || '-',
    failed: latest.result === 'FAIL' ? 1 : 0,
    run_at: latest.run_at || ''
  };
}

function getComplianceSummary_(properties, agreements) {
  const propertyMissing = countComplianceIssues_(properties, validatePropertyCompliance_);
  const agreementMissing = countComplianceIssues_(agreements, validateAgreementCompliance_);
  return [
    { metric: 'property_missing', value: propertyMissing, run_at: '' },
    { metric: 'agreement_missing', value: agreementMissing, run_at: '' }
  ];
}

function isStuckDeal_(deal) {
  const threshold = cfg_('STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD);
  const lastChangeMs = parseCbTimeMs_(deal.last_stage_change_at || deal.updated_at);
  if (!lastChangeMs) return false;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - Number(threshold || 0));
  return lastChangeMs < cutoff.getTime();
}

function countComplianceIssues_(rows, validator) {
  if (!rows || rows.length === 0 || typeof validator !== 'function') {
    return (rows || []).filter(row => !row || row.status === 'DRAFT').length;
  }
  let issues = 0;
  rows.forEach(row => {
    const result = validator(row);
    if (!result || !result.ok) issues++;
  });
  return issues;
}

function mapOverdueTasks_(rows) {
  return (rows || []).map(row => {
    const dueAt = row.due_date || row.due_at || row.deadline || '';
    return {
      row_index: row._rowIndex || '',
      task_id: row.task_id || row.id || '',
      title: row.title || row.subject || row.task_name || '-',
      assignee: row.assignee || row.owner || row.owner_name || '',
      priority: row.priority || row.urgency || '',
      status: row.status || '',
      due_date: dueAt,
      days_overdue: daysSince_(dueAt),
      created_at: row.created_at || row.createdAt || '',
      source: row.source || row.origin || '',
      link: getSheetRowLink_(SHEETS.TASKS, row._rowIndex)
    };
  }).sort((a, b) => (b.days_overdue || 0) - (a.days_overdue || 0));
}

function mapStuckDeals_(rows, contactsById, thresholdDays) {
  return (rows || []).map(row => {
    const lastStage = row.last_stage_change_at || row.updated_at || row.updatedAt || '';
    const contactRow = contactsById && row.contact_id ? contactsById[row.contact_id] : null;
    return {
      row_index: row._rowIndex || '',
      deal_id: row.deal_id || row.id || '',
      title: row.deal_name || row.title || row.property_title || row.property_id || '-',
      stage: row.stage || '',
      deal_type: row.deal_type || '',
      owner: row.owner || row.owner_name || row.agent_name || '',
      value: row.amount || row.deal_value || row.listing_price || '',
      last_stage_change_at: lastStage,
      days_in_stage: daysSince_(lastStage),
      threshold_days: thresholdDays || 0,
      contact_id: row.contact_id || '',
      contact_name: row.contact_name || row.client_name || '',
      link: getSheetRowLink_(SHEETS.DEALS, row._rowIndex),
      contact_link: contactRow ? getSheetRowLink_(SHEETS.CONTACTS, contactRow) : '',
      doc_link: row.doc_package_url || row.doc_url || ''
    };
  }).sort((a, b) => (b.days_in_stage || 0) - (a.days_in_stage || 0));
}

function mapDlqItems_(rows) {
  return (rows || []).map(row => ({
    row_index: row._rowIndex || '',
    ingest_id: row.ingest_id || row.id || '',
    source: row.source || row.origin || row.queue || '',
    retry_count: row.retry_count || row.retries || 0,
    last_error: row.last_error || row.error || row.message || '',
    created_at: row.created_at || row.inserted_at || '',
    payload_hint: row.payload_type || row.entity_type || row.kind || '',
    link: getSheetRowLink_(SHEETS.DLQ, row._rowIndex)
  }));
}

function mapJobRuns_(rows) {
  const sorted = (rows || []).slice().sort((a, b) => {
    if (a.created_at > b.created_at) return -1;
    if (a.created_at < b.created_at) return 1;
    return 0;
  });
  return sorted.map(row => ({
    row_index: row._rowIndex || '',
    job_name: row.job_name || row.job || row.name || '',
    status: row.status || row.result || '',
    notes: row.notes || row.message || '',
    created_at: row.created_at || row.run_at || '',
    duration_ms: row.duration_ms || row.duration || '',
    link: getSheetRowLink_(SHEETS.JOB_RUN_LOG, row._rowIndex)
  }));
}

function mapDriveShareIssues_(rows) {
  return (rows || []).map(row => ({
    row_index: row._rowIndex || '',
    file_name: row.file_name || row.file || row.name || '',
    shared_with: row.shared_with || row.shared_to || row.user || '',
    permission: row.permission || row.role || '',
    owner: row.owner || row.owner_name || '',
    issue: row.issue || '',
    updated_at: row.updated_at || row.timestamp || '',
    link: getSheetRowLink_(SHEETS.DRIVE_SHARE_AUDIT, row._rowIndex)
  }));
}

function getComplianceIssues_(properties, agreements, limit) {
  const items = [];
  const stats = { total: 0, property: 0, agreement: 0 };
  (properties || []).forEach(row => {
    const result = (typeof validatePropertyCompliance_ === 'function') ? validatePropertyCompliance_(row) : { ok: row && row.status !== 'DRAFT', missing: [] };
    if (result && !result.ok) {
      items.push({
        row_index: row._rowIndex || '',
        type: 'property',
        record_id: row.property_id || row.id || '',
        title: row.title || row.address || row.property_name || '-',
        missing_count: (result.missing || []).length,
        missing_fields: (result.missing || []).slice(0, 5).join(', '),
        link: getSheetRowLink_(SHEETS.PROPERTIES, row._rowIndex)
      });
      stats.property++;
    }
  });
  (agreements || []).forEach(row => {
    const result = (typeof validateAgreementCompliance_ === 'function') ? validateAgreementCompliance_(row) : { ok: row && row.status !== 'DRAFT', missing: [] };
    if (result && !result.ok) {
      items.push({
        row_index: row._rowIndex || '',
        type: 'agreement',
        record_id: row.agreement_id || row.id || '',
        title: row.agreement_number || row.property_id || '-',
        missing_count: (result.missing || []).length,
        missing_fields: (result.missing || []).slice(0, 5).join(', '),
        link: getSheetRowLink_(SHEETS.AGREEMENTS, row._rowIndex)
      });
      stats.agreement++;
    }
  });
  stats.total = stats.property + stats.agreement;
  return { items: items.slice(0, limit || 20), stats };
}

function daysSince_(isoString) {
  const ms = parseCbTimeMs_(isoString);
  if (!ms) return null;
  return Math.floor((Date.now() - ms) / 86400000);
}

function averageDays_(nums) {
  if (!nums || nums.length === 0) return 0;
  const sum = nums.reduce((acc, val) => acc + Number(val || 0), 0);
  return Math.round(sum / nums.length);
}

function maxNumber_(nums) {
  if (!nums || nums.length === 0) return 0;
  return Math.max.apply(null, nums);
}

function getSheetRowLink_(sheetName, rowIndex) {
  if (!sheetName || !rowIndex) return '';
  const sheet = sheet_(sheetName, false);
  if (!sheet) return '';
  const ss = getWorkbook_();
  const gid = sheet.getSheetId();
  return ss.getUrl() + '#gid=' + gid + '&range=A' + rowIndex;
}

function updateTaskStatusFromPanel_(rowIndex, status) {
  const idx = Number(rowIndex || 0);
  if (!idx) return { ok: false, error: 'missing_row' };
  const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  const updates = {
    status: status || 'done',
    updated_at: now
  };
  if (String(status || '').toLowerCase() === 'done') {
    updates.completed_at = now;
  }
  updateRow_(SHEETS.TASKS, idx, updates);
  return { ok: true };
}

function snoozeTaskFromPanel_(rowIndex, days) {
  const idx = Number(rowIndex || 0);
  if (!idx) return { ok: false, error: 'missing_row' };
  const bumpDays = Number(days || 1);
  const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  const current = getSheetData_(SHEETS.TASKS).find(row => row._rowIndex === idx) || {};
  const base = parseCbTimeMs_(current.due_date) || Date.now();
  const next = new Date(base);
  next.setDate(next.getDate() + bumpDays);
  updateRow_(SHEETS.TASKS, idx, {
    due_date: next.toISOString().slice(0, 10),
    updated_at: now
  });
  return { ok: true };
}

function resolveDlqItemFromPanel_(ingestId, resolution) {
  if (!ingestId) return { ok: false, error: 'missing_ingest_id' };
  const ok = resolveDLQItem_(ingestId, resolution || 'fixed', 'Resolved via dashboard panel');
  return { ok: ok };
}

/**
 * Load saved dashboard preferences (sidebar state).
 * @returns {Object|null} Preference payload
 */
function getDashboardPanelPrefs_() {
  const props = PropertiesService.getUserProperties();
  const raw = props.getProperty('CB_OS_DASHBOARD_PREFS');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    Logger.log('DASHBOARD_PREFS | Parse error: ' + e.message);
    return null;
  }
}

/**
 * Save dashboard preferences (sidebar state).
 * @param {Object} prefs - Preference payload
 * @returns {Object} Save result
 */
function saveDashboardPanelPrefs_(prefs) {
  const props = PropertiesService.getUserProperties();
  const payload = prefs || {};
  payload.updatedAt = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  props.setProperty('CB_OS_DASHBOARD_PREFS', JSON.stringify(payload));
  return { ok: true, updatedAt: payload.updatedAt };
}

/**
 * Reset dashboard preferences to defaults.
 * @returns {Object} Reset result
 */
function resetDashboardPanelPrefs_() {
  const props = PropertiesService.getUserProperties();
  props.deleteProperty('CB_OS_DASHBOARD_PREFS');
  return { ok: true };
}
