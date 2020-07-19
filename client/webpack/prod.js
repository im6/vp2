/* eslint-disable import/no-extraneous-dependencies  */
const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./common');

const { entry, resolve, babelLoader } = common;

module.exports = {
  mode: 'production',
  entry,
  output: {
    path: path.join(__dirname, '../../static'),
    filename: '[name].js',
  },
  resolve,
  module: {
    rules: [
      babelLoader,
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()],
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CompressionPlugin({
      exclude: /.*/, // use CDN instead of OSS
      algorithm: 'gzip',
      filename: '[path]',
    }),
  ],
};
