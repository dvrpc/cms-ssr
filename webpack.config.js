/*eslint-env node*/
require("babel-polyfill");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    main: ["babel-polyfill", "./server.js"]
  },
  target: "node",
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false // and __filename return blank or /
  },
  externals: [nodeExternals()],
  output: {
    publicPath: "/",
    filename: "[name].js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarning: true,
          failOnError: false,
          failOnWarning: false
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.graphql$/,
        use: ["raw-loader"]
      }
    ]
  },
  plugins: []
};
