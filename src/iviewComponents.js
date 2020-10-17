export default function ( Vue ) {
    import( /* webpackChunkName: "iview-ui/iview" */ 'iview/dist/styles/iview.css' );
    Vue.component( 'Button', () => import( /* webpackChunkName: "iview-ui/button" */ 'iview/src/components/button' ) );
    Vue.component( 'Table', () => import( /* webpackChunkName: "iview-ui/table" */ 'iview/src/components/table' ) );
    Vue.component( 'Panel', () => import( /* webpackChunkName: "iview-ui/panel" */ 'iview/src/components/panel' ) );
    Vue.component( 'Collapse', () => import( /* webpackChunkName: "iview-ui/collapse" */ 'iview/src/components/collapse' ) );
    Vue.component( 'BreadcrumbItem', () => import( /* webpackChunkName: "iview-ui/breadcrumb" */ 'iview/src/components/breadcrumb-item' ) );
    Vue.component( 'Breadcrumb', () => import( /* webpackChunkName: "iview-ui/breadcrumb" */ 'iview/src/components/breadcrumb' ) );
    Vue.component( 'Icon', () => import( /* webpackChunkName: "iview-ui/icon" */ 'iview/src/components/icon' ) );
}