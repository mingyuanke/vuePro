<template>
  <div class="home-page">
    <SearchBar v-bind:query="queryDate" v-on:queryChange="searchChange" holder-text="请输入商家、商品名称"/>
    <ul class="common-search">
      <li v-for="item in this.commonSearch" class="common-search-item">
        <router-link :to="{name:'store'}">{{item}}</router-link>
      </li>
    </ul>
    <div class="item-group">
      <nav-icons v-bind:nav-info="navInfo"></nav-icons>
      <figure-panel v-bind:img-info="adImgInfo"></figure-panel>
    </div>
    <div class="item-group">
      <table-panel v-bind:cells-info="tInfo"></table-panel>
    </div>
    <div class="item-group">
      <h-s-panel v-bind:panelInfo="panicInfo"></h-s-panel>
    </div>
    <div class="item-group">
      <base-panel v-bind:com-info="this.preferred"></base-panel>
    </div>
    <div class="item-group">
      <table-panel v-bind:cells-info="fInfo"></table-panel>
    </div>
    <div class="item-group">
      <list-panel v-bind:comInfo="listInfo"></list-panel>
    </div>
  </div>
</template>
<script>
  import SearchBar from '@/components/base/SearchBar'
  import NavIcons from '@/components/NavIcons'
  import Img from '@/components/base/FigurePanel'
  import FigurePanel from "../components/base/FigurePanel";
  import TestImg from '../assets/logo.png'
  import TablePanel from '@/components/base/tablePanel'
  import TableCell from "./TableCell";
  import CountDown from '@/components/base/CountDown'
  import Vue from 'vue'
  import p1 from '../assets/home/food-1.png'
  import p2 from '../assets/home/food-2.png'
  import p3 from '../assets/home/food-3.png'
  import p4 from '../assets/home/food-4.png'
  import p5 from '../assets/home/dollar.png'
  import p6 from '../assets/home/quan.png'
  import HSPanel from "../components/base/HSPanel";
  import PanicCell from "./PanicCell";
  import BasePanel from "../components/base/BasePanel";
  import PreferCell from "./preferCell.vue"
  import ListPanel from "../components/base/ListPanel";
  import ListCell from "./ListCell.vue"
  import {Types} from '../store'
  import {Map} from '../tools'
  Vue.component('table-cell', TableCell);
  Vue.component('panic-cell', PanicCell);
  Vue.component('prefer-cell', PreferCell);
  Vue.component('list-cell',ListCell);

  let geolocation,map;
  export default{
    name: 'home-page',
    beforeCreate(){
      this.$store.dispatch(Types.SET_DATA_BY_KEY, {
        key: 'promote-shop',
        data: [{
          id: 'f1',
          name: 't1t'
        }]
      });
      Map.ready(()=>{
        map=new window.AMap.Map('container');
        map.plugin('AMap.Geolocation',function () {
          geolocation=new window.AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation,'complete',data=>window.console.log(data))
        })
      })

    },
    data(){
      return {
        listInfo: {
          title: '推荐商家',
          dataSourceKey: 'promote-shop',
          comp: 'list-cell'
        },
        preferred: {
          title: '-品质优选-',
          contentComp: 'prefer-cell',
          external: {
            text: '更多',
            type: 'url',
            url: '/prefer'
          },
          item: {
            target: '/prefer',
            info: [{
              src: p1,
              title: 'CoCo都可',
              label: '大牌精选',
              color: '#7f6aff',
              query: 'coco',
              target: '/prefer-test'
            }, {
              src: p2,
              title: 'DQ',
              label: '大牌精选',
              color: '#7f6aff',
              query: 'bq'
            }, {
              src: p3,
              title: '快乐柠檬',
              label: '大牌精选',
              color: '#7f6aff',
              query: 'kl'
            }, {
              src: p4,
              title: '肯德基宅急送',
              label: '大牌精选',
              color: '#7f6aff',
              query: 'kfc'
            }, {
              src: p3,
              title: '百果园',
              label: '热销好店',
              color: '#ff6a7f',
              query: 'bgy'
            }]
          }
        },
        queryDate: '',
        commonSearch: ['缤果', '绝味鸭脖', '百果园', '粽子8折', '我的菜', '莱得快', '第一佳'],
        navInfo: {
          baseUrl: './',
          iconType: 'iconFont',//img or iconFont
          items: [
            {
              navId: 'nav-cate',
              text: '美食',
              target: '/classification/cate',
              iconSrc: 'icon-cate'
            },
            {
              navId: 'nav-dessert-drinks',
              text: '甜品饮品',
              target: '/classification/dessert-drinks',
              iconSrc: 'icon-drink'
            }, {
              navId: 'nav-market',
              text: '商超便利',
              target: '/classification/market',
              iconSrc: 'icon-market'
            }, {
              navId: 'nav-fresh-fruits-vegetables',
              text: '果蔬生鲜',
              target: '/classification/fresh-fruits-vegetables',
              iconSrc: 'icon-fruit'
            }, {
              navId: 'nav-new-store-preference',
              text: '新店特惠',
              target: '/classification/new-store-preference',
              iconSrc: 'icon-new-store'
            }, {
              navId: 'nav-punctual',
              text: '准时达',
              target: '/classification/punctual',
              iconSrc: 'icon-punctual'
            }, {
              navId: 'nav-light-meal',
              text: '简餐',
              target: '/classification/light-meal',
              iconSrc: 'icon-meal'
            }, {
              navId: 'nav-help-buy-send',
              text: '帮买帮送',
              target: '/classification/help-buy-send',
              iconSrc: 'icon-send'
            }, {
              navId: 'nav-burger-fries',
              text: '汉堡薯条',
              target: '/classification/burger-fries',
              iconSrc: 'icon-burger'
            }, {
              navId: 'nav-bun-porridge',
              text: '包子粥店',
              target: '/classification/bun-porridge',
              iconSrc: 'icon-porridge'
            }, {
              navId: 'nav-flowers-cake',
              text: '鲜花蛋糕',
              target: '/classification/flowers-cake',
              iconSrc: 'icon-flowers'
            }, {
              navId: 'nav-hotpot',
              text: '麻辣烫',
              target: '/classification/hotpot',
              iconSrc: 'icon-hotpot'
            }, {
              navId: 'nav-CX-cuisine',
              text: '川湘菜',
              target: '/classification/CX-cuisine',
              iconSrc: ''
            }, {
              navId: 'nav-pizza-spaghetti',
              text: '披萨意面',
              target: '/classification/pizza-spaghetti',
              iconSrc: 'icon-spaghetti'
            }, {
              navId: 'nav-JK-cuisine',
              text: '日韩料理',
              target: '/classification/JK-cuisine',
              iconSrc: ''
            }
          ]
        },
        panicInfo: {
          title: '限时抢购',
          hasCountDown: true,
          moreTarget: '/panic',
          countInfo: {
            format: 'hh:mm:ss',
            beforeText: '距离结束',
            afterText: '',
            markColor: '',
            dText: '天',
            hText: ':',
            mText: ':',
            sText: '',
            endTime: '2017/6/8 13:24:56',
            endEvents: ''
          },
          items: [{
            src: p1,
            id: 't1',
            target: '/panic',
            title: 'ceShi1234567890qweqrqeqwrwe',
            price: '9.9',
            oldPrice: ''
          }, {
            src: p2,
            id: 't2',
            target: '/panic',
            title: 'ceShi1234567890qweqrqeqwrwe',
            price: '12.5',
            oldPrice: '16'
          }, {
            src: p3,
            id: 't3',
            target: '/panic',
            title: 'ceShi1234567890qweqrqeqwrwe',
            price: '3.33',
            oldPrice: '5.55'
          }, {
            src: p4,
            id: 't4',
            target: '/panic',
            title: 'ceShi1234567890qweqrqeqwrwe',
            price: '23.33',
            oldPrice: '25.55'
          }, {
            src: p3,
            id: 't5',
            target: '/panic',
            title: 'ceShi1234567890qweqrqeqwrwe',
            price: '3.36',
            oldPrice: '5.55'
          }],
          comp: 'panic-cell'
        },
        adImgInfo: {
          src: TestImg
        },
        fInfo: {
          temp: 'table-cell',
          cols: 2,
          cells: [{
            icon: p5,
            title: '推荐有奖',
            caption: '5元现金拿不停',
            target: '/dollar'
          }, {
            icon: p6,
            title: '领券中心',
            caption: '代金券免费领',
            target: '/voucher'
          }
          ]
        },
        tInfo: {
          temp: 'table-cell',
          cols: 2,
          cells: [{
            icon: p1,
            title: '热卖套餐',
            caption: '附近畅销美食',
            target: '/p1'
          }, {
            icon: p2,
            title: '霸王餐',
            caption: '领20元红包',
            target: '/p2'
          }, {
            icon: p3,
            title: '茶歇6折',
            caption: '悠享下午茶',
            target: '/p3'
          }, {
            icon: p4,
            title: '天天特价',
            caption: '美食1折起',
            target: '/p4'
          }
          ]
        }
      }
    },
    methods: {
      searchChange(value){
        window.console.log(value)
      }
    },
    components: {
      ListPanel,
      BasePanel,
      PanicCell,
      HSPanel,
      CountDown,
      TableCell,
      TablePanel,
      FigurePanel,
      SearchBar,
      NavIcons
    }
  }
</script>
<style scoped>
  .home-page {
    /*height: 100%;*/
    width: 100%;
  }

  .common-search {
    padding: 0.1rem 0 0.4rem;
    background: rgba(84, 135, 243, 0.89);
    font-size: 0.6rem;
    color: white;
  }

  .item-group {
    margin-bottom: 0.5rem;
    background: white;
  }

  .common-search-item {
    padding: 0.1rem;
  }
</style>
