import ElementUI from 'element-ui';
console.log( ElementUI );

function compose( ...funcs ) {
  if ( funcs.length === 0 ) {
    return arg => arg;
  }
  if ( funcs.length === 1 ) {
    return funcs[0];
  }
  return funcs.reduce( ( a, b ) => ( ...args ) => a( b( ...args ) ) );
}
const elInput = function() {
    ElementUI.Input.props.read = {
      type: Boolean
    };
    const inputRender = ElementUI.Input.render,
      inputCreated = ElementUI.Input.created,
      inputMounted = ElementUI.Input.mounted;

    ElementUI.Input.created = function( ...arg ) {
      if ( !this.read ) {
        return inputCreated.call( this, ...arg );
      }
    };
    ElementUI.Input.mounted = function( ...arg ) {
      if ( !this.read ) {
        return inputMounted.call( this, ...arg );
      }
    };
    ElementUI.Input.render = function( h, ...arg ) {
      if ( this.read ) {
        return h( 'span', this.value );
      }
      return inputRender.call( this, h, ...arg );
    };
  },
  elSelect = function() {
    const selectRender = ElementUI.Select.render,
      selectCreated = ElementUI.Select.created,
      selectMounted = ElementUI.Select.beforeMount;

    ElementUI.Select.props.list = {
      type: Array,
      default: ()=> []
    };
    ElementUI.Select.render = function( h, ...arg ) {
      const vm = this;

      if ( !vm.$scopedSlots.default ) {
        vm.$scopedSlots.default = function ( ) {
          return vm.list.map( function ( item, i ) {
            return vm.$createElement( 'el-option', { props: { ...item, key: i } } );
          } );
        };
      }

      return selectRender.call( this, h, ...arg );
    };
  };

elInput();
elSelect();
export default ElementUI;