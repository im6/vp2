/* eslint-disable import/no-extraneous-dependencies  */
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./common');

const devPort = 3000;
const proxyPort = 3001;
const { babelLoader, entry, resolve } = common;

module.exports = {
  mode: 'development',
  watch: true,
  devtool: 'cheap-eval-source-map',
  resolve,
  entry,
  output: {
    publicPath: '/static',
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
  devServer: {
    open: true,
    hot: true,
    port: devPort,
    proxy: {
      '*': {
        target: `http://localhost:${proxyPort}`,
        secure: false,
      },
    },
  },
};
