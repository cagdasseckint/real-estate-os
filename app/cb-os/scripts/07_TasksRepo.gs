// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * CB-OS V1.0 - 07_TasksRepo.gs. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * CB-OS V1.0 - 07_TasksRepo.gs
// EXPLAIN: Bu satırın görevi: * TASKS table operations with Google Tasks mirror support. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * TASKS table operations with Google Tasks mirror support
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * TasksRepo namespace for TASKS operations. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * TasksRepo namespace for TASKS operations
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: const TasksRepo = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
const TasksRepo = {
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Create a new task. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Create a new task
// EXPLAIN: Bu satırın görevi: * @param {Object} data - Task data. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {Object} data - Task data
// EXPLAIN: Bu satırın görevi: * @returns {Object} Created task with task_id. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Object} Created task with task_id
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: create: function(data) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  create: function(data) {
// EXPLAIN: Bu satırın görevi: const taskId = id_();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const taskId = id_();
// EXPLAIN: Bu satırın görevi: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const task = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const task = {
// EXPLAIN: Bu satırın görevi: task_id: taskId,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      task_id: taskId,
// EXPLAIN: Bu satırın görevi: created_at: now,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      created_at: now,
// EXPLAIN: Bu satırın görevi: updated_at: now,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      updated_at: now,
// EXPLAIN: Bu satırın görevi: entity_type: data.entity_type || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_type: data.entity_type || '',
// EXPLAIN: Bu satırın görevi: entity_id: data.entity_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_id: data.entity_id || '',
// EXPLAIN: Bu satırın görevi: title: data.title || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      title: data.title || '',
// EXPLAIN: Bu satırın görevi: description: data.description || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      description: data.description || '',
// EXPLAIN: Bu satırın görevi: due_date: data.due_date || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      due_date: data.due_date || '',
// EXPLAIN: Bu satırın görevi: priority: data.priority || 'medium',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      priority: data.priority || 'medium',
// EXPLAIN: Bu satırın görevi: status: data.status || 'pending',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      status: data.status || 'pending',
// EXPLAIN: Bu satırın görevi: assigned_to: data.assigned_to || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      assigned_to: data.assigned_to || '',
// EXPLAIN: Bu satırın görevi: completed_at: '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      completed_at: '',
// EXPLAIN: Bu satırın görevi: google_task_id: ''. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      google_task_id: ''
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const rowNum = appendRow_(SHEETS.TASKS, task);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const rowNum = appendRow_(SHEETS.TASKS, task);
// EXPLAIN: Bu satırın görevi: task._rowIndex = rowNum;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    task._rowIndex = rowNum;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: Logger.log('TASKS | Created: ' + taskId + ' title=' + task.title);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('TASKS | Created: ' + taskId + ' title=' + task.title);
// EXPLAIN: Bu satırın görevi: return task;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return task;
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Find task by ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Find task by ID
// EXPLAIN: Bu satırın görevi: * @param {string} taskId - Task ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} taskId - Task ID
// EXPLAIN: Bu satırın görevi: * @returns {Object|null} Task or null. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Object|null} Task or null
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: findById: function(taskId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  findById: function(taskId) {
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.TASKS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.TASKS);
// EXPLAIN: Bu satırın görevi: return allData.find(row => row.task_id === taskId) || null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.find(row => row.task_id === taskId) || null;
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Find tasks by entity (e.g., all tasks for a deal). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Find tasks by entity (e.g., all tasks for a deal)
// EXPLAIN: Bu satırın görevi: * @param {string} entityType - Entity type (DEAL, CONTACT, etc.). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} entityType - Entity type (DEAL, CONTACT, etc.)
// EXPLAIN: Bu satırın görevi: * @param {string} entityId - Entity ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} entityId - Entity ID
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Tasks for entity. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Array<Object>} Tasks for entity
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: findByEntity: function(entityType, entityId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  findByEntity: function(entityType, entityId) {
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.TASKS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.TASKS);
// EXPLAIN: Bu satırın görevi: return allData.filter(row =>. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.filter(row => 
// EXPLAIN: Bu satırın görevi: row.entity_type === entityType && row.entity_id === entityId. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      row.entity_type === entityType && row.entity_id === entityId
// EXPLAIN: Bu satırın görevi: );. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    );
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Update task. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Update task
// EXPLAIN: Bu satırın görevi: * @param {string} taskId - Task ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} taskId - Task ID
// EXPLAIN: Bu satırın görevi: * @param {Object} updates - Fields to update. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {Object} updates - Fields to update
// EXPLAIN: Bu satırın görevi: * @returns {boolean} Success flag. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {boolean} Success flag
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: update: function(taskId, updates) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  update: function(taskId, updates) {
// EXPLAIN: Bu satırın görevi: const task = this.findById(taskId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const task = this.findById(taskId);
// EXPLAIN: Bu satırın görevi: if (!task) return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!task) return false;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    updates.updated_at = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satırın görevi: updateRow_(SHEETS.TASKS, task._rowIndex, updates);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    updateRow_(SHEETS.TASKS, task._rowIndex, updates);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: Logger.log('TASKS | Updated: ' + taskId);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    Logger.log('TASKS | Updated: ' + taskId);
// EXPLAIN: Bu satırın görevi: return true;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return true;
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Mark task as completed. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Mark task as completed
// EXPLAIN: Bu satırın görevi: * @param {string} taskId - Task ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} taskId - Task ID
// EXPLAIN: Bu satırın görevi: * @returns {boolean} Success flag. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {boolean} Success flag
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: complete: function(taskId) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  complete: function(taskId) {
// EXPLAIN: Bu satırın görevi: const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const now = nowIso_(cfg_('TIMEZONE', DEFAULTS.TIMEZONE));
// EXPLAIN: Bu satırın görevi: return this.update(taskId, {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return this.update(taskId, {
// EXPLAIN: Bu satırın görevi: status: 'completed',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      status: 'completed',
// EXPLAIN: Bu satırın görevi: completed_at: now. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      completed_at: now
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get pending tasks. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get pending tasks
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Pending tasks. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Array<Object>} Pending tasks
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: getPending: function() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  getPending: function() {
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.TASKS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.TASKS);
// EXPLAIN: Bu satırın görevi: return allData.filter(row => row.status === 'pending');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.filter(row => row.status === 'pending');
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get overdue tasks. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get overdue tasks
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Overdue tasks. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Array<Object>} Overdue tasks
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: getOverdue: function() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  getOverdue: function() {
// EXPLAIN: Bu satırın görevi: const now = new Date();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const now = new Date();
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.TASKS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.TASKS);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: return allData.filter(row => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.filter(row => {
// EXPLAIN: Bu satırın görevi: if (row.status !== 'pending') return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (row.status !== 'pending') return false;
// EXPLAIN: Bu satırın görevi: if (!row.due_date) return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (!row.due_date) return false;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: const dueDate = new Date(row.due_date);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const dueDate = new Date(row.due_date);
// EXPLAIN: Bu satırın görevi: return dueDate < now;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return dueDate < now;
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get tasks due today. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get tasks due today
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Tasks due today. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Array<Object>} Tasks due today
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: getDueToday: function() {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  getDueToday: function() {
// EXPLAIN: Bu satırın görevi: const today = new Date();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const today = new Date();
// EXPLAIN: Bu satırın görevi: today.setHours(0, 0, 0, 0);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    today.setHours(0, 0, 0, 0);
// EXPLAIN: Bu satırın görevi: const tomorrow = new Date(today);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const tomorrow = new Date(today);
// EXPLAIN: Bu satırın görevi: tomorrow.setDate(tomorrow.getDate() + 1);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    tomorrow.setDate(tomorrow.getDate() + 1);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.TASKS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.TASKS);
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: return allData.filter(row => {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.filter(row => {
// EXPLAIN: Bu satırın görevi: if (row.status !== 'pending') return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (row.status !== 'pending') return false;
// EXPLAIN: Bu satırın görevi: if (!row.due_date) return false;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      if (!row.due_date) return false;
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
      
// EXPLAIN: Bu satırın görevi: const dueDate = new Date(row.due_date);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      const dueDate = new Date(row.due_date);
// EXPLAIN: Bu satırın görevi: return dueDate >= today && dueDate < tomorrow;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return dueDate >= today && dueDate < tomorrow;
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Get tasks by priority. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Get tasks by priority
// EXPLAIN: Bu satırın görevi: * @param {string} priority - Priority level (high, medium, low). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} priority - Priority level (high, medium, low)
// EXPLAIN: Bu satırın görevi: * @returns {Array<Object>} Tasks with priority. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Array<Object>} Tasks with priority
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: getByPriority: function(priority) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  getByPriority: function(priority) {
// EXPLAIN: Bu satırın görevi: const allData = getSheetData_(SHEETS.TASKS);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const allData = getSheetData_(SHEETS.TASKS);
// EXPLAIN: Bu satırın görevi: return allData.filter(row => row.priority === priority && row.status === 'pending');. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return allData.filter(row => row.priority === priority && row.status === 'pending');
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  },
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  /**
// EXPLAIN: Bu satırın görevi: * Create task from template. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * Create task from template
// EXPLAIN: Bu satırın görevi: * @param {string} templateName - Template name. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {string} templateName - Template name
// EXPLAIN: Bu satırın görevi: * @param {Object} context - Context data (entity_type, entity_id, etc.). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @param {Object} context - Context data (entity_type, entity_id, etc.)
// EXPLAIN: Bu satırın görevi: * @returns {Object} Created task. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   * @returns {Object} Created task
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
   */
// EXPLAIN: Bu satırın görevi: createFromTemplate: function(templateName, context) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  createFromTemplate: function(templateName, context) {
// EXPLAIN: Bu satırın görevi: const template = loadTaskTemplate_(templateName);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const template = loadTaskTemplate_(templateName);
// EXPLAIN: Bu satırın görevi: if (!template) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (!template) {
// EXPLAIN: Bu satırın görevi: Logger.log('TASKS | Unknown template: ' + templateName);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      Logger.log('TASKS | Unknown template: ' + templateName);
// EXPLAIN: Bu satırın görevi: return null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return null;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: // Calculate due date (default: 1 day for high, 3 days for medium/low). Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    // Calculate due date (default: 1 day for high, 3 days for medium/low)
// EXPLAIN: Bu satırın görevi: const dueDate = new Date();. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const dueDate = new Date();
// EXPLAIN: Bu satırın görevi: if (template.due_in_hours) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (template.due_in_hours) {
// EXPLAIN: Bu satırın görevi: dueDate.setHours(dueDate.getHours() + Number(template.due_in_hours));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      dueDate.setHours(dueDate.getHours() + Number(template.due_in_hours));
// EXPLAIN: Bu satırın görevi: } else if (template.due_in_days) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else if (template.due_in_days) {
// EXPLAIN: Bu satırın görevi: dueDate.setDate(dueDate.getDate() + Number(template.due_in_days));. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      dueDate.setDate(dueDate.getDate() + Number(template.due_in_days));
// EXPLAIN: Bu satırın görevi: } else if (template.priority === 'high') {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else if (template.priority === 'high') {
// EXPLAIN: Bu satırın görevi: dueDate.setDate(dueDate.getDate() + 1);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      dueDate.setDate(dueDate.getDate() + 1);
// EXPLAIN: Bu satırın görevi: } else {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    } else {
// EXPLAIN: Bu satırın görevi: dueDate.setDate(dueDate.getDate() + 3);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      dueDate.setDate(dueDate.getDate() + 3);
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
    
// EXPLAIN: Bu satırın görevi: return this.create({. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    return this.create({
// EXPLAIN: Bu satırın görevi: ...template,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      ...template,
// EXPLAIN: Bu satırın görevi: entity_type: context.entity_type || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_type: context.entity_type || '',
// EXPLAIN: Bu satırın görevi: entity_id: context.entity_id || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      entity_id: context.entity_id || '',
// EXPLAIN: Bu satırın görevi: assigned_to: context.assigned_to || '',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      assigned_to: context.assigned_to || '',
// EXPLAIN: Bu satırın görevi: due_date: dueDate.toISOString().split('T')[0]. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      due_date: dueDate.toISOString().split('T')[0]
// EXPLAIN: Bu satırın görevi: });. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    });
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
};
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.

// EXPLAIN: Bu satırın görevi: /**. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
/**
// EXPLAIN: Bu satırın görevi: * Load task template from sheet or fallback defaults. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * Load task template from sheet or fallback defaults
// EXPLAIN: Bu satırın görevi: * @param {string} templateName - Template name or ID. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @param {string} templateName - Template name or ID
// EXPLAIN: Bu satırın görevi: * @returns {Object|null} Template data. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 * @returns {Object|null} Template data
// EXPLAIN: Bu satırın görevi: */. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
 */
// EXPLAIN: Bu satırın görevi: function loadTaskTemplate_(templateName) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
function loadTaskTemplate_(templateName) {
// EXPLAIN: Bu satırın görevi: const templates = {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const templates = {
// EXPLAIN: Bu satırın görevi: 'first_touch': {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'first_touch': {
// EXPLAIN: Bu satırın görevi: title: 'İlk temas yap',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      title: 'İlk temas yap',
// EXPLAIN: Bu satırın görevi: description: 'Lead ile ilk iletişimi kur',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      description: 'Lead ile ilk iletişimi kur',
// EXPLAIN: Bu satırın görevi: priority: 'high'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      priority: 'high'
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    },
// EXPLAIN: Bu satırın görevi: 'qualification': {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'qualification': {
// EXPLAIN: Bu satırın görevi: title: 'Qualification soruları',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      title: 'Qualification soruları',
// EXPLAIN: Bu satırın görevi: description: 'Lead kalifikasyon sorularını tamamla',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      description: 'Lead kalifikasyon sorularını tamamla',
// EXPLAIN: Bu satırın görevi: priority: 'high'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      priority: 'high'
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    },
// EXPLAIN: Bu satırın görevi: 'schedule_appointment': {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'schedule_appointment': {
// EXPLAIN: Bu satırın görevi: title: 'Randevu ayarla',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      title: 'Randevu ayarla',
// EXPLAIN: Bu satırın görevi: description: 'Müşteri ile randevu planla',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      description: 'Müşteri ile randevu planla',
// EXPLAIN: Bu satırın görevi: priority: 'medium'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      priority: 'medium'
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    },
// EXPLAIN: Bu satırın görevi: 'followup_48h': {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'followup_48h': {
// EXPLAIN: Bu satırın görevi: title: '48 saat takip',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      title: '48 saat takip',
// EXPLAIN: Bu satırın görevi: description: '48 saat içinde takip iletişimi yap',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      description: '48 saat içinde takip iletişimi yap',
// EXPLAIN: Bu satırın görevi: priority: 'medium',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      priority: 'medium',
// EXPLAIN: Bu satırın görevi: due_in_hours: 48. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      due_in_hours: 48
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    },
// EXPLAIN: Bu satırın görevi: 'send_contract': {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'send_contract': {
// EXPLAIN: Bu satırın görevi: title: 'Sözleşme gönder',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      title: 'Sözleşme gönder',
// EXPLAIN: Bu satırın görevi: description: 'Sözleşme taslağını hazırla ve gönder',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      description: 'Sözleşme taslağını hazırla ve gönder',
// EXPLAIN: Bu satırın görevi: priority: 'high'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      priority: 'high'
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    },
// EXPLAIN: Bu satırın görevi: 'photo_shoot': {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'photo_shoot': {
// EXPLAIN: Bu satırın görevi: title: 'Fotoğraf çekimi',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      title: 'Fotoğraf çekimi',
// EXPLAIN: Bu satırın görevi: description: 'Emlak fotoğraflarını çek veya çektir',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      description: 'Emlak fotoğraflarını çek veya çektir',
// EXPLAIN: Bu satırın görevi: priority: 'medium'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      priority: 'medium'
// EXPLAIN: Bu satırın görevi: },. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    },
// EXPLAIN: Bu satırın görevi: 'close_checklist': {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    'close_checklist': {
// EXPLAIN: Bu satırın görevi: title: 'Closing checklist',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      title: 'Closing checklist',
// EXPLAIN: Bu satırın görevi: description: 'Kapanış için gerekli tüm maddeleri tamamla',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      description: 'Kapanış için gerekli tüm maddeleri tamamla',
// EXPLAIN: Bu satırın görevi: priority: 'high'. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      priority: 'high'
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  };
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: const sheet = sheet_(SHEETS.TASK_TEMPLATES, false);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  const sheet = sheet_(SHEETS.TASK_TEMPLATES, false);
// EXPLAIN: Bu satırın görevi: if (sheet) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  if (sheet) {
// EXPLAIN: Bu satırın görevi: const data = getSheetData_(SHEETS.TASK_TEMPLATES);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const data = getSheetData_(SHEETS.TASK_TEMPLATES);
// EXPLAIN: Bu satırın görevi: const match = data.find(row => row.template_id === templateName || row.name === templateName);. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    const match = data.find(row => row.template_id === templateName || row.name === templateName);
// EXPLAIN: Bu satırın görevi: if (match) {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    if (match) {
// EXPLAIN: Bu satırın görevi: return {. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      return {
// EXPLAIN: Bu satırın görevi: title: match.title,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        title: match.title,
// EXPLAIN: Bu satırın görevi: description: match.description,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        description: match.description,
// EXPLAIN: Bu satırın görevi: priority: match.priority || 'medium',. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        priority: match.priority || 'medium',
// EXPLAIN: Bu satırın görevi: due_in_days: match.due_in_days,. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        due_in_days: match.due_in_days,
// EXPLAIN: Bu satırın görevi: due_in_hours: match.due_in_hours. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
        due_in_hours: match.due_in_hours
// EXPLAIN: Bu satırın görevi: };. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
      };
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
    }
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  }
// EXPLAIN: Bu satır bilinçli olarak boş bırakılmıştır; bölümleri ayırıp okumayı kolaylaştırır.
  
// EXPLAIN: Bu satırın görevi: return templates[templateName] || null;. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
  return templates[templateName] || null;
// EXPLAIN: Bu satırın görevi: }. Kod bilmeyen biri için: bu satır, yukarıdaki/altındaki işlemi tanımlamak veya yapmak içindir.
}
// Çağdaş Seçkin Tüfekci - Real Estate Agent
