/**
实现页面刷新无空白
*/
<template>

</template>

<script>
export default {
  name: "refreshOrder",
  data(){
    this.$router.replace({
      path: '/user/orders', //让路由跳转回当前页面
    })
    return {}
  }
}
</script>

<style scoped>

</style>