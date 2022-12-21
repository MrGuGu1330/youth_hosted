<template>
  <div>
    <img class="not_found" src="@/assets/imgs/not_found.png" alt="">
    <p class="not_found_txt">{{ num }}秒后将返回上一页</p>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data () {
    return {
      num: 3,
    };
  },
  mounted () {
    this.goBack();
  },
  methods: {
    goBack () {
      let time = setInterval(() => {
        this.num--;
        if (this.num <= 0) {
          clearInterval(time);
          this.$router.go(-1);
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.not_found {
  width: 30vw;
  margin: 50px auto 0;
}
.not_found_txt {
  font-size: 32px;
  text-align: center;
}
</style>