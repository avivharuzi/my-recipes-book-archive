module.exports = {
  important: true,
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans Pro'],
        cursive: ['Dancing Script'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
