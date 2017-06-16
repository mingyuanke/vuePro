<template>
  <conveyer-belt v-bind:item-info="itemInfo"></conveyer-belt>
</template>
<script>
  import ConveyerBelt from './base/ConveyerBelt.vue'
  import IconPanel from './base/IconPanel.vue'
  import Vue from 'vue'
  export default{
    props: ['navInfo'],
    name: 'nav-icons',
    created(){
      if (!this.navInfo) {
        window.console.error('navInfo is required.');
        return false
      }
      let pageNum = parseInt(this.navInfo.items.length / 8)+1;
      this.itemInfo.iconType = this.navInfo.iconType;
      this.itemInfo.baseUrl = this.navInfo.baseUrl;
      this.itemInfo.items = [];
      for (let index = 0; index < pageNum; index++) {
        this.itemInfo.items[index] = [];
        for (let sIndex = 0; sIndex < 8; sIndex++) {
          if (this.navInfo.items[8 * index + sIndex]) {
            this.itemInfo.items[index][sIndex] = this.navInfo.items[8 * index + sIndex];
          } else {
            break;
          }
        }
      }
      this.itemInfo.comName = 'navIcon' + new Date().getTime();
      Vue.component(this.itemInfo.comName,IconPanel)
    },
    data(){
      return {
        itemInfo: {},
      }
    },
    components: {
      ConveyerBelt
    }
  }
</script>
<style scoped>

</style>
