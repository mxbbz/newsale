/*
 * @Author: mxbbz 
 * @Date: 2022-10-11 00:18:35 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-10-16 00:31:18
 * 购物车(待完成)
 */

<template>
<div class='c'>
  <div class="image">
      <img height="100px"  width="1518px" src="../assets/imges/shoppingcart.jpg"/>
    </div>
  <div class="wrapper">
    
    <div class="shoppingCart">
      <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label=""
      width="120">
      <template slot-scope="scope"><img :src="scope.row.productPicture" style="height: 100px; width: 100px; "/></template>
    </el-table-column>
    <el-table-column
      prop="productName"
      label="商品名"
      width="120">
    </el-table-column>
    <el-table-column
      label="价格"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <span class="del">{{scope.row.productPrice}}</span>   {{scope.row.productSellingPrice}}
      </template>
    </el-table-column>


  </el-table>

    </div>
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
  userId: 0,
  tableData: [],
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  getShoppingCart(){
      this.$api.getShoppingCart(this.userId).then((res=>{
        this.tableData=res.data
      }))
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.userId=this.$store.state.userId
    this.getShoppingCart()
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
.c{
  background-color: #F5F5F5;
}
.image{
  margin-top: 100px;
}
.orderList{
  height: 300px;
  background-color: antiquewhite;
}
.del {
  margin-left: 0.5em;
  color: #b0b0b0;
  text-decoration: line-through;
}
</style>