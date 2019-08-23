'use strict';
process.env.NODE_ENV = 'development';

const merge = require( 'webpack-merge' );
const common = require( './webpack.common.js' );
const { resolve } = require( './utils' );
// const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ); // <= 4.0 (webpack version)
const MyWebpackPlugin = require( './plugin/MyWebpckPugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

const ENV_CONFIG = require( '../config' )( process.env.NODE_ENV );
const { publicPath, path } = ENV_CONFIG.output;

const developmentConfig = {

   mode: 'development',
   output: {
      filename: 'static/javascript/[name].js',
      path: resolve( path ),
      publicPath: publicPath,
      chunkFilename: 'static/javascript/[name].bundle.js',
   },
   devtool: 'cheap-module-eval-source-map',
   devServer: ENV_CONFIG.devServer,
   plugins: [
      // 开发环境下其实没有用到这个plugin ,开发环境下并没有拆分 css 代码
      // new MiniCssExtractPlugin( {
      //    filename: 'static/css/[name].css',
      //    chunkFilename: 'static/[name].css'
      // } ),
      new MyWebpackPlugin(),
      new HtmlWebpackPlugin( { template: resolve( 'public/index.html' ) } ),
   ],
};

module.exports = merge( developmentConfig, common( ENV_CONFIG ) );


