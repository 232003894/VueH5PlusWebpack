var webpack = require('webpack');
var dirVars = require('../base/dir-vars.config.js')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var entries = require('../entry.product.config')

var _chunks = Object.keys(entries);
//console.log( 'chunks: ' + chunks )
var configPlugins = [
  // 提取公共模块
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors', // 公共模块的名称
    chunks: _chunks, // chunks是需要提取的模块
    minChunks: _chunks.length
  })
  // 配置提取出的样式文件
  // new ExtractTextPlugin( 'static/css/[name].[hash:7].css' )
]


module.exports = configPlugins;
