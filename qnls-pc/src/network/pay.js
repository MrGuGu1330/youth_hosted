import { request } from './request'

/**
 * 请求配置表
 * func(method,params)  自定义请求 使用 func.then() 接收响应值
 * @param {get or post} method
 * @param {Object形式} params
 * @returns
 *
 */

// 预定房间
export function bookingHouses (params) {
  return request({
    url: '/booking/bookingHouses',
    method: 'post',
    data: params,
  })
}

// 预订房间结果
export function bookingPayResult (params) {
  return request({
    url: '/booking/bookingPayResult',
    method: 'post',
    data: params,
  })
}