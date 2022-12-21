<template>
  <div class="small_layout">
    <img class="banner" :src="img" alt="" />
    <div class="title_area">
      <slot name="title"></slot>
    </div>
    <div class="small_content">
      <div class="small_left">
        <slot name="content"></slot>
      </div>
      <div class="small_aside">
        <div class="aside_item" @click="$router.push('/booking')">
          <SmallAsideBtn :className="'bi bi-house'" :title="'在线预订'" :color="'#a8d5ba'" />
        </div>
        <div class="aside_item" @click="$router.push('/vip')">
          <SmallAsideBtn :className="'bi bi-credit-card'" :title="'会员卡'" :color="'#f6b14f'" />
        </div>
        <div class="aside_item" @click="$router.push('/about')">
          <SmallAsideBtn :className="'bi bi-card-heading'" :title="'关于我们'" :color="'#98b7d7'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SmallAsideBtn from "./smallAsideBtn.vue";

export default {
  name: "SmallLayout",
  components: { SmallAsideBtn },
  props: ["img"],
};
</script>

<style lang="scss" scoped>
.small_layout {
  // background-color: #f3f3f3;
  .banner {
    width: 100%;
  }
  .title_area {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: var(--container-width);
    height: 100px;
    margin: -50px auto 0;
    padding: 0 50px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 15px 15px 30px #bebebe, -15px 15px 30px #ffffff;
  }
  .small_content {
    display: flex;
    width: var(--container-width);
    margin: 50px auto 0;
    .small_left {
      flex: 3;
      padding-right: 15px;
    }
    .small_aside {
      flex: 1;
      .aside_item {
        margin-bottom: 5px;
        background: #fff;
      }
    }
  }
}
</style>