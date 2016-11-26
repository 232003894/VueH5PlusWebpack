// https://github.com/shelljs/shelljs
require('shelljs/global')
process.env.NODE_ENV = 'production'

var path = require('path')
var webpack = require('webpack')
var opn = require('opn')
var fs = require('fs');
var rimraf = require('rimraf')

var preConfig = require('./pre.config')
var webpackConfig = require('../config/webpack.procduct.config')
var dirVars = require('../config/base/dir-vars.config.js')

rimraf(dirVars.buildDir, fs, function cb() {
  // console.log('dist已清空')
})
cp('-R', 'static/', dirVars.buildDir)

//或拷贝到Hbuilder中使用
// console.log(
//   '  Tip:' +
//   '  可以用文件路径打开访问\n'
// )

webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  // process.stdout.write(stats.toString({
  //   colors: true,
  //   modules: false,
  //   children: false,
  //   chunks: false,
  //   hash: false,
  //   version: false,
  //   timings: false,
  //   chunkModules: false
  // }) + '\n')

  var uri = preConfig.index || ''
  if (uri !== '') {
    // console.log("Chrome打开:" + uri);
    uri = path.resolve(dirVars.buildDir, 'html/' + uri)

    //具体参数可以可以在 pre.build.config.js- chrome中配置
    opn(uri, {
      wait: false,
      app: [preConfig.chrome.name, '--remote-debugging-port=' + preConfig.chrome.debuggingPort, '--disable-web-security', '--user-data-dir=' + preConfig.chrome.userDataPath]
    });
  }

})
