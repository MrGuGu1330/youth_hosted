import axios from 'axios'
import qs from 'qs'
import store from '../store'

const instance = axios.create()

instance.interceptors.request.use(config => {
  let token = store.state.token
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

const myaxios = {
  /** 用于发送get请求 
   *  url: 请求资源路径  
   *  params: 请求参数（Object形式）
   */
  get (url, params) {
    return instance({
      url,
      method: 'get',
      params
    })
  },

  /**
   * 用于发送post请求
   * @param {String} url   请求资源路径
   * @param {Object} params   请求参数（对象类型）
   * @returns Promise 
   */
  post (url, params) {
    return instance({
      url,
      method: 'post',
      data: qs.stringify(params)
    })
  }
}

export default myaxios