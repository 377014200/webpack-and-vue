module.exports = function ( name = 'on-passage:event' ) {
  return function ( node, directive ) {
    const events = node.events || ( node.events = {} ),
      attrs = Object.keys( node.rawAttrsMap ).reduce( function ( init, attr ) {
        if ( /^:|^v-bind/.test( attr ) ) {
          init += attr.split( /[:|\.]/ )[1] + ':' + node.rawAttrsMap[attr].value + ';';
          return init;
        }
        return init;
      }, '' );

    console.log( attrs, directive );
    events[ name ] = {
      value: `function passage(cd) {
                var a = '${attrs}'.split(';').reduce(function(a,b){
                    var k = b.split(':')
                    return b?(a[k[0]]=k[1],a) :a
                }, {})
                cd(_self,a,${node.attrsMap['v-passage']})
            }`
    };
    return true;
  };
};