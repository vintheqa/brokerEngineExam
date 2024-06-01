import {LoginPageSelectors,DealsPageSelectors} from "../../support/element-selectors";
import { GlobalObjects }  from "../../support/page-objects";
import {userLogin} from "../../fixtures/userLogin"

const $GlobalObjects = new GlobalObjects();

export class LoginPageObjects {

    loginAndGetToken(){
        let loginCookie;
        let loginToken;
        cy.intercept('POST', `${Cypress.env("baseURL")}/auth/2fa/login/`).as('login');
        cy.visit(Cypress.env("baseURL"));
        $GlobalObjects.waitForElement(LoginPageSelectors.emailInputField);
        $GlobalObjects.clearAndType(LoginPageSelectors.emailInputField,userLogin.email);
        $GlobalObjects.clearAndType(LoginPageSelectors.passwordInputField,userLogin.password);
        $GlobalObjects.clickElement(LoginPageSelectors.loginButton);

        cy.wait('@login').then((loginAPI) => {
            expect(loginAPI.response.statusCode).to.eq(200);
            loginCookie = loginAPI.request.headers['Cookie'];
            loginToken = loginAPI.request.headers['X-Csrftoken'];
          });
        console.log('cookie: '+loginCookie);
        console.log('token: '+loginToken);
        return [loginCookie,loginToken]

    }
  
  }