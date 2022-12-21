const express = require('express');
const pool = require('../pool')
const router = express.Router();
const multer = require('../utils/multer.js')
const delFile = require('../utils/delFile.js')

// 上传旅店图片
router.post('/uploadSupplierImgs', multer.uploadSupplierImgs.single('supplier_imgs'), function (req, res, next) {
  let img = '/imgs/suppliers/' + req.file.filename
  res.send({ code: 200, ok: 1, msg: '上传成功', data: img })
});

// 上传旅店房型图片
router.post('/uploadHousesImgs', multer.uploadHousesImgs.single('house_imgs'), function (req, res, next) {
  let img = '/imgs/houses/' + req.file.filename
  res.send({ code: 200, ok: 1, msg: '上传成功', data: img })
});

// 上传关于我们图片
router.post('/uploadAboutImgs', multer.uploadAboutImgs.single('about_img'), function (req, res, next) {
  let img = '/imgs/about/' + req.file.filename
  res.send({ code: 200, ok: 1, msg: '上传成功', data: img })
});

// 上传活动图片
router.post('/uploadActivityImgs', multer.uploadActivityImgs.single('activity_imgs'), function (req, res, next) {
  let img = '/imgs/activity/' + req.file.filename
  res.send({ code: 200, ok: 1, msg: '上传成功', data: img })
});

// 上传头像
router.post('/uploadAvatar', multer.uploadAvatar.single('avatar'), function (req, res, next) {
  let img = '/imgs/avatar/' + req.file.filename
  res.send({ code: 200, ok: 1, msg: '上传成功', data: img })
});

// 删除多余图片
router.post('/deleteImgs', function (req, res, next) {
  let { delImgs, src } = req.body

  delImgs.split(',').forEach(item => {
    let str = ''
    if (item.lastIndexOf('/') > -1) str = item.substr(item.lastIndexOf('/') + 1)
    else str = item
    delFile(src, str)
  })

  res.send({ code: 200, ok: 1, msg: '删除成功' })
});



// 删除旅店图片
router.post('/deleteSupplierImgs', function (req, res, next) {
  let { imgURL } = req.body

  imgURL.split(',').forEach(item => {
    let str = ''
    if (item.lastIndexOf('/') > -1) str = item.substr(item.lastIndexOf('/') + 1)
    else str = item
    delFile('suppliers', str)
  })

  res.send({ code: 200, ok: 1, msg: '删除成功' })
});
// 删除旅店房型图片
router.post('/deleteHousesImgs', function (req, res, next) {
  let { imgURL } = req.body

  imgURL.split(',').forEach(item => {
    let str = ''
    if (item.lastIndexOf('/') > -1) str = item.substr(item.lastIndexOf('/') + 1)
    else str = item
    delFile('houses', str)
  })

  res.send({ code: 200, ok: 1, msg: '删除成功' })
});
// 删除关于我们图片
router.post('/deleteAboutImgs', function (req, res, next) {
  let { delImgs } = req.body

  delImgs.split(',').forEach(item => {
    let str = ''
    if (item.lastIndexOf('/') > -1) str = item.substr(item.lastIndexOf('/') + 1)
    else str = item
    delFile('about', str)
  })

  res.send({ code: 200, ok: 1, msg: '删除成功' })
});
// 删除活动图片
router.post('/deleteActivityImgs', function (req, res, next) {
  let { delImgs } = req.body

  delImgs.split(',').forEach(item => {
    let str = ''
    if (item.lastIndexOf('/') > -1) str = item.substr(item.lastIndexOf('/') + 1)
    else str = item
    delFile('activity', str)
  })

  res.send({ code: 200, ok: 1, msg: '删除成功' })
});

module.exports = router;
