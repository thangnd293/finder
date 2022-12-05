/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const renderSpacings = () => {
  const spacing = {
    full: '100%',
    fit: 'fit-content',
    3.6: '36px',
    'control-panel-height': '87px',
  };

  // 1px --> 20px | 1px 2px 3px 4px,...
  for (let i = 1; i <= 20; i++) {
    spacing[`${i / 10}`] = `${i}px`;
  }
  // 0px --> 100px | 0px 5px 10px 15px,...
  for (let i = 0; i < 10; i += 0.5) {
    spacing[i] = `${i * 10}px`;
  }
  // 100px --> 1000px | 100px 110px 120px,...
  for (let i = 10; i < 100; i++) {
    spacing[i] = `${i * 10}px`;
  }
  return spacing;
};

const minWidth = {
  'control-panel-min': '325px',
};

const maxWidth = {
  'control-panel-max': '375px',
};

const colors = {
  primary: '#ff4458',
  'primary-a11y': '#d6002f',

  base: '#21262e',
  'text-secondary': '#505965',
  'text-error': '#c62c1e',
  white: '#ffffff',

  black: '#000000',
  'blue-05': '#eff8ff',
  'blue-10': '#e3f4ff',
  'blue-15': '#d5eeff',
  'blue-20': '#abd9ff',
  'blue-30': '#78bdff',
  'blue-40': '#47a1ff',
  'blue-50': '#1786ff',
  'blue-60': '#106bd5',
  'blue-70': '#0a53ac',
  'blue-80': '#053c82',
  'blue-90': '#022658',
  'blue-95': '#00132e',
  'gradient-end': '#ff6036',
  'gradient-start': '#fd267a',
  'fuchsia-05': '#fff1ff',
  'fuchsia-10': '#ffe2ff',
  'fuchsia-15': '#ffd4ff',
  'fuchsia-20': '#ffc5ff',
  'fuchsia-30': '#fa93fb',
  'fuchsia-40': '#ed4ee7',
  'fuchsia-50': '#e010cd',
  'fuchsia-60': '#b80ba5',
  'fuchsia-70': '#91067e',
  'fuchsia-80': '#690359',
  'fuchsia-90': '#410136',
  'fuchsia-95': '#2d0025',
  'gold-05': '#fff8db',
  'gold-10': '#fff2bf',
  'gold-15': '#ffe8a5',
  'gold-20': '#f7d472',
  'gold-30': '#e6af16',
  'gold-40': '#c1920f',
  'gold-50': '#ae830c',
  'gold-60': '#896707',
  'gold-70': '#644a03',
  'gold-80': '#513c02',
  'gold-90': '#2c2000',
  'gold-95': '#191300',
  'gray-05': '#f8f8f9',
  'gray-10': '#f0f2f4',
  'gray-15': '#e9ebee',
  'gray-20': '#d4d8de',
  'gray-30': '#b9bfc8',
  'gray-40': '#939ba7',
  'gray-50': '#7c8591',
  'gray-60': '#656e7b',
  'indicator-green': '#2df187',
  like: '#129e68',
  rewind: '#cd7105',

  'overlay-default': 'rgba(0, 0, 0, 0.56)',
  'background-icon-button-overlay': 'rgba(17, 20, 24, 0.8)',
  'background-tapping': 'rgba(0, 0, 0, 0.24)',
  'border-go-down': 'rgba(0, 0, 0, 0.04)',
  'background-loading': '#fa6f6880',
  current: 'currentColor',
  transparent: 'transparent',
};

const fontSize = {
  DEFAULT: '16px',
  12: '12px',
  14: '14px',
  16: '16px',
  18: '18px',
  20: '20px',
  26: '26px',
  32: '32px',
};

const spacing = renderSpacings();

const boxShadow = {
  xs: '0 5px 10px rgb(0 0 0 / 20%)',
  sm: '0 0 45px rgb(0 0 0 / 20%)',
  md: 'rgba(101, 110, 123, 0.12) 0px 2px 6px 0px',
  lg: 'rgba(0, 0, 0, 0.08) 0px 0px 8px 0px',
  avatar: '0 2px 5px 0 rgba(17, 20, 24, 0.16)',
  'go-down': '0 2px 4px rgba(0, 0, 0, 0.1),0 8px 20px rgba(0, 0, 0, 0.1)',
};

const borderRadius = {
  DEFAULT: '4px',
  2: '2px',
  4: '4px',
  8: '8px',
  test: '16px',
  full: '9999px',
};

const screens = {
  md: '896px',
  lg: '1024px',
  'ex-lg': '1280px',
};

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    spacing,
    colors,
    screens,
    fontSize,
    boxShadow,
    borderRadius,
    extend: {
      borderWidth: {
        3: '3px',
      },
      maxWidth,
      minWidth,
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('not-last', '&:not(:last-child)');
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scroll-hidden': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
