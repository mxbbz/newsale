<template>
  <div id="app">
    <!--顶部导航栏-->
    <div class="topbar">
      <div class=" wrapper">
      <ul class="menu">
        <li v-if="user">
          <router-link to="userinfo">你好 {{user.name}}</router-link>
        </li>
        <li v-else>
          <el-button type="text" @click="login">请登录..</el-button>
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
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      user: false
    }
  },
  methods: {
  }
}
</script>

<style>
/* 顶端css */
.topbar{
  height: 52px;
  background-color: #333;
}
.menu{
  float: right;
}
.menu li{
  float: left;
  line-height: 52px;
}
.menu li a{
  border-right: 1px #666 solid;
  padding: 0 16px;
  color: #dcdcdc;
  font-size: 14px;
}







/* 默认样式 */
.wrapper {
  width: 1240px;
  margin: 0 auto;
}
  /* 清除默认样式 */
/* 清除默认样式的代码 */
/* 去除常见标签默认的 margin 和 padding */
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol,
li,
dl,
dt,
dd,
input {
  margin: 0;
  padding: 0;
}
/* 內减模式 */
* {
    box-sizing: border-box;
}
/* 设置网页统一的字体大小、行高、字体系列相关属性 */
body {
  font: 16px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei",
    "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
  color: #333;
}
/* 去除列表默认样式 */
ul,
ol {
  list-style: none;
}
/* 去除默认的倾斜效果 */
em,
i {
  font-style: normal;
}
/* 去除a标签默认下划线，并设置默认文字颜色 */
a {
  text-decoration: none;
  color: #333;
}
/* 设置img的垂直对齐方式为居中对齐，去除img默认下间隙 */
img {
  vertical-align: middle;
}
/* 去除input默认样式 */
input {
  border: none;
  outline: none;
  color: #333;
}
/* 左浮动 */
.fl {
  float: left;
}
/* 右浮动 */
.fr {
  float: right;
}
/* 双伪元素清除法 */
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
}
.clearfix::after {
  clear: both;
}
</style>
