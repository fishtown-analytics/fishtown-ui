const { colors, fontSize } = require('./old-default-theme');

module.exports = {
  prefix: 'tw-',
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      opacity: ['disabled'],
    }
  },
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
        'dag-node-selected': 'var(--color-dag-node-selected)',
        'dag-node-exposure': {
          400: 'var(--color-dag-node-exposure-400)',
          500: 'var(--color-dag-node-exposure-500)',
          600: 'var(--color-dag-node-exposure-600)',
        },
        'dag-node-model': {
          400: 'var(--color-dag-node-model-400)',
          500: 'var(--color-dag-node-model-500)',
          600: 'var(--color-dag-node-model-600)',
        },
        'dag-node-test': {
          400: 'var(--color-dag-node-test-400)',
          500: 'var(--color-dag-node-test-500)',
          600: 'var(--color-dag-node-test-600)',
        },
        'dag-node-analysis': {
          400: 'var(--color-dag-node-analysis-400)',
          500: 'var(--color-dag-node-analysis-500)',
          600: 'var(--color-dag-node-analysis-600)',
        },
        'dag-node-source': {
          400: 'var(--color-dag-node-source-400)',
          500: 'var(--color-dag-node-source-500)',
          600: 'var(--color-dag-node-source-600)',
        },
        'dag-node-seed': {
          400: 'var(--color-dag-node-seed-400)',
          500: 'var(--color-dag-node-seed-500)',
          600: 'var(--color-dag-node-seed-600)',
        },
        'dag-node-snapshot': {
          400: 'var(color-dag-node-snapshot-400)',
          500: 'var(color-dag-node-snapshot-500)',
          600: 'var(color-dag-node-snapshot-600)',
        },
      },
      fontSize,
    },
  },
};
