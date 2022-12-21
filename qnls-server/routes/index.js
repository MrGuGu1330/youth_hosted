const express = require('express');
const pool = require('../pool')
const router = express.Router();

// 旅店加盟
router.post('/addSupplier', function (req, res, next) {
  let obj = {
    ...req.body,
    supplier_pwd: '111111',
    supplier_avatar: '',
    is_agree: 0,
  }

  pool.query(`insert into suppliers set ?;`, [obj], (err, result) => {
    if (err) return next(err)

    res.send({ code: 200, ok: 1, msg: '已申请' })
  })
})

module.exports = router;
