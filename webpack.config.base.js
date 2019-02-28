const path = require("path");
const webpack = require("webpack");
const fs = require("fs");

const apiKey = fs.readFileSync("./api.key");
const apiUrl = fs.readFileSync("./api.url");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(apiUrl.toString()),
      __API_KEY__: JSON.stringify(apiKey.toString()),
    }),
  ],
};
