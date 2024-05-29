import {LeadsPageSelectors} from "../../support/element-selectors";
import { GlobalObjects }  from "../../support/page-objects";
import {staticData} from "../../fixtures/staticData"
import { timeout } from "async";

const $GlobalObjects = new GlobalObjects();
const selectedBroker = staticData.brokerList[$GlobalObjects.randomIndexWithExclusion(0,staticData.brokerList)];
const selectedFirstName = staticData.firstNames[$GlobalObjects.randomIndexWithExclusion(staticData.firstNames)];
const selectedLastName = staticData.lastNames[$GlobalObjects.randomIndexWithExclusion(staticData.lastNames)];
const selectedStageIndex = $GlobalObjects.randomIndexWithExclusion(staticData.stages)
const selectedStage = staticData.stages[selectedStageIndex];
const selectedLender = staticData.lenders[$GlobalObjects.randomIndexWithExclusion(staticData.lenders)];
const selectedTeam = staticData.teams[$GlobalObjects.randomIndexWithExclusion(staticData.teams)];
const randomString = $GlobalObjects.generateRandomString(5,'abcdefghijklmnopqrstuvwxyz0123456789');
const newApplicantEmail = `test+${randomString}@brokerengine.com.au`;
const newApplicantMobileNum = $GlobalObjects.generateRandomString(9,'0123456789');


export class LeadsPageObjects {
     LeadsPageSelectors

    selectBroker(){
        $GlobalObjects.typeAndEnter(LeadsPageSelectors.brokerInputField,selectedBroker);
    }

    addNewApplicant(){
        $GlobalObjects.typeAndEnter(LeadsPageSelectors.applicantInputField);
        $GlobalObjects.waitForElement(LeadsPageSelectors.newApplicantFirstNameInputField);
        $GlobalObjects.clearAndType(LeadsPageSelectors.newApplicantFirstNameInputField,selectedFirstName);
        $GlobalObjects.clearAndType(LeadsPageSelectors.newApplicantLastNameInputField,selectedLastName);
        $GlobalObjects.clearAndType(LeadsPageSelectors.newApplicantEmailInputField,newApplicantEmail);
        $GlobalObjects.clearAndType(LeadsPageSelectors.newApplicantMobileNumberInputField,newApplicantMobileNum);
        $GlobalObjects.clickElement(LeadsPageSelectors.addApplicantButton);
    }

    selectStage(){
        $GlobalObjects.clickElement(LeadsPageObjects.selectStage);
        $GlobalObjects.clickElement(LeadsPageObjects.stageOptions,selectedStageIndex);
    }

    selectLender(){
        $GlobalObjects.typeAndEnter(LeadsPageSelectors.lenderInputField,selectedLender);
    }

    selectTeam(){
        $GlobalObjects.typeAndEnter(LeadsPageSelectors.assignedTeamInputField,selectedTeam);
    }
  
  }