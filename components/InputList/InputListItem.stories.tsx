import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { InputListItem, InputListItemProps } from './InputListItem';

export default {
  title: 'Components/InputListItem',
  component: InputListItem,
} as Meta;

const Template: Story<InputListItemProps> = (args) => <InputListItem {...args} />;
Template.argTypes = {};

export const Basic = Template.bind({});
Basic.args = {
    value: "value",
    isDisabled: false,
    index: 1,
};
