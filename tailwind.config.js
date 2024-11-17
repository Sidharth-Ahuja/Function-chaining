/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: '#a5a5a5',
        customBlack: "#252525",
      },
    },
  },
  plugins: [],
};
