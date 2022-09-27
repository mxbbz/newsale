<template>
  <div class="login">
    <div class="loginmenu">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="login">
          <el-input
            type="login"
            v-model="ruleForm.login"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
         
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

         <!-- 注册与找回密码 -->
         <ul class="help">
          <li>
            <router-link to="/register">注册</router-link>
          </li>
          <li>
            <router-link to="/back">找回密码</router-link>
          </li>
        </ul>
      </el-form>
    </div>
  </div>
</template> 
<script>
export default {
  name: 'Login',
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
    return {
      ruleForm: {
        login: '',
        pass: '',
      },
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
    }
  }
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
.loginmenu {
  width: 30%;
  height: auto;
  margin: 0 auto;
  margin-top: 10%;
  text-align: center;
  background: #cdcccc60;
  padding: 20px 40px;
}
.help{
  float: right;
}
.help li{
  float: left;
  padding: 0 16px;
}
</style>