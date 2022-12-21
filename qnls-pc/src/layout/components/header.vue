<template>
  <el-row :gutter="20" :class="['header', router == 0 ? 'header_home' : '']">
    <!-- 定位 -->
    <el-col :span="4" class="addr">
      <i class="el-icon-location"></i>
      {{ position }}
    </el-col>
    <!-- 导航 -->
    <el-col :span="16" style="height: 100%">
      <div class="menu">
        <div :class="['menu_item', router == item.id ? 'active' : '']" @click="changeNav(item.id, item.path)"
          v-for="item in menuList.slice(0, 5)" :key="item.id">
          {{ item.title }}
        </div>
      </div>
    </el-col>
    <!-- 登录注册或用户 -->
    <el-col :span="4" class="right">
      <div v-if="!type" class="login">
        <span @click="$router.push('/login')">登录</span>
      </div>
      <div v-if="type" class="user">
        <el-avatar class="user_avatar" size="small" :src="
            user.avatar
              ? baseURL + user.avatar
              : require('@/assets/imgs/avatar.png')
          "></el-avatar>
        <el-dropdown class="drop_down">
          <span class="el-dropdown-link">
            <span class="user_name">{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div @click="turnToUser">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </div>
            <div @click="loginOut">
              <el-dropdown-item>退出登录</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { menuList } from "../../utils/menuList";
import { mapState, mapMutations } from "vuex";
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
  name: "Header",
  computed: {
    ...mapState({
      router: (state) => state.router,
      type: (state) => state.type,
      user: (state) => state.user,
      baseURL: (state) => state.baseURL,
      position: (state) => state.position,
    }),
  },
  data () {
    return {
      menuList,
    };
  },
  mounted () {
    this.getCity();
  },
  methods: {
    ...mapMutations(["setRouter", "setType", "setUser", "setPosition", "setCenter"]),

    // 获取定位信息
    getCity () {
      AMapLoader.load({
        "key": "8c10dcbccd5d0c6b8fe424c288ebf0cc", // 申请好的Web端开发者Key，首次调用 load 时必填
        "version": "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        "plugins": ['AMap.CitySearch'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        AMap.plugin('AMap.CitySearch', () => {
          var citySearch = new AMap.CitySearch()
          citySearch.getLocalCity((status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              // 查询成功，result即为当前所在城市信息
              this.setPosition(result.city)

              let lng1 = result.rectangle.split(';')[0].split(',')[0]
              let lat1 = result.rectangle.split(';')[0].split(',')[1]

              let lng2 = result.rectangle.split(';')[1].split(',')[0]
              let lat2 = result.rectangle.split(';')[1].split(',')[1]

              let lng = (lng1 * 1 + lng2 * 1) / 2
              let lat = (lat1 * 1 + lat2 * 1) / 2

              this.setCenter([lng, lat])
            }
          })
        })
      }).catch(e => {
        console.log(e);
      })
    },

    // 切换导航
    changeNav (id, path) {
      this.setRouter(id)
      this.$router.push(path);
    },

    // 跳转到个人中心
    turnToUser () {
      if (this.type == 1) {
        this.$router.push("/user");
        this.setRouter(5)
      }
      if (this.type == 2) {
        this.$router.push("/supplier");
        this.setRouter(6)
      }
    },

    // 退出登录
    loginOut () {
      this.setRouter(0)
      this.setType(0);
      this.setUser({});
      this.$router.push("/");
      this.$message.success("退出成功");
      // localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1200px;
  height: var(--header-height);
  margin: 0 !important;
  background: #ffffff;
  box-shadow: -1px -2px 6px black;
  color: #333;
  z-index: 1000;
  user-select: none;
  &.header_home {
    background: rgba($color: #000000, $alpha: 0.3);
    color: #fff;
    .right {
      .user {
        .drop_down {
          color: #fff;
        }
      }
    }
  }
  .el-col {
    padding: 0 !important;
  }
  .addr,
  .right {
    display: flex;
    height: 100%;
    padding: 0;
    align-items: center;
    justify-content: center;
  }
  .addr {
    i {
      margin-right: 5px;
    }
  }
  .menu {
    display: flex;
    height: 100%;
    margin: 0 auto;
    justify-content: flex-end;
    align-items: center;
    .menu_item {
      position: relative;
      margin-right: 5px;
      padding: 5px 10px;
      cursor: pointer;
      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 100%;
        width: 0px;
        height: 4px;
        border-radius: 4px;
        background: var(--color-primary);
        transition: 0.5s;
      }
      &:hover::before,
      &.active::before {
        width: 100%;
        left: 0;
      }
      &:hover ~ ::before {
        left: 0;
      }
    }
  }
  .right {
    .login {
      span {
        transition: 0.3s;
        transition: 0.3s;
        cursor: pointer;
        &:hover {
          color: var(--color-primary);
        }
      }
    }
    .user {
      display: flex;
      align-items: center;
      .user_avatar {
        margin-right: 10px;
      }
      .drop_down {
        color: #333;
      }
      .el-dropdown-link {
        display: flex;
        align-items: center;
      }
      .user_name {
        max-width: 100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>