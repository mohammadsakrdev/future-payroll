/**
 * @function  [_getDaysInMonth] Function that gets the number of days in a month
 *
 * @param {Number} year - Year as number
 * @param {Number} month - Month as number
 * @returns {Number} numberOfDays
 */
_getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

/**
 * @function  [_isWorkDay] Function that calculates weather the day is work or not
 *
 * @param {Number} year - Year as number
 * @param {Number} month - Month as number
 * @param {Number} day - Day of month as number
 * @returns {Boolean} isWorkDay
 */
_isWorkDay = (year, month, day) => {
  const dayOfWeek = new Date(year, month, day).getDay();
  return dayOfWeek >= 0 && dayOfWeek <= 4; // Sun = 0, Sat = 6
};

/**
 * @function  [_getWorkDays] Function that gets work days of a month
 *
 * @param {Number} year - Year as number
 * @param {Number} month - Month as number
 * @param {Number} days - Month days as number
 * @returns {Array<Number>} workdays
 */
_getWorkDays = (year, month, days) => {
  let workdays = [];
  for (let i = 1; i <= days; i++) {
    if (_isWorkDay(year, month, i)) {
      workdays.push(i);
    }
  }
  return workdays;
};

/**
 * @function  [_getBonusPaymentDay] Function that gets the last working day in the month
 *
 * @param {Number} year - Year as number
 * @param {Number} month - Month as number
 * @param {Number} days - Month days as number
 * @returns {Number} lastWorkingDay
 */
_getLastWorkDay = (year, month, days) => {
  let lastWorkingDay = null;
  for (let i = days; i > 0; i--) {
    if (_isWorkDay(year, month, i)) {
      lastWorkingDay = new Date(year, month, i).toDateString();
      break;
    }
  }
  return lastWorkingDay;
};

/**
 * @function  [_getBonusPaymentDay] Function that calculates bonus pay date for a month
 *
 * @param {Number} year - Year in number format
 * @param {Number} month - Month in number format
 * @returns {Array<Object>} payroll
 */
_getBonusPaymentDay = (year, month) => {
  let bonusPaymentDay = '';
  if (_isWorkDay(year, month, 15)) {
    bonusPaymentDay = new Date(year, month, 15).toDateString();
  } else {
    const days = _getDaysInMonth(year, month);
    for (let i = 16; i <= days; i++) {
      const newDate = new Date(year, month, i);
      if (newDate.getDay() === 3) {
        bonusPaymentDay = newDate.toDateString();
        break;
      }
    }
  }
  return bonusPaymentDay;
};

/**
 * @function  [_getMonthPayroll] Function that calculates salary & bonus pay dates for one month
 *
 * @param {Number} year - Year in number format
 * @param {Number} month - Month in number format
 * @returns {Object} payroll
 */
_getMonthPayroll = (year, month) => {
  let current = new Date(year, month, 1);
  const days = _getDaysInMonth(current.getFullYear(), current.getMonth() + 1);
  const salaryPaymentDate = _getLastWorkDay(
    current.getFullYear(),
    current.getMonth(),
    days
  );
  let bonusPaymentDate = new Date(current);
  bonusPaymentDate.setMonth(bonusPaymentDate.getMonth() + 1);
  const bonusDate = _getBonusPaymentDay(
    bonusPaymentDate.getFullYear(),
    bonusPaymentDate.getMonth()
  );
  return {
    month: current.getMonth() + 1 + '-' + current.getFullYear(), //`${month}-${year}`,
    salaryPaymentDate,
    bonusDate
  };
};

/**
 * @function  [getFuturePayroll] Function that calculates salary & bonus pay dates for next 12 months
 *
 * @param {Number} year - Year in number format
 * @param {Number} month - Month in number format
 * @returns {Array<Object>} payroll
 */
module.exports = (year, month) => {
  let payroll = [];
  for (let i = 0; i <= 11; i++) {
    let current = new Date(year, month - 1, 1);
    current.setMonth(current.getMonth() + i);
    payroll.push(_getMonthPayroll(current.getFullYear(), current.getMonth()));
  }
  return payroll;
};
