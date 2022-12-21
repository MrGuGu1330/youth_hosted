// 封装token的方法
const jwt = require('jsonwebtoken')
const secret = 'youthhostedtoken'

const JWT = {
  // 解析jwt.sign(加密数据，secret(秘钥),{expiresIn: '3s'  过期的时间})

  /**
   * 
   * @param {*} value 
   * @param {*} expires 
   * @returns 
   */
  generate (value, expires) {
    return jwt.sign(
      { data: value }, secret, { expiresIn: expires }
    );
  },

  /**
   * 
   * @param {*} token 
   * @returns 
   */
  verify (token) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return false
    }
  }
}

module.exports = JWT

