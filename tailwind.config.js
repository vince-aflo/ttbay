/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    fontFamily: {
      sans: ['Work Sans', 'sans-serif']
    },
    colors: {
      'black': '#000',
      'green': '#bdff00',
      'orange': '#ffd6bb',
      'violet': '#b0b0ff',
      'blue': '#b8ffee',
      'grey': '#6d6e71',
      'lightgrey': '#ededed',
      'white': '#fff'
    },
    extend: {},
  },
  plugins: [],
}
