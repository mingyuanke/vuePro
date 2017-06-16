<template>
  <div class="list-panel">
    <div class="list-panel-title">
      <span v-if="this.title" class="list-panel-title-text">{{title}}</span>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'list-panel',
    props:['comInfo'],
    data(){
      return {
        title:this['comInfo']['title']||false,
        dataSourceKey:''
      }
    },

  }
</script>
<style scoped lang="scss">

</style>
