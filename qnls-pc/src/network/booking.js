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
export function getSupplierInfo(params) {
	return request({
		url: '/booking/getSupplierInfo',
		method: 'get',
		params,
	});
}

export function getList(params) {
	return request({
		url: '/booking/getSuppliersBuyAddr',
		method: 'get',
		params,
	});
}
/**
 *
 * @param {id} params 获取房间列表
 * @returns
 */
export function getGoods(params) {
	return request({
		url: '/booking/getHousesBuySid',
		method: 'get',
		params,
	});
}
/**
 *
 * @param {id} params 获取评论列表
 * @returns
 */
export function getComments(params) {
	return request({
		url: '/booking/getCommentsBuySid',
		method: 'get',
		params,
	});
}
/**
 *
 * @param {*} params 获取设施列表
 * @returns
 */
export function getServes(params) {
	return request({
		url: '/booking/getFacilitiesBuySid',
		method: 'get',
		params,
	});
}

export function getVip(params) {
	return request({
		url: '/vip/judgeVIP',
		method: 'get',
		params,
	});
}

export function getActivity(params) {
	return request({
		url: '/booking/getUserCanUseActivity',
		method: 'get',
		params,
	});
}

export function bookingHouses(params) {
	return request({
		url: '/booking/bookingHouses',
		method: 'post',
		data: params,
	});
}
