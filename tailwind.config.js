const { colors, fontSize } = require('./old-default-theme');

module.exports = {
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        ...colors,
        current: 'currentColor',
        transparent: {
          DEFAULT: 'var(--color-transparent)',
        },
        white: {
          ...colors.white,
          DEFAULT: 'var(--color-white)',
        },
        teal: {
          ...colors.teal,
          500: 'var(--color-teal-500)',
          700: 'var(--color-teal-700)',
        },
        orange: {
          ...colors.orange,
          DEFAULT: 'var(--color-orange-500)',
        },
        gray: {
          ...colors.gray,
          lighter: 'var(--color-gray-lighter)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          dark: 'var(--color-gray-dark)',
        },
        red: {
          ...colors.red,
          DEFAULT: 'var(--color-red)',
        },
      },
      fontSize,
    },
  },
};
