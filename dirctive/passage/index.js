import T from './eventTable';
import event from './event';

export default {
  install ( Vue ) {
    Vue.prototype.$passageLocal = function passageLocal ( prop ) {
      const vm = this;

      return {
        get ( key, cd, def ) {
          if ( typeof key === 'function' ) {
            cd = key;
            key = '';
          }
          event[ T.PASSAGE_GET ].call( vm, { prop, key, def }, cd );
          return this;
        },
        set ( value, key ) {
          event[ T.PASSAGE_SET ].call( vm, { prop, value, key } );
          return this;
        },
        push ( value, key ) {
          event[ T.PASSAGE_SET ].call( vm, { prop, value, key } );
          return this;
        }
      };
    };
    Vue.prototype.$passage = function passage ( prop ) {
      const vm = this;

      return {
        get ( key, cd, def ) {
          if ( typeof key === 'function' ) {
            cd = key;
            key = '';
          }
          vm.$emit( T.PASSAGE_GET, { prop, key, def }, cd );
          return this;
        },
        set ( value, key ) {
          vm.$emit( T.PASSAGE_SET, { prop, key, value } );
          return this;
        },
        push ( value, key ) {
          vm.$emit( T.PASSAGE_PUSH, { prop, key, value } );
          return this;
        }
      };
    };
    const transformAttr = function validateAttr( res, attrsMap, succeed, fail ) {
      if ( !attrsMap ) {
        fail( 'This doesn\'t look very normal, attribute attrsMap is ' + attrsMap );
        return;
      }
      const prelude = res.prop.split( '.' )[0];

      console.log( res, attrsMap );
      if ( attrsMap[prelude] ) {
        const obj = { prop: res.prop.replace( prelude, attrsMap[prelude] ) };

        for ( const k in res ) {
          if ( k !== 'prop' ) {
            obj[k] = res[k];
          }
        }
        succeed( obj );
        return;
      }
      fail( 'The attribute  "' + prelude + '"  was not transmitted through the prop' );
    };

    for ( const name in T ) {
      Vue.prototype[ '$' + name ] = function ( arg, attrsMap ) {
        const vm = this;

        if ( !attrsMap ) {
          event[ name ].call( vm, arg );
          return;
        }
        transformAttr(
          arg[0],
          attrsMap,
          function ( obj ) {
            event[ name ].call( vm, ...[obj].concat( Array.apply( null, arg ).slice( 1 ) ) );
          },
          function ( errorMessage ) {
            vm.$options._base.util.warn( errorMessage );
          }
        );
      };
    }
  }
};