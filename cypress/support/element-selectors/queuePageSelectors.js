export const QueuePageSelectors = {
    addTaskButton: () => cy.get('button[data-testid="queue-addButton"]'),
    taskNameInputButton: () => cy.get('button').find('span').contains('Write a task name'),
    taskNameInputField: () => cy.get('input[placeholder="Write a task name"]'),
    selectAssigneeButton: () => cy.get('label[title="Assignee"]').parent('div').next('div').find('button').children('span').contains('Select'),
    assigneeSearchField: () => cy.get('input[placeholder="Find User"]'),
    selectPriorityButton: () => cy.get('label[title="Priority"]').parent('div').next('div').find('button'),
    lowPriorityRadioButton: ()=> cy.get('input[type="radio"][value="TaskPriority.LOW"]'),
    mediumPriorityRadioButton: ()=> cy.get('input[type="radio"][value="TaskPriority.MEDIUM"]'),
    highPriorityRadioButton: ()=> cy.get('input[type="radio"][value="TaskPriority.HIGH"]'),
    criticalPriorityRadioButton: ()=> cy.get('input[type="radio"][value="TaskPriority.CRITICAL"]'),
    selectDueDateButton: ()=> cy.get('div[data-testid="queueTaskForm-dueDate"]').find('button'),
    dateInputField: ()=> cy.get('input[name="date"][placeholder="DD/MM/YYYY"]'),
    saveDateButton: () => cy.get('button[type="button"]').children('span').contains('Save'),
    enterDescriptionButton: () => cy.get('button').children('span').contains('Enter Description'),
    descriptionTextBox: () => cy.get('div[data-fieldname="description"]').find('div[role="textbox"]'),
    createTaskButton: () => cy.get('button[type="submit"]').children('span').contains('Create task'),
    closeSliderButton: ()=> cy.get('button[data-testid="queueTaskFormHeader-closeSlider"]'),
    moreActionsButton: ()=> cy.get('button[data-testid="queueListMoreActions-actionButton"]'),
    exportToExcelButton: ()=> cy.get('span').contains('Export (.xls)'),



}