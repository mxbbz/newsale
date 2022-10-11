/*
 * @Author: mxbbz 
 * @Date: 2022-10-11 00:18:07 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-10-11 00:18:27
 * 登录页
 */

<template>
<div class='login'>
  <div class="loginmenu">
    <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="登录" name="login">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="name">
          <el-input
            type="login"
            v-model="loginForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
         
        <el-form-item>
          <el-button type="primary" @click="submitForm"
            >登录</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>

      </el-form>
    </el-tab-pane>
    <el-tab-pane label="注册" name="register"><register></register></el-tab-pane>
    
    <el-tab-pane label="找回密码" name="back"><back></back></el-tab-pane>
  </el-tabs>
  </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import register from '@/components/register.vue'
import back from '@/components/back.vue'
import AppVue from '../App.vue';
export default {
  
//import引入的组件需要注入到对象中才能使用
components: {register,back},
data() {
  var checkLogin = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'));
      }
    };
    var checkPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'));
      }
    };
//这里存放数据
return {
  loginForm:{
    name: '',
    password: ''
  },
  activeName:'login',
  rules: {
        login: [
          { validator: checkLogin, trigger: 'blur' }
        ],
        pass: [
          { validator: checkPass, trigger: 'blur' }
        ],
      }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  //登录
  async submitForm() {
      let res = await this.$api.loginApi({ name: this.loginForm.name,password: this.loginForm.password })
      if (String(res.code) === '1') {
        localStorage.setItem('userInfo', JSON.stringify(res.map.user))
        this.$router.push(AppVue)
        location.reload() 
      } else {
        this.$message.error(res.msg)
        this.loading = false
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
.login {
  background: url("../assets/imges/login.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.loginmenu{
  width: 30%;
  height: auto;
  margin: 0 auto;
  margin-top: 10%;
  text-align: center;
  background: #cdcccc60;
  padding: 20px 40px;
}
</style>