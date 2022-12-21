/** 实现页面刷新无空白 */
<template></template>

<script>
export default {
  name: 'test',
  data() {
    this.$router.replace({
      path: '/supplier', //让路由跳转回当前页面
      redirect: '/supplier/supplierinfo',
    })
    return {}
  },
}
</script>

<style scoped></style>
