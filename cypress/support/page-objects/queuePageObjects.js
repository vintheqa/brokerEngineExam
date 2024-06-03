import {QueuePageSelectors} from "../element-selectors";
import { GlobalObjects }  from ".";

const $GlobalObjects = new GlobalObjects();
const path = require('path');

export class QueuePageObjects {

    navigateToQueuePage(){
        cy.visit(`${Cypress.env("baseURL")}/queue/`);
        $GlobalObjects.waitForElement(QueuePageSelectors.addTaskButton)
    }

    inputTaskName(taskName){
        $GlobalObjects.clickElement(QueuePageSelectors.taskNameInputButton);
        cy.wait(100)
        $GlobalObjects.clearAndType(QueuePageSelectors.taskNameInputField,taskName);
        cy.wait(100);
    }

    selectAssignee(assigneeName){
        $GlobalObjects.clickElement(QueuePageSelectors.selectAssigneeButton);
        $GlobalObjects.clearAndType(QueuePageSelectors.assigneeSearchField,assigneeName);
        cy.wait(100);
        cy.get('div[class*="_choices"]').find('input[type="radio"]').eq(0).click();
        cy.wait(100);
    }

    selectPriority(priority){
        $GlobalObjects.clickElement(QueuePageSelectors.selectPriorityButton);
        cy.wait(100)
        if(priority === 'Low'){
            $GlobalObjects.clickElement(QueuePageSelectors.lowPriorityRadioButton);
        } else if(priority === 'Medium'){
            $GlobalObjects.clickElement(QueuePageSelectors.mediumPriorityRadioButton);
        } else if(priority === 'High'){
            $GlobalObjects.clickElement(QueuePageSelectors.highPriorityRadioButton);
        } else if(priority === 'Critical'){
            $GlobalObjects.clickElement(QueuePageSelectors.criticalPriorityRadioButton);
        }
        cy.wait(100);
    }

    inputDueDate(dueDate){
        $GlobalObjects.clickElement(QueuePageSelectors.selectDueDateButton);
        cy.wait(100)
        $GlobalObjects.clearAndType(QueuePageSelectors.dateInputField,dueDate);
        $GlobalObjects.clickElement(QueuePageSelectors.saveDateButton);
        cy.wait(100);
    }

    inputDescription(description){
        $GlobalObjects.clickElement(QueuePageSelectors.enterDescriptionButton);
        cy.wait(100)
        $GlobalObjects.clearAndType(QueuePageSelectors.descriptionTextBox,description);
        cy.wait(100);
    }

    createAndValidatedCreatedTask(taskName,assigneeName,priority,dueDateDDMMYYYY,dueDateDDMMMYYYY,description){
        cy.intercept('POST', `${Cypress.env("baseURL")}/rad-api/be_core.task/`).as('createTask');
        $GlobalObjects.clickElement(QueuePageSelectors.addTaskButton);
        this.inputTaskName(taskName);
        this.selectAssignee(assigneeName);
        this.selectPriority(priority);
        this.inputDueDate(dueDateDDMMYYYY);
        this.inputDescription(description)
        $GlobalObjects.clickElement(QueuePageSelectors.createTaskButton);
        cy.wait('@createTask').then((createTaskAPI) => {
            expect(createTaskAPI.response.statusCode).to.eq(201);
            let createdTaskId = createTaskAPI.response.body.id;
    
            //validate on side drawer
            cy.get('form').find('div[data-testid="queueTaskFormHeader-name"]')
                .find('span').contains(taskName).should('be.visible');
            cy.get('form').find('span').contains(assigneeName).should('be.visible');
            cy.get('form').find('span[data-testid="priorityFormatter-priority"]')
                .contains(priority).should('be.visible');
            cy.get('form').find('div[data-testid="queueTaskForm-dueDate"]').find('span')
                .contains(dueDateDDMMMYYYY).should('be.visible');
            cy.get('form').find('p').contains(description).should('be.visible');
            $GlobalObjects.clickElement(QueuePageSelectors.closeSliderButton);

            //validate on list table
            cy.get(`div[data-test-taskid="${createdTaskId}"]`).find('div[data-testid="queue-cell-name"]')
                .find('span').contains(taskName).should('be.visible');
            cy.get(`div[data-test-taskid="${createdTaskId}"]`).find('div[data-testid="queue-cell-priority"]')
                .find('span').contains(priority).should('be.visible');    
            cy.get(`div[data-test-taskid="${createdTaskId}"]`).find('div[data-testid="queue-cell-dateDue"]')
                .find('span').contains(dueDateDDMMYYYY).should('be.visible');    
            
          });

    }

    exportCreatedTask(taskName){
        cy.get('div[data-testid="queue-cell-name"]').find('span').contains(taskName).parent('span').parent('div').prev('div').find('input[type="checkbox"]').click();
        $GlobalObjects.clickElement(QueuePageSelectors.moreActionsButton);
        cy.wait(100);
        $GlobalObjects.clickElement(QueuePageSelectors.exportToExcelButton);
    }

    checkExcelFile(){
        const downloadFolder = Cypress.config('downloadsFolder');
        const downloadedFilename = path.join(downloadFolder, 'tasks.xlsx'); // Replace with your actual file name

        cy.readFile(downloadedFilename, 'binary', { timeout: 15000 }).then((fileContent) => {
            cy.task('parseXlsx', { filePath: downloadedFilename }).then((jsonData) => {
                // Perform your validation
                expect(jsonData.length).to.be.greaterThan(0);
                expect(jsonData[0]).to.include.members(['Header1', 'Header2']); // Replace with actual headers
                expect(jsonData[1]).to.include.members(['Value1', 'Value2']); // Replace with actual expected values
            });
        });
    }

  }