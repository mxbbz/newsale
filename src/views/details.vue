/*
 * @Author: mxbbz 
 * @Date: 2022-10-07 22:34:24 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-10-12 23:31:04
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
              <el-image :src="item.blockUrl"></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 用户信息 -->
        <div class="user">
          <el-col :span="12">
            <el-avatar
              shape="square"
              :src="userInfo.avatar"
              :size="50"
            ></el-avatar>
            <p>{{ userInfo.name }}</p>
            <el-button type="success">与我联系</el-button>
          </el-col>
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
      productDetails: "",
      productPicture: "",
      userInfo: '',
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
          this.$store.commit('setShoppingCartCount',this.$store.state.shoppingCartCount+1)
        } else {
          this.$message.error(res.msg)
        }
      }))
    },
    toConfirmOrder() {
      this.$router.push({ name: "confirmOrder", params: { productDetails: this.productDetails } })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let id = this.$route.query.productId
    this.getDetails(id)
    this.getPicture(id)

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
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
  margin: 70px;
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
}
</style>