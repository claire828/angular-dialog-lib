const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Alegreya Sans'],
        title: ['Inter', 'sans-serif'],
        decotitle: ['Raleway', 'sans-serif'],
      },
      letterSpacing: {
        x: '.2rem',
        xl: '.4rem',
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
      },
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        success: '#38c172',
        danger: '#ef4444',
        warning: '#f6993f',
        dark: '#22292f',
        white: '#ffffff',
        transparent: 'transparent',
      },
    },
  },
  plugins: [
    require('postcss-import'),
    require('postcss-nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};

/*
  colors: {
        primary: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1', // Base primary
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
        secondary: {
          100: '#fff9db',
          200: '#fff3b8',
          300: '#ffed94',
          400: '#ffe771',
          500: '#ffed4a', // Base secondary
          600: '#e6d442',
          700: '#ccbb3a',
          800: '#b3a232',
          900: '#99892a',
        },
        success: {
          100: '#e6f9f0',
          200: '#ccefe1',
          300: '#b3e5d2',
          400: '#99dbc3',
          500: '#38c172', // Base success
          600: '#32ae67',
          700: '#2b9b5c',
          800: '#248851',
          900: '#1d7546',
        },
        danger: {
          100: '#fce8e6',
          200: '#f9d1cc',
          300: '#f5bab3',
          400: '#f2a399',
          500: '#e3342f', // Base danger
          600: '#cc2f2a',
          700: '#b52a24',
          800: '#9e251f',
          900: '#871f1a',
        },
        warning: {
          100: '#fff4e6',
          200: '#ffeacc',
          300: '#ffdfb3',
          400: '#ffd599',
          500: '#f6993f', // Base warning
          600: '#de8939',
          700: '#c67932',
          800: '#ae692c',
          900: '#965926',
        },
        dark: {
          100: '#e6e6e7',
          200: '#ccccce',
          300: '#b3b3b6',
          400: '#99999d',
          500: '#22292f', // Base dark
          600: '#1f252a',
          700: '#1c2125',
          800: '#181d20',
          900: '#15191b',
        },
        white: {
          100: '#ffffff',
          200: '#ffffff',
          300: '#ffffff',
          400: '#ffffff',
          500: '#ffffff', // Base white
          600: '#e6e6e6',
          700: '#cccccc',
          800: '#b3b3b3',
          900: '#999999',
        },
        transparent: 'transparent',
      }, */
