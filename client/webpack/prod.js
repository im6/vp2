const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    'bundle0': './client/colors/index.js',
    'bundle1': './client/signin/index.js',
    'bundle2': './client/newcolor/index.js',
    'bundle3': './client/onecolor/index.js',
    'bundle4': './client/profile/index.js',
  },
  module:{
    rules: [
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
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
    new UglifyJsPlugin()
  ]
};