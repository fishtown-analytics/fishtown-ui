import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Card, CardProps } from './Card';
import { InputList } from '../InputList/InputList';

export default {
  title: 'Components/Card',
  component: Card,
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;
Template.argTypes = {};

export const Basic = Template.bind({});
Basic.args = {
  children: <InputList values={['This is a card', 'with an input list on it']}/>,
};
