const webpack = require('webpack')
const config = require('./webpack.config.js')

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false
    }
  })
)

module.exports = config
