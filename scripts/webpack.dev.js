const webpackMerge = require('webpack-merge')
const webpackCommon = require('./webpack.base')
const friendlyErrorPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')
const errorOverlayWebpackPlugin = require('error-overlay-webpack-plugin')
const { createNotifierCallback } = require('./utils.js')
const webpackbar = require('webpackbar')
const address = require('address')
const path = require('path')

const port = 7777

const currentConfig = {
  mode: 'development',
  cache: true,
  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    filename: 'js/[name].[hash:7].js',
    chunkFilename: 'js/async/[name].[hash:7].js'
  },
  plugins: [
    new friendlyErrorPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://${address.ip()}:${port}`]
      },
      onErrors: createNotifierCallback(),
      clearConsole: false,
      additionalFormatters: [],
      additionalTransformers: []
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new errorOverlayWebpackPlugin(),
    new webpackbar()
  ],
  devServer: {
    host: '0.0.0.0',
    port,
    hot: true,
    overlay: {
      warnings: true,
      errors: true
    },
    contentBase: path.resolve(__dirname, '../', 'dist'),
    quiet: true,
    hotOnly: true
  },
  devtool: 'cheap-module-eval-source-map'
}

module.exports = webpackMerge(webpackCommon, currentConfig)
