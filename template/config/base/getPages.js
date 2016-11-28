var path = require('path')
var glob = require('glob')
var fs = require('fs')
var dirVars = require('./dir-vars.config.js')
var pageArr = require('./page-entries.config.js')
exports.build = function (type) {
  var entries = {},
    basename, tmp, pathname
  pageArr.forEach((entry) => {
    var ext = '.html'
    var basename = 'template' + ext
      // if (path.extname(entry).toLowerCase() === ext) {
    if (path.basename(entry) === basename) {
      tmp = entry.split('/')
      var star = tmp.indexOf("pages") + 1
      var length = tmp.length - star - 1
      pathname = tmp.splice(star, length).join('_')
      entries[pathname] = pathname + ext
    }
  })
  var jsStr = "var pages = " + JSON.stringify(entries, null, 2).replace(/"/g, '\'')
  jsStr += "\r\nexport default pages\r\n"
  fs.writeFileSync(path.resolve(dirVars.logicDir, 'app/pages.js'), jsStr)
}
exports.build('')
