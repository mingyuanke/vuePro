<template>
  <div class="store">
    <span>{{this.doneCount}}</span><br>
    <button v-on:click="add">add</button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {mapActions} from 'vuex'
  export default {
    name: 'store',
    data () {
      return {
        msg: "vuex"
      }
    },
    computed:{
      ...mapGetters({
        doneCount:"vue-default"
      })
    },
    methods:{
      ...mapActions({
        add:"vue-default"
      })
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
