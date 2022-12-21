<template>
  <div class="small_aside_btn" :style="{ '--color': color }">
    <i :class="className"></i>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'SmallAsideBtn',
  props: ['className', 'title', 'color'],
}
</script>

<style lang="scss" scoped>
.small_aside_btn {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 20px;
  border: 2px solid var(--color);
  border-radius: 6px;
  font-size: 20px;
  color: var(--color);
  overflow: hidden;
  transition: 0.5s;
  z-index: 1;
  cursor: pointer;
  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 100%;
    width: 200%;
    height: 160px;
    border-radius: 50%;
    background: var(--color);
    transition: all 0.7s;
    z-index: -1;
  }
  &:hover {
    color: #fff;
    &::before {
      top: -40px;
      left: -40px;
    }
  }
  span {
    margin-left: 10px;
    font-weight: bold;
  }
}
</style>
