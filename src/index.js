// Import ES6 Promise
// vuex 必须要 Promise polyfill; (使用了 @babel/plugin-transform-runtime)

import 'es6-promise/auto';
// import Vue from './vue.esm';
// import tem from './template';
import Vue from 'vue';
import installRouter from './router';
import store from './store';
import { sync } from 'vuex-router-sync';
import AppView from './App';
import enrollIviewComponent from './iviewComponents';

const router = installRouter( Vue );

// eslint-disable-next-line consistent-this
Vue.config.warnHandler = function ( msg, vm, trace ) {
    console.error( msg, vm, trace );
};
sync( store, router );
enrollIviewComponent( Vue );

new Vue( {
    el: '#app',
    router,
    store,
    created() {
        console.log( this );
        console.log( this );
        // h 参数并没有自动注入到 render 中, jsx 并不能正常的工作, 手动解决这个问题
        window.h = this.$createElement;
    },
    render: () => <AppView/>

} );
