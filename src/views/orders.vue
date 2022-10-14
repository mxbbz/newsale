/*
 * @Author: https://blog.csdn.net/Passerby_K/article/details/110930324
 * @Date: 2022-10-14 22:40:19 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-10-14 23:51:03
 * 
 */

<template>
<div class='orders'>
  <div>&nbsp;</div>
    <el-divider />
    <div class="wrapper">
        <div class="background">

          
          <div class="ordersList">

            <el-table :data="orders"
            stripe
            row-key="id">
    <el-table-column type="selection"
                     width="55">
    </el-table-column>
    <el-table-column label="商品信息"
                     width="250"
                     class="box">
      <template slot-scope="scope">
        <div class="mesSty">
          <img class="imgSty"
               :src="scope.row.productPicture"
               alt="" style="height:100px;width: 100px;margin-top: 10px;">
          <div class="mesFont">
            <p class="pb_sty"><span>{{scope.row.productName}}</span></p>
          </div>
        </div>
        <!-- 提示 -->
        <div class="item">
          <span style="margin-left:1%">订单编号:{{scope.row.id}}</span>
          <span class="hint_pr">商家:{{scope.row.userName}}<el-button type="text" class="el-icon-phone-outline
">联系我</el-button></span>
          <span class="hint_pr">下单时间:{{scope.row.createTime}}</span>
          <span class="hint_pr" style="color:#99CC66" v-if="scope.row.status==0">正常</span>
          

  

        </div>
      </template>
    </el-table-column>
    <el-table-column prop="amount"
                     align="right"
                     min-width="100"
                     label="价格">
    </el-table-column>
    <el-table-column prop="province"
                     min-width="140"
                     align="center"
                     label="收货地址">
    </el-table-column>

    <el-table-column prop="consignee"
                     min-width="140"
                     align="center"
                     label="收货人">
    </el-table-column>

    <el-table-column prop="phone"
                     min-width="140"
                     align="center"
                     label="手机号">
    </el-table-column>

    <el-table-column prop="address"
                     min-width="140"
                     align="center"
                     label="订单状态">
    </el-table-column>




    <el-table-column fixed="right"
                     label="操作"
                     align="center"
                     width="100">
      <template slot-scope="">
        <el-button type="text"
                   size="small" class="el-icon-more-outline">订单详情</el-button>
                   <el-button type="text"
                   size="small" class="el-icon-delete">删除</el-button>
      </template>
    </el-table-column>
  </el-table>


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
  orders:[],
  popSty: false,
  textarea: '',
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
},
//方法集合
methods: {
  getOrdersList(){
    let userInfo = localStorage.getItem('userInfo')
      userInfo = JSON.parse(userInfo)
      let id = userInfo.id

    this.$api.getOrdersList(id).then((res=>{
      this.orders=res.data || []
    }))
  },


},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.getOrdersList()

 
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
.orders{
  margin: 70px;
  margin-top: 120px;
}
.background {
  height: 600px;
}
.head{
  height: 5px;
}

.el-table--enable-row-transition >>> .el-table__body td {
  padding-top: 2%;
}
/deep/ .el-table tr {
  position: relative;
  width: 100%;
}
/deep/ .cell {
  padding-top: 3%;
}
.item {
  width: 115.5em;
  background: #eee;
  padding: 1% 0;
  position: absolute;
  top: 0;
  left: -55px;
  z-index: 1;
  
}


.hint_pr {
  padding-left: 20vh;
}
.imgSty {
  width: 120px;
  display: block;
}
.mesSty {
  display: flex;
  align-items: center;
}

.pb_sty span {
  background: #1dc8de;
  padding: 4px 8px;
  border-radius: 4px;
  color: #fff;
  margin-left: 5px;
}

.mesFont p {
  margin-block-start: 0;
  margin-block-end: 0;
}
.mesFont p:nth-child(2) {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.iconSty {
  float: right;
  cursor: pointer;
}

</style>