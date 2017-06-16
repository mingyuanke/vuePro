<template>
  <BasePage :bp-con="bp"/>
</template>
<script>
  import BasePage from '@/components/base/BasePage'
  import Home from './Home.vue'
  import Vue from 'vue'
  Vue.component('home', Home);
  export default{
    name: 'index',
    data(){
      return {
        bp: {
          id: 'bp1',
          navItem: [
            {
              text: '外卖',
              icon: 'icon-alien',
              target: 'home',
              isActive: true
            }, {
              text: '发现',
              icon: 'icon-discover',
              target: 'discover',
              isActive: false
            }, {
              text: '订单',
              icon: 'icon-order',
              target: 'order',
              isActive: false
            },{
              text: '我的',
              icon: 'icon-my',
              target: 'my',
              isActive: false
            }
          ]
        }
      }
    },
    components: {
      BasePage
    }
  }
</script>
<style scoped>

</style>
