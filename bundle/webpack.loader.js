'use strict';
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { resolve } = require( './utils' );

module.exports = function ( ENV ) {

   const { NODE_ENV = 'production' } = ENV;
   const devMode = NODE_ENV === 'development';

   // 他出现问题,你很难找到他, 他不会说话;
   function staticOutputPtah( type ) { // 把 svg 和 font 的静态资源和第三方的分别存放

      const RE_node_modules = /[\\/]?node_modules[\\/]/;
      const RE_base = /[\\/]?node_modules[\\/](\w+)?/;
      const RE_file_name = { // 这个正则出现的问题最多 !!!
         svg: /(\w+\.?\w*)\.(svg)(\?.*)?$/,
         fonts: /(\w+\.?\w*)\.(woff2?|eot|ttf|otf)(\?.*)?$/,
         images: /(\w+\.?\w*)\.(png|jpe?g|gif|webp)(\?.*)?$/,
      };
      return function ( url ) {

         const fileName = RE_file_name[type].exec( url );

         if ( !fileName ) {

            console.warn( '[ 欲上青天揽明月 ]:   没有匹配到静态资源的文件名,返回了原始的路径: ' + url );
            return url;

         }

         // console.log( '[ 欲上青天揽明月 ]: 静态资源匹配成功: "' + url + '"; 来自 (url-loader | file-loader) 的处理程序' );
         if ( RE_node_modules.test( url ) ) {

            let base = RE_base.exec( url ) || ['','reject'];
            return ['static/vendors' , base[1] , type , fileName[0]].join( '/' );

         }

         return ['static', type, fileName[0]].join( '/' );

      };

   }

   return {
      module: {
         noParse: /^(vue|vue-router|vuex|vuex-router-sync|jquery|lodash)$/,
         rules: [
            // vue
            {
               test: /\.vue(\?.*)?$/,
               use: [
                  /* config.module.rule('vue').use('cache-loader') */
                  {
                     loader: 'cache-loader',
                     options: {
                        cacheDirectory: resolve( 'node_modules\\.cache\\vue-loader' ),
                        cacheIdentifier: '[chunkhash]'
                     }
                  },
                  /* config.module.rule('vue').use('vue-loader') */
                  {
                     loader: 'vue-loader',
                     options: {
                        compilerOptions: {
                           preserveWhitespace: false
                        },
                        cacheDirectory: resolve( 'node_modules\\.cache\\vue-loader' ),
                        cacheIdentifier: '[chunkhash]',
                        hotReload: devMode
                     }
                  }
               ]
            },

            // css
            // MiniCssExtractPlugin.loader: 会提取 css
            // vue-style-loader: 不会提取 css,
            {
               test: /\.css$/,
               oneOf: [
                  /* config.module.rule('css').oneOf('vue-modules') */
                  {
                     resourceQuery: /module/,
                     use: [
                        /* config.module.rule('css').oneOf('vue-modules').use('vue-style-loader') */
                        devMode ? {
                           loader: 'vue-style-loader',
                           options: {
                              sourceMap: false,
                              shadowMode: false
                           }
                        } : MiniCssExtractPlugin.loader,
                        /* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
                        {
                           loader: 'css-loader',
                           options: {
                              sourceMap: false,
                              importLoaders: 2,
                              modules: true,
                              localIdentName: '[name]_[local]_[hash:base64:5]'
                           }
                        },
                        /* config.module.rule('css').oneOf('vue-modules').use('postcss-loader') */
                        {
                           loader: 'postcss-loader',
                           options: {
                              sourceMap: false
                           }
                        }
                     ]
                  },
                  /* config.module.rule('css').oneOf('vue') */
                  {
                     resourceQuery: /\?vue/,
                     use: [
                        /* config.module.rule('css').oneOf('vue').use('vue-style-loader') */
                        devMode ? {
                           loader: 'vue-style-loader',
                           options: {
                              sourceMap: false,
                              shadowMode: false
                           }
                        } : MiniCssExtractPlugin.loader,
                        /* config.module.rule('css').oneOf('vue').use('css-loader') */
                        {
                           loader: 'css-loader',
                           options: {
                              sourceMap: false,
                              importLoaders: 2
                           }
                        },
                        /* config.module.rule('css').oneOf('vue').use('postcss-loader') */
                        {
                           loader: 'postcss-loader',
                           options: {
                              sourceMap: false
                           }
                        }
                     ]
                  },
                  /* config.module.rule('css').oneOf('normal-modules') */
                  {
                     test: /\.module\.\w+$/,
                     use: [
                        /* config.module.rule('css').oneOf('normal-modules').use('vue-style-loader') */
                        devMode ? {
                           loader: 'vue-style-loader',
                           options: {
                              sourceMap: false,
                              shadowMode: false
                           }
                        } : MiniCssExtractPlugin.loader,
                        /* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
                        {
                           loader: 'css-loader',
                           options: {
                              sourceMap: false,
                              importLoaders: 2,
                              modules: true,
                              localIdentName: '[name]_[local]_[hash:base64:5]'
                           }
                        },
                        /* config.module.rule('css').oneOf('normal-modules').use('postcss-loader') */
                        {
                           loader: 'postcss-loader',
                           options: {
                              sourceMap: false
                           }
                        }
                     ]
                  },
                  /* config.module.rule('css').oneOf('normal') */
                  {
                     // css - normal
                     use: [
                        /* config.module.rule('css').oneOf('normal').use('vue-style-loader') */
                        devMode ? {
                           loader: 'vue-style-loader',
                           options: {
                              sourceMap: false,
                              shadowMode: false
                           }
                        } : MiniCssExtractPlugin.loader,
                        // {
                        //    loader: MiniCssExtractPlugin.loader,
                        //    options: {
                        //       // only enable hot in development
                        //       hmr: devMode,
                        //       // if hmr does not work, this is a forceful method.
                        //       reloadAll: true,
                        //    },
                        // },
                        /* config.module.rule('css').oneOf('normal').use('css-loader') */
                        {
                           loader: 'css-loader',
                           options: {
                              sourceMap: false,
                              importLoaders: 2
                           }
                        },
                        /* config.module.rule('css').oneOf('normal').use('postcss-loader') */
                        {
                           loader: 'postcss-loader',
                           options: {
                              sourceMap: false
                           }
                        }
                     ]
                  }
               ]
            },
            /* config.module.rule('less') */
            // less
            {
               test: /\.less$/,
               oneOf: [
                  /* config.module.rule('less').oneOf('vue-modules') */
                  {
                     resourceQuery: /module/,
                     use: [
                        /* config.module.rule('less').oneOf('vue-modules').use('vue-style-loader') */
                        devMode ? {
                           loader: 'vue-style-loader',
                           options: {
                              sourceMap: false,
                              shadowMode: false
                           }
                        } : MiniCssExtractPlugin.loader,
                        /* config.module.rule('less').oneOf('vue-modules').use('css-loader') */
                        {
                           loader: 'css-loader',
                           options: {
                              sourceMap: false,
                              importLoaders: 2,
                              modules: true,
                              localIdentName: '[name]_[local]_[hash:base64:5]'
                           }
                        },
                        /* config.module.rule('less').oneOf('vue-modules').use('postcss-loader') */
                        {
                           loader: 'postcss-loader',
                           options: {
                              sourceMap: false
                           }
                        },
                        /* config.module.rule('less').oneOf('vue-modules').use('less-loader') */
                        {
                           loader: 'less-loader',
                           options: {
                              sourceMap: false
                           }
                        }
                     ]
                  },
                  /* config.module.rule('less').oneOf('vue') */
                  {
                     resourceQuery: /\?vue/,
                     use: [
                        /* config.module.rule('less').oneOf('vue').use('vue-style-loader') */
                        devMode ? {
                           loader: 'vue-style-loader',
                           options: {
                              sourceMap: false,
                              shadowMode: false
                           }
                        } : MiniCssExtractPlugin.loader,
                        /* config.module.rule('less').oneOf('vue').use('css-loader') */
                        {
                           loader: 'css-loader',
                           options: {
                              sourceMap: false,
                              importLoaders: 2
                           }
                        },
                        /* config.module.rule('less').oneOf('vue').use('postcss-loader') */
                        {
                           loader: 'postcss-loader',
                           options: {
                              sourceMap: false
                           }
                        },
                        /* config.module.rule('less').oneOf('vue').use('less-loader') */
                        {
                           loader: 'less-loader',
                           options: {
                              sourceMap: false
                           }
                        }
                     ]
                  },
                  /* config.module.rule('less').oneOf('normal-modules') */
                  {
                     test: /\.module\.\w+$/,
                     use: [
                        /* config.module.rule('less').oneOf('normal-modules').use('vue-style-loader') */
                        devMode ? {
                           loader: 'vue-style-loader',
                           options: {
                              sourceMap: false,
                              shadowMode: false
                           }
                        } : MiniCssExtractPlugin.loader,
                        /* config.module.rule('less').oneOf('normal-modules').use('css-loader') */
                        {
                           loader: 'css-loader',
                           options: {
                              sourceMap: false,
                              importLoaders: 2,
                              modules: true,
                              localIdentName: '[name]_[local]_[hash:base64:5]'
                           }
                        },
                        /* config.module.rule('less').oneOf('normal-modules').use('postcss-loader') */
                        {
                           loader: 'postcss-loader',
                           options: {
                              sourceMap: false
                           }
                        },
                        /* config.module.rule('less').oneOf('normal-modules').use('less-loader') */
                        {
                           loader: 'less-loader',
                           options: {
                              sourceMap: false
                           }
                        }
                     ]
                  },
                  /* config.module.rule('less').oneOf('normal') */
                  {
                     use: [
                        /* config.module.rule('less').oneOf('normal').use('vue-style-loader') */
                        devMode ? {
                           loader: 'vue-style-loader',
                           options: {
                              sourceMap: false,
                              shadowMode: false
                           }
                        } : MiniCssExtractPlugin.loader,
                        /* config.module.rule('less').oneOf('normal').use('css-loader') */
                        {
                           loader: 'css-loader',
                           options: {
                              sourceMap: false,
                              importLoaders: 2
                           }
                        },
                        /* config.module.rule('less').oneOf('normal').use('postcss-loader') */
                        {
                           loader: 'postcss-loader',
                           options: {
                              sourceMap: false
                           }
                        },
                        /* config.module.rule('less').oneOf('normal').use('less-loader') */
                        {
                           loader: 'less-loader',
                           options: {
                              sourceMap: false
                           }
                        }
                     ]
                  }
               ]
            },

            /* config.module.rule('svg') */
            // svg
            {
               test: /\.(svg)(\?.*)?$/,
               use: [
                  {
                     loader: 'file-loader',
                     options: {
                        name: '[path][name]' + ( devMode ? '.[ext]' : '.[hash].[ext]' ),
                        outputPath: staticOutputPtah( 'svg' )
                     }
                  }
               ]
            },
            // images
            {
               test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
               use: [
                  {
                     loader: 'url-loader',
                     options: {
                        name: '[path][name]' + ( devMode ? '.[ext]' : '.[hash].[ext]' ),
                        limit: 20480,
                        fallback: 'file-loader',
                        outputPath: staticOutputPtah( 'images' ),
                     }
                  }
               ]
            },
            /* config.module.rule('fonts') */
            // fonts
            {
               test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
               use: [
                  /* config.module.rule('fonts').use('url-loader') */
                  {
                     loader: 'url-loader',
                     options: {
                        name: '[path][name]' + ( devMode ? '.[ext]' : '.[hash].[ext]' ),
                        limit: 4096,
                        quality: 85,
                        fallback: 'file-loader',
                        outputPath: staticOutputPtah( 'fonts' ),
                     }
                  }
               ]
            },

            // javascript
            {
               test: /\.js$/,
               // include:  resolve('src')
               exclude: /node_modules/, // !!!
               loader: 'babel-loader',
               options: {
                  'cacheDirectory': true,
                  'cacheIdentifier': '[chukhash]',
               }
            },
            // 下面的暂时没用到
            // {
            //    test: /\.(csv|tsv)$/,
            //    use: [
            //       'csv-loader'
            //    ]
            // },
            // {
            //    test: /\.xml$/,
            //    use: [
            //       'xml-loader'
            //    ]
            // },
         ], // rule => end

      }, // module => end
   };

};