const node_ssh = require('node-ssh')
const spinner = require('../utils/spinner.js')
const { defaultZipPath, userName } = require('../config/config.js')
module.exports = ({ host, username, password, fileName }) => {
  return new Promise((resolve, reject) => {
    spinner.text = '正在连接服务器...'
    spinner.start()
    const ssh = new node_ssh()
    ssh
      .connect({
        host,
        username,
        password,
      })
      .then(() => {
        spinner.stopAndPersist({
          symbol: '√',
          text: '连接服务器成功',
        })
        spinner.text = '准备上传文件...'
        spinner.start()
        ssh
          .putFile(
            defaultZipPath + '/' + fileName,
            `/home/${userName}/${fileName}`
          )
          .then(
            (res) => {
              spinner.stopAndPersist({
                symbol: '√',
                text: '上传文件成功' + `/home/${userName}/${fileName}`,
              })
              resolve(`/home/${userName}/${fileName}`)
            },
            (err) => {
              spinner.stopAndPersist({
                symbol: '×',
                text: '上传文件失败',
              })
              console.log(err)
              reject(err)
            }
          )
          .catch((err) => {
            spinner.stopAndPersist({
              symbol: '×',
              text: '连接失败！',
            })
            reject(err)
          })
      })
  })
}
