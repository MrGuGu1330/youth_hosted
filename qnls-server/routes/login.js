const express = require('express');
const pool = require('../pool')
const router = express.Router();
const JWT = require('../utils/JWT.js')


// 前台登录
router.post('/userLogin', function (req, res, next) {
  let { phone, password, type } = req.body
  let str = ''
  if (type == 1) str = `select user_id as id, user_name as name, user_avatar as avatar from users where user_phone = ? && user_pwd = ?;`
  if (type == 2) str = `select supplier_id as id, supplier_name as name, supplier_avatar as avatar, is_agree from suppliers where supplier_phone = ? && supplier_pwd = ?;`

  pool.query(str, [phone, password], (err, result) => {
    if (err) return next(err)
    if (!result.length) {
      res.send({ code: 400, ok: 1, msg: '手机号或密码错误' })
    } else {
      if (type == 1) {
        let username = result[0].name
        let token = JWT.generate({ username }, '3h')

        res.header('Authorization', token) //请求头中带上这个字段
        res.setHeader('Access-Control-Expose-Headers', 'Authorization')

        res.send({ code: 200, ok: 1, msg: '登录成功', data: result[0], type })
      } else {
        if (result[0].is_agree == 1) {
          let username = result[0].name
          let token = JWT.generate({ username }, '3h')

          res.header('Authorization', token) //请求头中带上这个字段
          res.setHeader('Access-Control-Expose-Headers', 'Authorization')

          res.send({ code: 200, ok: 1, msg: '登录成功', data: { id: result[0].id, name: result[0].name, avatar: result[0].avatar }, type })
        } else {
          res.send({ code: 405, ok: 1, msg: '未加盟' })
        }
      }
    }
  })
});

// 后台登录
router.post('/adminLogin', function (req, res, next) {
  let { username, password } = req.body

  pool.query(`select admin_id as id, admin_name as username, admin_avatar as avatar from admins where admin_name = ? && admin_pwd = ?;`, [username, password], (err, result) => {
    if (err) return next(err)
    if (!result.length) {
      res.send({ code: 400, ok: 1, msg: '用户名或密码错误' })
    } else {
      let token = JWT.generate({ username }, '3h')

      res.header('Authorization', token)
      res.setHeader('Access-Control-Expose-Headers', 'Authorization')

      res.send({ code: 200, ok: 1, msg: '登录成功', data: result[0], token })
    }
  })
});

// 前台注册
router.post('/userRegister', function (req, res, next) {
  let { user_name, user_phone, user_pwd } = req.body
  let obj = {
    user_name,
    user_pwd,
    user_phone,
    user_email: '',
    register_time: Math.floor(Date.now() / 1000),
    vip_expire_time: 0,
    user_avatar: ''
  }

  judgePhone(user_phone, (result) => {
    if (result) return res.send({ code: 400, ok: 1, msg: '该手机号已存在' })
    else {
      pool.query(`insert into users set ?;`, [obj], (err) => {
        if (err) return next(err)
        pool.query(`select user_id as id, user_name as name, user_avatar as avatar from users where user_phone = ? && user_pwd = ?;`, [user_phone, user_pwd], (e, r) => {
          if (e) return next(e)

          let username = r[0].name
          let token = JWT.generate({ username }, '3h')

          res.header('Authorization', token) //请求头中带上这个字段
          res.setHeader('Access-Control-Expose-Headers', 'Authorization')

          res.send({ code: 200, ok: 1, msg: '注册成功', data: r[0], type: 1 })
        })
      })
    }
  })
})

// 判断手机号是否已存在
function judgePhone(user_phone, cb) {
  pool.query(`select * from users where user_phone = ?;`, [user_phone], (err, result) => {
    if (err) return next(err)
    cb(result.length)
  })
}

// // 验证码
// var count_num = 0
// var verification_arr = []
// setInterval(() => {
//   verification_arr = verification_arr.filter((item) => {
//     return item.oldUserTime > Date.now()
//   })
// }, 1000)


// // 访问这个借口的时候返回验证码
// router.get('/VerificationCode', function (req, res, next) {
//   phone = req.query.phoneNumber
//   count_num++
//   let code = Math.floor(Math.random() * 9000 + 1000)
//   verification_arr.push({
//     'id_count': count_num,
//     'oldUserTime': Date.now() + 300000,
//     'code': code
//   })

//   console.log(verification_arr);
//   // 阿里云验证码
//   const Core = require('@alicloud/pop-core');
//   // let code = Math.floor(Math.random() * 9000 + 1000)

//   var client = new Core({
//     accessKeyId: 'LTAI5tK71m6wK1Nv2duE2fqq',
//     accessKeySecret: 'MHcjjflao8Bb2n6CE3rxqfl5rf2Odz',
//     // securityToken: '<your-sts-token>', // use STS Token
//     endpoint: 'https://dysmsapi.aliyuncs.com',
//     apiVersion: '2017-05-25'
//   });

//   var params = {
//     "SignName": "阿里云短信测试",
//     "TemplateCode": "SMS_154950909",
//     "PhoneNumbers": phone,
//     "TemplateParam": `{"code":${code}}`
//   }

//   var requestOption = {
//     method: 'POST',
//     formatParams: false,
//   };

//   client.request('SendSms', params, requestOption).then((result) => {
//     console.log(JSON.stringify(result));
//   }, (ex) => {
//     console.log(ex);
//   })

//   // 返回数据给前端
//   res.send({ code, count_num })
// })



// // 判断注册时候用户是否已存在
// router.post('/userRegister', function (req, res, next) {
//   let { uname, upwd, uphone, uid } = req.body
//   pool.query(`select * from users where uphone=?`, [uphone], (err, result) => {
//     if (err) return next(err)

//     console.log(verification_arr);
//     // 第一关：用户是否存在，存在时直接杀了函数
//     if (result.length) {
//       return res.send({
//         code: 400,
//         msg: '手机号已存在',
//         ok: 0
//       })
//     };

//     // 第二关：判断验证码存在以判断是否过期
//     var isverification = false
//     for (let i = 0; i < verification_arr.length; i++) {
//       if (verification_arr[i].id_count == uid) {
//         isverification = true
//       }
//     }

//     if (!isverification) return res.send({ msg: '验证码过期了，亲' })


//     // 注册成功插入值，返回值
//     pool.query(`insert into users values(?, ?, ?, ?, ?,?,?,?,?)`, [null, uname, upwd, uphone, null, '0', Date.now(), '0', null], (err, r) => {
//       if (err) throw err
//       // console.log(r)
//       // console.log(result)

//       // 返回Token
//       let username = uname
//       let token = JWT.generate({ username }, '10h')
//       res.header('Authorization', token) //请求头中带上这个字段
//       res.setHeader('Access-Control-Expose-Headers', 'Authorization')

//       // 返回值
//       res.send({ code: 200, msg: '注册成功', data: r, ok: 1 })
//     });

//   })
// })

module.exports = router;