# Date-Picker 元件

根據條件製作 Date-Picker

### install dependency

```shell
npm i 
```

### develop

```shell
npm run dev
```

### build

```shell
npm run build
```

## How to using DatePicker

#### limit current month can select

```tsx
<DatePicker
    limitStartDate={dayjs().startOf('month').toDate()}
    limitEndDate={dayjs().endOf('month').toDate()}
    onDateChange={(startDate, endDate) => {
        setPickDateRange1([startDate, endDate]);
    }}
/>
```

#### select as across month

```tsx
<DatePicker
    onDateChange={(startDate, endDate) => {
        setPickDateRange2([startDate, endDate]);
    }}
/>
```

### API

| Property       | Description                                     | Required | Type                 |
|----------------|-------------------------------------------------|----------|----------------------|
| limitStartDate | the start date can select                       | X        | Date                 |
| limitEndDate   | the end date can select                         | X        | Date                 |
| disabledDate   | Specify the date that cannot be selected        | X        | (date: Date) => boolean |
| onDateChange   | Callback when selected start or end date change | X        | (startDate?: Date, endDate?: Date) => void |

### More ?

- vitest to test react component


### Reference

- [利用 Chromatic + Storybook 來做 Component-Level 的 Visual Testing](https://www.cythilya.tw/2022/03/04/visual-testing-in-component-level-with-chromatic-and-storybook/)
- [Yann Braga | Component Testing with Storybook and Vitest | ViteConf 2024](https://www.youtube.com/watch?v=8t5wxrFpCQY)
- [Test your React hooks with Vitest efficiently](https://mayashavin.com/articles/test-react-hooks-with-vitest)
