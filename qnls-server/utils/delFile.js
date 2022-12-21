const fs = require('fs').promises
function delFile (fileDir, fileName) {
  return fs.unlink(`assets/imgs/${fileDir}/${fileName}`).catch(err => err)
}

module.exports = delFile