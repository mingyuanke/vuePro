<template>
  <div class="list-cell">
    <span>{{item.name}}</span>
  </div>
</template>
<script>
  export default{
    name: 'list-cell',
    props: ['itemInfo'],
    data(){
      return{
          item:this['itemInfo']
      }
    }
  }
</script>
<style scoped lang="scss"></style>
