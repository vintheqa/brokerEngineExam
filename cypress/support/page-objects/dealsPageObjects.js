import {DealsPageSelectors} from "../element-selectors";
import { GlobalObjects }  from "../page-objects";
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

    createAPIDealAndNavigateViaURL(brokerId,clientId,currentBoardStage,brokerLenderId){
        let dealId
        let createDealCsrfToken 
        let createDealcookieValue 
  
        cy.readFile('cypress/fixtures/cookies.json').then((data) => {
            createDealcookieValue = data
        });
  
        cy.readFile('cypress/fixtures/token.json').then((data) => {
            createDealCsrfToken = data
        });
  
        const requestBody = {
          brokerId: brokerId,
          clientId: clientId,
          currentBoardStage: currentBoardStage,
          roles: [],
          brokerLenderId: brokerLenderId,
          name: newDealName,
        };
  
        cy.getCookies().then(() => {
            cy.request({
                method: 'POST',
                url: `${Cypress.env("baseURL")}/rad-api/be_core.loanapplication/`,
                headers: {
                'Cookie': createDealcookieValue, 
                'X-Csrftoken': createDealCsrfToken,
                'Content-Type': 'application/json',
                'referer': `${Cypress.env("baseURL")}/boards/deal/`,
                },
                body: requestBody
            }).then((response) => {
                expect(response.status).to.eq(201);
                dealId = response.body.fundingPosition.loanId;
                cy.visit(`${Cypress.env("baseURL")}/applications/${dealId}/activity/`);
                cy.writeFile('cypress/fixtures/cookies.json', '');
                cy.writeFile('cypress/fixtures/token.json', '');
            })
        })
  
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

    updateDealStage(stageName){
        $GlobalObjects.clickElement(DealsPageSelectors.dealHeaderStage);
        DealsPageSelectors.stageOptions().children('div').children('span').contains(`${stageName}`).click();
        cy.wait(500);
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
        cy.intercept('POST', `${Cypress.env("baseURL")}/rad-api/be_core.loanapplication/`).as('createLoan');
        $GlobalObjects.clickElement(DealsPageSelectors.newButton);
        $GlobalObjects.waitForElement(DealsPageSelectors.dealNameInputField)
        $GlobalObjects.clearAndType(DealsPageSelectors.dealNameInputField,newDealName);
        this.selectBroker();
        this.addNewApplicant();
        this.selectStage(selectedStageIndex);
        this.selectLender(selectedLender);
        $GlobalObjects.clickElement(DealsPageSelectors.addDealButton);
        cy.wait('@createLoan').then((loanAPi) => {
            expect(loanAPi.response.statusCode).to.eq(201);
            const cookieVal = loanAPi.request.headers.cookie;
            const csrfToken = cookieVal.split(';').find(cookie => cookie.includes('csrftoken')).split('=')[1];
            let apiCookie = JSON.stringify(cookieVal);
            let apiToken = JSON.stringify(csrfToken);
            cy.writeFile('cypress/fixtures/cookies.json', apiCookie);
            cy.writeFile('cypress/fixtures/token.json', apiToken);
          });
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