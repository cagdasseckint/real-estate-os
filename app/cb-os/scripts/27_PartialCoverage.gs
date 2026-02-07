/**
 * Partial coverage helpers for Google-only workflows.
 */

/**
 * Bootstrap partial-coverage sheets.
 */
function bootstrapPartialCoverageSheets_() {
  sheet_(SHEETS.TENANTS, true);
  sheet_(SHEETS.COURSE_SESSIONS, true);
  sheet_(SHEETS.KNOWLEDGE_BASE, true);
}

/**
 * Register a tenant workbook (manual multi-tenant provisioning).
 * @param {Object} payload - Tenant payload
 * @returns {Object} Tenant row
 */
function registerTenant_(payload) {
  bootstrapPartialCoverageSheets_();
  const row = {
    tenant_id: payload.tenant_id || id_(),
    tenant_name: payload.tenant_name || '',
    workbook_id: payload.workbook_id || '',
    drive_root_id: payload.drive_root_id || '',
    status: payload.status || 'active',
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  appendRow_(SHEETS.TENANTS, row);
  return row;
}

/**
 * Create a course/community session entry (Meet/Calendar).
 * @param {Object} payload - Session payload
 * @returns {Object} Session row
 */
function createCourseSession_(payload) {
  bootstrapPartialCoverageSheets_();
  const row = {
    session_id: payload.session_id || id_(),
    title: payload.title || '',
    meeting_link: payload.meeting_link || '',
    scheduled_at: payload.scheduled_at || '',
    host_email: payload.host_email || '',
    notes: payload.notes || '',
    status: payload.status || 'scheduled'
  };
  appendRow_(SHEETS.COURSE_SESSIONS, row);
  return row;
}

/**
 * Upsert a knowledge base entry (Docs/Keep index).
 * @param {Object} payload - Knowledge base payload
 * @returns {Object} KB row
 */
function upsertKnowledgeBaseEntry_(payload) {
  bootstrapPartialCoverageSheets_();
  const data = getSheetData_(SHEETS.KNOWLEDGE_BASE);
  const existing = data.find(row => row.kb_id === payload.kb_id);
  const row = {
    kb_id: payload.kb_id || id_(),
    title: payload.title || '',
    category: payload.category || '',
    doc_url: payload.doc_url || '',
    owner: payload.owner || '',
    updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  if (existing) {
    updateRow_(SHEETS.KNOWLEDGE_BASE, existing._rowIndex, row);
    return row;
  }
  appendRow_(SHEETS.KNOWLEDGE_BASE, row);
  return row;
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
