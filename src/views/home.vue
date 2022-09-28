/*
 * @Author: mxbbz 
 * @Date: 2022-09-27 21:04:44 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-09-27 22:53:10
 */

<template>
  <div id="home" class="home">
    <el-main>
      <div class="wrapper">
        <!-- 左侧分类菜单 -->
        <div class="category">
          <h2>分类</h2>
          <div class="categorymenu">
            <el-link icon="el-icon-s-goods">全部商品</el-link>
            <br />
            <el-link icon="el-icon-camera-solid">数码产品</el-link>
            <br />
            <el-link icon="el-icon-basketball">体育用品</el-link>
            <br />
            <el-link icon="el-icon-cpu">电子产品</el-link>
            <br />
            <el-link icon="el-icon-collection">书籍古典</el-link>
            <br />
            <el-link icon="el-icon-table-lamp">装饰</el-link>
            <br />
            <el-link icon="el-icon-headset">耳机</el-link>
            <br />
            <el-link icon="el-icon-mobile">手机</el-link>
            <br />
            <el-link icon="el-icon-bicycle">车类</el-link>
          </div>
        </div>
        <!--动态图片轮播图 -->
        <div class="block">
          <el-carousel :interval="4000" arrow="always" height="400px">
            <el-carousel-item v-for="item in imagebox" :key="item.id">
              <img :src="item.idView" class="image" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    
    </el-main>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {
      imagebox: [
        { id: 0, idView: require('../assets/imges/banner.jpg') },
        { id: 1, idView: require('../assets/imges/banner2.jpg') },
        { id: 2, idView: require('../assets/imges/banner3.jpg') },
      ],
      // 浏览器宽度
      screenWidth: 0
    }
  },
  methods: {
    setSize: function () {
      // 通过浏览器宽度(图片宽度)计算高度
      this.bannerHeight = 390 / 1920 * this.screenWidth;
    },
  },
  mounted() {
    // 首次加载时,需要调用一次
    this.screenWidth = window.innerWidth;
    this.setSize();
    // 窗口大小发生改变时,调用一次
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
      this.setSize();
    }
  }
}
</script>

<style  scoped>
.home {
  background-color: #fff;
  margin-top: 40px;
}
.block {
  float: right;
  width: 1000px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  height: inherit;
}
.category {
  float: left;
  width: 235px;
  height: 400px;
  background: #d3dce6 border-box;
  border-radius: 5px;
}
.category h2 {
  padding: 16px 0 0 20px;
  font-size: 18px;
  color: #111;
  letter-spacing: 0;
  line-height: 24px;
}
.categorymenu {
  margin: 0 auto;
  text-align: center;
}
.categorymenu a {
  margin-top: 15px;
}
</style>

