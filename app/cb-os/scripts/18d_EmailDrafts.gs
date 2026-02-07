/**
 * Gmail draft queue helpers.
 */

/**
 * Create Gmail draft record (and optionally Gmail draft)
 * @param {Object} data - Draft data
 * @returns {Object} Draft record
 */
function createEmailDraft_(data) {
  const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
  let taskId = data.task_id || '';
  
  if (!taskId) {
    const task = TasksRepo.create({
      entity_type: 'DEAL',
      entity_id: data.deal_id || '',
      title: 'Review & Send Draft',
      description: data.subject || 'Email draft review',
      priority: 'medium',
      status: 'pending',
      due_date: data.scheduled_for ? new Date(data.scheduled_for).toISOString().split('T')[0] : ''
    });
    taskId = task ? task.task_id : '';
  }
  
  const draft = {
    draft_id: id_(),
    created_at: now,
    updated_at: now,
    contact_id: data.contact_id || '',
    deal_id: data.deal_id || '',
    to: data.to || '',
    subject: data.subject || '',
    body: data.body || '',
    status: 'queued',
    gmail_draft_id: '',
    task_id: taskId,
    scheduled_for: data.scheduled_for || now
  };
  
  const rowNum = appendRow_(SHEETS.EMAIL_DRAFTS, draft);
  draft._rowIndex = rowNum;
  
  return draft;
}

/**
 * Process queued email drafts and create Gmail drafts
 * @returns {Object} result
 */
function processEmailDraftQueue_() {
  const result = { drafted: 0, skipped: 0, errors: 0 };
  if (!cfg_('EMAIL_DRAFTS_ENABLED', DEFAULTS.EMAIL_DRAFTS_ENABLED)) return result;
  
  const drafts = getSheetData_(SHEETS.EMAIL_DRAFTS);
  const now = new Date();
  
  for (const draft of drafts) {
    if (draft.status !== 'queued') continue;
    if (draft.scheduled_for && new Date(draft.scheduled_for) > now) {
      result.skipped++;
      continue;
    }
    
    try {
      const gmailDraft = GmailApp.createDraft(draft.to, draft.subject, draft.body);
      updateRow_(SHEETS.EMAIL_DRAFTS, draft._rowIndex, {
        status: 'drafted',
        gmail_draft_id: gmailDraft.getId(),
        updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
      });
      result.drafted++;
    } catch (e) {
      updateRow_(SHEETS.EMAIL_DRAFTS, draft._rowIndex, {
        status: 'error',
        updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
      });
      result.errors++;
    }
  }
  
  return result;
}
