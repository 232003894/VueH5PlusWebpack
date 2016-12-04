var path = require('path');
var dirVars = require('./base/dir-vars.config.js');
module.exports = {
  // 当require的模块找不到时，尝试添加这些后缀后进行寻找
  extensions: ['', '.js', '.vue'],
  fallback: [path.join(__dirname, '../node_modules')],
  // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
  alias: {
    /* vux 组件引用路径  */
    'vux-components': 'vux/src/components',
    'vux-plugins': 'vux/src/plugins',

    /* 项目代码根路径 */
    'src': dirVars.srcRootDir,
    /* 代码-静态资源路径 样式(less css) 图片 字体 等*/
    'assets': dirVars.assetsDir,
    /* 项目自身组件路径 */
    'components': dirVars.componentsDir,
    /* config */
    /* configModule */
    'configVue': path.resolve(dirVars.configDir, 'vue.config'),
    'configModule': path.resolve(dirVars.configDir, 'common.config'),
    'api': path.resolve(dirVars.libsDir, 'api'),
    'app': path.resolve(dirVars.logicDir, 'app')

    /* logic */
    // cm: path.resolve( dirVars.logicDir, 'common.module' ),
    // cp: path.resolve( dirVars.logicDir, 'common.page' ),

  }
};
