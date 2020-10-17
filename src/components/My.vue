<template>
  <Input
    v-model="inputValue"
    v-bind="_props"
    v-on="$listeners"
  ></Input>
</template>

<script>
import { Input } from 'element-ui';
export default {
  name: 'My',
  components: { Input },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    ...Input.props,
  },
  data () {
    return {};
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set( v ) {
        this.$emit( 'input', v );
      }
    }
  },
  watch: {},
  created () {

  },
  activated () {
  },
  mounted () {
    console.log( this );
  },
  methods: {

  },
};
</script>

<style scoped>

</style>