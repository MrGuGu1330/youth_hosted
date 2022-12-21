const express = require('express');
const pool = require('../pool')
const router = express.Router();

// 后台首页接口

// 获取全部旅店数
router.get('/getSuplierCount', function (req, res, next) {
  pool.query(`select count(*) as total from suppliers;`, (err, result) => {
    if (err) return next(err)
    res.send({
      code: 200, ok: 1, msg: '查询成功', data: {
        total: result[0].total
      }
    })
  })
})

// 获取全部房型数
router.get('/getHouseCount', function (req, res, next) {
  pool.query(`select count(*) as total from houses;`, (err, result) => {
    if (err) return next(err)
    res.send({
      code: 200, ok: 1, msg: '查询成功', data: {
        total: result[0].total
      }
    })
  })
})

// 获取全部用户数
router.get('/getUserCount', function (req, res, next) {
  pool.query(`select count(*) as total from users;`, (err, result) => {
    if (err) return next(err)
    res.send({
      code: 200, ok: 1, msg: '查询成功', data: {
        total: result[0].total
      }
    })
  })
})

// 获取会员数和非会员数
router.get('/getVIPcount', function (req, res, next) {
  let current_time = Date.now() / 1000
  pool.query(`select count(*) as vip_total from users where vip_expire_time > ${current_time}; select count(*) as total from users;`, (err, result) => {
    if (err) return next(err)

    let data = [
      { value: result[0][0].vip_total, name: '会员' },
      { value: result[1][0].total - result[0][0].vip_total, name: '非会员' },
    ]

    res.send({ code: 200, ok: 1, msg: '查询成功', data });
  })
})

// 获取不同地区旅店数
router.get('/getSupplierInArea', function (req, res, next) {
  pool.query(`select supplier_address from suppliers;`, (err, result) => {
    if (err) return next(err)
    let obj = {}
    result.forEach(item => {
      let name = item.supplier_address.split('-')[0]
      if (obj[name]) obj[name]++
      else obj[name] = 1
    });

    let arr = []
    for (let name in obj) {
      arr.push({
        name,
        value: obj[name]
      })
    }
    res.send({ code: 200, ok: 1, msg: '查询成功', data: arr })
  })
})


module.exports = router;