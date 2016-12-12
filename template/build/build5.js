// https://github.com/shelljs/shelljs
require('shelljs/global')
process.env.NODE_ENV = 'h5development'

var path = require('path')
var webpack = require('webpack')
var opn = require('opn')
var fs = require('fs');
var rimraf = require('rimraf')
var ora = require('ora')

var preConfig = require('./pre.config')
var webpackConfig = require('../config/webpack.procduct.config')
var dirVars = require('../config/base/dir-vars.config.js')


var outStr = '构建发布文件...'
var spinner = ora(outStr)

rimraf(dirVars.buildDir, fs, function () {
  // windows
  if (process.platform == 'win32') {
    console.log('dist已清空')
    spinner.start()
  }
})

// 拷贝根目录下static目录下的文件到生成目录中
cp('-R', 'static/', dirVars.buildDir)

//或拷贝到Hbuilder中使用
// console.log(
//   '  Tip:' +
//   '  可以用文件路径打开访问\n'
// )

webpack(webpackConfig, function (err, stats) {
  if (err) throw err

  if (process.platform == 'win32') { //windows
    spinner.stop()
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      hash: false,
      version: false,
      timings: false,
      chunkModules: false
    }) + '\n')
  }

  // 删除指定目录, 并将生成的文件复制到指定目录
  var copyPath = preConfig.copyPath || ''
  if (copyPath !== '') {
    // rm('-rf', copyPath + '\\dist')
    rimraf(copyPath + '\\dist', fs, function () {
      cp('-R', path.resolve(dirVars.buildDir, ''), copyPath)
      console.log("清理并复制文件到指定路径：" + copyPath);
      opn(copyPath, {
        wait: false
      });
    })
  }

  // var uri = preConfig.index || ''
  // if (uri !== '') {
  //   // console.log("Chrome打开:" + uri);
  //   uri = path.resolve(dirVars.buildDir, 'html/' + uri)

  //   //具体参数可以可以在 pre.build.config.js- chrome中配置
  //   opn(uri, {
  //     wait: false,
  //     app: [preConfig.chrome.name, '--remote-debugging-port=' + preConfig.chrome.debuggingPort, '--disable-web-security', '--user-data-dir=' + preConfig.chrome.userDataPath]
  //   });
  // }

})
