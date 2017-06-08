const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    app: './src/app.js'
  },

  output: {
    filename: 'dist/app.js'
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunks: ['app'],
      title: '第一个 Vue 应用'
    })
  ]
}

module.exports = config
