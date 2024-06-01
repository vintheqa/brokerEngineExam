import { LoginPageObjects, DealsPageObjects, WorkflowTriggerPageObjects }  from "../support/page-objects"
import { DealsAPI }  from "../support/api-requests"
const $LoginPageObjects = new LoginPageObjects();
const $DealsPageObjects = new DealsPageObjects();
const $WorkflowTriggerPageObjects = new WorkflowTriggerPageObjects();
const $DealsAPI = new DealsAPI();
let newDealId
let loginCookie
let loginToken


before(() => {
 [loginCookie,loginToken] = $LoginPageObjects.loginAndGetToken();
});


describe('Broker Engine Exam', () => {

  it('Create a loan (deal) application', () => {
    $DealsPageObjects.createDeal();
    $DealsPageObjects.validateDealDetails();
  })

  it.only('Create a test for workflow trigger', () => {
    $WorkflowTriggerPageObjects.navigateToWorkflowTriggerPage();
    $WorkflowTriggerPageObjects.createAndPublishWorkflow('Period of Time','Business days','5');
    newDealId = $DealsAPI.createDealAPI(loginCookie,loginToken);
    $DealsPageObjects.navigateToDealViaUrl(newDealId);
    $DealsPageObjects.updateDealStage(1);

  })

  
})

