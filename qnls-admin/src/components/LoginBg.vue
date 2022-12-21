<template>
  <div class="circum">
    <div id="waterBg"></div>
    <img class="bridge" src="@/assets/bridge.png" alt="">
  </div>
</template>

<script>
import '@/assets/js/jquery.js'
import '@/assets/js/jquery-ripples.js'

export default {
  name: 'LoginBg',
  mounted () {
    $('#waterBg').ripples({
      resolution: 300,
      dropRadius: 50,
      perturbance: 0.04,
      interactive: true
    });
  }
}
</script>

<style>
.circum {
  position: relative;
  height: 1200px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#waterBg {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/src/assets/water.png") center center no-repeat;
  background-size: cover;
}

.bridge {
  position: absolute;
  bottom: 0;
  pointer-events: none;
}
</style>