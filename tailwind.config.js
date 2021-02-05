const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Public Sans", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        "2xl": "1600px",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
};
