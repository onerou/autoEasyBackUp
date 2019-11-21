const shell = require("shelljs");
const syncShell = require("./syncShell.js");
const schedule = require("node-schedule");
schedule.scheduleJob("00 00 00 * * *", () => {
  let backupList = JSON.parse(shell.cat("./JSON/backups.json"));
  backupList.map(v => {
    let { defaultBackupsPath, backupList } = v;
    backupList.map(backup => {
      syncShell(backup.filePath, defaultBackupsPath);
    });
  });
});
