const program = require('commander');
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

program
  .version('1.0.0')
  .description(
    'Calculate Future payroll and bonus dates for the next 12 months'
  );

program
  .command('getFuturePayroll <year> <month>')
  .alias('calc')
  .description(
    'Calculate Future payroll and bonus dates for the next 12 months'
  )
  .action((year, month) => {
    try {
      const records = getFuturePayroll(year, month);
      csvWriter.writeRecords(records).then(() => {
        console.log('...Done');
      });
    } catch (err) {
      console.error(err);
    }
  });
program.help();
program.parse(process.argv);
