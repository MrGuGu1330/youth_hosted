<template>
  <div class="vip_banner">
    <h2>会员优惠</h2>
    <p>你手中的会员卡，全世界都能打折</p>
    <el-carousel :interval="5000" arrow="always" indicator-position="outside" style="width: 790px; margin: 30px auto">
      <el-carousel-item>
        <img src="@/assets/imgs/home/banner001.jpg" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/imgs/home/banner002.jpg" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/imgs/home/banner003.jpg" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'VipBanner'
}
</script>

<style lang="scss" scoped>
.vip_banner {
  h2 {
    margin: 100px 0 10px 0;
    font-size: 70px;
    font-family: "宋体";
    text-align: center;
  }
  p {
    font-size: 20px;
    font-weight: 600;
    font-family: "宋体";
    text-align: center;
  }
}
</style>