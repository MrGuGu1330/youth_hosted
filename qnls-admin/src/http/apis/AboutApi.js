import myaxios from "../MyAxios";
import BASEURL from '../BaseUrl'

const { BMDURL } = BASEURL

const aboutApi = {
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
  * 获取关于我们列表接口
  * @param {Object}} params  {}
  */
  getAboutList (params = {}) {
    return myaxios.get(BMDURL + "/adminAbout/getAboutList", params)
  },

  /**
  * 获取关于我们详情接口
  * @param {Object}} params  {about_id}
  */
  getAboutDetail (params) {
    return myaxios.get(BMDURL + "/adminAbout/getAboutDetail", params)
  },

  /**
  * 获取关于我们详情接口
  * @param {Object}} params  {about_id, about_title, about_content, about_img}
  */
  updateAbout (params) {
    return myaxios.post(BMDURL + "/adminAbout/updateAbout", params)
  },

  /**
  * 删除关于我们图片接口
  * @param {Object}} params  {delImgs}
  */
  deleteAboutImgs (params) {
    return myaxios.post(BMDURL + "/upload/deleteAboutImgs", params)
  }
}

export default aboutApi;