const path = require('path');
// 定义了一些文件夹的路径
const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
    app: '@/app.js'
  },

  output: {
    path: DIST_PATH,
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
        target: 'http://localhost:8081',
        secure: false
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#source-map',

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
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader?limit=10000'
    }]
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunks: ['app'],
      title: '第一个 Vue 应用'
    })
  ]
}

module.exports = config
