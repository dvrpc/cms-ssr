module.exports = {
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require("tailwindcss-alpha")({
      modules: {
        backgroundColors: true,
        textColors: true,
        borderColors: true,
      },
    }),
  ],
};
