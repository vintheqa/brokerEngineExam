export const BoardPageSelectors = {
    newButton: () => cy.get('a[href="/my-profile/boards/new/"]'),
    boardTitleInputField: () => cy.get('input[id="be_loan_board.loanboard.name"]'),
    boardTypeDropdownField: () => cy.get('div[name="boardType"]').find('input[id="be_loan_board.loanboard.boardType"]'),
    boardTypeOptions:() => cy.get('div[class="rc-virtual-list-holder-inner"]').children('div[class="ant-select-item ant-select-item-option"]'),
    saveBoardButton: () => cy.get('button[type="submit"]').children('span').contains('Save'),
    boardTile: ()=> cy.get('a[data-testid="userProfileBoardsList-boardName"]')



}