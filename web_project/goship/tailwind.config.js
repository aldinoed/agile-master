/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
});
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        orange: "#F77D00",
        dimBlack: "rgba(0, 0, 0, 0.7)", 
        black: "#000000",
        cream:"#FDE5CC",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    
    screens: {
      xs: "0px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};