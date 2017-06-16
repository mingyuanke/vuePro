<template>
  <img class="figure-panel" v-bind:src="this.imgInfo.src"/>
</template>
<script>
  export default{
    name: 'figure-panel',
    props: ['imgInfo']
  }
</script>
<style scoped lang="scss">
  .figure-panel{
    width: 100%;
  }
</style>
