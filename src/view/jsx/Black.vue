<script>
    import { tick, stash } from './styleSheet.css?module';
    import Single from 'components/single/Single'
    console.log( tick, stash)
    export default {
        name: 'Bloak',
        data: function () {
            return {
                tick, stash
            };
        },
        render: function () {
            return (
                <div>
                    <h1 >jsx 好像很很不错的样子</h1>
                    <h2 class='stash stash' >它看起来很不错不是吗?</h2>
                    <h2 class='stash stash' >也许吧！</h2>
                    <Single />
                </div>
            );
        }
    };
</script>

<style scoped>
h1{
   color: #c7254e;
}
</style>