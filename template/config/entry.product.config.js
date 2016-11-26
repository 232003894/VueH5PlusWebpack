var path = require( 'path' )
var dirVars = require( './base/dir-vars.config.js' )
var pageArr = require( './base/page-entries.config.js' )
var configEntry = {};

pageArr.forEach( ( page ) => {
  if ( path.extname( page ).toLowerCase( ) === '.js' ) {
    var _page = page.replace( '\/' + path.basename( page ), '' ).replace( '\/', '_' )
    configEntry[ _page ] = path.resolve( dirVars.pagesDir, page )
  }
} )

//console.log( 'entry:' + JSON.stringify( configEntry ) )

module.exports = configEntry;
