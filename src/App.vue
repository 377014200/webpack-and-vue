<template>
   <div class="root">
      <h1>在学习 webpack 的日子里</h1>
      <header>
         <nav>
            <Button @click="onClick('/')">
               home
            </Button>
            <Button @click="onClick('/sidebar')">
               sidebar
            </Button>
            <Button @click="onClick('/radius')">
               radius
            </Button>
            <Button @click="onClick('/black')">
               black
            </Button>
            <Button @click="onClick('404')">
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
      console.log( '[ 欲上青天揽明月 ] : 在学习 webpack 的日子里' );
   },
   methods: {
      onClick( path ) {
         const completePromise = this.$router.push( path, function ( resp, a ) {
            console.log( resp, a );
         }, function ( error ) {
            console.log( error );
         } );
         console.log( completePromise );
      }
   }
};
</script>

<style  >
   .root{
      margin: 0 50px;
       background: url("~IMG/img3.jpg") no-repeat center;
   }
   h1 {
      color: #65f5ef;
      text-align: center;
      font-size: 24px;
   }
   header{
       margin-top: 30px;
   }
   header nav {
      text-align: center;
   }
   >>> button {
      margin: 0 10px;
   }
</style>