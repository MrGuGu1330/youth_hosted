const express = require('express');
const pool = require('../pool')
const router = express.Router();
const delFile = require('../utils/delFile.js')

// 后台房型管理接口

// 获取房型列表
router.get('/getHouseList', function (req, res, next) {
  let { house_name, supplier_name, pageCurrent, pageSize } = req.query

  pageCurrent = pageCurrent * 1 || 1  // 如果当前页码为空，则默认为1
  pageSize = pageSize * 1 || 10  // 如果每页数据量为空，则默认为10
  house_name = `%${house_name || ''}%`
  supplier_name = `%${supplier_name || ''}%`

  let selectStr = 'h.house_id, h.house_name, h.house_intro, h.house_price, s.supplier_name'
  let fromStr = 'houses as h, suppliers as s'
  let whereStr = 'h.supplier_id = s.supplier_id && h.house_name like ? && s.supplier_name like ?'
  let str = `select ${selectStr} from ${fromStr} where ${whereStr} limit ?, ?; select count(*) as total from ${fromStr} where ${whereStr};`

  pool.query(str, [house_name, supplier_name, (pageCurrent - 1) * pageSize, pageSize, house_name, supplier_name], (err, result) => {
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
        data: result[0]
      }
    );
  })
})

// 删除房型
router.post('/deleteHouse', function (req, res, next) {
  let { house_id } = req.body

  pool.query(`select house_imgs from houses where house_id = ?;`, [house_id], (e, r) => {
    if (e) return next(e)

    pool.query(`delete from houses where house_id = ?;`, [house_id], (err, result) => {
      if (err) return next(err)
      res.send({ code: 200, ok: 1, msg: "删除成功" })

      r[0].house_imgs.split(',').forEach(item => {
        let str = ''
        if (item.lastIndexOf('/') > -1) str = item.substr(item.lastIndexOf('/') + 1)
        else str = item
        delFile('houses', str)
      })

    })

  })
})

// 获取房型详情
router.get('/getHouseDetail', function (req, res, next) {
  let { house_id } = req.query

  pool.query(`select * from houses where house_id = ?;`, [house_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result[0] })
  })
})

module.exports = router;