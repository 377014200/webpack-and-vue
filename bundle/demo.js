'use strict';
/*
*     这个文件是 test 文件
*
* */

module.exports = {
   // 打包的入口文件，只有和入口文件有关联的，打包时候才会打包 | 开发时候服务器才会监听变化
   entry: {
      app: './src/app.js',
      client: './src/client.css'
   },
   output: {
      // 配置输出文件存放在本地的目录，必须是 string 类型的绝对路径。
      path: path.resolve(__dirname,  '/'),
      // 配置输出文件的名称，为string 类型。[name]Chunk 的名称，就是对于上面entry对象的属性名
      filename: '[name].js',
      // 配置发布到线上资源的 URL 前缀，为string 类型。
      publicPath: '/face'
   },
   resolve: {
      // 指定哪些类型的文件，可以不写后缀名；打包的时候，自动尝试补全后缀名
      extensions: ['.js', '.vue', '.json'],
      // 别名，在任何文件内都可以用，打包的时候，匹配到别名，就会替换成别名对应的属性值
      alias: {
         '@': path.resolve(__dirname, './src')
      }
   },
   module: {
      // 解析文件用到的插件
      rules: [
         // 这个是给js和vue文件加eslint验证
         {
            // 匹配需要编码的文件格式
            test: /\.(js | vue)$/,
            // 插件名
            loader: 'eslint-loader',
            // 指定插件需要管理编译的文件夹范围
            include: [
               resolve('src')
            ],
            // 指定插件不需要管理编译的文件夹范围
            exclude: [
               path.resolve(__dirname, './src/assets/lib/view')
            ],
            options: {}
         }
      ]
   },
   plugins: [
      // 定义全局js变量（相当于window全局变量一样），key一定要大写，value一定要用JSON.stringify(value)转义
      new webpack.DefinePlugin({
         BASEPATH:  JSON.stringify('/')
      }),
      // 定义js全局模块变量（相当于window全局变量一样），value可以是node_modules里面的模块，也可以是alias里的别名
      new webpack.ProvidePlugin({
         $: 'jquery',
         jQuery: 'jquery'
      }),
      // 热更新（不刷新页面，局部替换页面改动的地方），当改变html、css或者一些不必要刷新页面的js，变化时，可以局部替换页面改动的地方，而不刷新页面；但是如果js改动，一定要刷新页面，才能正常展示，就会强制刷新
      new webpack.HotModuleReplacementPlugin(),
      // 把压缩好的css、js自动配置好路径引入html中
      new HtmlWebpackPlugin({
         // 输出文件的文件名称，默认为index.html，不配置就是该文件名；
         filename: 'index.html',
         // 本地模板文件的位置
         template: 'index.html',
         // 值为true、'body'，把js引入html中body底部；值为'head',把js引入html中head中
         inject: true
      }),
      // 在控制台打印出错误信息
      new FriendlyErrorsPlugin(),
      // 压缩js插件
      new webpack.optimize.UglifyJsPlugin({
         // 是否删除注释
         comments: true,
         compress: {
            // 是否删除警告信息
            warnings: false,
            // 是否删除debugger
            drop_debugger: true,
            // 是否删除console
            drop_console: true
         }
      }),
      // 把css从html中style便签写入css文件
      new ExtractTextPlugin({
         // 定义文件的名称。如果有多个入口文件时，应该定义为：[name].css
         filename: '[name].css'
      }),
      // 用于优化或者压缩CSS资源，一般配合 ExtractTextPlugin一起使用
      new OptimizeCssAssetsPlugin({
         cssProcessorOptions: {
            safe: true,
            // 是否去除老的css样式
            autoprefixer: {remove: false}
         }
      }),
      // 压缩文件，需要nginx服务器配合，浏览器请求xxx.js，服务器把压缩文件xxx.js.gz返回，浏览器解压后，再解码渲染
      new CompressionWebpackPlugin({
         // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
         asset: '[path].gz[query]',
         // 可以是 (buffer, cb) => cb(buffer) 或者是使用 zlib 里面的算法的 {String}
         algorithm: 'gzip',
         // 处理所有匹配此 {RegExp} 的资源
         test: /\.(js | css)$/,
         // 只处理比这个值大的资源。按字节计算
         threshold: 10240,
         // 只有压缩率比这个值小的资源才会被处理
         minRatio: 0.8
      })
   ]