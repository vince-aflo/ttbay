/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    fontFamily: {
      sans: ['Work Sans', 'sans-serif']
    },
    borderRadius: {
      'full': '9999px',
      'lg': '0.5rem',
      'xlg': '1.5rem',
    },
    colors: {
      'black': '#000',
      'green': '#bdff00',
      'lightgreen': 'rgba(189, 255, 0, 0.95)',
      'orange': '#ffd6bb',
      'violet': '#b0b0ff',
      'blue': '#b8ffee',
      'bg-blue': 'rgba(184, 255, 238, 0.2)',
      'grey': '#6d6e71',
      'lightgrey': '#ededed',
      'transwhite': 'rgba(255, 255, 255, 0.95)',
      'white': '#fff',
      'red': '#f00',
      'slate' : 'rgb(248 250 252)'
    },
    extend: {},
  },
  plugins: [],
}
