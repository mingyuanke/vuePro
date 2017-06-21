<template>
  <div class="list-panel">
    <div class="list-panel-title">
      <span v-if="this.title" class="list-panel-title-text">{{title}}</span>
    </div>
  </div>
</template>
<script>
  import {Types} from '../../store'
  export default{
    name: 'list-panel',
    props:['comInfo'],
    data(){
      return {
        title:this['comInfo']['title']||false,
        dataSourceKey:'',
        itemComp:this['comInfo']['comp'],
        listData:[]
      }
    },
    created(){
      this.listData=this.$store.getters[Types.GET_LIST_DATA_BY_KEY](this.dataSourceKey)
    }

  }
</script>
<style scoped lang="scss">
.list-panel-title{
  padding-left: 0.8rem;
  text-align: left;
  font-size: 0.8rem;
  color: #555;
}
</style>
