/**
 * Unified trigger handlers for CB-OS.
 */

/**
 * onEdit trigger entry point.
 * Routes to CRM and Workflow handlers.
 * @param {Object} e - Edit event
 */
function onEdit(e) {
  runWithErrorBoundary_('crm_on_edit', () => {
    if (typeof crmOnEdit_ === 'function') {
      crmOnEdit_(e);
    }
  });
  runWithErrorBoundary_('workflow_on_edit', () => {
    if (typeof workflowOnEdit === 'function') {
      workflowOnEdit(e);
    }
  });
}
