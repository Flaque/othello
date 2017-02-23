var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
  output: {
    filename: './build/bundle.js'
  },

  /**
   * This lets us import css files in javascript!
   */
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
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

};
