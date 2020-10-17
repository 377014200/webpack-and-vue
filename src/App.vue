<template>
  <div class="root">
    <Button @click="onClick">
      test
    </Button>
    <Button @click="$router.push('/black')">
      black
    </Button>
    <h2>{{ aaa }}</h2>
    <vvv>
      <test
        v-passage
        :arr.sync="arr"
        v-bind:bbb="sss"
        @onClick="onClick"
      ></test>
    </vvv>
    <router-view />
  </div>
</template>

<script>
import test from './test';
import vvv from './view/html';
// console.log(require( '../dirctive/passage' ))
export default {
  name: 'AppVue',
  components: { test, vvv },
  data() {
    return {
      arr: [],
      aaa: 11,
      sss: { ccc: 333 },
    };
  },
  created: function () {
        import( 'CSS/extract/globalStyle.css' );
        console.log( this );
        // console.log( this.$api( 'test.aaa' ) );
  },
  methods: {
    onClick: function () {
      console.log( this );
    }
  }
};
</script>

<style lang="less">
.root{
    margin: 0 20px;
}
</style>