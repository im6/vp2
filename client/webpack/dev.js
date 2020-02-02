/* eslint-disable import/no-extraneous-dependencies  */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./common');

const { babelLoader, entry, output, resolve } = common;

module.exports = {
  mode: 'development',
  watch: true,
  devtool: 'cheap-eval-source-map',
  resolve,
  entry,
  output,
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
