const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // entry point
  entry: "./src/index.js",
  // output location
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./bundle.js",
    publicPath: "/",
  },
  // transformations : loaders work on files
  module: {
    rules: [
      { test: /\.(svg|png)$/i, type: "asset/resource" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.js$/, use: "babel-loader" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/img/favicon.png",
    }),
    new CopyPlugin({
      patterns: [{ from: "_redirects" }],
    }),
  ],
  // production build
  mode: "production",
  // enable source maps
  devtool: "eval-source-map",
  devServer: {
    historyApiFallback: true,
  },
};
