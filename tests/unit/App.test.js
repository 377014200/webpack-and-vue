/* \
*
*     api 参考: https://jestjs.io/docs/zh-Hans/api#beforeeachfn-timeout
*
*
* */


import Vue from 'vue';
import App from '../../src/App.vue';
// import App from './App.vue';
import Sidebar from '../../src/view/sidebar/sidebar.vue';

describe( 'App.test.js', () => {

   let Cmp, vm;

   beforeEach( () => {

      Cmp = Vue.extend( App ); // Create a copy of the original component
      vm = new Cmp( {
         data: {
            // Replace data value with this fake data
            messages: ['Cat']
         }
      } ).$mount(); // Instances and mounts the component

   } );

   it( 'equals messages to ["Cat"]', () => {

      expect( vm.messages ).toEqual( ['Cat'] );

   } );

} );


describe( 'Sidebar Test', () => {

   let Cmp, vm;

   beforeEach( () => {

      Cmp = Vue.extend( Sidebar ); // Create a copy of the original component
      vm = new Cmp( {
         data: {
            // Replace data value with this fake data
            messages: ['Cat']
         }
      } ).$mount(); // Instances and mounts the component

   } );

   it( 'equals messages to ["Cat"]', () => {

      expect( vm.messages ).toEqual( ['Cat'] );

   } );

} );

