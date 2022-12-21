<template>
  <VipBase>
    <template slot="title">
      <div class="title">
        <div>
          <h2>九驻青年旅社会员<span>收银台</span></h2>
          <p>优享更丰富的生活，青年旅社让你与众不同</p>
        </div>
        <div class="cont">
          <p>
            九驻青年旅舍会员（一年）是国内青年旅舍身份，证明也是旅行者入住青年旅舍的凭证。拥有会员，可以享受国内青年旅舍住宿价格的优惠，同时部分青年旅舍只允许会员入住。
          </p>
          <h3>九驻青年旅舍会员的好处：</h3>
          <p>1）入住青年旅舍享受房价上的优惠；</p>
          <p>2）在全国各地享有食、住、行、游、购、娱等逾3,000项优惠；</p>
          <p>
            3）以优惠价格参与多项由青年旅舍举办的各类文化、旅游等方面的交流活动；
          </p>
          <p>4）优先参与青年旅舍组织的交流活动。</p>
          <h3>会员费用及有效期</h3>
          <p>九驻青年旅舍会员（一年） 人民币50元</p>
          <p>有效期为一年 全国通用</p>
        </div>
      </div>
    </template>
  </VipBase>
</template>

<script>
import VipBase from "./components/vipbase.vue";

export default {
  name: "Vipbuy",
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
.title {
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  font-family: "幼圆";
  color: #20190d;
  > div {
    > h2 {
      font-size: 60px;
      > span {
        font-size: 40px;
      }
      margin-bottom: 30px;
    }
    > p {
      font-size: 25px;
    }
  }
  > .cont {
    margin-top: 30px;
    border-radius: 10px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.7);
    height: 400px;
    > p {
      margin: 5px 0;
      font-size: 16px;
    }
    > h3 {
      margin: 10px 0;
      font-size: 20px;
    }
  }
}
</style>