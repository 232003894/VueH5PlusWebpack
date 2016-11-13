var dirVars = require('./base/dir-vars.config.js')
require('./base/getPages.js')
module.exports = {
  path: dirVars.buildDir,
  publicPath: '/',
  filename: '[name].js'
}
