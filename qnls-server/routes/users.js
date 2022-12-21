const express = require('express');
const pool = require('../pool')
const router = express.Router();
const multer = require('../utils/multer.js')
const delFile = require('../utils/delFile.js')

// 获取用户信息
router.get('/getUserInfo', function (req, res, next) {
  let { user_id } = req.query

  let selectStr = 'user_id, user_name, user_phone, user_email, user_avatar, vip_expire_time'
  let str = `select ${selectStr} from users where user_id = ?;`

  pool.query(str, [user_id], (err, result) => {
    if (err) return next(err)
    if (!result.length) return res.send({ code: 400, ok: 1, msg: '该用户不存在' })
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result[0] })
  })
});

// 修改用户信息
router.post('/updateUserInfo', function (req, res, next) {
  let { user_id, user_name, user_phone, user_email } = req.body

  pool.query(`update users set user_name = ?, user_phone = ?, user_email = ? where user_id = ?;`, [user_name, user_phone, user_email, user_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '修改成功' })
  })
});

// 修改用户密码
router.post('/updateUserPass', function (req, res, next) {
  let { user_id, user_pwd } = req.body

  pool.query(`update users set user_pwd = ? where user_id = ?;`, [user_pwd, user_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '修改成功' })
  })
});

// 修改用户头像
router.post('/updateAvatar', multer.uploadAvatar.single('avatar'), function (req, res, next) {
  let { old_avatar, user_id } = req.body

  let new_avatar = '/imgs/avatar/' + req.file.filename

  // 删除原头像
  old_avatar.split(',').forEach(item => {
    let str = ''
    if (item.lastIndexOf('/') > -1) str = item.substr(item.lastIndexOf('/') + 1)
    else str = item
    delFile('avatar', str)
  })

  pool.query(`update users set user_avatar = ? where user_id = ?;`, [new_avatar, user_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '修改头像成功', data: { user_avatar: new_avatar } })
  })
});

// 查询用户订单列表
router.get('/getUserOrderByUid', function (req, res, next) {
  let { type, user_id, pageCurrent, pageSize } = req.query

  pageCurrent = pageCurrent * 1 || 1  // 如果当前页码为空，则默认为1
  pageSize = pageSize * 1 || 3  // 如果每页数据量为空，则默认为3

  let selectStr = 'o.id, o.order_id, o.order_price, o.order_orgin_price, s.supplier_id, s.supplier_name, o.join_id, o.is_vip, o.is_comment, o.user_name, o.user_phone, o.user_email'
  let fromStr = 'orders as o, suppliers as s'
  let whereStr = 'o.supplier_id = s.supplier_id && o.user_id = ?'

  if (type == 1) whereStr += ` && o.is_comment = 0`
  if (type == 2) whereStr += ` && o.is_comment = 1`

  let str = `select ${selectStr} from ${fromStr} where ${whereStr} limit ?, ?; select count(*) as total from ${fromStr} where ${whereStr};`

  pool.query(str, [user_id, (pageCurrent - 1) * pageSize, pageSize, user_id], (err, result) => {
    if (err) return next(err)
    let total = result[1][0].total  // 拿到总数据量
    let pageCount = Math.ceil(total / pageSize)  // 计算总页数
    res.send({
      code: 200,
      ok: 1,
      msg: '查询成功',
      pageCurrent,  // 当前页码
      pageSize,  // 每页数据量
      pageCount,  // 总页数
      total,  // 总数据量
      data: result[0]
    })
  })
})

// 查询用户订单详情
router.get('/getUserMinOrderByOrderId', function (req, res, next) {
  let { order_id } = req.query

  let selectStr1 = 'o.id, o.order_id, o.order_price, o.order_orgin_price, s.supplier_id, s.supplier_name, o.join_id, o.is_vip, o.is_comment, o.user_name, o.user_phone, o.user_email'
  let fromStr1 = 'orders as o, suppliers as s'
  let whereStr1 = 'o.supplier_id = s.supplier_id && o.order_id = ?'
  let str1 = `select ${selectStr1} from ${fromStr1} where ${whereStr1};`

  let selectStr2 = 'm.id, m.order_id, h.house_id, h.house_name, m.male, m.female, m.children, m.num, m.check_in, m.check_out, m.days, m.price, m.total_price'
  let fromStr2 = 'minorders as m, houses as h'
  let whereStr2 = 'm.house_id = h.house_id && m.order_id = ?'
  let str2 = `select ${selectStr2} from ${fromStr2} where ${whereStr2};`

  pool.query(str1 + str2, [order_id, order_id], (err, result) => {
    if (err) return next(err)
    let data = {
      order: {
        ...result[0][0]
      },
      minorder: [
        ...result[1]
      ]
    }
    res.send({ code: 200, ok: 1, msg: '请求成功', data })
  })
})

