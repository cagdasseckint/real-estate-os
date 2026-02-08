/**
 * Finance dashboard aggregation helpers.
 */

function refreshFinanceDashboard_() {
  const runAt = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  sheet_(SHEETS.FIN_DASH_AGG, true);
  sheet_(SHEETS.FIN_DASH_FX, true);

  const planRows = getSheetData_(SHEETS.FIN_PLAN);
  const monthlyRows = getSheetData_(SHEETS.FIN_MONTHLY);
  const transactionRows = getSheetData_(SHEETS.FIN_TRANSACTIONS);
  const taxRows = getSheetData_(SHEETS.FIN_TAX);
  const fxRows = getSheetData_(SHEETS.FIN_FX_RATES);
  const expenseRows = getSheetData_(SHEETS.FIN_EXPENSES);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const sumField = (rows, field) => rows.reduce((sum, row) => {
    const value = Number(row[field] || 0);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const sumFieldByYear = (rows, field, yearField) => rows.reduce((sum, row) => {
    if (Number(row[yearField]) !== currentYear) return sum;
    const value = Number(row[field] || 0);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const sumFieldByMonth = (rows, field, yearField, monthField) => rows.reduce((sum, row) => {
    if (Number(row[yearField]) !== currentYear || Number(row[monthField]) !== currentMonth) return sum;
    const value = Number(row[field] || 0);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const monthlyCiroTarget = sumFieldByYear(planRows, 'monthly_ciro_target', 'year');
  const annualCiroTarget = sumFieldByYear(planRows, 'annual_gross_ciro_target', 'year');
  const postTaxTarget = sumFieldByYear(planRows, 'post_tax_ciro_target', 'year');
  const postExpenseTarget = sumFieldByYear(planRows, 'post_expense_ciro_target', 'year');

  const monthlyCiroActual = sumFieldByMonth(monthlyRows, 'ciro_actual', 'year', 'month');
  const annualCiroActual = sumFieldByYear(monthlyRows, 'ciro_actual', 'year');
  const monthlyTransactionNet = transactionRows.reduce((sum, row) => {
    const dateParts = getFinanceDateParts_(row.transaction_date);
    if (!dateParts || dateParts.year !== currentYear || dateParts.month !== currentMonth) return sum;
    const value = Number(row.transaction_total_net_ciro || 0);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const annualConsultantNet = transactionRows.reduce((sum, row) => {
    const dateParts = getFinanceDateParts_(row.transaction_date);
    if (!dateParts || dateParts.year !== currentYear) return sum;
    const value = Number(row.consultant_net_ciro || 0);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);
  const annualConsultantNetAfterTax = transactionRows.reduce((sum, row) => {
    const dateParts = getFinanceDateParts_(row.transaction_date);
    if (!dateParts || dateParts.year !== currentYear) return sum;
    const value = Number(row.consultant_net_after_tax || 0);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);
  const annualShareTaxes = transactionRows.reduce((sum, row) => {
    const dateParts = getFinanceDateParts_(row.transaction_date);
    if (!dateParts || dateParts.year !== currentYear) return sum;
    const value = Number(row.office_tax || 0) + Number(row.cbtr_tax || 0) + Number(row.consultant_tax || 0);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);
  const monthlyExpenses = expenseRows.reduce((sum, row) => {
    const dateParts = getFinanceDateParts_(row.expense_date);
    if (!dateParts || dateParts.year !== currentYear || dateParts.month !== currentMonth) return sum;
    const value = Number(row.expense_amount || 0);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);
  const annualExpenses = expenseRows.reduce((sum, row) => {
    const dateParts = getFinanceDateParts_(row.expense_date);
    if (!dateParts || dateParts.year !== currentYear) return sum;
    const value = Number(row.expense_amount || 0);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const taxAnnualRow = taxRows.find(row => row.metric === 'annual_income_tax');
  const annualIncomeTax = taxAnnualRow ? Number(taxAnnualRow.value || 0) : 0;

  const financeRows = [
    ['monthly_ciro_target', monthlyCiroTarget, runAt],
    ['monthly_ciro_actual', monthlyCiroActual, runAt],
    ['annual_ciro_target', annualCiroTarget, runAt],
    ['annual_ciro_actual', annualCiroActual, runAt],
    ['monthly_transaction_net_ciro', monthlyTransactionNet, runAt],
    ['annual_consultant_net_ciro', annualConsultantNet, runAt],
    ['annual_consultant_net_after_tax', annualConsultantNetAfterTax, runAt],
    ['annual_share_taxes', annualShareTaxes, runAt],
    ['monthly_expenses', monthlyExpenses, runAt],
    ['annual_expenses', annualExpenses, runAt],
    ['annual_income_tax', annualIncomeTax, runAt],
    ['post_tax_ciro_target', postTaxTarget, runAt],
    ['post_expense_ciro_target', postExpenseTarget, runAt]
  ];

  writeDashboardTable_(SHEETS.FIN_DASH_AGG, financeRows);

  const fxDashboardRows = fxRows.map(row => [
    row.currency_pair || '',
    row.open_rate || '',
    row.close_rate || '',
    runAt
  ]);
  writeDashboardTable_(SHEETS.FIN_DASH_FX, fxDashboardRows);

  return {
    ok: true,
    finance_rows: financeRows.length,
    fx_rows: fxDashboardRows.length
  };
}

/**
 * Helper to extract year/month from date values.
 * @param {*} dateValue - Date value (string or Date)
 * @returns {{year: number, month: number}|null} Date parts
 */
function getFinanceDateParts_(dateValue) {
  if (!dateValue) return null;
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return null;
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}
