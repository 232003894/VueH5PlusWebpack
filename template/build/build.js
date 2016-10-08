// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')
var opn = require('opn')



var outStr = '构建发布文件...';
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
    //具体参数可以可以在config/index.js- chrome中配置
    opn(uri, { wait: false, app: [config.chrome.name, '--remote-debugging-port=' + config.chrome.debuggingPort, '--disable-web-security', '--user-data-dir=' + config.chrome.userDataPath] });
})