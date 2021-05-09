module.exports = function ( name = 'on-passage:event', handle = '$passageLocal' ) {
  return function ( el ) {
    const events = el.events || ( el.events = {} ),
      attrs = Object.keys( el.rawAttrsMap ).reduce( function ( init, attr ) {
        if ( /^:|^v-bind/.test( attr ) ) {
          init[attr.split( /[:|\.]/ )[1]] = el.rawAttrsMap[attr].value;
        }
        return init;
      }, {} );

    events[ name ] = {
      value: `function passage(handle, props,$$v,$$k,$$c) {
                var a = ${JSON.stringify( attrs )},prelude = props.split( '.' )[0];
                if(a[prelude] && _self.hasOwnProperty(a[prelude].split( '.' )[0])){
                    ${handle}(props.replace(prelude,a[prelude]))[handle]($$v,$$k,$$c)
                    return
                }
                $options._base.util.warn("The attribute  " + (prelude || a[prelude] || props) + " is not propagated through the attribute, or is a constant")
            }`
    };
    return true;
  };
};