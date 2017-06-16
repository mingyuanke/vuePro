<template>
  <div class="prefer-panel">
    <div class="prefer-panel-item" v-for="item of items['info']">
      <img class="prefer-panel-img" v-bind:src="item.src">
      <span class="prefer-panel-title">{{item.title}}</span><br>
      <span class="prefer-panel-label"
            v-bind:style="{'color':item.color,'border-color':item.color}">{{item.label}}</span>
      <router-link class="prefer-panel-link"
                   v-bind:to="{path:item.target||items.target,query:{'q':item.query}}"></router-link>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'prefer-cell',
    props: ['itemInfo'],
    data(){
      return {
        items: this['itemInfo']
      }
    }
  }
</script>
<style scoped lang="scss">
  .prefer-panel {
    padding: 0.1rem 0.2rem 0.4rem;
    width: 100%;
    font-size: 0;
    text-align: left;
    .prefer-panel-item {
      position: relative;
      width: 25%;
      padding: 0.1rem 0.2rem;
      display: inline-block;
      font-size: 1rem;
      vertical-align: middle;
      text-align: center;
      box-sizing: border-box;
      .prefer-panel-img {
        width: 100%;
      }
      .prefer-panel-title {
        font-size: 0.8rem;
        font-weight: bold;
      }
      .prefer-panel-label {
        font-size: 0.6rem;
        border: 1px solid;
        border-radius: 1rem;
        padding: 0.1rem 0.4rem;
      }
      .prefer-panel-link {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
