const dayjs = require('dayjs');

const getWeekArray = (date) => {
  const startOfWeek = date.startOf('week');
  return Array.from({ length: 7 }).map((_, index) =>
    startOfWeek.add(index, 'day')
  );
};
const getMonthWeekArray = (lookingMonth) => {
  const startWeek = lookingMonth.startOf('week');
  return Array.from({ length: 6 }).map((_, index) =>
    startWeek.add(index * 7, 'day')
  );
};

// getWeekArray(dayjs().add(-1, 'month').startOf('month')).forEach(day => console.log(day.format('YYYY-MM-DD')));
// getMonthWeekArray(dayjs().add(-1, 'month').startOf('month')).forEach(day => console.log(day.format('YYYY-MM-DD')));

getMonthWeekArray(dayjs().add(-1, 'month').startOf('month'))
  .map((date) => getWeekArray(date))
  .forEach((weekArr) =>
    weekArr.forEach((day) => console.log(day.format('YYYY-MM-DD')))
  );
