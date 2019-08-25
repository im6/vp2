const path = require('path');

module.exports = {
  entry: {
    bundle0: './client/colors/index.js',
    bundle1: './client/signin/index.js',
    bundle2: './client/newcolor/index.js',
    bundle3: './client/onecolor/index.js',
    bundle4: './client/profile/index.js',
    bundle5: './client/admin/index.js',
  },
  output: {
    publicPath: '/static',
    path: path.join(__dirname, '../../static'),
    filename: '[name].js',
  },
  babelLoader: {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};
