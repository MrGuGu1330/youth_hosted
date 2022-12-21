const express = require('express');
const pool = require('../pool')
const router = express.Router();
const multer = require('../utils/multer.js')
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

// 获取旅店信息
router.get('/getSupplierInfo', function (req, res, next) {
  let { supplier_id } = req.query

  let selectStr = 'supplier_id, supplier_name, supplier_phone, supplier_email, supplier_address, supplier_intro, min_price, supplier_imgs'
  let str = `select ${selectStr} from suppliers where supplier_id = ?;`

  pool.query(str, [supplier_id], (err, result) => {
    if (err) return next(err)
    if (!result.length) return res.send({ code: 400, ok: 1, msg: '该旅店不存在' })
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result[0] })
  })
});

// 修改旅店信息
router.post('/updateSupplierInfo', function (req, res, next) {
  let { supplier_id, supplier_name, supplier_phone, supplier_email, supplier_address, supplier_intro, min_price, supplier_imgs } = req.body

  let updateStr = 'supplier_name = ?, supplier_phone = ?, supplier_email = ?, supplier_address = ?, supplier_intro = ?, min_price = ?, supplier_imgs = ?'
  let str = `update suppliers set ${updateStr} where supplier_id = ?;`

  pool.query(str, [supplier_name, supplier_phone, supplier_email, supplier_address, supplier_intro, min_price, supplier_imgs, supplier_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '修改成功' })
  })
})

// 修改旅店头像
router.post('/updateSupplierAvatar', multer.uploadAvatar.single('avatar'), function (req, res, next) {
  let { old_avatar, supplier_id } = req.body

  let new_avatar = '/imgs/avatar/' + req.file.filename

  pool.query(`update suppliers set supplier_avatar = ? where supplier_id = ?;`, [new_avatar, supplier_id], (err, result) => {
    if (err) return next(err)

    old_avatar.split(',').forEach(item => {
      let str = ''
      if (item.lastIndexOf('/') > -1) str = item.substr(item.lastIndexOf('/') + 1)
      else str = item
      delFile('avatar', str)
    })

    res.send({ code: 200, ok: 1, msg: '修改头像成功', data: { supplier_avatar: new_avatar } })
  })
});

// 修改旅店密码
router.post('/updateSupplierPass', function (req, res, next) {
  let { supplier_id, supplier_pwd } = req.body

  pool.query(`update suppliers set supplier_pwd = ? where supplier_id = ?;`, [supplier_pwd, supplier_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '修改成功' })
  })
});

// 获取旅店设施详情
router.get('/getSupplierFacilities', function (req, res, next) {
  let { supplier_id } = req.query

  pool.query(`select * from facilities where supplier_id = ?;`, [supplier_id], (err, result) => {
    if (err) return next(err)
    if (!result.length) return res.send({ code: 200, ok: 1, msg: '暂无设施详情', data: {} })

    let obj = {}
    for (let key in result[0]) {
      if (faci[key]) {
        obj[key] = result[0][key] ? result[0][key].split(',') : []
      }
    }
    res.send({ code: 200, ok: 1, msg: '查询成功', data: obj })
  })
});

// 修改旅店设施
router.post('/updateSupplierFacilities', function (req, res, next) {
  let obj = req.body

  for (let i in obj) {
    if (i != 'supplier_id') obj[i] = obj[i].join(',')
  }

  pool.query(`select * from facilities where supplier_id = ?;`, [obj.supplier_id], (e, r) => {
    if (r.length) {
      pool.query(`update facilities set ? where supplier_id = ?;`, [obj, obj.supplier_id], (err, result) => {
        if (err) return next(err)
        res.send({ code: 200, ok: 1, msg: '修改成功' })
      })
    } else {
      pool.query(`insert into facilities set ?;`, [obj], (err, result) => {
        if (err) return next(err)
        res.send({ code: 200, ok: 1, msg: '修改成功' })
      })
    }
  })
})

// 获取旅店房型列表
router.get('/getSupplierHouses', function (req, res, next) {
  let { supplier_id, pageCurrent, pageSize } = req.query

  pageCurrent = pageCurrent * 1 || 1  // 如果当前页码为空，则默认为1
  pageSize = pageSize * 1 || 10  // 如果每页数据量为空，则默认为10

  pool.query(`select * from houses where supplier_id = ? limit ?, ?; select count(*) as total from houses where supplier_id = ?;`, [supplier_id, (pageCurrent - 1) * pageSize, pageSize, supplier_id], (err, result) => {
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

// 查看旅店房型详情 
router.get('/getHousesInfo', function (req, res, next) {
  let { house_id } = req.query

  pool.query(`select * from houses where house_id = ?;`, [house_id], (err, result) => {
    if (err) return next(err)
    if (!result.length) return res.send({ code: 400, ok: 1, msg: "该房型不存在" })
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result[0] })
  })
})

// 添加旅店房型
router.post('/addSupplierHouses', function (req, res, next) {
  let obj = req.body

  pool.query(`insert into houses set ?`, [obj], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '添加成功' })
  })
})

// 修改旅店房型
router.post('/updateSupplierHouses', function (req, res, next) {
  let { house_id, house_name, house_intro, house_detail, house_price, house_address, house_imgs } = req.body

  let updateStr = 'house_name = ?, house_intro = ?, house_detail = ?, house_price = ?, house_address = ?, house_imgs = ?'
  let str = `update houses set ${updateStr} where house_id = ?;`

  pool.query(str, [house_name, house_intro, house_detail, house_price, house_address, house_imgs, house_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '修改成功' })
  })
})

// 删除旅店房型
router.post('/deleteSupplierHouses', function (req, res, next) {
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

module.exports = router;