// see http://vuejs-templates.github.io/webpack for documentation.
const path = require( 'path' );
module.exports = {
    build: {
        env: require( './prod.env' ),
        index: path.resolve( __dirname, '../dist/index.html' ),
        assetsRoot: path.resolve( __dirname, '../dist' ),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        cssSourceMap: true,
        devtool: 'cheap-module-source-map', // Source Maps
        //打包的时候开启gzip可以大大减少体积，非常适合于上线部署, 后台也需要做相应的部署；
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.report,
        happyPack: false,
        cssAutoprefixer: true,
        hashLength: 8,

    },
    dev: {
        env: require( './dev.env' ),
        host: 'localhost',
        port: 8020,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        devtool: 'cheap-module-eval-source-map', // Source Maps
        hotOnly: false,
        proxyTable: {
            // '/api': {
            //   target: 'http://www.winuim.com:12101/', //设置调用接口域名和端口号别忘了加http
            //   changeOrigin: true,
            //   pathRewrite: {
            //     '^/api': '/' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
            //     // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
            //   }
            // }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
        happyPack: false,
        cssAutoprefixer: true
    },
    dll: {
        happyPack: false,
        hashLength: 8,
        // value 必须是数组
        library: {
            vue: ['vue/dist/vue.esm.js', 'vue-router', 'vuex'],
            // iview: ['iview']
        }
    }
};
