import myaxios from "../MyAxios";
import BASEURL from '../BaseUrl'

const { BMDURL } = BASEURL

const uploadApi = {
  /**
  * 删除多余图片
  * @param {Object}} params  {delImgs, src}
  */
  deleteImgs (params) {
    return myaxios.post(BMDURL + "/upload/deleteImgs", params)
  },
}

export default uploadApi;