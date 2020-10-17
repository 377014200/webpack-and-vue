<template>
  <div class="css">
    <Compass ref="compass" @onClick="onCompassClick"></Compass>
    <Container
      @onClick="onContainerClick"
      :data="containerData"
      :type="type"
    ></Container>
  </div>
</template>

<script>
import Compass from 'components/compass/Compass';
import Container from 'components/container/Container';
import data from 'view/css/data';
export default {
  name: 'Css',
  components: { Compass, Container },
  data () {
    return {
      cssMap: {
        name: 'css',
        type: 'tree',
        content: data
      },
      type: 'tree',
      containerData: data,
    };
  },
  computed: {},
  watch: {},
  created () {
  },
  activated () {
  },
  mounted () {
    this.$refs.compass.add( this.cssMap );
  },
  methods: {
    onContainerClick( catalogue ) {
      this.type = catalogue.type;
      this.containerData = catalogue.content;
      this.$refs.compass.add( catalogue );
    },
    onCompassClick( catalogue ) {
      this.type = catalogue.type;
      this.containerData = catalogue.content;
    },

  },
};
</script>

<style scoped>

</style>