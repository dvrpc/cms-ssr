/*eslint-env node*/
require("babel-polyfill");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const postcssPresetEnv = require("postcss-preset-env");
const tailwindCss = require("tailwindcss");

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
  devtool: "inline-source-map",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})]
  },
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
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        // Loads images into CSS and Javascript files
        test: /\.jpg$/,
        use: ["url-loader"]
      },
      {
        // Loads CSS into a file when you import it via Javascript
        // Rules are set in MiniCssExtractPlugin
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                postcssPresetEnv({
                  browsers: "ie 11, >0.5% in US",
                  features: {
                    "nesting-rules": true
                  }
                }),
                tailwindCss
              ]
            }
          }
        ]
      },
      {
        test: /\.graphql$/,
        use: ["raw-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: "./index.html",
      excludeChunks: ["server"]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
