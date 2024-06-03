const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 20000,
  numTestsKeptInMemory: 0,
  env:{
    baseURL: "https://dev3.brokerengine.com.au",
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        parseXlsx({ filePath }) {
            const workbook = XLSX.readFile(filePath);
            const sheetNames = workbook.SheetNames;
            const sheet = workbook.Sheets[sheetNames[0]];
            return XLSX.utils.sheet_to_json(sheet, { header: 1 });
        }
    });
    },
    supportFile: "cypress/support/e2e.{js,jsx,ts,tsx}",
    specPattern: "cypress/e2e/*.spec.cy.js",
    watchForFileChanges: false,
  },
});
