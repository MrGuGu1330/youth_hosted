<template>
  <LoginBase>
    <template slot="login">
      <el-form class="login_place" :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="loginForm.type">
            <el-radio :label="1">用户</el-radio>
            <el-radio :label="2">旅店</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button class="btn btn_top" @click="loginBtn"> 登录 </el-button>
        </el-form-item>
      </el-form>
    </template>
    <template slot="register">
      <el-form class="register_place" :model="registerForm" :rules="registerRules" ref="registerForm">
        <el-form-item prop="user_name">
          <el-input v-model="registerForm.user_name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="user_phone">
          <el-input v-model="registerForm.user_phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="user_pwd">
          <el-input type="password" v-model="registerForm.user_pwd" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div class="code">
            <el-input v-model="registerForm.code" placeholder="请输入验证码"></el-input>
            <Identify :identifyCode="identifyCode"></Identify>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="btn btn_top" @click="registerBtn"> 注册 </el-button>
        </el-form-item>
      </el-form>
    </template>
  </LoginBase>
</template>

<script>
import Identify from '@/components/identify.vue'
import LoginBase from './components/loginBase.vue'
import { login, register } from '@/network/login'
import { mapMutations } from 'vuex'

export default {
  components: { LoginBase, Identify },
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
    const validatePass = (rule, value, callback) => {
      var reg = /^\w{5,17}$/
      if (!value) callback(new Error('密码不能为空'))
      else if (!reg.test(value))
        callback(new Error('长度6~18之间, 包含字母、数字、下划线'))
      else callback()
    }
    const validateCode = (rule, value, callback) => {
      value = value.toUpperCase()
      if (!value) callback(new Error('验证码不能为空'))
      else if (value !== this.identifyCode)
        callback(new Error('验证码错误'))
      else callback()
    }

    return {
      loginForm: {
        phone: '',
        password: '',
        type: 1,
      },
      loginRules: {
        phone: { required: true, trigger: 'blur', message: '请输入手机号' },
        password: { required: true, trigger: 'blur', message: '请输入密码' },
      },

      registerForm: {
        user_name: '',
        user_phone: '',
        user_pwd: '',
        code: '',
      },
      registerRules: {
        user_name: { required: true, trigger: 'blur', validator: validateName },
        user_phone: { required: true, trigger: 'blur', validator: validatePhone },
        user_pwd: { required: true, trigger: 'blur', validator: validatePass },
        code: { required: true, trigger: 'blur', validator: validateCode },
      },

      identifyCode: '',
      // 验证码规则
      identifyCodes: '123456789ABCDEFGHGKMNPQRSTUVWXYZ',
    }
  },
  methods: {
    ...mapMutations(['setType', 'setUser']),

    // 登录
    loginBtn () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          login(this.loginForm).then(res => {
            if (res.data.code == 400) {
              this.$message.error('手机号或密码错误')
            } else if (res.data.code == 405) {
              this.$message.error('暂未同意加盟')
            } else {
              this.setType(this.loginForm.type)
              this.setUser(res.data.data)
              this.$message.success('登录成功')
              this.$router.push('/')
            }
          })
        } else {
          return false
        }
      })
    },

    // 注册
    registerBtn () {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          register(this.registerForm).then(res => {
            if (res.data.code == 400) {
              this.$message.error('该手机号已存在')
            } else {
              this.setType(1)
              this.setUser(res.data.data)
              this.$message.success('注册成功')
              this.$router.push('/')
            }
          })
        } else {
          return false
        }
      })
    },

    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    // 切换验证码
    refreshCode () {
      this.identifyCode = ''
      for (let i = 0; i < 4; i++) {
        this.identifyCode += this.identifyCodes[
          Math.floor(Math.random() * (this.identifyCodes.length - 0) + 0)
        ]
      }
    },
  },
  mounted () {
    this.refreshCode()
  }
}
</script>

<style lang="scss" scoped>
.code {
  display: flex;
}
.code_btn {
  width: 100px;
}
.btn {
  padding: 0.9rem 4rem;
  background-color: rgba(0, 0, 0, 0.69);
  border-radius: 20px;
  color: #e9e9e9;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.69);
  &:active {
    transform: scale(0.95);
  }
  &.btn_top {
    margin-top: 30px;
  }
}
.el-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.login_place {
  .el-form-item:nth-child(1),
  .el-form-item:nth-child(2) {
    width: 100%;
  }
  .el-form-item:nth-child(3),
  .el-form-item:nth-child(4) {
    margin: 0;
  }
}
.register_place {
  .el-form-item:not(:last-child) {
    width: 100%;
  }
  .el-form-item:nth-last-child(2) {
    margin: 0;
  }
}
</style>
