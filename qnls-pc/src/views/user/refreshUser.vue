/**
  实现页面刷新无空白
*/
<template>

</template>

<script>
export default {
  name: "refreshUser",
  data(){
    this.$router.replace({
      path: '/user', //让路由跳转回当前页面
      redirect: '/user/userInfo',
    })
    return {}
  }
}
</script>

<style scoped>

</style>