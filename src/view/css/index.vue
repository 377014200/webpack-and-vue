<template>
    <div class="css">
        <Compass ref="compass"></Compass>
        <Contaier></Contaier>
    </div>
</template>

<script>
import Compass from 'components/compass/Compass';
import data from 'view/css/data';
export default {
    name: 'Css',
    components: { Compass },
    data () {
        return {};
    },
    computed: {},
    watch: {},
    created () {

    },
    activated () {
    },
    mounted () {
        this.$refs.compass.add( { name: 'css' } );
    },
    methods: {},
};
</script>

<style scoped>

</style>