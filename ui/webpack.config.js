const path = require('path');
module.exports = {
  mode: 'development',
  entry: './public/App.js',
 output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
    {
        test: /\.jsx|js?$/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env','@babel/preset-react'] },
      },
    ],
  },
};