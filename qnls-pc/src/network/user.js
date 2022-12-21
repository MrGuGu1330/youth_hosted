import { request } from './request';
import qs from 'qs';

/**
 * 请求配置表
 * func(params)  自定义请求 使用 func.then() 接收响应值
 * @param {{uid}} params
 * @returns
 *
 */

// 获取用户信息
export function getUserInfo (params = {}) {
    return request({
        url: '/users/getUserInfo',
        method: 'get',
        params,
    });
}
// 修改用户信息
export function updateUserInfo (params = {}) {
    return request({
        url: '/users/updateUserInfo',
        method: 'post',
        data: params,
    });
}
// 修改用户密码
export function updatePassword (params = {}) {
    return request({
        url: '/users/updateUserPass',
        method: 'post',
        data: params,
    });
}
// 修改用户头像
export function updateHead (params = {}) {
    return request({
        url: '/users/updateAvatar',
        method: 'post',
        data: params
    })
}

// 获取用户的订单
export function getOrders (params = {}){
    return request({
        url:'/users/getUserOrderByUid',
        method:'get',
        params
    })
}

// 获取订单详情
export function getOrderDetail(params = {}){
    return request({
        url:'/users/getUserMinOrderByOrderId',
        method:'get',
        params
    })
}

// 发表评论
export function makeComment(params = {}){
    return request({
        url:'/users/makeComment',
        method:'post',
        data:params
    })
}

// 获取评论
export function getComments(params = {}){
    return request({
        url:'/users/getUserCommentByUid',
        method:'get',
        params
    })
}

// 获取评论详情
export function getCommentDetail(params = {}){
    return request({
        url:'/users/getUserCommentInfoByCid',
        method:'get',
        params
    })
}

// 删除评论
export function delComment(params = {}){
    return request({
        url:'/users/deleteComment',
        method:'post',
        data:params
    })
}

// 获取参加的活动
export function getActivities(params = {}){
    return request({
        url:'/users/getUserJoinByUid',
        method:'get',
        params
    })
}