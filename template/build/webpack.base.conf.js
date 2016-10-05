var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var webpack = require('webpack')
var entries = utils.getEntry('./src/module/**/*.js'); // 获得入口js文件
var chunks = Object.keys(entries);

// 将样式提取到单独的css文件中，而不是打包到js文件或使用style标签插入在head标签中
var ExtractTextPlugin = require('extract-text-webpack-plugin');

utils.getCustomeJS('./src/module/**/*.html');

module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        /* ---- 生成的例子 vendors.61714a310523a3df9869.js --- */
        //filename: '[name].[hash].js'
        /* ---- 生成的例子 vendors.js?f3aaf25de220e214f84e --- */
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
      //'vux-components': 'vux/src/components'
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    {{#lint}}
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    {{/lint}}
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      //图片
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      //字体
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      //新增的3个
      // {
      //     test: /vux.src.*?js$/,
      //     loader: 'babel'
      // },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      }
    ]
  },
  {{#lint}}
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  {{/lint}}
  vue: {
    loaders: utils.cssLoaders()
  },
  plugins: [
      // 提取公共模块
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors', // 公共模块的名称
        chunks: chunks, // chunks是需要提取的模块
        minChunks: chunks.length
      }),
      // 配置提取出的样式文件
      new ExtractTextPlugin(utils.assetsPath('css/[name].[hash:7].css'))
      //new ExtractTextPlugin('css/[name].[hash:7].css')
  ]
}
