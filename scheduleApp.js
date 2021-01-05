const shell = require('shelljs')
const { errorLog } = require('./utils/log.js')
try {
  let backupList = JSON.parse(shell.cat('./JSON/backups.json'))
} catch (e) {
  errorLog('同步列表为空，请先执行 npm run sync 新建同步列表')
  process.exit(0)
}
if (backupList.length === 0) {
  errorLog('同步列表为空，请先执行 npm run sync 新建同步列表')
  process.exit(0)
}
shell.exec('pm2 reload ecosystem.config.js --env production')
