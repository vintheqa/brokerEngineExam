export const WorkflowTriggerPageSelectors = {
    newButton: () => cy.get('a[data-testid="workflow-create"]'),
    workflowNameInputField: () => cy.get('input[id="be_workflows.customworkflow.name"]'),
    stageDropdownField: () => cy.get('div[data-testid="test-workflow-stage"]').find('input'),
    stageOptions: () => cy.get('div[title="Select Stage"]'),
    addStepButton: () => cy.get('button[data-testid="workflowAddNodeButton-button"]'),
    delayTypeDropdownField: () => cy.get('div[name="nodesConfig[0].config.delayType"]').find('input'),
    waitForDropdownField: () => cy.get('div[name="nodesConfig[0].config.isBusinessDays"]').find('input'),
    waitForInputField: () => cy.get('input[data-testid="workflow-delayWait"]'),
    saveWorkflowButton: () => cy.get('button[type="submit"]').children('span').contains('Save'),
    workflowPublishToggle: () => cy.get('button[data-testid="workflow-publish"]'),
    workflowInprogress: () => cy.get('li[data-testid*="workflow"][data-test-status="inProgress"]'),


}