import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/components/store'
import Index from '@/views/Index'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }, {
      path: '/store',
      name: 'store',
      component: Store
    }
  ]
})
