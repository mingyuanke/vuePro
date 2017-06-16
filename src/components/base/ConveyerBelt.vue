<template>
  <div class="conveyer-belt">
    <div class="conveyer-content">
      <keep-alive>
        <component class="conveyer-item conveyer-belt-prev"
                   :style="[{transition:transitionStyle},{transform:transformStyle}]" :base-url="this.itemInfo.baseUrl"
                   :icon-type="this.itemInfo.iconType"
                   :items="this.prevItemVal" :is="this.itemInfo.comName"></component>
      </keep-alive>
      <keep-alive>
        <component class="conveyer-item conveyer-belt-curr"
                   :style="[{transition:transitionStyle},{transform:transformStyle}]" :base-url="this.itemInfo.baseUrl"
                   :icon-type="this.itemInfo.iconType"
                   :items="this.currItemVal" :is="this.itemInfo.comName"></component>
      </keep-alive>
      <keep-alive>
        <component class="conveyer-item conveyer-belt-next"
                   :style="[{transition:transitionStyle},{transform:transformStyle}]" :base-url="this.itemInfo.baseUrl"
                   :icon-type="this.itemInfo.iconType"
                   :items="this.nextItemVal" :is="this.itemInfo.comName"></component>
      </keep-alive>
    </div>
    <ul v-if="this.itemInfo.items.length" class="conveyer-index">
      <li v-for="(item,index) in this.itemInfo.items">
        <i v-if="index===currentIndex" class="index-icon icon-circle-curr"></i>
        <i class="index-icon icon-circle" v-else></i>
      </li>
    </ul>
  </div>
</template>
<script>
  /**
   * (传送带)轮播等的基础组件
   */
  import {VSlider} from '../../tools'
  export default{
    name: 'conveyer-belt',
    props: ['itemInfo'],
    created(){
      if (!Array.isArray(this.itemInfo.items)) {
        window.console.error('item-list属性必须是数组')
      }
    },
    mounted(){
      const items = this.itemInfo.items;
      if (items.length === 1) {
        this.currItemVal = items[0]
      }
      else if (items.length > 1) {
        this.currItemVal = items[0];
        this.nextItemVal = items[1];
        this.prevItemVal = items[items.length - 1]
      }
      VSlider.addSlider(this.$el.querySelector('.conveyer-belt-curr'), {
        sliding: function (opts) {
          if (Math.abs(opts.dis) < this.$el.querySelector('.conveyer-belt-curr').offsetWidth) {
            this.transformStyle = `translateX(${opts.dis}px)`
          }
        }.bind(this),
        afterSlide: function (opts) {
          this.transitionStyle = 'transform 0.2s';
          let direction = 0;
          if ((Math.abs(opts.dis) < this.$el.querySelector('.conveyer-belt-curr').offsetWidth / 2)&&opts.speed<1000) {
            this.transformStyle = `translateX(0px)`
          } else {
            let dis = opts.dis > 0 ? '100%' : '-100%';
            this.transformStyle = `translateX(${dis})`;
            direction = opts.dis / Math.abs(opts.dis)
          }
          setTimeout(function () {
            this.transitionStyle = 'transform 0s';
            this.jumpPanel(direction)
          }.bind(this), 300)
        }.bind(this),
        sliderType: 'H'
      })
    },
    data(){
      return {
        prevItemVal: '',
        currItemVal: '',
        nextItemVal: '',
        currentIndex: 0,
        transitionStyle: 'transform 0s',
        transformStyle: 'translateX(0px)'
      }
    },
    methods: {
      jumpPanel(direction){
        let maxIndex = this.itemInfo.items.length - 1;
        let next, prev;
        if (direction === 0) {
          return false
        }
        else if (direction > 0) {
          next = this.currentIndex;
          this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : maxIndex;
          prev = this.currentIndex > 0 ? this.currentIndex - 1 : maxIndex;
        }
        else if (direction < 0) {
          prev = this.currentIndex;
          this.currentIndex = this.currentIndex < maxIndex ? this.currentIndex + 1 : 0;
          next = this.currentIndex < maxIndex ? this.currentIndex + 1 : 0;
        }
        this.currItemVal = this.itemInfo.items[this.currentIndex];
        this.transformStyle = 'translateX(0px)';
        this.prevItemVal = this.itemInfo.items[prev];
        this.nextItemVal = this.itemInfo.items[next]
      }
    }
  }
</script>
<style lang="scss">
  .conveyer-belt {
    width: 100%;
    overflow: hidden;
    .conveyer-content {
      margin-left: -100%;
      width: 300%;
      display: inline-block;
      font-size: 0;
    }
    .conveyer-item {
      width: 33.3%;
      font-size: 1rem;
      display: inline-block;
      -webkit-overflow-scrolling: touch;
    }
    .conveyer-belt-prev {

    }
  }

  .conveyer-index {
    display: inline-block;
    text-align: center;
    width: 100%;
    padding: 0.2rem;
    li {
      display: inline-block;
      font-size: 0.8rem;
      color: rgba(125, 125, 125, 0.8);
    }
  }
</style>
