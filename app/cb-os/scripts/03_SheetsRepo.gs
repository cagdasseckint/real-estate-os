// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS V1.0 - 03_SheetsRepo.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS V1.0 - 03_SheetsRepo.gs
// EXPLAIN: Bu satırın görevi: * Sheet access, creation, and schema management. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Sheet access, creation, and schema management
// EXPLAIN: Bu satırın görevi: * Handles GREENFIELD and SCHEMA_LOCKED modes. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Handles GREENFIELD and SCHEMA_LOCKED modes
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Schema mode detection cache. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Schema mode detection cache
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: let _schemaModeCache = {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
let _schemaModeCache = {};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Get or create a sheet by name. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Get or create a sheet by name
// EXPLAIN: Bu satırın görevi: * @param {string} name - Sheet name from SHEETS constant. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} name - Sheet name from SHEETS constant
// EXPLAIN: Bu satırın görevi: * @param {boolean} createIfMissing - Create sheet if not found (GREENFIELD only). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {boolean} createIfMissing - Create sheet if not found (GREENFIELD only)
// EXPLAIN: Bu satırın görevi: * @returns {Sheet|null} Sheet object or null if not found and createIfMissing=false. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Sheet|null} Sheet object or null if not found and createIfMissing=false
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function sheet_(name, createIfMissing) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function sheet_(name, createIfMissing) {
// EXPLAIN: Bu satırın görevi: if (createIfMissing === undefined) createIfMissing = false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (createIfMissing === undefined) createIfMissing = false;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const ss = getWorkbook_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const ss = getWorkbook_();
// EXPLAIN: Bu satırın görevi: let sheet = ss.getSheetByName(name);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let sheet = ss.getSheetByName(name);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (sheet) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (sheet) {
// EXPLAIN: Bu satırın görevi: // SCHEMA LOCKED MODE - sheet exists. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // SCHEMA LOCKED MODE - sheet exists
// EXPLAIN: Bu satırın görevi: _schemaModeCache[name] = 'SCHEMA_LOCKED';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    _schemaModeCache[name] = 'SCHEMA_LOCKED';
// EXPLAIN: Bu satırın görevi: return sheet;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return sheet;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (createIfMissing) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (createIfMissing) {
// EXPLAIN: Bu satırın görevi: // GREENFIELD MODE - create with canonical headers. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // GREENFIELD MODE - create with canonical headers
// EXPLAIN: Bu satırın görevi: sheet = ss.insertSheet(name);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sheet = ss.insertSheet(name);
// EXPLAIN: Bu satırın görevi: _schemaModeCache[name] = 'GREENFIELD';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    _schemaModeCache[name] = 'GREENFIELD';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Set canonical headers if defined. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Set canonical headers if defined
// EXPLAIN: Bu satırın görevi: if (CANONICAL_HEADERS[name]) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (CANONICAL_HEADERS[name]) {
// EXPLAIN: Bu satırın görevi: sheet.getRange(1, 1, 1, CANONICAL_HEADERS[name].length). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet.getRange(1, 1, 1, CANONICAL_HEADERS[name].length)
// EXPLAIN: Bu satırın görevi: .setValues([CANONICAL_HEADERS[name]]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
           .setValues([CANONICAL_HEADERS[name]]);
// EXPLAIN: Bu satırın görevi: sheet.getRange(1, 1, 1, CANONICAL_HEADERS[name].length). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet.getRange(1, 1, 1, CANONICAL_HEADERS[name].length)
// EXPLAIN: Bu satırın görevi: .setFontWeight('bold');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
           .setFontWeight('bold');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: Logger.log('GREENFIELD | Created sheet: ' + name + ' with canonical headers');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('GREENFIELD | Created sheet: ' + name + ' with canonical headers');
// EXPLAIN: Bu satırın görevi: return sheet;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return sheet;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return null;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Ensure all required sheets exist (GREENFIELD bootstrap). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Ensure all required sheets exist (GREENFIELD bootstrap)
// EXPLAIN: Bu satırın görevi: * @returns {Object} Status report of sheet creation. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Status report of sheet creation
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function bootstrapSheets_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function bootstrapSheets_() {
// EXPLAIN: Bu satırın görevi: const report = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const report = {
// EXPLAIN: Bu satırın görevi: mode: 'GREENFIELD',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    mode: 'GREENFIELD',
// EXPLAIN: Bu satırın görevi: created: [],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    created: [],
// EXPLAIN: Bu satırın görevi: existing: [],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    existing: [],
// EXPLAIN: Bu satırın görevi: errors: []. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    errors: []
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const requiredSheets = [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const requiredSheets = [
// EXPLAIN: Bu satırın görevi: SHEETS.INGEST_QUEUE,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.INGEST_QUEUE,
// EXPLAIN: Bu satırın görevi: SHEETS.DLQ,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.DLQ,
// EXPLAIN: Bu satırın görevi: SHEETS.JOB_RUN_LOG,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.JOB_RUN_LOG,
// EXPLAIN: Bu satırın görevi: SHEETS.CONTACTS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.CONTACTS,
// EXPLAIN: Bu satırın görevi: SHEETS.DEALS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.DEALS,
// EXPLAIN: Bu satırın görevi: SHEETS.TASKS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.TASKS,
// EXPLAIN: Bu satırın görevi: SHEETS.EVENTS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.EVENTS,
// EXPLAIN: Bu satırın görevi: SHEETS.APPOINTMENTS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.APPOINTMENTS,
// EXPLAIN: Bu satırın görevi: SHEETS.DOCS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.DOCS,
// EXPLAIN: Bu satırın görevi: SHEETS.DEDUP_KEYS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.DEDUP_KEYS,
// EXPLAIN: Bu satırın görevi: SHEETS.CONFIG,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.CONFIG,
// EXPLAIN: Bu satırın görevi: SHEETS.STAGE_AUTOMATIONS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.STAGE_AUTOMATIONS,
// EXPLAIN: Bu satırın görevi: SHEETS.TASK_TEMPLATES,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.TASK_TEMPLATES,
// EXPLAIN: Bu satırın görevi: SHEETS.LEAD_SCORES,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.LEAD_SCORES,
// EXPLAIN: Bu satırın görevi: SHEETS.LEAD_SIGNALS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.LEAD_SIGNALS,
// EXPLAIN: Bu satırın görevi: SHEETS.EMAIL_DRAFTS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.EMAIL_DRAFTS,
// EXPLAIN: Bu satırın görevi: SHEETS.FOLLOWUP_SEQUENCES,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.FOLLOWUP_SEQUENCES,
// EXPLAIN: Bu satırın görevi: SHEETS.DOC_PACKAGES,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.DOC_PACKAGES,
// EXPLAIN: Bu satırın görevi: SHEETS.DOC_TEMPLATES,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.DOC_TEMPLATES,
// EXPLAIN: Bu satırın görevi: SHEETS.OPS_DASHBOARD,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.OPS_DASHBOARD,
// EXPLAIN: Bu satırın görevi: SHEETS.DRIVE_SHARE_AUDIT,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.DRIVE_SHARE_AUDIT,
// EXPLAIN: Bu satırın görevi: SHEETS.ACCESS_INVENTORY,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.ACCESS_INVENTORY,
// EXPLAIN: Bu satırın görevi: SHEETS.SECURITY_SOP,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.SECURITY_SOP,
// EXPLAIN: Bu satırın görevi: SHEETS.PROPERTIES,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.PROPERTIES,
// EXPLAIN: Bu satırın görevi: SHEETS.AGREEMENTS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.AGREEMENTS,
// EXPLAIN: Bu satırın görevi: SHEETS.DOCUMENT_CHECKLISTS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.DOCUMENT_CHECKLISTS,
// EXPLAIN: Bu satırın görevi: SHEETS.VIEWINGS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.VIEWINGS,
// EXPLAIN: Bu satırın görevi: SHEETS.OFFERS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.OFFERS,
// EXPLAIN: Bu satırın görevi: SHEETS.PRICE_CHANGES,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.PRICE_CHANGES,
// EXPLAIN: Bu satırın görevi: SHEETS.MARKETING_ASSETS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.MARKETING_ASSETS,
// EXPLAIN: Bu satırın görevi: SHEETS.CONSENTS,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.CONSENTS,
// EXPLAIN: Bu satırın görevi: SHEETS.CONVERSION_QUEUE. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    SHEETS.CONVERSION_QUEUE
// EXPLAIN: Bu satırın görevi: ];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (const sheetName of requiredSheets) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const sheetName of requiredSheets) {
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    try {
// EXPLAIN: Bu satırın görevi: const ss = getWorkbook_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const ss = getWorkbook_();
// EXPLAIN: Bu satırın görevi: let sheet = ss.getSheetByName(sheetName);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      let sheet = ss.getSheetByName(sheetName);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: if (sheet) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (sheet) {
// EXPLAIN: Bu satırın görevi: report.existing.push(sheetName);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        report.existing.push(sheetName);
// EXPLAIN: Bu satırın görevi: // Validate headers in SCHEMA_LOCKED mode. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // Validate headers in SCHEMA_LOCKED mode
// EXPLAIN: Bu satırın görevi: const headerValidation = validateHeaders_(sheet, sheetName);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        const headerValidation = validateHeaders_(sheet, sheetName);
// EXPLAIN: Bu satırın görevi: if (!headerValidation.valid) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        if (!headerValidation.valid) {
// EXPLAIN: Bu satırın görevi: report.errors.push({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          report.errors.push({
// EXPLAIN: Bu satırın görevi: sheet: sheetName,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
            sheet: sheetName,
// EXPLAIN: Bu satırın görevi: issue: 'HEADER_MISMATCH',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
            issue: 'HEADER_MISMATCH',
// EXPLAIN: Bu satırın görevi: details: headerValidation.mismatches. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
            details: headerValidation.mismatches
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        }
// EXPLAIN: Bu satırın görevi: } else {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      } else {
// EXPLAIN: Bu satırın görevi: // Create with canonical headers. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        // Create with canonical headers
// EXPLAIN: Bu satırın görevi: sheet_(sheetName, true);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        sheet_(sheetName, true);
// EXPLAIN: Bu satırın görevi: report.created.push(sheetName);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        report.created.push(sheetName);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } catch (e) {
// EXPLAIN: Bu satırın görevi: report.errors.push({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      report.errors.push({
// EXPLAIN: Bu satırın görevi: sheet: sheetName,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        sheet: sheetName,
// EXPLAIN: Bu satırın görevi: issue: 'CREATE_ERROR',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        issue: 'CREATE_ERROR',
// EXPLAIN: Bu satırın görevi: details: e.message. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        details: e.message
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Seed default CONFIG values if CONFIG was created. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Seed default CONFIG values if CONFIG was created
// EXPLAIN: Bu satırın görevi: if (report.created.includes(SHEETS.CONFIG)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (report.created.includes(SHEETS.CONFIG)) {
// EXPLAIN: Bu satırın görevi: seedDefaultConfig_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    seedDefaultConfig_();
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (report.created.includes(SHEETS.TASK_TEMPLATES)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (report.created.includes(SHEETS.TASK_TEMPLATES)) {
// EXPLAIN: Bu satırın görevi: seedDefaultTaskTemplates_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    seedDefaultTaskTemplates_();
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (report.created.includes(SHEETS.FOLLOWUP_SEQUENCES)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (report.created.includes(SHEETS.FOLLOWUP_SEQUENCES)) {
// EXPLAIN: Bu satırın görevi: seedDefaultFollowupSequences_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    seedDefaultFollowupSequences_();
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (report.created.includes(SHEETS.SECURITY_SOP)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (report.created.includes(SHEETS.SECURITY_SOP)) {
// EXPLAIN: Bu satırın görevi: seedSecuritySop_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    seedSecuritySop_();
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('BOOTSTRAP | Report: ' + JSON.stringify(report));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('BOOTSTRAP | Report: ' + JSON.stringify(report));
// EXPLAIN: Bu satırın görevi: return report;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return report;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Validate sheet headers against canonical definition. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Validate sheet headers against canonical definition
// EXPLAIN: Bu satırın görevi: * @param {Sheet} sheet - Sheet to validate. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Sheet} sheet - Sheet to validate
// EXPLAIN: Bu satırın görevi: * @param {string} sheetName - Sheet name for canonical lookup. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} sheetName - Sheet name for canonical lookup
// EXPLAIN: Bu satırın görevi: * @returns {Object} Validation result with valid flag and mismatches. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Validation result with valid flag and mismatches
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function validateHeaders_(sheet, sheetName) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function validateHeaders_(sheet, sheetName) {
// EXPLAIN: Bu satırın görevi: const result = { valid: true, mismatches: [], aliasMap: {} };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const result = { valid: true, mismatches: [], aliasMap: {} };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const canonical = CANONICAL_HEADERS[sheetName];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const canonical = CANONICAL_HEADERS[sheetName];
// EXPLAIN: Bu satırın görevi: if (!canonical) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!canonical) {
// EXPLAIN: Bu satırın görevi: // No canonical definition, assume valid. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // No canonical definition, assume valid
// EXPLAIN: Bu satırın görevi: return result;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return result;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
// EXPLAIN: Bu satırın görevi: const actualHeaders = headerRange.getValues()[0];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const actualHeaders = headerRange.getValues()[0];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Build alias map for read-only access. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Build alias map for read-only access
// EXPLAIN: Bu satırın görevi: for (let i = 0; i < canonical.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = 0; i < canonical.length; i++) {
// EXPLAIN: Bu satırın görevi: const expectedCol = canonical[i];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const expectedCol = canonical[i];
// EXPLAIN: Bu satırın görevi: const actualIdx = actualHeaders.indexOf(expectedCol);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const actualIdx = actualHeaders.indexOf(expectedCol);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: if (actualIdx === -1) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (actualIdx === -1) {
// EXPLAIN: Bu satırın görevi: // Column missing. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      // Column missing
// EXPLAIN: Bu satırın görevi: result.mismatches.push({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      result.mismatches.push({
// EXPLAIN: Bu satırın görevi: expected: expectedCol,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        expected: expectedCol,
// EXPLAIN: Bu satırın görevi: position: i,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        position: i,
// EXPLAIN: Bu satırın görevi: found: null. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        found: null
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      });
// EXPLAIN: Bu satırın görevi: result.valid = false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      result.valid = false;
// EXPLAIN: Bu satırın görevi: } else if (actualIdx !== i) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else if (actualIdx !== i) {
// EXPLAIN: Bu satırın görevi: // Column exists but in different position. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      // Column exists but in different position
// EXPLAIN: Bu satırın görevi: result.aliasMap[expectedCol] = actualIdx;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      result.aliasMap[expectedCol] = actualIdx;
// EXPLAIN: Bu satırın görevi: result.mismatches.push({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      result.mismatches.push({
// EXPLAIN: Bu satırın görevi: expected: expectedCol,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        expected: expectedCol,
// EXPLAIN: Bu satırın görevi: expectedPosition: i,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        expectedPosition: i,
// EXPLAIN: Bu satırın görevi: actualPosition: actualIdx. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        actualPosition: actualIdx
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      });
// EXPLAIN: Bu satırın görevi: // SCHEMA_LOCKED: don't fail, just build alias map. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      // SCHEMA_LOCKED: don't fail, just build alias map
// EXPLAIN: Bu satırın görevi: } else {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else {
// EXPLAIN: Bu satırın görevi: result.aliasMap[expectedCol] = i;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      result.aliasMap[expectedCol] = i;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return result;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return result;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Get column index by name (0-based) with alias support. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Get column index by name (0-based) with alias support
// EXPLAIN: Bu satırın görevi: * @param {string} sheetName - Sheet name. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} sheetName - Sheet name
// EXPLAIN: Bu satırın görevi: * @param {string} columnName - Column name. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} columnName - Column name
// EXPLAIN: Bu satırın görevi: * @returns {number} Column index (0-based) or -1 if not found. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {number} Column index (0-based) or -1 if not found
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function getColIndex_(sheetName, columnName) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function getColIndex_(sheetName, columnName) {
// EXPLAIN: Bu satırın görevi: // Prefer actual sheet headers to respect SCHEMA_LOCKED column order. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Prefer actual sheet headers to respect SCHEMA_LOCKED column order
// EXPLAIN: Bu satırın görevi: const sheet = sheet_(sheetName, false);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = sheet_(sheetName, false);
// EXPLAIN: Bu satırın görevi: if (sheet) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (sheet) {
// EXPLAIN: Bu satırın görevi: const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
// EXPLAIN: Bu satırın görevi: const idx = headers.indexOf(columnName);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const idx = headers.indexOf(columnName);
// EXPLAIN: Bu satırın görevi: if (idx !== -1) return idx;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (idx !== -1) return idx;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Fallback to canonical definition. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Fallback to canonical definition
// EXPLAIN: Bu satırın görevi: const canonical = CANONICAL_HEADERS[sheetName];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const canonical = CANONICAL_HEADERS[sheetName];
// EXPLAIN: Bu satırın görevi: if (canonical) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (canonical) {
// EXPLAIN: Bu satırın görevi: return canonical.indexOf(columnName);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return canonical.indexOf(columnName);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return -1;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return -1;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Seed default CONFIG values. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Seed default CONFIG values
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function seedDefaultConfig_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function seedDefaultConfig_() {
// EXPLAIN: Bu satırın görevi: const sheet = sheet_(SHEETS.CONFIG, false);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = sheet_(SHEETS.CONFIG, false);
// EXPLAIN: Bu satırın görevi: if (!sheet) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) return;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const defaults = [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const defaults = [
// EXPLAIN: Bu satırın görevi: ['TIMEZONE', DEFAULTS.TIMEZONE, 'System timezone'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['TIMEZONE', DEFAULTS.TIMEZONE, 'System timezone'],
// EXPLAIN: Bu satırın görevi: ['WA_MODE', DEFAULTS.WA_MODE, 'WhatsApp mode: manual_logging'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['WA_MODE', DEFAULTS.WA_MODE, 'WhatsApp mode: manual_logging'],
// EXPLAIN: Bu satırın görevi: ['WABA_POLICY_MODE', DEFAULTS.WABA_POLICY_MODE, 'WABA policy: draft_only'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['WABA_POLICY_MODE', DEFAULTS.WABA_POLICY_MODE, 'WABA policy: draft_only'],
// EXPLAIN: Bu satırın görevi: ['BOOKING_MODE', DEFAULTS.BOOKING_MODE, 'Booking mode: manual'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['BOOKING_MODE', DEFAULTS.BOOKING_MODE, 'Booking mode: manual'],
// EXPLAIN: Bu satırın görevi: ['SLA_FIRST_TOUCH_MINUTES', DEFAULTS.SLA_FIRST_TOUCH_MINUTES, 'SLA for first touch in minutes'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['SLA_FIRST_TOUCH_MINUTES', DEFAULTS.SLA_FIRST_TOUCH_MINUTES, 'SLA for first touch in minutes'],
// EXPLAIN: Bu satırın görevi: ['FOLLOWUP_48H_ENABLED', DEFAULTS.FOLLOWUP_48H_ENABLED, 'Enable 48h follow-up reminders'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['FOLLOWUP_48H_ENABLED', DEFAULTS.FOLLOWUP_48H_ENABLED, 'Enable 48h follow-up reminders'],
// EXPLAIN: Bu satırın görevi: ['ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE, 'Batch size for orchestrator jobs'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['ORCH_BATCH_SIZE', DEFAULTS.ORCH_BATCH_SIZE, 'Batch size for orchestrator jobs'],
// EXPLAIN: Bu satırın görevi: ['GMAIL_SCAN_LABELS', DEFAULTS.GMAIL_SCAN_LABELS, 'Gmail labels to scan (comma-separated)'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['GMAIL_SCAN_LABELS', DEFAULTS.GMAIL_SCAN_LABELS, 'Gmail labels to scan (comma-separated)'],
// EXPLAIN: Bu satırın görevi: ['STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD, 'Days before deal is stuck'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['STUCK_STAGE_DAYS_THRESHOLD', DEFAULTS.STUCK_STAGE_DAYS_THRESHOLD, 'Days before deal is stuck'],
// EXPLAIN: Bu satırın görevi: ['HOT_RESPONSE_MINUTES_THRESHOLD', DEFAULTS.HOT_RESPONSE_MINUTES_THRESHOLD, 'Minutes threshold for hot response'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['HOT_RESPONSE_MINUTES_THRESHOLD', DEFAULTS.HOT_RESPONSE_MINUTES_THRESHOLD, 'Minutes threshold for hot response'],
// EXPLAIN: Bu satırın görevi: ['SLA_ALERT_RECIPIENTS', DEFAULTS.SLA_ALERT_RECIPIENTS, 'Comma-separated SLA alert recipients'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['SLA_ALERT_RECIPIENTS', DEFAULTS.SLA_ALERT_RECIPIENTS, 'Comma-separated SLA alert recipients'],
// EXPLAIN: Bu satırın görevi: ['LEAD_SCORE_TOP_N', DEFAULTS.LEAD_SCORE_TOP_N, 'Top N leads for follow-up tasks'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['LEAD_SCORE_TOP_N', DEFAULTS.LEAD_SCORE_TOP_N, 'Top N leads for follow-up tasks'],
// EXPLAIN: Bu satırın görevi: ['LEAD_SCORE_MIN_THRESHOLD', DEFAULTS.LEAD_SCORE_MIN_THRESHOLD, 'Minimum score for follow-up list'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['LEAD_SCORE_MIN_THRESHOLD', DEFAULTS.LEAD_SCORE_MIN_THRESHOLD, 'Minimum score for follow-up list'],
// EXPLAIN: Bu satırın görevi: ['FOLLOWUP_SEQUENCE_ENABLED', DEFAULTS.FOLLOWUP_SEQUENCE_ENABLED, 'Enable follow-up sequences'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['FOLLOWUP_SEQUENCE_ENABLED', DEFAULTS.FOLLOWUP_SEQUENCE_ENABLED, 'Enable follow-up sequences'],
// EXPLAIN: Bu satırın görevi: ['EMAIL_DRAFTS_ENABLED', DEFAULTS.EMAIL_DRAFTS_ENABLED, 'Enable Gmail draft queue'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['EMAIL_DRAFTS_ENABLED', DEFAULTS.EMAIL_DRAFTS_ENABLED, 'Enable Gmail draft queue'],
// EXPLAIN: Bu satırın görevi: ['DOC_PACKAGES_ENABLED', DEFAULTS.DOC_PACKAGES_ENABLED, 'Enable docs packages on deal creation'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['DOC_PACKAGES_ENABLED', DEFAULTS.DOC_PACKAGES_ENABLED, 'Enable docs packages on deal creation'],
// EXPLAIN: Bu satırın görevi: ['DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID, 'Default folder for generated docs'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID, 'Default folder for generated docs'],
// EXPLAIN: Bu satırın görevi: ['WEEKLY_KPI_RECIPIENTS', DEFAULTS.WEEKLY_KPI_RECIPIENTS, 'Comma-separated KPI email recipients'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['WEEKLY_KPI_RECIPIENTS', DEFAULTS.WEEKLY_KPI_RECIPIENTS, 'Comma-separated KPI email recipients'],
// EXPLAIN: Bu satırın görevi: ['WEEKLY_KPI_ENABLED', DEFAULTS.WEEKLY_KPI_ENABLED, 'Enable weekly KPI report'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['WEEKLY_KPI_ENABLED', DEFAULTS.WEEKLY_KPI_ENABLED, 'Enable weekly KPI report'],
// EXPLAIN: Bu satırın görevi: ['DRIVE_SHARE_AUDIT_ENABLED', DEFAULTS.DRIVE_SHARE_AUDIT_ENABLED, 'Enable drive share audit reporting'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['DRIVE_SHARE_AUDIT_ENABLED', DEFAULTS.DRIVE_SHARE_AUDIT_ENABLED, 'Enable drive share audit reporting'],
// EXPLAIN: Bu satırın görevi: ['WINBACK_ENABLED', DEFAULTS.WINBACK_ENABLED, 'Enable win-back sequences for lost deals'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['WINBACK_ENABLED', DEFAULTS.WINBACK_ENABLED, 'Enable win-back sequences for lost deals'],
// EXPLAIN: Bu satırın görevi: ['CLOSE_CHECKLIST_ENABLED', DEFAULTS.CLOSE_CHECKLIST_ENABLED, 'Enable close checklist tasks'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['CLOSE_CHECKLIST_ENABLED', DEFAULTS.CLOSE_CHECKLIST_ENABLED, 'Enable close checklist tasks'],
// EXPLAIN: Bu satırın görevi: ['DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY, 'Maximum DLQ retry attempts'],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['DLQ_MAX_RETRY', DEFAULTS.DLQ_MAX_RETRY, 'Maximum DLQ retry attempts'],
// EXPLAIN: Bu satırın görevi: ['SMOKE_CHECKED_BY', DEFAULTS.SMOKE_CHECKED_BY, 'Default smoke test checked_by']. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['SMOKE_CHECKED_BY', DEFAULTS.SMOKE_CHECKED_BY, 'Default smoke test checked_by']
// EXPLAIN: Bu satırın görevi: ];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: // Append after header row. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  // Append after header row
// EXPLAIN: Bu satırın görevi: if (defaults.length > 0) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (defaults.length > 0) {
// EXPLAIN: Bu satırın görevi: sheet.getRange(2, 1, defaults.length, 3).setValues(defaults);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    sheet.getRange(2, 1, defaults.length, 3).setValues(defaults);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: Logger.log('CONFIG | Seeded default values');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  Logger.log('CONFIG | Seeded default values');
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Seed default task templates. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Seed default task templates
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function seedDefaultTaskTemplates_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function seedDefaultTaskTemplates_() {
// EXPLAIN: Bu satırın görevi: const sheet = sheet_(SHEETS.TASK_TEMPLATES, false);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = sheet_(SHEETS.TASK_TEMPLATES, false);
// EXPLAIN: Bu satırın görevi: if (!sheet) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) return;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const templates = [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const templates = [
// EXPLAIN: Bu satırın görevi: ['first_touch', 'first_touch', 'DEAL', 'İlk temas yap', 'Lead ile ilk iletişimi kur', 'high', 1, '', 1, 'task', ''],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['first_touch', 'first_touch', 'DEAL', 'İlk temas yap', 'Lead ile ilk iletişimi kur', 'high', 1, '', 1, 'task', ''],
// EXPLAIN: Bu satırın görevi: ['followup_48h', 'followup_48h', 'DEAL', '48 saat takip', '48 saat içinde takip iletişimi yap', 'medium', '', 48, 2, 'task', ''],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['followup_48h', 'followup_48h', 'DEAL', '48 saat takip', '48 saat içinde takip iletişimi yap', 'medium', '', 48, 2, 'task', ''],
// EXPLAIN: Bu satırın görevi: ['close_checklist', 'close_checklist', 'DEAL', 'Closing checklist', 'Kapanış için gerekli tüm maddeleri tamamla', 'high', 1, '', 1, 'task', '']. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['close_checklist', 'close_checklist', 'DEAL', 'Closing checklist', 'Kapanış için gerekli tüm maddeleri tamamla', 'high', 1, '', 1, 'task', '']
// EXPLAIN: Bu satırın görevi: ];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: sheet.getRange(2, 1, templates.length, templates[0].length).setValues(templates);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.getRange(2, 1, templates.length, templates[0].length).setValues(templates);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Seed default follow-up sequence definitions. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Seed default follow-up sequence definitions
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function seedDefaultFollowupSequences_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function seedDefaultFollowupSequences_() {
// EXPLAIN: Bu satırın görevi: const sheet = sheet_(SHEETS.FOLLOWUP_SEQUENCES, false);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = sheet_(SHEETS.FOLLOWUP_SEQUENCES, false);
// EXPLAIN: Bu satırın görevi: if (!sheet) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) return;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const steps = JSON.stringify([. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const steps = JSON.stringify([
// EXPLAIN: Bu satırın görevi: { offset_days: 2, action: 'task', template: 'followup_48h' },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    { offset_days: 2, action: 'task', template: 'followup_48h' },
// EXPLAIN: Bu satırın görevi: { offset_days: 7, action: 'email', subject: 'Takip', body: 'Merhaba, tekrar iletişime geçiyorum.' },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    { offset_days: 7, action: 'email', subject: 'Takip', body: 'Merhaba, tekrar iletişime geçiyorum.' },
// EXPLAIN: Bu satırın görevi: { offset_days: 14, action: 'email', subject: 'Takip - 2', body: 'Merhaba, tekrar dönüş rica ederim.' }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    { offset_days: 14, action: 'email', subject: 'Takip - 2', body: 'Merhaba, tekrar dönüş rica ederim.' }
// EXPLAIN: Bu satırın görevi: ]);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ]);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const rows = [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const rows = [
// EXPLAIN: Bu satırın görevi: ['followup_default', 'Default Follow-up', '*', '*', steps, true]. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['followup_default', 'Default Follow-up', '*', '*', steps, true]
// EXPLAIN: Bu satırın görevi: ];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Seed security SOP checklist. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Seed security SOP checklist
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function seedSecuritySop_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function seedSecuritySop_() {
// EXPLAIN: Bu satırın görevi: const sheet = sheet_(SHEETS.SECURITY_SOP, false);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = sheet_(SHEETS.SECURITY_SOP, false);
// EXPLAIN: Bu satırın görevi: if (!sheet) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) return;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const rows = [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const rows = [
// EXPLAIN: Bu satırın görevi: ['SOP-001', 'Passwords', 'Tek hesap/tek cihaz kuralı uygulanıyor', 'pending', ''],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['SOP-001', 'Passwords', 'Tek hesap/tek cihaz kuralı uygulanıyor', 'pending', ''],
// EXPLAIN: Bu satırın görevi: ['SOP-002', 'Passwords', 'Paylaşılan parola yok', 'pending', ''],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['SOP-002', 'Passwords', 'Paylaşılan parola yok', 'pending', ''],
// EXPLAIN: Bu satırın görevi: ['SOP-003', 'Access', 'Tüm erişimler envantere işlendi', 'pending', ''],. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['SOP-003', 'Access', 'Tüm erişimler envantere işlendi', 'pending', ''],
// EXPLAIN: Bu satırın görevi: ['SOP-004', 'Access', 'Ayrılan kullanıcı erişimleri kapatıldı', 'pending', '']. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ['SOP-004', 'Access', 'Ayrılan kullanıcı erişimleri kapatıldı', 'pending', '']
// EXPLAIN: Bu satırın görevi: ];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Get all data from a sheet as array of objects. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Get all data from a sheet as array of objects
// EXPLAIN: Bu satırın görevi: * @param {string} sheetName - Sheet name. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} sheetName - Sheet name
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Array of row objects with column names as keys. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Array<Object>} Array of row objects with column names as keys
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function getSheetData_(sheetName) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function getSheetData_(sheetName) {
// EXPLAIN: Bu satırın görevi: const sheet = sheet_(sheetName, false);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = sheet_(sheetName, false);
// EXPLAIN: Bu satırın görevi: if (!sheet) return [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) return [];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const data = sheet.getDataRange().getValues();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const data = sheet.getDataRange().getValues();
// EXPLAIN: Bu satırın görevi: if (data.length < 2) return []; // Header only. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (data.length < 2) return []; // Header only
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const headers = data[0];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = data[0];
// EXPLAIN: Bu satırın görevi: const rows = [];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const rows = [];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (let i = 1; i < data.length; i++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (let i = 1; i < data.length; i++) {
// EXPLAIN: Bu satırın görevi: const row = {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const row = {};
// EXPLAIN: Bu satırın görevi: for (let j = 0; j < headers.length; j++) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    for (let j = 0; j < headers.length; j++) {
// EXPLAIN: Bu satırın görevi: row[headers[j]] = data[i][j];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      row[headers[j]] = data[i][j];
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: row._rowIndex = i + 1; // 1-based sheet row number. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    row._rowIndex = i + 1; // 1-based sheet row number
// EXPLAIN: Bu satırın görevi: rows.push(row);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    rows.push(row);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return rows;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return rows;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Append a row to a sheet. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Append a row to a sheet
// EXPLAIN: Bu satırın görevi: * @param {string} sheetName - Sheet name. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} sheetName - Sheet name
// EXPLAIN: Bu satırın görevi: * @param {Object} rowData - Object with column names as keys. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} rowData - Object with column names as keys
// EXPLAIN: Bu satırın görevi: * @returns {number} New row number (1-based). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {number} New row number (1-based)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function appendRow_(sheetName, rowData) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function appendRow_(sheetName, rowData) {
// EXPLAIN: Bu satırın görevi: const sheet = sheet_(sheetName, true);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = sheet_(sheetName, true);
// EXPLAIN: Bu satırın görevi: const headers = CANONICAL_HEADERS[sheetName] ||. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const headers = CANONICAL_HEADERS[sheetName] || 
// EXPLAIN: Bu satırın görevi: sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
                  sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const rowArray = headers.map(col => rowData[col] !== undefined ? rowData[col] : '');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const rowArray = headers.map(col => rowData[col] !== undefined ? rowData[col] : '');
// EXPLAIN: Bu satırın görevi: sheet.appendRow(rowArray);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.appendRow(rowArray);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return sheet.getLastRow();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return sheet.getLastRow();
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Update a specific cell in a sheet. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Update a specific cell in a sheet
// EXPLAIN: Bu satırın görevi: * @param {string} sheetName - Sheet name. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} sheetName - Sheet name
// EXPLAIN: Bu satırın görevi: * @param {number} rowIndex - Row number (1-based). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {number} rowIndex - Row number (1-based)
// EXPLAIN: Bu satırın görevi: * @param {string} columnName - Column name. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} columnName - Column name
// EXPLAIN: Bu satırın görevi: * @param {*} value - New value. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {*} value - New value
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function updateCell_(sheetName, rowIndex, columnName, value) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function updateCell_(sheetName, rowIndex, columnName, value) {
// EXPLAIN: Bu satırın görevi: const sheet = sheet_(sheetName, false);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = sheet_(sheetName, false);
// EXPLAIN: Bu satırın görevi: if (!sheet) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) return;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const colIdx = getColIndex_(sheetName, columnName);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const colIdx = getColIndex_(sheetName, columnName);
// EXPLAIN: Bu satırın görevi: if (colIdx === -1) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (colIdx === -1) return;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: sheet.getRange(rowIndex, colIdx + 1).setValue(value);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  sheet.getRange(rowIndex, colIdx + 1).setValue(value);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Update multiple cells in a row. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Update multiple cells in a row
// EXPLAIN: Bu satırın görevi: * @param {string} sheetName - Sheet name. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} sheetName - Sheet name
// EXPLAIN: Bu satırın görevi: * @param {number} rowIndex - Row number (1-based). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {number} rowIndex - Row number (1-based)
// EXPLAIN: Bu satırın görevi: * @param {Object} updates - Object with column names as keys. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} updates - Object with column names as keys
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function updateRow_(sheetName, rowIndex, updates) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function updateRow_(sheetName, rowIndex, updates) {
// EXPLAIN: Bu satırın görevi: const sheet = sheet_(sheetName, false);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = sheet_(sheetName, false);
// EXPLAIN: Bu satırın görevi: if (!sheet) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!sheet) return;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (const [colName, value] of Object.entries(updates)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const [colName, value] of Object.entries(updates)) {
// EXPLAIN: Bu satırın görevi: const colIdx = getColIndex_(sheetName, colName);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const colIdx = getColIndex_(sheetName, colName);
// EXPLAIN: Bu satırın görevi: if (colIdx !== -1) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (colIdx !== -1) {
// EXPLAIN: Bu satırın görevi: sheet.getRange(rowIndex, colIdx + 1).setValue(value);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      sheet.getRange(rowIndex, colIdx + 1).setValue(value);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
