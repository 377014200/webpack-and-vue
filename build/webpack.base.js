'use strict';
const merge = require( 'webpack-merge' );
const webpack = require( 'webpack' );
const VueLoaderPlugin = require( 'vue-loader/lib/plugin' );
const loaderConfig = require( './webpack.loader.js' );
const { resolve } = require( './utils' );
const isProduction = process.env.NODE_ENV === 'production';

module.exports = merge( loaderConfig, {
    context: resolve( './' ),
    entry: {
        app: './src/index.js',
    },
    plugins: [
        // new webpack.DefinePlugin( devMode ? env_dev : env_prod ),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin( {
            // $: 'jquery',
            '_': 'lodash',
        } ),
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

    },

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
        moduleTrace: false,
        cached: true,
        // 显示缓存的资产(将此设置为“false”只显示已发出的文件)
        cachedAssets: false,
    }

} );

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
