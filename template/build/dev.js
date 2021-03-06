var path = require('path')
var express = require('express')
require('shelljs/global')
process.env.NODE_ENV = 'development'

var webpack = require('webpack')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var fs = require('fs');
var rimraf = require('rimraf')

var preConfig = require('./pre.config')
var webpackConfig = require('../config/webpack.dev.config')
var dirVars = require('../config/base/dir-vars.config.js')


// default port where dev server listens for incoming traffic
var port = preConfig.port

var main = preConfig.index || ''

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = preConfig.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  stats: false,
  quiet: true
})
if (process.platform == 'win32') { //windows
  devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    stats: {
      colors: true,
      modules: false,
      chunks: false,
      hash: false,
      version: false,
      timings: false,
      chunkModules: false
    }
  })
} else {

}

var hotMiddleware = require('webpack-hot-middleware')(compiler)
  // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
app.use('/static', express.static('./static'))


rimraf(dirVars.buildDir, fs, function cb() {
  if (process.platform == 'win32') { //windows
    console.log('dist已清空')
  }
})

module.exports = app.listen(port, function (err) {
  if (err) {
    if (process.platform == 'win32') { //windows
      console.log(err)
    }
    return
  }

  var uri = 'http://localhost:' + port + '/html/' + main;

  if (process.platform == 'win32') { //windows
    console.log('打开:' + uri + '\n');
  }
  //具体参数可以可以在config/index.js- chrome中配置
  opn(uri, {
    wait: false,
    app: [preConfig.chrome.name, '--remote-debugging-port=' + preConfig.chrome.debuggingPort, '--disable-web-security', '--user-data-dir=' + preConfig.chrome.userDataPath]
  });
})
