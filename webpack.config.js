const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require("webpack");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./script.js",
  output: {
    filename: "bundle.js",
    library: "bundle",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  watch: NODE_ENV === "development",
  devtool: NODE_ENV === "development" ? "source-map" : null,
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
    new TerserWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      },
    ],
  },
};
