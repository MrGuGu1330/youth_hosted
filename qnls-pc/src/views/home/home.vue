<template>
  <div class="home">

    <!-- 轮播图 -->
    <Banner />

    <!-- 办理会员图 -->
    <div class="vip_img">
      <img src="@/assets/imgs/home/VIP.jpg" alt="" />
    </div>

    <!-- 中心板块 -->
    <Centen />

    <!-- 最新活动板块 -->
    <NewActivity />

    <!-- 会员优惠 -->
    <VipBanner />

    <!-- 关于我们板块 -->
    <AboutBanner />
  </div>
</template>

<script>
import Banner from './components/banner.vue'
import Centen from './components/centen.vue'
import NewActivity from './components/newActivity.vue'
import VipBanner from './components/vipBanner.vue'
import AboutBanner from './components/aboutBanner.vue'

export default {
  components: { Banner, Centen, NewActivity, VipBanner, AboutBanner }
};
</script>

<style  lang="scss" scoped>
.home {
  .vip_img {
    > img {
      margin: 30px auto;
      cursor: pointer;
    }
  }
}

// /* 上传图片样式 */
// .avatar-uploader-icon {
//   border: 1px dashed rgb(160, 215, 231);
// }
// .el-button.is-round {
//   background-color: rgb(127, 201, 127);
//   width: 104px;
//   margin: 2px 0;
// }
</style>