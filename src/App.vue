<template>
   <div class="root">
      <h1>在学习 webpack 的日子里</h1>
      <header>
         <nav>
            <Button @click="$router.push('/')">
               home
            </Button>
            <Button @click="$router.push('/sidebar')">
               sidebar
            </Button>
            <Button @click="$router.push('/radius')">
               radius
            </Button>
            <Button @click="$router.push('/black')">
               black
            </Button>
            <Button @click="$router.push('404')">
               404
            </Button>
         </nav>
      </header>
      <router-view />
   </div>
</template>

<script>
import 'CSS/extract/globalStyle.css';

export default {
   name: 'AppVue',
   created: function () {

      console.log( '[ 寻找失去的未来 ] : 在学习 webpack 的日子里' );

   },
};
</script>

<style  scoped>
   .root{
      margin: 0 50px;
   }
   h1 {
      color: #65f5ef;
      text-align: center;
      font-size: 24px;
   }
   header nav {
      text-align: center;

   }
   >>> button {
      margin: 0 10px;
   }

</style>