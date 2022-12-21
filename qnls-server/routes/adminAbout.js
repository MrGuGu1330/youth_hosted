const express = require('express');
const pool = require('../pool')
const router = express.Router();

// 后台关于我们管理接口

// 获取关于我们列表
router.get('/getAboutList', function (req, res, next) {
  pool.query(`select * from abouts;`, (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result })
  })
})

// 获取关于我们详情
router.get('/getAboutDetail', function (req, res, next) {
  let { about_id } = req.query

  pool.query(`select * from abouts where about_id = ?;`, [about_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result[0] })
  })
})

// 修改关于我们
router.post('/updateAbout', function (req, res, next) {
  let { about_id, about_title, about_content, about_img } = req.body

  pool.query(`update abouts set about_title = ?, about_content = ?, about_img = ? where about_id = ?;`, [about_title, about_content, about_img, about_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '修改成功' })
  })
})

module.exports = router;