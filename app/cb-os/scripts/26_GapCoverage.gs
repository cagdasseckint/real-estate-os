/**
 * Gap coverage helpers for Google-only workflows.
 */

/**
 * Bootstrap gap-coverage sheets.
 */
function bootstrapGapCoverageSheets_() {
  sheet_(SHEETS.REPUTATION_FEEDBACK, true);
  sheet_(SHEETS.PORTAL_LINKS, true);
  sheet_(SHEETS.OFFLINE_CONVERSIONS, true);
  sheet_(SHEETS.CONTENT_LIBRARY, true);
  sheet_(SHEETS.ADS_ATTRIBUTION_SUMMARY, true);
  sheet_(SHEETS.BOOKING_SUMMARY, true);
  sheet_(SHEETS.EMAIL_OUTREACH_SUMMARY, true);
}

/**
 * Log a reputation feedback entry (Forms -> Sheets).
 * @param {Object} payload - Feedback payload
 * @returns {Object} Created feedback row
 */
function logReputationFeedback_(payload) {
  bootstrapGapCoverageSheets_();
  const row = {
    feedback_id: id_(),
    submitted_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    contact_id: payload.contact_id || '',
    deal_id: payload.deal_id || '',
    rating: payload.rating || '',
    comment: payload.comment || '',
    source: payload.source || 'form',
    status: payload.status || 'new'
  };
  appendRow_(SHEETS.REPUTATION_FEEDBACK, row);
  return row;
}

/**
 * Build a simple client portal index from ClientFiles.
 * @returns {Object} Refresh result
 */
function refreshClientPortalLinks_() {
  bootstrapGapCoverageSheets_();
  const clientFiles = getSheetData_('ClientFiles');
  const contacts = getSheetData_(SHEETS.CONTACTS);
  const contactById = {};
  contacts.forEach(contact => {
    contactById[contact.contact_id] = contact;
  });

  const rows = clientFiles.map(entry => {
    const contact = contactById[entry.contact_id] || {};
    const name = [contact.first_name || '', contact.last_name || ''].join(' ').trim();
    return [
      entry.contact_id || '',
      name,
      entry.drive_folder_url || '',
      entry.summary_doc_url || '',
      nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
    ];
  });

  writeDashboardTable_(SHEETS.PORTAL_LINKS, rows);
  return { ok: true, rows: rows.length };
}

/**
 * Prepare offline conversions for Google Ads import.
 * @returns {Object} Export summary
 */
function refreshOfflineConversions_() {
  bootstrapGapCoverageSheets_();
  const deals = getSheetData_(SHEETS.DEALS);
  const rows = [];
  deals.forEach(deal => {
    if (deal.stage !== 'CLOSED_WON' || !deal.gclid) return;
    rows.push([
      id_(),
      deal.gclid,
      deal.updated_at || deal.last_stage_change_at || nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
      deal.deal_value || 0,
      deal.currency || 'TRY',
      'Deal Closed',
      'ready'
    ]);
  });
  writeDashboardTable_(SHEETS.OFFLINE_CONVERSIONS, rows);
  return { ok: true, rows: rows.length };
}

/**
 * Build Ads/Analytics attribution summary (Google Ads + GA4 exports into Deals).
 * @returns {Object} Summary result
 */
function refreshAdsAttributionSummary_() {
  bootstrapGapCoverageSheets_();
  const runAt = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  const deals = getSheetData_(SHEETS.DEALS);
  const withUtm = deals.filter(deal =>
    deal.utm_source || deal.utm_medium || deal.utm_campaign || deal.gclid
  );
  const won = deals.filter(deal => deal.stage === 'CLOSED_WON');
  const wonWithUtm = won.filter(deal =>
    deal.utm_source || deal.utm_medium || deal.utm_campaign || deal.gclid
  );
  const rows = [
    ['deals_total', deals.length, runAt],
    ['deals_with_attribution', withUtm.length, runAt],
    ['closed_won_total', won.length, runAt],
    ['closed_won_with_attribution', wonWithUtm.length, runAt]
  ];
  writeDashboardTable_(SHEETS.ADS_ATTRIBUTION_SUMMARY, rows);
  return { ok: true, rows: rows.length };
}

/**
 * Summarize booking requests (Forms -> Sheets -> Calendar).
 * @returns {Object} Summary result
 */
function refreshBookingSummary_() {
  bootstrapGapCoverageSheets_();
  const runAt = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  const bookingRequests = getSheetData_('BookingRequests');
  const statusCounts = {};
  bookingRequests.forEach(req => {
    const status = req.status || 'unknown';
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });
  const rows = [
    ['booking_total', bookingRequests.length, runAt]
  ];
  Object.keys(statusCounts).forEach(status => {
    rows.push(['booking_status_' + status, statusCounts[status], runAt]);
  });
  writeDashboardTable_(SHEETS.BOOKING_SUMMARY, rows);
  return { ok: true, rows: rows.length };
}

/**
 * Summarize Gmail outreach drafts queue.
 * @returns {Object} Summary result
 */
function refreshEmailOutreachSummary_() {
  bootstrapGapCoverageSheets_();
  const runAt = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  const drafts = getSheetData_(SHEETS.EMAIL_DRAFTS);
  const counts = { queued: 0, drafted: 0, error: 0, other: 0 };
  drafts.forEach(draft => {
    const status = String(draft.status || '').toLowerCase();
    if (counts.hasOwnProperty(status)) {
      counts[status] += 1;
    } else {
      counts.other += 1;
    }
  });
  const rows = [
    ['email_drafts_total', drafts.length, runAt],
    ['email_drafts_queued', counts.queued, runAt],
    ['email_drafts_drafted', counts.drafted, runAt],
    ['email_drafts_error', counts.error, runAt],
    ['email_drafts_other', counts.other, runAt]
  ];
  writeDashboardTable_(SHEETS.EMAIL_OUTREACH_SUMMARY, rows);
  return { ok: true, rows: rows.length };
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
