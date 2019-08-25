/* eslint-disable import/no-extraneous-dependencies  */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./common');

const { babelLoader, entry, output, resolve } = common;

module.exports = {
  mode: 'development',
  watch: true,
  devtool: 'eval',
  resolve,
  entry,
  output,
  module: {
    rules: [
      babelLoader,
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
    }),
  ],
};
