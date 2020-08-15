<template>
    <router-view />
</template>

<script>
import 'CSS/extract/globalStyle.css';

export default {
    name: 'AppVue',
    data() {
        return {};
    },
    created: function () {
        console.log( '[ 醉卧沙场君莫笑 ] : 在学习 webpack 的日子里' );
    },
    methods: {
    }
};
</script>

<style lang="less">

</style>