<template>
  <div>
    <div class="icon-panel">
      <div class="icon-panel-item" v-for="item in items">
        <router-link :to="item.target">
          <i v-if="iconType==='iconFont'" v-bind:class="['icon-panel-icon',item.iconSrc]"></i>
          <img v-if="iconType==='img'" class="icon-panel-img" v-bind:src="baseUrl+item.iconSrc"/><br>
          <span class="icon-panel-text">{{item.text}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'icon-panel',
    props: ['baseUrl', 'iconType', 'items']
  }
</script>
<style scoped lang="scss">
  .icon-panel {
    padding: 0.2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .icon-panel-item {
    width: 25%;
    text-align: center;
    .icon-panel-icon {
      font-size: 2rem;
      color: rgba(135, 135, 135, 0.8);
      display: inline-block;
      height: 2rem;
    }
    .icon-panel-img {
      width: 90%;
    }
    .icon-panel-text {
      font-size: 0.8rem;
      color: rgba(135, 135, 135, 0.7);
    }
  }
</style>
