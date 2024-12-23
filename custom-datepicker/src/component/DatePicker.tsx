import React, { useEffect, useMemo, useState } from 'react';
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
  disabledDate?: (date: Date) => boolean;
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
    if (startDate && target.isSame(startDate, 'day'))
      return setStartDate(undefined);
    if (endDate && target.isSame(endDate, 'day')) return setEndDate(undefined);

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
        <MonthSelect onClick={prevMonth} disabled={isPrevDisabled}>
          &lt;
        </MonthSelect>
        <span>{title}</span>
        <MonthSelect onClick={nextMonth} disabled={isNextDisabled}>
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
              isToday={day.isSame(new Date(), 'd')}
              isActive={checkIsActive(day)}
              isNonCurrentMonth={!day.isSame(lookingMonth, 'month')}
              onClick={pickDate(day)}
              disabled={
                props.disabledDate ? props.disabledDate(day.toDate()) : false
              }
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
