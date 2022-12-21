<template>
  <div class="data_item">
    <div class="data_title">{{title}}</div>
    <div class="data_cont">
      <img class="data_svg" :src="src" alt="">
      <span class="data_num">{{value | filterNum}} <span>{{weight}}</span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexCard',
  props: ['title', 'value', 'src', 'weight'],
  filters: {
    filterNum (val) {
      let num = val >= 10000 ? val / 10000 : val
      let str = num.toFixed(0);
      let reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
      return `${str.replace(reg, "$1,")}${val >= 10000 ? '万' : ''}`;
    }
  },
  watch: {
    value (val) {
      this.value = val
    },
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: SanJi;
  src: url("@/assets/fonts/SanJiLiJunLiLiangTi-Cu-2.ttf");
}
@font-face {
  font-family: Smiley;
  src: url("@/assets/fonts/SmileySans-Oblique-2.ttf");
}

.data_item {
  height: 200px;
  padding: 20px;
  box-shadow: 0 0 5px 5px #eee;
  overflow: hidden;
  .data_title {
    position: relative;
    padding-left: 10px;
    font-size: 22px;
    font-family: SanJi;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      width: 5px;
      height: 100%;
      background: #3bd2d0;
    }
  }
  .data_cont {
    display: flex;
    align-items: center;
    height: 100%;
    .data_svg {
      width: 150px;
    }
    .data_num {
      margin-left: 20px;
      font-size: 62px;
      font-family: Smiley;
      color: #30747d;
    }
  }
}
</style>