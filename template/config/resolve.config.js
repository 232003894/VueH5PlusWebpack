var path = require('path');
var dirVars = require('./base/dir-vars.config.js');

module.exports = {
  // 当require的模块找不到时，尝试添加这些后缀后进行寻找
  extensions: ['', '.js', '.vue'],
  fallback: [path.join(__dirname, '../node_modules')],
  // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
  alias: {
    'src': dirVars.srcRootDir,
    'assets': dirVars.assetsDir,
    'components': dirVars.componentsDir,
    'libs': path.resolve(dirVars.libsDir, 'libs.module'),
    'vux-components': 'vux/src/components',

    /* config */
    /* configModule */
    'configVue': path.resolve(dirVars.configDir, 'vue.config'),
    'configModule': path.resolve(dirVars.configDir, 'common.config')

    /* logic */
    // cm: path.resolve( dirVars.logicDir, 'common.module' ),
    // cp: path.resolve( dirVars.logicDir, 'common.page' ),

  }
};
