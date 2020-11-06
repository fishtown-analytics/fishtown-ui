import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Select, SelectOption } from './Select';
import selectEvent from 'react-select-event';

const options: SelectOption[] = [
  { label: 'Test 1', value: 'test-1' },
  { label: 'Test 2', value: 'test-2' },
];
const voidChange = jest.fn();

describe('Component Select', (): void => {
  test('control is displayed', (): void => {
    const { queryByText } = render(<Select options={options} onChange={voidChange} />);
    expect(queryByText('Select...')).toBeDefined();
  });

  test('menu is displayed with configured options after a click', async () => {
    const { queryByText, getByText } = render(
      <Select options={options} onChange={voidChange} />
    );
    await selectEvent.openMenu(getByText('Select...'));
    expect(queryByText('Test 1')).toBeDefined();
    expect(queryByText('Test 2')).toBeDefined();
  });

  test('menu items can be selected', async () => {
    const handleChange: jest.Mock = jest.fn();
    const { getByText } = render(<Select options={options} onChange={handleChange} />);
    await selectEvent.select(getByText('Select...'), 'Test 1');
    expect(getByText('Test 1')).toBeDefined();
    expect(handleChange).toHaveBeenCalled();
    await selectEvent.select(getByText('Test 1'), 'Test 2');
    expect(getByText('Test 2')).toBeDefined();
    expect(handleChange).toHaveBeenCalledTimes(2);
  });
});

test('menu items can be filtered', async () => {
  const { getByText, queryByText, container } = render(
    <Select options={options} onChange={voidChange} />
  );
  await selectEvent.openMenu(getByText('Select...'));
  const input = container.getElementsByTagName('input')[0];
  fireEvent.change(input, { target: { value: 'Test 2' } });
  expect(queryByText('Test 1')).toBeNull();
  expect(container.getElementsByClassName('fui-select__option').length).toBe(1);
});

test('grouping labels are displayed if grouped select data is provided', async () => {
  const groupedOptions: SelectOption[] = [{ label: 'Group Test', options }];
  const { getByText, queryByText } = render(
    <Select options={groupedOptions} onChange={voidChange} />
  );
  await selectEvent.openMenu(getByText('Select...'));
  expect(queryByText('Group Test')).toBeDefined();
  expect(queryByText('2')).toBeDefined();
});

test('a grouping meta label is displayed if provided', async () => {
  const groupedOptions: SelectOption[] = [{ label: 'Group Test', options }];
  const { getByText, queryByText } = render(
    <Select
      options={groupedOptions}
      onChange={voidChange}
      groupingMetaLabel="Test Meta Label"
    />
  );
  await selectEvent.openMenu(getByText('Select...'));
  expect(queryByText('Group Test')).toBeDefined();
  expect(queryByText('Test Meta Label')).toBeDefined();
});
