import { getPropByPath } from '@/utils';
// eslint-disable-next-line no-useless-escape
const files = require.context( './modules', false, /\.js/ ),
  modules = files.keys().reduce( function ( target, fileName ) {
    console.log( fileName );
    const key = fileName.replace( /\.\/(\w+)\.js/, '$1' );

    target[key] = files( fileName ).default;
    return target;
  }, {} );

export default {
  install: function ( Vue, o, b ) {
    Vue.mixin( {
      methods: {
        $api( path, param, all ) {
          const findValue = getPropByPath( modules, path );

          return typeof findValue.v === 'function' ? findValue.v( param ) : findValue.v;
        }
      }
    } );
  }
};