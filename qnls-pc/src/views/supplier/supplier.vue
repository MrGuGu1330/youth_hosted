<template>
  <div class="supplier">
    <el-container>
      <el-aside width="260px">
        <div class="avatar">
          <div class="headImg" @click="centerDialogVisible = true">
            <img :src="user.avatar?baseURL + user.avatar:require('@/assets/imgs/avatar.png')" alt="" />
            <div class="masking">修改头像</div>
          </div>
          <h2>{{ user.name }}</h2>
        </div>
        <el-menu router :default-active="$route.path" class="el-menu-vertical-demo">
          <el-menu-item index="/supplier/supplierinfo">
            <i class="el-icon-user-solid"></i>
            <span slot="title">旅店信息</span>
          </el-menu-item>
          <!-- <el-menu-item index="/supplier/order">
            <i class="el-icon-s-goods"></i>
            <span slot="title">旅店订单</span>
          </el-menu-item> -->

          <el-submenu index="/supplier/list">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>旅店管理</span>
            </template>

            <el-menu-item index="/supplier/supplierinfo/equip">旅店设施</el-menu-item>
            <el-menu-item index="/supplier/supplierinfo/list">房型列表</el-menu-item>
            <el-menu-item index="/supplier/supplierinfo/publish">新增房型</el-menu-item>
          </el-submenu>
        </el-menu>
        <el-dialog :modal="true" class="dialog_avatar" title="修改头像" :visible.sync="centerDialogVisible" width="560px"
          center>
          <div class="head-content">
            <el-upload class="avatar-uploader" name="avatar"
              action="http://120.26.36.21:3000/suppliers/updateSupplierAvatar" :show-file-list="false"
              :on-success="uploadSuccess" :data="headDate">
              <img v-if="headUrl" :src="headUrl" class="savatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="preview-box">
              <span>预览</span>
              <ul>
                <li>
                  <div class="ui">
                    <img :src="headUrl == 0 ? baseURL + this.user.avatar : headUrl" alt="" width="100px"
                      height="100px" />
                  </div>
                  <span>100 x 100</span>
                </li>
                <li>
                  <div class="ui">
                    <img :src="headUrl == 0 ? baseURL + this.user.avatar : headUrl" alt="" width="60px" height="60px" />
                  </div>
                  <span>60 x 60</span>
                </li>
              </ul>
            </div>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="reflash">确 定</el-button>
          </span>
        </el-dialog>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getUserInfo, updateHead } from '@/network/user'
import { getSupplyInfo } from '@/network/supplier'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      centerDialogVisible: false,
      imageUrl: '',
      headDate: {
        old_avatar: '',
        supplier_id: '',
      },
      headUrl: '',
      headCode: '',
    }
  },
  computed: {
    ...mapState(['user', 'baseURL']),
  },
  methods: {
    uploadSuccess (res, file) {
      this.headUrl = URL.createObjectURL(file.raw)
      this.headCode = res.code
      console.log(res)
      this.setUser({
        id: this.user.id,
        name: this.user.name,
        avatar: file.response.data.supplier_avatar
      })
    },
    ...mapMutations(['setUser']),

    reflash () {
      if (this.headCode == 200) {
        this.$message.success('头像修改成功！')
        this.$router.replace({
          path: 'test', //空白页的路由地址
          name: 'test',
        })
        // this.$router.go(0)
      } else {
        this.$message.success('头像修改失败！')
      }
    },
  },
  mounted () {
    this.headDate.old_avatar = this.user.avatar
    this.headDate.supplier_id = this.user.id
    console.log(this.user.id)
    console.log(this.$store.state.user)
    console.log(this.headDate)
  },
}
</script>

<style lang="scss" scoped>
div.dialog_avatar {
  line-height: 40px;
  width: 560px;
  margin: auto;
  .head-content {
    display: flex;
    justify-content: space-between;
    .avatar-uploader {
      width: 300px;
      height: 300px;
      // background-color: pink;
      font-size: 100px;
      line-height: 300px;
      text-align: center;
      color: var(--color-primary);
      border-radius: 10px;
      border: 1px dashed #ccc;
      .savatar {
        width: 300px;
        height: 300px;
        border-radius: 10px;
      }
    }
    .preview-box {
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
}

.supplier {
  > .el-container {
    width: var(--container-width);
    margin: 0 auto;
    padding: 10px 0;
    > .el-aside {
      text-align: center;
      line-height: 200px;
      text-align: left;
      > .avatar {
        padding: 60px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        > .headImg {
          position: relative;
          > img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
          }

          > .masking {
            position: absolute;
            bottom: 0;
            width: 120px;
            height: 120px;
            color: #fff;
            font-size: 14px;
            text-align: center;
            line-height: 120px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.5);
            cursor: pointer;
            opacity: 0;
            transition: 0.2s;
            z-index: 10;
          }
          &:hover {
            > .masking {
              opacity: 1;
            }
          }
        }

        > h2 {
          width: 200px;
          text-align: center;
          color: #333;
          margin-top: 10px;
          line-height: 30px;
        }
      }
    }

    > .el-main {
      padding: 60px 20px 0;
      color: #333;
    }
  }
}
</style>
