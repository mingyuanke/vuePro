<template>
  <div class="list-panel">
    <div class="list-panel-title">
      <span v-if="this.title" class="list-panel-title-text">{{title}}</span>
    </div>
    <div class="list-panel-content">
      <component v-bind:is="itemComp" class="list-panel-item" v-for="item of listData" v-bind:key="item.id"
                 v-bind:item-info="item"></component>
    </div>
  </div>
</template>
<script>
  import {Types} from '../../store'
  export default{
    name: 'list-panel',
    props: ['comInfo'],
    data(){
      return {
        title: this['comInfo']['title'] || false,
        dataSourceKey: this['comInfo']['dataSourceKey'],
        itemComp: this['comInfo']['comp'],
        listData: []
      }
    },
    mounted(){
      this.listData = this.$store.getters[Types.GET_LIST_DATA_BY_KEY](this.dataSourceKey);
    }
  }
</script>
<style scoped lang="scss">
  .list-panel-title {
    padding: 0.3rem 0.8rem 0.2rem;
    border-bottom: 1px solid rgba(50,50,50,0.1);
    text-align: left;
    font-size: 0.8rem;
    color: #777;

  }
  .list-panel-content{
    text-align: left;
  }
</style>
