<template>
  <div class="search-bar">
    <label v-bind:class="['search-content',{hasFocus:isFocus}]" v-bind:for="searchId">
      <i class="search-icon icon-search"></i>
      <input class="search-input" v-model="queryValue" v-on:focus="getFocus" v-on:blur="getFocus" v-bind:id="searchId"
             type="text"
             :placeholder="this.holderText"/>
    </label>
  </div>
</template>
<script>
  export default{
    name: 'searchBar',
    props: ['holderText', 'query', 'focused'],
    mounted(){
      this.queryValue = this.query || "";
      if (this.query || this.focused) {
        this.$el.querySelector('.search-input').focus();
      }
    },
    data(){
      return {
        searchId: 'search-' + new Date().getTime(),
        isFocus: document.activeElement.classList.contains('search-input'),
        queryValue: ''
      }
    },
    methods: {
      getFocus(){
        if (this.queryValue) {
          this.isFocus = true;
          return true
        }
        this.isFocus = (document.activeElement === this.$el.querySelector('.search-input'));
      },
      queryChange(){
        this.$emit('queryChange', this.queryValue)
      }
    },
    watch: {
      queryValue: function (val, oldVal) {
        if (val !== oldVal) {
          this.$emit('queryChange', val)
        }
      }
    }

  }
</script>
<style scoped lang="scss">
  .search-bar {
    background: rgba(84, 135, 243, 0.89);
    padding: 0.5rem 1rem;
    .search-content {
      width: 100%;
      border-radius: 1rem;
      text-align: center;
      background: #fff;
      display: inline-block;
      line-height: 1.2rem;
      .search-input {
        outline: none;
        height: 1.1rem;
        line-height: 1.1rem;
        font-weight: bold;
        color: #888888;
        border: none;
      }
      .search-icon {
        padding-left: 0.5rem;
        font-size: 0.8rem;
      }
    }
    .search-content.hasFocus {
      display: flex;
      flex-direction: row;
      .search-input {
        flex: 1;
        margin: 0 0.5rem;
      }
      .search-icon {
        margin-top: 0.1rem
      }
    }
  }
</style>
