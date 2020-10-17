import { get, set } from 'shvl';
const passage = {
  name: 'passage',

  bind( el, binding, VNode, b ) {
    if ( VNode.context ) {
      const getPath = function getPath( key, prop ) {
        return ( prop || binding.arg || '' ) + ( key && key !== 0 ? '.' + key.toString().trim() : '' );
      };

      console.log( VNode );
      VNode.componentInstance.$on( 'passage-change', function ( { key, value, prop } = {} ) {
        const path = getPath( key, prop );

        set( VNode.context, path, value );
      } );
      VNode.componentInstance.$on( 'passage-push', function ( { key = '', value, prop } = {} ) {
        const path = getPath( key, prop ), source = get( VNode.context, path );

        console.log( source );
        if ( source instanceof Array ) {
          source.push( value );
        } else {
          console.error( `property ${path} It's not an array ` );
        }
      } );
    }
  },
};

passage.install = function ( Vue ) {
  Vue.directive( passage.name, passage );
};
export default passage;