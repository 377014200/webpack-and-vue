
import Router from 'vue-router';

const routerConfig = {
  mode: 'history',
  // base: '/production/',
  // routerBase 是在 config 文件中配置的环境变量
  // base: routerBase || '/',
  linkExactActiveClass: 'active',
  // component: lazy 必须要是函数返回, 在某些情况下,路径也是出现问题最多, 你很难发觉
  routes: [
    {
      path: '/',
      component: () => import( /* webpackChunkName: "pages" */ 'view/home/Home' )
    },
    {
      path: '/html',
      name: 'html',
      component: () => import( /* webpackChunkName: "html" */ 'view/html' )
    },
    {
      path: '/css',
      name: 'css',
      component: () => import( /* webpackChunkName: "css" */ 'view/css' ),
    },
    {
      path: '/js',
      name: 'js',
      component: () => import( /* webpackChunkName: "js" */ 'view/js/' )
    },
    {
      path: '/vue',
      name: 'vue',
      component: () => import( /* webpackChunkName: "vue" */ 'view/vue' )
    },
    {
      path: '/test',
      name: 'test',
      component: () => import( /* webpackChunkName: "test" */ 'view/test' )
    },
    // {
    //     path: 'webpack',
    //     name: 'webpack',
    //     component: () => import( /* webpackChunkName: "webpack" */ 'view/webpack' )
    // }

  ]
};


export default function ( Vue ) {
  Vue.use( Router );

  return new Router( routerConfig );
}