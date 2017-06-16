<template>
  <div  class="table-panel">
    <component v-for="item in this['cellsInfo'].cells"  class="table-panel-item" v-bind:style="{width:cellWidth}" v-bind:cell-info="item" :is="cellsInfo.temp"></component>
  </div>
</template>
<script>
  export default{
    name:'table-panel',
    props:['cellsInfo'],
    data(){
        return {
            cellWidth:(100/this.cellsInfo.cols)+'%'
        }
    }
  }
</script>
<style scoped lang="scss">
  .table-panel{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 0.1rem;
  }
  .table-panel-item{

  }
</style>
