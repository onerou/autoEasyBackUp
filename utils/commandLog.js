var inquirer = require('inquirer')
async function logQuestion(parms) {
	let obj = {}
	await inquirer.prompt([ parms ]).then((answers) => {
		obj = answers
	})
	return obj
}
module.exports = logQuestion
