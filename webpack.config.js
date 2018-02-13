const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    popup: './src/popup.js'
  },
  output: {
    path: path.resolve('build'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve('src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    // create CSS file with all used styles
    new ExtractTextPlugin('bundle.css'),
    // create popup.html from template and inject styles and script bundles
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['popup'],
      filename: 'popup.html',
      template: './src/popup.html'
    }),
    // copy extension manifest and icons
    new CopyWebpackPlugin([
      { from: './src/manifest.json' },
      { context: './src/assets', from: 'icon-**', to: 'assets' }
    ])
  ]
};
