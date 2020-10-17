<template>
  <div class="test">
    <h1>test</h1>
    <span v-pre>this will not be compiled</span>
    <Button @click="[onClick]">
      sssssssssss
    </Button>
  </div>
</template>

<script>

export default Object.assign( {
  name: 'Test',
  components: {},
  data () {
    return {
      sss: 1111
    };
  },
  computed: {},
  watch: {},
  created () {
    setTimeout( ()=>{
      this.sss = 33333;
      console.log( this );
      console.log( this.$options.data() );
    }, 7000 );
  },
  activated () {
  },
  mounted () {
    console.log( this.$api( 'test', 1 ) );
  },
  methods: {
    onClick() {
      console.log( this.$options.data() );
    }
  },
}, {
}
);
</script>

<style scoped>

</style>