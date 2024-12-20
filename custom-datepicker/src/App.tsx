import { useMemo, useState } from 'react';
import DatePicker from './component/DatePicker.tsx';
import dayjs from 'dayjs';

type DateRange = [Date | undefined, Date | undefined];

const useDateRange = (format: string = 'YYYY-MM-DD') => {
  const [dateRange, setDateRange] = useState<DateRange>();

  const startDate = useMemo(
    () => dateRange?.[0] && dayjs(dateRange?.[0]).format(format),
    [dateRange]
  );

  const endDate = useMemo(
    () => dateRange?.[1] && dayjs(dateRange?.[1]).format(format),
    [dateRange]
  );

  return {
    setDateRange,
    dateRange,
    startDate,
    endDate,
  };
};

function App() {
  const {
    setDateRange: setPickDateRange1,
    startDate: task1StartDate,
    endDate: task1EndDate,
  } = useDateRange();

  const {
    setDateRange: setPickDateRange2,
    startDate: task2StartDate,
    endDate: task2EndDate,
  } = useDateRange();

  return (
    <div className="flex flex-col gap-4">
      <div className="card p-3 rounded bg-gray-100 m-3 mr-auto flex flex-col">
        <p>起始日期：{task1StartDate}</p>
        <p>結束日期：{task1EndDate}</p>
      </div>
      <DatePicker
        key="Task1-current-month"
        limitStartDate={dayjs().startOf('month').toDate()}
        limitEndDate={dayjs().endOf('month').toDate()}
        onDateChange={(startDate, endDate) => {
          setPickDateRange1([startDate, endDate]);
        }}
      />
      <hr />
      <div className="card p-3 rounded bg-gray-100 m-3 mr-auto flex flex-col">
        <p>起始日期：{task2StartDate}</p>
        <p>結束日期：{task2EndDate}</p>
      </div>
      <DatePicker
        key="Task2-accross-month"
        onDateChange={(startDate, endDate) => {
          setPickDateRange2([startDate, endDate]);
        }}
      />
    </div>
  );
}

export default App;
