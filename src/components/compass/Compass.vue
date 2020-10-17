<template>
  <div class="compass">
    <Breadcrumb>
      <BreadcrumbItem
        @click.native="onBreadcrumbClick(o,i)"
        v-for="(o, i ) in catalogues"
        class="compass-breadcrumb-item"
      >
        <Icon v-if="i===0" type="ios-home-outline"></Icon>
        {{ o.name }}
      </BreadcrumbItem>
    </Breadcrumb>
    <div class="house">
      <Icon @click.native="onHouseClick" type="ios-home-outline"></Icon>
    </div>
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
    },
    onHouseClick() {
      this.$router.push( '/' );
    },
    onBreadcrumbClick( o, i ) {
      console.log( i );
      this.catalogues.splice( i + 1 );
      this.$emit( 'onClick', o );
    },

  },
};
</script>

<style scoped lang="less">
.compass{
    font-size: 20px;
    padding: 20px;
    position: relative;
    border-bottom: 1px black solid;
    .compass-breadcrumb-item{
        font-size: 20px;
    }
    .compass-breadcrumb-item:hover{
        cursor: pointer;

    }
    .house{
        position: absolute;
        top: 0;
        right: 10px;
        padding: 20px;
        cursor: pointer
    }
}
</style>