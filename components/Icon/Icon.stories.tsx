import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Icon, IconProps } from './Icon';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

// @ts-ignore
const prefixes = Object.keys(library.definitions);
const icons = prefixes.reduce((allIcons, prefix) => {
  // @ts-ignore
  return [...allIcons, ...Object.keys(library.definitions[prefix])];
}, []);

export default {
  title: 'Components/Icon',
  component: Icon,
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />;
Template.argTypes = {};

export const Basic: Story<IconProps> = Template.bind({});
Basic.args = {
  icon: 'check',
  iconPrefix: 'fas',
  className: 'tw-text-teal-500',
};
Basic.argTypes = {
  icon: {
    control: {
      type: 'select',
      options: icons,
      default: Basic.args.icon,
    },
  },
  iconPrefix: { control: { type: 'select', options: prefixes } },
};
