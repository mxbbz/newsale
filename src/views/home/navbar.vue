<template>
<div class="navbar">
<div class="wrapper">
      <ul class="menu">
        <li class="menu-item" v-if="user">
          <router-link to="/home/users">你好 {{user.name}}</router-link>
        </li>
        <li class="menu-item" v-else>
          <router-link to="/home/users">请登录..</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/home/users">我的订单</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/home/users">客服服务</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/home/users">会员中心</router-link>
        </li>
        <li class="menu-item">
          <router-link to="/home/users">手机新售</router-link>
        </li>
      </ul>
  </div>
</div>

</template>

<script>
export default {
  methods: {
    11 () {
      console.log('11')
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    width: 1240px;
    margin: 0 auto;
  }
  .navbar{
    height: 52px;
    background-color: #333;
  }
  .menu{
    float: right;
    .menu-item{
      float: left;
      line-height: 52px;
      a{
        border-right: 1px #666 solid;
        padding: 0 16px;
        color: #dcdcdc;
        font-size: 14px;
      }
    }
  }
</style>
