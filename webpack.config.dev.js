const webpack = require("webpack");
const config = require("./webpack.config.base");

Object.assign(config, {
  entry: [config.entry],
  devtool: "cheap-module-eval-source-map",
  mode: "development",
  plugins: (config.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]),
});

module.exports = config;
