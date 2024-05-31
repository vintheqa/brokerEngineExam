import {LoginPageSelectors,DealsPageSelectors} from "../../support/element-selectors";
import { GlobalObjects }  from "../../support/page-objects";
import {userLogin} from "../../fixtures/userLogin"

const $GlobalObjects = new GlobalObjects();

export class LoginPageObjects {

    login(){
        cy.visit(Cypress.env("baseURL"));
        $GlobalObjects.waitForElement(LoginPageSelectors.emailInputField);
        $GlobalObjects.clearAndType(LoginPageSelectors.emailInputField,userLogin.email);
        $GlobalObjects.clearAndType(LoginPageSelectors.passwordInputField,userLogin.password);
        $GlobalObjects.clickElement(LoginPageSelectors.loginButton);
        cy.url().should('include','/boards',{timeout: 4000})
        $GlobalObjects.waitForElement(DealsPageSelectors.newButton);
    }
  
  }