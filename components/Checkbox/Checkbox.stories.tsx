import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Checkbox, CheckboxProps } from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
Template.argTypes = {};

export const Basic = Template.bind({});
Basic.args = {
  isCheckedDefault: false,
  isDisabled: false,
  children: '',
  name: undefined,
  id: undefined,
};
Basic.argTypes = {
  isChecked: { control: { disable: true } },
};

export const Programmatic = Template.bind({});
Programmatic.args = {
  ...Basic.args,
  isChecked: false,
};
Programmatic.argTypes = {
  name: { control: { disable: true } },
  id: { control: { disable: true } },
  isDisabled: { control: { disable: true } },
  isCheckedDefault: { control: { disable: true } },
};
