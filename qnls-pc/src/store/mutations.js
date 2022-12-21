export default {
  //往VUEX提交更新数据的方法只能写同步方法
  //例： addCounter(state, payload) {
  // 	payload.count++;
  // },
  // addToCart(state, payload) {
  // 	payload.checked = false;
  // 	state.cartList.push(payload);
  // },
  setBaseURL(state,val){
    state.baseURL=val
  },

  setBaseURL (state, val) {
    state.baseURL = val;
  },

  setRouter (state, val) {
    state.router = val;
  },

  setType (state, val) {
    state.type = val;
  },

  setUser (state, val) {
    state.user = val;
  },

  setPosition (state, val) {
    state.position = val;
  },

  setCenter (state, val) {
    state.center = val
  },

  /**
   * 保存订单
   * @param {} state
   * @param {array} order 订单
   */
  setOrder (state, order) {
    state.orderList.push(order);
  },
};
