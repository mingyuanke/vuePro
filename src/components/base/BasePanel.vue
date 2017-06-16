<template>
  <div class="base-panel">
    <div v-if="this.title" class="base-panel-title">
      <h4 v-text="this.title"></h4>
      <router-link class="base-panel-link" v-if="this.external.type === 'url'" v-bind:to="this.external.target">{{this.external.text}}<i class="icon-next"></i></router-link>
    </div>
    <div class="base-panel-content">
      <component :is="this.itemComp" :itemInfo="this.itemInfo" ></component>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'base-panel',
    props:['comInfo'],
    data(){
      return{
        title:this['comInfo']['title']||false,
        external:{
          text:this['comInfo']['external']['text']||false,
          type:this['comInfo']['external']['type']||'url',//url 或者dropdown
          target:this['comInfo']['external']['url'],
        },
        itemInfo:this['comInfo']['item']||'',
        itemComp:this['comInfo']['contentComp']||''
      }
    }
  }
</script>
<style scoped lang="scss">
  .base-panel{
    .base-panel-title{
      position: relative;
      .base-panel-link{
        position: absolute;
        right:0;
        top:0;
        font-size: .6rem;
        color: #888;
        margin: .2rem;
      }
    }
  }
</style>
