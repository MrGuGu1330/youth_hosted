import myaxios from "../MyAxios";
import BASEURL from '../BaseUrl'

const { BMDURL } = BASEURL

const activityApi = {
  // ---------------以下仅示例-------------------

  /**
  * 获取活动列表接口
  * @param {Object}} params  {supplier_name, supplier_address, is_agree, pageCurrent, pageSize}
  */
  // getSupplierList (params) {
  //   return myaxios.get(BMDURL + "/adminSupplier/getSupplierList", params)
  // }

  // ---------------------------------

  /**
   * 获取活动列表接口
   */
  getActivityList (params) {
    return myaxios.get(BMDURL + '/adminActivity/getActivityList', params)
  },

  /**
  * 删除活动接口
  */
  deleteActivity (params) {
    return myaxios.post(BMDURL + '/adminActivity/deleteActivity', params)
  },

  /**
  * 获取活动详情接口
  */
  getActivityDetail (params) {
    return myaxios.get(BMDURL + '/adminActivity/getActivityDetail', params)
  },

  /**
  * 删除活动图片接口
  * @param {Object}} params  {delImgs}
  */
  deleteActivityImgs (params) {
    return myaxios.post(BMDURL + "/upload/deleteActivityImgs", params)
  },

  /**
  * 新增活动接口
  * @param {Object}} params  {activity_title, activity_cover, activity_start_time, activity_end_time, activity_content, activity_discount, activity_face_to}
  */
  addActivity (params) {
    return myaxios.post(BMDURL + "/adminActivity/addActivity", params)
  },

  /**
  * 修改活动接口
  * @param {Object}} params  {activity_id, activity_title, activity_cover, activity_start_time, activity_end_time, activity_content, activity_discount, activity_face_to}
  */
  updateActivity (params) {
    return myaxios.post(BMDURL + "/adminActivity/updateActivity", params)
  }
}

export default activityApi;