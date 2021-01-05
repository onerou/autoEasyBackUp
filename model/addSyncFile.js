const shell = require('shelljs')
const commandLog = require('../utils/commandLog.js')
const { getJson, writeJson } = require('../utils/jsonFile')
const { errorLog, defaultLog } = require('../utils/log.js')
const { defaultBackupsPath } = require('../config/config.js')
const spinner = require('../utils/spinner.js')
var pattern = /[.]/im
const addSyncFile = (linkLocal, backupPath = defaultBackupsPath) => {
  return new Promise(async (resolve, reject) => {
    if (!linkLocal) {
      let { linkLocal } = await commandLog({
        type: 'String',
        name: 'linkLocal',
        message: '请输入要备份的文件夹路径',
      })
    }
    if (linkLocal.length < 5 || pattern.test(linkLocal)) {
      errorLog('请输入正确的文件夹路径')
      reject('请输入正确的文件夹路径')
    }
    spinner.text = '正在添加到备份列表...'
    spinner.start()
    let json = await getJson()
    let hasIndex = json.findIndex((v) => v.linkLocal == linkLocal)
    if (hasIndex > 0) {
      let hasItem = json[hasIndex]
      if (hasItem.backupPath != backupPath) {
        let { covered } = await commandLog({
          type: 'confirm',
          name: 'covered',
          message: '备份列表中已存在本地备份地址，是否覆盖',
        })
        if (covered) hasItem.backupPath = backupPath
      } else {
        spinner.stopAndPersist({
          symbol: '×',
          text: '备份列表中已存,取消添加至列表',
        })
        reject('备份列表中已存,取消添加至列表')
      }
    } else {
      json.push({
        linkLocal,
        backupPath,
      })
    }
    writeJson(json)
      .then((res) => {
        spinner.stopAndPersist({
          symbol: '√',
          text: '已成功添加到备份列表',
        })
        resolve('已成功添加到备份列表')
      })
      .catch((err) => {
        spinner.stopAndPersist({
          symbol: '×',
          text: '添加到备份列表失败',
        })
        errorLog(err)
        reject('添加到备份列表失败')
      })
  })
}
module.exports = addSyncFile
