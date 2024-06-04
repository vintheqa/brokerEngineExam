const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { removeDirectory } = require('cypress-delete-downloads-folder');

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
        createFolder(folderPath) {
          if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath, { recursive: true });
          }
          return null;
      },
        findLatestXlsx(directory) {
          const files = fs.readdirSync(directory);
          const xlsxFiles = files.filter(file => file.endsWith('.xlsx'));

          if (xlsxFiles.length === 0) {
              throw new Error('No .xlsx files found in the specified directory');
          }

          // Find the latest .xlsx file by modified time
          const latestFile = xlsxFiles
              .map(file => ({
                  file,
                  time: fs.statSync(path.join(directory, file)).mtime.getTime()
              }))
              .sort((a, b) => b.time - a.time)[0].file;

          return path.join(directory, latestFile);
      },
        parseXlsx({ filePath }) {
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            return XLSX.utils.sheet_to_json(sheet, { header: 1 });
        },  
        removeDirectory 
    });
    },
    supportFile: "cypress/support/e2e.{js,jsx,ts,tsx}",
    specPattern: "cypress/e2e/*.spec.cy.js",
    watchForFileChanges: false,
  },
});
