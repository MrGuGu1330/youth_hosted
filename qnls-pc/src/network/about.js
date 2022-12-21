import { request } from './request';
import qs from 'qs';

/**
 * 请求配置表
 * func(params)  自定义请求 使用 func.then() 接收响应值
 * @param {Object形式} params
 * @returns
 *
 */

// 获取关于我们详情
export function getAboutsList (params = {}) {
  return request({
    url: '/about/getAboutsList',
    method: 'get',
    params,
  });
}