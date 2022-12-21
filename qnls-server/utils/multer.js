const multer = require("multer");
const uuid = require('uuid');

// 修改头像
const uploadAvatar = multer({
  storage: multer.diskStorage({
    destination: 'assets/imgs/avatar/',
    filename (req, file, cb) {
      let fn = file.originalname
      let ext = fn.substr(fn.lastIndexOf('.'))
      cb(null, uuid.v4() + ext) //唯一标识 拼接 后缀名
    },
  }),
});

// 修改旅店图片
const uploadSupplierImgs = multer({
  storage: multer.diskStorage({
    destination: 'assets/imgs/suppliers/',
    filename (req, file, cb) {
      let fn = file.originalname
      let ext = fn.substr(fn.lastIndexOf('.'))
      cb(null, uuid.v4() + ext) //唯一标识 拼接 后缀名
    },
  }),
});

// 上传房型图片
const uploadHousesImgs = multer({
  storage: multer.diskStorage({
    destination: 'assets/imgs/houses/',
    filename (req, file, cb) {
      let fn = file.originalname
      let ext = fn.substr(fn.lastIndexOf('.'))
      cb(null, uuid.v4() + ext) // 唯一标识 拼接 后缀名
    },
  }),
});

// 上传关于我们图片
const uploadAboutImgs = multer({
  storage: multer.diskStorage({
    destination: 'assets/imgs/about/',
    filename (req, file, cb) {
      let fn = file.originalname
      let ext = fn.substr(fn.lastIndexOf('.'))
      cb(null, uuid.v4() + ext) // 唯一标识 拼接 后缀名
    },
  }),
});

// 上传活动图片
const uploadActivityImgs = multer({
  storage: multer.diskStorage({
    destination: 'assets/imgs/activity/',
    filename (req, file, cb) {
      let fn = file.originalname
      let ext = fn.substr(fn.lastIndexOf('.'))
      cb(null, uuid.v4() + ext) // 唯一标识 拼接 后缀名
    },
  }),
});

module.exports = {
  uploadAvatar,
  uploadSupplierImgs,
  uploadHousesImgs,
  uploadAboutImgs,
  uploadActivityImgs
}
