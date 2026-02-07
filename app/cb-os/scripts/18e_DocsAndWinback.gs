/**
 * Docs packages and win-back sequences.
 */

/**
 * Create Docs package for deal based on DOC_PACKAGES
 * @param {Object} deal - Deal data
 * @returns {Object|null} Package info
 */
function createDocsPackageForDeal_(deal) {
  const packages = getSheetData_(SHEETS.DOC_PACKAGES);
  const match = packages.find(row => row.deal_type === deal.deal_type);
  if (!match || !match.template_folder_id) return null;
  
  try {
    const templateFolder = DriveApp.getFolderById(match.template_folder_id);
    const packageName = match.package_name || ('Deal_' + deal.deal_id);
    const targetFolder = DriveApp.createFolder(packageName);
    const files = templateFolder.getFiles();
    
    while (files.hasNext()) {
      const file = files.next();
      file.makeCopy(file.getName(), targetFolder);
    }
    
    const url = targetFolder.getUrl();
    
    appendRow_(SHEETS.DOCS, {
      doc_id: id_(),
      created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
      entity_type: 'DEAL',
      entity_id: deal.deal_id,
      doc_type: 'PACKAGE',
      doc_url: url,
      status: 'created',
      signed_at: '',
      notes: 'Auto package'
    });
    
    return { folder_id: targetFolder.getId(), url: url };
  } catch (e) {
    Logger.log('DOC_PACKAGE | Error: ' + e.message);
    return null;
  }
}

/**
 * Generate Doc from template with placeholders
 * @param {string} templateId - Template doc ID
 * @param {Object} data - Data map
 * @param {string} outputFolderId - Output folder ID
 * @returns {Object|null} Doc info
 */
function generateDocFromTemplate_(templateId, data, outputFolderId) {
  if (!templateId) return null;
  
  const outputFolder = outputFolderId
    ? DriveApp.getFolderById(outputFolderId)
    : (cfg_('DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID)
        ? DriveApp.getFolderById(cfg_('DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID))
        : DriveApp.getRootFolder());
  
  const templateFile = DriveApp.getFileById(templateId);
  const copy = templateFile.makeCopy(templateFile.getName() + ' - ' + data.deal_id, outputFolder);
  const doc = DocumentApp.openById(copy.getId());
  const body = doc.getBody();
  
  for (const [key, value] of Object.entries(data || {})) {
    body.replaceText('{{' + key + '}}', String(value || ''));
  }
  
  doc.saveAndClose();
  
  appendRow_(SHEETS.DOCS, {
    doc_id: id_(),
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
    entity_type: 'DEAL',
    entity_id: data.deal_id || '',
    doc_type: 'TEMPLATE_OUTPUT',
    doc_url: copy.getUrl(),
    status: 'generated',
    signed_at: '',
    notes: 'Template output'
  });
  
  return { doc_id: copy.getId(), url: copy.getUrl() };
}

/**
 * Schedule win-back sequence for lost deals (30/60/90 days)
 * @param {Object} deal - Deal object
 * @param {Object} contact - Contact object
 */
function scheduleWinbackSequence_(deal, contact) {
  const offsets = [30, 60, 90];
  for (const days of offsets) {
    const scheduled = new Date();
    scheduled.setDate(scheduled.getDate() + days);
    createEmailDraft_({
      contact_id: contact.contact_id,
      deal_id: deal.deal_id,
      to: contact.email,
      subject: 'Tekrar görüşelim',
      body: 'Merhaba, ilerlemek isterseniz destek olmaya hazırız.',
      scheduled_for: scheduled.toISOString()
    });
    
    TasksRepo.create({
      entity_type: 'DEAL',
      entity_id: deal.deal_id,
      title: 'Win-back takip (' + days + 'g)',
      description: 'CLOSED_LOST win-back follow-up',
      priority: 'medium',
      status: 'pending',
      due_date: scheduled.toISOString().split('T')[0]
    });
    
    EventsRepo.append({
      entity_type: 'DEAL',
      entity_id: deal.deal_id,
      event_type: EventsRepo.EVENT_TYPES.WINBACK_SCHEDULED,
      payload: { days: days, scheduled_for: scheduled.toISOString() },
      source: 'system',
      idempotency_key: deal.deal_id + '_winback_' + days
    });
  }
}
