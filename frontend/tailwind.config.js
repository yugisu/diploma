const colors = require('tailwindcss/colors')

const varColor = (varName) => ({ opacityVariable, opacityValue }) => {
  if (opacityValue !== undefined) {
    return `rgba(var(${varName}), ${opacityValue})`
  }

  if (opacityVariable !== undefined) {
    return `rgba(var(${varName}), var(${opacityVariable}, 1))`
  }

  return `rgb(var(${varName}))`
}

/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  purge: ['./src/**/*.{ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      bg: varColor('--color-bg'),
      text: varColor('--color-text'),
      gray: {
        50: '#f7fbfe',
        100: '#f2f6f9',
        200: '#ebeff2',
        300: '#dde1e4',
        400: '#babec1',
        500: '#9c9fa2',
        600: '#737679',
        700: '#5f6265',
        800: '#404345',
        DEFAULT: '#2f3336',
        900: '#1f2224',
      },
      primary: {
        50: '#fef4e7',
        100: '#fde5c2',
        200: '#fcd399',
        300: '#fbc170',
        400: '#fab452',
        500: '#f9a733',
        600: '#f89f2e',
        DEFAULT: '#f89f2e',
        700: '#f79627',
        800: '#f68c20',
        900: '#f57c14',
      },
      indigo: {
        50: '#edeefe',
        100: '#d1d4fc',
        200: '#b3b8fa',
        300: '#959bf8',
        400: '#7e85f7',
        500: '#6770f5',
        DEFAULT: '#6770f5',
        600: '#5f68f4',
        700: '#545df2',
        800: '#4a53f0',
        900: '#3941ee',
      },
      mint: {
        50: '#eafbf5',
        100: '#cbf5e5',
        200: '#a9efd4',
        300: '#86e8c2',
        400: '#6ce3b5',
        500: '#52dea8',
        DEFAULT: '#52dea8',
        600: '#4bdaa0',
        700: '#41d597',
        800: '#38d18d',
        900: '#28c87d',
      },
      lemon: {
        50: '#feffeb',
        100: '#fdffcd',
        200: '#fcffac',
        300: '#fbff8b',
        400: '#faff72',
        500: '#f9ff59',
        DEFAULT: '#f9ff59',
        600: '#f8ff51',
        700: '#f7ff48',
        800: '#f6ff3e',
        900: '#f5ff2e',
      },
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
    },
    extend: {
      fontSize: {
        lesser: ['0.85rem', '1.2rem'],
      },
      keyframes: {
        appear: {
          from: { opacity: 0.2 },
          to: { opacity: 1 },
        },
      },
      animation: {
        appear: 'appear 0.5s',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
