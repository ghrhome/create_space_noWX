var path = require('path')
var utils = require('./utils')
var webpack=require("webpack")
var projectRoot = path.resolve(__dirname, '../')
const vuxLoader = require('vux-loader')

var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

let webpackConfig = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      /*{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },*/
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        //include: [resolve('src'), resolve('test')]
        include: [resolve('src'), resolve('test'),resolve('node_modules/dom7'),resolve('node_modules/swiper')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
var jQueryPlugin=new webpack.ProvidePlugin({
  jQuery: "jquery",
  $: "jquery"
});

//vux-less变量列表
const lessTheme = {
  name: 'less-theme',
  path: path.resolve(__dirname, '../src/static/css/vux-theme.less')
};

//自定义less变量列表
// const theme = {
//   name: 'style-parser',
//   fn: function (source) {
//     var importVuxTheme = '',
//       importTheme = '';
//     if(!/\/node_modules\//.test(this.resourcePath) && /\/src\/(.*)/.test(this.resourcePath)){
//       let length = RegExp.$1.split('/').length-1;
//
//       importVuxTheme += '@import "';
//       importTheme += '@import "';
//
//       for(var i = 0; i < length; ++i) {
//         importVuxTheme += '../';
//         importTheme += '../';
//       }
//       importTheme += 'static/css/theme.less";';
//       importVuxTheme += 'static/css/vux-theme.less";';
//     }
//
//     return importVuxTheme+"\n"+importTheme+"\n" + source // 你可以根据this.resourcePath 来确定是否要引入以及引入的相对路径
//   }
// };

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style',
    lessTheme,
    // theme,
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    'jQueryPlugin']
})
