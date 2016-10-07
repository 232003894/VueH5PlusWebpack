# vue-cli + webpack + vux 多页面模板
日期: 2016-10-6

关键字: 
- 多页面
- vuejs(1.0.26)
- webpack
- vux(0.1.3)

## 使用方法
``` bash
# 全局安装vue-cli 如果已经安装过,可以省略
npm install -g vue-cli

# 使用本模板初始化项目
vue init 232003894/VueWebpackMultiplePage my-project

# 进入目录
cd my-project

# 安装
npm install

# 调试环境 serve with hot reload at http://localhost:8080/module/login.html
npm run dev

# 生产环境 build for web production with minification 
npm run build

# 生产环境 build for H5+ production with minification 
npm run build5

```
## vue+webpack多页面

基于[bluefox1688 github][2]，非常感谢bluefox1688童鞋，今天要讲的内容是基于bluefox1688童鞋的多页面实例上再优化的。

## 优化了点啥

### github地址
1、github：https://github.com/232003894/VueWebpackMultiplePage

### 优化的内容
我们先来讲讲，具体我们优化了什么内容。

 1. 增加了npm run dev 或 npm run build 后会用chome打开默认页。
 2. 调整了module目录的层级
 3. 全局统一使用的模块Lib.js库中导入了pages.js(全部页面列表)
 4. 添加了build5的脚本,主要是pages.js中页面路径不同,用于hbuild H5+使用的路径,完成后不会打开页面

本地默认访问端口为8080，dev和build 默认入口页面为'pages/login.html'，需要更改的童鞋请到项目根目录文件`config/index.js`修改。

### 目录结构
``` stylus
webpack
  |---build
  |---config
  |---dist 打包生成的目录
    |---pages 页面 (页面的命名为 [一级模块名.二级级模块名...].页面名.html])
      |---main.html  (页面名.html)
      |---my.setting.html  (模块名.页面名.html)
    |---static 资源
      |---css 
      |---fonts 
      |---img 
      |---js 
  |---src
    |---assets 公用资源
      |---css/  css文件夹
      |---img/  图片文件夹
      |---font/  字体图标文件夹
      |---js/  js图标文件夹
      |---Lib.js  公用库
      |---base.css  公用样式
    |---components 组件
      |---Button.vue  按钮组件
      |---module-head.vue  head组件
    |---module各个页面模块
      |---main    首页(单页面,一个文件夹就是一个html)
        |---main.html
        |---main.js
        |---app.vue
      |---my    用户模块(一个业务模块,每个业务下可能有多个页面)
        |---setting       设置页面(单页面,一个文件夹就是一个html)
          |---setting.html
          |---setting.js
          |---app.vue
  |---static 其他需要打包的静态资源,本目录下的资源会完整的复制到 dist/static中去

  ```
从目录结构上，各种组件、页面模块、资源等都按类新建了文件夹，方便我们储存文件。
其实我们所有的文件，最主要都是放在`module`文件夹里，以文件夹名为html的名称，如果有多级业务模块可以嵌套子目录,目录名为业务模块名称(在bluefox1688童鞋里，module里只能一级文件夹用来代表页面)。
例如

``` stylus
  |---login    登陆模块(单页面,一个文件夹就是一个html)
    |---login.html
    |---login.js
    |---app.vue
  |---my    用户模块(一个业务模块,每个业务下可能有多个页面)
    |---welcome       欢迎页模(单页面,一个文件夹就是一个html)
      |---welcome.html
      |---welcome.js
      |---app.vue
```
就是我们访问时的地址：

``` stylus
http://localhost:8080/module/login.html
```
这里一定要记住，在`module`里的最终子文件夹，一个文件夹就是一个html，`js``vue template` 都统一放在当前文件夹里，当然你也可以继续放其他的资源，例如css、图片等，webpack会打包到当前页面里。
如果项目不需要这个页面了，可以直接把这个文件夹直接删除掉，干净项目，干活也开心。
像以前我们传统开发项目，所有的图片都习惯放在`images`里，当项目有改动时，有些图片等资源用不上了，但还占着坑位，虽然现在的硬件容量大到惊人，但我们应该还是要养到一个良好的习惯。
当前页面的开发在`app.vue`里，打开后你就会看到很熟悉的`<template>`、`<script>`、`<style scoped>`了。

