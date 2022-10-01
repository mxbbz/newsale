/*
 * @Author: mxbbz 
 * @Date: 2022-10-01 20:59:21 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-10-02 00:22:56
 */
<template>
  
  <div class="address">
    <div class="card-header" style="text-align: left">
          <span>管理地址</span>
          <el-button class="button" @click="addAddress=true">新增</el-button>
        </div>
    <el-table :data="tableData" :fit='false'>
      
      <el-table-column  label="姓名"> </el-table-column>
      <el-table-column label="手机号" width="120px"></el-table-column>
      <el-table-column label="省市" width="140px"> </el-table-column>
      <el-table-column  label="详细地址"> </el-table-column>
      <el-table-column label="邮编"> </el-table-column>
      
      <el-table-column label="操作" width="300px">
        <template>
          <el-button>默认地址</el-button>
          <el-button>编辑</el-button>
          <el-button>删除</el-button>
        </template>
      </el-table-column>
      
    </el-table>
    <el-input v-if="addAddress" v-model="addData.name" placeholder="请输入内容"/>
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
      tableData: [{
        consignee: '',
        phone: '',
        province: '',
        detail: '',
        zip: 0,
        isDefault: 0
    }],
    addData: [{
       consignee: '',
        phone: '',
        province: '',
        detail: '',
        zip: '',
        fit: 'false'
    }]
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
      let res = this.$api.getAddress(id)
      if (String(res.code) === '1') {
        this.tableData.push(res.data)
      }
    }
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

</style>