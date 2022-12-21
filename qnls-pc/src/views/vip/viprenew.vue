<template>
  <VipBase>
    <template slot="title">
      <div class="title">
        <div>
          <h2>会员续费</h2>
          <p>优享更丰富的生活，青年旅社让你与众不同</p>
        </div>
        <div class="cont">
          <h3>续卡费用及说明：</h3>
          <p>
            1）第一年续卡的费用为原价50元的9折，45元。第二年及以后为8折，40元。
          </p>
          <p>2）最长续费1年。</p>
        </div>
      </div>
    </template>
  </VipBase>
</template>

<script>
import VipBase from "./components/vipbase.vue";

export default {
  name: "Viprenew",
  components: { VipBase },
  mounted() {
    let footer = window.document.querySelector(".footer");
    footer.style.display = "none";
  },
  beforeDestroy() {
    let footer = window.document.querySelector(".footer");
    if (footer) footer.style.display = "block";
  },
};
</script>

<style lang="scss" scoped>
.membership-one {
  background: url("@/assets/imgs/vip_img/one.webp") center no-repeat;
  background-size: cover;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;

  > .payfor {
    width: 580px;
    height: 500px;
    border-radius: 10px;
    margin-left: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    padding-top: 100px;
    > .login {
      border-radius: 10px;
      width: 400px;
      height: 200px;
      background: url("@/assets/imgs/vip_img/touxiang_bg.png") no-repeat center;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      color: #fff;
      align-items: center;
      > .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        // background: url(@/assets/imgs/vip_img/touxiang.png) no-repeat center;
        background-size: contain;
        margin-top: -50px;
        margin-bottom: 20px;
        > img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
      > p {
        margin: 20px 0;
      }
    }
    > .isvip {
      border-radius: 10px;
      width: 400px;
      height: 200px;
      background: url("@/assets/imgs/vip_img/touxiang_bg.png") no-repeat center;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      color: #fff;
      align-items: center;
      > .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        // background: url(@/assets/imgs/vip_img/touxiang.png) no-repeat center;
        background-size: contain;
        margin-top: -50px;
        margin-bottom: 20px;
        > img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
      > p {
        margin: 20px 0;
      }
    }
    > .vipbuy {
      display: flex;
      flex-direction: column;
      align-items: center;
      > img {
        margin: 10px;
      }
    }
  }
}
.membership-two {
  height: calc(100vh - 700px - 50px);
  background-color: #2b2119;
}
</style>