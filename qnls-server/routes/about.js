const express = require('express');
const pool = require('../pool')
const router = express.Router();

// 获取关于我们详情
router.get('/getAboutsList', function (req, res, next) {
  pool.query(`select * from abouts;`, (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result });
  })
});

module.exports = router;