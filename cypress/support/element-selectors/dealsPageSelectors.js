export const DealsPageSelectors = {
    newButton: () => cy.get('button[type="button"]').children('span').contains('New'),
    dealNameInputField: () => cy.get('input[id="newLoanApplication.name"]'),
    brokerInputField: () => cy.get('input[id="newLoanApplication.brokerId"]'),
    //brokerOptions: (selectedBroker) => cy.get(`div[title=${selectedBroker}]`),
    applicantInputField: () => cy.get('input[id="rc_select_2"]'),
    stageDropdownField: () => cy.get('span').contains('Select Stage'),
    stageOptions: () => cy.get('div[title="Select Stage"]'),
    lenderInputField: () => cy.get('div[name="brokerLenderId"]').find('input'),
    assignedTeamInputField: () => cy.get('div[name="assignedTeamId"]').find('input'),
    addDealButton: () => cy.get('button[type="button"]').children('span').contains('Add Deal'),
    cancelButton: () => cy.get('button[type="button"]').children('span').contains('Cancel'),

    newApplicantFirstNameInputField: () => cy.get('input[id="newLoanApplicationClientForm.contact.firstName"]'),
    newApplicantLastNameInputField: () => cy.get('input[id="newLoanApplicationClientForm.contact.lastName"]'),
    newApplicantEmailInputField: () => cy.get('input[id="newLoanApplicationClientForm.contact.email"]'),
    newApplicantMobileNumberInputField: () => cy.get('input[name="contact.mobilePhoneNumber"]'),

    addApplicantButton: () => cy.get('button[type="button"]').children('span').contains('Add Applicant'),

    dealHeader: () => cy.get('header[id="app-header"]'),
    dealHeaderDealName: () => cy.get('h1').find('span'),
    dealHeaderBroker: () => cy.get('span[data-testid="loanApplicationHeader-brokerName"]'),
    dealHeaderAssignedTeam: () => cy.get('span[data-testid="loanApplicationHeader-owner"]'),
    dealHeaderStage: () => cy.get('div[name="currentBoardStage"]').find('span[data-testid="stage-option-2"]'),
    dealApplicantName: () => cy.get('a[data-testid="sideMenu-client-name"]'),
    dealApplicantEmail: () => cy.get('div[data-testid="clientDetailsSummary-emailAddress"]'),
    dealApplicantMobileNum: () => cy.get('div[data-testid="clientDetailsSummary-phoneNumber"]'),
}