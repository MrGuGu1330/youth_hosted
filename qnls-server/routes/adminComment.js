const express = require('express');
const pool = require('../pool')
const router = express.Router();

// 后台评论管理接口

// 获取评论列表 
router.get('/getCommentList', function (req, res, next) {
  let { user_name, supplier_name, comment_content, pageCurrent, pageSize } = req.query

  pageCurrent = pageCurrent * 1 || 1  // 如果当前页码为空，则默认为1
  pageSize = pageSize * 1 || 10  // 如果每页数据量为空，则默认为10
  user_name = `%${user_name || ''}%`
  supplier_name = `%${supplier_name || ''}%`
  comment_content = `%${comment_content || ''}%`

  let selectStr = 'c.comment_id, s.supplier_name, u.user_name, c.comment_content, c.comment_score, c.comment_time'
  let fromStr = 'comments as c, suppliers as s, users as u'
  let whereStr = 'c.user_id = u.user_id && c.supplier_id = s.supplier_id && u.user_name like ? && s.supplier_name like ? && c.comment_content like ?'
  let str = `select ${selectStr} from ${fromStr} where ${whereStr} limit ?, ?; select count(*) as total from ${fromStr} where ${whereStr};`
  let arr = [user_name, supplier_name, comment_content]

  // let sql = "SELECT count(1) FROM comments c left join users u on c.user_id=u.user_id left join suppliers s on c.supplier_id=s.supplier_id where 1=1 ";

  // if (username && username != "") {
  //   sql += "and u.user_name like '%" + username + "%' ";
  // }
  // if (commentname && commentname != "") {
  //   sql += "and s.supplier_name like '%" + commentname + "%' ";
  // }
  // let query_sql = sql.replace("count(1)", "u.user_name,s.supplier_name,c.*") + " limit " + (pageCurrent - 1) * pageSize + ", " + pageSize + ";" + sql;
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
});

// 删除用户评论
router.post('/deleteComment', function (req, res, next) {
  let { comment_id } = req.body

  pool.query(`delete from comments where comment_id = ?;`, [comment_id], (err, result) => {
    if (err) return next(err)
    res.send({ code: 200, ok: 1, msg: "删除评论成功" })
  })
})

module.exports = router;