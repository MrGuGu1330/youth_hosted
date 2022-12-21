import myaxios from "../MyAxios";
import BASEURL from '../BaseUrl'

const { BMDURL } = BASEURL

const userApi = {
  // ---------------以下仅示例-------------------

  /**
  * 获取旅店列表接口
  * @param {Object}} params  {supplier_name, supplier_address, is_agree, pageCurrent, pageSize}
  */
  // getSupplierList (params) {
  //   return myaxios.get(BMDURL + "/adminSupplier/getSupplierList", params)
  // }

  // ---------------------------------

  /**
  * 获取用户列表接口
  * @param {Object}} params  {user_name, isvip, pageCurrent, pageSize}
  */
  getUserList (params) {
    return myaxios.get(BMDURL + "/adminUser/getUserList", params)
  },

  /**
  * 删除用户接口
  * @param {Object}} params  {user_id}
  */
  deleteUser (params) {
    return myaxios.post(BMDURL + "/adminUser/deleteUser", params)
  }

}

export default userApi;