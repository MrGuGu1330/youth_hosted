import { request } from './request'
import qs from 'qs'

/**
 * 请求配置表
 * func(params)  自定义请求 使用 func.then() 接收响应值
 * @param {{uid}} params
 * @returns
 *
 */

// 获取旅店信息
export function getSupplyInfo(params) {
  return request({
    url: '/suppliers/getSupplierInfo',
    method: 'get',
    params,
  })
}

// 修改旅店信息
export function updateInfo(params) {
  return request({
    url: '/suppliers/updateSupplierInfo',
    method: 'post',
    data: qs.stringify(params),
  })
}

// 修改旅店密码
export function updateSupplierPass(params) {
  return request({
    url: '/suppliers/updateSupplierPass',
    method: 'post',
    data: qs.stringify(params),
  })
}

// 查询旅店设施
export function getEquip(params) {
  return request({
    url: '/suppliers/getSupplierFacilities',
    method: 'get',
    params,
  })
}

// 修改旅店设施
export function updateEquip(params) {
  return request({
    url: '/suppliers/updateSupplierFacilities',
    method: 'post',
    data: params,
  })
}

// 查看旅店房型列表

export function getSupplierHouses(params) {
  return request({
    url: '/suppliers/getSupplierHouses',
    method: 'get',
    params,
  })
}

// 查看房型详情

export function getHousesInfo(params) {
  return request({
    url: '/suppliers/getHousesInfo',
    method: 'get',
    params,
  })
}

// 删除旅店房型列表

export function deleteSupplierHouses(params) {
  return request({
    url: '/suppliers/deleteSupplierHouses',
    method: 'post',
    data: qs.stringify(params),
  })
}

// 添加房型
export function addSupplierHouses(params) {
  return request({
    url: '/suppliers/addSupplierHouses',
    method: 'post',
    data: qs.stringify(params),
  })
}

// 修改房型
export function updateSupplierHouses(params) {
  return request({
    url: '/suppliers/updateSupplierHouses',
    method: 'post',
    data: qs.stringify(params),
  })
}
