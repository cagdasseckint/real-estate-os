/**
 * CB-OS V1.0 - 07_TasksRepo.gs
 * TASKS table operations with Google Tasks mirror support
 */

/**
 * TasksRepo namespace for TASKS operations
 */
const TasksRepo = {
  
  /**
   * Create a new task
   * @param {Object} data - Task data
   * @returns {Object} Created task with task_id
   */
  create: function(data) {
    const taskId = id_();
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    
    const task = {
      task_id: taskId,
      created_at: now,
      updated_at: now,
      entity_type: data.entity_type || '',
      entity_id: data.entity_id || '',
      title: data.title || '',
      description: data.description || '',
      due_date: data.due_date || '',
      priority: data.priority || 'medium',
      status: data.status || 'pending',
      assigned_to: data.assigned_to || '',
      completed_at: '',
      google_task_id: ''
    };
    
    const rowNum = appendRow_(SHEETS.TASKS, task);
    task._rowIndex = rowNum;
    
    Logger.log('TASKS | Created: ' + taskId + ' title=' + task.title);
    return task;
  },
  
  /**
   * Find task by ID
   * @param {string} taskId - Task ID
   * @returns {Object|null} Task or null
   */
  findById: function(taskId) {
    const allData = getSheetData_(SHEETS.TASKS);
    return allData.find(row => row.task_id === taskId) || null;
  },
  
  /**
   * Find tasks by entity (e.g., all tasks for a deal)
   * @param {string} entityType - Entity type (DEAL, CONTACT, etc.)
   * @param {string} entityId - Entity ID
   * @returns {Array<Object>} Tasks for entity
   */
  findByEntity: function(entityType, entityId) {
    const allData = getSheetData_(SHEETS.TASKS);
    return allData.filter(row => 
      row.entity_type === entityType && row.entity_id === entityId
    );
  },
  
  /**
   * Update task
   * @param {string} taskId - Task ID
   * @param {Object} updates - Fields to update
   * @returns {boolean} Success flag
   */
  update: function(taskId, updates) {
    const task = this.findById(taskId);
    if (!task) return false;
    
    updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    updateRow_(SHEETS.TASKS, task._rowIndex, updates);
    
    Logger.log('TASKS | Updated: ' + taskId);
    return true;
  },
  
  /**
   * Mark task as completed
   * @param {string} taskId - Task ID
   * @returns {boolean} Success flag
   */
  complete: function(taskId) {
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
    return this.update(taskId, {
      status: 'completed',
      completed_at: now
    });
  },
  
  /**
   * Get pending tasks
   * @returns {Array<Object>} Pending tasks
   */
  getPending: function() {
    const allData = getSheetData_(SHEETS.TASKS);
    return allData.filter(row => row.status === 'pending');
  },
  
  /**
   * Get overdue tasks
   * @returns {Array<Object>} Overdue tasks
   */
  getOverdue: function() {
    const now = new Date();
    const allData = getSheetData_(SHEETS.TASKS);
    
    return allData.filter(row => {
      if (row.status !== 'pending') return false;
      if (!row.due_date) return false;
      
      const dueDate = new Date(row.due_date);
      return dueDate < now;
    });
  },
  
  /**
   * Get tasks due today
   * @returns {Array<Object>} Tasks due today
   */
  getDueToday: function() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const allData = getSheetData_(SHEETS.TASKS);
    
    return allData.filter(row => {
      if (row.status !== 'pending') return false;
      if (!row.due_date) return false;
      
      const dueDate = new Date(row.due_date);
      return dueDate >= today && dueDate < tomorrow;
    });
  },
  
  /**
   * Get tasks by priority
   * @param {string} priority - Priority level (high, medium, low)
   * @returns {Array<Object>} Tasks with priority
   */
  getByPriority: function(priority) {
    const allData = getSheetData_(SHEETS.TASKS);
    return allData.filter(row => row.priority === priority && row.status === 'pending');
  },
  
  /**
   * Create task from template
   * @param {string} templateName - Template name
   * @param {Object} context - Context data (entity_type, entity_id, etc.)
   * @returns {Object} Created task
   */
  createFromTemplate: function(templateName, context) {
    const template = loadTaskTemplate_(templateName);
    if (!template) {
      Logger.log('TASKS | Unknown template: ' + templateName);
      return null;
    }
    
    // Calculate due date (default: 1 day for high, 3 days for medium/low)
    const dueDate = new Date();
    if (template.due_in_hours) {
      dueDate.setHours(dueDate.getHours() + Number(template.due_in_hours));
    } else if (template.due_in_days) {
      dueDate.setDate(dueDate.getDate() + Number(template.due_in_days));
    } else if (template.priority === 'high') {
      dueDate.setDate(dueDate.getDate() + 1);
    } else {
      dueDate.setDate(dueDate.getDate() + 3);
    }
    
    return this.create({
      ...template,
      entity_type: context.entity_type || '',
      entity_id: context.entity_id || '',
      assigned_to: context.assigned_to || '',
      due_date: dueDate.toISOString().split('T')[0]
    });
  }
};

/**
 * Load task template from sheet or fallback defaults
 * @param {string} templateName - Template name or ID
 * @returns {Object|null} Template data
 */
function loadTaskTemplate_(templateName) {
  const templates = {
    'first_touch': {
      title: 'İlk temas yap',
      description: 'Lead ile ilk iletişimi kur',
      priority: 'high'
    },
    'qualification': {
      title: 'Qualification soruları',
      description: 'Lead kalifikasyon sorularını tamamla',
      priority: 'high'
    },
    'schedule_appointment': {
      title: 'Randevu ayarla',
      description: 'Müşteri ile randevu planla',
      priority: 'medium'
    },
    'followup_48h': {
      title: '48 saat takip',
      description: '48 saat içinde takip iletişimi yap',
      priority: 'medium',
      due_in_hours: 48
    },
    'send_contract': {
      title: 'Sözleşme gönder',
      description: 'Sözleşme taslağını hazırla ve gönder',
      priority: 'high'
    },
    'photo_shoot': {
      title: 'Fotoğraf çekimi',
      description: 'Emlak fotoğraflarını çek veya çektir',
      priority: 'medium'
    },
    'close_checklist': {
      title: 'Closing checklist',
      description: 'Kapanış için gerekli tüm maddeleri tamamla',
      priority: 'high'
    }
  };
  
  const sheet = sheet_(SHEETS.TASK_TEMPLATES, false);
  if (sheet) {
    const data = getSheetData_(SHEETS.TASK_TEMPLATES);
    const match = data.find(row => row.template_id === templateName || row.name === templateName);
    if (match) {
      return {
        title: match.title,
        description: match.description,
        priority: match.priority || 'medium',
        due_in_days: match.due_in_days,
        due_in_hours: match.due_in_hours
      };
    }
  }
  
  return templates[templateName] || null;
}
