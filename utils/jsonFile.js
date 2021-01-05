const { backUpJsonUrl } = require('../config/config')
const fs = require('fs')
const { join } = require('path')

let filePath = join(__dirname, '../' + backUpJsonUrl)
const getJson = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data == '' ? [] : JSON.parse(data))
      }
    })
  })
}
const writeJson = (obj) => {
  return new Promise((resolve, reject) => {
    let content = JSON.stringify(obj, 2, 4)
    fs.writeFile(filePath, content, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve(content)
      }
    })
  })
}
module.exports = {
  getJson,
  writeJson,
}
