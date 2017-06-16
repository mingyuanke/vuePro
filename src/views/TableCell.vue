<template>
  <div class="cell-item">
    <span class="describe">
      <span class="describe-title">{{cellInfo.title}}</span><br>
      <span class="describe-caption">{{cellInfo.caption}}</span>
    </span>
    <img  class="cell-img" :src="cellInfo.icon">
    <router-link class="cell-link" v-if="cellInfo.target"  v-bind:to="cellInfo.target"></router-link>
  </div>
</template>
<script>
  export default{
    name: 'table-cell',
    props: ['cellInfo']
  }
</script>
<style scoped lang="scss">
  .cell-item{
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 0.2rem;
    position: relative;
    border-bottom: 1px solid rgba(135,135,135,0.2);
    .cell-link{
      display: inline-block;
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .cell-item:nth-of-type(odd){
    border-right: 1px solid rgba(135,135,135,0.2);
  }
  .cell-item:nth-last-of-type(1),.cell-item:nth-last-of-type(2){
    border-bottom-width: 0;
  }
  .describe {
    display: inline-block;
    text-align: center;
    flex: 1;
    .describe-title{
      font-size: 0.8rem;
      font-weight:bold;
    }
    .describe-caption{
      font-size: 0.6rem;
      color: rgba(0,0,0,0.5);
    }
  }
  .cell-img{
    float: right;
    height: 3rem;
    min-width: 3rem;
    margin-right: 1rem;
  }
</style>
