import { SelectOption, SelectProps } from './Select';

const options: SelectOption[] = [
  { value: '1', label: 'Value 1' },
  { value: '2', label: 'Value 2' },
  { value: '3', label: 'Value 3' },
  { value: '4', label: 'Value 4' },
  { value: '5', label: 'Value 5' },
  { value: '6', label: 'Value 6' },
];

export const descriptionOptions: SelectOption[] = options.map((item) => ({
  ...item,
  meta: `A description for ${item.label}`,
}));

export const groupedOptions: SelectOption[] = options.reduce<SelectOption[]>(
  (acc: SelectOption[], item: SelectOption) => {
    const even = 0 === parseInt(item?.value ?? '0', 10) % 2;
    const index = even ? 0 : 1;
    acc[index].options = [...acc[index].options, item];

    return acc;
  },
  [
    { label: 'Even Items', options: [] },
    { label: 'Odd Items', options: [] },
  ]
);

export const commonProps: SelectProps = {
  id: undefined,
  autoFocus: false,
  className: undefined,
  groupingMetaLabel: undefined,
  isDisabled: false,
  options,
  value: null,
  portal: false,
  error: undefined,
  onChange: undefined,
};
