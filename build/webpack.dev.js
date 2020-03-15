'use strict';
const merge = require( 'webpack-merge' );
const webpack = require( 'webpack' );
const webpackBaseConfig = require( './webpack.base.js' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const env = require( '../config/dev.env.js' );
const config = require( '../config' );
const { resolve } = require( './utils' );

module.exports = merge( webpackBaseConfig, {
    mode: 'development',
    devtool: config.dev.devtool,
    devServer: {
        contentBase: resolve('public' ),
        // index: resolve('./public/index.html'),
        port: config.dev.port,
        hot: true,
        hotOnly: true,
        host: config.dev.host,
        // 告诉开发服务器查看由开发服务器提供的文件。contentBase选项。默认情况下是禁用的。启用时，文件更改将触发重新加载整个页面。
        watchContentBase: true,
        clientLogLevel: 'silent',
        // 启用gzip压缩所有服务:
        // compress: true,
        // 单页面路由, 这里设置成 Boolean 并没有解决问题, 改成如下设置; !!
        historyApiFallback: {
            index: '/'
        },
        // 启用热模块替换(请参阅devServer.hot)，在构建失败时不刷新页面作为回退
        // hotOnly: true
        // 控制台将不显示任何消息
        // noInfo: true
        proxy: config.dev.proxyTable,
        open: false,
        // 当存在编译器错误或警告时，在浏览器中显示全屏覆盖。默认情况下禁用。如果只想显示编译器错误:
        overlay: {
            // warnings: true,
            errors: true
        },
        // 启用了静默，除了初始启动信息外，什么都不会写入控制台。这也意味着来自webpack的错误或警告是不可见的。
        // quiet: true
        // 为devServer提供一个函数。writeToDisk可用于过滤。该函数遵循与Array#filter相同的前提，其中布尔返回值告诉是否应该将文件写入磁盘。
        // writeToDisk: (filePath) => {
        //    return /superman\.css$/.test(filePath);
        // }
    },
    plugins: [
        new webpack.DefinePlugin( env ),
        new HtmlWebpackPlugin( { template: resolve( './public/index.html' ) } ),
    ],
});


