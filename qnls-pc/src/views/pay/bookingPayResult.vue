<template>
  <div>
    <div id="lottie_box"></div>
    <p class="order_txt">预定{{result ? '成功':' 失败'}}, 即将返回个人中心, {{num}}s</p>
  </div>
</template>

<script>
import { bookingPayResult } from '@/network/pay'
import lottie from "lottie-web";

export default {
  name: 'BookingPayResult',
  data () {
    return {
      result: true,
      num: 5,
    }
  },
  created () {
    let data = {
      out_trade_no: this.$route.query.out_trade_no,
      trade_no: this.$route.query.trade_no
    }
    bookingPayResult(data).then(res => {
      console.log(res)
      if (res.data.code == 200) {
        this.result = true
      } else {
        this.result = false
      }
    })
  },
  methods: {
    goBack () {
      let time = setInterval(() => {
        this.num--;
        if (this.num <= 0) {
          clearInterval(time);
          this.$router.push('/user');
        }
      }, 1000);
    },
  },
  mounted () {
    this.$nextTick(() => {
      lottie.loadAnimation({
        container: document.getElementById(`lottie_box`), // 包含动画的dom元素
        renderer: "svg", // 渲染出来的是什么格式
        loop: true, // 循环播放
        autoplay: true, // 自动播放
        animationData: this.result ? require(`./json/orderSuccess.json`) : require(`./json/orderFailed.json`), // 动画json的本地路径
      });
    });

    this.goBack()
  }
}
</script>

<style lang="scss" scoped>
#lottie_box {
  width: 40vw;
  margin: auto;
}
.order_txt {
  font-size: 32px;
  text-align: center;
}
</style>