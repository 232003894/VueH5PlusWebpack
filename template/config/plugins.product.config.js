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
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard({minimal:true});
pluginsConfig.push(new DashboardPlugin(dashboard.setData))

// 配置提取出的样式文件
pluginsConfig.push(new ExtractTextPlugin('static/css/[name].[contenthash:3].css'))


// 配合CLI的--bail，一出error就终止webpack的编译进程
//pluginsConfig.push( new webpack.NoErrorsPlugin( ) )

pluginsConfig.push(new webpack.optimize.UglifyJsPlugin({
  mangle: true,
  output: {
    //中文ascii化，非常有用！防止中文乱码的神配置
    ascii_only: true,
    //在输出中保存版权注释
    comments: false
  },
  compress: {
    warnings: false
  }
}))

//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
pluginsConfig.push(new webpack.optimize.OccurenceOrderPlugin())


pageArr.forEach((page) => {
  if (path.extname(page).toLowerCase() === '.html') {
    var _page = page.replace('\/' + path.basename(page), '').replace('\/', '_')

    var conf = {
      filename: 'html/' + _page + '.html',
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
