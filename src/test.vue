<template>
  <div class="aaaa">
    <el-input
      v-model="value"
      type="text"
    ></el-input>
    <template v-for="(item,i) in arr">
      <h1>{{ item.b }}</h1>
      <el-input
        :value="item.a"
        @input="value=> $passage( 'arr.'+i ).set(value,'a').set('ddd'+value,'b')"
        type="text"
      ></el-input>
    </template>
    <h1>{{ bbb.ccc }}</h1>
    <el-button @click="change">
      添加
    </el-button>
    <!--        <div v-passage></div>-->
    <!--        <div v-passage="[]"></div>-->
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['arr', 'aaa', 'bbb'],
  data() {
    return {
      inputValue: '22222222',
      options: [{
        value: '选项10',
        label: '黄金糕1'
      }, {
        value: '选项20',
        label: '双皮奶1',
        disabled: true
      }, {
        value: '选项30',
        label: '蚵仔煎1'
      }, {
        value: '选项40',
        label: '龙须面1'
      }, {
        value: '选项50',
        label: '北京烤鸭1'
      }],
      value: ''
    };
  },
  mounted () {
    // debugger
    console.log( this === this._self );
  },
  created () {
    this.$passage( '' ).set( 1111 );
  },
  methods: {
    change( e ) {
      const aaa = this.$passage( 'bbb.ccc' );

      this.$passageLocal( 'value' ).set( 33333333 );
      aaa.get( v=> {
        console.log( v );

        aaa.set( v + 1111 );
      } );
      console.log( this );
      const arra = this.$passage( 'arr' ).push( { a: 234, b: '' } );
    }
  }
};
</script>