export function TimeFormattingFromString(date) {
  const dateObject = new Date(date);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;

  const formattedTime = `${formattedHours}:${String(minutes).padStart(
    2,
    '0',
  )} ${amOrPm}`;

  return formattedTime;
}

export function dateToWeekdayDayMonth(date) {
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const dateObject = new Date(date);
  const weekDayOfDate = weekdays[dateObject.getDay()];
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;

  return { weekDayOfDate, day, month };
}

export function dateIntervalWithWords(startDate, endDate) {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const startDay = startDateObj.getDate();
  const startMonth = dateToMonthbyWords(startDateObj);
  const endDay = endDateObj.getDate();
  const endMonth = dateToMonthbyWords(endDateObj);

  return {
    startDate: `${startMonth} ${startDay}`,
    endDate: `${endMonth} ${endDay}`,
  };
}

export function dateToMonthbyWords(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dateObj = new Date(date);
  return months[dateObj.getMonth()];
}
