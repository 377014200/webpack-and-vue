<template>
    <div class="compass">
        <Breadcrumb>
            <BreadcrumbItem v-for=" {} in catalogues">
                {{ }}
            </BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'Compass',
    components: {},
    props: {

    },
    data () {
        return {
            catalogues: []
        };
    },
    computed: {},
    watch: {},
    created () {

    },
    activated () {
    },
    mounted () {

    },
    methods: {
        add( catalogue ) {
            this.catalogues.push( catalogue );
        },
        pop() {
            this.catalogues.pop();
        }
    },
};
</script>

<style scoped>

</style>