<template>
  <div>
    <!-- 头部 -->
    <Header />
    <!-- 主要内容 -->
    <transition name="fade" mode="out-in">
      <div :key="router" :class="router == 0 ? 'container_home' : 'container'">
        <router-view />
      </div>
    </transition>
    <!-- 尾部 -->
    <Footer />
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import { mapState, mapMutations } from "vuex";
import { menuList } from '../utils/menuList';

export default {
  name: "Layout",
  data () {
    return {
      menuList
    }
  },
  components: { Header, Footer },
  computed: { ...mapState(['router']) },
  watch: {
    // 获取当前路由
    $route: {
      immediate: true,
      handler (val) {
        let r = '/' + val.fullPath.split('/')[1]
        this.menuList.forEach(item => {
          if (item.path == r) {
            this.setRouter(item.id)
          }
        })
      },
    },
  },
  methods: {
    ...mapMutations(["setRouter"]),
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  margin-top: var(--header-height);
}

.container_home {
  min-height: calc(100vh - var(--footer-height));
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>