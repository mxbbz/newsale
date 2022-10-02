/*
 * @Author: mxbbz 
 * @Date: 2022-10-01 20:59:21 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-10-02 00:22:56
 */
<template>
  
  <div class="address">
    <el-button>默认按钮</el-button>
    <el-table :data="tableData" class="table" height="440px">
      <el-table-column  label="姓名" prop="consignee" > </el-table-column>
      <el-table-column label="手机号" prop="phone" width="120px"></el-table-column>
      <el-table-column label="省市" prop="province"> </el-table-column>
      <el-table-column  label="详细地址" prop="detail"> </el-table-column>
      <el-table-column  label="邮编" prop="zip"> </el-table-column>
      <el-table-column label="操作" width="300px" >
        <template>
          <el-button >默认地址</el-button>
          <el-button>编辑</el-button>
          <el-button>删除</el-button>
        </template>
        
      </el-table-column>
      
    </el-table>
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
      addAddress: false,
      tableData: [],
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
          
        }
      }) 
    },

  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
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
.address{
  background-color: #FFF;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table{
  position: relative;
  width: 100%;
  overflow: auto;
}
.button{
  float: right;
  margin-top: 20px;
}
</style>