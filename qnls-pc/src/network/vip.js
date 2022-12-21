import { request } from "./request";

/**
 * 请求配置表
 * func(method,params)  自定义请求 使用 func.then() 接收响应值
 * @param {get or post} method
 * @param {Object形式} params
 * @returns
 *
 */

// 会员数量
export function getVipPercent (params) {
  return request({
    url: "/vip/getVipPercent",
    method: "get",
    params,
  });
}

// 判断是否是会员
export function judgeVIP (params) {
  return request({
    url: "/vip/judgeVIP",
    method: "get",
    params,
  });
}

// 开通会员
export function becomeVIP (params) {
  return request({
    url: "/vip/becomeVIP",
    method: "post",
    data: params,
  });
}

// 开通会员结果
export function vipPayResult (params) {
  return request({
    url: "/vip/vipPayResult",
    method: "post",
    data: params,
  });
}
