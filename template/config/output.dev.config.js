var dirVars = require('./base/dir-vars.config.js')
var getPages = require('./base/getPages.js')
getPages.build('web')
module.exports = {
  path: dirVars.buildDir,
  publicPath: '/',
  filename: '[name].js'
}
