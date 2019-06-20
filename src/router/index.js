import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import appGoods from '@/components/goods/goods'
import appRatings from '@/components/ratings/ratings'
import appSeller from '@/components/seller/seller'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: appGoods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: appRatings
    },
    {
      path: '/seller',
      name: 'seller',
      component: appSeller
    },
    {
      path: '/',
      redirect: '/goods'
    }
  ],
  linkActiveClass: 'is-active'
})
