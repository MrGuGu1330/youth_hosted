import myaxios from "../MyAxios";
import BASEURL from "../BaseUrl";

const { BMDURL } = BASEURL;

const orderApi = {
  // ---------------以下仅示例-------------------

  /**
   * 获取旅店列表接口
   * @param {Object}} params  {supplier_name, supplier_address, is_agree, pageCurrent, pageSize}
   */
  // getSupplierList (params) {
  //   return myaxios.get(BMDURL + "/adminSupplier/getSupplierList", params)
  // }

  // ---------------------------------
  // 获取订单列表
  getOrderList(params) {
    return myaxios.get(BMDURL + "/adminOrder/getOrderList", params);
  },
  // 获取订单详情
  getOrderDetail(params) {
    return myaxios.get(BMDURL + "/adminOrder/getOrderDetail", params);
  },
};

export default orderApi;
