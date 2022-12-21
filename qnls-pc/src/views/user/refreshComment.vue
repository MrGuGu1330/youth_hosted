/**
实现页面刷新无空白
*/
<template>

</template>

<script>
export default {
  name: "refreshComment",
  data(){
    this.$router.replace({
      path: '/user/tracks', //让路由跳转回当前页面
    })
    return {}
  }
}
</script>

<style scoped>

</style>