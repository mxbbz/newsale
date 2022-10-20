/*
 * @Author: mxbbz 
 * @Date: 2022-10-11 00:18:35 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-10-17 20:57:17
 * 
 */

<template>
  <div class="c">
    <div class="image">
      <img
        height="100px"
        width="1518px"
        src="../assets/imges/shoppingcart.jpg"
      />
    </div>
    <div class="wrapper">
      <div class="top">
        <span class="count">全部 {{ this.count }}</span>
        <el-button type="success" class="el-icon-check" @click="toConfirmOrder">结算</el-button>
        <span class="money"
          >总计 <span style="color: #ff5809">{{ this.money }}</span> 元</span
        >
      </div>
      <div class="shoppingCart">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="" width="120">
            <template slot-scope="scope"
              ><img
                :src="scope.row.productPicture"
                style="height: 100px; width: 100px"
            /></template>
          </el-table-column>
          <el-table-column prop="productName" label="商品信息" width="120">
          </el-table-column>
          <el-table-column prop="productTitle" width="200"> </el-table-column>

          <el-table-column label="价格" show-overflow-tooltip width="150">
            <template slot-scope="scope">
              <span style="color: #ff5809">{{
                scope.row.productSellingPrice
              }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="productIntro" label="商品详情" width="250">
          </el-table-column>

          <el-table-column label="商品类型" width="150">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.productBrandNew" type="success"
                >#全新</el-tag
              >
              <el-tag v-if="scope.row.productFreeShipping" type="success"
                >#包邮</el-tag
              >
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button type="primary" class="el-icon-folder-add"
              >移入收藏夹</el-button
            >
            <el-button
              type="danger"
              class="el-icon-delete"
              @click="deleteShoppingCartProduct(scope.row.shoppingCartId)"
            >
              删除
            </el-button>
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
      count: 0,
      dataonLineListSelections: [],
      money: 0,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    dataonLineListSelections() {
      this.money = 0
      for (var i = 0; i < this.dataonLineListSelections.length; i++) {
        this.money += this.dataonLineListSelections[i].productSellingPrice
      }
      console.log(this.dataonLineListSelections)
    }
  },
  //方法集合
  methods: {
    getShoppingCart() {
      this.$api.getShoppingCart(this.userId).then((res => {
        this.tableData = res.data
        this.count = res.data.length
      }))
    },
    //统计选中行
    handleSelectionChange(val) {
      this.dataonLineListSelections = val
      console.log(this.dataonLineListSelections)
    },
    deleteShoppingCartProduct(id){
      this.$api.deleteShoppingCartProduct(id).then((res=>{
          if(res.data===true){
            this.$message.success("删除成功")
            this.getShoppingCart()
          }
      }))
    },
    toConfirmOrder() {
      console.log(this.dataonLineListSelections)
      this.$router.push({ name: "confirmOrder", params: {productDetails: this.dataonLineListSelections}   })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.userId = this.$store.state.userId
    this.getShoppingCart()
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
.c {
  background-color: #f5f5f5;
}
.image {
  margin-top: 100px;
}
.orderList {
  background-color: antiquewhite;
}
.top {
  background-color: #CCCCCC;
  height: 80px;
  border-radius: 15px 15px 0px 0px;
}
.top .count {
  font-size: 25px;
  float: left;
  margin-top: 40px;

}
.top .money {
  font-size: 25px;
  float: right;
  margin-top: 40px;
}
.top .el-icon-check {
  float: right;
  margin-top: 40px;
  margin-left: 20px;

}

</style>