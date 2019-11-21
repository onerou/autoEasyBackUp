const shell = require("shelljs");
const { errorLog } = require("./utils/log.js");
let backupList = JSON.parse(shell.cat("./JSON/backups.json"));
if (backupList.length === 0 || backupList[0].backupList.length === 0) {
  errorLog("同步列表为空，请先执行 npm run syncFile 新建同步列表");
  process.exit(0);
}
shell.exec("pm2 reload ecosystem.config.js --env production");
