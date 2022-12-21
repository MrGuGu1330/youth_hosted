import myaxios from "../MyAxios";
import BASEURL from '../BaseUrl'

const { BMDURL } = BASEURL

const supplierApi = {
  /**
   * 获取旅店列表接口
   * @param {Object}} params  {supplier_name, supplier_address, is_agree, pageCurrent, pageSize}
   */
  getSupplierList (params) {
    return myaxios.get(BMDURL + "/adminSupplier/getSupplierList", params)
  },

  /**
   * 修改旅店加盟状态接口
   * @param {Object}} params  {supplier_id, is_agree}
   */
  updateSupplierAgree (params) {
    return myaxios.post(BMDURL + "/adminSupplier/updateSupplierAgree", params)
  },

  /**
   * 获取旅店详情接口
   * @param {Object}} params  {supplier_id}
   */
  getSupplierDetail (params) {
    return myaxios.get(BMDURL + "/adminSupplier/getSupplierDetail", params)
  },
  /**
  * 获取旅店设施接口
  * @param {Object}} params  {supplier_id}
  */
  getFacilities (params) {
    return myaxios.get(BMDURL + "/adminSupplier/getFacilities", params)
  },

  /**
   * 删除旅店接口
   * @param {Object}} params  {supplier_id}
   */
  deleteSupplier (params) {
    return myaxios.post(BMDURL + "/adminSupplier/deleteSupplier", params)
  }
}

export default supplierApi;