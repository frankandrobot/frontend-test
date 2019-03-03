const webpack = require("webpack");
const config = require("./webpack.config.base");

Object.assign(config, {
  entry: [config.entry],
  devtool: "cheap-module-eval-source-map",
  mode: "development",
  devServer: {
    contentBase: "./",
    publicPath: "./dist",
  },
  plugins: (config.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ]),
});

module.exports = config;
