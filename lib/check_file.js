const { exec } = require('child_process');

const consoleLog = require('./console_log');

exports.exec = (callback) => {
	let checkFile = 'chmod +x format_check.sh;./format_check.sh';
    if(process.platform == 'win32') {
      checkFile = './format_check.bat';
    }

    consoleLog.info('Start check file format');

    exec(checkFile, (err, stdout, stderr) => {
    	if(err || stderr) {
    		consoleLog.error(`${err} ${stderr}`);
    		if(callback) {
    			return callback(true);
    		}
    	}

    	consoleLog.success(`${stdout}`);
        if(callback){
            return callback(false);
        }
    });
}