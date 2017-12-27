const webpack = require('webpack');
const path = require('path');

module.exports = {
  watch: true,
  entry: './client/entry/main.js',
  module:{
    rules: [
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
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
    filename: 'bundle.js'
  },
};