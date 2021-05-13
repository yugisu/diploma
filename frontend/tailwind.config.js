/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  purge: ['./src/**/*.{ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#ffa841',
      },
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
