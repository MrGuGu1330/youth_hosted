import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import httpApi from "@/http/index";
import "bootstrap-icons/font/bootstrap-icons.css";
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
import "@wangeditor/editor/dist/css/style.css";

Vue.config.productionTip = false;

Vue.prototype.$http = httpApi;

Vue.use(ElementUI);
Vue.use(Viewer);

store.commit("setBaseURL", "http://127.0.0.1:3000");
// store.commit('setBaseURL', 'http://120.26.36.21:3000')

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
