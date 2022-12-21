// 当前模块整合所有的API子模块，方便调用
// 首页
import indexApi from './apis/IndexApi'
// 旅店管理
import supplierApi from './apis/SupplierApi'
// 房型管理
import houseApi from './apis/HouseApi'
// 用户管理
import userApi from './apis/UserApi'
// 订单管理
import orderApi from './apis/OrderApi'
// 评论管理
import commentApi from './apis/CommentApi'
// 活动管理
import activityApi from './apis/ActivityApi'
// 关于我们
import aboutApi from './apis/AboutApi'
// 管理员
import adminApi from './apis/AdminApi'
// 上传图片
import uploadApi from './apis/UploadApi'

const httpApi = {
  indexApi,
  supplierApi,
  houseApi,
  userApi,
  orderApi,
  commentApi,
  activityApi,
  aboutApi,
  adminApi,
  uploadApi
};

export default httpApi;
