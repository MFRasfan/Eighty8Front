/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#a21a17",
        // primary:"#ff464c",
        secondary:"#000000"
      },
    },
  },
  plugins: [],
}