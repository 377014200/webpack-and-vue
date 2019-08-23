'use strict';

const merge = require( 'webpack-merge' );
const webpack = require( 'webpack' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const VueLoaderPlugin = require( 'vue-loader/lib/plugin' );

module.exports = function ( ENV ) {

   const loaderConfig = require( './webpack.loader.js' );
   const devMode = ENV.NODE_ENV === 'development';
   const env_dev = require( '../config/dev.js' );
   const env_prod = require( '../config/prod.js' );
   const { resolve } = require( './utils' );

   console.log( '[ 欲上青天揽明月 ]' + ': ' + process.env.NODE_ENV );

   const commonConfig = {

      context: resolve( './' ),
      entry: {
         app: './src/index.js',
      },
      plugins: [

         new CleanWebpackPlugin(),
         new webpack.DefinePlugin( devMode ? env_dev : env_prod ),
         new VueLoaderPlugin(),
         new webpack.ProvidePlugin( {
            // $: 'jquery',
            '_': 'lodash',
         } ),
         // Webpack插件和CLI实用程序，它将包内容表示为方便的交互式可缩放树地图,
         // 分析打包结构时很有用, 在需要时打开它, 否则关闭它
         // new BundleAnalyzerPlugin()

      ],
      resolve: {
         aliasFields: ['browser'],
         // 尝试按顺序解析这些扩展。
         extensions: ['.js', '.vue', '.json'],
         alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve( 'src' ),
            CSS: resolve( 'src/assets/css' ),
            IMG: resolve( 'src/assets/images' ),
            JS: resolve( 'src/assets/javascript' ),
            view: resolve( 'src/view' ),
            components: resolve( 'src/components' ),
            router: resolve( 'src/router' ),
            store: resolve( 'src/store' ),
         }
      },
      optimization: {
         /*
         *
         *        它的作用是将包含chunks 映射关系的 list单独从 app.js里提取出来，
         *     因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，
         *     所以你每次改动都会影响它，如果不将它提取出来的话，等于app.js每次都会改变。
         *     缓存就失效了。
         *
         * */
         runtimeChunk: 'single', // !!!!
         // 告诉webpack检测并删除空块
         removeEmptyChunks: true,
         // 目前来看分割 css 和 js 很不错, 其他的静态资源的分割交给 file-loader !!
         splitChunks: {
            // chunks: 'all',
            minSize: 10240, // 10kb
            cacheGroups: {
               vue: {
                  test: /[\\/]node_modules[\\/](vue|vuex|vue-router|vuex-router-sync)[\\/]/,
                  enforce: true,
                  priority: -10,
                  chunks: 'all',
                  filename: `static/vendors/[name]${ devMode ? '' : '.[chunkhash]' }.js`,
                  name: 'vue~vuex~vue-router'
               },
               globalStyles: { // 提取 css 有个问题就是 runtime 好像是走的这个出口
                  // 复用的 css 处于测试阶段
                  name: 'css/global-style',
                  filename: `static/javascript/stylesheet/global-style${ devMode ? '' : '.[chunkhash]' }.js`,
                  test: /[\\/]extract[\\/]\w*\.(sa|sc|c)ss$/,
                  chunks: 'all',
                  enforce: true,
               },
               iviewCss: {
                  // test: 'iview/dist/styles/iview.css',
                  test: /iview\.css$/ ,
                  enforce: true,
                  chunks: 'all',
                  // 因 css 而生成的这个 js 文件和这个 css 放在一起
                  filename: `static/[name]${ devMode ? '' : '.[chunkhash]' }.js`,
                  name: 'vendors/iview/iview_style.main'
               },
               iview: {
                  test: /[\\/]node_modules[\\/]iview[\\/]/,
                  enforce: true,
                  chunks: 'all',
                  priority: -10,
                  filename: `static/vendors/iview/[name]${ devMode ? '' : '.[chunkhash]' }.js`,
               },
               vendors: { // 将第三方的类库提取出来放到指定的文件中- js
                  test: /[\\/]node_modules[\\/](lodash|jQuery)[\\/]/,
                  priority: -10,
                  chunks: 'all',
                  filename: `static/vendors/[name]${ devMode ? '' : '.[chunkhash]' }.js`,
                  enforce: true,
                  name: ( module ) => {

                     /*
                     * rawRequest: 'lodash',
                     * module.identifier()           =>返回路径
                     * */
                     return module.rawRequest;

                  },
               },
            }
         }
      },
      /*
            这些选项可以控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」。
       此功能受到 webpack 性能评估的启发
     */
      performance: {
         hints: 'warning',
         // 入口起点的最大体积 单位: b
         maxEntrypointSize: 31457280, // 30mb
         // 生成文件的最大体积 单位: b
         maxAssetSize: 1048576, // 1mb
         assetFilter: function( assetFilename ) {

            // 提供资源文件名的断言函数
            return assetFilename.endsWith( '.css' ) || assetFilename.endsWith( '.js' );

         }
      }, // performance end
      // 这是和控制台输出的信息有关的信息
      stats: {
         // 这个属性暂时没用
         colors: {
            green: '\u001b[32m',
         },
         // 增加 child 的信息(false== 关闭)
         children: false,
         // 添加构建模块信息(false== 关闭)
         modules: false,
         // 显示警告/错误的依赖关系和来源(自webpack 2.5.0起)
         moduleTrace: true,
         cached: false,
         // 显示缓存的资产(将此设置为“false”只显示已发出的文件)
         cachedAssets: false,
      }

   };

   return merge( commonConfig, loaderConfig( ENV ) );

};

/*
* splitChunks: {
    chunks: "async”,//适用于那些 chunk 默认作用于异步chunk，值为all/initial/async/function(chunk),值为function时第一个参数为遍历所有入口chunk时的chunk模块，chunk._modules为gaichunk所有依赖的模块，通过chunk的名字和所有依赖模块的resource可以自由配置,会抽取所有满足条件chunk的公有模块，以及模块的所有依赖模块，包括css
    minSize: 30000,  //默认值是30kb
    minChunks: 1,  //被多少模块共享
    maxAsyncRequests: 5,  //所有异步请求不得超过5个
    maxInitialRequests: 3,  //初始话并行请求不得超过3个
    name: true,  //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔开，如vendor~
    cacheGroups: { //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
       common: {
         name: 'common',  //抽取的chunk的名字
         chunks(chunk) { //同外层的参数配置，覆盖外层的chunks，以chunk为维度进行抽取
         },
         test(module, chunks) {  //可以为字符串，正则表达式，函数，以module为维度进行抽取，只要是满足条件的module都会被抽取到该common的chunk中，为函数时第一个参数是遍历到的每一个模块，第二个参数是每一个引用到该模块的chunks数组。自己尝试过程中发现不能提取出css，待进一步验证。
         },
        priority: 10,  //优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
       minChunks: 2,  //最少被几个chunk引用
       reuseExistingChunk: true，//	如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
       enforce: true  // 告诉webpack忽略splitChunks.minSize | splitChunks.minChunks | splitChunks.maxAsyncRequests | splitChunks.maxInitialRequests 选项，并始终为这个缓存组创建块
       }
    }
* */
