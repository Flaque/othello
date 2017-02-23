var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: './build/bundle.js'
  },

  /**
   * Here let's copy over the ./src/indx.html
   * to the ./build/index.html and add a
   * <script> with our bundle in it.
   */
  plugins: [new HtmlWebpackPlugin({
    filename: './build/index.html',
    template: './src/index.html'
  })],

  devServer: {
    contentBase: "./build"
  }

};
