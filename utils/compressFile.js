const compressing = require('compressing')
const spinner = require('../utils/spinner.js')
const { defaultZipPath, defaultBackupsPath } = require('../config/config.js')
const { join } = require('path')

module.exports = ({ filePath, folderName, zipPath = defaultZipPath }) => {
  return new Promise((resolve, reject) => {
    compressing.zip
      .compressDir(filePath, join(zipPath, './' + folderName + '.zip'))
      .then(() => {
        spinner.stopAndPersist({
          symbol: '√',
          text: '压缩成功！' + join(zipPath, './' + folderName + '.zip'),
        })
        resolve(folderName + '.zip')
      })
      .catch((err) => {
        spinner.stopAndPersist({
          symbol: '×',
          text: '压缩失败',
        })
        reject(err)
      })
  })
}
