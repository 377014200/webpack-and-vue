import { get, set } from 'shvl';
import T from './eventTable';
const getPath = function getPath( key, prop ) {
  key = key === undefined || key === null ? '' : key.toString();
  return prop.toString().trim() + ( key ? '.' + key.trim() : '' );
};

export default {
  [T.PASSAGE_GET]: function( { key, def, prop }, cd = v => {} ) {
    if ( prop ) {
      cd( get( this, getPath( key, prop ), def ) );
    }
  },
  [T.PASSAGE_SET]: function( { key, value, prop } = {} ) {
    if ( prop ) {
      set( this, getPath( key, prop ), value );
    }
  },
  [T.PASSAGE_PUSH]: function( { key, value, prop, def } = {} ) {
    if ( prop ) {
      const path = getPath( key, prop ),
        source = get( this, path );

      if ( def instanceof Array && !source ) {
        def.push( value );
        set( this, path, def );
        return;
      }
      if ( source instanceof Array ) {
        source.push( value );
      } else {
        console.error( `property ${path} It's not an array ` );
      }
    }
  }
};
