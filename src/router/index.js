import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import UserInfo from '../views/userInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: UserInfo
    },
  ]
})
