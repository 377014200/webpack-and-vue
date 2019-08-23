
import Router from 'vue-router';

const routerConfig = {
   mode: 'history',
   // base: '/production/',
   base: routerBase || '/',
   linkExactActiveClass: 'active',
   // 这个 routes 让我采坑了写成了 routers
   // component: lazy 必须要是函数返回, 在某些情况下,路径也是出现问题最多, 你很难发觉
   routes: [
      {
         path: '/',
         component: () => import( /* webpackChunkName: "module/home" */ 'view/home/home' )
      },
      {
         path: '/sidebar',
         name: 'sidebar',
         component: () => import( /* webpackChunkName: "module/[request]" */ 'view/sidebar/sidebar' )
      },
      {
         path: '/radius',
         name: 'radius',
         component: () => import( /* webpackChunkName: "module/[request]" */ 'view/radius/radius' )
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