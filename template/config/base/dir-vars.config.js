var path = require('path')
var moduleExports = {}

/**
 * 源文件目录
 */

// 项目根目录
moduleExports.staticRootDir = path.resolve(__dirname, '../../')

// 存放所有不能用npm管理的第三方库
// moduleExports.vendorDir = path.resolve( moduleExports.staticRootDir, './vendor' )

// 项目业务代码根目录
moduleExports.srcRootDir = path.resolve(moduleExports.staticRootDir, './src')

// 存放由各种不常改变的js/css打包而来的dll
// moduleExports.dllDir = path.resolve( moduleExports.srcRootDir, './dll' )

// 存放各个页面独有的部分，html、入口js、vue等
moduleExports.pagesDir = path.resolve(moduleExports.srcRootDir, './pages')

// 存放自定义的通用VUE组件
moduleExports.pubsComponentsDir = path.resolve(moduleExports.srcRootDir, './components/pubs')

// 存放自定义的业务VUE组件
moduleExports.businessComponentsDir = path.resolve(moduleExports.srcRootDir, './components/business')

// 存放各种配置文件
moduleExports.configDir = path.resolve(moduleExports.srcRootDir, './config')

// 存放公用的业务逻辑
moduleExports.logicDir = path.resolve(moduleExports.srcRootDir, './logic')

// 与业务逻辑无关的库都可以放到这里
moduleExports.libsDir = path.resolve(moduleExports.srcRootDir, './libs')

// 存放公共资源 图片字体等
moduleExports.assetsDir = path.resolve(moduleExports.srcRootDir, './assets')


// 存放UI布局，组织各个组件拼起来，因应需要可以有不同的布局套路
//moduleExports.layoutDir = path.resolve( moduleExports.publicDir, './layout' )

/**
 * 生成文件目录
 */

// 存放编译后生成的所有代码、资源（图片、字体等，虽然只是简单的从源目录迁移过来）
moduleExports.buildDir = path.resolve(moduleExports.staticRootDir, './dist')




module.exports = moduleExports;
