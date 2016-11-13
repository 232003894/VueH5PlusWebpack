var path = require('path')
var dirVars = require('./base/dir-vars.config.js')
var pageArr = require('./base/page-entries.config.js')
var configEntry = {};

pageArr.forEach((page) => {
    if (path.extname(page).toLowerCase() === '.js') {
      var _page = page.replace('\/' + path.basename(page), '').replace('\/', '.')
      configEntry[_page] = './src/pages/' + page
    }
  })
  // pageArr.forEach((page) => {
  //   if (path.extname(page).toLowerCase() === '.js') {
  //     var _page = page.replace('\/' + path.basename(page), '').replace('\/', '.')
  //     configEntry[_page] = path.resolve(dirVars.pagesDir, page)
  //   }
  // })

Object.keys(configEntry).forEach(function (name) {
  configEntry[name] = ['./build/dev-client'].concat(configEntry[name])
})

// console.log(configEntry)

module.exports = configEntry;
