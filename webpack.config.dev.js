const webpack = require("webpack");
const config = require("./webpack.config.base");

Object.assign(config, {
  entry: [
    "webpack-dev-server/client?http://localhost:8080", // WebpackDevServer host and port
    "webpack/hot/only-dev-server", // "only" stops HMR on syntax errors
    "react-hot-loader/patch", // make sure the HMR package is included
    config.entry,
  ],
  devtool: "cheap-module-eval-source-map",
  mode: "development",
  devServer: {
    // contentBase: "./dist",
    hot: true,
  },
  plugins: (config.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]),
  /* resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  }, */
});

module.exports = config;
