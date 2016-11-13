var vueConfig = require('./vendor/vue.config.js')


module.exports = {
  entry: require('./entry.product.config.js'),

  output: require('./output.product.config.js'),

  // devtool: '#eval-source-map',

  module: require('./module.config.js'),

  plugins: require('./plugins.product.config.js'),

  vue: {
    loaders: vueConfig.cssLoaders({
      sourceMap: false,
      extract: true
    })
  },
  {{#lint}}
  eslint: require('./vendor/eslint.config.js'),
  {{/lint}}
  resolve: require('./resolve.config.js'),
  resolveLoader: require('./resolveLoader.config.js')

}
