import type { Meta, StoryObj } from '@storybook/react';

import { userEvent, waitFor, within, expect, fn } from '@storybook/test';
import MockDate from 'mockdate';

import dayjs from 'dayjs';
import DatePicker, { DatePickerProps } from '@/component/DatePicker.tsx';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {} as DatePickerProps,

  // 模擬使用者行為 , 例如 : 點擊起始日 . 結束日
  play: async ({ mount }) => {
    /**
     * A:
     * 1. First click date to set it as start date value.
     * 2. Next click date is same as current select option or later than current
     * option will set it as end date value.
     * 3. Next click date is earlier than current option will reset start date
     * value.
     */
    MockDate.set('2024-12-25');

    // 👇 Render the component with the mocked date
    const datePicker = await mount();

    const dateToday = await datePicker.findByTestId('2024-12-25');
    await expect(dateToday).toHaveAttribute('data-today');

    // 點擊日期 -> 2024-12-18
    // expect = 2024-12-18 當作起始日被選擇
    const date20241218 = await datePicker.findByTestId('2024-12-18');
    await userEvent.click(date20241218);
    await expect(date20241218).toHaveAttribute('data-active');

    // 點擊日期 -> 2024-12-13
    // expect = 2024-12-13 當作起始日被選擇 & 2024-12-18 不再是被選擇的狀態
    const date20241213 = await datePicker.findByTestId('2024-12-18');
    await userEvent.click(date20241213);
    await expect(date20241213).toHaveAttribute('data-active');
    await expect(date20241218).toHaveAttribute('data-active'); // 2024-12-18 unselected

    // 點擊日期 -> 2024-12-21
    // expect = 2024-12-13 當作起始日被選擇 & 2024-12-21 當作結束日被選擇
    const date20241221 = await datePicker.findByTestId('2024-12-21');
    await userEvent.click(date20241221);
    await expect(date20241218).toHaveAttribute('data-active');
  },
};

export const LimitCurrentMonth: Story = {
  args: {
    limitStartDate: dayjs().startOf('month').toDate(),
    limitEndDate: dayjs().endOf('month').toDate(),
  } as DatePickerProps,

  // 模擬使用者行為 , 例如 : 點擊起始日 . 結束日
  // ref - https://storybook.js.org/docs/writing-tests/component-testing?renderer=react
  play: async ({ mount }) => {
    MockDate.set('2024-12-25');

    // 👇 Render the component with the mocked date
    const datePicker = await mount();

    const prevIcon = await datePicker.findByTestId('prev-month');
    await expect(prevIcon).toBeDisabled();

    const nextIcon = await datePicker.findByTestId('next-month');
    await expect(nextIcon).toBeDisabled();
  },
};
