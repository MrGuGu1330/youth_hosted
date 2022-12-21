const express = require('express')
const axios = require('axios')
const router = express.Router()
const pool = require('../pool')
const alipaySdk = require('../utils/alipay')
const AlipayFormData = require('alipay-sdk/lib/form').default

const faci = {
  leisure: '休闲和健身',
  network: '网络设施',
  restaurant: '餐饮',
  provide: '旅社提供',
  scenic: '景点、旅游设施',
  service: '旅社提供的服务',
  easy: '便利设施',
  motion: '运动/活动',
  wheelchair: '无障碍设施',
}

// 通过目的地获取旅店列表
router.get('/getSuppliersBuyAddr', function (req, res, next) {
  let { supplier_address, pageCurrent, pageSize } = req.query

  supplier_address = `%${supplier_address || ''}%`
  pageCurrent = pageCurrent * 1 || 1  // 如果当前页码为空，则默认为1
  pageSize = pageSize * 1 || 10  // 如果每页数据量为空，则默认为10

  let selectStr = 'supplier_id, supplier_name, supplier_phone, supplier_email, supplier_address, supplier_intro, min_price, supplier_imgs'
  let fromStr = 'suppliers'
  let whereStr = 'is_agree = 1 && supplier_address like ?'
  let str = `select ${selectStr} from ${fromStr} where ${whereStr} limit ?,?; select count(*) as total from ${fromStr} where ${whereStr};`

  pool.query(str, [supplier_address, (pageCurrent - 1) * pageSize, pageSize, supplier_address], (err, result) => {
    if (err) return next(err)
    let total = result[1][0].total  // 拿到总数据量
    let pageCount = Math.ceil(total / pageSize)  // 计算总页数
    res.send(
      {
        code: 200,
        ok: 1,
        msg: '查询成功',
        pageCurrent,  // 当前页码
        pageSize,  // 每页数据量
        pageCount,  // 总页数
        total,  // 总数据量
        data: result[0],
      }
    );
  })
});

// 获取旅店详情
router.get('/getSupplierInfo', function (req, res, next) {
  let { supplier_id } = req.query

  let selectStr = 'supplier_id, supplier_name, supplier_phone, supplier_email, supplier_address, supplier_intro, min_price, supplier_imgs'
  let str = `select ${selectStr} from suppliers where supplier_id = ?;`

  pool.query(str, [supplier_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result[0] })
  })
})

// 获取旅店设施详情
router.get('/getFacilitiesBuySid', function (req, res, next) {
  let { supplier_id } = req.query

  pool.query(`select * from facilities where supplier_id = ?;`, [supplier_id], (err, result) => {
    if (err) return next(err)
    let arr = []
    for (let key in result[0]) {
      if (faci[key]) {
        let obj = { title: faci[key], field: key, tags: result[0][key] ? result[0][key].split(',') : [] }
        arr.push(obj)
      }
    }
    res.send({ code: 200, ok: 1, msg: '查询成功', data: arr })
  })
});

// 获取旅店的房型列表
router.get('/getHousesBuySid', function (req, res, next) {
  let { supplier_id } = req.query

  pool.query(`select * from houses where supplier_id = ?;`, [supplier_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result });
  })
});

// 获取旅店的评论列表
router.get('/getCommentsBuySid', function (req, res, next) {
  let { supplier_id } = req.query

  let selectStr = 'c.comment_id, c.comment_content, c.comment_score, c.comment_time, u.user_name, u.user_avatar'
  let fromStr = 'comments as c, users as u'
  let whereStr = 'c.user_id = u.user_id && c.supplier_id = ?'
  let str = `select ${selectStr} from ${fromStr} where ${whereStr};`

  pool.query(str, [supplier_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result });
  })
});

// 获取用户可使用的最佳优惠活动
router.get('/getUserCanUseActivity', function (req, res, next) {
  let { user_id } = req.query

  let current_time = Math.floor(Date.now() / 1000)

  // 查询用户参加的、未使用的、正在进行的活动, 并按照活动折扣力度排序
  let selectStr = 'j.join_id, a.activity_title, a.activity_discount'
  let fromStr = 'joins as j, activities as a'
  let whereStr = `j.activity_id = a.activity_id && j.is_use = 0 && a.activity_start_time < ${current_time} && a.activity_end_time > ${current_time} && j.user_id = ?`
  let str = `select ${selectStr} from ${fromStr} where ${whereStr} order by a.activity_discount asc;`

  pool.query(str, [user_id], (err, result) => {
    if (err) return next(err)
    if (!result.length) return res.send({ code: 200, ok: 1, msg: '暂无可使用的优惠活动', data: {} });
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result[0] });
  })
});

// 预订房间
router.post('/bookingHouses', function (req, res, next) {
  let { order_id, order_price, order_orgin_price, user_id, supplier_id, join_id, is_vip, user_name, user_email, user_phone, house_list } = req.body

  // 将订单放入订单记录表
  let baseObj = {
    order_id,
    order_price,
    order_orgin_price,
    user_id,
    supplier_id,
    join_id: join_id ? join_id : 0,
    is_vip: is_vip ? is_vip : 0,
    user_name,
    user_email,
    user_phone,
    is_comment: 0
  }
  pool.query(`insert into orders set ?`, [baseObj], (err) => {
    if (err) return next(err)
  })

  if (join_id) {
    pool.query(`update joins set is_use = 1, order_id = ? where join_id = ?`, [order_id, join_id], (err) => {
      if (err) return next(err)
    })
  }

  for (let i in house_list) {
    let obj = {
      order_id,
      ...house_list[i]
    }
    pool.query(`insert into minorders set ?`, [obj], (err) => {
      if (err) return next(err)
    })
  }

  const formData = new AlipayFormData()
  formData.setMethod('get')
  formData.addField('returnUrl', 'http://localhost:8080/bookingPayResult');
  formData.addField('bizContent', {
    outTradeNo: order_id,
    productCode: 'FAST_INSTANT_TRADE_PAY',
    totalAmount: order_price,
    subject: '预定房间',
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

// 预订房间结果
router.post('/bookingPayResult', function (req, res, next) {
  let { out_trade_no, trade_no } = req.body

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
        res.send({ code: 200, msg: '交易成功' })
      } else if (r.code == '40004') {
        pool.query('delete from orders where order_id = ?', [out_trade_no])
        pool.query('delete from minorders where order_id = ?', [out_trade_no])
        pool.query('update joins set is_use = 0 && order_id = 0 where order_id = ?', [out_trade_no])
        res.send({ code: 400, msg: '交易不存在' })
      }
    }).catch(err => {
      res.send({ code: 400, msg: '查询失败', err })
    })
  })
})

module.exports = router;