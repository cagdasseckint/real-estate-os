// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS V1.0 - 18_Automations.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS V1.0 - 18_Automations.gs
// EXPLAIN: Bu satırın görevi: * Lead scoring, stage automations, follow-up sequences, docs packages,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Lead scoring, stage automations, follow-up sequences, docs packages,
// EXPLAIN: Bu satırın görevi: * email drafts, ops dashboards, and weekly KPI reporting.. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * email drafts, ops dashboards, and weekly KPI reporting.
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Record a lead signal entry for scoring. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Record a lead signal entry for scoring
// EXPLAIN: Bu satırın görevi: * @param {Object} deal - Deal object. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} deal - Deal object
// EXPLAIN: Bu satırın görevi: * @param {Object} contact - Contact object. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} contact - Contact object
// EXPLAIN: Bu satırın görevi: * @param {string} signalType - Type of signal. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} signalType - Type of signal
// EXPLAIN: Bu satırın görevi: * @param {string} source - Signal source. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} source - Signal source
// EXPLAIN: Bu satırın görevi: * @param {number} weight - Signal weight. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {number} weight - Signal weight
// EXPLAIN: Bu satırın görevi: * @param {string} signalValue - Additional value. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} signalValue - Additional value
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function recordLeadSignal_(deal, contact, signalType, source, weight, signalValue) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function recordLeadSignal_(deal, contact, signalType, source, weight, signalValue) {
// EXPLAIN: Bu satırın görevi: const signal = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const signal = {
// EXPLAIN: Bu satırın görevi: signal_id: id_(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    signal_id: id_(),
// EXPLAIN: Bu satırın görevi: lead_id: deal ? deal.deal_id : '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    lead_id: deal ? deal.deal_id : '',
// EXPLAIN: Bu satırın görevi: contact_id: contact ? contact.contact_id : '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    contact_id: contact ? contact.contact_id : '',
// EXPLAIN: Bu satırın görevi: deal_id: deal ? deal.deal_id : '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    deal_id: deal ? deal.deal_id : '',
// EXPLAIN: Bu satırın görevi: signal_type: signalType || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    signal_type: signalType || '',
// EXPLAIN: Bu satırın görevi: signal_value: signalValue || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    signal_value: signalValue || '',
// EXPLAIN: Bu satırın görevi: weight: weight || 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    weight: weight || 0,
// EXPLAIN: Bu satırın görevi: source: source || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    source: source || '',
// EXPLAIN: Bu satırın görevi: occurred_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    occurred_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: appendRow_(SHEETS.LEAD_SIGNALS, signal);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  appendRow_(SHEETS.LEAD_SIGNALS, signal);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Compute lead scores from signals and deal stage. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Compute lead scores from signals and deal stage
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Lead scores. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Array<Object>} Lead scores
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function computeLeadScores_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function computeLeadScores_() {
// EXPLAIN: Bu satırın görevi: const signals = getSheetData_(SHEETS.LEAD_SIGNALS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const signals = getSheetData_(SHEETS.LEAD_SIGNALS);
// EXPLAIN: Bu satırın görevi: const deals = DealsRepo.getActive();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const deals = DealsRepo.getActive();
// EXPLAIN: Bu satırın görevi: const existingScores = getSheetData_(SHEETS.LEAD_SCORES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const existingScores = getSheetData_(SHEETS.LEAD_SCORES);
// EXPLAIN: Bu satırın görevi: const scoreMap = {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const scoreMap = {};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (const deal of deals) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const deal of deals) {
// EXPLAIN: Bu satırın görevi: scoreMap[deal.deal_id] = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    scoreMap[deal.deal_id] = {
// EXPLAIN: Bu satırın görevi: lead_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      lead_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: contact_id: deal.contact_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      contact_id: deal.contact_id,
// EXPLAIN: Bu satırın görevi: deal_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      deal_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: score: 0,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      score: 0,
// EXPLAIN: Bu satırın görevi: breakdown: []. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      breakdown: []
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (const signal of signals) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const signal of signals) {
// EXPLAIN: Bu satırın görevi: const entry = scoreMap[signal.deal_id];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const entry = scoreMap[signal.deal_id];
// EXPLAIN: Bu satırın görevi: if (!entry) continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!entry) continue;
// EXPLAIN: Bu satırın görevi: entry.score += Number(signal.weight || 0);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entry.score += Number(signal.weight || 0);
// EXPLAIN: Bu satırın görevi: entry.breakdown.push(signal.signal_type + ':' + signal.weight);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entry.breakdown.push(signal.signal_type + ':' + signal.weight);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (const deal of deals) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const deal of deals) {
// EXPLAIN: Bu satırın görevi: const entry = scoreMap[deal.deal_id];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const entry = scoreMap[deal.deal_id];
// EXPLAIN: Bu satırın görevi: if (!entry) continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!entry) continue;
// EXPLAIN: Bu satırın görevi: const stageBoost = deal.stage === 'NEW' ? 20 : deal.stage === 'QUALIFIED' ? 15 : 5;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const stageBoost = deal.stage === 'NEW' ? 20 : deal.stage === 'QUALIFIED' ? 15 : 5;
// EXPLAIN: Bu satırın görevi: entry.score += stageBoost;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entry.score += stageBoost;
// EXPLAIN: Bu satırın görevi: entry.breakdown.push('stage:' + stageBoost);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entry.breakdown.push('stage:' + stageBoost);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const results = Object.values(scoreMap);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const results = Object.values(scoreMap);
// EXPLAIN: Bu satırın görevi: for (const entry of results) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const entry of results) {
// EXPLAIN: Bu satırın görevi: const existing = existingScores.find(row => row.lead_id === entry.lead_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const existing = existingScores.find(row => row.lead_id === entry.lead_id);
// EXPLAIN: Bu satırın görevi: const updates = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const updates = {
// EXPLAIN: Bu satırın görevi: lead_id: entry.lead_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      lead_id: entry.lead_id,
// EXPLAIN: Bu satırın görevi: contact_id: entry.contact_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      contact_id: entry.contact_id,
// EXPLAIN: Bu satırın görevi: deal_id: entry.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      deal_id: entry.deal_id,
// EXPLAIN: Bu satırın görevi: score: entry.score,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      score: entry.score,
// EXPLAIN: Bu satırın görevi: score_breakdown: entry.breakdown.join('|'),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      score_breakdown: entry.breakdown.join('|'),
// EXPLAIN: Bu satırın görevi: updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: if (existing) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (existing) {
// EXPLAIN: Bu satırın görevi: updateRow_(SHEETS.LEAD_SCORES, existing._rowIndex, updates);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      updateRow_(SHEETS.LEAD_SCORES, existing._rowIndex, updates);
// EXPLAIN: Bu satırın görevi: } else {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else {
// EXPLAIN: Bu satırın görevi: appendRow_(SHEETS.LEAD_SCORES, updates);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      appendRow_(SHEETS.LEAD_SCORES, updates);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return results;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return results;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Create top follow-up tasks based on lead scores. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Create top follow-up tasks based on lead scores
// EXPLAIN: Bu satırın görevi: * @param {Array<Object>} scores - Lead scores. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Array<Object>} scores - Lead scores
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function createTopFollowupTasks_(scores) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function createTopFollowupTasks_(scores) {
// EXPLAIN: Bu satırın görevi: const topN = cfg_('LEAD_SCORE_TOP_N', DEFAULTS.LEAD_SCORE_TOP_N);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const topN = cfg_('LEAD_SCORE_TOP_N', DEFAULTS.LEAD_SCORE_TOP_N);
// EXPLAIN: Bu satırın görevi: const minScore = cfg_('LEAD_SCORE_MIN_THRESHOLD', DEFAULTS.LEAD_SCORE_MIN_THRESHOLD);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const minScore = cfg_('LEAD_SCORE_MIN_THRESHOLD', DEFAULTS.LEAD_SCORE_MIN_THRESHOLD);
// EXPLAIN: Bu satırın görevi: const sorted = scores. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sorted = scores
// EXPLAIN: Bu satırın görevi: .filter(entry => entry.score >= minScore). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    .filter(entry => entry.score >= minScore)
// EXPLAIN: Bu satırın görevi: .sort((a, b) => b.score - a.score). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    .sort((a, b) => b.score - a.score)
// EXPLAIN: Bu satırın görevi: .slice(0, topN);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    .slice(0, topN);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const existing = TasksRepo.getPending().filter(task => task.title.indexOf('Top Lead Follow-up') === 0);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const existing = TasksRepo.getPending().filter(task => task.title.indexOf('Top Lead Follow-up') === 0);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (const entry of sorted) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const entry of sorted) {
// EXPLAIN: Bu satırın görevi: const alreadyExists = existing.some(task => task.entity_id === entry.deal_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const alreadyExists = existing.some(task => task.entity_id === entry.deal_id);
// EXPLAIN: Bu satırın görevi: if (alreadyExists) continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (alreadyExists) continue;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: TasksRepo.create({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    TasksRepo.create({
// EXPLAIN: Bu satırın görevi: entity_type: 'DEAL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_type: 'DEAL',
// EXPLAIN: Bu satırın görevi: entity_id: entry.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_id: entry.deal_id,
// EXPLAIN: Bu satırın görevi: title: 'Top Lead Follow-up',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      title: 'Top Lead Follow-up',
// EXPLAIN: Bu satırın görevi: description: 'Skor: ' + entry.score,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      description: 'Skor: ' + entry.score,
// EXPLAIN: Bu satırın görevi: priority: 'high',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      priority: 'high',
// EXPLAIN: Bu satırın görevi: status: 'pending',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      status: 'pending',
// EXPLAIN: Bu satırın görevi: due_date: new Date().toISOString().split('T')[0]. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      due_date: new Date().toISOString().split('T')[0]
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Schedule follow-up sequence for a deal/contact. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Schedule follow-up sequence for a deal/contact
// EXPLAIN: Bu satırın görevi: * @param {Object} deal - Deal object. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} deal - Deal object
// EXPLAIN: Bu satırın görevi: * @param {Object} contact - Contact object. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} contact - Contact object
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function scheduleFollowupSequence_(deal, contact) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function scheduleFollowupSequence_(deal, contact) {
// EXPLAIN: Bu satırın görevi: const sequences = getSheetData_(SHEETS.FOLLOWUP_SEQUENCES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sequences = getSheetData_(SHEETS.FOLLOWUP_SEQUENCES);
// EXPLAIN: Bu satırın görevi: const matched = sequences.find(seq =>. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const matched = sequences.find(seq =>
// EXPLAIN: Bu satırın görevi: seq.enabled !== false &&. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    seq.enabled !== false &&
// EXPLAIN: Bu satırın görevi: (seq.deal_type === deal.deal_type || seq.deal_type === '*' || !seq.deal_type) &&. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    (seq.deal_type === deal.deal_type || seq.deal_type === '*' || !seq.deal_type) &&
// EXPLAIN: Bu satırın görevi: (seq.stage === deal.stage || seq.stage === '*' || !seq.stage). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    (seq.stage === deal.stage || seq.stage === '*' || !seq.stage)
// EXPLAIN: Bu satırın görevi: );. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  );
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: let steps = [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let steps = [
// EXPLAIN: Bu satırın görevi: { offset_days: 2, action: 'task', template: 'followup_48h' },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    { offset_days: 2, action: 'task', template: 'followup_48h' },
// EXPLAIN: Bu satırın görevi: { offset_days: 7, action: 'email', subject: 'Takip', body: 'Merhaba, tekrar iletişime geçiyorum.' },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    { offset_days: 7, action: 'email', subject: 'Takip', body: 'Merhaba, tekrar iletişime geçiyorum.' },
// EXPLAIN: Bu satırın görevi: { offset_days: 14, action: 'email', subject: 'Takip - 2', body: 'Merhaba, tekrar dönüş rica ederim.' }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    { offset_days: 14, action: 'email', subject: 'Takip - 2', body: 'Merhaba, tekrar dönüş rica ederim.' }
// EXPLAIN: Bu satırın görevi: ];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ];
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (matched && matched.steps_json) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (matched && matched.steps_json) {
// EXPLAIN: Bu satırın görevi: const parsed = parseJsonSafe_(matched.steps_json);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const parsed = parseJsonSafe_(matched.steps_json);
// EXPLAIN: Bu satırın görevi: if (parsed && Array.isArray(parsed)) steps = parsed;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (parsed && Array.isArray(parsed)) steps = parsed;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (const step of steps) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const step of steps) {
// EXPLAIN: Bu satırın görevi: const scheduled = new Date();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const scheduled = new Date();
// EXPLAIN: Bu satırın görevi: scheduled.setDate(scheduled.getDate() + Number(step.offset_days || 0));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    scheduled.setDate(scheduled.getDate() + Number(step.offset_days || 0));
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: if (step.action === 'task') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (step.action === 'task') {
// EXPLAIN: Bu satırın görevi: TasksRepo.createFromTemplate(step.template || 'followup_48h', {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      TasksRepo.createFromTemplate(step.template || 'followup_48h', {
// EXPLAIN: Bu satırın görevi: entity_type: 'DEAL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        entity_type: 'DEAL',
// EXPLAIN: Bu satırın görevi: entity_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        entity_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: assigned_to: deal.assigned_to || ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        assigned_to: deal.assigned_to || ''
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      });
// EXPLAIN: Bu satırın görevi: } else if (step.action === 'email') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else if (step.action === 'email') {
// EXPLAIN: Bu satırın görevi: createEmailDraft_({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      createEmailDraft_({
// EXPLAIN: Bu satırın görevi: contact_id: contact.contact_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        contact_id: contact.contact_id,
// EXPLAIN: Bu satırın görevi: deal_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        deal_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: to: contact.email,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        to: contact.email,
// EXPLAIN: Bu satırın görevi: subject: step.subject || 'Takip',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        subject: step.subject || 'Takip',
// EXPLAIN: Bu satırın görevi: body: step.body || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        body: step.body || '',
// EXPLAIN: Bu satırın görevi: scheduled_for: scheduled.toISOString(). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        scheduled_for: scheduled.toISOString()
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: EventsRepo.append({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    EventsRepo.append({
// EXPLAIN: Bu satırın görevi: entity_type: 'DEAL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_type: 'DEAL',
// EXPLAIN: Bu satırın görevi: entity_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: event_type: EventsRepo.EVENT_TYPES.FOLLOWUP_SCHEDULED,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      event_type: EventsRepo.EVENT_TYPES.FOLLOWUP_SCHEDULED,
// EXPLAIN: Bu satırın görevi: payload: { step: step, scheduled_for: scheduled.toISOString() },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      payload: { step: step, scheduled_for: scheduled.toISOString() },
// EXPLAIN: Bu satırın görevi: source: 'system',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source: 'system',
// EXPLAIN: Bu satırın görevi: idempotency_key: deal.deal_id + '_followup_' + scheduled.getTime(). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      idempotency_key: deal.deal_id + '_followup_' + scheduled.getTime()
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Apply stage automations when deal stage changes. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Apply stage automations when deal stage changes
// EXPLAIN: Bu satırın görevi: * @param {Object} deal - Deal object. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} deal - Deal object
// EXPLAIN: Bu satırın görevi: * @param {string} oldStage - Previous stage. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} oldStage - Previous stage
// EXPLAIN: Bu satırın görevi: * @param {string} newStage - New stage. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} newStage - New stage
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function applyStageAutomations_(deal, oldStage, newStage) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function applyStageAutomations_(deal, oldStage, newStage) {
// EXPLAIN: Bu satırın görevi: const automations = getSheetData_(SHEETS.STAGE_AUTOMATIONS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const automations = getSheetData_(SHEETS.STAGE_AUTOMATIONS);
// EXPLAIN: Bu satırın görevi: const contact = ContactsRepo.findById(deal.contact_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const contact = ContactsRepo.findById(deal.contact_id);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (const rule of automations) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const rule of automations) {
// EXPLAIN: Bu satırın görevi: const matchType = !rule.deal_type || rule.deal_type === '*' || rule.deal_type === deal.deal_type;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const matchType = !rule.deal_type || rule.deal_type === '*' || rule.deal_type === deal.deal_type;
// EXPLAIN: Bu satırın görevi: const matchFrom = !rule.from_stage || rule.from_stage === '*' || rule.from_stage === oldStage;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const matchFrom = !rule.from_stage || rule.from_stage === '*' || rule.from_stage === oldStage;
// EXPLAIN: Bu satırın görevi: const matchTo = !rule.to_stage || rule.to_stage === '*' || rule.to_stage === newStage;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const matchTo = !rule.to_stage || rule.to_stage === '*' || rule.to_stage === newStage;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: if (!matchType || !matchFrom || !matchTo) continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!matchType || !matchFrom || !matchTo) continue;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const actionType = rule.action_type;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const actionType = rule.action_type;
// EXPLAIN: Bu satırın görevi: const config = parseJsonSafe_(rule.action_config) || {};. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const config = parseJsonSafe_(rule.action_config) || {};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: if (actionType === 'TASK_TEMPLATE') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (actionType === 'TASK_TEMPLATE') {
// EXPLAIN: Bu satırın görevi: const templates = config.templates || [rule.task_template_id].filter(Boolean);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const templates = config.templates || [rule.task_template_id].filter(Boolean);
// EXPLAIN: Bu satırın görevi: for (const templateId of templates) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      for (const templateId of templates) {
// EXPLAIN: Bu satırın görevi: TasksRepo.createFromTemplate(templateId, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        TasksRepo.createFromTemplate(templateId, {
// EXPLAIN: Bu satırın görevi: entity_type: 'DEAL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          entity_type: 'DEAL',
// EXPLAIN: Bu satırın görevi: entity_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          entity_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: assigned_to: deal.assigned_to || ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
          assigned_to: deal.assigned_to || ''
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      }
// EXPLAIN: Bu satırın görevi: } else if (actionType === 'EMAIL_DRAFT') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else if (actionType === 'EMAIL_DRAFT') {
// EXPLAIN: Bu satırın görevi: createEmailDraft_({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      createEmailDraft_({
// EXPLAIN: Bu satırın görevi: contact_id: deal.contact_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        contact_id: deal.contact_id,
// EXPLAIN: Bu satırın görevi: deal_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        deal_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: to: contact ? contact.email : '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        to: contact ? contact.email : '',
// EXPLAIN: Bu satırın görevi: subject: config.subject || 'Takip',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        subject: config.subject || 'Takip',
// EXPLAIN: Bu satırın görevi: body: config.body || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        body: config.body || '',
// EXPLAIN: Bu satırın görevi: scheduled_for: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        scheduled_for: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      });
// EXPLAIN: Bu satırın görevi: } else if (actionType === 'FOLLOWUP_SEQUENCE') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else if (actionType === 'FOLLOWUP_SEQUENCE') {
// EXPLAIN: Bu satırın görevi: if (contact) scheduleFollowupSequence_(deal, contact);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (contact) scheduleFollowupSequence_(deal, contact);
// EXPLAIN: Bu satırın görevi: } else if (actionType === 'DOC_TEMPLATE') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else if (actionType === 'DOC_TEMPLATE') {
// EXPLAIN: Bu satırın görevi: generateDocFromTemplate_(config.template_id, deal, config.output_folder_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      generateDocFromTemplate_(config.template_id, deal, config.output_folder_id);
// EXPLAIN: Bu satırın görevi: } else if (actionType === 'CLOSE_CHECKLIST') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else if (actionType === 'CLOSE_CHECKLIST') {
// EXPLAIN: Bu satırın görevi: TasksRepo.createFromTemplate('close_checklist', {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      TasksRepo.createFromTemplate('close_checklist', {
// EXPLAIN: Bu satırın görevi: entity_type: 'DEAL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        entity_type: 'DEAL',
// EXPLAIN: Bu satırın görevi: entity_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        entity_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: assigned_to: deal.assigned_to || ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        assigned_to: deal.assigned_to || ''
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      });
// EXPLAIN: Bu satırın görevi: } else if (actionType === 'WINBACK_SEQUENCE') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else if (actionType === 'WINBACK_SEQUENCE') {
// EXPLAIN: Bu satırın görevi: if (contact) scheduleWinbackSequence_(deal, contact);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (contact) scheduleWinbackSequence_(deal, contact);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (cfg_('CLOSE_CHECKLIST_ENABLED', DEFAULTS.CLOSE_CHECKLIST_ENABLED) &&. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (cfg_('CLOSE_CHECKLIST_ENABLED', DEFAULTS.CLOSE_CHECKLIST_ENABLED) &&
// EXPLAIN: Bu satırın görevi: (newStage === 'CONTRACT' || newStage === 'CLOSED_WON')) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      (newStage === 'CONTRACT' || newStage === 'CLOSED_WON')) {
// EXPLAIN: Bu satırın görevi: TasksRepo.createFromTemplate('close_checklist', {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    TasksRepo.createFromTemplate('close_checklist', {
// EXPLAIN: Bu satırın görevi: entity_type: 'DEAL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_type: 'DEAL',
// EXPLAIN: Bu satırın görevi: entity_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: assigned_to: deal.assigned_to || ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      assigned_to: deal.assigned_to || ''
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (cfg_('WINBACK_ENABLED', DEFAULTS.WINBACK_ENABLED) && newStage === 'CLOSED_LOST' && contact) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (cfg_('WINBACK_ENABLED', DEFAULTS.WINBACK_ENABLED) && newStage === 'CLOSED_LOST' && contact) {
// EXPLAIN: Bu satırın görevi: scheduleWinbackSequence_(deal, contact);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    scheduleWinbackSequence_(deal, contact);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Get SLA days for a stage from STAGE_AUTOMATIONS. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Get SLA days for a stage from STAGE_AUTOMATIONS
// EXPLAIN: Bu satırın görevi: * @param {string} dealType - Deal type. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} dealType - Deal type
// EXPLAIN: Bu satırın görevi: * @param {string} stage - Stage name. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} stage - Stage name
// EXPLAIN: Bu satırın görevi: * @returns {number|null} SLA days. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {number|null} SLA days
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function getStageSlaDays_(dealType, stage) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function getStageSlaDays_(dealType, stage) {
// EXPLAIN: Bu satırın görevi: const automations = getSheetData_(SHEETS.STAGE_AUTOMATIONS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const automations = getSheetData_(SHEETS.STAGE_AUTOMATIONS);
// EXPLAIN: Bu satırın görevi: const match = automations.find(rule =>. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const match = automations.find(rule =>
// EXPLAIN: Bu satırın görevi: rule.deal_type === dealType &&. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    rule.deal_type === dealType &&
// EXPLAIN: Bu satırın görevi: (rule.to_stage === stage || rule.from_stage === stage) &&. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    (rule.to_stage === stage || rule.from_stage === stage) &&
// EXPLAIN: Bu satırın görevi: rule.sla_days. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    rule.sla_days
// EXPLAIN: Bu satırın görevi: );. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  );
// EXPLAIN: Bu satırın görevi: return match ? Number(match.sla_days) : null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return match ? Number(match.sla_days) : null;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Create Gmail draft record (and optionally Gmail draft). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Create Gmail draft record (and optionally Gmail draft)
// EXPLAIN: Bu satırın görevi: * @param {Object} data - Draft data. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} data - Draft data
// EXPLAIN: Bu satırın görevi: * @returns {Object} Draft record. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Draft record
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function createEmailDraft_(data) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function createEmailDraft_(data) {
// EXPLAIN: Bu satırın görevi: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satırın görevi: let taskId = data.task_id || '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let taskId = data.task_id || '';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: if (!taskId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!taskId) {
// EXPLAIN: Bu satırın görevi: const task = TasksRepo.create({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const task = TasksRepo.create({
// EXPLAIN: Bu satırın görevi: entity_type: 'DEAL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_type: 'DEAL',
// EXPLAIN: Bu satırın görevi: entity_id: data.deal_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_id: data.deal_id || '',
// EXPLAIN: Bu satırın görevi: title: 'Review & Send Draft',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      title: 'Review & Send Draft',
// EXPLAIN: Bu satırın görevi: description: data.subject || 'Email draft review',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      description: data.subject || 'Email draft review',
// EXPLAIN: Bu satırın görevi: priority: 'medium',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      priority: 'medium',
// EXPLAIN: Bu satırın görevi: status: 'pending',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      status: 'pending',
// EXPLAIN: Bu satırın görevi: due_date: data.scheduled_for ? new Date(data.scheduled_for).toISOString().split('T')[0] : ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      due_date: data.scheduled_for ? new Date(data.scheduled_for).toISOString().split('T')[0] : ''
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: taskId = task ? task.task_id : '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    taskId = task ? task.task_id : '';
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const draft = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const draft = {
// EXPLAIN: Bu satırın görevi: draft_id: id_(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    draft_id: id_(),
// EXPLAIN: Bu satırın görevi: created_at: now,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    created_at: now,
// EXPLAIN: Bu satırın görevi: updated_at: now,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    updated_at: now,
// EXPLAIN: Bu satırın görevi: contact_id: data.contact_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    contact_id: data.contact_id || '',
// EXPLAIN: Bu satırın görevi: deal_id: data.deal_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    deal_id: data.deal_id || '',
// EXPLAIN: Bu satırın görevi: to: data.to || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    to: data.to || '',
// EXPLAIN: Bu satırın görevi: subject: data.subject || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    subject: data.subject || '',
// EXPLAIN: Bu satırın görevi: body: data.body || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    body: data.body || '',
// EXPLAIN: Bu satırın görevi: status: 'queued',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    status: 'queued',
// EXPLAIN: Bu satırın görevi: gmail_draft_id: '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    gmail_draft_id: '',
// EXPLAIN: Bu satırın görevi: task_id: taskId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    task_id: taskId,
// EXPLAIN: Bu satırın görevi: scheduled_for: data.scheduled_for || now. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    scheduled_for: data.scheduled_for || now
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const rowNum = appendRow_(SHEETS.EMAIL_DRAFTS, draft);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const rowNum = appendRow_(SHEETS.EMAIL_DRAFTS, draft);
// EXPLAIN: Bu satırın görevi: draft._rowIndex = rowNum;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  draft._rowIndex = rowNum;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return draft;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return draft;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Process queued email drafts and create Gmail drafts. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Process queued email drafts and create Gmail drafts
// EXPLAIN: Bu satırın görevi: * @returns {Object} result. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} result
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function processEmailDraftQueue_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function processEmailDraftQueue_() {
// EXPLAIN: Bu satırın görevi: const result = { drafted: 0, skipped: 0, errors: 0 };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const result = { drafted: 0, skipped: 0, errors: 0 };
// EXPLAIN: Bu satırın görevi: if (!cfg_('EMAIL_DRAFTS_ENABLED', DEFAULTS.EMAIL_DRAFTS_ENABLED)) return result;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!cfg_('EMAIL_DRAFTS_ENABLED', DEFAULTS.EMAIL_DRAFTS_ENABLED)) return result;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const drafts = getSheetData_(SHEETS.EMAIL_DRAFTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const drafts = getSheetData_(SHEETS.EMAIL_DRAFTS);
// EXPLAIN: Bu satırın görevi: const now = new Date();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const now = new Date();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (const draft of drafts) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const draft of drafts) {
// EXPLAIN: Bu satırın görevi: if (draft.status !== 'queued') continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (draft.status !== 'queued') continue;
// EXPLAIN: Bu satırın görevi: if (draft.scheduled_for && new Date(draft.scheduled_for) > now) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (draft.scheduled_for && new Date(draft.scheduled_for) > now) {
// EXPLAIN: Bu satırın görevi: result.skipped++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      result.skipped++;
// EXPLAIN: Bu satırın görevi: continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      continue;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    try {
// EXPLAIN: Bu satırın görevi: const gmailDraft = GmailApp.createDraft(draft.to, draft.subject, draft.body);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const gmailDraft = GmailApp.createDraft(draft.to, draft.subject, draft.body);
// EXPLAIN: Bu satırın görevi: updateRow_(SHEETS.EMAIL_DRAFTS, draft._rowIndex, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      updateRow_(SHEETS.EMAIL_DRAFTS, draft._rowIndex, {
// EXPLAIN: Bu satırın görevi: status: 'drafted',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        status: 'drafted',
// EXPLAIN: Bu satırın görevi: gmail_draft_id: gmailDraft.getId(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        gmail_draft_id: gmailDraft.getId(),
// EXPLAIN: Bu satırın görevi: updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      });
// EXPLAIN: Bu satırın görevi: result.drafted++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      result.drafted++;
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } catch (e) {
// EXPLAIN: Bu satırın görevi: updateRow_(SHEETS.EMAIL_DRAFTS, draft._rowIndex, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      updateRow_(SHEETS.EMAIL_DRAFTS, draft._rowIndex, {
// EXPLAIN: Bu satırın görevi: status: 'error',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        status: 'error',
// EXPLAIN: Bu satırın görevi: updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        updated_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE))
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      });
// EXPLAIN: Bu satırın görevi: result.errors++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      result.errors++;
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
// EXPLAIN: Bu satırın görevi: * Create Docs package for deal based on DOC_PACKAGES. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Create Docs package for deal based on DOC_PACKAGES
// EXPLAIN: Bu satırın görevi: * @param {Object} deal - Deal data. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} deal - Deal data
// EXPLAIN: Bu satırın görevi: * @returns {Object|null} Package info. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object|null} Package info
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function createDocsPackageForDeal_(deal) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function createDocsPackageForDeal_(deal) {
// EXPLAIN: Bu satırın görevi: const packages = getSheetData_(SHEETS.DOC_PACKAGES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const packages = getSheetData_(SHEETS.DOC_PACKAGES);
// EXPLAIN: Bu satırın görevi: const match = packages.find(row => row.deal_type === deal.deal_type);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const match = packages.find(row => row.deal_type === deal.deal_type);
// EXPLAIN: Bu satırın görevi: if (!match || !match.template_folder_id) return null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!match || !match.template_folder_id) return null;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  try {
// EXPLAIN: Bu satırın görevi: const templateFolder = DriveApp.getFolderById(match.template_folder_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const templateFolder = DriveApp.getFolderById(match.template_folder_id);
// EXPLAIN: Bu satırın görevi: const packageName = match.package_name || ('Deal_' + deal.deal_id);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const packageName = match.package_name || ('Deal_' + deal.deal_id);
// EXPLAIN: Bu satırın görevi: const targetFolder = DriveApp.createFolder(packageName);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const targetFolder = DriveApp.createFolder(packageName);
// EXPLAIN: Bu satırın görevi: const files = templateFolder.getFiles();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const files = templateFolder.getFiles();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: while (files.hasNext()) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    while (files.hasNext()) {
// EXPLAIN: Bu satırın görevi: const file = files.next();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const file = files.next();
// EXPLAIN: Bu satırın görevi: file.makeCopy(file.getName(), targetFolder);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      file.makeCopy(file.getName(), targetFolder);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const url = targetFolder.getUrl();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const url = targetFolder.getUrl();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: appendRow_(SHEETS.DOCS, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    appendRow_(SHEETS.DOCS, {
// EXPLAIN: Bu satırın görevi: doc_id: id_(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      doc_id: id_(),
// EXPLAIN: Bu satırın görevi: created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: Bu satırın görevi: entity_type: 'DEAL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_type: 'DEAL',
// EXPLAIN: Bu satırın görevi: entity_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: doc_type: 'PACKAGE',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      doc_type: 'PACKAGE',
// EXPLAIN: Bu satırın görevi: doc_url: url,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      doc_url: url,
// EXPLAIN: Bu satırın görevi: status: 'created',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      status: 'created',
// EXPLAIN: Bu satırın görevi: signed_at: '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      signed_at: '',
// EXPLAIN: Bu satırın görevi: notes: 'Auto package'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      notes: 'Auto package'
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: return { folder_id: targetFolder.getId(), url: url };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { folder_id: targetFolder.getId(), url: url };
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  } catch (e) {
// EXPLAIN: Bu satırın görevi: Logger.log('DOC_PACKAGE | Error: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('DOC_PACKAGE | Error: ' + e.message);
// EXPLAIN: Bu satırın görevi: return null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return null;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Generate Doc from template with placeholders. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Generate Doc from template with placeholders
// EXPLAIN: Bu satırın görevi: * @param {string} templateId - Template doc ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} templateId - Template doc ID
// EXPLAIN: Bu satırın görevi: * @param {Object} data - Data map. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} data - Data map
// EXPLAIN: Bu satırın görevi: * @param {string} outputFolderId - Output folder ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} outputFolderId - Output folder ID
// EXPLAIN: Bu satırın görevi: * @returns {Object|null} Doc info. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object|null} Doc info
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function generateDocFromTemplate_(templateId, data, outputFolderId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function generateDocFromTemplate_(templateId, data, outputFolderId) {
// EXPLAIN: Bu satırın görevi: if (!templateId) return null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!templateId) return null;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const outputFolder = outputFolderId. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const outputFolder = outputFolderId
// EXPLAIN: Bu satırın görevi: ? DriveApp.getFolderById(outputFolderId). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ? DriveApp.getFolderById(outputFolderId)
// EXPLAIN: Bu satırın görevi: : (cfg_('DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    : (cfg_('DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID)
// EXPLAIN: Bu satırın görevi: ? DriveApp.getFolderById(cfg_('DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID)). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        ? DriveApp.getFolderById(cfg_('DOC_TEMPLATE_OUTPUT_FOLDER_ID', DEFAULTS.DOC_TEMPLATE_OUTPUT_FOLDER_ID))
// EXPLAIN: Bu satırın görevi: : DriveApp.getRootFolder());. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        : DriveApp.getRootFolder());
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const templateFile = DriveApp.getFileById(templateId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const templateFile = DriveApp.getFileById(templateId);
// EXPLAIN: Bu satırın görevi: const copy = templateFile.makeCopy(templateFile.getName() + ' - ' + data.deal_id, outputFolder);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const copy = templateFile.makeCopy(templateFile.getName() + ' - ' + data.deal_id, outputFolder);
// EXPLAIN: Bu satırın görevi: const doc = DocumentApp.openById(copy.getId());. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const doc = DocumentApp.openById(copy.getId());
// EXPLAIN: Bu satırın görevi: const body = doc.getBody();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const body = doc.getBody();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: for (const [key, value] of Object.entries(data || {})) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const [key, value] of Object.entries(data || {})) {
// EXPLAIN: Bu satırın görevi: body.replaceText('{{' + key + '}}', String(value || ''));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    body.replaceText('{{' + key + '}}', String(value || ''));
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: doc.saveAndClose();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  doc.saveAndClose();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: appendRow_(SHEETS.DOCS, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  appendRow_(SHEETS.DOCS, {
// EXPLAIN: Bu satırın görevi: doc_id: id_(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    doc_id: id_(),
// EXPLAIN: Bu satırın görevi: created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    created_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: Bu satırın görevi: entity_type: 'DEAL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_type: 'DEAL',
// EXPLAIN: Bu satırın görevi: entity_id: data.deal_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    entity_id: data.deal_id || '',
// EXPLAIN: Bu satırın görevi: doc_type: 'TEMPLATE_OUTPUT',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    doc_type: 'TEMPLATE_OUTPUT',
// EXPLAIN: Bu satırın görevi: doc_url: copy.getUrl(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    doc_url: copy.getUrl(),
// EXPLAIN: Bu satırın görevi: status: 'generated',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    status: 'generated',
// EXPLAIN: Bu satırın görevi: signed_at: '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    signed_at: '',
// EXPLAIN: Bu satırın görevi: notes: 'Template output'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    notes: 'Template output'
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return { doc_id: copy.getId(), url: copy.getUrl() };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { doc_id: copy.getId(), url: copy.getUrl() };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Schedule win-back sequence for lost deals (30/60/90 days). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Schedule win-back sequence for lost deals (30/60/90 days)
// EXPLAIN: Bu satırın görevi: * @param {Object} deal - Deal object. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} deal - Deal object
// EXPLAIN: Bu satırın görevi: * @param {Object} contact - Contact object. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {Object} contact - Contact object
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function scheduleWinbackSequence_(deal, contact) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function scheduleWinbackSequence_(deal, contact) {
// EXPLAIN: Bu satırın görevi: const offsets = [30, 60, 90];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const offsets = [30, 60, 90];
// EXPLAIN: Bu satırın görevi: for (const days of offsets) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const days of offsets) {
// EXPLAIN: Bu satırın görevi: const scheduled = new Date();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const scheduled = new Date();
// EXPLAIN: Bu satırın görevi: scheduled.setDate(scheduled.getDate() + days);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    scheduled.setDate(scheduled.getDate() + days);
// EXPLAIN: Bu satırın görevi: createEmailDraft_({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    createEmailDraft_({
// EXPLAIN: Bu satırın görevi: contact_id: contact.contact_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      contact_id: contact.contact_id,
// EXPLAIN: Bu satırın görevi: deal_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      deal_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: to: contact.email,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      to: contact.email,
// EXPLAIN: Bu satırın görevi: subject: 'Tekrar görüşelim',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      subject: 'Tekrar görüşelim',
// EXPLAIN: Bu satırın görevi: body: 'Merhaba, ilerlemek isterseniz destek olmaya hazırız.',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      body: 'Merhaba, ilerlemek isterseniz destek olmaya hazırız.',
// EXPLAIN: Bu satırın görevi: scheduled_for: scheduled.toISOString(). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      scheduled_for: scheduled.toISOString()
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: TasksRepo.create({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    TasksRepo.create({
// EXPLAIN: Bu satırın görevi: entity_type: 'DEAL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_type: 'DEAL',
// EXPLAIN: Bu satırın görevi: entity_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: title: 'Win-back takip (' + days + 'g)',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      title: 'Win-back takip (' + days + 'g)',
// EXPLAIN: Bu satırın görevi: description: 'CLOSED_LOST win-back follow-up',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      description: 'CLOSED_LOST win-back follow-up',
// EXPLAIN: Bu satırın görevi: priority: 'medium',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      priority: 'medium',
// EXPLAIN: Bu satırın görevi: status: 'pending',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      status: 'pending',
// EXPLAIN: Bu satırın görevi: due_date: scheduled.toISOString().split('T')[0]. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      due_date: scheduled.toISOString().split('T')[0]
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: EventsRepo.append({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    EventsRepo.append({
// EXPLAIN: Bu satırın görevi: entity_type: 'DEAL',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_type: 'DEAL',
// EXPLAIN: Bu satırın görevi: entity_id: deal.deal_id,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_id: deal.deal_id,
// EXPLAIN: Bu satırın görevi: event_type: EventsRepo.EVENT_TYPES.WINBACK_SCHEDULED,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      event_type: EventsRepo.EVENT_TYPES.WINBACK_SCHEDULED,
// EXPLAIN: Bu satırın görevi: payload: { days: days, scheduled_for: scheduled.toISOString() },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      payload: { days: days, scheduled_for: scheduled.toISOString() },
// EXPLAIN: Bu satırın görevi: source: 'system',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source: 'system',
// EXPLAIN: Bu satırın görevi: idempotency_key: deal.deal_id + '_winback_' + days. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      idempotency_key: deal.deal_id + '_winback_' + days
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Update ops dashboard snapshot. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Update ops dashboard snapshot
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function updateOpsDashboard_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function updateOpsDashboard_() {
// EXPLAIN: Bu satırın görevi: const ingestPending = QueueRepo.getPending().length;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const ingestPending = QueueRepo.getPending().length;
// EXPLAIN: Bu satırın görevi: const dlqCount = getSheetData_(SHEETS.DLQ).length;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const dlqCount = getSheetData_(SHEETS.DLQ).length;
// EXPLAIN: Bu satırın görevi: const totalIngest = getSheetData_(SHEETS.INGEST_QUEUE).length;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const totalIngest = getSheetData_(SHEETS.INGEST_QUEUE).length;
// EXPLAIN: Bu satırın görevi: const errorRate = totalIngest > 0 ? (dlqCount / totalIngest) : 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const errorRate = totalIngest > 0 ? (dlqCount / totalIngest) : 0;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const cursor = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const cursor = getCursor_(CURSORS.INGEST_LAST_RECEIVED_AT);
// EXPLAIN: Bu satırın görevi: let cursorDriftMinutes = 0;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  let cursorDriftMinutes = 0;
// EXPLAIN: Bu satırın görevi: if (cursor) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (cursor) {
// EXPLAIN: Bu satırın görevi: const cursorDate = new Date(cursor);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const cursorDate = new Date(cursor);
// EXPLAIN: Bu satırın görevi: cursorDriftMinutes = Math.round((Date.now() - cursorDate.getTime()) / 60000);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    cursorDriftMinutes = Math.round((Date.now() - cursorDate.getTime()) / 60000);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: appendRow_(SHEETS.OPS_DASHBOARD, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  appendRow_(SHEETS.OPS_DASHBOARD, {
// EXPLAIN: Bu satırın görevi: run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: Bu satırın görevi: ingest_pending: ingestPending,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ingest_pending: ingestPending,
// EXPLAIN: Bu satırın görevi: dlq_count: dlqCount,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    dlq_count: dlqCount,
// EXPLAIN: Bu satırın görevi: error_rate: errorRate,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    error_rate: errorRate,
// EXPLAIN: Bu satırın görevi: cursor_drift_minutes: cursorDriftMinutes. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    cursor_drift_minutes: cursorDriftMinutes
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Drive sharing audit - logs folders with sharing enabled. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Drive sharing audit - logs folders with sharing enabled
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function runDriveShareAudit_() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function runDriveShareAudit_() {
// EXPLAIN: Bu satırın görevi: if (!cfg_('DRIVE_SHARE_AUDIT_ENABLED', DEFAULTS.DRIVE_SHARE_AUDIT_ENABLED)) return;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!cfg_('DRIVE_SHARE_AUDIT_ENABLED', DEFAULTS.DRIVE_SHARE_AUDIT_ENABLED)) return;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const deals = getSheetData_(SHEETS.DEALS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const deals = getSheetData_(SHEETS.DEALS);
// EXPLAIN: Bu satırın görevi: for (const deal of deals) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const deal of deals) {
// EXPLAIN: Bu satırın görevi: if (!deal.doc_package_url) continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!deal.doc_package_url) continue;
// EXPLAIN: Bu satırın görevi: const folderId = extractDriveId_(deal.doc_package_url);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const folderId = extractDriveId_(deal.doc_package_url);
// EXPLAIN: Bu satırın görevi: if (!folderId) continue;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!folderId) continue;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: try {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    try {
// EXPLAIN: Bu satırın görevi: const folder = DriveApp.getFolderById(folderId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const folder = DriveApp.getFolderById(folderId);
// EXPLAIN: Bu satırın görevi: const access = folder.getSharingAccess();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const access = folder.getSharingAccess();
// EXPLAIN: Bu satırın görevi: const permission = folder.getSharingPermission();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const permission = folder.getSharingPermission();
// EXPLAIN: Bu satırın görevi: const owner = folder.getOwner() ? folder.getOwner().getEmail() : '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const owner = folder.getOwner() ? folder.getOwner().getEmail() : '';
// EXPLAIN: Bu satırın görevi: const sharingState = access + ':' + permission;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const sharingState = access + ':' + permission;
// EXPLAIN: Bu satırın görevi: const issue = access !== DriveApp.Access.PRIVATE ? 'SHARING_ENABLED' : '';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const issue = access !== DriveApp.Access.PRIVATE ? 'SHARING_ENABLED' : '';
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: appendRow_(SHEETS.DRIVE_SHARE_AUDIT, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      appendRow_(SHEETS.DRIVE_SHARE_AUDIT, {
// EXPLAIN: Bu satırın görevi: run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        run_at: nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE)),
// EXPLAIN: Bu satırın görevi: folder_id: folderId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        folder_id: folderId,
// EXPLAIN: Bu satırın görevi: owner_email: owner,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        owner_email: owner,
// EXPLAIN: Bu satırın görevi: sharing_state: sharingState,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        sharing_state: sharingState,
// EXPLAIN: Bu satırın görevi: issue: issue. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        issue: issue
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      });
// EXPLAIN: Bu satırın görevi: } catch (e) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } catch (e) {
// EXPLAIN: Bu satırın görevi: Logger.log('DRIVE_AUDIT | Error: ' + e.message);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      Logger.log('DRIVE_AUDIT | Error: ' + e.message);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Process Gmail signals based on label and subject. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Process Gmail signals based on label and subject
// EXPLAIN: Bu satırın görevi: * @param {string} label - Gmail label. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} label - Gmail label
// EXPLAIN: Bu satırın görevi: * @param {string} sinceIso - ISO timestamp to search after. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} sinceIso - ISO timestamp to search after
// EXPLAIN: Bu satırın görevi: * @returns {Object} Result counts. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object} Result counts
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function processGmailSignals_(label, sinceIso) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function processGmailSignals_(label, sinceIso) {
// EXPLAIN: Bu satırın görevi: const result = { scanned: 0, signals: 0, enqueued: 0 };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const result = { scanned: 0, signals: 0, enqueued: 0 };
// EXPLAIN: Bu satırın görevi: const queryDate = sinceIso ? new Date(sinceIso) : null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const queryDate = sinceIso ? new Date(sinceIso) : null;
// EXPLAIN: Bu satırın görevi: const query = queryDate. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const query = queryDate
// EXPLAIN: Bu satırın görevi: ? 'label:' + label + ' after:' + Math.floor(queryDate.getTime() / 1000). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    ? 'label:' + label + ' after:' + Math.floor(queryDate.getTime() / 1000)
// EXPLAIN: Bu satırın görevi: : 'label:' + label;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    : 'label:' + label;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const threads = GmailApp.search(query, 0, 50);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const threads = GmailApp.search(query, 0, 50);
// EXPLAIN: Bu satırın görevi: for (const thread of threads) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  for (const thread of threads) {
// EXPLAIN: Bu satırın görevi: result.scanned++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    result.scanned++;
// EXPLAIN: Bu satırın görevi: const messages = thread.getMessages();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const messages = thread.getMessages();
// EXPLAIN: Bu satırın görevi: const latest = messages[messages.length - 1];. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const latest = messages[messages.length - 1];
// EXPLAIN: Bu satırın görevi: const subject = latest.getSubject();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const subject = latest.getSubject();
// EXPLAIN: Bu satırın görevi: const from = latest.getFrom();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const from = latest.getFrom();
// EXPLAIN: Bu satırın görevi: const emailMatch = String(from).match(/<([^>]+)>/);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const emailMatch = String(from).match(/<([^>]+)>/);
// EXPLAIN: Bu satırın görevi: const email = emailMatch ? emailMatch[1] : from;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const email = emailMatch ? emailMatch[1] : from;
// EXPLAIN: Bu satırın görevi: const weight = subject.toLowerCase().includes('acil') ? 20 : 10;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const weight = subject.toLowerCase().includes('acil') ? 20 : 10;
// EXPLAIN: Bu satırın görevi: const messageId = latest.getId();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const messageId = latest.getId();
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: QueueRepo.enqueue({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    QueueRepo.enqueue({
// EXPLAIN: Bu satırın görevi: ingest_type: INGEST_TYPES.GMAIL_SIGNAL,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      ingest_type: INGEST_TYPES.GMAIL_SIGNAL,
// EXPLAIN: Bu satırın görevi: payload: {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      payload: {
// EXPLAIN: Bu satırın görevi: email: email,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        email: email,
// EXPLAIN: Bu satırın görevi: subject: subject,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        subject: subject,
// EXPLAIN: Bu satırın görevi: label: label,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        label: label,
// EXPLAIN: Bu satırın görevi: signal_type: 'GMAIL_LABEL:' + label,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        signal_type: 'GMAIL_LABEL:' + label,
// EXPLAIN: Bu satırın görevi: weight: weight. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        weight: weight
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      },
// EXPLAIN: Bu satırın görevi: source: 'gmail',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source: 'gmail',
// EXPLAIN: Bu satırın görevi: source_ref_id: thread.getId(),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      source_ref_id: thread.getId(),
// EXPLAIN: Bu satırın görevi: idempotency_key: 'gmail_signal:' + thread.getId() + ':' + messageId + ':' + label. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      idempotency_key: 'gmail_signal:' + thread.getId() + ':' + messageId + ':' + label
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: result.enqueued++;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    result.enqueued++;
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
// EXPLAIN: Bu satırın görevi: * Weekly KPI report job (manual trigger). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Weekly KPI report job (manual trigger)
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function weekly_kpi_report_job() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function weekly_kpi_report_job() {
// EXPLAIN: Bu satırın görevi: if (!cfg_('WEEKLY_KPI_ENABLED', DEFAULTS.WEEKLY_KPI_ENABLED)) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!cfg_('WEEKLY_KPI_ENABLED', DEFAULTS.WEEKLY_KPI_ENABLED)) {
// EXPLAIN: Bu satırın görevi: return { skipped: true };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return { skipped: true };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const recipients = cfg_('WEEKLY_KPI_RECIPIENTS', DEFAULTS.WEEKLY_KPI_RECIPIENTS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const recipients = cfg_('WEEKLY_KPI_RECIPIENTS', DEFAULTS.WEEKLY_KPI_RECIPIENTS);
// EXPLAIN: Bu satırın görevi: if (!recipients) return { skipped: true };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!recipients) return { skipped: true };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const pipeline = DealsRepo.getPipelineSummary();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const pipeline = DealsRepo.getPipelineSummary();
// EXPLAIN: Bu satırın görevi: const tasksDue = TasksRepo.getDueToday().length;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const tasksDue = TasksRepo.getDueToday().length;
// EXPLAIN: Bu satırın görevi: const activeDeals = DealsRepo.getActive().length;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const activeDeals = DealsRepo.getActive().length;
// EXPLAIN: Bu satırın görevi: const deals = getSheetData_(SHEETS.DEALS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const deals = getSheetData_(SHEETS.DEALS);
// EXPLAIN: Bu satırın görevi: const appointmentCount = deals.filter(deal => deal.stage === 'APPOINTMENT_SET').length;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const appointmentCount = deals.filter(deal => deal.stage === 'APPOINTMENT_SET').length;
// EXPLAIN: Bu satırın görevi: const offerCount = deals.filter(deal => deal.stage === 'OFFER').length;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const offerCount = deals.filter(deal => deal.stage === 'OFFER').length;
// EXPLAIN: Bu satırın görevi: const closedCount = deals.filter(deal => deal.stage === 'CLOSED_WON').length;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const closedCount = deals.filter(deal => deal.stage === 'CLOSED_WON').length;
// EXPLAIN: Bu satırın görevi: const attributed = deals.filter(deal => deal.utm_campaign || deal.gclid).length;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const attributed = deals.filter(deal => deal.utm_campaign || deal.gclid).length;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const subject = 'Haftalık KPI Raporu';. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const subject = 'Haftalık KPI Raporu';
// EXPLAIN: Bu satırın görevi: const body = [. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const body = [
// EXPLAIN: Bu satırın görevi: 'Aktif deal sayısı: ' + activeDeals,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Aktif deal sayısı: ' + activeDeals,
// EXPLAIN: Bu satırın görevi: 'Bugün yapılacak task sayısı: ' + tasksDue,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Bugün yapılacak task sayısı: ' + tasksDue,
// EXPLAIN: Bu satırın görevi: 'Pipeline özeti: ' + JSON.stringify(pipeline),. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Pipeline özeti: ' + JSON.stringify(pipeline),
// EXPLAIN: Bu satırın görevi: 'KPI: Lead→Appointment=' + appointmentCount + ', Offer=' + offerCount + ', Close=' + closedCount,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'KPI: Lead→Appointment=' + appointmentCount + ', Offer=' + offerCount + ', Close=' + closedCount,
// EXPLAIN: Bu satırın görevi: 'Attribution bağlı lead sayısı: ' + attributed. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'Attribution bağlı lead sayısı: ' + attributed
// EXPLAIN: Bu satırın görevi: ].join('\n');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  ].join('\n');
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: GmailApp.sendEmail(recipients, subject, body);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  GmailApp.sendEmail(recipients, subject, body);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return { sent: true };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return { sent: true };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Extract Drive ID from URL. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Extract Drive ID from URL
// EXPLAIN: Bu satırın görevi: * @param {string} url - Drive URL. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} url - Drive URL
// EXPLAIN: Bu satırın görevi: * @returns {string|null} Drive ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {string|null} Drive ID
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function extractDriveId_(url) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function extractDriveId_(url) {
// EXPLAIN: Bu satırın görevi: if (!url) return null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (!url) return null;
// EXPLAIN: Bu satırın görevi: const match = String(url).match(/[-\w]{25,}/);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const match = String(url).match(/[-\w]{25,}/);
// EXPLAIN: Bu satırın görevi: return match ? match[0] : null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return match ? match[0] : null;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
