/*
 * @Author: mxbbz 
 * @Date: 2022-10-17 17:23:01 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-11-02 20:36:38
 * 样式和部分代码来自于https://gitee.com/hai-27/vue-store
 */

<template>
  <div class="goods">
    <div class="wrapper">
      <!-- 商品展示 -->
      <div class="list">
        <div class="condition">
        <el-button icon="el-icon-bottom" @click="downchange">降序</el-button>
        <el-button icon="el-icon-top" @click="upchange">升序</el-button>
        <el-input v-model="min" style="width:80px;margin-left: 15px;" placeholder="请输入内容"></el-input>
        <el-input v-model="max" style="width:80px;margin-left: 15px;" placeholder="请输入内容"></el-input>
        <el-button icon="el-icon-search" style="margin-left: 15px;" @click="search">查询</el-button>
      </div>
        <ul>
          <li v-for="item in productList" :key="item.product_id">
            <router-link
              :to="{
                path: '/goods/details',
                query: { productId: item.productId },
              }"
            >
              <div class="img">
                <img
                  style="width: 170px; height: 160px"
                  :src="item.productPicture"
                  alt
                />
              </div>

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
      <el-pagination
        class="pageList"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="1000"
        :current-page.sync="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
      ></el-pagination>
    </div>
    

  </div>
  
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      productList: [null],
      page: 1,
      pageSize: 25,
      min: 0,
      max: 0,
    };
  },
  
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    "$route.query.categoryId": {
      immediate: true,
      handler() {
        if(this.$route.query.categoryId!=null){
          this.getProductList(this.$route.query.categoryId);
        }
        
      },
    },
    "$route.query.serach": {
      immediate: true,
      handler() {
        if(this.$route.query.serach!=null){
          this.seracchProductList(this.$route.query.serach);
        }
      },
    },


  },
  //方法集合
  methods: {
    upchange(){
            	this.productList.sort((a,b)=>{
              			return a.productSellingPrice - b.productSellingPrice;
           		 })

    },
    downchange() {
            function sortData(a, b) {
              		return b.productSellingPrice - a.productSellingPrice;
            	}	
            this.productList.sort(sortData);
            },
    search(){
      const data={
        page: this.page,
        pageSize: this.pageSize,
        min:this.min,
        max:this.max
      }
      this.$api.queryPriceRange(data).then((res) => {
        if (String(res.code) === '1') {
          
          this.productList=res.data.records || []
          window.scroll(0,0)
        
        }

      })

    },
    getProductList(categoryId) {

      const data = {
              page: this.page,
              pageSize: this.pageSize,
              categoryId: categoryId
            }

          console.log(data)
      this.$api.getProductList(data).then((res) => {
        if (String(res.code) === '1') {
          
          this.productList=res.data.records || []
          window.scroll(0,0)
          
        }
      })
    },
    seracchProductList(serach){

      const data = {
              page: this.page,
              pageSize: this.pageSize,
              serach: serach
            }
      this.$api.seracchProductList(data).then((res) => {
        if (String(res.code) === '1') {
          this.productList=res.data.records || []
          window.scroll(0,0)
        }
      })
    },
    handleSizeChange (val) {
      
            this.pageSize = val
            if(this.$route.query.serach!=null){
          this.seracchProductList(this.$route.query.serach);
        }
        if(this.$route.query.categoryId!=null){
          this.getProductList(this.$route.query.categoryId);
        }
          },
          handleCurrentChange (val) {
            this.page = val
            if(this.$route.query.serach!=null){
          this.seracchProductList(this.$route.query.serach);
        }
        if(this.$route.query.categoryId!=null){
          this.getProductList(this.$route.query.categoryId);
        }
          }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
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
<style scoped>
.goods{
  margin-top: 120px;
}
/* 商品展示 */
/* 以下样式来自于 https://gitee.com/hai-27/vue-store*/
a {
  text-decoration: none;
}
.list {
  background-color: #f5f5f5;
  width: auto;
  height: 1500px;
  border-radius: 20px;
}
.condition{
  text-align: center;
}
.list ul li {
  float: left;
  width: 234px;
  height: 250px;
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
.pageList{
  text-align: center;
}
</style>