const commandLog = require("./utils/commandLog.js");
const syncShell = require("./model/syncShell.js");
const { errorLog } = require("./utils/log.js");
let parms = process.argv.slice(2);
const showDialogue = () => {
  if (parms[1] && parms[2]) syncShell(parms[1], parms[2]);
  if (parms[1] && parms[2]) return;
  if (parms[1]) syncShell(parms[1]);
  if (parms[1]) return;
  commandLog({
    type: "String",
    name: "filePath",
    message: "请输入要备份的文件夹路径"
  }).then(filePath => {
    if (filePath.filePath.length < 5 || pattern.test(filePath.filePath))
      errorLog("请输入正确的文件夹路径");
    if (filePath.filePath.length < 5 || pattern.test(filePath.filePath)) return;
    syncShell(filePath.filePath);
  });
};
showDialogue();
