<!--  -->
<template>
  <div class="register">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="registerFrom"
      label-width="60px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="login">
        <el-input
          type="login"
          v-model="registerFrom.login"
          autocomplete="off"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="registerFrom.pass"
          autocomplete="off"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          type="phone"
          v-model="registerFrom.phone"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code"
        ><el-col :span="16">
          <el-input
            type="code"
            v-model="registerFrom.code"
            autocomplete="off"
          ></el-input>
        </el-col>
        <el-button icon="el-icon-chat-dot-square" @click="getCode"
          >发送验证码</el-button
        >
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('registerFrom')"
          >登录</el-button
        >
        <el-button @click="resetForm('registerFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import { sendMsgApi } from '@/assets/api/login.js'
export default {

  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    var checkLogin = (rule, value, callback) => {

      const reg = /^[_a-zA-Z0-9]+$/;
      if (value == '' || value == undefined || value == null) {
        callback();
      } else {
        if (!reg.test(value)) {
          callback(new Error('仅由英文字母，数字以及下划线组成'));
        } else {
          callback();
        }
      }
    };
    var validatePhone = (rule, value, callback) => {
      const reg = /^[1][3-9][0-9]{9}$/;
      if (value == '' || value == undefined || value == null) {
        callback();
      } else {
        if ((!reg.test(value)) && value != '') {
          callback(new Error('请输入正确的电话号码'));
        } else {
          callback();
        }
      }
    }

    //这里存放数据
    return {
      registerFrom: {
        login: '',
        pass: '',
        phone: '',
        code: ''
      },
      activeName: 'login',
      rules: {
        login: [
          { validator: checkLogin, trigger: 'blur' }
        ],
        pass: [
          { validator: checkLogin, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCode() {
      this.registerFrom.code = ''
      const regex = /^(13[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(19[0-9]{9})$/;
      if (regex.test(this.registerFrom.phone)) {
        alert("23")
        //this.form.code = (Math.random()*1000000).toFixed(0)

        
      } else {

      }
    },
  },

}
  </script>
  <style scoped>
</style>