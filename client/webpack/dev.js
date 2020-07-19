/* eslint-disable import/no-extraneous-dependencies  */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./common');

const { babelLoader, entry, resolve } = common;

module.exports = {
  mode: 'development',
  watch: true,
  devtool: 'cheap-eval-source-map',
  resolve,
  entry,
  output: {
    path: path.join(__dirname, '../../static-dev'),
    filename: '[name].js',
  },
  module: {
    rules: [
      babelLoader,
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'static/*.png', flatten: true },
        { from: 'static/*.svg', flatten: true },
        { from: 'static/*.xml', flatten: true }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  // --- proxy work well with webpack-dev-server
  // devServer: {
  //   open: true,
  //   hot: true,
  //   port: 3000,
  //   proxy: {
  //     '*': {
  //       target: `http://localhost:${3001}`,
  //       secure: false,
  //     },
  //   },
  // },
};
