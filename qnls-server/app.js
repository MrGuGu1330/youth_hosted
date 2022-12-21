const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const createError = require('http-errors');
const path = require('path');
const JWT = require('./utils/JWT');

// 引入接口模块
// 登录
const loginRouter = require('./routes/login');
// 图片上传
const uploadRouter = require('./routes/upload');

// 前台
// 首页
const indexRouter = require('./routes/index');
// 在线预定
const bookingRouter = require('./routes/booking');
// 会员卡
const vipRouter = require('./routes/vip');
// 最新活动
const activityRouter = require('./routes/activity');
// 关于我们
const aboutRouter = require('./routes/about');
// 用户个人中心
const usersRouter = require('./routes/users');
// 旅店个人中心
const suppliersRouter = require('./routes/suppliers');

// 后台
// 后台首页
const adminIndexRouter = require('./routes/adminIndex');
// 后台旅店管理
const adminSupplierRouter = require('./routes/adminSupplier');
// 后台房型管理
const adminHouseRouter = require('./routes/adminHouse');
// 后台用户管理
const adminUserRouter = require('./routes/adminUser');
// 后台订单管理
const adminOrderRouter = require('./routes/adminOrder');
// 后台评论管理
const adminCommentRouter = require('./routes/adminComment');
// 后台活动管理
const adminActivityRouter = require('./routes/adminActivity');
// 后台关于我们
const adminAboutRouter = require('./routes/adminAbout');
// 后台管理员
const adminRouter = require('./routes/admin');

// 创建express服务器
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 设置跨域
app.use(cors())

// 配置全局拦截,定义拦截验证token
app.use((req, res, next) => {
  let url = req.url.split('/')[1]
  // console.log(req.url.split('/')[1])

  // 如果请求的是登录接口则放行
  if (req.url.includes("login")) {
    next();
    return;
  }
  // 获取token信息
  let token = req.headers.token?.split(" ")[1];

  // 如果存在token,  则判断token, 否则继续
  if (token) {
    // 解密token
    let payload = JWT.verify(token);
    // 如果token未过期, 则生成新的token并继续, 否则判断请求接口是否为用户和旅店, 是则返回token过期提醒, 否则继续
    if (payload) {
      let token = JWT.generate(
        {
          username: payload.username,
        },
        "3h"
      );
      res.setHeader("Access-Control-Expose-Headers", "Authorization")
      res.header("Authorization", token);
      next();
    } else if (url == 'users' || url == "suppliers" || url.includes('admin')) {
      res.status(401).send({ errInof: "token过期", ok: 0 });
    } else {
      next()
    }
  } else {
    next();
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));

// 登录
app.use('/login', loginRouter);
// 图片上传
app.use('/upload', uploadRouter);
// 前台
app.use('/', indexRouter);
app.use('/booking', bookingRouter);
app.use('/vip', vipRouter);
app.use('/activity', activityRouter);
app.use('/about', aboutRouter);
app.use('/users', usersRouter);
app.use('/suppliers', suppliersRouter);
// 后台
app.use('/adminIndex', adminIndexRouter);
app.use('/adminSupplier', adminSupplierRouter);
app.use('/adminHouse', adminHouseRouter);
app.use('/adminUser', adminUserRouter);
app.use('/adminOrder', adminOrderRouter);
app.use('/adminComment', adminCommentRouter);
app.use('/adminActivity', adminActivityRouter);
app.use('/adminAbout', adminAboutRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;