// 获取用户发表的评论列表
router.get('/getUserCommentByUid', function (req, res, next) {
  let { user_id, pageCurrent, pageSize } = req.query

  pageCurrent = pageCurrent * 1 || 1  // 如果当前页码为空，则默认为1
  pageSize = pageSize * 1 || 3  // 如果每页数据量为空，则默认为10

  let selectStr = 'c.comment_id, c.comment_score, c.comment_content, c.comment_time, c.order_id, s.supplier_id, s.supplier_name, s.supplier_imgs'
  let fromStr = 'comments as c, suppliers as s'
  let whereStr = 'c.supplier_id = s.supplier_id && c.user_id = ?'
  let str = `select ${selectStr} from ${fromStr} where ${whereStr} limit ?, ?; select count(*) as total from ${fromStr} where ${whereStr};`

  pool.query(str, [user_id, (pageCurrent - 1) * pageSize, pageSize, user_id], (err, result) => {
    if (err) return next(err)
    let total = result[1][0].total  // 拿到总数据量
    let pageCount = Math.ceil(total / pageSize)  // 计算总页数
    res.send({
      code: 200,
      ok: 1,
      msg: '查询成功',
      pageCurrent,  // 当前页码
      pageSize,  // 每页数据量
      pageCount,  // 总页数
      total,  // 总数据量
      data: result[0]
    })
  })
})

// 获取用户发表的评论详情
router.get('/getUserCommentInfoByCid', function (req, res, next) {
  let { comment_id } = req.query

  let selectStr = 'c.comment_id, c.comment_score, c.comment_content, c.comment_time, c.order_id, s.supplier_id, s.supplier_name, s.supplier_imgs'
  let fromStr = 'comments as c, suppliers as s'
  let whereStr = 'c.supplier_id = s.supplier_id && c.comment_id = ?'
  let str = `select ${selectStr} from ${fromStr} where ${whereStr};`

  pool.query(str, [comment_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result[0] })
  })
})

// 发表评论
router.post('/makeComment', function (req, res, next) {
  let { user_id, supplier_id, order_id, comment_score, comment_content } = req.body

  let obj = {
    user_id: user_id * 1,
    supplier_id: supplier_id * 1,
    comment_score: comment_score * 1,
    comment_content,
    comment_time: Math.floor(Date.now() / 1000),
    order_id
  }
  pool.query(`insert into comments set ?;`, [obj], (err, result) => {
    if (err) return next(err)

    // 将订单改为已评论
    pool.query(`update orders set is_comment = 1 where order_id = ?;`, [order_id])

    res.send({ code: 200, ok: 1, msg: '发表评论成功' })
  })
})

// 删除评论
router.post('/deleteComment', function (req, res, next) {
  let { comment_id } = req.body

  pool.query(`delete from comments where comment_id = ?;`, [comment_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: "删除评论成功" })
  })
})

// 获取用户参加的活动列表
router.get('/getUserJoinByUid', function (req, res, next) {
  let { type, user_id, pageCurrent, pageSize } = req.query

  pageCurrent = pageCurrent * 1 || 1  // 如果当前页码为空，则默认为1
  pageSize = pageSize * 1 || 4  // 如果每页数据量为空，则默认为10

  let time = Date.now() / 1000
  let selectStr = 'j.join_id, j.join_time, a.activity_id, a.activity_title'
  let fromStr = 'joins as j, activities as a'
  let whereStr = 'j.user_id = ? && j.activity_id = a.activity_id'

  if (type == 1) whereStr += ` && j.is_use = 0 && a.activity_start_time < ${time} && a.activity_end_time > ${time}`
  if (type == 2) whereStr += ` && j.is_use = 1`
  if (type == 3) whereStr += ` && j.is_use = 0 && a.activity_end_time < ${time}`

  let str = `select ${selectStr} from ${fromStr} where ${whereStr} limit ?, ?; select count(*) as total from ${fromStr} where ${whereStr};`

  pool.query(str, [user_id, (pageCurrent - 1) * pageSize, pageSize, user_id], (err, result) => {
    if (err) return next(err)
    let total = result[1][0].total  // 拿到总数据量
    let pageCount = Math.ceil(total / pageSize)  // 计算总页数
    res.send({
      code: 200,
      ok: 1,
      msg: '查询成功',
      pageCurrent,  // 当前页码
      pageSize,  // 每页数据量
      pageCount,  // 总页数
      total,  // 总数据量
      data: result[0]
    })
  })
})


module.exports = router;