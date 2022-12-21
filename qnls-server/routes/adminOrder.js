const express = require("express");
const pool = require("../pool");
const router = express.Router();

// 后台订单管理接口

//订单列表
router.get("/getOrderList", function (req, res, next) {
  let { user_name, order_id, pageCurrent, pageSize } = req.query;
  pageCurrent = pageCurrent * 1 || 1; //如果当前页码为空，则默认为1
  pageSize = pageSize * 1 || 10; // 如果当前没页数据量为空，则默认为5

  user_name = `%${user_name || ""}%`;
  order_id = `%${order_id || ""}%`;
  let formStr = `suppliers as s, orders as o`;
  let selectStr = `o.order_id, o.order_price, o.user_name, o.user_phone, s.supplier_name`;
  //`orders.{order_id，order_price，user_name，user_phone},m.check_in,m.check_out,suppliers.supplier_name
  let whereStr = `o.supplier_id = s.supplier_id && o.user_name like ? && o.order_id like ?`;

  let str = `select ${selectStr} from ${formStr} where ${whereStr} limit ?, ?; select count(*) as total from ${formStr} where ${whereStr};`;

  let arr = [user_name, order_id];

  pool.query(
    str,
    [...arr, (pageCurrent - 1) * pageSize, pageSize, ...arr],
    (err, result) => {
      if (err) return next(err);
      console.log(result);
      let total = result[1][0].total; // 拿到总数据量
      let pageCount = Math.ceil(total / pageSize); // 计算总页数
      res.send({
        code: 200,
        ok: 1,
        msg: "查询成功",
        pageCurrent, // 当前页码
        pageSize, // 每页数据量
        pageCount, // 总页数
        total, // 总数据量
        data: result[0],
      });
    }
  );
});

// 获取订单详情
router.get("/getOrderDetail", function (req, res, next) {
  let { order_id } = req.query;
  console.log(order_id);

  let str = `select *,house_name from minorders,houses where minorders.house_id = houses.house_id && order_id = ?; select order_price from orders where order_id = ?;`;

  pool.query(str, [order_id, order_id], (err, result) => {
    if (err) return next(err);
    console.log(result);
    res.send({ code: 200, ok: 1, msg: "查询成功", data: result });
  });
});

module.exports = router;
