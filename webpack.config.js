const glob = require("glob");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");

module.exports = (env, argv) => {
  return {
    entry: "./components/App.js",
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "main",
            test: /\.css$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new PurgecssPlugin({
        paths: () =>
          glob.sync(`${path.join(__dirname, "components")}/**/*`, {
            nodir: true,
          }),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [
                  require("cssnano")(),
                  require("postcss-preset-env")({
                    features: {
                      "nesting-rules": true,
                    },
                  }),
                ],
                minimize: true,
              },
            },
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@emotion/babel-preset-css-prop",
              ],
            },
          },
        },
      ],
    },
  };
};
