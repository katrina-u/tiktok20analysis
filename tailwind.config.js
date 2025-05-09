/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      }, 
      colors: {
        theme1: '#A5BFCC',
        theme2: '#87aab2',
        theme3: '#A5BFCC',
        fontColor1: '#a8f5f3',
        fontColor2: '#4a4a4a',
      },
    },
  },
  plugins: [],
};
