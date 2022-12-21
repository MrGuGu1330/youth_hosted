const express = require('express');
const axios = require('axios')
const router = express.Router();
const pool = require('../pool')
const alipaySdk = require('../utils/alipay')
const AlipayFormData = require('alipay-sdk/lib/form').default

// 获取vip占比
router.get('/getVipPercent', function (req, res, next) {
  let current_time = Math.floor(Date.now() / 1000)

  pool.query(`select count(*) as vip_total from users where vip_expire_time > ${current_time}; select count(*) as total from users;`, (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '查询成功', data: { vip_total: result[0][0].vip_total, total: result[1][0].total } });
  })
});

// 判断是否是会员
router.get('/judgeVIP', function (req, res, next) {
  let { user_id } = req.query

  pool.query(`select * from users where user_id = ?;`, [user_id], (err, result) => {
    if (err) return next(err)
    let current_time = Math.floor(Date.now() / 1000)
    res.send({ code: 200, ok: 1, msg: '查询成功', data: { isvip: result[0].vip_expire_time > current_time ? 1 : 0 } })
  })
});

// 开通会员
router.post('/becomeVIP', function (req, res, next) {
  let { user_id, order_id, order_price } = req.body

  // 将订单放入会员订单记录表
  let obj = {
    order_id: order_id,
    user_id: user_id,
    time: Math.floor(Date.now() / 1000),
  }
  pool.query(`insert into viporders set ?`, [obj], (err) => {
    if (err) return next(err)
  })

  const formData = new AlipayFormData()
  formData.setMethod('get')
  formData.addField('returnUrl', 'http://localhost:8080/vipPayResult');
  formData.addField('bizContent', {
    outTradeNo: order_id,
    productCode: 'FAST_INSTANT_TRADE_PAY',
    totalAmount: order_price,
    subject: '开通会员',
    body: '无',
  })

  const result = alipaySdk.exec(
    'alipay.trade.page.pay',
    {},
    { formData: formData }
  )

  result.then(resp => {
    res.send({ code: 200, ok: 1, result: resp })
  })
});

// 开通会员结果
router.post('/vipPayResult', function (req, res, next) {
  let { out_trade_no, trade_no, user_id } = req.body

  const formData = new AlipayFormData()
  formData.setMethod('get')
  formData.addField('bizContent', {
    out_trade_no,
    trade_no
  })

  const result = alipaySdk.exec(
    'alipay.trade.query',
    {},
    { formData: formData }
  )

  result.then(resData => {
    axios({
      url: resData,
      method: 'get'
    }).then(data => {
      let r = data.data.alipay_trade_query_response;
      if (r.code == '10000') {
        let time = Math.floor((Date.now() + 31536000000) / 1000)
        pool.query(`update users set vip_expire_time=? where user_id = ?;`, [time, user_id])
        res.send({ code: 200, msg: '交易成功' })
      } else if (r.code == '40004') {
        pool.query('delete from viporders where order_id=?', [out_trade_no])
        res.send({ code: 400, msg: '交易不存在' })
      }
    }).catch(err => {
      res.send({ code: 400, msg: '查询失败', err })
    })
  })
})

module.exports = router;