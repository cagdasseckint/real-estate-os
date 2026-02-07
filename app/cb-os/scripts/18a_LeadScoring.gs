/**
 * Lead scoring utilities.
 */

/**
 * Record a lead signal entry for scoring
 * @param {Object} deal - Deal object
 * @param {Object} contact - Contact object
 * @param {string} signalType - Type of signal
 * @param {string} source - Signal source
 * @param {number} weight - Signal weight
 * @param {string} signalValue - Additional value
 */
function recordLeadSignal_(deal, contact, signalType, source, weight, signalValue) {
  const signal = {
    signal_id: id_(),
    lead_id: deal ? deal.deal_id : '',
    contact_id: contact ? contact.contact_id : '',
    deal_id: deal ? deal.deal_id : '',
    signal_type: signalType || '',
    signal_value: signalValue || '',
    weight: weight || 0,
    source: source || '',
    occurred_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
  };
  
  appendRow_(SHEETS.LEAD_SIGNALS, signal);
}

/**
 * Compute lead scores from signals and deal stage
 * @returns {Array<Object>} Lead scores
 */
function computeLeadScores_() {
  const signals = getSheetData_(SHEETS.LEAD_SIGNALS);
  const deals = DealsRepo.getActive();
  const existingScores = getSheetData_(SHEETS.LEAD_SCORES);
  const scoreMap = {};
  
  for (const deal of deals) {
    scoreMap[deal.deal_id] = {
      lead_id: deal.deal_id,
      contact_id: deal.contact_id,
      deal_id: deal.deal_id,
      score: 0,
      breakdown: []
    };
  }
  
  for (const signal of signals) {
    const entry = scoreMap[signal.deal_id];
    if (!entry) continue;
    entry.score += Number(signal.weight || 0);
    entry.breakdown.push(signal.signal_type + ':' + signal.weight);
  }
  
  for (const deal of deals) {
    const entry = scoreMap[deal.deal_id];
    if (!entry) continue;
    const stageBoost = deal.stage === 'NEW' ? 20 : deal.stage === 'QUALIFIED' ? 15 : 5;
    entry.score += stageBoost;
    entry.breakdown.push('stage:' + stageBoost);
  }
  
  const results = Object.values(scoreMap);
  for (const entry of results) {
    const existing = existingScores.find(row => row.lead_id === entry.lead_id);
    const updates = {
      lead_id: entry.lead_id,
      contact_id: entry.contact_id,
      deal_id: entry.deal_id,
      score: entry.score,
      score_breakdown: entry.breakdown.join('|'),
      updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
    };
    
    if (existing) {
      updateRow_(SHEETS.LEAD_SCORES, existing._rowIndex, updates);
    } else {
      appendRow_(SHEETS.LEAD_SCORES, updates);
    }
  }
  
  return results;
}

/**
 * Create top follow-up tasks based on lead scores
 * @param {Array<Object>} scores - Lead scores
 */
function createTopFollowupTasks_(scores) {
  const topN = cfg_('LEAD_SCORE_TOP_N', DEFAULTS.LEAD_SCORE_TOP_N);
  const minScore = cfg_('LEAD_SCORE_MIN_THRESHOLD', DEFAULTS.LEAD_SCORE_MIN_THRESHOLD);
  const sorted = scores
    .filter(entry => entry.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
  
  const existing = TasksRepo.getPending().filter(task => task.title.indexOf('Top Lead Follow-up') === 0);
  
  for (const entry of sorted) {
    const alreadyExists = existing.some(task => task.entity_id === entry.deal_id);
    if (alreadyExists) continue;
    
    TasksRepo.create({
      entity_type: 'DEAL',
      entity_id: entry.deal_id,
      title: 'Top Lead Follow-up',
      description: 'Skor: ' + entry.score,
      priority: 'high',
      status: 'pending',
      due_date: new Date().toISOString().split('T')[0]
    });
  }
}
