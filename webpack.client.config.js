/*eslint-env node*/
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  entry: {
    main: "./components/index.js",
  },
  target: "web",
});
