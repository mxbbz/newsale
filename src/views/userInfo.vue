/*
 * @Author: mxbbz 
 * @Date: 2022-09-30 23:09:25 
 * @Last Modified by: mxbbz
 * @Last Modified time: 2022-10-10 23:33:15
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
                ></el-avatar>
                <el-button type="text" @click="centerDialogVisible = true"
                  ><i class="el-icon-camera"></i>修改头像</el-button
                >

                <el-dialog
                  title="上传头像"
                  :visible.sync="centerDialogVisible"
                  width="30%"
                  center
                >
                  <el-upload
                    class="avatar-uploader"
                    action="http://localhost:8080/api/oss/policy/uploadAvator?module=Heads"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="info.avatar" :src="info.avatar" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span slot="footer" class="dialog-footer">
                    <el-button
                      type="primary"
                      @click="centerDialogVisible = false"
                      >确 定</el-button
                    >
                    <el-button @click="centerDialogVisible = false"
                      >取 消</el-button
                    >
                  </span>
                </el-dialog>

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
            <el-button type="primary" @click="switchAccounts"
              >切换账号</el-button
            >
            <el-button type="danger" @click="signOut">退出登录</el-button>
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
  components: { Address },
  data() {
    //这里存放数据
    return {
      // tabs方向
      imageUrl: '',
      centerDialogVisible: false,
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
      } else {
        this.$message.error(res.msg)
      }
    },
    switchAccounts() {
      localStorage.setItem("userInfo", "");
      this.$router.push({ path: "/login" })
      location.reload()
    },
    signOut() {
      localStorage.setItem("userInfo", "");
      this.$router.push({ path: "/" })
      location.reload()
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.info.avatar = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    getUserInfo(id) {
      this.$api.getUserInfo(id).then((res => {
        if (String(res.code) === '1') {
          this.info = res.data
        }
      }))
    }

  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let userName = localStorage.getItem('userInfo')
    userName = JSON.parse(userName)

    this.getUserInfo(userName.id)

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
  background: #f5f5f5;
  padding: 20px 40px;
}
.infoList {
  margin-top: 40px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>