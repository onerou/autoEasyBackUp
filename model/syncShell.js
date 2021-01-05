const shell = require('shelljs')
const moment = require('moment')
const spinner = require('../utils/spinner.js')
const { errorLog } = require('../utils/log.js')
const { defaultBackupsPath } = require('../config/config.js')
const compressFile = require('../utils/compressFile.js')
const { host, username, password } = require('../config/ssh.config')
const ssh = require('../utils/ssh.js')
const addSyncFile = require('./addSyncFile.js')
const commandLog = require('../utils/commandLog.js')

const uploadSsh = (fileName) => {
  return ssh({
    host,
    username,
    password,
    fileName,
  })
}
const syncShell = async (filePath, BackupsPath = defaultBackupsPath) => {
  spinner.text = '正在备份...'
  spinner.start()
  const current = moment().format('YYYYMMDDHHmmss') // 20191101101426格式
  var reg = new RegExp(':', 'g')
  filePathName = filePath.replace(reg, '')
  let folderName = filePathName.split('/')
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
    text,
  })
  if (symbol === '√') {
    let fileName = await compressFile({
      filePath,
      folderName,
    })
    let { isUpload } = await commandLog({
      type: 'confirm',
      name: 'isUpload',
      message: '是否上传至服务器',
    })
    if (isUpload) {
      let uploadPath = await uploadSsh(fileName)
    }
    let { add } = await commandLog({
      type: 'confirm',
      name: 'add',
      message: '是否添加至备份列表',
    })
    if (add) {
      let jsonPath = await addSyncFile(filePath, BackupsPath)
    }
    process.exit(0)
  }
}
module.exports = syncShell
