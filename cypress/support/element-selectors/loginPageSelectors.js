export const LoginPageSelectors = {
    emailInputField: () => cy.get('input[data-testid="loginForm-emailField"]'),
    passwordInputField: () => cy.get('input[data-testid="loginForm-passwordField"]'),
    loginButton: () => cy.get('button[type="submit"]').children('span').contains('Login'),
}