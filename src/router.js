import Vue from 'vue'
import Router from 'vue-router'
import Jetpacks from './views/Jetpacks.vue'
import Search from './views/Search.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'jetpacks',
      component: Jetpacks
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
