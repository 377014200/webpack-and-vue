'use strict';
const MiniCssExtractPlugin = require ( 'mini-css-extract-plugin' );
const path = require ( 'path' );
const config = require ( '../config' );
const isProduction = process.env.NODE_ENV === 'production';
const cssSourceMap = isProduction ? config.build.cssSourceMap : config.dev.cssSourceMap;
const styleLoader = isProduction ?
    {
        loader : MiniCssExtractPlugin.loader,
        options : {
            publicPath : '../../'
        }
    } : {
        loader : 'vue-style-loader',
        options : {
            sourceMap : cssSourceMap,
            shadowMode : false
        }
    };
exports.resolve = function ( dir ) {
    return path.join ( __dirname, '../', dir )
};
exports.assetsPath = function ( _path ) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory;
    return path.posix.join ( assetsSubDirectory, _path )
};

exports.createCssLoader = function ( option = {}, loader ) {
    const cssAutoprefixer = isProduction ? config.build.cssAutoprefixer : config.dev.cssAutoprefixer;
    let loaders = [];
    if ( cssAutoprefixer ) {
        loaders.push ( {
            loader : 'postcss-loader',
            options : {
                sourceMap : cssSourceMap
            }
        } )
    }
    // 其他加载程序；
    if ( loader ){
        if ( loader instanceof Array ) {
            loaders = loaders.concat ( loader.filter( item => item && item.loader ) )
        } else {
            loaders.push ( loader )
        }
    }
    return [
        styleLoader,
        {
            loader : 'css-loader',
            options : Object.assign ( {
                sourceMap : cssSourceMap,
                importLoaders : loaders.length,
                modules : false,
                localIdentName : !isProduction ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64]'
            }, option )
        }
    ].concat ( loaders )
};

exports.generateLoaders = function ( { loader, options = {}, beforeLoader, afterLoader }, cssModules ) {
    const _beforeLoader = beforeLoader instanceof Array ? beforeLoader : [beforeLoader];
    const _afterLoader = afterLoader instanceof Array ? afterLoader : [afterLoader];
    if ( loader === 'css-loader' ) {
        return exports.createCssLoader (
            { ...options, modules : cssModules },
            _afterLoader
        )
    }
    return exports.createCssLoader (
        { modules : cssModules },
        [
            ..._beforeLoader,
            {
                loader,
                options : Object.assign ( {}, options, {
                        sourceMap : cssSourceMap
                    },
                )
            },
            ..._afterLoader
        ] )
};
exports.initCssLoader = function ( {loader , options, beforeLoader, afterLoader} = {} ) {
    const bootstrap = {
        'css-loader' : /\.css$/,
        'less-loader' : /\.less$/,
        'sass-loader' : /\.scss$/,
        'stylus-loader' : /\.styl$/,
    };
    if ( loader in bootstrap){
        return {
            test : bootstrap[ loader ],
            oneOf : [
                {
                    resourceQuery : /module/,
                    use : exports.generateLoaders ( {loader, options, beforeLoader, afterLoader}, true ),
                },
                {
                    use : exports.generateLoaders ( {loader, options, beforeLoader, afterLoader} )
                },
            ]
        }
    }
    console.warn('You must have a loader' );
};