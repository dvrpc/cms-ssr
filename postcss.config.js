module.exports = {
  plugins: [
    require("postcss-at-rules-variables"),
    require("postcss-each"),
    require("postcss-import"),
    require("postcss-for"),
    require("postcss-custom-properties"),
    require("postcss-calc")({ selectors: true }),
    require("tailwindcss"),
    require("postcss-nested"),
    require("postcss-preset-env")({ stage: 1 }),
    require("autoprefixer"),
  ],
};
