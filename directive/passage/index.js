import { get, set } from 'shvl';
const getPath = function getPath( prop, key ) {
  key = key === undefined || key === null ? '' : key.toString();
  return prop.toString().trim() + ( key ? '.' + key.trim() : '' );
};

function passageLocal ( prop ) {
  const vm = this, warn = this.$options._base.util.warn;

  if ( !prop ) {
    throw new Error( 'prop cannot be empty in $passageLocal' );
  }
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
    },
    push( value, key, def ) {
      const path = getPath( prop, key ),
        source = get( vm, path );

      if ( def instanceof Array && !source ) {
        def.push( value );
        set( parent, path, def );
        return;
      }
      if ( source instanceof Array ) {
        source.push( value );
      } else {
        warn( `property ${path} It's not an array ` );
      }
    }
  };
}
function passage ( prop ) {
  const vm = this;

  if ( !prop ) {
    throw new Error( 'prop cannot be empty in $passage' );
  }
  return {
    get ( key, def, cd = ()=>{} ) {
      vm.$emit( 'on-passage:event', 'get', prop, key, def, cd );
      return this;
    },
    set ( value, key ) {
      vm.$emit( 'on-passage:event', 'set', prop, value, key );
      return this;
    },
    push ( value, key, def ) {
      vm.$emit( 'on-passage:event', 'push', prop, value, key, def );
      return this;
    }
  };
}
export default {
  install ( Vue ) {
    Vue.directive( 'passage', {} );
    Vue.prototype.$passageLocal = passageLocal;
    Vue.prototype.$passage = passage;
  }
};