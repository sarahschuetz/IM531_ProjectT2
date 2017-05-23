const path = require('path');
const pkg = require('./package.json');

const SRC_DIR = path.resolve(__dirname, 'app');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

const production = process.env.NODE_ENV === 'production';

module.exports = {
  context: SRC_DIR,
  entry: `.${path.sep}index.js`,
  output: {
    path: PUBLIC_DIR,
    filename: 'bundle.js',
  },
  target: 'electron-main',
  devtool: production ? 'source-map' : 'eval-source-map', // switch to cheap-module-eval-source-map or eval if it gets too slow
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          SRC_DIR,
        ],
        loader: 'babel-loader',
        options: pkg.babel,
      },
      {
        test: /\.jsx?$/,
        include: [
          SRC_DIR,
        ],
        loader: 'eslint-loader',
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
};
