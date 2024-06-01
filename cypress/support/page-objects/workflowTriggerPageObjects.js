import {DealsPageSelectors,WorkflowTriggerPageSelectors} from "../element-selectors";
import { GlobalObjects }  from "../page-objects";
import {staticData} from "../../fixtures/staticData"


const $GlobalObjects = new GlobalObjects();
const randomString = $GlobalObjects.generateRandomString(5,'abcdefghijklmnopqrstuvwxyz0123456789');

const newWorkflowName = "Workflow: " + randomString;
const selectedStageIndex = 1
const selectedStage = staticData.stages[selectedStageIndex];

export class WorkflowTriggerPageObjects {

    navigateToWorkflowTriggerPage(){
        cy.visit(`${Cypress.env("baseURL")}/my-profile/workflow-templates/`);
        cy.get('h2').contains('Workflow Templates').should('be.visible');
    }

    selectStage(optionIndex){
        $GlobalObjects.clickElement(WorkflowTriggerPageSelectors.stageDropdownField);
        $GlobalObjects.clickElement(WorkflowTriggerPageSelectors.stageOptions,optionIndex);
        cy.wait(100);
    }

    addDelayStep(delayType,waitFor,numOfdays){
        $GlobalObjects.clickElement(WorkflowTriggerPageSelectors.addStepButton);
        //$GlobalObjects.clickElement(cy.get('ul').children('li').find('span').contains('Delay')); 
        cy.get('ul').children('li').find('span').contains('Delay').click();  
        $GlobalObjects.clickElement(WorkflowTriggerPageSelectors.delayTypeDropdownField);
        cy.wait(50);
        //$GlobalObjects.clickElement(cy.get(`div[class*="item-option"][title="${delayType}"]`));
        cy.get(`div[class*="item-option"][title="${delayType}"]`).click();
        $GlobalObjects.clickElement(WorkflowTriggerPageSelectors.waitForDropdownField);
        cy.wait(50);
        //$GlobalObjects.clickElement(cy.get(`div[class*="item-option"][title="${waitFor}"]`));
        cy.get(`div[class*="item-option"][title="${waitFor}"]`).click();
        $GlobalObjects.clearAndType(WorkflowTriggerPageSelectors.waitForInputField,newWorkflowName)
    }

    createAndPublishWorkflow(delayType,waitFor,numOfdays){
        $GlobalObjects.clickElement(WorkflowTriggerPageSelectors.newButton);
        $GlobalObjects.clearAndType(WorkflowTriggerPageSelectors.workflowNameInputField,newWorkflowName);
        this.selectStage(selectedStageIndex);
        this.addDelayStep(delayType,waitFor,numOfdays);
        $GlobalObjects.clickElement(WorkflowTriggerPageSelectors.saveWorkflowButton);
        $GlobalObjects.clickElement(WorkflowTriggerPageSelectors.workflowPublishToggle);
        cy.wait(100);
        WorkflowTriggerPageSelectors.workflowPublishToggle().should('have.attr','aria-checked','true')
    }


  
  


  }