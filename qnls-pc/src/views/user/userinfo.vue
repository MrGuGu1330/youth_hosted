<template>
  <el-tabs tab-position="top" style="height: 200px;">
    <!--  修改个人信息  -->
    <el-tab-pane label="我的信息">
      <el-form label-position="left" label-width="72px" :model="userdata">
        <el-form-item label="用户名称:">
          <span v-if="n">{{personalInfo.user_name}}</span>
          <el-input v-else-if="!n" v-model="userdata.user_name"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <span v-if="n">{{personalInfo.user_phone}}</span>
          <el-input v-else-if="!n" v-model="userdata.user_phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址:">
          <span v-if="n">{{personalInfo.user_email}}</span>
          <el-input v-else-if="!n" v-model="userdata.user_email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="n" type="primary" @click="showAmend">修改</el-button>
          <el-button v-if="!n" @click="resetInfo">取消</el-button>
          <el-button v-if="!n" type="primary" @click="centerDialogVisible = true">保存</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="温馨提示" :visible.sync="centerDialogVisible" width="30%" center>
        <span>您将修改您的个人信息，是否继续？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分割线 -->
      <el-divider content-position="left">修改密码</el-divider>
      <!-- 修改密码 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position="left" label-width="72px"
        class="demo-ruleForm">
        <el-form-item label="新密码:" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">清空</el-button>
          <el-button type="primary" @click="update_pw">提交</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
import { mapMutations, mapState } from "vuex";
import { getUserInfo, updateUserInfo, updatePassword } from "@/network/user";


export default {
  props: ['personalInfo'],
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      centerDialogVisible: false,
      userdata: {},
      updateBefore: this.personalInfo,
      n: 1,
      ruleForm: {
        pass: '',
        checkPass: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    ...mapMutations(["setUser"]),
    showAmend () {
      this.n = 0
    },
    resetInfo () {
      this.userdata.user_name = this.personalInfo.user_name
      this.userdata.user_phone = this.personalInfo.user_phone
      this.userdata.user_email = this.personalInfo.user_email
      this.n = 1
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.resetForm('ruleForm')
        } else {
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },

    updateUser () {
      console.log(this.userdata);
      updateUserInfo({ user_id: this.userdata.user_id, user_name: this.userdata.user_name, user_phone: this.userdata.user_phone, user_email: this.userdata.user_email }).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.setUser({
            id: this.user.id,
            name: this.userdata.user_name,
            avatar: this.user.avatar,
          })
          this.$message.success("个人信息修改成功！")
          this.centerDialogVisible = false
          this.$router.replace({
            path: 'refreshUser', //空白页的路由地址
            name: 'refreshUser'
          })
        } else {
          this.$message.error("个人信息修改失败！")
          this.centerDialogVisible = false
        }
      })
    },
    update_pw () {
      updatePassword({ user_id: this.userdata.user_id, user_pwd: this.ruleForm.checkPass }).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          this.$message.success("密码修改成功！")
          this.submitForm('ruleForm')
        } else {
          this.$message.error("密码修改失败！")
        }
      })

    }
  },

  mounted () {
    getUserInfo({ user_id: this.user.id }).then(res => {
      console.log(res)
      this.userdata = res.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.el-input {
  width: 400px;
}
</style>