#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: './payroll.csv',
  header: [
    { id: 'month', title: 'Month' },
    { id: 'salaryPaymentDate', title: 'SalaryPaymentDate' },
    { id: 'bonusDate', title: 'BonusDate' }
  ]
});

const getFuturePayroll = require('./logic/get-future-payroll');
console.log('@Start Command line');
program
  .version('1.0.0')
  .description(
    'Calculate Future payroll and bonus dates for the next 12 months'
  );

program
  .command('payroll <year> <month>')
  .alias('pay')
  .description(
    'Calculate Future payroll and bonus dates for the next 12 months'
  )
  .action((year, month) => {
    try {
      console.log('Starting Command execution', year, month);
      if (month < 1 || month > 12) {
        console.error('Month value should be between 1 and 12');
        process.exit();
      }
      const records = getFuturePayroll(year, month);
      csvWriter.writeRecords(records).then(() => {
        console.log('...Done');
      });
    } catch (err) {
      console.error(err);
    }
  });
// program.help();
program.parse(process.argv);
