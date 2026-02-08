/**
 * Extension modules for CB-OS.
 * Includes open house, profiles, timesheet, ledger, closing costs,
 * listing expenses, investment analysis, mortgage calculators,
 * billing docs, project management, UI validation, and role views.
 */

function ensureExtensionSheet_(sheetName) {
  return sheet_(sheetName, true);
}

/**
 * Open house utilities.
 */
function createOpenHouse_(payload) {
  if (!cfg_('MODULES_OPEN_HOUSE_ENABLED', DEFAULTS.MODULES_OPEN_HOUSE_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.OPEN_HOUSES);
  const row = {
    open_house_id: id_(),
    property_id: payload.property_id || '',
    deal_id: payload.deal_id || '',
    title: payload.title || '',
    event_date: payload.event_date || '',
    start_time: payload.start_time || '',
    end_time: payload.end_time || '',
    location: payload.location || '',
    host: payload.host || '',
    notes: payload.notes || '',
    status: payload.status || 'scheduled'
  };
  appendRow_(SHEETS.OPEN_HOUSES, row);
  return row;
}

function logOpenHouseSignin_(payload) {
  if (!cfg_('MODULES_OPEN_HOUSE_ENABLED', DEFAULTS.MODULES_OPEN_HOUSE_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.OPEN_HOUSE_SIGNINS);
  const row = {
    signin_id: id_(),
    open_house_id: payload.open_house_id || '',
    contact_id: payload.contact_id || '',
    full_name: payload.full_name || '',
    email: payload.email || '',
    phone: payload.phone || '',
    interested_in: payload.interested_in || '',
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    notes: payload.notes || ''
  };
  appendRow_(SHEETS.OPEN_HOUSE_SIGNINS, row);
  EventsRepo.append({
    entity_type: 'OPEN_HOUSE',
    entity_id: payload.open_house_id || '',
    event_type: 'OPEN_HOUSE_SIGNIN',
    payload: row,
    source: 'system',
    idempotency_key: row.signin_id
  });
  return row;
}

function createOpenHouseFollowup_(payload) {
  if (!cfg_('MODULES_OPEN_HOUSE_ENABLED', DEFAULTS.MODULES_OPEN_HOUSE_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.OPEN_HOUSE_FOLLOWUPS);
  const row = {
    followup_id: id_(),
    open_house_id: payload.open_house_id || '',
    contact_id: payload.contact_id || '',
    deal_id: payload.deal_id || '',
    status: payload.status || 'pending',
    next_step: payload.next_step || '',
    next_step_date: payload.next_step_date || '',
    assigned_to: payload.assigned_to || '',
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    notes: payload.notes || ''
  };
  appendRow_(SHEETS.OPEN_HOUSE_FOLLOWUPS, row);
  return row;
}

/**
 * Buyer/Seller profile utilities.
 */
function upsertBuyerProfile_(payload) {
  if (!cfg_('MODULES_PROFILES_ENABLED', DEFAULTS.MODULES_PROFILES_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.BUYER_PROFILES);
  const rows = getSheetData_(SHEETS.BUYER_PROFILES);
  const existing = rows.find(row =>
    row.contact_id === payload.contact_id && row.deal_id === payload.deal_id
  );
  const record = {
    buyer_profile_id: existing ? existing.buyer_profile_id : id_(),
    contact_id: payload.contact_id || '',
    deal_id: payload.deal_id || '',
    budget_min: payload.budget_min || '',
    budget_max: payload.budget_max || '',
    preferred_regions: payload.preferred_regions || '',
    property_type: payload.property_type || '',
    bedrooms: payload.bedrooms || '',
    bathrooms: payload.bathrooms || '',
    financing_status: payload.financing_status || '',
    must_have: payload.must_have || '',
    nice_to_have: payload.nice_to_have || '',
    timeline: payload.timeline || '',
    notes: payload.notes || '',
    updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  if (existing) {
    updateRow_(SHEETS.BUYER_PROFILES, existing._rowIndex, record);
  } else {
    appendRow_(SHEETS.BUYER_PROFILES, record);
  }
  return record;
}

function upsertSellerProfile_(payload) {
  if (!cfg_('MODULES_PROFILES_ENABLED', DEFAULTS.MODULES_PROFILES_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.SELLER_PROFILES);
  const rows = getSheetData_(SHEETS.SELLER_PROFILES);
  const existing = rows.find(row =>
    row.contact_id === payload.contact_id && row.deal_id === payload.deal_id
  );
  const record = {
    seller_profile_id: existing ? existing.seller_profile_id : id_(),
    contact_id: payload.contact_id || '',
    deal_id: payload.deal_id || '',
    target_price: payload.target_price || '',
    price_floor: payload.price_floor || '',
    timeline: payload.timeline || '',
    reason_for_sale: payload.reason_for_sale || '',
    property_type: payload.property_type || '',
    property_address: payload.property_address || '',
    occupancy_status: payload.occupancy_status || '',
    notes: payload.notes || '',
    updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  if (existing) {
    updateRow_(SHEETS.SELLER_PROFILES, existing._rowIndex, record);
  } else {
    appendRow_(SHEETS.SELLER_PROFILES, record);
  }
  return record;
}

/**
 * Timesheet utilities.
 */
function logTimeEntry_(payload) {
  if (!cfg_('MODULES_TIMESHEET_ENABLED', DEFAULTS.MODULES_TIMESHEET_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.TIME_LOGS);
  const row = {
    time_log_id: id_(),
    log_date: payload.log_date || nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)).split('T')[0],
    activity_type: payload.activity_type || '',
    duration_minutes: payload.duration_minutes || 0,
    contact_id: payload.contact_id || '',
    deal_id: payload.deal_id || '',
    property_id: payload.property_id || '',
    notes: payload.notes || '',
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  appendRow_(SHEETS.TIME_LOGS, row);
  return row;
}

/**
 * Ledger utilities.
 */
function addLedgerEntry_(payload) {
  if (!cfg_('MODULES_LEDGER_ENABLED', DEFAULTS.MODULES_LEDGER_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.GENERAL_LEDGER);
  const row = {
    entry_id: id_(),
    entry_date: payload.entry_date || nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)).split('T')[0],
    account_id: payload.account_id || '',
    debit: payload.debit || 0,
    credit: payload.credit || 0,
    currency: payload.currency || 'TRY',
    reference_type: payload.reference_type || '',
    reference_id: payload.reference_id || '',
    notes: payload.notes || '',
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  appendRow_(SHEETS.GENERAL_LEDGER, row);
  return row;
}

/**
 * Closing costs utilities.
 */
function logClosingCost_(payload) {
  if (!cfg_('MODULES_CLOSING_COSTS_ENABLED', DEFAULTS.MODULES_CLOSING_COSTS_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.CLOSING_COSTS);
  const row = {
    closing_cost_id: id_(),
    deal_id: payload.deal_id || '',
    party: payload.party || '',
    cost_type: payload.cost_type || '',
    amount: payload.amount || 0,
    currency: payload.currency || 'TRY',
    cost_date: payload.cost_date || '',
    notes: payload.notes || '',
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  appendRow_(SHEETS.CLOSING_COSTS, row);
  return row;
}

/**
 * Listing expense utilities.
 */
function logListingExpense_(payload) {
  if (!cfg_('MODULES_LISTING_EXPENSES_ENABLED', DEFAULTS.MODULES_LISTING_EXPENSES_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.LISTING_EXPENSES);
  const row = {
    listing_expense_id: id_(),
    property_id: payload.property_id || '',
    deal_id: payload.deal_id || '',
    expense_type: payload.expense_type || '',
    amount: payload.amount || 0,
    currency: payload.currency || 'TRY',
    expense_date: payload.expense_date || '',
    vendor: payload.vendor || '',
    notes: payload.notes || '',
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  appendRow_(SHEETS.LISTING_EXPENSES, row);
  return row;
}

/**
 * Investment analysis utilities.
 */
function upsertInvestmentAnalysis_(payload) {
  if (!cfg_('MODULES_INVESTMENT_ENABLED', DEFAULTS.MODULES_INVESTMENT_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.INVESTMENT_ANALYSIS);
  const rows = getSheetData_(SHEETS.INVESTMENT_ANALYSIS);
  const existing = rows.find(row =>
    row.deal_id === payload.deal_id && row.property_id === payload.property_id
  );
  const record = {
    analysis_id: existing ? existing.analysis_id : id_(),
    deal_id: payload.deal_id || '',
    property_id: payload.property_id || '',
    noi: payload.noi || '',
    cap_rate: payload.cap_rate || '',
    roi: payload.roi || '',
    payback_years: payload.payback_years || '',
    cashflow_annual: payload.cashflow_annual || '',
    vacancy_rate: payload.vacancy_rate || '',
    assumptions: payload.assumptions || '',
    updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  if (existing) {
    updateRow_(SHEETS.INVESTMENT_ANALYSIS, existing._rowIndex, record);
  } else {
    appendRow_(SHEETS.INVESTMENT_ANALYSIS, record);
  }
  return record;
}

/**
 * Mortgage calculators.
 */
function calculateMortgage_(payload) {
  if (!cfg_('MODULES_MORTGAGE_ENABLED', DEFAULTS.MODULES_MORTGAGE_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.MORTGAGE_CALC);
  const principal = Number(payload.principal || 0);
  const rate = Number(payload.interest_rate || 0) / 100 / 12;
  const termMonths = Number(payload.term_years || 0) * 12;
  let monthlyPayment = 0;
  if (principal > 0 && rate > 0 && termMonths > 0) {
    monthlyPayment = principal * (rate * Math.pow(1 + rate, termMonths)) / (Math.pow(1 + rate, termMonths) - 1);
  }
  const totalPayment = monthlyPayment * termMonths;
  const totalInterest = totalPayment - principal;
  const row = {
    calc_id: id_(),
    principal: principal,
    interest_rate: payload.interest_rate || '',
    term_years: payload.term_years || '',
    down_payment: payload.down_payment || '',
    monthly_payment: monthlyPayment || '',
    total_interest: totalInterest || '',
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    notes: payload.notes || ''
  };
  appendRow_(SHEETS.MORTGAGE_CALC, row);
  return row;
}

function analyzeRentVsBuy_(payload) {
  if (!cfg_('MODULES_MORTGAGE_ENABLED', DEFAULTS.MODULES_MORTGAGE_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.RENT_BUY_ANALYSIS);
  const row = {
    analysis_id: id_(),
    monthly_rent: payload.monthly_rent || '',
    home_price: payload.home_price || '',
    down_payment: payload.down_payment || '',
    interest_rate: payload.interest_rate || '',
    term_years: payload.term_years || '',
    rent_growth_rate: payload.rent_growth_rate || '',
    home_appreciation_rate: payload.home_appreciation_rate || '',
    monthly_cost_diff: payload.monthly_cost_diff || '',
    break_even_years: payload.break_even_years || '',
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    notes: payload.notes || ''
  };
  appendRow_(SHEETS.RENT_BUY_ANALYSIS, row);
  return row;
}

/**
 * Quotation / Invoice / Receipt utilities.
 */
function createQuotation_(payload) {
  if (!cfg_('MODULES_DOCS_BILLING_ENABLED', DEFAULTS.MODULES_DOCS_BILLING_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.QUOTATIONS);
  const row = {
    quotation_id: id_(),
    contact_id: payload.contact_id || '',
    deal_id: payload.deal_id || '',
    property_id: payload.property_id || '',
    quote_date: payload.quote_date || '',
    status: payload.status || 'draft',
    total_amount: payload.total_amount || 0,
    currency: payload.currency || 'TRY',
    doc_url: payload.doc_url || '',
    notes: payload.notes || '',
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  appendRow_(SHEETS.QUOTATIONS, row);
  return row;
}

function createInvoice_(payload) {
  if (!cfg_('MODULES_DOCS_BILLING_ENABLED', DEFAULTS.MODULES_DOCS_BILLING_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.INVOICES);
  const row = {
    invoice_id: id_(),
    contact_id: payload.contact_id || '',
    deal_id: payload.deal_id || '',
    property_id: payload.property_id || '',
    invoice_date: payload.invoice_date || '',
    due_date: payload.due_date || '',
    status: payload.status || 'draft',
    subtotal: payload.subtotal || 0,
    tax_amount: payload.tax_amount || 0,
    total_amount: payload.total_amount || 0,
    currency: payload.currency || 'TRY',
    doc_url: payload.doc_url || '',
    notes: payload.notes || '',
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  appendRow_(SHEETS.INVOICES, row);
  return row;
}

function createReceipt_(payload) {
  if (!cfg_('MODULES_DOCS_BILLING_ENABLED', DEFAULTS.MODULES_DOCS_BILLING_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.RECEIPTS);
  const row = {
    receipt_id: id_(),
    contact_id: payload.contact_id || '',
    deal_id: payload.deal_id || '',
    property_id: payload.property_id || '',
    receipt_date: payload.receipt_date || '',
    amount: payload.amount || 0,
    currency: payload.currency || 'TRY',
    payment_method: payload.payment_method || '',
    doc_url: payload.doc_url || '',
    notes: payload.notes || '',
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  appendRow_(SHEETS.RECEIPTS, row);
  return row;
}

/**
 * Project management utilities.
 */
function createProject_(payload) {
  if (!cfg_('MODULES_PROJECTS_ENABLED', DEFAULTS.MODULES_PROJECTS_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.PROJECTS);
  const row = {
    project_id: id_(),
    project_name: payload.project_name || '',
    project_type: payload.project_type || '',
    start_date: payload.start_date || '',
    end_date: payload.end_date || '',
    status: payload.status || 'active',
    owner: payload.owner || '',
    budget_total: payload.budget_total || 0,
    notes: payload.notes || '',
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  appendRow_(SHEETS.PROJECTS, row);
  return row;
}

function createProjectMilestone_(payload) {
  if (!cfg_('MODULES_PROJECTS_ENABLED', DEFAULTS.MODULES_PROJECTS_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.MILESTONES);
  const row = {
    milestone_id: id_(),
    project_id: payload.project_id || '',
    title: payload.title || '',
    target_date: payload.target_date || '',
    status: payload.status || 'planned',
    progress_pct: payload.progress_pct || 0,
    notes: payload.notes || '',
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  appendRow_(SHEETS.MILESTONES, row);
  return row;
}

function logProjectBudget_(payload) {
  if (!cfg_('MODULES_PROJECTS_ENABLED', DEFAULTS.MODULES_PROJECTS_ENABLED)) {
    return { skipped: true };
  }
  ensureExtensionSheet_(SHEETS.PROJECT_BUDGETS);
  const row = {
    budget_id: id_(),
    project_id: payload.project_id || '',
    category: payload.category || '',
    planned_amount: payload.planned_amount || 0,
    actual_amount: payload.actual_amount || 0,
    currency: payload.currency || 'TRY',
    notes: payload.notes || '',
    updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  appendRow_(SHEETS.PROJECT_BUDGETS, row);
  return row;
}

/**
 * UI validation helpers.
 */
function applyUiValidations_() {
  if (!cfg_('MODULES_UI_VALIDATION_ENABLED', DEFAULTS.MODULES_UI_VALIDATION_ENABLED)) return;
  const validations = [
    { sheet: SHEETS.OPEN_HOUSES, column: 'status', values: ['scheduled', 'completed', 'cancelled'] },
    { sheet: SHEETS.OPEN_HOUSE_FOLLOWUPS, column: 'status', values: ['pending', 'contacted', 'won', 'lost'] },
    { sheet: SHEETS.CLOSING_COSTS, column: 'party', values: ['buyer', 'seller', 'broker', 'other'] },
    { sheet: SHEETS.LISTING_EXPENSES, column: 'expense_type', values: ['marketing', 'staging', 'photos', 'ads', 'other'] },
    { sheet: SHEETS.QUOTATIONS, column: 'status', values: ['draft', 'sent', 'accepted', 'rejected'] },
    { sheet: SHEETS.INVOICES, column: 'status', values: ['draft', 'sent', 'paid', 'overdue', 'void'] },
    { sheet: SHEETS.RECEIPTS, column: 'payment_method', values: ['cash', 'bank_transfer', 'card', 'other'] },
    { sheet: SHEETS.PROJECTS, column: 'status', values: ['active', 'on_hold', 'completed', 'cancelled'] }
  ];

  validations.forEach(rule => {
    const sheet = sheet_(rule.sheet, false);
    if (!sheet) return;
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const colIndex = headers.indexOf(rule.column);
    if (colIndex === -1) return;
    const range = sheet.getRange(2, colIndex + 1, Math.max(sheet.getMaxRows() - 1, 1));
    const validation = SpreadsheetApp.newDataValidation()
      .requireValueInList(rule.values, true)
      .build();
    range.setDataValidation(validation);
  });
}

/**
 * Role-based view helper.
 * Reads ROLE_VIEWS and creates filtered view sheets.
 */
function refreshRoleViews_() {
  if (!cfg_('MODULES_ROLE_VIEWS_ENABLED', DEFAULTS.MODULES_ROLE_VIEWS_ENABLED)) {
    return { skipped: true };
  }
  const views = getSheetData_(SHEETS.ROLE_VIEWS);
  const results = [];
  views.forEach(view => {
    const sheetName = view.sheet_name;
    const source = sheet_(sheetName, false);
    if (!source) return;
    const headers = source.getRange(1, 1, 1, source.getLastColumn()).getValues()[0];
    const data = source.getDataRange().getValues().slice(1);
    const filter = parseJsonSafe_(view.filter_json) || {};
    const filtered = data.filter(row => {
      if (!filter.column || filter.value === undefined) return true;
      const idx = headers.indexOf(filter.column);
      if (idx === -1) return true;
      return String(row[idx]) === String(filter.value);
    });
    const targetName = 'VIEW_' + String(view.role || 'role').toUpperCase() + '_' + sheetName;
    const target = sheet_(targetName, true);
    target.clearContents();
    target.getRange(1, 1, 1, headers.length).setValues([headers]);
    target.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    if (filtered.length > 0) {
      target.getRange(2, 1, filtered.length, headers.length).setValues(filtered);
    }
    results.push({ view: targetName, rows: filtered.length });
  });
  return { ok: true, views: results };
}
