<template>
  <div>
    <LoginBg />
    <el-form class="form" label-position="left" :model="form" :rules="rules" ref="form">
      <p class="title">Welcome</p>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入管理员账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入管理员密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="onSubmit()">登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import LoginBg from '@/components/LoginBg.vue'
export default {
  components: { LoginBg },
  data () {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请填写管理员账号", trigger: "blur" }],
        password: [{ required: true, message: "请填写管理员密码", trigger: "blur" }],
      },
    };
  },

  methods: {
    onSubmit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$http.adminApi.login(this.form).then(res => {
            if (res.data.code == 200) {
              this.$message.success('登录成功')
              this.$store.commit('updateUserInfo', res.data.data)
              this.$store.commit('saveToken', res.data.token)
              this.$router.push('/home/index')
            } else {
              this.$message({
                type: 'error',
                message: `注意：${res.data.msg}`
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '请正确填写表单'
          })
        }
      })
    },
  },
};
</script>

<style scoped>
.form {
  display: block;
  width: 20%;
  position: absolute;
  top: 30%;
  left: 40%;
}
.form .title {
  text-align: center;
  font-size: 1.5em;
  color: white;
  margin-bottom: 20px;
}
</style>
