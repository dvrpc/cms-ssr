require("@babel/polyfill");
require("ignore-styles");
require("@babel/register")({
  presets: ["@babel/env", "@babel/react", "@emotion/babel-preset-css-prop"],
});
require("./server");
