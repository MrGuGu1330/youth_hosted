<template>
  <div class="admin">
    <el-form ref="adminForm" :model="adminInfo" :rules="adminRules" label-width="100px" style="width:500px">

      <el-form-item label="头像" prop="admin_avatar">
        <el-avatar v-if="!updata" :size="100"
          :src="adminInfo.admin_avatar?baseURL + adminInfo.admin_avatar:require('@/assets/avatar.png')">
        </el-avatar>
        <el-upload v-if="updata" name="avatar" :action="baseURL +'/upload/uploadAvatar'" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img width="100px" v-if="avatar" :src="baseURL + avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="用户名" prop="admin_name">
        <span v-if="!updata">{{adminInfo.admin_name}}</span>
        <el-input v-if="updata" type="text" v-model="adminInfo.admin_name" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="admin_phone">
        <span v-if="!updata">{{adminInfo.admin_phone}}</span>
        <el-input v-if="updata" type="text" v-model="adminInfo.admin_phone" placeholder="请输入手机号"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="admin_email">
        <span v-if="!updata">{{adminInfo.admin_email}}</span>
        <el-input v-if="updata" type="text" v-model="adminInfo.admin_email" placeholder="请输入邮箱"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button v-if="!updata" size="middle" type="primary" @click="updata = true">修改</el-button>
        <el-button v-if="updata" size="middle" type="primary" @click="onSubmit">确定</el-button>
        <el-button v-if="updata" size="middle" type="primary" @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>

    <el-form ref="pwdForm" :model="pwdForm" :rules="pwdRules" label-width="100px" style="width:500px">
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="pwdForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input type="password" v-model="pwdForm.password2" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="middle" type="primary" @click="onConfirm">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Admin',
  computed: { ...mapState(['user', 'baseURL']) },
  data () {
    const validateName = (rule, value, callback) => {
      var reg = /^.{2,9}$/
      if (!value) callback(new Error('用户名不能为空'))
      else if (!reg.test(value))
        callback(new Error('用户名长度在2~9之间'))
      else callback()
    }
    const validatePhone = (rule, value, callback) => {
      var reg = /^1[3-9]\d{9}$/
      if (!value) callback(new Error('手机号不能为空'))
      else if (!reg.test(value)) callback(new Error('手机号格式错误'))
      else callback()
    }
    const validateEmail = (rule, value, callback) => {
      var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if (!value) callback(new Error('邮箱不能为空'))
      else if (!reg.test(value)) callback(new Error('邮箱格式错误'))
      else callback()
    }
    const validatePass = (rule, value, callback) => {
      var reg = /^\w{5,17}$/
      if (!value) callback(new Error('密码不能为空'))
      else if (!reg.test(value))
        callback(new Error('长度6~18之间, 包含字母、数字、下划线'))
      else callback()
    }
    const validatePass2 = (rule, value, callback) => {
      if (!value) callback(new Error('请再次输入密码'))
      else if (value != this.pwdForm.password)
        callback(new Error('两次密码输入不一致'))
      else callback()
    }

    return {
      updata: false,
      adminInfo: {},
      adminRules: {
        admin_name: { required: true, trigger: 'blur', validator: validateName },
        admin_phone: { required: true, trigger: 'blur', validator: validatePhone },
        admin_email: { required: true, trigger: 'blur', validator: validateEmail },
      },
      avatar: '',
      delImgs: [],

      pwdForm: {
        password: '',
        password2: ''
      },
      pwdRules: {
        password: { required: true, trigger: 'blur', validator: validatePass },
        password2: { required: true, trigger: 'blur', validator: validatePass2 },
      },
    };
  },
  methods: {
    ...mapMutations(['updateUserInfo']),

    // 获取管理员信息
    getInfo () {
      this.$http.adminApi.getAdminInfo({ admin_id: this.user.id }).then(res => {
        if (res.data.code == 200) {
          this.adminInfo = res.data.data
          this.avatar = res.data.data.admin_avatar
        }
      })
    },

    // 判断头像是否合格
    beforeAvatarUpload (file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG、JPEG、PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 上传头像返回的结果
    handleAvatarSuccess (res, file) {
      if (file.status == 'success') {
        this.avatar = file.response.data
        this.delImgs.push(file.response.data)
      }
    },

    // 修改信息
    onSubmit () {
      this.$refs.adminForm.validate(valid => {
        if (valid) {
          this.adminInfo.admin_avatar = this.avatar

          this.$http.adminApi.updateAdminInfo(this.adminInfo).then(res => {
            if (res.data.code == 200) {
              this.updateUserInfo({
                id: this.user.id,
                username: this.adminInfo.admin_name,
                avatar: this.avatar,
              })
              this.updata = false
              this.$message.success('修改成功')
              this.delImgs.pop()
            }
          })
        } else {
          return false
        }
      })
    },
    onCancel () {
      this.updata = false
      this.getInfo()
    },

    // 修改密码
    onConfirm () {
      this.$refs.pwdForm.validate(valid => {
        if (valid) {
          this.$http.adminApi.updateAdminPwd({
            admin_id: this.adminInfo.admin_id,
            admin_pwd: this.pwdForm.password
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success('修改成功')
              this.$refs.pwdForm.resetFields();
            }
          })
        } else {
          return false
        }
      })
    },

    // 删除多余图片
    deleteImgs () {
      this.$http.uploadApi.deleteImgs({ delImgs: this.delImgs.join(','), src: 'avatar' }).then(res => {
        if (res.data.code == 200) {
          console.log('删除多余图片成功')
        } else {
          console.log('删除多余图片失败')
        }
      })
    },
  },
  mounted () {
    this.getInfo()
  },
  beforeDestroy () {
    this.deleteImgs()
  }
}
</script>

<style lang="scss" scoped>
.admin {
  .el-collapse-item {
    padding: 0 20px;
  }
}
</style>

<style lang="scss">
.admin {
  .el-collapse-item__header {
    font-size: 18px;
    font-weight: bold;
  }
  .el-descriptions__body {
    font-size: 15px;
  }
  .el-descriptions-item__label {
    display: flex;
    align-items: center;
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
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
}
</style>