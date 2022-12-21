<template>
  <div>
    <div class="membership-one">
      <div class="title">
        <h2>会员优惠</h2>

        <div class="cont"></div>
      </div>
    </div>
    <div class="membership-two"></div>
  </div>
</template>

<script>
export default {
  mounted () {
    let footer = window.document.querySelector('.footer')
    // console.log(footer)
    footer.style.display = 'none'
  },
  beforeDestroy () {
    let footer = window.document.querySelector('.footer')
    // console.log(footer)
    footer.style.display = 'block'
  },
}
</script>

<style lang="scss" scoped>
.membership-one {
  background: url("@/assets/imgs/vip_img/one.webp") center no-repeat;
  background-size: cover;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;

  > .title {
    width: 1200px;
    height: 700px;
    // background-color: #fff;
    display: flex;
    flex-direction: column;
    font-family: "仿宋";
    color: #20190d;

    > h2 {
      font-size: 60px;
      margin: 30px 0;
    }

    > .cont {
      flex: 1;
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
}
.membership-two {
  height: calc(100vh - 700px - 50px);
  background-color: #2b2119;
}
</style>
