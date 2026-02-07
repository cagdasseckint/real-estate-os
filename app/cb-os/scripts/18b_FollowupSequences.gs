/**
 * Follow-up sequence scheduling.
 */

/**
 * Schedule follow-up sequence for a deal/contact
 * @param {Object} deal - Deal object
 * @param {Object} contact - Contact object
 */
function scheduleFollowupSequence_(deal, contact) {
  const sequences = getSheetData_(SHEETS.FOLLOWUP_SEQUENCES);
  const matched = sequences.find(seq =>
    seq.enabled !== false &&
    (seq.deal_type === deal.deal_type || seq.deal_type === '*' || !seq.deal_type) &&
    (seq.stage === deal.stage || seq.stage === '*' || !seq.stage)
  );
  
  let steps = [
    { offset_days: 2, action: 'task', template: 'followup_48h' },
    { offset_days: 7, action: 'email', subject: 'Takip', body: 'Merhaba, tekrar iletişime geçiyorum.' },
    { offset_days: 14, action: 'email', subject: 'Takip - 2', body: 'Merhaba, tekrar dönüş rica ederim.' }
  ];
  
  if (matched && matched.steps_json) {
    const parsed = parseJsonSafe_(matched.steps_json);
    if (parsed && Array.isArray(parsed)) steps = parsed;
  }
  
  for (const step of steps) {
    const scheduled = new Date();
    scheduled.setDate(scheduled.getDate() + Number(step.offset_days || 0));
    
    if (step.action === 'task') {
      TasksRepo.createFromTemplate(step.template || 'followup_48h', {
        entity_type: 'DEAL',
        entity_id: deal.deal_id,
        assigned_to: deal.assigned_to || ''
      });
    } else if (step.action === 'email') {
      createEmailDraft_({
        contact_id: contact.contact_id,
        deal_id: deal.deal_id,
        to: contact.email,
        subject: step.subject || 'Takip',
        body: step.body || '',
        scheduled_for: scheduled.toISOString()
      });
    }
    
    EventsRepo.append({
      entity_type: 'DEAL',
      entity_id: deal.deal_id,
      event_type: EventsRepo.EVENT_TYPES.FOLLOWUP_SCHEDULED,
      payload: { step: step, scheduled_for: scheduled.toISOString() },
      source: 'system',
      idempotency_key: deal.deal_id + '_followup_' + scheduled.getTime()
    });
  }
}
