<template>
  <div class="banner">
    <el-carousel indicator-position="" height="600px">
      <el-carousel-item>
        <img src="@/assets/imgs/home/banner2.jpg" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/imgs/home/banner1.jpg" alt="" />
      </el-carousel-item>
    </el-carousel>

    <div class="hotel">
      <span>青</span>
      <span>年</span>
      <span>旅</span>
      <span>社</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  .hotel {
    position: absolute;
    right: 0;
    bottom: 20px;
    z-index: 10000;
    > span {
      margin: 0 10px;
      font-size: 80px;
      font-weight: 300;
      font-family: "宋体";
      color: transparent;
      user-select: none;
      animation: hotels 2s ease-in-out infinite alternate;
      cursor: pointer;
      &:nth-child(2) {
        animation-delay: 0.6s;
      }
      &:nth-child(3) {
        animation-delay: 1s;
      }
      &:nth-child(4) {
        animation-delay: 1.5s;
      }
    }
  }
}

@keyframes hotels {
  to {
    color: rgb(178, 215, 233);
  }
}
</style>