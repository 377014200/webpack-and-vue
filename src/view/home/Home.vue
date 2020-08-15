<template>
    <div class="home">
        <h1>WEB NOTE</h1>
        <div class="language">
            <div class="language-list">
                <div
                    v-for="{ language, path } in state"
                    @click="onClick( path )"
                    class="language-list-item"
                >
                    {{ language }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    'name': 'home',
    data: function () {
        return {
            state: [
                {
                    language: 'Html',
                    path: '/html'
                },
                {
                    language: 'Css',
                    path: '/css'
                },
                {
                    language: 'Javascript',
                    path: '/js'
                },
                {
                    language: 'Vue',
                    path: '/vue'
                },
                {
                    language: 'Webpack',
                    path: 'webpack'
                },

            ]
        };
    },
    computed: {
    },
    methods: {

        onClick( path ) {
            this.$router.push( path );
        }

    }
};
</script>

<style lang="less">
    .home{
        margin: 0 50px;
        h1 {
            padding: 20px;
            text-align: center;
            font-size: 28px;
        }
        .language{
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            text-align: center;
            .language-list{
                margin-top: 150px;
                width: 20%;
                min-width: 100px;
                display: inline-block;
                vertical-align: middle;
                .language-list-item{
                    /*padding: 10px;*/
                    margin: 10px;
                    font-size: 26px;
                    border-radius: 10px;
                    border-bottom: 1px black solid;
                    &:hover{
                        background-color: #fff;
                        cursor: pointer;
                        border-color: transparent;
                    }
                }
            }
            /*&:before{*/
            /*    content: '';*/
            /*    display: inline-block;*/
            /*    vertical-align: middle;*/
            /*    width: 0;*/
            /*    height: 100%;*/
            /*}*/
        }
    }


</style>