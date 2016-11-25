var vueConfig = require('./vendor/vue.config.js')

module.exports = {
  entry: require('./entry.dev.config.js'),
  output: require('./output.dev.config.js'),
  devtool: '#eval-source-map',
  module: require('./module.config.js'),
  plugins: require('./plugins.dev.config.js'),
  vue: {
    loaders: vueConfig.cssLoaders()
  },
  {{#lint}}
  eslint: require('./vendor/eslint.config.js'),
  {{/lint}}
  resolve: require('./resolve.config.js'),
  resolveLoader: require('./resolveLoader.config.js')
}
