import dayjs from 'dayjs';
import { getWeekArray, getMonthWeekArray } from '@/helper/date';

describe('Helper Functions - Date', () => {
  describe('getWeekArray', () => {
    it('should return an array of 7 days representing the week of the given date', () => {
      // 假定使用 2024-12-18 當作輸入日期
      const weekArray = getWeekArray(new Date(2024, 11, 18));

      // 預期回傳日期為 7 天 = [ '2024-12-15' . '2024-12-16' . '2024-12-17' . '2024-12-18' . '2024-12-19 . '2024-12-20' . '2024-12-21' ]
      expect(weekArray).toHaveLength(7);

      weekArray.forEach((date, index) => {
        expect(date.format('YYYY-MM-DD')).toBe(
          dayjs(new Date(2024, 11, 15 + index)).format('YYYY-MM-DD')
        );
      });
    });
  });

  describe('getMonthWeekArray', () => {
    it('should return an array of 5 dates representing the start of each week in a given month', () => {
      // 假定使用 2024-12-18 當作輸入日期
      const monthWeekArray = getMonthWeekArray(new Date(2024, 11, 18));

      // 預期回傳日期為 5 週的第一天 = [ '2024-12-01' . '2024-12-08' . '2024-12-15' . '2024-12-22' . '2024-12-29' ]

      expect(monthWeekArray).toHaveLength(5);
      monthWeekArray.forEach((date, index) => {
        expect(date.format('YYYY-MM-DD')).toBe(
          dayjs(new Date(2024, 11, 1 + index * 7)).format('YYYY-MM-DD')
        );
      });
    });
  });
});
