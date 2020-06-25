exports.error = (mainMessage, ...message) => {
	console.log(`\x1B[31m${mainMessage}\x1B[0m`, ...message);
}

exports.success = (mainMessage, ...message) => {
	console.log(`\x1B[32m${mainMessage}\x1B[0m`, ...message);
}

exports.info = (mainMessage, ...message) => {
	console.log(`${mainMessage}`, ...message);
}