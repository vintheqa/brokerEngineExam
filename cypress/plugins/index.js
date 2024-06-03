const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

module.exports = (on, config) => {
    on('task', {
        parseXlsx({ filePath }) {
            const workbook = XLSX.readFile(filePath);
            const sheetNames = workbook.SheetNames;
            const sheet = workbook.Sheets[sheetNames[0]];
            return XLSX.utils.sheet_to_json(sheet, { header: 1 });
        }
    });
};
