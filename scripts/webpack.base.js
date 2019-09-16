const path = require('path');
const pkg = require('../package.json');
const webpack = require('webpack');

module.exports = {
  entry: {
    'imClient': path.resolve(__dirname, '../', 'src/index.ts')
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [
      path.join(__dirname, '../src'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
}
