import {BoardPageSelectors} from "../element-selectors";
import { GlobalObjects }  from ".";

const $GlobalObjects = new GlobalObjects();

export class BoardsPageObjects {

    navigateToBoardPage(){
        cy.intercept('GET', `${Cypress.env("baseURL")}/rad-api/be_loan_board.loanboard/**`).as('getBoardList');
        cy.visit(`${Cypress.env("baseURL")}/my-profile/boards/`);
        cy.wait('@getBoardList').then((boardListAPI) => {
            expect(boardListAPI.response.statusCode).to.eq(200);
            const cookieVal = boardListAPI.request.headers.cookie;
            const csrfToken = cookieVal.split(';').find(cookie => cookie.includes('csrftoken')).split('=')[1];
            let apiCookie = JSON.stringify(cookieVal);
            let apiToken = JSON.stringify(csrfToken);
            cy.writeFile('cypress/fixtures/cookies.json', apiCookie);
            cy.writeFile('cypress/fixtures/token.json', apiToken);
          });

        cy.get('h2').contains('Boards and Stages').should('be.visible');
    }

    selectRandomBoardType(){
        $GlobalObjects.clickElement(BoardPageSelectors.boardTypeDropdownField);
        BoardPageSelectors.boardTypeOptions().then($div => {
            console.log($div.length)
            let selectedIndex =  $GlobalObjects.randomIndexWithExclusion($div);
            console.log(selectedIndex)
            $GlobalObjects.clickElement(BoardPageSelectors.boardTypeOptions,selectedIndex);
            BoardPageSelectors.boardTypeDropdownField().blur();
            cy.wait(100)
        });

        const maxAttempts = 10;

        for (let i = 0; i < maxAttempts; i++) {
            cy.get('body').then($body => {
                if ($body.find('div:contains("Loan board with this type already exists.")').length > 0) {
                    $GlobalObjects.clickElement(BoardPageSelectors.boardTypeDropdownField);
                    BoardPageSelectors.boardTypeOptions().then($div => {
                        console.log($div.length)
                        let selectedIndex =  $GlobalObjects.randomIndexWithExclusion($div);
                        console.log(selectedIndex)
                        $GlobalObjects.clickElement(BoardPageSelectors.boardTypeOptions,selectedIndex);
                        BoardPageSelectors.boardTypeDropdownField().blur();
                        cy.wait(100)
                    });
                } else if($body.find('div:contains("Loan board with this type already exists.")').length == 0) {
                  cy.wait(100);
                  return false;
                }
              });
            }
        }

    createBoardAndReorderToTop(boardName){
        let newBoardId
        let firstBoardId
        let reorderCsrfTokenValue 
        let reorderCookieValue 

        cy.readFile('cypress/fixtures/cookies.json').then((data) => {
            reorderCookieValue = data
          });
    
        cy.readFile('cypress/fixtures/token.json').then((data) => {
            reorderCsrfTokenValue = data
          });

        cy.intercept('POST', `${Cypress.env("baseURL")}/rad-api/be_loan_board.loanboard/`).as('createBoard');
        $GlobalObjects.clickElement(BoardPageSelectors.newButton);
        $GlobalObjects.clearAndType(BoardPageSelectors.boardTitleInputField,boardName);
        this.selectRandomBoardType();
        $GlobalObjects.clickElement(BoardPageSelectors.saveBoardButton);
        cy.wait('@createBoard').then((createBoardAPI) => {
            expect(createBoardAPI.response.statusCode).to.eq(201);
            newBoardId = createBoardAPI.response.body.id;
          });

        cy.intercept('GET', `${Cypress.env("baseURL")}/rad-api/be_loan_board.loanboard/**`).as('getFirstBoard');
        this.navigateToBoardPage();
        cy.wait('@getFirstBoard').then((boardListAPI) => {
            expect(boardListAPI.response.statusCode).to.eq(200);
            firstBoardId = boardListAPI.response.body.results[0].stageGroups[0].boardId;
          });
          


        cy.getCookies().then(() => {
            cy.request({
                method: 'PATCH',
                url: `${Cypress.env("baseURL")}/rad-api/be_loan_board.loanboard/${newBoardId}/reorder/`,
                headers: {
                //'cookie': reorderCookieValue, 
                'X-Csrftoken': reorderCsrfTokenValue,
                'Content-Type': 'application/json',
                'referer': `${Cypress.env("baseURL")}/my-profile/boards/`,
                },
                body: {
                    reorderRelativeTo: firstBoardId,
                    insertAfter : false
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })
    }

    checkBoardTilePosition(posIndex,boardName){
        cy.reload();
        BoardPageSelectors.boardTile().eq(posIndex).contains(boardName)
    }


}


