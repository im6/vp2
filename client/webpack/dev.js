const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  watch: true,
  entry: {
    'bundle0': './client/colors/index.js',
    'bundle1': './client/signin/index.js',
    'bundle2': './client/newcolor/index.js',
    'bundle3': './client/onecolor/index.js',
    'bundle4': './client/profile/index.js',
    'bundle5': './client/admin/index.js',
  },
  module:{
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: "css-loader",
          }, {
            loader: "sass-loader"
          }]
        })
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            "presets": ['env']
          }
        }]
      },
    ],
  },
  output: {
    publicPath: '/static',
    path: path.join(__dirname, '../../static'),
    filename: '[name].js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css",
    }),
  ]
};