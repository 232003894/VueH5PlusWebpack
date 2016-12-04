var path = require('path');
var webpack = require('webpack')
var dirVars = require('./base/dir-vars.config.js')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pluginsConfig = require('./inherit/plugins.config.js')
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var pageArr = require('./base/page-entries.config.js')
var entries = require('./entry.product.config')

// 环境参数
pluginsConfig.push(new webpack.DefinePlugin({
  IS_PRODUCTION: true,
}))
if (process.platform != 'win32') {
  var Dashboard = require('webpack-dashboard')
  var DashboardPlugin = require('webpack-dashboard/plugin')
  var dashboard = new Dashboard({
    minimal: true
  });
  pluginsConfig.push(new DashboardPlugin(dashboard.setData))
}


// 配置提取出的样式文件
pluginsConfig.push(new ExtractTextPlugin('css/[name].css'))
  // pluginsConfig.push(new ExtractTextPlugin('css/[name].[contenthash:3].css'))

// 允许错误不打断程序
//pluginsConfig.push( new webpack.NoErrorsPlugin( ) )

pluginsConfig.push(new webpack.optimize.UglifyJsPlugin({
  mangle: true,
  output: {
    //中文ascii化，非常有用！防止中文乱码的神配置
    ascii_only: true,
    //在输出中保存版权注释
    comments: false
  },
  // https://github.com/mishoo/UglifyJS2/blob/master/lib/compress.js
  compress: {
    // 不输出警告
    warnings: false,
    // 去掉 console
    // drop_console: false,
    // 去掉 debugger
    drop_debugger: true
  }
}))

//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
pluginsConfig.push(new webpack.optimize.OccurenceOrderPlugin())


pageArr.forEach((page) => {
  var ext = '.html'
  var basename = 'template' + ext
    // if (path.extname(page).toLowerCase() === ext) {
  if (path.basename(page) === basename) {
    var _page = page.replace('\/' + basename, '').replace('\/', '_')
    var conf = {
      filename: 'html/' + _page + ext,
      template: path.resolve(dirVars.pagesDir, `./${page}`), // 模板路径
      // template: path.resolve( `./src/pages/${page}` ), // 模板路径
      inject: true, // js插入位置
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }
    if (_page in entries) {
      conf.chunks = ['vendors', _page]
        //是否加hash参数: 例如 *.js?fdlfjdlfjdl245
      conf.hash = true;
    }
    pluginsConfig.push(new HtmlWebpackPlugin(conf))
  }

})

module.exports = pluginsConfig
