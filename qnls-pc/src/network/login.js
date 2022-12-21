import { request } from './request';
import qs from 'qs';

/**
 * 请求配置表
 * func(params)  自定义请求 使用 func.then() 接收响应值
 * @param {Object形式} params
 * @returns
 *
 */


// 登录
export function login (params) {
  return request({
    url: 'login/userLogin',
    method: 'post',
    data: params,
  });
}

// 注册
export function register (params) {
  return request({
    url: 'login/userRegister',
    method: 'post',
    data: params
  })
}

// // 验证码
// export function getCode (params) {
//   return request({
//     url: 'login/VerificationCode',
//     method: 'get',
//     params,
//   });
// }

// // 注册
// export function register (params) {
//   return request({
//     url: 'login/userRegister',
//     method: 'post',
//     data: params,
//   });
// }