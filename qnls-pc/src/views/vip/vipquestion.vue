<template>
  <div>
    <div class="membership-one">
      <div class="title">
        <h2>会员问与答</h2>

        <div class="cont">
          <p>注意事项</p>
          <h3>问：会员过期后可以继续使用吗？该如何续费？</h3>
          <p>
            答：会员过期后，则自动失效，不能继续延用。<br />

            如需续费，在APP或者PC端vip页面点击续费按钮，进入付费页面！
          </p>
          <h3>
            问：会员卡是实名制吗？可以借给其他人使用吗？入住旅舍如何享受优惠？
          </h3>
          <p>
            答：会员采用实名制，只能会员本人使用，不能借给其他人使用。入住旅舍时，请出示您的会员。在国内（不含港澳），会员可以享受一个床位或一个标准间的会员价优惠；在澳门，必须有会员方可入住；在香港，部分旅舍一个会员最多可以带三个非会员入住（仅会员可以享受会员价优惠）。
          </p>
          <h3>问：会员的使用是否有年龄限制？年长的长者可以办理会员吗？</h3>
          <p>
            答：只要申请人年满5岁，均可以办理会员，因此，年长的长者也是可以办理会员的。
            在国内，会员的使用没有年龄限制的。但是出于安全考虑，青年旅舍会对特定房型（如多人间上下床）的客人（如幼童、年长者及行动不便的人士）进行劝导和另行安排。一般比较偏远的地区，旅舍也不鼓励行动不便的年长者入住。
          </p>
        </div>
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
