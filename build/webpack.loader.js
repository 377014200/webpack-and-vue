'use strict';
const { assetsPath, resolve } = require ( './utils' );
const config = require ( '../config' );
const isProduction = process.env.NODE_ENV === 'production';
const ext = !isProduction ? '.[ext]' : '.[contenthash:' + config.build.hashLength + '].[ext]';
const { initCssLoader, } = require ( './utils' );
const cssLoader = initCssLoader ( {
    loader : 'css-loader',
    options : {}
} );
const lessLoader = initCssLoader ( {
    loader : 'less-loader',
    options : {}
} );
const scssLoader = initCssLoader ( {
    loader : 'sass-loader',
    options : { indentedSyntax : true },
} );
const stylusLoader = initCssLoader ( {
    loader : 'stylus-loader',
    options : {}
} );
const vueLoader = {
    test : /\.vue(\?.*)?$/,
    loader : 'vue-loader',
    options : {
        cacheDirectory : resolve ( 'node_modules\\.cache\\vue-loader' ),
        cacheIdentifier : '[chunkhash]',
        hotReload : true
    }
};
const imageLoader = {
    test : /\.(png|jpe?g|gif|webp)(\?.*)?$/,
    loader : 'url-loader',
    options : {
        name : assetsPath ( 'images/[name]' + ext ),
        limit : 2048,
    }
};
const fontLoader = {
    test : /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
    loader : 'url-loader',
    options : {
        name : assetsPath ( 'fonts/[name]' + ext ),
        limit : 4096,
        quality : 85,
    }
};
const svgLoader = {
    test : /\.(svg)(\?.*)?$/,
    loader : 'file-loader',
    options : {
        name : assetsPath ( 'svg/[name]' + ext ),
    }
};
const jsLoader = {
    test : /\.js(x)?$/,
    // include:  resolve('src')
    exclude : /node_modules/, // !!!
    loader : 'babel-loader',
    options : {
        'cacheDirectory' : true,
        'cacheIdentifier' : '[chukhash]',
    }
};

module.exports = {
    module : {
        rules : [
            vueLoader,
            cssLoader,
            lessLoader,
            scssLoader,
            stylusLoader,
            imageLoader,
            fontLoader,
            jsLoader,
            svgLoader,
        ]
    }
};
