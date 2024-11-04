/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: {
        100: '#0d1117 !important',
        200: '#010409 !important',
        300: 'rgb(60 60 60) !important',
      },
      secondary: {
        100: '#e6edf3 !important',
        200: '#ebf1f7 !important',
      },
      link: {
        100: '#2d43ed !important'
      },
      red: {
        100: '#f51c18 !important'
      },
      gray: {
        100: '#b1b3b1 !important'
      }
    },
    extend: {},
  },
  plugins: [],
}