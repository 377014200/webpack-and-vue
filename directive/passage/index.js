import { get, set } from 'shvl';
const getPath = function getPath( prop, key ) {
    key = key === undefined || key === null ? '' : key.toString();
    return prop.toString().trim() + ( key ? '.' + key.trim() : '' );
  },
  transformAttr = function validateAttr( prop, attrsMap, parent, warn ) {
    if ( !attrsMap ) {
      warn( 'This doesn\'t look very normal, attribute attrsMap is ' + attrsMap );
      return '';
    }
    const prelude = prop.split( '.' )[0];

    if ( attrsMap[prelude] ) {
      const bindProp = prop.replace( prelude, attrsMap[prelude] ), bindPrelude = bindProp.split( '.' )[0];

      if ( Object.hasOwnProperty.call( parent, bindPrelude ) ) {
        return bindProp;
      }
      warn( 'The attribute ' + bindPrelude + ' is not defined on the instance , or is a constant' );
      return '';
    }
    warn( 'The attribute  "' + prelude + '" is not propagated through the attribute, or is a constant' );
    return '';
  };

export default {
  install ( Vue ) {
    Vue.directive( 'passage', {} );
    Vue.prototype.$passageLocal = function passageLocal ( prop ) {
      const vm = this;

      return {
        get ( key, cd, def ) {
          if ( typeof key === 'function' ) {
            cd = key;
            key = '';
          }
          cd( get( vm, getPath( prop, key ), def ) );
          return this;
        },
        set ( value, key ) {
          set( vm, getPath( prop, key ), value );
          return this;
        }
      };
    };

    Vue.prototype.$passage = function passage ( prop ) {
      const vm = this,
        warn = vm.$options._base.util.warn;

      return {
        get ( key, def, cd = ()=>{} ) {
          if ( typeof key === 'function' ) {
            cd = key;
            key = '';
          }
          vm.$emit( 'on-passage:event', function ( parent, bindAttrs, dirCallback ) {
            const bindProp = transformAttr( prop, bindAttrs, parent, warn );

            if ( dirCallback && typeof dirCallback === 'function' ) {
              dirCallback( getPath( prop, key ) );
              return;
            }
            cd( get( parent, getPath( bindProp, key ), def ) );
          } );
          return this;
        },
        set ( value, key ) {
          vm.$emit( 'on-passage:event', function ( parent, bindAttrs, dirCallback ) {
            const bindProp = transformAttr( prop, bindAttrs, parent, warn );

            if ( dirCallback && typeof dirCallback === 'function' ) {
              dirCallback( getPath( bindProp, key ) );
              return;
            }
            set( parent, getPath( bindProp, key ), value );
          } );
          return this;
        },
        push ( value, key, def ) {
          vm.$emit( 'on-passage:event', function ( parent, bindAttrs, dirCallback ) {
            const bindProp = transformAttr( prop, bindAttrs, parent, warn );

            if ( dirCallback && typeof dirCallback === 'function' ) {
              dirCallback( getPath( bindProp, key ) );
              return;
            }
            const path = getPath( bindProp, key ),
              source = get( parent, path );

            if ( def instanceof Array && !source ) {
              def.push( value );
              set( parent, bindProp, def );
              return;
            }
            if ( source instanceof Array ) {
              source.push( value );
            } else {
              warn( `property ${path} It's not an array ` );
            }
          } );
          return this;
        }
      };
    };
  }
};