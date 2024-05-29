import {LoginPageSelectors} from "../../support/element-selectors";
import { GlobalObjects }  from "../../support/page-objects";
import {userLogin} from "../../fixtures/userLogin"
import { timeout } from "async";

const $GlobalObjects = new GlobalObjects();

export class LoginPageObjects {

    login(){
        cy.visit(Cypress.env("baseURL"));
        $GlobalObjects.waitForElement(LoginPageSelectors.emailInputField);
        $GlobalObjects.clearAndType(LoginPageSelectors.emailInputField,userLogin.email);
        $GlobalObjects.clearAndType(LoginPageSelectors.passwordInputField,userLogin.password);
        $GlobalObjects.clickElement(LoginPageSelectors.loginButton);
        cy.url().should('eq','https://dev4.brokerengine.com.au/boards/deal/',{timeout: 4000})
    }
  
  }