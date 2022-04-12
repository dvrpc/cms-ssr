module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Public Sans", "Roboto", "sans-serif"],
      },
      colors: {
        dvrpcBlue: "#14698e",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
