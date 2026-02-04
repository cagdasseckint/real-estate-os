// EXPLAIN: /**
/**
// EXPLAIN: * CB-OS V1.0 - 07_TasksRepo.gs
 * CB-OS V1.0 - 07_TasksRepo.gs
// EXPLAIN: * TASKS table operations with Google Tasks mirror support
 * TASKS table operations with Google Tasks mirror support
// EXPLAIN: */
 */
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * TasksRepo namespace for TASKS operations
 * TasksRepo namespace for TASKS operations
// EXPLAIN: */
 */
// EXPLAIN: const TasksRepo = {
const TasksRepo = {
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Create a new task
   * Create a new task
// EXPLAIN: * @param {Object} data - Task data
   * @param {Object} data - Task data
// EXPLAIN: * @returns {Object} Created task with task_id
   * @returns {Object} Created task with task_id
// EXPLAIN: */
   */
// EXPLAIN: create: function(data) {
  create: function(data) {
// EXPLAIN: const taskId = id_();
    const taskId = id_();
// EXPLAIN: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const task = {
    const task = {
// EXPLAIN: task_id: taskId,
      task_id: taskId,
// EXPLAIN: created_at: now,
      created_at: now,
// EXPLAIN: updated_at: now,
      updated_at: now,
// EXPLAIN: entity_type: data.entity_type || '',
      entity_type: data.entity_type || '',
// EXPLAIN: entity_id: data.entity_id || '',
      entity_id: data.entity_id || '',
// EXPLAIN: title: data.title || '',
      title: data.title || '',
// EXPLAIN: description: data.description || '',
      description: data.description || '',
// EXPLAIN: due_date: data.due_date || '',
      due_date: data.due_date || '',
// EXPLAIN: priority: data.priority || 'medium',
      priority: data.priority || 'medium',
// EXPLAIN: status: data.status || 'pending',
      status: data.status || 'pending',
// EXPLAIN: assigned_to: data.assigned_to || '',
      assigned_to: data.assigned_to || '',
// EXPLAIN: completed_at: '',
      completed_at: '',
// EXPLAIN: google_task_id: ''
      google_task_id: ''
// EXPLAIN: };
    };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const rowNum = appendRow_(SHEETS.TASKS, task);
    const rowNum = appendRow_(SHEETS.TASKS, task);
// EXPLAIN: task._rowIndex = rowNum;
    task._rowIndex = rowNum;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: Logger.log('TASKS | Created: ' + taskId + ' title=' + task.title);
    Logger.log('TASKS | Created: ' + taskId + ' title=' + task.title);
// EXPLAIN: return task;
    return task;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Find task by ID
   * Find task by ID
// EXPLAIN: * @param {string} taskId - Task ID
   * @param {string} taskId - Task ID
// EXPLAIN: * @returns {Object|null} Task or null
   * @returns {Object|null} Task or null
// EXPLAIN: */
   */
// EXPLAIN: findById: function(taskId) {
  findById: function(taskId) {
// EXPLAIN: const allData = getSheetData_(SHEETS.TASKS);
    const allData = getSheetData_(SHEETS.TASKS);
// EXPLAIN: return allData.find(row => row.task_id === taskId) || null;
    return allData.find(row => row.task_id === taskId) || null;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Find tasks by entity (e.g., all tasks for a deal)
   * Find tasks by entity (e.g., all tasks for a deal)
// EXPLAIN: * @param {string} entityType - Entity type (DEAL, CONTACT, etc.)
   * @param {string} entityType - Entity type (DEAL, CONTACT, etc.)
// EXPLAIN: * @param {string} entityId - Entity ID
   * @param {string} entityId - Entity ID
// EXPLAIN: * @returns {Array<Object>} Tasks for entity
   * @returns {Array<Object>} Tasks for entity
// EXPLAIN: */
   */
// EXPLAIN: findByEntity: function(entityType, entityId) {
  findByEntity: function(entityType, entityId) {
// EXPLAIN: const allData = getSheetData_(SHEETS.TASKS);
    const allData = getSheetData_(SHEETS.TASKS);
// EXPLAIN: return allData.filter(row =>
    return allData.filter(row => 
// EXPLAIN: row.entity_type === entityType && row.entity_id === entityId
      row.entity_type === entityType && row.entity_id === entityId
// EXPLAIN: );
    );
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Update task
   * Update task
// EXPLAIN: * @param {string} taskId - Task ID
   * @param {string} taskId - Task ID
// EXPLAIN: * @param {Object} updates - Fields to update
   * @param {Object} updates - Fields to update
// EXPLAIN: * @returns {boolean} Success flag
   * @returns {boolean} Success flag
// EXPLAIN: */
   */
// EXPLAIN: update: function(taskId, updates) {
  update: function(taskId, updates) {
// EXPLAIN: const task = this.findById(taskId);
    const task = this.findById(taskId);
// EXPLAIN: if (!task) return false;
    if (!task) return false;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: updateRow_(SHEETS.TASKS, task._rowIndex, updates);
    updateRow_(SHEETS.TASKS, task._rowIndex, updates);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: Logger.log('TASKS | Updated: ' + taskId);
    Logger.log('TASKS | Updated: ' + taskId);
// EXPLAIN: return true;
    return true;
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Mark task as completed
   * Mark task as completed
// EXPLAIN: * @param {string} taskId - Task ID
   * @param {string} taskId - Task ID
// EXPLAIN: * @returns {boolean} Success flag
   * @returns {boolean} Success flag
// EXPLAIN: */
   */
// EXPLAIN: complete: function(taskId) {
  complete: function(taskId) {
// EXPLAIN: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: return this.update(taskId, {
    return this.update(taskId, {
// EXPLAIN: status: 'completed',
      status: 'completed',
// EXPLAIN: completed_at: now
      completed_at: now
// EXPLAIN: });
    });
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get pending tasks
   * Get pending tasks
// EXPLAIN: * @returns {Array<Object>} Pending tasks
   * @returns {Array<Object>} Pending tasks
// EXPLAIN: */
   */
// EXPLAIN: getPending: function() {
  getPending: function() {
// EXPLAIN: const allData = getSheetData_(SHEETS.TASKS);
    const allData = getSheetData_(SHEETS.TASKS);
// EXPLAIN: return allData.filter(row => row.status === 'pending');
    return allData.filter(row => row.status === 'pending');
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get overdue tasks
   * Get overdue tasks
// EXPLAIN: * @returns {Array<Object>} Overdue tasks
   * @returns {Array<Object>} Overdue tasks
// EXPLAIN: */
   */
// EXPLAIN: getOverdue: function() {
  getOverdue: function() {
// EXPLAIN: const now = new Date();
    const now = new Date();
// EXPLAIN: const allData = getSheetData_(SHEETS.TASKS);
    const allData = getSheetData_(SHEETS.TASKS);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return allData.filter(row => {
    return allData.filter(row => {
// EXPLAIN: if (row.status !== 'pending') return false;
      if (row.status !== 'pending') return false;
// EXPLAIN: if (!row.due_date) return false;
      if (!row.due_date) return false;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: const dueDate = new Date(row.due_date);
      const dueDate = new Date(row.due_date);
// EXPLAIN: return dueDate < now;
      return dueDate < now;
// EXPLAIN: });
    });
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get tasks due today
   * Get tasks due today
// EXPLAIN: * @returns {Array<Object>} Tasks due today
   * @returns {Array<Object>} Tasks due today
// EXPLAIN: */
   */
// EXPLAIN: getDueToday: function() {
  getDueToday: function() {
// EXPLAIN: const today = new Date();
    const today = new Date();
// EXPLAIN: today.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
// EXPLAIN: const tomorrow = new Date(today);
    const tomorrow = new Date(today);
// EXPLAIN: tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setDate(tomorrow.getDate() + 1);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: const allData = getSheetData_(SHEETS.TASKS);
    const allData = getSheetData_(SHEETS.TASKS);
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return allData.filter(row => {
    return allData.filter(row => {
// EXPLAIN: if (row.status !== 'pending') return false;
      if (row.status !== 'pending') return false;
// EXPLAIN: if (!row.due_date) return false;
      if (!row.due_date) return false;
// EXPLAIN: boş satır (okunabilirlik için ayrım)
      
// EXPLAIN: const dueDate = new Date(row.due_date);
      const dueDate = new Date(row.due_date);
// EXPLAIN: return dueDate >= today && dueDate < tomorrow;
      return dueDate >= today && dueDate < tomorrow;
// EXPLAIN: });
    });
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Get tasks by priority
   * Get tasks by priority
// EXPLAIN: * @param {string} priority - Priority level (high, medium, low)
   * @param {string} priority - Priority level (high, medium, low)
// EXPLAIN: * @returns {Array<Object>} Tasks with priority
   * @returns {Array<Object>} Tasks with priority
// EXPLAIN: */
   */
// EXPLAIN: getByPriority: function(priority) {
  getByPriority: function(priority) {
// EXPLAIN: const allData = getSheetData_(SHEETS.TASKS);
    const allData = getSheetData_(SHEETS.TASKS);
// EXPLAIN: return allData.filter(row => row.priority === priority && row.status === 'pending');
    return allData.filter(row => row.priority === priority && row.status === 'pending');
// EXPLAIN: },
  },
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: /**
  /**
// EXPLAIN: * Create task from template
   * Create task from template
// EXPLAIN: * @param {string} templateName - Template name
   * @param {string} templateName - Template name
// EXPLAIN: * @param {Object} context - Context data (entity_type, entity_id, etc.)
   * @param {Object} context - Context data (entity_type, entity_id, etc.)
// EXPLAIN: * @returns {Object} Created task
   * @returns {Object} Created task
// EXPLAIN: */
   */
// EXPLAIN: createFromTemplate: function(templateName, context) {
  createFromTemplate: function(templateName, context) {
// EXPLAIN: const template = loadTaskTemplate_(templateName);
    const template = loadTaskTemplate_(templateName);
// EXPLAIN: if (!template) {
    if (!template) {
// EXPLAIN: Logger.log('TASKS | Unknown template: ' + templateName);
      Logger.log('TASKS | Unknown template: ' + templateName);
// EXPLAIN: return null;
      return null;
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: // Calculate due date (default: 1 day for high, 3 days for medium/low)
    // Calculate due date (default: 1 day for high, 3 days for medium/low)
// EXPLAIN: const dueDate = new Date();
    const dueDate = new Date();
// EXPLAIN: if (template.due_in_hours) {
    if (template.due_in_hours) {
// EXPLAIN: dueDate.setHours(dueDate.getHours() + Number(template.due_in_hours));
      dueDate.setHours(dueDate.getHours() + Number(template.due_in_hours));
// EXPLAIN: } else if (template.due_in_days) {
    } else if (template.due_in_days) {
// EXPLAIN: dueDate.setDate(dueDate.getDate() + Number(template.due_in_days));
      dueDate.setDate(dueDate.getDate() + Number(template.due_in_days));
// EXPLAIN: } else if (template.priority === 'high') {
    } else if (template.priority === 'high') {
// EXPLAIN: dueDate.setDate(dueDate.getDate() + 1);
      dueDate.setDate(dueDate.getDate() + 1);
// EXPLAIN: } else {
    } else {
// EXPLAIN: dueDate.setDate(dueDate.getDate() + 3);
      dueDate.setDate(dueDate.getDate() + 3);
// EXPLAIN: }
    }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
    
// EXPLAIN: return this.create({
    return this.create({
// EXPLAIN: ...template,
      ...template,
// EXPLAIN: entity_type: context.entity_type || '',
      entity_type: context.entity_type || '',
// EXPLAIN: entity_id: context.entity_id || '',
      entity_id: context.entity_id || '',
// EXPLAIN: assigned_to: context.assigned_to || '',
      assigned_to: context.assigned_to || '',
// EXPLAIN: due_date: dueDate.toISOString().split('T')[0]
      due_date: dueDate.toISOString().split('T')[0]
// EXPLAIN: });
    });
// EXPLAIN: }
  }
// EXPLAIN: };
};
// EXPLAIN: boş satır (okunabilirlik için ayrım)

// EXPLAIN: /**
/**
// EXPLAIN: * Load task template from sheet or fallback defaults
 * Load task template from sheet or fallback defaults
// EXPLAIN: * @param {string} templateName - Template name or ID
 * @param {string} templateName - Template name or ID
// EXPLAIN: * @returns {Object|null} Template data
 * @returns {Object|null} Template data
// EXPLAIN: */
 */
// EXPLAIN: function loadTaskTemplate_(templateName) {
function loadTaskTemplate_(templateName) {
// EXPLAIN: const templates = {
  const templates = {
// EXPLAIN: 'first_touch': {
    'first_touch': {
// EXPLAIN: title: 'İlk temas yap',
      title: 'İlk temas yap',
// EXPLAIN: description: 'Lead ile ilk iletişimi kur',
      description: 'Lead ile ilk iletişimi kur',
// EXPLAIN: priority: 'high'
      priority: 'high'
// EXPLAIN: },
    },
// EXPLAIN: 'qualification': {
    'qualification': {
// EXPLAIN: title: 'Qualification soruları',
      title: 'Qualification soruları',
// EXPLAIN: description: 'Lead kalifikasyon sorularını tamamla',
      description: 'Lead kalifikasyon sorularını tamamla',
// EXPLAIN: priority: 'high'
      priority: 'high'
// EXPLAIN: },
    },
// EXPLAIN: 'schedule_appointment': {
    'schedule_appointment': {
// EXPLAIN: title: 'Randevu ayarla',
      title: 'Randevu ayarla',
// EXPLAIN: description: 'Müşteri ile randevu planla',
      description: 'Müşteri ile randevu planla',
// EXPLAIN: priority: 'medium'
      priority: 'medium'
// EXPLAIN: },
    },
// EXPLAIN: 'followup_48h': {
    'followup_48h': {
// EXPLAIN: title: '48 saat takip',
      title: '48 saat takip',
// EXPLAIN: description: '48 saat içinde takip iletişimi yap',
      description: '48 saat içinde takip iletişimi yap',
// EXPLAIN: priority: 'medium',
      priority: 'medium',
// EXPLAIN: due_in_hours: 48
      due_in_hours: 48
// EXPLAIN: },
    },
// EXPLAIN: 'send_contract': {
    'send_contract': {
// EXPLAIN: title: 'Sözleşme gönder',
      title: 'Sözleşme gönder',
// EXPLAIN: description: 'Sözleşme taslağını hazırla ve gönder',
      description: 'Sözleşme taslağını hazırla ve gönder',
// EXPLAIN: priority: 'high'
      priority: 'high'
// EXPLAIN: },
    },
// EXPLAIN: 'photo_shoot': {
    'photo_shoot': {
// EXPLAIN: title: 'Fotoğraf çekimi',
      title: 'Fotoğraf çekimi',
// EXPLAIN: description: 'Emlak fotoğraflarını çek veya çektir',
      description: 'Emlak fotoğraflarını çek veya çektir',
// EXPLAIN: priority: 'medium'
      priority: 'medium'
// EXPLAIN: },
    },
// EXPLAIN: 'close_checklist': {
    'close_checklist': {
// EXPLAIN: title: 'Closing checklist',
      title: 'Closing checklist',
// EXPLAIN: description: 'Kapanış için gerekli tüm maddeleri tamamla',
      description: 'Kapanış için gerekli tüm maddeleri tamamla',
// EXPLAIN: priority: 'high'
      priority: 'high'
// EXPLAIN: }
    }
// EXPLAIN: };
  };
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: const sheet = sheet_(SHEETS.TASK_TEMPLATES, false);
  const sheet = sheet_(SHEETS.TASK_TEMPLATES, false);
// EXPLAIN: if (sheet) {
  if (sheet) {
// EXPLAIN: const data = getSheetData_(SHEETS.TASK_TEMPLATES);
    const data = getSheetData_(SHEETS.TASK_TEMPLATES);
// EXPLAIN: const match = data.find(row => row.template_id === templateName || row.name === templateName);
    const match = data.find(row => row.template_id === templateName || row.name === templateName);
// EXPLAIN: if (match) {
    if (match) {
// EXPLAIN: return {
      return {
// EXPLAIN: title: match.title,
        title: match.title,
// EXPLAIN: description: match.description,
        description: match.description,
// EXPLAIN: priority: match.priority || 'medium',
        priority: match.priority || 'medium',
// EXPLAIN: due_in_days: match.due_in_days,
        due_in_days: match.due_in_days,
// EXPLAIN: due_in_hours: match.due_in_hours
        due_in_hours: match.due_in_hours
// EXPLAIN: };
      };
// EXPLAIN: }
    }
// EXPLAIN: }
  }
// EXPLAIN: boş satır (okunabilirlik için ayrım)
  
// EXPLAIN: return templates[templateName] || null;
  return templates[templateName] || null;
// EXPLAIN: }
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
