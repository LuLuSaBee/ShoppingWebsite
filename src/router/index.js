import Vue from 'vue'
import Router from 'vue-router'
import Startpage from '@/components/Startpage'
import ProductPage from '@/components/ProductPage'
import LoveList from '@/components/LoveList'
import CargoList from '@/components/CargoList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Startpage',
      component: Startpage
    },
    {
      path: '/ProductPage',
      name: 'ProductPage',
      component: ProductPage
    },
    {
      path: '/LoveList',
      name: LoveList,
      component: LoveList
    },
    {
      path: '/CargoList',
      name: CargoList,
      component: CargoList
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
