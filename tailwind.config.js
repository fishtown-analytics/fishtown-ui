const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        ...colors,
        transparent: {
          default: 'var(--color-transparent)',
        },
        white: {
          ...colors.white,
          default: 'var(--color-white)',
        },
        teal: {
          ...colors.teal,
          500: 'var(--color-teal-500)',
          700: 'var(--color-teal-700)',
        },
        orange: {
          ...colors.orange,
          default: 'var(--color-orange-500)',
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
          default: 'var(--color-red)',
        },
      },
    },
  },
  // https://tailwindcss.com/docs/upcoming-changes
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  corePlugins: {
    // https://github.com/fishtown-analytics/dbt-cloud/issues/1948
    animation: false,
  }
};
