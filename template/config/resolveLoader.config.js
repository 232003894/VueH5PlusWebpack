var path = require( 'path' );
var dirVars = require( './base/dir-vars.config.js' );
module.exports = {
  fallback: [ path.join( __dirname, '../node_modules' ) ]
}
