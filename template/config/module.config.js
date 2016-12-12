var dirVars = require('./base/dir-vars.config.js')
module.exports = {
  {{#lint}}
  preLoaders: [{
    test: /\.vue$/,
    loader: 'eslint',
    include: dirVars.srcRootDir,
    exclude: [/node_modules/]
  }, {
    test: /\.js$/,
    loader: 'eslint',
    include: dirVars.srcRootDir,
    exclude: [/node_modules/]
  }],
  {{/lint}}
  loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel',
      include: dirVars.srcRootDir,
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      include: dirVars.srcRootDir,
      loader: 'vue-html'
    },
    //图片
    {
      test: /\.(png|jpe?g|gif)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        // [hash].[ext]
        name: 'img/[name].[ext]?[hash]'
      }
    },
    //字体
    {
      test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        // [hash].[ext]
        name: 'fonts/[name].[ext]?[hash]'
      }
    }, {
      test: /vux.src.*?js$/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }
  ],
};
