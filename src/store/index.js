import Vuex from 'vuex';
import Vue from 'vue';

import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

import home from './modules/home';
import radius from './modules/radius';

Vue.use( Vuex );

/* eslint-disable no-shadow */
const store = new Vuex.Store( {
   state,
   mutations,
   actions,
   getters,
   modules: {
      home,
      radius
   },
   plugins: [store => {

      console.log( '查看 vuex plugin 选项' );
      // 当 store 初始化后调用
      store.subscribe( ( mutation ) => {
      // 每次 mutation 之后调用
      // mutation 的格式为 { type, payload }
         console.log( mutation );
      } );

   }]
} );


// vuex 需要手动配置 hmr
if ( module.hot ) {

   module.hot.accept(
      [
         './getters',
         './actions',
         './mutations',
         './modules/home',
         './modules/radius'
      ],
      function () {

         console.log( 'Accepting the updated in vuex!' );

         store.hotUpdate( {
            getters,
            actions,
            mutations,
            modules: {
               home,
               radius
            }
         } );

      }
   );

}
export default store;