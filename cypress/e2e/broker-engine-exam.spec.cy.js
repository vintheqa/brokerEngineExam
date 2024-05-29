import { LoginPageObjects }  from "../support/page-objects"
const $LoginPageObjects = new LoginPageObjects();

before(() => {
  $LoginPageObjects.login();
});

describe('Broker Engine Exam', () => {

  it('Create a loan (deal) application', () => {

  })
})