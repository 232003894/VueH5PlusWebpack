var vueConfig = require('./vendor/vue.config.js')

module.exports = {
  entry: require('./entry.product.config.js'),
  output: require('./output.product-H5.config.js'),
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
