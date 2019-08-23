<template>
   <div class="home">
      <h2 class="aaa">
         尋找失去的未來
      </h2>
      <!--<img src="~IMG/img3.jpg" alt="" style="width:100%">-->
      <div class="public">
         <div class="assets">
            {{ msg }}
         </div>
      </div>
   </div>
</template>

<script>

export default {
   'name': 'home',
   data: function () {

      return {
         msg: 'test'
      };

   },
};
</script>

<style scoped>
   .aaa{
      color: #44e5ff;
   }
   h2 {
      color: #3a2f7a;
      font-size: 20px;
      transform: translate(50px, 0);
   }

   .public {
      border: 1px solid;
      width: 25%;
      height: 800px;
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