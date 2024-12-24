import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import DatePicker from '@/component/DatePicker.tsx';

test('renders name', async () => {
  const { getByText, getByRole } = render(
    <DatePicker key="Task2-accross-month" />
  );

  await expect.element(getByText('Hello Vitest x1!')).toBeInTheDocument();
  await getByRole('button', { name: 'Increment ' }).click();

  await expect.element(getByText('Hello Vitest x2!')).toBeInTheDocument();
});
