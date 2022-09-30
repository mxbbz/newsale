/*
 * @Author: mxbbz 
 * @Date: 2022-09-30 23:09:25 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-09-30 23:38:08
 */

<template>
<div class='userInfo'>
  <div>&nbsp;</div>
  <el-divider/>
  <div class="info">
  <el-page-header @back="goBack" content="个人信息"/>
  <div class="infoList">
    <el-tabs :tab-position="tabPosition" style="height: 200px;">
    <el-tab-pane label="个人信息">
      <!-- 个人信息 -->
      <el-row type="flex"  justify="center">
      <el-col :span="12">
        <div class="block"><el-avatar shape="square" :size="120" :src="avatar"></el-avatar></div>
        <el-input v-model="info.name"/>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="收货地址">收货地址</el-tab-pane>
    </el-tabs>
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
  // tabs方向
  tabPosition: 'left',
  info: {
    name: '',
    sex: '',
    avatar: '',
    phone: ''
  }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  goBack() {
        
this.$router.push('/')
      }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

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
.userInfo{
  height: 500px;
}
.info{
  width: 30%;
  height: auto;
  margin: 0 auto;
  text-align: center;
  background: #cdcccc60;
  padding: 20px 40px;
}
.infoList{
  margin-top: 40px;
}
</style>