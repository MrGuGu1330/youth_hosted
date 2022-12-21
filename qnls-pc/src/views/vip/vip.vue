<template>
  <div class="vip">
    <div class="mask1"></div>
    <div class="membership-one">
      <h2>九驻青年旅社VIP，纵享全国青年旅社®住宿优惠</h2>
      <div>
        <VipButton @click.native="goto('/vip/vipbuy')">开通会员</VipButton>
        <!-- <VipButton @click.native="goto('/vip/viprenew')">会员续费</VipButton> -->
        <!-- <VipButton @click.native="goto('/activity/activityList')">会员优惠</VipButton>s -->
      </div>
    </div>
    <div class="membership-two">
      <h2>会员在手，走遍全国；更多优惠，更多机会！</h2>
      <div>
        <VipAdvantage v-for="item in advantage" :key="item.id" :pic="require(`@/assets/imgs/vip_img/${item.img}`)"
          :advantage="item.title" :detail="item.detail"></VipAdvantage>
      </div>
    </div>
    <div class="membership-three">
      <h2>申请青年旅社®会员卡，开启您的精彩旅程</h2>
      <div>
        <VipButton @click.native="goto('/vip/vipquestion')">会员问与答</VipButton>
        <VipButton @click.native="goto('/vip/vipbuy')">马上申请</VipButton>
      </div>
    </div>
    <div class="membership-four">
      <div class="swiper">
        <template>
          <el-carousel indicator-position="outside" arrow="never">
            <el-carousel-item v-for="item in swiperImg" :key="item.id">
              <img style="width: 500px; height: 300px" :src="require(`@/assets/imgs/vip_img/${item.img}`)" alt="" />
            </el-carousel-item>
          </el-carousel>
        </template>
      </div>
      <div ref="chart" style="width: 600px; height: 400px"></div>
    </div>
  </div>
</template>

<script>
import VipButton from "./components/Vip-Button.vue";
import VipAdvantage from "./components/Vip-Advantage.vue";
import { getVipPercent } from "@/network/vip";
import { advantage } from '../../utils/advantage'

export default {
  name: "Vip",
  data () {
    return {
      advantage,
      swiperImg: [
        { id: 1, img: "111.png" },
        { id: 2, img: "222.png" },
        { id: 3, img: "333.png" },
      ],
      viptotal: 0,
      total: 0,
    };
  },
  components: { VipButton, VipAdvantage },
  mounted () {
    this.getVIPNum();
  },
  methods: {
    // 跳转页面
    goto (path) {
      this.$router.push(path);
    },

    // 获取会员占比
    getVIPNum () {
      getVipPercent().then((res) => {
        this.total = res.data.data.total;
        this.viptotal = res.data.data.vip_total;
        this.initCharts();
      });
    },

    // 初始化图表
    initCharts () {
      let myChart = this.$echarts.init(this.$refs.chart);
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
          textStyle: {
            color: "rgb(255,255,255)",
          },
        },
        series: [
          {
            name: "青年旅社",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.viptotal, name: "我们的会员人数" },
              { value: this.total - this.viptotal, name: "我们的非会员人数" },
            ],
          },
        ],
        color: ["#45C2E0", "#C1EBDD"],
      };

      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.mask1 {
  position: fixed;
  width: 100vw;
  min-width: 1200px;
  height: 100vh;
  background: url("@/assets/imgs/vip_img/beijngguding.webp") no-repeat center;
  background-size: 100% 100%;
  z-index: -1;
}

.vip {
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > div:not(:last-child) {
    flex-direction: column;
  }
}
.membership-one {
  height: 700px;
  background: url("@/assets/imgs/vip_img/one.webp") no-repeat center;
  background-size: cover;
  > h2 {
    margin-bottom: 20px;
    font-size: 50px;
    color: #fff;
    text-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3);
  }
  .vip_button {
    margin: 0 20px;
  }
}
.membership-two {
  height: 600px;
  background-color: #23170e;
  color: #ffd98a;
  > h2 {
    margin-bottom: 30px;
    font-size: 26px;
  }
  > div {
    display: flex;
    justify-content: center;
    > .vip-advantage {
      margin: 0 40px;
    }
  }
}
.membership-three {
  height: 500px;
  background-color: rgba(0, 0, 0, 0.3);
  > h2 {
    margin-bottom: 20px;
    font-size: 50px;
    color: #fff;
    text-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3);
  }
  .vip_button {
    margin: 20px;
  }
}
.membership-four {
  height: 500px;
  background: #23170e url("@/assets/imgs/vip_img/two.webp");
  > .swiper {
    width: 500px;
    margin-right: 30px;
    padding: 30px 30px 10px;
    border-radius: 15px;
    background: url("@/assets/imgs/vip_img/two.webp") no-repeat center;
    background-size: cover;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
    .el-carousel__item h3 {
      margin: 0;
      font-size: 18px;
      line-height: 300px;
      color: #475669;
      opacity: 0.75;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
}
</style>