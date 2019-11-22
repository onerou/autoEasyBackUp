const shell = require('shelljs')
const moment = require('moment')
const spinner = require('../utils/spinner.js')
const { errorLog } = require('../utils/log.js')
const { defaultBackupsPath } = require('../config/config.js')
const compressFile = require('../utils/compressFile.js')
const ssh = require('../utils/ssh.js')
const uploadSsh = fileName => {
  ssh({
    host: '47.92.148.181',
    username: 'root',
    password: 'Hc19940617',
    fileName
  })
}
const syncShell = (filePath, BackupsPath = defaultBackupsPath) => {
  spinner.text = '正在备份...'
  spinner.start()
  const current = moment().format('YYYYMMDDHHmmss') // 20191101101426格式
  var reg = new RegExp(':', 'g')
  filePathName = filePath.replace(reg, '')
  let folderName = filePathName.split('\\')
  folderName = folderName.join('_')
  folderName = folderName + '@' + current
  let symbol, text
  try {
    // 先创建一个时间信息的文件夹，防止覆盖同一个文件夹
    shell.mkdir('-p', BackupsPath + folderName)
    // shelljs 复制者文件夹方法。-rf表示强制和递归方式复制。
    shell.cp('-rf', filePath, BackupsPath + folderName)
    symbol = '√'
    text = `已备份至${defaultBackupsPath + folderName}`
  } catch (error) {
    symbol = '×'
    text = '备份失败请检查路径'
    errorLog(error)
  }
  spinner.stopAndPersist({
    symbol,
    text
  })
  if (symbol === '√')
    compressFile({ filePath, folderName, callback: uploadSsh })
}
module.exports = syncShell
