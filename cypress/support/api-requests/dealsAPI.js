import { GlobalObjects }  from "../page-objects";
import {staticData} from "../../fixtures/staticData"
const $GlobalObjects = new GlobalObjects();

const randomString = $GlobalObjects.generateRandomString(5,'abcdefghijklmnopqrstuvwxyz0123456789');

const newDealName = "Deal No.: " + randomString;
const brokerId = 25
const clientId = "617"
const currentBoardStage = 316
const brokerLenderId = "307"

export class DealsAPI {

    createDealAPI(cookie,token) {
        const requestBody = {
          brokerId: brokerId,
          clientId: clientId,
          currentBoardStage: currentBoardStage,
          roles: [],
          brokerLenderId: brokerLenderId,
          name: newDealName
        };
      
        return cy.request({
          method: 'POST',
          url: `${Cypress.env("baseURL")}rad-api/be_core.loanapplication/`,
          headers: {
            'accept': 'application/json',
            'cookie': cookie,
            'referer': `${Cypress.env("baseURL")}boards/deal/`,
            'x-csrftoken': token,
            'x-requested-with': 'XMLHttpRequest'
          },
          body: requestBody
        }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property('id');
          const dealId = response.body.id;
          console.log(dealId);
          return dealId;
        });
      }
  }