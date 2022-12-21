import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token'),
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : '',
    baseURL: ''
  },

  getters: {},
  mutations: {
    // 保存token
    saveToken (state, payload) {
      state.token = payload
      sessionStorage.setItem('token', payload)
    },

    // 更新用户信息
    updateUserInfo (state, payload) {
      state.user = payload
      sessionStorage.setItem('user', JSON.stringify(payload))
    },

    // 修改图片路径前缀
    setBaseURL (state, payload) {
      state.baseURL = payload
    }
  },
  actions: {},
  modules: {}
})
