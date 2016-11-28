var path = require('path')
var dirVars = require('./base/dir-vars.config.js')
var pageArr = require('./base/page-entries.config.js')
var configEntry = {};

pageArr.forEach((page) => {
  var ext = '.js'
  var basename = 'entry' + ext
  if (path.basename(page) === basename) {
    // if ( path.extname( page ).toLowerCase( ) === ext ) {
    var _page = page.replace('\/' + basename, '').replace('\/', '_')
    configEntry[_page] = path.resolve(dirVars.pagesDir, page)
  }
})

//console.log( 'entry:' + JSON.stringify( configEntry ) )

module.exports = configEntry;
