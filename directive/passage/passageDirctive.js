const eventMap = {
  PASSAGE_GET: 'PASSAGE_GET',
  PASSAGE_SET: 'PASSAGE_SET',
  PASSAGE_PUSH: 'PASSAGE_PUSH'
};

module.exports = function ( node ) {
  const events = node.events || ( node.events = {} ),
    attrs = Object.keys( node.rawAttrsMap ).reduce( function ( init, attr ) {
      if ( /^:|^v-bind/.test( attr ) ) {
        init += attr.split( /[:|\.]/ )[1] + ':' + node.rawAttrsMap[attr].value + ';';
        return init;
      }
      return init;
    }, '' );

  console.log( attrs );
  for ( const name in eventMap ) {
    events[ name ] = {
      value: `function ${ name }() {
               var a = '${attrs}'.split(';').reduce(function(a,b){
                    var k = b.split(':')
                    return b?(a[k[0]]=k[1],a) :a
                }, {})
                if($${ name }){
                    $${ name }(arguments,a);
                }
            }`
    };
  }
  return true;
};