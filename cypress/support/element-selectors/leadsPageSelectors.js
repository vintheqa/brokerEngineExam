export const LeadsPageSelectors = {
    newButton: () => cy.get('button[type="button"]').children('span').contains('New'),
    dealNameInputField: () => cy.get('input[id="newLoanApplication.name"]'),
    brokerInputField: () => cy.get('input[id="newLoanApplication.brokerId"]'),
    applicantInputField: () => cy.get('input[id="rc_select_14"]'),
    stageDropdownField: () => cy.get('span').contains('Select Stage'),
    stageOptions: () => cy.get('div[id*="rc_select_46_list"]'),
    lenderInputField: () => cy.get('input[id="rc_select_15"]'),
    assignedTeamInputField: () => cy.get('input[id="rc_select_16"]'),
    addDealButton: () => cy.get('button[type="button"]').children('span').contains('Add Deal'),
    cancelButton: () => cy.get('button[type="button"]').children('span').contains('Cancel'),

    newApplicantFirstNameInputField: () => cy.get('input[id="newLoanApplicationClientForm.contact.firstName"]'),
    newApplicantLastNameInputField: () => cy.get('input[id="newLoanApplicationClientForm.contact.lastName"]'),
    newApplicantEmailInputField: () => cy.get('input[id="newLoanApplicationClientForm.contact.email"]'),
    newApplicantMobileNumberInputField: () => cy.get('input[name="contact.mobilePhoneNumber"]'),

    addApplicantButton: () => cy.get('button[type="button"]').children('span').contains('Add Applicant'),

}