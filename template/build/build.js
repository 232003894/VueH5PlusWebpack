// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')
var opn = require('opn')



var outStr = '构建production 文件...';
console.log(
    '  Tip:' +
    '  可以用文件路径打开访问\n'
)
//或拷贝到Hbuilder中使用
var spinner = ora(outStr)
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', config.build.assetsRoot)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)

webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n');

    var uri = config.build.index;
    console.log("打开默认页:" + uri);
    //Chrome 在 OS X 中 'google chrome', 在 Linux 中 'google-chrome' 在 Windows 中'chrome'.
    opn(uri, { wait: false, app: ['chrome', '--remote-debugging-port=9222', '--disable-web-security', '--user-data-dir=D:\\tmp\\CMyChromeDevUserData'] });
})