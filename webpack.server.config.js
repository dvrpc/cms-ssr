/*eslint-env node*/
const nodeExternals = require("webpack-node-externals");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
require("babel-polyfill");

module.exports = merge(baseConfig, {
  entry: {
    server: ["babel-polyfill", "./server.js"],
  },
  target: "node",
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  externals: [nodeExternals()],
});
