/*
 * @Author: mxbbz 
 * @Date: 2022-09-27 21:04:44 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-10-09 00:58:35
 * 样式和部分代码来自于https://gitee.com/hai-27/vue-store
 */

<template>
  <div id="home" class="home">
    <el-main>
      <div class="wrapper">
        <!-- 左侧分类菜单 -->
        <div class="category">
          <div class="button">
            <el-button
              size="medium "
              type="primary"
              @click="dialogVisible = true"
              ><i class="el-icon-upload2">发布闲置</i></el-button
            >
            <el-dialog
              title="上传闲置"
              :visible.sync="dialogVisible"
              width="30%"
              center
            >
              <el-form ref="form" :model="uploadData" label-width="80px">
                <el-form-item label="商品名">
                  <el-input v-model="product_name"></el-input>
                </el-form-item>

                  <span class="demonstration">商品类型</span>
                  <el-cascader
                    v-model="data"
                    :options="uploadData"
                    :props="listTree"
                    @change="handleChange"
                    @visible-change="getCategory"
                  ></el-cascader>
              </el-form>

              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false"
                  >确 定</el-button
                >
                <el-button @click="dialogVisible = false">取 消</el-button>
              </span>
            </el-dialog>
          </div>
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

    <div class="list">
      <div class="wrapper">
        <ul>
          <li>
            <el-image
              style="width: 234px; height: 280px"
              :src="latestimges"
            ></el-image>
          </li>
          <li v-for="item in recent" :key="item.product_id">
            <router-link
              :to="{
                path: '/goods/details',
                query: { productId: item.productId },
              }"
            >
              <div class="img"><img :src="item.productPicture" alt /></div>

              <h2>
                <el-tag
                  v-if="item.productBrandNew == 1"
                  type="success"
                  size="mini"
                  >全新</el-tag
                >
                <el-tag
                  v-if="item.productFreeShipping == 1"
                  type="success"
                  size="mini"
                  >包邮</el-tag
                >{{ item.productName }}
              </h2>
              <h3>{{ item.productTitle }}</h3>
              <p>
                <span>{{ item.productSellingPrice }}元</span>
                <span
                  v-show="item.productPrice != item.productSellingPrice"
                  class="del"
                  >{{ item.productPrice }}元</span
                >
              </p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'home',
  comments: {},
  data() {
    return {
      data: [],
      uploadData: [],
      listTree: {
        label: 'name',
        children: 'children',
        value: 'id',
       },
      category: [],
      dialogVisible: false,
      latestimges: require('../assets/imges/new.jpg'),
      latestMerchandise: [],
      imagebox: [
        { id: 0, idView: require('../assets/imges/banner.jpg') },
        { id: 1, idView: require('../assets/imges/banner2.jpg') },
        { id: 2, idView: require('../assets/imges/banner3.jpg') },
      ],
      // 浏览器宽度
      screenWidth: 0,
      recent: [],
    }
  },
  created() {
    this.getList()
  },
  methods: {
    setSize: function () {
      // 通过浏览器宽度(图片宽度)计算高度
      this.bannerHeight = 390 / 1920 * this.screenWidth;
    },
    getList() {
      this.$api.getList().then((res) => {

        if (String(res.code) === '1') {
          this.recent = res.data || []
        }
      })
    },
    getCategory(){
      this.$api.getCategory().then((res=>{
        this.uploadData=res.data || []
        console.log(this.uploadData)
      }))
    },
    handleChange(itemIdArr){
    //获取id
    let val=itemIdArr[itemIdArr.length-1]
      console.log(val)
    }

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

<style scoped>
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
.button {
  text-align: center;
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
/* 商品展示 */
/* 以下样式来自于 https://gitee.com/hai-27/vue-store*/
a {
  text-decoration: none;
}
.list {
  background-color: #f5f5f5;
  width: auto;
  height: 700px;
}
.list ul li {
  float: left;
  width: 234px;
  height: 280px;
  padding: 10px 0;
  margin: 20px 0 0px 12px;
  background-color: white;
}
.list ul li:hover {
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}

.list ul li img {
  width: 170px;
  height: 200px;
  margin: 0 0 0 30px;
}
.list ul li h2 {
  font-size: 14px;
  font-weight: 400;
  color: #333;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.list ul li h3 {
  margin: 5px 10px;
  height: 18px;
  font-size: 12px;
  font-weight: 400;
  color: #b0b0b0;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.list ul li p {
  margin: 10px 10px 10px;
  text-align: center;
  color: #ff6700;
}
.list ul li p .del {
  margin-left: 0.5em;
  color: #b0b0b0;
  text-decoration: line-through;
}
</style>

