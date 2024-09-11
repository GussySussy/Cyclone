/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        platinum: "#E2DCDE",
        old_rose: "#B97375",
        lavender: "#CEB1BE",
        raisin_black: "#2D2D34",
      },
      fontFamily: {
        singleDay: ["SingleDay_400Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
