var path = require('path')
var dirVars = require('./base/dir-vars.config.js')
var pageArr = require('./base/page-entries.config.js')
var configEntry = {};

pageArr.forEach((page) => {
  var ext = '.js'
  var basename = 'entry' + ext
  if (path.basename(page) === basename) {
    // if (path.extname(page).toLowerCase() === '.js') {
      var _page = page.replace('\/' + basename, '').replace('\/', '_')
      configEntry[_page] = './src/pages/' + page
    }
  })

Object.keys(configEntry).forEach(function (name) {
  configEntry[name] = ['./build/dev-client'].concat(configEntry[name])
})

module.exports = configEntry;
