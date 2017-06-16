<template>
  <div class="panic-cell">
    <router-link class="panic-cell-link" v-bind:to="{path:this.panicTarget,query:{id:this.panicId}}"></router-link>
    <img class="panic-cell-img" v-bind:src="this['itemInfo']['src']"/><br>
    <span class="panic-cell-title">{{this.panicTitle}}</span><br>
      <span class="panic-cell-price" v-html="$options.filters.priceFormat(this.panicPrice)"></span>
      <del class="panic-cell-old-price" v-html="$options.filters.priceFormat(this.panicOldPrice)"></del>
  </div>
</template>
<script>
  export default{
    name: 'panic-cell',
    props: ['itemInfo'],
    data(){
      return {
        panicId: this['itemInfo']['id'],
        panicTarget: this['itemInfo']['target'] || '',
        panicTitle: this['itemInfo']['title'] || '',
        panicPrice: this['itemInfo']['price'] || '',
        panicOldPrice: this['itemInfo']['oldPrice'] || ''
      }

    }
  }
</script>
<style lang="scss">
.panic-cell{
  text-align: left;
  position: relative;
  overflow: hidden;
  .panic-cell-link{
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }
  .panic-cell-img{
    width: 100%;
  }
  .panic-cell-title{
    display: inline-block;
    width: 98%;
    font-size: 0.8rem;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .panic-cell-price{
    color: #f53869;
    font-size: 0.6rem;
    font-weight: bold;
    em{
      font-weight: normal;
      padding-right: 0.1rem;
      font-size: 0.4rem;
    }
  }
  .panic-cell-old-price{
    color: #666;
    font-size: 0.4rem;
    em{
      padding-right: 0.1rem;
    }
  }
}
</style>
