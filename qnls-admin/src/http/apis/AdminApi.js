import myaxios from "../MyAxios";
import BASEURL from '../BaseUrl'

const { BMDURL } = BASEURL

const adminApi = {
  /**
   * 登录接口
   * @param {Object}} params  {username, password}
   */
  login (params) {
    return myaxios.post(BMDURL + "/login/adminLogin", params)
  },

  /**
   * 获取管理员信息接口
   * @param {Object}} params  {admin_id}
   */
  getAdminInfo (params) {
    return myaxios.get(BMDURL + "/admin/getAdminInfo", params)
  },

  /**
   * 修改管理员信息接口
   * @param {Object}} params  {admin_id, admin_name, admin_phone, admin_email}
   */
  updateAdminInfo (params) {
    return myaxios.post(BMDURL + "/admin/updateAdminInfo", params)
  },

  /**
   * 修改管理员密码接口
   * @param {Object}} params  {admin_id, admin_pwd}
   */
  updateAdminPwd (params) {
    return myaxios.post(BMDURL + "/admin/updateAdminPwd", params)
  },

  /**
 * 删除多余图片
 * @param {Object}} params  {delImgs}
 */
  deleteAvatar (params) {
    return myaxios.post(BMDURL + "/upload/deleteAvatar", params)
  },
}

export default adminApi;