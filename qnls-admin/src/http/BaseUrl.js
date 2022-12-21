// 当前文件用于封装请求路径的前缀
// 两套环境：DEV: DEVELOPMENT 开发环境
//          PRO: PRODUCTION  生产环境
const URLENV = {
  DEV: {   // 封装开发环境下的路径前缀
    BMDURL: 'http://127.0.0.1:3000',
    // BMDURL: 'http://120.26.36.21:3000',
    UPLOADURL: 'http://127.0.0.1:3000'
    // UPLOADURL: 'http://120.26.36.21:3000'
  },
  PRO: {   // 封装生产环境下的路径前缀
    BMDURL: 'https://web.codeboy.com/bmdapi',
    UPLOADURL: 'https://web.codeboy.com/bmduploadapi'
  }
}

export default URLENV.DEV;
