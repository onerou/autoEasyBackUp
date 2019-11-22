const shell = require("shelljs");
const fs = require("fs");
let backupList = JSON.parse(shell.cat("./JSON/backups.json"));
const syncShell = require("./syncShell.js");
const commandLog = require("../utils/commandLog.js");
const { errorLog, defaultLog } = require("../utils/log.js");
const { defaultBackupsPath } = require("../config/config.js");
const spinner = require("../utils/spinner.js");
var pattern = /[.]/im;
const addSyncFile = async () => {
  
  let filePath = await commandLog({
    type: "String",
    name: "filePath",
    message: "请输入要备份的文件夹路径"
  });
  
  if (filePath.filePath.length < 5 || pattern.test(filePath.filePath)){
    errorLog("请输入正确的文件夹路径")
    return
  }
  spinner.text = "正在添加到备份列表...";
  spinner.start();
  backupList
    .filter(v => v.defaultBackupsPath === defaultBackupsPath)
    .map(backup => {
      backup.backupList.push({
        filePath: filePath.filePath
      });
    });
  try {
    fs.writeSync(
      fs.openSync("./JSON/backups.json", "w"),
      JSON.stringify(backupList, 2, 4)
    );
    spinner.stopAndPersist({
      symbol: "√",
      text: "已成功添加到备份列表"
    });
  } catch (error) {
    spinner.stopAndPersist({
      symbol: "×",
      text: "添加到备份列表失败"
    });
  }

  syncShell(filePath.filePath);
};
module.exports = addSyncFile;
