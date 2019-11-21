const chalk = require('chalk')
const errorLog = (error) => console.log(chalk.red(`Error:${error}`))
const defaultLog = (log) => console.log(chalk.green(`Success:${log}`))
module.exports = {
    errorLog,
    defaultLog
}