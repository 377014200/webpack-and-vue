<template>
   <div class="home">
      <h2 class="aaa">
         尋找失去的未來
      </h2>
      <!--<img src="~IMG/img3.jpg" alt="" style="width:100%">-->
      <div class="public">
         <div class="assets">
            无敌真寂寞<br />
            问问他们我是谁<br />
            大力出奇迹<br />
            小生我怕怕<br />
            充气女友最开放<br />
            传奇害了我<br />
            一大米呦抗几楼<br />
         </div>
         <p>{{ num }}</p>
         <Button @click="$store.commit('home/increment', 'test vuex plugin option')"> 点鸡 </Button>
      </div>
   </div>
</template>

<script>

export default {
   'name': 'home',
   data: function () {

      return {
         msg: ''
      };

   },
   mounted(){

      console.log( this )

   },
   computed:{
      num: function () {

         return this.$store.state.home.count;

      }
   }
};
</script>

<style scoped>
   .aaa{
      color: #2b8bff;
   }
   h2 {
      color: #3a2f7a;
      font-size: 20px;
      transform: translate(50px, 0);
   }

   .public {
      border: 1px solid;
      width: 25%;
      height: 400px;
      padding: 20px
      /*overflow: hidden;*/
      /*top: 200px;*/
      /*bottom: 0;*/
      /*min-height: 400px;*/
   }

   .assets {
      /*position: absolute;*/
      /*width: 100%;*/
      /*height: 100%;*/
      /*bottom: 0;*/
      border: 1px solid red;
      /*overflow-x: auto;*/
      padding: 15px;
   }

</style>