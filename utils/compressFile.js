const compressing = require('compressing')
const spinner = require('../utils/spinner.js')
const { defaultZipPath } = require('../config/config.js')
module.exports = ({
  filePath,
  folderName,
  zipPath = defaultZipPath,
  callback = () => {}
}) => {
  spinner.text = '正在添加到备份列表...'
  spinner.start()
  compressing.zip
    .compressDir(filePath, zipPath + '/' + folderName + '.zip')
    .then(() => {
      spinner.stopAndPersist({
        symbol: '√',
        text: '压缩成功！'
      })
      callback(folderName + '.zip')
    })
    .catch(err => {
      spinner.stopAndPersist({
        symbol: '×',
        text: '压缩失败'
      })
      console.log('TCL: err', err)
    })
}
