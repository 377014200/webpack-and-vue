'use strict';
const path = require( 'path' );

module.exports = {
   resolve: function ( dir ) {

      const arg = arguments;
      return arg.length >= 2 ? path.resolve( __dirname, '..', ...arg ) : path.resolve( __dirname, '..', dir );

   },
   join: path.join,

   catalog: path.resolve
};