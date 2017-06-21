// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './fontcustom/fontcustom.css'
import {Map} from './tools'
new Map();
Vue.config.productionTip = false;
Vue.filter('priceFormat',function (value) {
  if (!isNaN(parseFloat(value))){
    return '<em>¥</em>'+parseFloat(value).toFixed(2)
  }
  return ''
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
