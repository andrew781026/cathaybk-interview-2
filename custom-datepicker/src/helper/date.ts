// helper function
import dayjs from 'dayjs';

export const getWeekArray = (date: dayjs.Dayjs): dayjs.Dayjs[] => {
  const startOfWeek = date.startOf('week');
  return Array.from({ length: 7 }).map((_, index) =>
    startOfWeek.add(index, 'day')
  );
};

export const getMonthWeekArray = (lookingMonth: dayjs.Dayjs): dayjs.Dayjs[] => {
  const startWeek = dayjs(lookingMonth).startOf('week');
  return Array.from({ length: 5 }).map((_, index) =>
    startWeek.add(index * 7, 'day')
  );
};
