
import Router from 'vue-router';

const routerConfig = {
   mode: 'history',
   // base: '/production/',
   // routerBase 是在 config 文件中配置的环境变量
   base: routerBase || '/',
   linkExactActiveClass: 'active',
   // component: lazy 必须要是函数返回, 在某些情况下,路径也是出现问题最多, 你很难发觉
   routes: [
      {
         path: '/',
         component: () => import( /* webpackChunkName: "module/home" */ 'view/home/Home' )
      },
      {
         path: '/sidebar',
         name: 'sidebar',
         component: () => import( /* webpackChunkName: "module/sidebar" */ 'view/sidebar/Sidebar' )
      },
      {
         path: '/radius',
         name: 'radius',
         component: () => import( /* webpackChunkName: "module/radius" */ 'view/radius/Radius' )
      },
      {
         path: '/black',
         name: 'black',
         component: () => import( /* webpackChunkName: "module/jsx" */ 'view/jsx/Black' )
      },
      {
         path: '*',
         name: '404',
         component: () => import( /* webpackChunkName: "module/404" */ 'view/error/404' )
      }
   ]
};


export default function ( Vue ) {

   Vue.use( Router );

   return new Router( routerConfig );

}