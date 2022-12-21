import { request } from './request';
import qs from 'qs';

/**
 * 请求配置表
 * func(params)  自定义请求 使用 func.then() 接收响应值
 * @param {Object形式} params
 * @returns
 *
 */

// 获取活动列表
export function getActivityList (params) {
  return request({
    url: '/activity/getActivityList',
    method: 'get',
    params,
  });
}

// 获取活动详情
export function getActivityByAid (params) {
  return request({
    url: '/activity/getActivityByAid',
    method: 'get',
    params,
  });
}

// 参加活动
export function joinActivity (params) {
  return request({
    url: '/activity/joinActivity',
    method: 'post',
    data: params,
  });
}