<!--  -->
<template>
  
<div class='confirmOrder'>
  
  <div class="wrapper">
    <div>&nbsp;</div>
    <el-divider />
    <div class="address">
      <el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%">



    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="consignee"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      property="province"
      label="省市"
      width="200">
    </el-table-column>
    <el-table-column
      property="detail"
      label="详细地址">
    </el-table-column>
    <el-table-column
      property="zip"
      label="邮编">
    </el-table-column>
    <el-table-column
      property="phone"
      label="手机号">
    </el-table-column>
    <el-table-column  label="默认地址" >
             <template #default="scope">
          <el-tag  v-if="scope.row.isDefault==1" type="success" size="mini" >默认</el-tag>
          </template>
          </el-table-column>
  </el-table>
    </div>



    <div class="order">
      <h2>确认订单</h2>
      <el-image
      style="width: 100px; height: 100px"
      :src="productDetails.productPicture"
      :fit="fit"></el-image>
      {{productDetails.productName}}
      {{productDetails.productSellingPrice}}
    </div>
    <div class="addressInfo">
      配送地址:{{currentRow.province}}{{currentRow.detail}}
      <br/>
      收件人:{{currentRow.consignee}}
      <br/>
      手机号:{{currentRow.phone}}
      <div class="button">
      <el-button type="success" @click="addOrder">购买</el-button>
    </div>
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
  productDetails: [],
  tableData: [],
  currentRow: null
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  getAddr(){
      let userName = localStorage.getItem('userInfo')
      userName = JSON.parse(userName)
      let id=userName.id
      this.$api.getAddress(id).then(res => {
        if (String(res.code) === '1') {
          this.tableData = res.data || []
          for(let i =0;i<res.data.length;i++){
            if(res.data[i].isDefault===1){
              this.currentRow=res.data[i]
              console.log(this.currentRow)
            }
          }
        }
      }) 
    },
    handleCurrentChange(val) {
        this.currentRow = val;
        console.log(this.currentRow)
      },
      addOrder(){
        let addressId=this.currentRow.id
        let productId= this.productDetails.productId

        let sellerId=this.productDetails.productUserId
        let amount=this.productDetails.productSellingPrice
        let userName = localStorage.getItem('userInfo')
        userName = JSON.parse(userName)
        let purchaseId=userName.id
        
        this.$api.addOrder({addressId:addressId,productId:productId,sellerId:sellerId,purchaseId:purchaseId,amount:amount}).then((res=>{
          if (String(res.code) === '1') {
            this.$message.success("购买成功")
          }
        }))


      }

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.productDetails=this.$route.params.productDetails
  this.getAddr()
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
<style scoped>
.confirmOrder{
  background-color: #F5F5F5;
  height: 600px;
  margin-top: 120px;

}  
.order{
  background-color: aliceblue;
}
.orderInfo{
  border: 1cm #F5F5F5;
}
.addressInfo{
  float: right;
}
.button{
  float: right;
}
</style>