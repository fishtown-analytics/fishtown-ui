const path = require('path');

module.exports = {
  stories: [
    '../docs/**/*.stories.mdx',
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.css$/i,
      use: ['postcss-loader'],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
};
