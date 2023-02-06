/*
 * @Author: mxbbz 
 * @Date: 2022-10-11 00:14:20 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-10-16 23:15:16
 * 确认订单页(购买)
 */

<template>
  <div class="confirmOrder">
    <div class="wrapper">
      <div>&nbsp;</div>
      <el-divider />
      <!-- 用户收货地址 -->
      <div class="address">
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column property="consignee" label="姓名" width="120">
          </el-table-column>
          <el-table-column property="province" label="省市" width="200">
          </el-table-column>
          <el-table-column property="detail" label="详细地址">
          </el-table-column>
          <el-table-column property="zip" label="邮编"> </el-table-column>
          <el-table-column property="phone" label="手机号"> </el-table-column>
          <el-table-column label="默认地址">
            <template #default="scope">
              <el-tag v-if="scope.row.isDefault == 1" type="success" size="mini"
                >默认</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 订单信息 -->
      <h2>确认订单</h2>
      <div class="order" v-for="item in this.productDetails" :key="item.id">
        
        <el-image
          style="width: 100px; height: 100px"
          :src="item.productPicture"
          
        ></el-image>
        {{ item.productName }}
        {{ item.productSellingPrice }}
      </div>
      <div class="addressInfo">
        配送地址:{{ currentRow.province }}{{ currentRow.detail }}
        <br />
        收件人:{{ currentRow.consignee }}
        <br />
        手机号:{{ currentRow.phone }}
        <div class="button">
          <el-button type="success" @click="addOrder">购买</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeVue from '/newsale/newsale/src/views/home.vue';
export default {
  components: {},
  data() {
    return {
      productDetails: [],
      tableData: [],
      currentRow: null
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 获得用户收货信息
    getAddr() {
      let userName = localStorage.getItem('userInfo')
      userName = JSON.parse(userName)
      let id = userName.id
      this.$api.getAddress(id).then(res => {
        if (String(res.code) === '1') {
          this.tableData = res.data || []
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].isDefault === 1) {
              this.currentRow = res.data[i]
              console.log(this.currentRow)
            }
          }
        }
      })
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    // 购买请求
    addOrder() {
      let addressId = this.currentRow.id
      let productId = this.productDetails[0].productId

      let sellerId = this.productDetails[0].productUserId
      let amount = this.productDetails[0].productSellingPrice
      let userName = localStorage.getItem('userInfo')
      userName = JSON.parse(userName)
      let purchaseId = userName.id

      this.$api.addOrder({ addressId: addressId, productId: productId, sellerId: sellerId, purchaseId: purchaseId, amount: amount }).then((res => {
        if (String(res.code) === '1') {
          this.$message.success("购买成功")
          this.$router.push(HomeVue)
        }
      }))


    }

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //如果传来的商品大于一就直接渲染 单个数据则push进去
    if(this.$route.params.productDetails.length>1){
      this.productDetails=this.$route.params.productDetails
    }else{
      this.productDetails.push(this.$route.params.productDetails)
    }
    console.log(this.productDetails)
    this.getAddr()
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
.confirmOrder {
  background-color: #f5f5f5;
  margin-top: 120px;
}
.order {
  background-color: aliceblue;
  margin-top: 30px;
  
}
.order:nth-last-child(1){
  height: 200px;
}
.orderInfo {
  border: 1cm #f5f5f5;
}
.addressInfo {
  float: right;
}
.button {
  float: right;
}
</style>