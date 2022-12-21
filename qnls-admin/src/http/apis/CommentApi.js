import myaxios from "../MyAxios";
import BASEURL from '../BaseUrl'

const { BMDURL } = BASEURL

const commentApi = {
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
   * 获取用户评论
   * @param {Object}} params  {user_name, supplier_name, comment_content, pageCurrent, pageSize}
   */
  getCommentList (params) {
    return myaxios.get(BMDURL + '/adminComment/getCommentList', params)
  },

  /**
   * 删除用户评论
   */
  deleteComment (params) {
    return myaxios.post(BMDURL + '/adminComment/deleteComment', params)
  }
}


export default commentApi;