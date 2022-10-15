import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import UserInfo from '../views/userInfo'
import Details from '../views/details'
import ConfirmOrder from "../views/confirmOrder"
import Orders from '../views/orders'
import ShoppingCart from '../views/shoppingCart'
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
    {
      path: '/goods/details',
      name: 'details',
      component: Details
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: ConfirmOrder
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: ShoppingCart
    }
  ]
})
