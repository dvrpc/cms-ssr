require("@babel/polyfill");
require("ignore-styles");
require("@babel/register")({
  presets: ["@babel/env", "@babel/react"],
});
require("./server");
