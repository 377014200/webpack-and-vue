export default function ( Vue ) {
    import( /* webpackChunkName: "iview" */ 'iview/dist/styles/iview.css' );
    Vue.component( 'Button', () => import( /* webpackChunkName: "iview" */ 'iview/src/components/button' ) );
    Vue.component( 'Table', () => import( /* webpackChunkName: "iview" */ 'iview/src/components/table' ) );
    Vue.component( 'Panel', () => import( /* webpackChunkName: "iview" */ 'iview/src/components/panel' ) );
    Vue.component( 'Collapse', () => import( /* webpackChunkName: "iview" */ 'iview/src/components/collapse' ) );
}