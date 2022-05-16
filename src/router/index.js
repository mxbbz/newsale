import Vue from 'vue'
import VueRouter from 'vue-router'

import NavBar from '@/views/home/navbar'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: NavBar
  }
]

const router = new VueRouter({
  routes
})

export default router
