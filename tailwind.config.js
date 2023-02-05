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
      'green': '#bdff00',
      'orange': '#ffd6bb',
      'violet': '#b0b0ff',
      'blue': '#b8ffee',
      'bg-blue': 'rgba(184, 255, 238, 0.2)',
      'grey': '#6d6e71',
      'lightgrey': '#ededed',
    },
    extend: {},
  },
  plugins: [],
}
