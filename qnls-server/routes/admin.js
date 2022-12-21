const express = require('express');
const pool = require('../pool')
const router = express.Router();
const multer = require('../utils/multer.js')
const delFile = require('../utils/delFile.js')

// 后台管理员管理接口

// 获取管理员信息
router.get('/getAdminInfo', function (req, res, next) {
  let { admin_id } = req.query
  pool.query(`select admin_id, admin_name, admin_phone, admin_email, admin_avatar from admins where admin_id = ?;`, [admin_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result[0] })
  })
})

// 修改管理员信息
router.post('/updateAdminInfo', function (req, res, next) {
  let { admin_id, admin_name, admin_phone, admin_email, admin_avatar } = req.body
  pool.query(`update admins set admin_name = ?, admin_phone = ?, admin_email = ?, admin_avatar = ? where admin_id = ?;`, [admin_name, admin_phone, admin_email, admin_avatar, admin_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '修改成功' })
  })
})

// 修改管理员密码
router.post('/updateAdminPwd', function (req, res, next) {
  let { admin_id, admin_pwd } = req.body
  pool.query(`update admins set admin_pwd = ? where admin_id = ?;`, [admin_pwd, admin_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '修改成功' })
  })
})

module.exports = router;