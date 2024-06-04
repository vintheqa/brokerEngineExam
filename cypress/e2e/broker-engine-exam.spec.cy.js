import { LoginPageObjects, DealsPageObjects, WorkflowTriggerPageObjects, BoardsPageObjects, GlobalObjects, QueuePageObjects }  from "../support/page-objects"
const $LoginPageObjects = new LoginPageObjects();
const $DealsPageObjects = new DealsPageObjects();
const $WorkflowTriggerPageObjects = new WorkflowTriggerPageObjects();
const $BoardsPageObjects = new BoardsPageObjects();
const $QueuePageObjects = new QueuePageObjects();
const $GlobalObjects = new GlobalObjects();

const randomString = $GlobalObjects.generateRandomString(5,'abcdefghijklmnopqrstuvwxyz0123456789');

beforeEach(() => {
  $LoginPageObjects.login();
});

describe('Broker Engine Exam', () => {

  it('Create a loan (deal) application', () => {
    $DealsPageObjects.createDeal();
    $DealsPageObjects.validateDealDetails();
  })

  it('Create a workflow trigger', () => {
    const brokerId = 25
    const clientId = "617"
    const currentBoardStage = 316
    const brokerLenderId = "307"
    const newWorkflowName = "Workflow: " + randomString;
    $WorkflowTriggerPageObjects.navigateToWorkflowTriggerPage();
    $WorkflowTriggerPageObjects.createAndPublishWorkflow('Period of Time','Business Days','5','2 Prepare for Submission',newWorkflowName);
    $DealsPageObjects.createAPIDealAndNavigateViaURL(brokerId,clientId,currentBoardStage,brokerLenderId)
    $DealsPageObjects.updateDealStage('2 Prepare for Submission');
    $WorkflowTriggerPageObjects.validateTriggeredWorkflowDelay(newWorkflowName,'Delay','Period of Time',5,'Business Days')
  })

  it('Test Re-ordering of board', () => {
    const newBoardName = "Board: " + randomString;
    $BoardsPageObjects.navigateToBoardPage();
    $BoardsPageObjects.createBoardAndReorderToTop(newBoardName);
    $BoardsPageObjects.checkBoardTilePosition(0,newBoardName);
  })

  it('BONUS POINT - Creating a task', () => {
    const currentDate = $GlobalObjects.generateFormattedDate(0,'DD/MM/YYYY');
    const newTaskName = "Task: " + randomString;
    const dateDDMMYYYY = $GlobalObjects.generateFormattedDate(30,'DD/MM/YYYY');
    const dateDDMMMYYYY = $GlobalObjects.generateFormattedDate(30,'DD MMM YYYY');

    $QueuePageObjects.navigateToQueuePage();
    $QueuePageObjects.createAndValidatedCreatedTask(newTaskName,'Cara Mooney','Medium',dateDDMMYYYY,dateDDMMMYYYY,'Task Description');
    $QueuePageObjects.searchTask(newTaskName);
    $QueuePageObjects.exportTask(newTaskName);
    cy.wait(1000);
    $QueuePageObjects.checkTaskExcelFile(newTaskName,'Medium',dateDDMMYYYY,'Cara Mooney',currentDate);

  })

})

