import { LoginPageObjects, DealsPageObjects }  from "../support/page-objects"
const $LoginPageObjects = new LoginPageObjects();
const $DealsPageObjects = new DealsPageObjects();


before(() => {
  $LoginPageObjects.login();
});


describe('Broker Engine Exam', () => {

  it('Create a loan (deal) application', () => {
    $DealsPageObjects.createDeal();
    //$DealsPageObjects.validateDealDetails();
  })

  
})

