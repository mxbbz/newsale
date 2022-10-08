/*
 * @Author: mxbbz 
 * @Date: 2022-09-30 23:09:25 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-10-04 21:20:03
 */

<template>
  <div class="userInfo">
    <div>&nbsp;</div>
    <el-divider />
    <div class="info">
      <el-page-header @back="goBack" content="个人信息" />
      <div class="infoList">
        <el-tabs :tab-position="tabPosition" style="height: 430px">
          <el-tab-pane label="个人信息">
            <!-- 个人信息 -->
            <el-row type="flex" justify="center">
              <el-col :span="20">
                <el-avatar
                  shape="square"
                  :size="120"
                  :src="info.avatar"
                  style="margin-left: 70px"
                />
                <el-form
                  ref="form"
                  :model="info"
                  label-width="80px"
                  class="from"
                >
                  <el-form-item label="用户名:">
                    <el-input v-model="info.name" />
                  </el-form-item>
                  <el-form-item label="性别:">
                    <el-radio v-model="info.sex" label="1">男</el-radio>
                    <el-radio v-model="info.sex" label="2">女</el-radio>
                  </el-form-item>
                  <el-form-item label="手机号:">
                    <el-input v-model="info.phone" />
                  </el-form-item>
                  <el-form-item label="个性签名:">
                    <el-input v-model="info.signature" />
                  </el-form-item>
                  <el-button
                    icon="el-icon-check"
                    style="margin-left: 200px"
                    @click="submitForm"
                    >保存</el-button
                  >
                </el-form>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="收货地址"><Address></Address></el-tab-pane>
          <el-tab-pane label="账号管理">
            <el-button type="primary"  @click="switchAccounts">切换账号</el-button>
            <el-button type="danger"  @click="signOut">退出登录</el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Address from '../components/address.vue';

//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {Address},
  data() {
    //这里存放数据
    return {
      // tabs方向
      tabPosition: 'left',
      info: {
        id: '',
        name: '',
        sex: '',
        avatar: '',
        phone: '',
        signature: ''
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
    },
    async submitForm() {
      let res = await this.$api.saveUserInfo(this.info)
      if (String(res.code) === '1') {
        this.$message.success("保存成功")
      }else{
        this.$message.error(res.msg)
      }
    },
    switchAccounts(){
    localStorage.setItem("userInfo", "");
    this.$router.push({ path: "/login"})
    location.reload() 
  },
  signOut(){
    localStorage.setItem("userInfo", "");
    this.$router.push({ path: "/"})
    location.reload() 
  },
  },
  
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let userName = localStorage.getItem('userInfo')
    userName = JSON.parse(userName)
    if (userName) {
      this.loginStaus = true
      //userName.username==user.username  对应登录界面设置的key里面的value对应的数组值
      this.info.name = userName.name
      this.info.sex = userName.sex
      this.info.avatar = userName.avatar
      this.info.phone = userName.phone
      this.info.signature = userName.signature
      this.info.id=userName.id
    }
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
.userInfo {
  height: 700px;
  
}
.info {
  width: 60%;
  height: auto;
  margin: 0 auto;
  text-align: center;
  background: #F5F5F5;
  padding: 20px 40px;

}
.infoList {
  margin-top: 40px;
}
</style>