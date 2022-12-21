<template>
  <div class="activity_banner">
    <!-- <div class="activity_banner_top"></div> -->
    <h1>最新活动</h1>
    <p>精心策划的青旅活动，期待你的参与</p>
    <div class="activity_banner_button">
      <el-carousel :interval="4000" type="card" height="700px">
        <el-carousel-item class="imgsss">
          <img src="@/assets/imgs/home/hotel001.jpg" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/imgs/home/hotel002.jpg" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/imgs/home/hotel003.jpg" alt="" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="@/assets/imgs/home/hotel004.jpg" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-button type="success" round style="margin: 50px 47%; color: green; background-color: #fff"
      @click="$router.push('/activity/activityList')">所有活动</el-button>
  </div>
</template>

<script>
export default {
  name: 'NewActivity'
}
</script>

<style lang="scss" scoped>
.activity_banner {
  position: relative;
  height: 1149px;
  background: url("@/assets/imgs/home/news-bg.jpg");
  // div:nth-child(1) {
  //   position: absolute;
  //   right: 230px;
  //   top: -69px;
  //   width: 422px;
  //   height: 138px;
  //   background: url("@/assets/imgs/home/book-aboar.png");
  // }

  // .el-carousel__item h3 {
  //   color: #475669;
  //   font-size: 14px;
  //   opacity: 0.75;
  //   line-height: 200px;
  //   margin: 0;
  // }

  h1 {
    margin-top: 80px;
    padding-top: 50px;
    font-size: 50px;
    font-weight: 500;
    font-family: "宋体";
    color: #fff;
    text-align: center;
  }
  p {
    margin: 30px 0;
    text-align: center;
    color: #fff;
    font-size: 20px;
  }
  .activity_banner_button {
    width: 1250px;
    margin: 0 auto;
  }
}
</style>