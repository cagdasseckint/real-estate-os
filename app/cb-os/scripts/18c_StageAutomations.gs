/**
 * Stage automation rules.
 */

/**
 * Apply stage automations when deal stage changes
 * @param {Object} deal - Deal object
 * @param {string} oldStage - Previous stage
 * @param {string} newStage - New stage
 */
function applyStageAutomations_(deal, oldStage, newStage) {
  const automations = getSheetData_(SHEETS.STAGE_AUTOMATIONS);
  const contact = ContactsRepo.findById(deal.contact_id);
  
  for (const rule of automations) {
    const matchType = !rule.deal_type || rule.deal_type === '*' || rule.deal_type === deal.deal_type;
    const matchFrom = !rule.from_stage || rule.from_stage === '*' || rule.from_stage === oldStage;
    const matchTo = !rule.to_stage || rule.to_stage === '*' || rule.to_stage === newStage;
    
    if (!matchType || !matchFrom || !matchTo) continue;
    
    const actionType = rule.action_type;
    const config = parseJsonSafe_(rule.action_config) || {};
    
    if (actionType === 'TASK_TEMPLATE') {
      const templates = config.templates || [rule.task_template_id].filter(Boolean);
      for (const templateId of templates) {
        TasksRepo.createFromTemplate(templateId, {
          entity_type: 'DEAL',
          entity_id: deal.deal_id,
          assigned_to: deal.assigned_to || ''
        });
      }
    } else if (actionType === 'EMAIL_DRAFT') {
      createEmailDraft_({
        contact_id: deal.contact_id,
        deal_id: deal.deal_id,
        to: contact ? contact.email : '',
        subject: config.subject || 'Takip',
        body: config.body || '',
        scheduled_for: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
      });
    } else if (actionType === 'FOLLOWUP_SEQUENCE') {
      if (contact) scheduleFollowupSequence_(deal, contact);
    } else if (actionType === 'DOC_TEMPLATE') {
      generateDocFromTemplate_(config.template_id, deal, config.output_folder_id);
    } else if (actionType === 'CLOSE_CHECKLIST') {
      TasksRepo.createFromTemplate('close_checklist', {
        entity_type: 'DEAL',
        entity_id: deal.deal_id,
        assigned_to: deal.assigned_to || ''
      });
    } else if (actionType === 'WINBACK_SEQUENCE') {
      if (contact) scheduleWinbackSequence_(deal, contact);
    }
  }
  
  if (cfg_('CLOSE_CHECKLIST_ENABLED', DEFAULTS.CLOSE_CHECKLIST_ENABLED) &&
      (newStage === 'CONTRACT' || newStage === 'CLOSED_WON')) {
    TasksRepo.createFromTemplate('close_checklist', {
      entity_type: 'DEAL',
      entity_id: deal.deal_id,
      assigned_to: deal.assigned_to || ''
    });
  }
  
  if (cfg_('WINBACK_ENABLED', DEFAULTS.WINBACK_ENABLED) && newStage === 'CLOSED_LOST' && contact) {
    scheduleWinbackSequence_(deal, contact);
  }
}

/**
 * Get SLA days for a stage from STAGE_AUTOMATIONS
 * @param {string} dealType - Deal type
 * @param {string} stage - Stage name
 * @returns {number|null} SLA days
 */
function getStageSlaDays_(dealType, stage) {
  const automations = getSheetData_(SHEETS.STAGE_AUTOMATIONS);
  const match = automations.find(rule =>
    rule.deal_type === dealType &&
    (rule.to_stage === stage || rule.from_stage === stage) &&
    rule.sla_days
  );
  return match ? Number(match.sla_days) : null;
}
