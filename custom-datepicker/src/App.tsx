import {useState} from 'react'
import DatePicker from "./component/DatePicker.tsx";
import dayjs, {Dayjs} from 'dayjs';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col gap-4">
            <DatePicker
                disabledDate={current => !dayjs().isSame(current, 'month')}
            />
            <DatePicker/>
        </div>
    )
}

export default App
