const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const webpackConfig = {
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd',
    globalObject: 'this',
    library: '[name]'
  },
  target: 'web'
};

if (process.env.BUNDLE_ANALYZER) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackMerge(baseConfig, webpackConfig)
