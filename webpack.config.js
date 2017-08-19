const path = require('path');
const webpack = require('webpack');
// webpack.config.js
module.exports = {
  devtool: 'source-map',
  entry: './app/src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    modules: ['app/src/lib', 'node_modules']
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};