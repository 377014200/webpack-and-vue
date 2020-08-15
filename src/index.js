// Import ES6 Promise
// vuex 必须要 Promise polyfill; (使用了 @babel/plugin-transform-runtime)

import 'es6-promise/auto';
import Vue from './vue.esm';
import tem from './template';
// import Vue from 'vue';
// import installRouter from './router';
// import store from './store';
// import { sync } from 'vuex-router-sync';
// import AppView from './App';
// import enrollIviewComponent from './iviewComponents';
//
// const router = installRouter( Vue );
//
// Vue.config.warnHandler = function ( msg, vm, trace ) {
//    console.log( msg, vm, trace );
//
// };
// sync( store, router );
// enrollIviewComponent( Vue );
//
// new Vue( {
//    el: '#app',
//    router,
//    store,
//    created() {
//
//        console.log( this)
//        console.log( this)
//       // h 参数并没有自动注入到 render 中, jsx 并不能正常的工作, 手动解决这个问题
//       window.h = this.$createElement;
//
//    },
//    render: () => <AppView />
//
// } );
console.dir( Vue );
new Vue( {
   el: '#app',
   data: {
      name: '杀尽天下负我人',
      // sex: '男',
      age: 18,
      stature: 195,
   },
   mounted() {

      console.log( this.age.__ob__ );

   },
   methods: {
      onClick1() {

         this.stature = this.stature + 1;

      },
      onClick() {

         this.age = this.age + 1;

      },

   },
   render: tem.render
} );