### 构建代码说明

在bluefox1688童鞋的基础上进行了小扩展


【build/build/dev-server.js】主要是增加了以下代码，增加了打开调试页面。

``` javascript
var uri = 'http://localhost:' + port + '/' + main;
console.log('Listening at ' + uri + '\n');
//Chrome 在 OS X 中 'google chrome', 在 Linux 中 'google-chrome' 在 Windows 中'chrome'.
opn(uri, { app: ['chrome', '--remote-debugging-port=9222', '--disable-web-security', '--user-data-dir=D:\\tmp\\CMyChromeDevUserData'] });
```

【build/utils.js】主要是增加了以下代码，生成 assets/js/pages.js 。

``` javascript
exports.getCustomeJS = function(globPath) {
  var entries = {},
    basename, tmp, pathname;
  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/')
    var star = tmp.indexOf("module") + 1;
    var length = tmp.lastIndexOf(basename) - star + 1;
    pathname = tmp.splice(star, length).join('.');
    var strHe = "";
    if (process.env.H5 === 'true') {
      strHe = '_www/module/';
    }
    var last = tmp[tmp.length - 1].split('.');
    entry = strHe + pathname + '.' + last[last.length - 1];
    entries[pathname] = entry;
  });

  var jsStr = "var pages =" + JSON.stringify(entries);
  jsStr += ";\r\n export default pages;";
  fs.writeFileSync('./src/assets/js/pages.js', jsStr);
}

```

【assets/js/pages.js】所有页面for web。

``` javascript
var pages ={"login":"login.html","my.welcome":"my.welcome.html"};
export default pages;
```

【assets/js/pages.js】所有页面for H5+。

``` javascript
var pages ={"login":"_www/module/login.html","my.welcome":"_www/module/my.welcome.html"};
export default pages;
```

【package.json】中 新增 build5 脚本

``` javascript
"scripts": {
  "dev": "node build/dev-server.js",
  "build": "node build/build.js",
  "build5": "set H5=true&&node build/build.js"
  ......
}
```

### 全局统一公共模块

我们做多页面开发，那肯定会涉及到全局都能调用的公共库，或者是把别人封装的库也一起打包在全局公共模块里。

在`*.vue`页面里，我都统一import了一个文件

``` javascript
import {
    config,
    common,
    pages,
    Vue
} from 'assets/Lib.js';
```
这就是全局统一公共模块，我们先看看`Lib.js`里的代码

``` javascript
import 'assets/base.css';
import config from 'assets/js/conf';
import common from 'assets/js/common';
import pages from 'assets/js/pages'
export { config, common, pages };
```
例如我们现在想调用APP的名称，在`.vue`里可以这么写

``` javascript
import {
    config,
    common,
    pages,
    Vue
} from 'assets/Lib.js';
config.appname;  //# 临风
```
只需要在`*.vue`里导入`import {config,common,pages,Vue} from 'assets/Lib.js''`，
就可以到处使用全局模块了。

另外，如果想要干净的页面模块模板，可以到根目录的`tpl`里复制`module_tpl`整个文件夹，然后粘贴到`src/module`目录下马上就可以进行开发了，开发之前记得在`cmd`里`npm run dev`跑一遍，新增页面都要重新`dev`一遍。

### 组件的使用(与bluefox1688童鞋完全一样,直接搬来的)
组件（Component）是 vue.js 最强大的功能之一，当你发现使用组件可以减少造轮子里，你会深深的爱上它。
我们的组件都是放在`components`目录下的，调用组件的方法也很简单。

``` javascript
import Button from 'components/Button';
```
然后记得在`*.vue`注册导入的组件，要不然会影响使用。

``` javascript
import Button from 'components/Button';
export default {
  data() {
    return {
    	
    }
  },
  components: {
   # 在这里注册组件，不注册组件的话，是无法使用的。
	Button	
  } 
}
```

如果想要干净的组件模板，可以到根目录的`tpl`里找到`components_tpl`的`Hello.vue`文件，复制粘贴到`components`目录下马上就可以进行开发了。

## 结束言
每个项目需求都不一样，配置也会有许不同。

  [1]: https://github.com/yaoyao1987/vue-cli-multipage
  [2]: https://github.com/bluefox1688/vue-cli-multi-page