const express = require('express');
const pool = require('../pool')
const router = express.Router();
const delFile = require('../utils/delFile.js')
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

// 后台旅店管理接口

// 获取旅店列表
router.get('/getSupplierList', function (req, res, next) {
  let { supplier_name, supplier_address, is_agree, pageCurrent, pageSize } = req.query

  pageCurrent = pageCurrent * 1 || 1  // 如果当前页码为空，则默认为1
  pageSize = pageSize * 1 || 10  // 如果每页数据量为空，则默认为10
  supplier_name = `%${supplier_name || ''}%`
  supplier_address = `%${supplier_address || ''}%`

  let selectStr = 'supplier_id, supplier_name, supplier_phone, supplier_email, supplier_address, min_price, is_agree'
  let whereStr = 'supplier_name like ? && supplier_address like ?'

  if (is_agree == 0) whereStr += ' && is_agree = 0'
  if (is_agree == 1) whereStr += ' && is_agree = 1'

  let str = `select ${selectStr} from suppliers where ${whereStr} limit ?, ?; select count(*) as total from suppliers where ${whereStr};`

  pool.query(str, [supplier_name, supplier_address, (pageCurrent - 1) * pageSize, pageSize, supplier_name, supplier_address], (err, result) => {
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

// 修改加盟状态
router.post('/updateSupplierAgree', function (req, res, next) {
  let { supplier_id, is_agree } = req.body

  // if (is_agree != 0 || is_agree != 1) return res.send({ code: 400, ok: 1, msg: 'is_agree参数值错误' })

  pool.query(`update suppliers set is_agree = ? where supplier_id = ?;`, [is_agree, supplier_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '修改成功' })
  })
})

// 获取旅店详情
router.get('/getSupplierDetail', function (req, res, next) {
  let { supplier_id } = req.query

  let selectStr = 'supplier_id, supplier_name, supplier_phone, supplier_email, supplier_address, supplier_intro, min_price, supplier_imgs, is_agree'
  let str = `select ${selectStr} from suppliers where supplier_id = ?;`

  pool.query(str, [supplier_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result[0] })
  })
})
// 获取旅店设施详情
router.get('/getFacilities', function (req, res, next) {
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

// 删除旅店
router.post('/deleteSupplier', function (req, res, next) {
  let { supplier_id } = req.body

  pool.query(`select supplier_avatar, supplier_imgs from suppliers where supplier_id = ?;`, [supplier_id], (e, r) => {
    if (e) return next(e)

    pool.query(`delete from suppliers where supplier_id = ?;`, [supplier_id], (err) => {
      if (err) return next(err)
      res.send({ code: 200, ok: 1, msg: "删除成功" })

      let supplier_avatar = r[0].supplier_avatar.substr(r[0].supplier_avatar.lastIndexOf('/') + 1)
      delFile('avatar', supplier_avatar)

      let supplier_imgs = r[0].supplier_imgs.substr(r[0].supplier_imgs.lastIndexOf('/') + 1)
      delFile('suppliers', supplier_imgs)

      delImgs(supplier_id)

    })

  })
})

function delImgs (supplier_id) {
  pool.query(`select house_imgs from houses where supplier_id = ?;`, [supplier_id], (err, result) => {
    if (result.length) {
      result.forEach(house => {
        let house_imgs = house.house_imgs
        house_imgs.split(',').forEach(item => {
          let str = ''
          if (item.lastIndexOf('/') > -1) str = item.substr(item.lastIndexOf('/') + 1)
          else str = item
          delFile('houses', str)
        })
      })
    }
  })
}

module.exports = router;