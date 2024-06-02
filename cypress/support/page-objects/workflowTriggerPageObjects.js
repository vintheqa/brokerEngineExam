import {WorkflowTriggerPageSelectors} from "../element-selectors";
import { GlobalObjects }  from "../page-objects";

const $GlobalObjects = new GlobalObjects();


export class WorkflowTriggerPageObjects {

    navigateToWorkflowTriggerPage(){
        cy.visit(`${Cypress.env("baseURL")}/my-profile/workflow-templates/`);
        cy.get('h2').contains('Workflow Templates').should('be.visible');
    }

    selectStage(stageName){
        $GlobalObjects.clickElement(WorkflowTriggerPageSelectors.stageDropdownField);
        WorkflowTriggerPageSelectors.stageOptions().children('div').children('span').contains(`${stageName}`).click();
        cy.wait(100);
    }

    addDelayStep(delayType,waitFor,numOfdays){
        $GlobalObjects.clickElement(WorkflowTriggerPageSelectors.addStepButton);
        cy.get('ul').children('li').find('span').contains('Delay').click();  
        $GlobalObjects.clickElement(WorkflowTriggerPageSelectors.delayTypeDropdownField);
        cy.wait(50);
        cy.get(`div[class*="item-option"][title="${delayType}"]`).click();
        $GlobalObjects.clickElement(WorkflowTriggerPageSelectors.waitForDropdownField);
        cy.wait(50);
        cy.get(`div[class*="item-option"][title="${waitFor}"]`).click();
        $GlobalObjects.clearAndType(WorkflowTriggerPageSelectors.waitForInputField,numOfdays)
    }

    createAndPublishWorkflow(delayType,waitFor,numOfdays,stageName,workflowName){
        cy.intercept('POST', `${Cypress.env("baseURL")}/rad-api/be_workflows.customworkflow/`).as('createWorkflow');
        $GlobalObjects.clickElement(WorkflowTriggerPageSelectors.newButton);
        $GlobalObjects.clearAndType(WorkflowTriggerPageSelectors.workflowNameInputField,workflowName);
        this.selectStage(stageName);
        this.addDelayStep(delayType,waitFor,numOfdays);
        $GlobalObjects.clickElement(WorkflowTriggerPageSelectors.saveWorkflowButton);
        cy.wait('@createWorkflow').then((createWorkflowAPI) => {
            expect(createWorkflowAPI.response.statusCode).to.eq(201);
            const cookieVal = createWorkflowAPI.request.headers.cookie;
            const csrfToken = cookieVal.split(';').find(cookie => cookie.includes('csrftoken')).split('=')[1];
            let apiCookie = JSON.stringify(cookieVal);
            let apiToken = JSON.stringify(csrfToken);
            cy.writeFile('cypress/fixtures/cookies.json', apiCookie);
            cy.writeFile('cypress/fixtures/token.json', apiToken);
          });
        $GlobalObjects.clickElement(WorkflowTriggerPageSelectors.workflowPublishToggle);
        cy.wait(100);
        WorkflowTriggerPageSelectors.workflowPublishToggle().should('have.attr','aria-checked','true')
    }


    validateTriggeredWorkflowDelay(workflowName,stepType,delayType,waitFor,isBusinessDays){
        WorkflowTriggerPageSelectors.workflowInprogress().find('div').children('strong').contains(workflowName);
        WorkflowTriggerPageSelectors.workflowInprogress().find('div').children('strong').contains(workflowName).click();
        cy.get('div[role="dialog"]').find('div[name="config[0].type"]').find('span').contains(stepType).should('be.visible');
        cy.get('div[role="dialog"]').find('div[name="config[0].config.delayType"]').find('span').contains(delayType).should('be.visible');
        cy.get('div[role="dialog"]').find(`input[name="config[0].config.delayDays"][value="${waitFor}"]`).should('be.visible');
        cy.get('div[role="dialog"]').find('div[name="config[0].config.isBusinessDays"]').find('span').contains(isBusinessDays).should('be.visible');
    }

  }