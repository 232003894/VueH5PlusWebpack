var path = require('path')
var glob = require('glob')
var fs = require('fs')
var dirVars = require('./dir-vars.config.js')
var pageArr = require('./page-entries.config.js')
var entries = {},
  basename, tmp, pathname
pageArr.forEach((entry) => {
  if (path.extname(entry).toLowerCase() === '.html') {

    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/')
    var star = tmp.indexOf("pages") + 1
    var length = tmp.lastIndexOf(basename) - star + 1
    pathname = tmp.splice(star, length).join('.')
    var last = tmp[tmp.length - 1].split('.')
    entries[pathname] = {
      web: pathname + '.' + last[last.length - 1],
      h5: "_www/html/" + pathname + '.' + last[last.length - 1]
    }
  }
})
var jsStr = "var pages = " + JSON.stringify(entries, null, 2).replace(/"/g, '\'')
jsStr += "\r\nexport default pages\r\n"

fs.writeFileSync(path.resolve(dirVars.libsDir, 'module/pages.js'), jsStr)
