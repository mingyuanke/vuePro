<template>
  <div class="base-page">
    <div class="base-page-main">
      <keep-alive>
        <component :is="currentItem"></component>
      </keep-alive>
    </div>
    <div class="base-page-footer">
      <ul class="base-footer-items">
        <li v-for="item in this.bpCon.navItem" v-on:click="changePage" v-bind:data-target="item.target"
            v-bind:class="[{'isActive':item.isActive},'base-footer-item']"><i v-bind:class="['icon',item.icon]"></i><br><span>{{item.text}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  export default {
    name: 'base-page',
    props: ['bpCon'],
    data () {
      return {
        msg: "vuex",
        currentItem: this.bpCon.navItem.find(function (item) {
          return item.isActive
        }).target
      }
    },
    computed: {
      ...mapGetters({
        doneCount: "vue-default"
      })
    },
    methods: {
      ...mapActions({
        add: "vue-default"
      }),
      changePage(event){
        let targetPage = event.currentTarget['dataset']['target'];
        if (targetPage !== this.currentItem) {
          this.currentItem = targetPage;
          event.currentTarget.parentNode.querySelector(".isActive").classList.remove('isActive');
          event.currentTarget.classList.add('isActive')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .base-page {
    height: 100%;
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .base-page-main {
    flex: 1;
    overflow-y: scroll;
    background: rgba(0, 0, 0, 0.1);
  }

  .base-page-footer {
  }

  .base-page-footer::before {
    content: '';
    display: block;
    height: 0.2rem;
    background: -webkit-linear-gradient(top, rgba(235, 235, 235, 0.1), rgba(123, 123, 123, 0.1))
  }

  .base-footer-items {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 0.2rem 0;
    margin: 0;
    font-size: 0;
    color: rgba(0, 0, 0, 0.5);
  }

  .base-footer-item {
    flex: 1;
    display: inline-block;
    span {
      font-size: 0.8rem;
    }
    .icon {
      font-size: 1.2rem;
      display: inline-block;
      height: 1.3rem;
    }
  }

  .isActive.base-footer-item {
    color: rgba(84, 135, 243, 0.89);
  }
</style>
