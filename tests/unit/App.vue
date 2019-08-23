<template>
   <div id="app">
      <MessageList :messages="messages"/>
   </div>
</template>

<script>
   import MessageList from './MessageList.vue'

   export default {
      name: 'app',
      data: () => ({ messages: ['Hey John', 'Howdy Paco'] }),
      components: {
         MessageList
      }
   }
</script>