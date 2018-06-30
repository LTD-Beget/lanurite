const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/lanurite.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },
  output: {
    filename: "lanurite.js",
    libraryTarget: "umd",
    library: "Lanurite",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(require("./package.json").version),
    })
  ]
};
