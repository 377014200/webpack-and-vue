'use strict';
const webpack = require( 'webpack' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const { resolve } = require( './utils' );

const webpackDllConfig = {
    context: resolve( './' ),

    entry: {
        // webpack.DllPlugin 的 options 用了 placeholder 所以 entry 里面的 value 要是数组格式否则报错
        vendors: ['lodash'],
    },
    mode: 'production',
    devtool: 'cheap-module-source-map',
    output: {
        path: resolve( 'dll' ),
        filename: '[name].[chunkhash].dll.js',
        // chunkFilename: '[name].[hash].dll.js',
        library: '[name]',
        // libraryTarget: 'umd'
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin( {
            path: resolve( 'dll', '[name]-manifest.json' ),
            name: '[name]',
        } ),
    ],
    optimization: {
        // 压缩
        // minimize: false,
    },
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
};

module.exports = webpackDllConfig;