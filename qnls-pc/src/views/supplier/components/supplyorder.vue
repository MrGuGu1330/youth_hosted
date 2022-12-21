<template>
  <div>
    <div class="header"><h3>旅店订单</h3></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header {
  height: 40px;
  border-bottom: 2px solid #ccc;
  > h3 {
    line-height: 40px;
    position: relative;
    font-weight: 500;
    color: var(--color-primary);

    > &::after {
      content: '';
      display: block;
      width: 4em;
      height: 4px;
      background-color: var(--color-primary);
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
