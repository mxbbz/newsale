import Vue from 'vue'
import Vuex from 'vuex'

//使用vuex
Vue.use(Vuex)

//导出store
export default new Vuex.Store({
  //将数据定义在state里面，state是一个对象
  state: {
    //购物车数量
    shoppingCartCount: 0
  },
  mutations: {
    setShoppingCartCount(state, num) {
      state.shoppingCartCount = num
    }
  }
})
