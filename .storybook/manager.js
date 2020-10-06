import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.light,
    brandTitle: 'Fishtown UI',
    brandUrl: 'https://fishtownanalytics.com',
    brandImage:
      'https://d33wubrfki0l68.cloudfront.net/83dbeb2b492dd8bcb504e82b4566b54d2af934cb/cb2d5/ui/img/logos/fishtown-gray.svg',
  },
});
