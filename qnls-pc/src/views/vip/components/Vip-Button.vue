<template>
  <div class="vip_button">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    color: {
      default: '#fff',
      type: String,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.vip_button {
  width: 200px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 100px;
  background-color: #fff;
  color: #f7941c;
  font-weight: bold;
  font-size: 20px;
  font-family: '微软雅黑';
  display: inline-block;
  user-select: none;
  cursor: pointer;
  &:active {
    opacity: 0.9;
  }
}
</style>
