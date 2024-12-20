import React, {useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import dayjs, {Dayjs} from 'dayjs';

const noop = () => {
};

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
        background-color: #e6e6e6;
    }
`;

const DayButton = styled.button<{
    isToday?: boolean;
    isActive?: boolean;
    isNonCurrentMonth?: boolean
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

interface DatePickerProps {
    // defaultStartDate?: Date | string;
    // defaultEndDate?: Date;
    disabledDate?: (date: Date) => boolean;
    onDateChange?: (startDate?: Date, endDate?: Date) => void;
}

// helper function
const getWeekArray = (date: dayjs.Dayjs): dayjs.Dayjs[] => {
    const startOfWeek = date.startOf('week');
    return Array.from({length: 7}).map((_, index) => startOfWeek.add(index, 'day'));
};

const getMonthWeekArray = (lookingMonth: dayjs.Dayjs): dayjs.Dayjs[] => {
    const startWeek = dayjs(lookingMonth).startOf('week');
    return Array.from({length: 5}).map((_, index) => startWeek.add(index * 7, 'day'));
};

// React Component
const DatePicker: React.FC<DatePickerProps> = (props) => {

    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [lookingMonth, setLookingMonth] = useState<Dayjs>(dayjs().startOf('month'));

    const title = useMemo(() => dayjs(lookingMonth).format('YYYY-MM'), [lookingMonth]);
    const dateArray = useMemo(() => getMonthWeekArray(dayjs(lookingMonth)).map(startOfWeek => getWeekArray(startOfWeek)), [lookingMonth]);

    useEffect(() => {
        // props.onDateChange(startDate, endDate);
        return noop;
    }, [startDate, endDate]);

    const prevMonth = () => setLookingMonth(dayjs(lookingMonth).add(-1, "month"));
    const nextMonth = () => setLookingMonth(dayjs(lookingMonth).add(1, "month"));
    const pickDate = (target: Dayjs) => () => {
        if (!startDate) return setStartDate(target.toDate());
        else if (startDate && target.isBefore(startDate, 'day')) return setStartDate(target.toDate());
        else return setEndDate(target.toDate());
    };

    const checkIsActive = (target: Dayjs) => {
        if (startDate && !endDate) return target.isSame(startDate, 'day');
        else if (startDate && target.isSame(startDate, 'day')) return true;
        else if (endDate && target.isSame(endDate, 'day')) return true;
        else if (startDate && endDate) return target.isAfter(startDate, 'day') && target.isBefore(endDate, 'day');
        else return false;
    }

    return (
        <Layout key={title}>
            <Header>
                <MonthSelect onClick={prevMonth}>&lt;</MonthSelect>
                <span>{title}</span>
                <MonthSelect onClick={nextMonth}>&gt;</MonthSelect>
            </Header>
            {
                dateArray.map((weekArray, index) => (
                    <div key={`${title}-${index}`} style={{display: 'flex', flexWrap: 'wrap'}}>
                        {
                            weekArray.map(day => (
                                <DayButton
                                    key={day.format('YYYY-MM-DD')}
                                    isToday={day.isSame(new Date(), 'd')}
                                    isActive={checkIsActive(day)}
                                    isNonCurrentMonth={!day.isSame(lookingMonth, 'month')}
                                    onClick={pickDate(day)}
                                    disabled={props.disabledDate ? props.disabledDate(day.toDate()) : false}
                                >
                                    {day.format('D日')}
                                </DayButton>
                            ))
                        }
                    </div>
                ))
            }
        </Layout>
    );
};

export default DatePicker;
