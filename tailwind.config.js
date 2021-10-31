module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary' : '#12b48b',
        'primary-dark' : '#11a47f',
        'secondary' : '#13273E',
        'secondary-dark' : '#0F2030'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
