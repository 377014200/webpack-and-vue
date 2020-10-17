<script>
import { toRawType } from '@/utils';

export default {
  name: 'Container',
  components: {},
  props: {
    type: {
      type: String,
      validator: s => ['blob', 'tree'].indexOf( s ) !== -1,
      default: 'blob'
    },
    data: {
      type: [Object, Array],
      default: ()=>{
        return {};
      }
    }
  },
  data () {
    return {};
  },
  computed: {},
  watch: {},
  created () {

  },
  activated () {
  },
  mounted () {
  },
  methods: {},
  render ( createElement, context ) {
    // eslint-disable-next-line no-underscore-dangle
    if ( this.type === 'blob' && toRawType( this.data ) === 'Object' && this.data._compiled ) {
      console.log();
      return <div class='container'><this.data/></div>;
    }

    if ( this.type === 'tree' && toRawType( this.data ) === 'Array' ) {
      return (
        <div class='container'>
          {
            this.data.map( ( item, i )=> {
              return (
                <div class='catalogue' onClick={ () => this.$emit( 'onClick', item ) }>
                  <Icon
                    type={ item.type === 'tree' ? 'ios-folder-outline' : 'ios-copy-outline' }
                    style={ { 'marginRight': '20px' }}
                  />
                  { item.name }
                </div>
              );
            } )
          }
        </div>
      );
    }
    return null;
  }
};
</script>

<style scoped lang="less">
.container{
    margin: 50px 100px;
    .catalogue:hover{
        color: #ff0099;
        cursor: pointer;
    }
}
</style>