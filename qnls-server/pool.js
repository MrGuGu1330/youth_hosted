// 引入mysql模块
const mysql = require('mysql')
// 创建连接池对象
const pool = mysql.createPool({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '',
  database: 'youth_hosted',
  connectionLimit: 15,
  multipleStatements: true
})
// 暴露连接池对象
module.exports = pool
