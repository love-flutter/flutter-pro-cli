const { spawn } = require('child_process');

const checkFile = require('./check_file');
const consoleLog = require('./console_log');

exports.exec = (check) => {
	if(check && check == 'check') {
      checkFile.exec((err) => {
        if(!err){
          runApp();
        }
      });
    } else {
    	runApp();
    }
}

function runApp() {
	const runApp = spawn('flutter', ['run', 'lib/main.dart']);
	consoleLog.info('Start app');

  runApp.stderr.on('data', (data) => {
	  consoleLog.error(`${data}`);
	});

  runApp.stdout.on('data', (data) => {
    consoleLog.success(`${data}`);
  });

}	
