const path = require('path');
// 定义了一些文件夹的路径
const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  // 项目入口. 可以直接用文件夹名称, 默认会找 index.js; 也可以确定是哪个文件名字
  entry: {
    adminvue: '@/app.js'
  },
  // 项目出口. 让 webpack 把处理完成的文件放在哪里
  output: {
    path: DIST_PATH,
    libraryTarget: 'umd',
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': SRC_PATH
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    hot: true,
    inline: true,
    compress: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:8080',
        secure: false
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#source-map',
  // 模块. 要用什么不同的模块来处理各种类型的文件
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(js|vue)$/,
      include: SRC_PATH,
      use: {
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          less: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader!postcss-loader!less-loader' })
        }
      }
    }, {
      test: /\.js$/,
      include: SRC_PATH,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({ use: 'css-loader!postcss-loader' })
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({ use: 'css-loader!postcss-loader!less-loader' })
    }, {
      test: /\.(ttf|woff)$/,
      loader: 'url-loader?limit=20000'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader?limit=20000'
    }]
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    // 添加我们的插件会自动生成一个 html 文件
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunks: ['adminvue'],
      title: '第一个 Vue 应用'
    })
  ]
}

module.exports = config
