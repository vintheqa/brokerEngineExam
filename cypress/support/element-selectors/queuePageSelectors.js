export const QueuePageSelectors = {
    addTaskButton: () => cy.get('button[data-testid="queue-addButton"]'),
    taskNameInputField: () => cy.get('input[placeholder="Write a task name"]'),
    addAssigneeButton: () => cy.get('button').children('span').contains('Select'),



}