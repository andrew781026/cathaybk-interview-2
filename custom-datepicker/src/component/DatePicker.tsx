import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import dayjs, { Dayjs } from 'dayjs';
import { noop } from '@/helper/noop.ts';
import { getMonthWeekArray, getWeekArray } from '@/helper/date.ts';

// Styled Components
const Layout = styled.div`
  width: 350px;
  height: 240px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 350px;
  height: 44px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MonthSelect = styled.button`
  width: 44px;
  height: 44px;
  background-color: white;
  border: 1px solid #ccc;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${(props) => (props.disabled ? undefined : '#e6e6e6')};
  }
`;

const DayButton = styled.button<{
  isToday?: boolean;
  isActive?: boolean;
  isNonCurrentMonth?: boolean;
}>`
  width: 50px;
  height: 36px;
  border: none;
  background-color: ${(props) => {
    if (props.isToday) return '#ffff76';
    else if (props.isActive) return '#006edc';
    else return 'white';
  }};
  color: ${(props) => {
    if (props.isNonCurrentMonth) return '#757575';
    else if (props.isActive && !props.isToday) return 'white';
    else return 'black';
  }};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: #e6e6e6;
  }
`;

export type DatePickerProps = {
  limitStartDate?: Date;
  limitEndDate?: Date;
  onDateChange?: (startDate?: Date, endDate?: Date) => void;
};

// React Component
const DatePicker: React.FC<DatePickerProps> = (props) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [lookingMonth, setLookingMonth] = useState<Dayjs>(
    dayjs().startOf('month')
  );

  const title = useMemo(
    () => dayjs(lookingMonth).format('YYYY-MM'),
    [lookingMonth]
  );
  const dateArray = useMemo(
    () =>
      getMonthWeekArray(dayjs(lookingMonth)).map((startOfWeek) =>
        getWeekArray(startOfWeek)
      ),
    [lookingMonth]
  );

  const checkDisabledDate = useCallback(
    (day: dayjs.Dayjs): boolean => {
      if (
        props.limitStartDate &&
        day.isBefore(dayjs(props.limitStartDate), 'day')
      )
        return true;
      else if (
        props.limitEndDate &&
        day.isAfter(dayjs(props.limitEndDate), 'day')
      )
        return true;
      else return false;
    },
    [props.limitStartDate, props.limitEndDate]
  );

  const isPrevDisabled = useMemo(() => {
    const limitStartDate = props.limitStartDate;
    const firstDayInViewMonth = dateArray[0][0];

    if (!limitStartDate) return false;

    if (!firstDayInViewMonth)
      throw new Error(
        'Ops... Something wrong !!! firstDayInViewMonth is undefined'
      );

    if (
      firstDayInViewMonth.isSame(limitStartDate, 'day') ||
      firstDayInViewMonth.isBefore(limitStartDate, 'day')
    )
      return true;
    else return false;
  }, [props.limitStartDate, lookingMonth]);

  const isNextDisabled = useMemo(() => {
    const limitEndDate = props.limitEndDate;
    const lastDayInViewMonth = dateArray?.at(-1)?.at(-1);

    if (!limitEndDate) return false;

    if (!lastDayInViewMonth)
      throw new Error(
        'Ops... Something wrong !!! lastDayInViewMonth is undefined'
      );

    if (
      lastDayInViewMonth.isSame(limitEndDate, 'day') ||
      lastDayInViewMonth.isAfter(limitEndDate, 'day')
    )
      return true;
    else return false;
  }, [props.limitEndDate, lookingMonth]);

  useEffect(() => {
    props.onDateChange?.(startDate, endDate);
    return noop;
  }, [startDate, endDate]);

  const prevMonth = () => setLookingMonth(dayjs(lookingMonth).add(-1, 'month'));
  const nextMonth = () => setLookingMonth(dayjs(lookingMonth).add(1, 'month'));
  const pickDate = (target: Dayjs) => () => {
    // 追加反選邏輯(不過 endDate 選擇 , 會違反題目要求 , 將其註解)
    // if (startDate && target.isSame(startDate, 'day'))
    //   return setStartDate(undefined);
    // if (endDate && target.isSame(endDate, 'day')) return setEndDate(undefined);

    if (!startDate) return setStartDate(target.toDate());
    if (startDate && target.isBefore(startDate, 'day'))
      return setStartDate(target.toDate());

    return setEndDate(target.toDate());
  };

  const checkIsActive = (target: Dayjs) => {
    if (startDate && !endDate) return target.isSame(startDate, 'day');
    else if (startDate && target.isSame(startDate, 'day')) return true;
    else if (endDate && target.isSame(endDate, 'day')) return true;
    else if (startDate && endDate)
      return (
        target.isAfter(startDate, 'day') && target.isBefore(endDate, 'day')
      );
    else return false;
  };

  return (
    <Layout key={title}>
      <Header>
        <MonthSelect
          data-testid="prev-month"
          onClick={prevMonth}
          disabled={isPrevDisabled}
        >
          &lt;
        </MonthSelect>
        <span>{title}</span>
        <MonthSelect
          data-testid="next-month"
          onClick={nextMonth}
          disabled={isNextDisabled}
        >
          &gt;
        </MonthSelect>
      </Header>
      {dateArray.map((weekArray, index) => (
        <div
          key={`${title}-${index}`}
          style={{ display: 'flex', flexWrap: 'wrap' }}
        >
          {weekArray.map((day) => (
            <DayButton
              key={day.format('YYYY-MM-DD')}
              data-testid={day.format('YYYY-MM-DD')}
              isToday={day.isSame(new Date(), 'd')}
              isActive={checkIsActive(day)}
              isNonCurrentMonth={!day.isSame(lookingMonth, 'month')}
              onClick={pickDate(day)}
              disabled={checkDisabledDate(day)}
            >
              {day.format('D日')}
            </DayButton>
          ))}
        </div>
      ))}
    </Layout>
  );
};

export default DatePicker;
