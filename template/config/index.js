// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/html/main.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '../',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        //需要复制到的路径
        copyPath: "D:\\chenw\\Documents\\HBuilderProject\\vuetest"
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        main: 'html/main.html',
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    },
    chrome: {
        //Chrome 在 OS X 中 'google chrome', 在 Linux 中 'google-chrome' 在 Windows 中'chrome'.
        name: "chrome",
        debuggingPort: 9222,
        //chrome 49 以后跨域需要指定 --user-data-dir 指定出一个个人信息目录，而不能使用默认的目录,可以自行指定
        userDataPath: "D:\\tmp\\CMyChromeDevUserData"
    }
}
