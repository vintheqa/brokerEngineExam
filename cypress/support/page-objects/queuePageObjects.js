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

    searchTask(taskName){
        $GlobalObjects.clearAndType(QueuePageSelectors.taskSearchInputField,taskName);
        cy.wait(500);
    }

    exportTask(){
        $GlobalObjects.clickElement(QueuePageSelectors.moreActionsButton);
        cy.wait(100);
        cy.intercept('POST', `${Cypress.env("baseURL")}/rad-api/report-status-poll/`).as('exportFile');
        $GlobalObjects.clickElement(QueuePageSelectors.exportToExcelButton);
        cy.wait('@exportFile').then((exportFileAPI) => {
            expect(exportFileAPI.response.statusCode).to.eq(200);
          });
    }

    checkTaskExcelFile(taskName,priority,dueDate,assignee,createdDate){
        const downloadFolder = Cypress.config('downloadsFolder');
        cy.deleteDownloadsFolder();
        cy.task('createFolder',downloadFolder);
        cy.task('findLatestXlsx', downloadFolder).then((downloadedFilename) => {
            cy.readFile(downloadedFilename, 'binary', { timeout: 15000 }).then((fileContent) => {
                cy.task('parseXlsx', { filePath: downloadedFilename }).then((jsonData) => {
                    // Ensure the file was parsed correctly and contains data
                    expect(jsonData.length).to.be.greaterThan(0);
        
                const headers = jsonData[0];
                const expectedHeaders = ['Name','Priority','Date Due','Assignee Name', 'Created At'];
                expectedHeaders.forEach(header => {
                    expect(headers).to.include(header);
                });
        
                // Find the index of the specific columns to validate
                const headerIndices = expectedHeaders.map(header => headers.indexOf(header));
                headerIndices.forEach(index => {
                    expect(index).to.be.greaterThan(-1); // Ensure header exists
                });
        
                // Validate specific row values for the columns
                jsonData.slice(1).forEach(row => {
                    const rowValues = headerIndices.map(index => row[index]);
                    const [nameFromExcel, priorityNameFromExcel, dateDue, assigneeNameFromExcel, createdAt] = rowValues;

                    const dueDateFromExcel = new Date(dateDue);
                    const createdDateFromExcel = $GlobalObjects.formatDate(createdAt)
                    const expectedDate1 = new Date(dueDate);
                    const expectedDate2 = $GlobalObjects.formatDate(createdDate); 

                    // Validate values
                    expect(nameFromExcel).to.eql(taskName);
                    expect(priorityNameFromExcel).to.eql(priority);
                    expect(dueDateFromExcel).to.eql(expectedDate1);
                    expect(assigneeNameFromExcel).to.eql(assignee);
                    expect(createdDateFromExcel).to.eql(expectedDate2);

                    });
                });
            });
        });
    }

    
  }