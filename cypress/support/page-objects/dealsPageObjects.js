import {DealsPageSelectors} from "../element-selectors";
import { GlobalObjects }  from ".";
import {staticData} from "../../fixtures/staticData"

const $GlobalObjects = new GlobalObjects();
const randomString = $GlobalObjects.generateRandomString(5,'abcdefghijklmnopqrstuvwxyz0123456789');

const newDealName = "Deal No.: " + randomString;
const selectedBroker = staticData.brokerList[0];
const selectedFirstName = staticData.firstNames[$GlobalObjects.randomIndexWithExclusion(staticData.firstNames)];
const selectedLastName = staticData.lastNames[$GlobalObjects.randomIndexWithExclusion(staticData.lastNames)];
const completeName = selectedFirstName + " " + selectedLastName;
const selectedStageIndex = 1
const selectedStage = staticData.stages[selectedStageIndex];
const selectedLender = staticData.lenders[$GlobalObjects.randomIndexWithExclusion(staticData.lenders)];
const selectedTeam = staticData.teams[$GlobalObjects.randomIndexWithExclusion(staticData.teams)];
const newApplicantEmail = `test+${randomString}@brokerengine.com.au`;
const newApplicantMobileNum = '491' + $GlobalObjects.generateRandomString(6,'23456789');

export class DealsPageObjects {

    navigateToDealViaUrl(dealId){
        cy.visit(`${Cypress.env("baseURL")}/applications/${dealId}/activity/`);
    }

    selectBroker(){
        $GlobalObjects.clickElement(DealsPageSelectors.brokerInputField);
        console.log(selectedBroker)
        $GlobalObjects.clearAndType(DealsPageSelectors.brokerInputField,selectedBroker);
        cy.wait(100)
        cy.get('div').contains(`${selectedBroker}`).click({force:true})
        cy.wait(100);
    }

    addNewApplicant(){
        $GlobalObjects.typeAndEnter(DealsPageSelectors.applicantInputField);
        $GlobalObjects.waitForElement(DealsPageSelectors.newApplicantFirstNameInputField);
        $GlobalObjects.clearAndType(DealsPageSelectors.newApplicantFirstNameInputField,selectedFirstName);
        $GlobalObjects.clearAndType(DealsPageSelectors.newApplicantLastNameInputField,selectedLastName);
        $GlobalObjects.clearAndType(DealsPageSelectors.newApplicantEmailInputField,newApplicantEmail);
        $GlobalObjects.clearAndType(DealsPageSelectors.newApplicantMobileNumberInputField,newApplicantMobileNum);
        $GlobalObjects.clickElement(DealsPageSelectors.addApplicantButton);
        cy.wait(100);
    }

    selectStage(optionIndex){
        $GlobalObjects.clickElement(DealsPageSelectors.stageDropdownField);
        $GlobalObjects.clickElement(DealsPageSelectors.stageOptions,optionIndex);
        cy.wait(100);
    }

    updateDealStage(optionIndex){
        $GlobalObjects.clickElement(DealsPageSelectors.dealHeaderStage);
        $GlobalObjects.clickElement(DealsPageSelectors.stageOptions,optionIndex);
        cy.wait(100);
    }

    selectLender(selectedValue){
        $GlobalObjects.clearAndType(DealsPageSelectors.lenderInputField,selectedValue);
        cy.wait(100);
        cy.get('div').contains(`${selectedValue}`).click({force:true})
        cy.wait(100);
    }

    selectTeam(selectedValue){
        $GlobalObjects.clearAndType(DealsPageSelectors.assignedTeamInputField,selectedValue);
        cy.wait(200);
        cy.get(`div[title="${selectedValue}"]`).click({force:true})
        cy.wait(100);
    }

    createDeal(){
        $GlobalObjects.clickElement(DealsPageSelectors.newButton);
        $GlobalObjects.waitForElement(DealsPageSelectors.dealNameInputField)
        $GlobalObjects.clearAndType(DealsPageSelectors.dealNameInputField,newDealName);
        this.selectBroker();
        this.addNewApplicant();
        this.selectStage(selectedStageIndex);
        this.selectLender(selectedLender);
        $GlobalObjects.clickElement(DealsPageSelectors.addDealButton);
    }
  
    validateDealDetails(){
        DealsPageSelectors.dealHeaderDealName().contains(newDealName);
        DealsPageSelectors.dealHeaderBroker().contains(selectedBroker);
        DealsPageSelectors.dealHeaderStage().invoke('text').should('include',`${selectedStage}`);
        DealsPageSelectors.dealHeader().find('span').contains(selectedLender);
        DealsPageSelectors.dealApplicantName().contains(completeName);
        DealsPageSelectors.dealApplicantEmail().find('a').contains(newApplicantEmail);
        DealsPageSelectors.dealApplicantMobileNum().find('a').invoke('text').should('include',`${newApplicantMobileNum}`);
    }

  }