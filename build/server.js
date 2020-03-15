'use strict';
const portfinder = require ( 'portfinder' );
const config = require ( '../config' );
const MyWebpackPlugin = require( './plugin/MyWebpckPugin' );
const address = require('address');
const chalk = require('chalk');
const Local = address.ip();

const webpackConfig = require ( './webpack.dev' );
module.exports = new Promise ( function ( resolve ) {
    portfinder.getPort ( {
        port : config.dev.port, // minimum port
    }, function ( err, port ) {
        if ( err ) {
            resolve ( err );
        } else {
            webpackConfig.devServer.port = port;
            webpackConfig.plugins.push (
                new MyWebpackPlugin ( {
                    message : [
                        chalk.blue(`The program runs on: `),
                        ' ',
                        chalk.blue(`http://localhost:${port}${config.dev.assetsPublicPath}`),
                        ' ',
                        chalk.blue(`http://${Local}:${port}${config.dev.assetsPublicPath}`)
                    ].join( "" )
                } )
            );
            resolve ( webpackConfig );
        }
    } );
} );