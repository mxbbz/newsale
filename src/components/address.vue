/*
 * @Author: mxbbz 
 * @Date: 2022-10-01 20:59:21 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-10-04 19:36:49
 */
<template>
  
  <div class="address">
    <div class="card-header" style="text-align: left">
          <span>管理地址</span>
          <el-button class="button" type="text" @click="addAddress">新增</el-button>
        </div>
    <el-table :data="tableData" class="table" height="370px">
      <el-table-column label="姓名">
              <template slot-scope="scope">
                  <span v-if="scope.row.isAdd">
                      <el-input
                              size="mini"
                              v-model="scope.row.consignee"
                      ></el-input>
                  </span>
                  <span v-else>
                      {{ scope.row.consignee }}
                  </span>
              </template>
          </el-table-column>
      <el-table-column label="手机号" prop="phone" width="120px">
        <template slot-scope="scope">
                  <span v-if="scope.row.isAdd">
                      <el-input
                              size="mini"
                              v-model="scope.row.phone"
                      ></el-input>
                  </span>
                  <span v-else>
                      {{ scope.row.phone }}
                  </span>
              </template>
      </el-table-column>
      <el-table-column label="省市" prop="province"> 
        <template slot-scope="scope">
                  <span v-if="scope.row.isAdd">
                    <el-cascader
      size="mini"
      :options="options"
      v-model="scope.row.province"
      @change="handleChange">
    </el-cascader>

                  </span>
                  <span v-else>
                      {{ scope.row.province }}
                  </span>
              </template>
      </el-table-column>
      <el-table-column  label="详细地址" prop="detail">
        <template slot-scope="scope">
                  <span v-if="scope.row.isAdd">
                      <el-input
                              size="mini"
                              v-model="scope.row.detail"
                      ></el-input>
                  </span>
                  <span v-else>
                      {{ scope.row.detail }}
                  </span>
              </template> 
            </el-table-column>
      <el-table-column  label="邮编" prop="zip">
        <template slot-scope="scope">
                  <span v-if="scope.row.isAdd">
                      <el-input
                              size="mini"
                              v-model="scope.row.zip"
                      ></el-input>
                  </span>
                  <span v-else>
                      {{ scope.row.zip }}
                  </span>
              </template> 
             </el-table-column>

             <el-table-column  label="默认地址">
             <template #default="scope">
              <span v-if="scope.row.isAdd">
              <el-checkbox
                    v-model= scope.row.isDefault
                    :true-label = "1"
                    :false-label = "0"/>
              </span>
          <el-tag  v-if="scope.row.isDefault==1" type="success" size="mini" >默认</el-tag>

          </template>
          </el-table-column>

      <el-table-column label="操作" width="180px" >
        <template #default="scope">
          <span v-if="scope.row.isAdd">
            <el-button @click="saveAddress(scope.$index)">保存</el-button>
            </span>
          <el-button v-else @click="editAddress(scope.$index)">编辑</el-button>
          <span v-if="scope.row.isAdd">
            <el-button @click="cancelEdit(scope.$index)">取消</el-button>
            </span>
          <el-button v-else @click="deleteAddress(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { regionData,CodeToText } from 'element-china-area-data'
export default {
  name: 'receiveAddress',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tableData: [{isAdd:false}],
      options: regionData,
    };
  },
  //监听属性 类似于data概念
  computed: {
  },
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
    addAddress(){
      this.tableData.unshift({isAdd:true})
    },
    editAddress(index){
      this.$set(this.tableData[index],'isAdd','true')
    },
    cancelEdit(index){
      this.tableData[index].isAdd=false
      this.getAddr()
    },
    deleteAddress(index){
      this.$api.deleteAddress(this.tableData[index]).then(res => {
        if (String(res.code) === '1') {
          this.getAddr()
        }else{
          this.$message.error(res.msg)
        }
      }) 
    },
    saveAddress(index){
      let userName = localStorage.getItem('userInfo')
      userName = JSON.parse(userName)
      let id=userName.id
      this.tableData[index].userId=id
      this.tableData[index].province=CodeToText[this.tableData[index].province[0]]+CodeToText[this.tableData[index].province[1]]+CodeToText[this.tableData[index].province[2]]
      console.log(id)
      this.$api.saveAddress(this.tableData[index]).then(res => {
        if (String(res.code) === '1') {
          this.getAddr()
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    handleChange (value) {
      
      console.log(CodeToText[value[0]])
      
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