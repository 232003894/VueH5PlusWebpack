var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob');
var fs = require('fs');
exports.getCustomeJS = function(globPath) {

  var entries = {},
    basename, tmp, pathname;
  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/')
    var star = tmp.indexOf("module") + 1;
    var length = tmp.lastIndexOf(basename) - star + 1;
    pathname = tmp.splice(star, length).join('.');
    var strHe = "";
    if (process.env.H5 === 'true') {
      strHe = '_www/module/';
    }
    var last = tmp[tmp.length - 1].split('.');
    entry = strHe + pathname + '.' + last[last.length - 1];
    entries[pathname] = entry;
  });

  var jsStr = "var pages =" + JSON.stringify(entries);
  jsStr += ";\r\n export default pages;";
  fs.writeFileSync('./src/assets/pages.js', jsStr);

  //return entries;
}

exports.getEntry = function(globPath) {
  var entries = {},
    basename, tmp, pathname;
  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry));

    tmp = entry.split('/')
    var star = tmp.indexOf("module") + 1;

    var length = tmp.lastIndexOf(basename) - star + 1;
    pathname = "module/" + tmp.splice(star, length).join('.');

    // tmp = entry.split('/').splice(-3);
    // pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
    entries[pathname] = entry;
  });
  return entries;
}


exports.assetsPath = function(_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.build.assetsSubDirectory :
    config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}
