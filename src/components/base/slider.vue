<template>
  <div cla="vue-slider">
    <slot></slot>
  </div>
</template>
<script>
  export default{
    name: 'vue-slider'
  }
</script>
<style scoped lang="scss">
  .vue-slider{
    display: inline-block;
  }
</style>
