<template>
  <button class="cta">
    <span>{{ title }}</span>
    <svg width="15px" height="10px" viewBox="0 0 13 10">
      <path d="M1,5 L11,5"></path>
      <polyline points="8 1 12 5 8 9"></polyline>
    </svg>
  </button>
</template>

<script>
export default {
  name: "ActivityBtn",
  props: ["title"],
};
</script>

<style lang="scss" scoped>
.cta {
  position: relative;
  padding: 5px 10px;
  transition: all 0.2s ease;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50px;
    background: #b1dae7;
    transform: translateY(-50%);
    transition: all 0.3s ease;
  }
  span {
    position: relative;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #234567;
  }
  svg {
    position: relative;
    top: 0;
    margin-left: 10px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #234567;
    stroke-width: 2;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }

  &:hover,
  &.active {
    &::before {
      width: 100%;
      background: #b1dae7;
    }
    svg {
      transform: translateX(0);
    }
  }
}

.cta:active {
  transform: scale(0.95);
}
</style>