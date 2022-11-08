<template>
  <div id="app" class="app">
    <div class="fixedBtn">
      <!--消息-->
      <div><el-button  icon="el-icon-chat-dot-square" @click="message = true" style="color:#0066CC" circle></el-button></div>
      <div> <el-button icon="el-icon-service" style="color:#0066CC" circle></el-button></div>
      <div><el-button icon="el-icon-caret-top" style="color:#0066CC" circle @click="backTop"></el-button></div>
    </div>
    
    <el-dialog
  title="消息"
  :visible.sync="message"
  width="70%"
  :before-close="handleClose">
  
  <div class="message">
    <ul v-for="o in 12" :key="o">
      <li>
        <el-button  class="button">
    <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
    {{'列表内容 ' + o }}
  
  </el-button>
      </li>
    </ul>
  </div>
</el-dialog>

    <!--顶部导航栏-->
    <div class="topbar">
      <div class="wrapper">
      <ul class="menu">
          <li v-if="loginStaus">
            <router-link to="/userInfo">{{user}}</router-link>
          </li>
          <li v-else>
            <router-link to="/login">请登录..</router-link>
          </li>
          <li>
            <router-link to="/orders">我的订单</router-link>
          </li>
          <li>
            <router-link to="/home/users">我的收藏</router-link>
          </li>
          <li>
            <router-link to="/home/users">客服服务</router-link>
          </li>
          <li>
            <router-link to="/home/users">手机新售</router-link>
          </li>
        </ul>
      </div>
    </div>


<!-- logo搜索区 -->
<div class="logo">
        <div class="wrapper">
          <div class="logoimg">
            <router-link to="/">
              <img ref="logo" src="./assets/imges/logo.png" alt />
            </router-link>
          </div>
          <div class="search">

                  <el-autocomplete
                  ref="list"
                  class="inline-input"
                  v-model="state1"
                  :fetch-suggestions="querySearch"
                  :clearable="true"
                  :select-when-unmatched="true"
                  placeholder="请输入内容"
                  @select="handleSelect"
                  :autofocus="true">

                </el-autocomplete>

                <el-button
                type="primary"

                    icon="el-icon-search"
                    @click="searchClick"
                    class="button"
                  />

          </div>
          <div class="shopcar">
            <div class="wrappe">
              <el-badge :value="shoppingCartCount"  class="item">
                <el-button size="small" icon="el-icon-shopping-cart-full" @click="tpShoppingCart"
                  >购物车</el-button
                >
              </el-badge>
            </div>
          </div>
        </div>
      </div>
    
    <router-view></router-view>
      <div class="footer">
        <el-footer>
          <div class="wrappe">

          </div>
        </el-footer>
      </div>
  
</div>

</template>

<script>

export default {
  name: 'App',
  components: { },
  data() {
    return {
      id: '',
      userName: '',
      loginStaus: false,
      shoppingCartCount: '',
      state1: '',
      restaurants: [],
      load: [],
      message: false,
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    tpShoppingCart(){
      this.$router.push({ path: "/shoppingCart" })
    },
    searchClick(){
      
      this.$router.push({ name: "goods",query:{serach:this.state1}})
      var str="{\"value\":\""+this.state1+"\"}";
      var c = JSON.parse(str);
      
      this.load.push(c)

    },
    handleSelect(){
      this.$router.push({ name: "goods",query:{serach:this.state1}})
      
    },
    querySearch(queryString, cb) {
      cb(this.restaurants);
    },
    backTop(){
      window.scroll(0,0);
    },

   

  },
  watch:{
    //监听购物车数量
    '$store.state.shoppingCartCount'(){
      this.shoppingCartCount=this.$store.state.shoppingCartCount
    }
  },

  created() {
      this.state1=""
      // 获得用户id
      let userName = localStorage.getItem('userInfo')
      userName=JSON.parse(userName)
      this.$store.commit('setUserId',userName.id)
      if(userName) {
        this.loginStaus=true
				this.user = userName.name
        this.id=userName.id
			}
  },
  mounted() {
   this.restaurants=this.load
  },

}
</script>

<style>
/* 全局CSS */
.wrapper {
  width: 1240px;
  margin: 0 auto;
}
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}
a{
  text-decoration: none;
  color: #000;
	}

/* 顶端css */
.topbar {
  height: 52px;
  background-color: #333;
}
.menu {
  float: right;
}
.menu li {
  float: left;
  line-height: 52px;
}
.menu li a {
  border-right: 1px #666 solid;
  padding: 0 16px;
  color: #dcdcdc;
  font-size: 14px;
}
/* logo */
.logo {
  float: left;
  height: 100px;
  width: 100%;
  background-color: #FFF;
}
.logoimg {
  margin-left: 90px;
  margin-top: 8px;
}
.logoimg img {
  height: 100px;
}
/* 搜索框 */
.search {
  margin-top: -60px;
  float: left;
  height: 100px;
  margin-left: 360px;
}
.inline-input {
  width: 550px;
}
/* 购物车 */
.shopcar {
  float: right;
  margin-top: -60px;
  margin-right: 70px;
}
/* 尾页 */
.footer{
  height: 260px;
  background-color: #333;
}
.fixedBtn{

  position: fixed;
    right: 15px;
    bottom: 82px;
    width: 40px;
    font-size: 30px;
    z-index: 1040;
}
.fixedBtn i{
  font-size: 20px;
}

.message{
  width: 19%;
  height: 400px;
  vertical-align:middle;
  overflow:auto;
}
.message .button{
  height: 100px;
  width: 190px;
}

::-webkit-scrollbar{
  width: 6px;
}
/* 定义滚动条轨道 */
::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
  border-radius: 10px;
  background-color: #FFF;
}
/* 滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgb(135, 111, 240);
  background-color: #AAA;
}
</style>
