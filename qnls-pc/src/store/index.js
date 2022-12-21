import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import createPersistedState from "vuex-persistedstate";

//安装插件
Vue.use(Vuex);
//创建store对象
const state = {
  cartList: [],
  baseURL: '',  // 图片基础路径
  router: 0,  // 当前路由
  type: 0, // 0未登录 1用户登录 2旅店登录
  user: {}, // id:用户ID或旅店ID, name:用户名或旅店名, avater:用户头像或旅店头像
  position: "北京市", // 当前定位, 默认北京市,
  center: [116.39737, 39.90808], // 当前定位经纬度, 默认北京市,
  orderList: [],
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer (val) {
      return {
        router: val.router,
        type: val.type,
        user: val.user,
      }
    }
  })],
});

// 默认是以localStorage的方式存储，如果想用sessionStorage方式存储，请使用以下方式
// plugins: [createPersistedState({ storage: window.sessionStorage })]

//挂载vue实例上
export default store;
