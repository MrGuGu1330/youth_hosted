<template>
  <div class="centen">
    <div class="centen_left">
      <div class="centen_left_top">
        <div>
          <h1>会员卡</h1>
          <p>更多优惠，更多机会。一卡在手，走遍全球。</p>
          <el-button type="success" round @click="$router.push('/vip/vipbuy')">办理会员</el-button>
          <h2></h2>
        </div>
      </div>
      <div class="centen_left_bottom">
        <div>
          <h1>旅社加盟</h1>
          <p>
            <a href="/home/homeDifferent.vue">青年旅社
              <i class="el-icon-chat-dot-round">与酒店的不同</i>
            </a>
            <!-- 
            <a href="/home/joincost.vue">加盟费用</a>
            <a href="">问与答</a>
            <a href="">更多</a> 
            -->
          </p>
          <el-button type="success" round @click="$router.push('/home/applyForJoining.vue')">申请加盟</el-button>
        </div>
      </div>
    </div>
    <!-- <div class="centen_right">
      <h1>青年旅社查询</h1>
      <p>
        近200家旅舍遍布全国27个省市自治区和直辖市的各主要城市。
        点击地图省份，选择你喜爱的旅舍
      </p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Centen",
};
</script>

<style lang="scss" scoped>
.centen {
  display: flex;
  // height: 780px;
  margin-top: 10px;
  background: url("@/assets/imgs/home/yha.gif") no-repeat;
  background-size: 100%;
  .centen_left {
    display: flex;
    // flex-direction: column;
    flex: 1;
    > div {
      display: flex;
      justify-content: center;
      flex: 1;
    }
    .centen_left_top {
      > div {
        width: 592px;
      }
      h1 {
        margin: 10px 0;
        font-family: "宋体";
        font-size: 70px;
      }
      p {
        margin: 30px 0;
        font-size: 15px;
      }
      h2 {
        width: 290px;
        height: 115px;
        margin-left: 300px;
        margin-top: 40px;
        background: url("@/assets/imgs/home/app_z.png");
      }
    }
    .centen_left_bottom {
      > div {
        width: 592px;
      }
      h1 {
        font-family: "宋体";
        font-size: 70px;
      }
      p > a {
        display: inline-block;
        margin: 20px 30px 50px 0;
        font-size: 16px;
      }
      a:hover {
        color: red;
      }
    }
  }
  .centen_right {
    flex: 1;
    h1 {
      margin-top: 50px;
      font-size: 70px;
      font-family: "宋体";
      text-align: center;
    }
    p {
      margin-top: 30px;
      font-size: 15px;
      text-align: center;
    }
  }
}
</style>