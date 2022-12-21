const express = require('express');
const pool = require('../pool')
const router = express.Router();
const delFile = require('../utils/delFile.js')

// 后台用户管理接口

// 获取用户信息
router.get('/getUserList', function (req, res, next) {
  let { pageCurrent, pageSize, user_name, isvip } = req.query

  pageCurrent = pageCurrent * 1 || 1  // 如果当前页码为空，则默认为1
  pageSize = pageSize * 1 || 10  // 如果每页数据量为空，则默认为10
  user_name = `%${user_name || ''}%`

  let selectStr = 'user_id, user_name, user_phone, user_email, register_time, vip_expire_time, user_avatar'
  let whereStr = 'user_name like ?'
  let time = Math.floor(Date.now() / 1000)
  if (isvip == 0) whereStr += ` && vip_expire_time <= ${time}`
  if (isvip == 1) whereStr += ` && vip_expire_time > ${time}`
  let str = `select ${selectStr} from users where ${whereStr} limit ?, ?;select count(*) as total from users where ${whereStr};`

  pool.query(str, [user_name, (pageCurrent - 1) * pageSize, pageSize, user_name], (err, result) => {
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

// 删除用户信息
router.post('/deleteUser', function (req, res, next) {
  let { user_id } = req.body

  pool.query(`select user_avatar from users where user_id = ?;`, [user_id], (e, r) => {
    if (e) return next(e)

    r[0].user_avatar.split(',').forEach(item => {
      let str = ''
      if (item.lastIndexOf('/') > -1) str = item.substr(item.lastIndexOf('/') + 1)
      else str = item

      delFile('avatar', str)
    })

    pool.query(`delete from users where user_id = ?;`, [user_id], (err) => {
      if (err) return next(err)
      res.send({ code: 200, ok: 1, msg: '删除成功' });
    })
  })

});


module.exports = router;