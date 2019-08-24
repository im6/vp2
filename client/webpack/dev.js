'use strict';
const common = require('./common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { babelLoader, entry, output, resolve } = common;

const devPort = 3000,
  proxyPort = 3001;

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
