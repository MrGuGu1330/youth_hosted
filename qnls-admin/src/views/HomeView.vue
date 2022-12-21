<template>
  <div>
    <el-container style="height: 100vh">
      <el-aside class="aside" :style="{width:`${isCollapse?65:240}px`, transition: '0.4s'}">
        <el-menu unique-opened router :default-active="$route.path" background-color="#345" text-color="#bbb"
          :style="{height: '100vh'}" :collapse="isCollapse" class="el-menu-vertical-demo">

          <!-- logo + 名称 -->
          <el-menu-item>
            <img width="30px" src="@/assets/logo.svg" alt="">
            <template slot="title">
              <span style="font-size: 1.2em; color:#efefef; font-weight: bold;">&nbsp;&nbsp;青年旅社后台管理</span>
            </template>
          </el-menu-item>

          <!-- 首页 -->
          <el-menu-item index="/home/index">
            <i class="bi bi-house-door"></i>
            <template slot="title">
              首页
            </template>
          </el-menu-item>

          <!-- 旅店管理 -->
          <el-submenu index="/home/supplier">
            <template slot="title">
              <i class="bi bi-building-gear"></i>
              <span slot="title">旅店管理</span>
            </template>
            <el-menu-item index="/home/supplier-list">
              <i class="bi bi-buildings"></i>
              <span slot="title">旅店列表</span>
            </el-menu-item>
            <el-menu-item index="/home/supplier-detail">
              <i class="bi bi-building"></i>
              <span slot="title">旅店详情</span>
            </el-menu-item>
          </el-submenu>

          <!-- 房型管理 -->
          <el-submenu index="/home/house">
            <template slot="title">
              <i class="bi bi-house-gear"></i>
              <span slot="title">房型管理</span>
            </template>
            <el-menu-item index="/home/house-list">
              <i class="bi bi-houses"></i>
              <span slot="title">房型列表</span>
            </el-menu-item>
            <el-menu-item index="/home/house-detail">
              <i class="bi bi-house"></i>
              <span slot="title">房型详情</span>
            </el-menu-item>
          </el-submenu>

          <!-- 用户管理 -->
          <el-submenu index="/home/user">
            <template slot="title">
              <i class="bi bi-person-gear"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item index="/home/user-list">
              <i class="bi bi-people"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 订单管理 -->
          <el-submenu index="/home/order">
            <template slot="title">
              <i class="bi bi-database-gear"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item index="/home/order-list">
              <i class="bi bi-database"></i>
              <span slot="title">订单列表</span>
            </el-menu-item>
            <el-menu-item index="/home/order-detail">
              <i class="bi bi-database-check"></i>
              <span slot="title">订单详情</span>
            </el-menu-item>
          </el-submenu>

          <!-- 评论管理 -->
          <el-submenu index="/home/comment">
            <template slot="title">
              <i class="bi bi-chat-dots"></i>
              <span slot="title">评论管理</span>
            </template>
            <el-menu-item index="/home/comment-list">
              <i class="bi bi-chat-text"></i>
              <span slot="title">评论列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 活动管理 -->
          <el-submenu index="/home/activity">
            <template slot="title">
              <i class="bi bi-gift"></i>
              <span slot="title">活动管理</span>
            </template>
            <el-menu-item index="/home/activity-list">
              <i class="bi bi-box2-heart"></i>
              <span slot="title">活动列表</span>
            </el-menu-item>
            <el-menu-item index="/home/activity-edit">
              <i class="bi bi-pencil-square"></i>
              <span slot="title">编辑活动</span>
            </el-menu-item>
          </el-submenu>

          <!-- 关于我们 -->
          <el-submenu index="/home/about">
            <template slot="title">
              <i class="bi bi-credit-card"></i>
              <span slot="title">关于我们</span>
            </template>
            <el-menu-item index="/home/about-list">
              <i class="bi bi-credit-card-2-front"></i>
              <span slot="title">关于我们详情</span>
            </el-menu-item>
            <el-menu-item index="/home/about-edit">
              <i class="bi bi-pencil-square"></i>
              <span slot="title">修改关于我们</span>
            </el-menu-item>
          </el-submenu>

          <!-- 管理员 -->
          <el-submenu index="/home/admin">
            <template slot="title">
              <i class="bi bi-person-rolodex"></i>
              <span slot="title">管理员</span>
            </template>
            <el-menu-item index="/home/admin">
              <i class="bi bi-person-vcard"></i>
              <span slot="title">管理员详情</span>
            </el-menu-item>
          </el-submenu>

          <!-- 退出登录 -->
          <el-menu-item @click="loginOut">
            <i class="bi bi-box-arrow-right"></i>
            <template slot="title">
              退出登录
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header class="header">
          <i v-show="!isCollapse" class="el-icon-s-fold" @click="isCollapse=true"></i>
          <i v-show="isCollapse" class="el-icon-s-unfold" @click="isCollapse=false"></i>

          <!-- 面包屑导航 -->
          <el-breadcrumb separator="/" class="breadcrumb">

            <el-breadcrumb-item v-for="item in $route.meta.nav" :key="item">
              {{item}}
            </el-breadcrumb-item>

          </el-breadcrumb>

          <span v-if="user">
            欢迎：{{user.username}}</span>
          <span v-else>未登录</span>
        </el-header>

        <el-main>
          <!-- 二级路由 动态设置内容 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  computed: { ...mapState(['user', 'cart', 'loc']) },
  methods: {
    ...mapMutations(['saveToken', 'updateUserInfo']),

    loginOut () {

      this.$confirm('是否确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$message.success('退出成功');
        this.saveToken('')
        this.updateUserInfo('')
        this.$router.push('/admin/login')
      }).catch(() => {
        this.$message.info('已取消');
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;

  i {
    font-size: 1.3em;
  }

  .breadcrumb {
    margin-left: 20px;
    flex: 1;
  }
}
.aside::-webkit-scrollbar {
  display: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}

.bi {
  font-size: 1.3em;
  margin-right: 10px;
}
</style>
