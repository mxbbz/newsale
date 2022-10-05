<template>
  <div id="app" class="app">
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
            <router-link to="/home/users">我的订单</router-link>
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
              <img src="./assets/imges/logo.png" alt />
            </router-link>
          </div>
          <div class="search">
            <el-row class="autocomplete">
              <el-col :span="12">
                <el-autocomplete
                  class="inline-input"
                  v-model="state1"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  @select="handleSelect"
                  ><el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="searchClick"
                  ></el-button
                ></el-autocomplete>
              </el-col>
            </el-row>
          </div>
          <div class="shopcar">
            <div class="wrappe">
              <el-badge :value="12" class="item">
                <el-button size="small" icon="el-icon-shopping-cart-full"
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
  data() {
    return {
      userName: '',
      loginStaus: false,
      activeName: 'second'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  created() {
    
      let userName = localStorage.getItem('userInfo')
      userName=JSON.parse(userName)
      if(userName) {
        this.loginStaus=true
				//userName.username==user.username  对应登录界面设置的key里面的value对应的数组值
				this.user = userName.name
			}
    
  }
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
</style>
