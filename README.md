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

# 调试环境 serve with hot reload at http://localhost:8080/html/main.html
npm run dev

# web生产环境 with minification
npm run web

# h5+(hbuilder H5+ 开发用的)生产环境 with minification
npm run h5

# 代码检查
npm run lint

```
## vue+webpack多页面

> 本项目是基于[Array-Huang github][1]改造的，webpack方面的教程可以去看 [多页为王：webpack多页应用架构专题系列][2]，非常适合入门学习

### 本项目github地址
> github：[https://github.com/232003894/VueWebpackMultiplePage][3]

### 优化的内容
 1. 改为基于vue方案(spa和多页面都适合)
 1. 引入vux
 2. 增加了npm run dev 或 npm run web 后会用chome打开默认页。

本地默认访问端口为8080，dev和build 默认入口页面为'pages/main/main.html'，需要更改的童鞋请到项目根目录文件`build/pre.config.js`修改。

### 目录结构
``` bash
Webpack
│  .babelrc
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  .jsbeautifyrc
│
├─build
│      build-H5.js
│      build.js
│      dev-client.js
│      dev.js
│      pre.config.js
│
├─config  # 存放分拆后的webpack配置文件
│  │  entry.dev.config.js   # 开发环境的webpack入口配置
│  │  entry.product.config.js   # 生产环境的webpack入口配置
│  │  module.config.js  # webpacks的module配置
│  │  output.dev.config.js  # 开发环境的webpacks输出配置
│  │  output.product-H5.config.js   #  H5+生产环境的webpacks输出配置
│  │  output.product.config.js  # web生产环境的webpacks输出配置
│  │  plugins.dev.config.js   # 环境配置中不一致的部分，开发环境配置文件
│  │  plugins.product.config.js   # 环境配置中不一致的部分，生产环境配置文件
│  │  resolve.config.js   # webpacks的resolve配置
│  │  resolveLoader.config.js   # webpacks的resolveLoader配置
│  │  webpack.dev.config.js   # 开发环境的webpack配置文件（无实质内容，仅为组织整理）
│  │  webpack.procduct-H5.config.js   # H5+生产环境的webpack配置文件（无实质内容，仅为组织整理）
│  │  webpack.procduct.config.js  # web生产环境的webpack配置文件（无实质内容，仅为组织整理）
│  │
│  ├─base   # 主要是存放一些变量和页面
│  │      dir-vars.config.js  # 存放一些变量
│  │      getPages.js   # 生成页面集合
│  │      page-entries.config.js  # 获取page下的所有页面
│  │
│  ├─inherit  # 存放生产环境和开发环境相同的部分，以供继承
│  │      plugins.config.js 
│  │
│  └─vendor   # 存放webpack兼容第三方库所需的配置文件
│          eslint.config.js
│          vue.config.js
│
├─dist	  # 打包生成的目录
│  ├─html	  # 页面 (页面的命名为 [一级模块名_二级级模块名...]_页面名.html])
│  │      main.html	  # (页面名.html)
│  │      my_setting.html	  # (模块名.页面名.html)
│  │
│  └─static	  # 资源
│      ├─css
│      ├─fonts
│      ├─img
│      └─js
│
├─src	# 当前项目的源码
│  ├─assets	# 公用样式
│  │      base.less
│  │      css.vue
│  │
│  ├─components	# 公用组件
│  │      Button.vue
│  │
│  ├─config	# 各种配置文件
│  │      common.config.js
│  │      vue.config.js
│  │
│  ├─img	# 公用图片
│  │      logo.png
│  │
│  ├─libs	# 业务逻辑无关的库
│  │  │  libs.module.js
│  │  └─module
│  │          pages.js
│  │
│  ├─logic	# 业务逻辑
│  │
│  └─pages	# 各个页面独有的部分
│      ├─main
│      │      app.vue
│      │      main.html
│      │      main.js
│      └─my
│          └─setting
│                  app.vue
│                  setting.html
│                  setting.js
│                  
├─static	# 其他需要打包的静态资源,本目录下的资源会完整的复制到 dist/static中去
│      
└─tpl # 模板
    ├─component_tpl # 组件模板
    │      Hello.vue
    │      
    └─page_tpl # 页面模板
            app.vue
            tpl.html
            tpl.js

  ```
从目录结构上，各种组件、页面模块、资源等都按类新建了文件夹，方便我们储存文件。
其实我们所有的文件，最主要都是放在`pages`文件夹里，以文件夹名为html的名称，如果有多级业务模块可以嵌套子目录,目录名为业务模块名称(在bluefox1688童鞋里，module里只能一级文件夹用来代表页面)。
例如

``` bash
  |---main   # 首页(单页面,一个文件夹就是一个html)
    |---main.html
    |---main.js
    |---app.vue
  |---my   # 用户模块(一个业务模块,每个业务下可能有多个页面)
    |---setting      # 设置页面(单页面,一个文件夹就是一个html)
      |---setting.html
      |---setting.js
      |---app.vue
```
就是我们访问时的地址：

``` stylus
http://localhost:8080/html/main.html
```

这里一定要记住，在`pages`里的最终子文件夹，一个文件夹就是一个html，`js``vue template` 都统一放在当前文件夹里，当然你也可以继续放其他的资源，例如css、图片等，webpack会打包到当前页面里。
如果项目不需要这个页面了，可以直接把这个文件夹直接删除掉，干净项目，干活也开心。
像以前我们传统开发项目，所有的图片都习惯放在`images`里，当项目有改动时，有些图片等资源用不上了，但还占着坑位，虽然现在的硬件容量大到惊人，但我们应该还是要养到一个良好的习惯。
当前页面的开发在`app.vue`里，打开后你就会看到很熟悉的`<template>`、`<script>`、`<style scoped>`了。

### 构建代码说明

### 组件的使用
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

如果想要干净的组件模板，可以到根目录的`tpl`里找到`component_tpl`的`Hello.vue`文件，复制粘贴到`components`目录下马上就可以进行开发了。

## 结束言
每个项目需求都不一样，配置也会有许不同。


  [1]: https://github.com/Array-Huang/webpack-seed
  [2]: http://array_huang.coding.me/webpack-book/chapter2/webpack-dev-production-environment.html
  [3]: https://github.com/232003894/VueWebpackMultiplePage