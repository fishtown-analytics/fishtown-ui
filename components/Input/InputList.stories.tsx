import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { InputList, InputListProps } from './InputList';

export default {
  title: 'Components/InputList',
  component: InputList,
} as Meta;

const Template: Story<InputListProps> = (args) => <InputList {...args} />;
Template.argTypes = {};

export const Basic = Template.bind({});
Basic.args = {
    values: ["value 1", "value 2", "value 3"],
    isDisabled: false,
};