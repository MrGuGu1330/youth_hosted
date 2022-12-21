import { request } from './request';
import qs from 'qs';
/**
 * 请求配置表
 * func(method,params)  自定义请求 使用 func.then() 接收响应值
 * @param {get or post} method
 * @param {Object形式} params
 * @returns
 *
 */

// 入驻
export function addSupplier (params) {
  return request({
    url: '/addSupplier',
    method: 'post',
    data: params,
  });
}
