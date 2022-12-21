const express = require('express');
const pool = require('../pool')
const router = express.Router();

// 获取活动列表
router.get('/getActivityList', function (req, res, next) {
  let { type, pageCurrent, pageSize } = req.query

  pageCurrent = pageCurrent * 1 || 1  // 如果当前页码为空，则默认为1
  pageSize = pageSize * 1 || 6  // 如果每页数据量为空，则默认为6

  let current_time = Math.floor(Date.now() / 1000)
  let whereStr = ''

  if (type == 1) whereStr = `activity_start_time <= ${current_time} and activity_end_time >= ${current_time}`
  if (type == 2) whereStr = `activity_start_time > ${current_time}`
  if (type == 3) whereStr = `activity_end_time < ${current_time}`

  let str = `select * from activities ${whereStr ? 'where ' + whereStr : ''} limit ?, ?; select count(*) as total from activities ${whereStr ? 'where ' + whereStr : ''};`

  pool.query(str, [(pageCurrent - 1) * pageSize, pageSize], (err, result) => {
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
});

// 获取活动详情
router.get('/getActivityByAid', function (req, res, next) {
  let { activity_id } = req.query

  pool.query(`select * from activities where activity_id = ?`, [activity_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: '查询成功', data: result[0] });
  })
});

// 用户参加活动
router.post('/joinActivity', function (req, res, next) {
  let { activity_id, user_id } = req.body

  judge(activity_id, user_id, (result) => {
    if (result) { return res.send({ code: 400, ok: 1, msg: '您已参加本次活动, 请勿重复参加' }); }
    let obj = {
      user_id: user_id * 1,
      activity_id: activity_id * 1,
      join_time: Math.floor(Date.now() / 1000),
      is_use: 0
    }
    pool.query(`insert into joins set ?`, [obj], (error) => {
      if (error) return next(error)
      res.send({ code: 200, ok: 1, msg: '参加成功' });
    })
  })
});

// 判断用户是否已参加活动
function judge(activity_id, user_id, cb) {
  pool.query(`select * from joins where activity_id = ? and user_id = ?;`, [activity_id, user_id], (err, result) => {
    if (err) return next(err)
    cb(result.length)
  })
}

module.exports = router;