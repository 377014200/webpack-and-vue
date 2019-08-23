'use strict';
process.env.NODE_ENV = 'production';

const merge = require( 'webpack-merge' );
const common = require( './webpack.common.js' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ); // <= 4.0 (webpack version)
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' ); // 压缩 css webpack3中一般配合 ExtractTextPlugin一起使用。
const AddAssetHtmlPlugin = require( 'add-asset-html-webpack-plugin' ); // 将 DLL 文件中的JavaScript或CSS资产添加到HTML -webpack-plugin生成的HTML中

const { resolve } = require( './utils' );
const ENV_CONFIG = require( '../config' )( process.env.NODE_ENV );

const { publicPath, path } = ENV_CONFIG.output;
const productionConfig = {

   mode: 'production',
   output: {
      filename: 'static/javascript/[name].[hash].js',
      path: resolve( path ),
      publicPath: publicPath,
      chunkFilename: 'static/[name].[chunkhash].js',
      // webpack能够在输出包中生成路径信息。
      // 然而，这给打包了数千个模块的项目带来了垃圾收集的压力。
      // 在options.output中关闭此选项。
      // pathinfo设置
      pathinfo: false,
   },
   devtool: 'cheap-module-source-map',
   plugins: [
      new CopyPlugin( [
         {
            from: resolve( 'public' ),
            to: 'static',
            ignore: ['*.html'],
         }
      ] ),
      new HtmlWebpackPlugin({
         template: resolve( 'public/index.html' ),
         // 参考 https://github.com/kangax/html-minifier#options-quick-reference
         // 压缩
         minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false
         }
      } ),
      new MiniCssExtractPlugin( {
         filename: 'static/css/[name].[chunkhash].css',
         chunkFilename: 'static/[name].[chunkhash].css'
      } ),
      new OptimizeCssAssetsPlugin( {
         assetNameRegExp: /\.css$/g,
         cssProcessor: require( 'cssnano' ),
         cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
         canPrint: true
      } ),
      new webpack.DllReferencePlugin( {
         manifest: resolve( './dll', 'vendors-manifest.json' ),
      } ),

      new AddAssetHtmlPlugin( {
         // filepath: resolve( './dll/*.dll.js' ),
         filepath: resolve( 'dll', 'vendors.*.dll.js' ),
         outputPath: 'static/vendors/',
         publicPath: publicPath + 'static/vendors/'
      } )
   ],
   optimization: {
      // 压缩: 暂时没有压缩 production 下是默认的
      minimize: true,
      // minimizer: [
      //    new TerserPlugin( { // 这个配置没什么明显的效果他应该是默认的
      //       test: /\.js(\?.*)?$/i,
      //       sourceMap: true,
      //       parallel: true, // 并行
      //       cache: true,
      //       exclude: /[\\/]node_module[\\/]/,
      //       // terserOptions: {
      //       //    compress:{
      //       //       warnings:false,
      //       //       drop_debugger:true,
      //       //       // drop_console:true
      //       //    },
      //       //    output: {
      //       //       comments: false, //去掉注释
      //       //    },
      //       // },
      //
      //    } ),
      // ],
      nodeEnv: 'production',
   }
};

module.exports = merge( productionConfig, common( ENV_CONFIG ) );


