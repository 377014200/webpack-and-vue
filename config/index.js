module.exports = function ( NODE_ENV ) {

   const { resolve } = require( 'path' );

   return {

      development: {
         NODE_ENV,
         output:{
            path: 'dist',
            publicPath: '/',
         },
         devServer: {
            contentBase: resolve( __dirname, '../public' ),
            // index: resolve('./public/index.html'),
            port: '3000',
            hot: true,
            hotOnly: true,
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
            open: 'Chrome',
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
      },

      production: {
         NODE_ENV,
         output:{
            path: 'dist',
            publicPath: '/',
         },
      }

   }[NODE_ENV || 'development'];

};