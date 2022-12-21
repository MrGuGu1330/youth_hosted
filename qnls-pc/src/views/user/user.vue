<template>
  <div class="container">
    <div class="aside">
      <div class="head_name">
        <div class="headImg" @click="centerDialogVisible = true">
          <img :src="baseURL + personalInfo.user_avatar" alt="">
          <div class="masking">修改头像</div>
        </div>
        <h2>{{personalInfo.user_name}}</h2>
      </div>
      <el-dialog title="修改头像" :visible.sync="centerDialogVisible" width="560px" center>
        <div class="head-content">
          <el-upload class="avatar-uploader" :action="baseURL +'/users/updateAvatar'" name="avatar"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
            :data="headDate">
            <img v-if="headUrl" :src="headUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="preview-box">
            <span>预览</span>
            <ul>
              <li>
                <div class="ui"><img :src="headUrl == 0?baseURL + personalInfo.user_avatar:headUrl" alt=""
                    width="100px"></div>
                <span>100 x 100</span>
              </li>
              <li>
                <div class="ui"><img :src="headUrl == 0?baseURL + personalInfo.user_avatar:headUrl" alt="" width="60px">
                </div>
                <span>60 x 60</span>
              </li>
            </ul>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="refresh">确 定</el-button>
        </span>
      </el-dialog>
      <el-menu router :default-active="$route.path?$route.path:1" active-text-color="#87c524">
        <el-menu-item index="/user/userinfo"><i class="bi bi-person-fill"></i> 个人信息</el-menu-item>
        <el-menu-item index="/user/orders"><i class="bi bi-layout-text-sidebar-reverse"></i> 我的订单</el-menu-item>
        <el-menu-item index="/user/tracks"><i class="bi bi-hypnotize"></i> 我的足迹</el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view v-bind:personalInfo="personalInfo" v-bind:uid="this.user.id" />
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from "vuex";
import { getUserInfo } from "@/network/user";

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
      baseURL: (state) => state.baseURL,
    }),
  },
  data () {
    return {
      headDate: {
        user_id: '',
        old_avatar: ''
      },
      headCode: '',
      headUrl: '',
      centerDialogVisible: false,
      personalInfo: {},
      orders: [],
      // baseURL:'http://127.0.0.1:3000',
    }
  },

  methods: {
    handleAvatarSuccess (res, file) {
      this.headUrl = URL.createObjectURL(file.raw);
      this.headCode = res.code  // 保存状态码
      this.setUser({
        id: this.user.id,
        name: this.user.name,
        avatar: file.response.data.user_avatar
      })
    },
    ...mapMutations(["setUser"]),
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    refresh () {
      if (this.headCode == 200) {
        this.$message.success("头像修改成功！")
        this.$router.replace({
          path: 'refreshUser', //空白页的路由地址
          name: 'refreshUser'
        })
      } else {
        this.$message.success("头像修改失败！")

      }

    }
  },
  mounted () {
    getUserInfo({ user_id: this.user.id }).then(res => {
      // console.log(res)
      this.personalInfo = res.data.data
    })
    this.headDate.user_id = this.user.id
    this.headDate.old_avatar = this.user.avatar
    // console.log(this.headDate)
  }
}
</script>

<style lang="scss" scoped>
.head-content {
  width: 100%;
  font-size: 1em;
  line-height: 1.4;
  padding: 1.2em;
  background: #ffffff;
  text-align: center;
  display: flex;
  justify-content: space-between;

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409eff;
  }
  .el-upload:hover {
    border-color: #409eff;
  }

  > .preview-box {
    width: 160px;
    text-align: center;

    li {
      padding-bottom: 14px;

      > .ui {
        padding-bottom: 8px;

        > img {
          margin: 0 auto;
          border-radius: 50%;
        }
      }
    }
  }
}

.container {
  width: var(--container-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;

  > .aside {
    width: 260px;
    //border: 2px solid #9fd150;
    border-radius: 12px;

    > .head_name {
      width: 100%;
      height: 180px;
      margin: 30px auto 60px;

      > .headImg:hover {
        > .masking {
          display: block;
        }
      }

      > .headImg {
        height: 120px;
        width: 120px;
        margin: 0 auto 10px;
        overflow: hidden;
        border-radius: 50%;

        > .masking {
          position: absolute;
          top: 90px;
          width: 120px;
          height: 120px;
          color: #fff;
          font-size: 14px;
          text-align: center;
          line-height: 120px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
          cursor: pointer;
          display: none;
        }

        > img {
          height: 100%;
        }
      }

      > h2 {
        text-align: center;
        font-weight: 800;
      }
    }
  }

  > .content {
    width: calc(100% - 280px);
    height: 660px;
    overflow: hidden;
  }
}

.avatar-uploader-icon {
  font-size: 40px;
  color: #8c939d;
  width: 300px;
  height: 300px;
  line-height: 240px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 300px;
  display: block;
}
</style>