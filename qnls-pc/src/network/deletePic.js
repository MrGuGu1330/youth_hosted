import { request } from './request'

/**
 * 请求配置表
 * func(method,params)  自定义请求 使用 func.then() 接收响应值
 * @param {get or post} method
 * @param {Object形式} params
 * @returns
 *
 */

// 删除图片
export function deleteImgs (url, params) {
  return request({
    url: url,
    method: 'post',
    data: params,
  })
}