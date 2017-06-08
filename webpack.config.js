const path = require('path');
// 定义了一些文件夹的路径
const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    app: '@/app.js'
  },

  output: {
    path: DIST_PATH,
    filename: '[name].js'
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': SRC_PATH
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
