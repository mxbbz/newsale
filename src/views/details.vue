/*
 * @Author: mxbbz 
 * @Date: 2022-10-07 22:34:24 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-11-10 22:29:47
 * 商品信息页
 */

<template>
  <div class="details">
    <div>&nbsp;</div>
    <el-divider />
    <div class="wrapper">
      <div class="background">
        <div class="page">
          <el-page-header @back="goBack" content="详情页面"></el-page-header>
        </div>
        <!-- 轮播图 -->
        <div class="block">
          <el-carousel height="500px">
            <el-carousel-item
              v-for="item in productPicture"
              :key="item.blockId"
            >
              <el-image
                style="width: auto; height: 430px"
                :src="item.blockUrl"
              ></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 用户信息 -->
        <div class="user">
          <el-avatar
            shape="square"
            :src="userInfo.avatar"
            :size="50"
            style="margin-top: 20px"
          ></el-avatar>
          <p>{{ userInfo.name }}</p>
          <el-button type="success">与我联系</el-button>
          <el-button type="danger">举报</el-button>
        </div>
        <!-- 标题详情 -->
        <div class="details">
          <h1>{{ productDetails.productName }}</h1>
          <p>{{ productDetails.productIntro }}</p>
          <h2>
            <el-tag
              v-if="productDetails.productBrandNew == 1"
              type="success"
              size="mini"
              >全新</el-tag
            >
            <el-tag
              v-if="productDetails.productFreeShipping == 1"
              type="success"
              size="mini"
              >包邮</el-tag
            >
          </h2>
          <p>
            <span>{{ productDetails.productSellingPrice }}元</span>
            <span
              v-show="
                productDetails.productPrice !=
                productDetails.productSellingPrice
              "
              class="del"
              >{{ productDetails.productPrice }}元</span
            >
          </p>
        </div>
        <!-- button -->
        <div class="button">
          <el-button type="primary" @click="addShoppingCart"
            >加入购物车</el-button
          >
          <el-button type="success" @click="toConfirmOrder">购买</el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        </div>
      </div>
    </div>

    <div class="message">
      <div class="avatar">
        <el-avatar shape="square" :size="size" :src="squareUrl"></el-avatar>
      </div>

      <div class="input">
        <el-input
          type="text"
          placeholder="留下你的评论"
          v-model="messageText"
          maxlength="30"
          show-word-limit
          style="display: inline"
        >
        </el-input>

        <div class="messageList">
      <div v-for="item in messageList" :key="item.commentsId">
        <el-avatar shape="square" :size="size" :src="item.avatar" style="top: 20px;"></el-avatar>
        <span style="font-weight:bold;font-size:18px;">{{item.userName}}</span>
        <span style="font-size:10px">·{{item.commentsTime}}</span>
        <span><el-button type="text" v-if="this.userId==item.id">删除</el-button></span>
        <span><el-button type="text">回复</el-button></span>
        <p style="margin-left: 30px;">{{item.commentsText}}</p>
      </div>
    </div>
      </div>

      <div class="button">
        <el-button type="primary" @click="addComments">发表评论</el-button>
      </div>
    </div>

  
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import confirmOrder from './confirmOrder.vue'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { confirmOrder },
  data() {
    //这里存放数据
    return {
      userId: "",
      productDetails: "",
      productPicture: "",
      userInfo: '',
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      messageText: '',
      messageList: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goBack() {
      this.$router.push('/')
    },
    // 获得商品信息
    getDetails(id) {
      this.$api.getDetails(id).then((res => {
        this.productDetails = res.data
        let userId = this.productDetails.productUserId
        this.getUserInfo(userId)
      }))
    },
    //获得轮播图
    getPicture(id) {
      this.$api.getPicture(id).then((res => {
        this.productPicture = res.data

      }))
    },
    //获得用户信息
    getUserInfo(userId) {
      this.$api.getUserInfo(userId).then((res => {
        this.userInfo = res.data
      }))
    },
    //添加购物车
    addShoppingCart() {
      let userInfo = localStorage.getItem('userInfo')
      userInfo = JSON.parse(userInfo)
      let userId = userInfo.id
      console.log(userId)
      let productId = this.productDetails.productId
      this.$api.addShoppingCart({ userId: userId, productId: productId }).then((res => {
        if (String(res.code) === '1') {
          this.$message.success("添加成功")
          this.$store.commit('setShoppingCartCount', this.$store.state.shoppingCartCount + 1)
        } else {
          this.$message.error(res.msg)
        }
      }))
    },
    toConfirmOrder() {
      this.$router.push({ name: "confirmOrder", params: { productDetails: this.productDetails } })
    },
    //发表评论
    addComments(){
      let userInfo = localStorage.getItem('userInfo')
      userInfo = JSON.parse(userInfo)
      let userId = userInfo.id
      this.$api.addComments({ commentsUserId: userId, productId: this.$route.query.productId, commentsText: this.messageText }).then((res => {
        if (String(res.code) === '1') {
          this.$message.success("发表成功")
        }
      }))
    },
    getMessageList(id){
      this.$api.getMessageList(id).then((res=>{
        if (String(res.code) === '1') {
          this.messageList=res.data
        }
      }))
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
      this.userId = this.$store.state.userId
      

    let id = this.$route.query.productId
    this.getDetails(id)
    this.getPicture(id)
    this.getMessageList(id)

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
.background {
  height: 600px;
}
.block {
  float: left;
  width: 400px;
  margin: 70px;
}
.details {
  background-color: #f5f5f5;
  margin-top: 120px;
}
.details p {
  margin: 10px 10px 10px;
  color: #ff6700;
}
.details .del {
  margin-left: 0.5em;
  color: #ff6700;
  text-decoration: line-through;
}
.user {
  float: right;
  width: 150px;
  height: 300px;
  background-color: #fff;
  margin-top: 70px;
  text-align: center;
}
.message {
  width: 500px;
}
.avatar {
  float: left;
}
.input {
  float: left;
  width: 250px;
}
.message .button {
  float: left;
}

.messageList{

  background-color: #fff;
  width: 350px;

}
</style>