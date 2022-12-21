import myaxios from "../MyAxios";
import BASEURL from '../BaseUrl'

const { BMDURL } = BASEURL

const indexApi = {
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
  * 获取全部旅店数接口
  * @param {Object}} params  {}
  */
  getSuplierCount (params = {}) {
    return myaxios.get(BMDURL + "/adminIndex/getSuplierCount", params)
  },

  /**
  * 获取全部房型数接口
  * @param {Object}} params  {}
  */
  getHouseCount (params = {}) {
    return myaxios.get(BMDURL + "/adminIndex/getHouseCount", params)
  },

  /**
  * 获取全部用户数接口
  * @param {Object}} params  {}
  */
  getUserCount (params = {}) {
    return myaxios.get(BMDURL + "/adminIndex/getUserCount", params)
  },

  /**
  * 获取会员数和非会员数接口
  * @param {Object}} params  {}
  */
  getVIPcount (params = {}) {
    return myaxios.get(BMDURL + "/adminIndex/getVIPcount", params)
  },

  /**
  * 获取不同地区旅店数接口
  * @param {Object}} params  {}
  */
  getSupplierInArea (params = {}) {
    return myaxios.get(BMDURL + "/adminIndex/getSupplierInArea", params)
  },
}

export default indexApi;