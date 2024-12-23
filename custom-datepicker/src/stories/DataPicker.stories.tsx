import type { Meta, StoryObj } from '@storybook/react';

import dayjs from 'dayjs';
import DatePicker, { DatePickerProps } from '@/component/DatePicker.tsx';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {} as DatePickerProps,
};

export const LimitCurrentMonth: Story = {
  args: {
    limitStartDate: dayjs().startOf('month').toDate(),
    limitEndDate: dayjs().endOf('month').toDate(),
  } as DatePickerProps,
};
