const node_ssh = require('node-ssh')
const spinner = require('../utils/spinner.js')
const { defaultZipPath, userName } = require('../config/config.js')
module.exports = ({ host, username, password, fileName }) => {
  spinner.text = '正在添加到备份列表...'
  spinner.start()
  const ssh = new node_ssh()
  ssh
    .connect({
      host,
      username,
      password
    })
    .then(() => {
      spinner.stopAndPersist({
        symbol: '√',
        text: '连接服务器成功'
      })
      spinner.text = '准备上传文件...'
      spinner.start()
      ssh
        .putFile(
          defaultZipPath + '/' + fileName,
          `/home/${userName}/${fileName}`
        )
        .then(
          res => {
            spinner.stopAndPersist({
              symbol: '√',
              text: '上传文件成功'
            })
            process.exit(0)
          },
          err => {
            spinner.stopAndPersist({
              symbol: '×',
              text: '上传文件失败'
            })
            console.log(err)
            process.exit(0)
          }
        )
        .catch(err => {
          spinner.stopAndPersist({
            symbol: '×',
            text: '连接失败！'
          })
          console.log(err)
          process.exit(0)
        })
    })
}
