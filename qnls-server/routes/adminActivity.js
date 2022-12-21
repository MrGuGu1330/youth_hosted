const express = require('express');
const pool = require('../pool')
const router = express.Router();
const delFile = require('../utils/delFile.js')

// 后台活动管理接口

// 获取活动列表
router.get('/getActivityList', function (req, res, next) {
  let { activity_title, activity_start_time, activity_end_time, activity_face_to, pageCurrent, pageSize } = req.query

  pageCurrent = pageCurrent * 1 || 1  // 如果当前页码为空，则默认为1
  pageSize = pageSize * 1 || 10  // 如果每页数据量为空，则默认为10
  activity_title = `%${activity_title || ''}%`

  let selectStr = 'activity_id, activity_title, activity_start_time, activity_end_time, activity_discount, activity_face_to'
  let whereStr = 'activity_title like ?'
  let arr = [activity_title]

  if (activity_start_time) {
    whereStr += ' && activity_start_time > ?'
    arr.push(activity_start_time)
  }
  if (activity_end_time) {
    whereStr += ' && activity_end_time < ?'
    arr.push(activity_end_time)
  }
  if (activity_face_to == 0) whereStr += ' && activity_face_to = 0'
  if (activity_face_to == 1) whereStr += ' && activity_face_to = 1'

  let str = `select ${selectStr} from activities where ${whereStr} limit ?, ?;select count(*) as total from activities where ${whereStr};`

  pool.query(str, [...arr, (pageCurrent - 1) * pageSize, pageSize, ...arr], (err, result) => {
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

// 删除活动
router.post('/deleteActivity', function (req, res, next) {
  let { activity_id } = req.body

  pool.query(`select activity_cover, activity_content from activities where activity_id = ?;`, [activity_id], (e, r) => {
    if (e) return next(e)

    pool.query(`delete from activities where activity_id = ?;`, [activity_id], (err) => {
      if (err) return next(err)

      delImg(r[0].activity_cover, r[0].activity_content)
      res.send({ code: 200, ok: 1, msg: '删除成功' })
    })

  })
})
// 删除活动时删除图片
function delImg (cover, content) {
  let delArr = []

  delArr.push(cover)

  const imgReg = /<img.*?(?:>|\/>)/gi;
  let arr = content.match(imgReg);
  const srcReg = /src=[\\"]?([^\\"]*)[\\"]?/i;
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      let src = arr[i].match(srcReg)[1];
      delArr.push(src.split(":3000")[1]);
    }
  }

  delArr.forEach(item => {
    let str = ''
    if (item.lastIndexOf('/') > -1) str = item.substr(item.lastIndexOf('/') + 1)
    else str = item
    delFile('activity', str)
  })
}

// 新增活动
router.post('/addActivity', function (req, res, next) {
  let obj = req.body
  pool.query(`insert into activities set ?;`, [obj], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '添加成功' })
  })
})

// 获取活动详情
router.get('/getActivityDetail', function (req, res, next) {
  let { activity_id } = req.query

  pool.query(`select * from activities where activity_id = ?;`, [activity_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result[0] })
  })
})

// 修改活动
router.post('/updateActivity', function (req, res, next) {
  let { activity_id, activity_title, activity_cover, activity_start_time, activity_end_time, activity_content, activity_discount, activity_face_to } = req.body

  let updateStr = 'activity_title = ?, activity_cover = ?, activity_start_time = ?, activity_end_time = ?, activity_content = ?, activity_discount = ?, activity_face_to = ?'
  let str = `update activities set ${updateStr} where activity_id = ?;`

  pool.query(str, [activity_title, activity_cover, activity_start_time, activity_end_time, activity_content, activity_discount, activity_face_to, activity_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '修改成功' })
  })
})

module.exports = router;