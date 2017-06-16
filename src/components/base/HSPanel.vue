<template>
  <div class="h-s-panel">
    <div class="h-s-panel-header">
      <span class="h-s-panel-title">{{this['panelInfo']['title']}}</span>
      <count-down v-if="this['panelInfo']['hasCountDown']"
                  v-bind:count-option="this['panelInfo']['countInfo']"></count-down>
      <router-link class="h-s-panel-link" v-if="this['panelInfo']['moreTarget']"
                   v-bind:to="{path:this['panelInfo']['moreTarget']}">更多<i class="icon-next"></i></router-link>
    </div>
    <div class="h-s-panel-content" v-bind:style="{transform:this.transformStyle,transition:this.transitionStyle}">
      <div class="content-items">
        <component class="h-s-panel-item" :is="itemComp" v-for="item of PanicItems" v-bind:item-info="item"></component>
      </div>
      <router-link class="h-s-panel-item-link" v-if="this['panelInfo']['moreTarget']"
                   v-bind:to="{path:this['panelInfo']['moreTarget']}"
                   v-bind:style="{'padding-left':this.morePaddingLeft,'border-top-left-radius':this.moreRadiusTF,'border-bottom-left-radius':this.moreRadiusBL}"><span>查看更多</span><i></i></router-link>
    </div>
  </div>
</template>
<script>
  import CountDown from "./CountDown";
  import {VSlider} from '../../tools'
  export default{
    components: {CountDown},
    name: 'h-s-panel',
    props: ['panelInfo'],
    data(){
      return {
        PanicItems: this['panelInfo']['items'] || [],
        itemComp: this['panelInfo']['comp'] || '',
        transformStyle: 'translateX(0px)',
        transitionStyle: '',
        maxWidth: 0,
        morePaddingLeft: '6px',
        moreRadiusTF:'0px 0px',
        moreRadiusBL:'0px 0px',
        scrollPosition: 0
      }
    },
    watch: {
      scrollPosition: function (value, oldValue) {
        this.transformStyle = `translateX(${value}px)`
      }
    },
    mounted(){
      this.maxWidth = this.$el.querySelector('.content-items').offsetWidth - this.$el.querySelector('.h-s-panel-content').offsetWidth;
      if (this.$el.querySelector('.h-s-panel-item-link')) this.maxWidth += this.$el.querySelector('.h-s-panel-item-link').offsetWidth;
      VSlider.addSlider(this.$el.querySelector('.h-s-panel-content'), {
        sliderType: 'H',
        sliding: function (opts) {
          let nDis = this.scrollPosition + opts.mDis;
          if (nDis > 50)return;
          if (Math.abs(nDis) > (this.maxWidth + 50)) return;
          if (nDis < 0 && Math.abs(nDis) > this.maxWidth) {
            let diff = Math.abs(nDis) - this.maxWidth;
            this.moreRadiusTF=`${3*diff}px 100px`;
            this.moreRadiusBL=`${3*diff}px 100px`;
            this.morePaddingLeft = (diff + 6) + 'px';
            if(Math.abs(nDis)>this.maxWidth+20){
              this.$el.querySelector('.h-s-panel-item-link span').innerHTML="释放查看"
            }else {
              this.$el.querySelector('.h-s-panel-item-link span').innerHTML="查看更多"
            }
          }
          this.scrollPosition += opts.mDis;
        }.bind(this),
        afterSlide: function (opts) {
          if (this.scrollPosition > 0) {
            this.transitionStyle = 'transform 0.2s';
            this.scrollPosition = 0;
          } else {

          }
        }.bind(this)
      })
    }
  }
</script>
<style scoped lang="scss">
  .h-s-panel-header {
    text-align: left;
    padding: 0.2rem;
    border-bottom: 1px solid #efefef;
    .h-s-panel-title {
      display: inline-block;
      font-weight: bold;
      vertical-align: middle;
    }
    .h-s-panel-link {
      float: right;
      font-size: .6rem;
      color: #888;
      margin: 0.2rem;
    }
  }

  .h-s-panel-content {
    min-width: 100%;
    text-align: left;
    line-height: 1;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 0.1rem 0 0.2rem .4rem;
    .content-items {
      flex: 1;
    }
    .h-s-panel-item {
      box-sizing: border-box;
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.4rem;
      width: 5.5rem;
    }
    .h-s-panel-item-link {
      display: inline-block;
      width: 0.8rem;
      padding: 0.1rem 0.4rem;
      vertical-align: middle;
      white-space: normal;
      background: rgba(125, 125, 125, 0.2);
      font-size: 0.8rem;
      span {
        vertical-align: middle;
        display: inline-block;
        color: #333;
      }
      i {
        height: 100%;
        vertical-align: middle;
        width: 0;
        display: inline-block;
      }
    }
  }

</style>
