import myaxios from "../MyAxios";
import BASEURL from '../BaseUrl'

const { BMDURL } = BASEURL

const houseApi = {
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
  * 获取房型列表接口
  * @param {Object}} params  {house_name, supplier_name, pageCurrent, pageSize }
  */
  getHouseList (params) {
    return myaxios.get(BMDURL + "/adminHouse/getHouseList", params)
  },

  /**
  * 删除房型接口
  * @param {Object}} params  {house_id }
  */
  deleteHouse (params) {
    return myaxios.post(BMDURL + "/adminHouse/deleteHouse", params)
  },

  /**
  * 获取房型详情接口
  * @param {Object}} params  {house_id }
  */
  getHouseDetail (params) {
    return myaxios.get(BMDURL + "/adminHouse/getHouseDetail", params)
  },
}

export default houseApi;