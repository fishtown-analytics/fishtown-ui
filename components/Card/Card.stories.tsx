import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button } from '../Button/Button';

import { Card, CardProps } from './Card';

export default {
  title: 'Components/Card',
  component: Card,
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;
Template.argTypes = {};

export const Basic = Template.bind({});
Basic.args = {
  // need to add more children for storybook example
  // children: <Button />,
};
