import axios from 'axios';
import store from '../store';

export function request (config) {
  const instance = axios.create({
    // baseURL: 'http://120.26.36.21:3000/',
    baseURL: 'http://127.0.0.1:3000/',
    timeout: 5000,
  });

  //请求拦截
  instance.interceptors.request.use(
    function (config) {
      // config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
      config.headers.Authorization = `Bearer ${sessionStorage.getItem(
        'token'
      )}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  //响应拦截
  instance.interceptors.response.use(
    function (response) {
      const { authorization } = response.headers;
      // console.log(authorization)
      // authorization && localStorage.setItem("token", authorization);
      authorization && sessionStorage.setItem('token', authorization);
      return response;
    },
    function (error) {
      if (!error.response.data.ok) {
        // localStorage.removeItem("token");
        sessionStorage.removeItem('token');
        store.commit('setType', 0);
        store.commit('setUser', {});
      }
      return Promise.reject(error);
    }
  );

  // instance.interceptors.response
  return instance(config);
}
