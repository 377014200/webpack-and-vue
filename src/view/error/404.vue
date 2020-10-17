<template>
  <div class="container container-table">
    <div class="row vertical-10p">
      <div class="container-center">
        <img
          src="~IMG/logo.png"
          height="227"
          width="226"
        />
        <div class="text-center col-sm-6 col-sm-offset-3">
          <p>
          </p>
          <h1>You are lost.</h1>
          <h4>This page doesn't exist.</h4>
          <router-link to="/">
            Take me home.
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NotFound'
};
</script>

<style scoped>
   .container{
      margin-top: 20px;
      text-align: center;
      background-color: #44e5ff;
      padding: 30px 0;
   }

</style>
