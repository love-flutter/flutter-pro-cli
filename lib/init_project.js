const fs = require('fs');
const consoleLog = require('./console_log');

const binPath = `${__dirname}/../`;
const currentPath = process.cwd();

const pathList = {
	'lib' : [
		'api',
		'model',
		'pages',
		'styles',
		'util',
		'util/struct',
		'widgets'
	],
	'test' : [
		'api',
		'model',
		'pages',
		'util',
		'util/struct',
		'widgets'
	]
};

/**
 * @desc 核心目录创建
 * 
 */
function initMain(pathType){
	let result = true;

	if(!fs.existsSync(`${currentPath}/${pathType}`)){
		consoleLog.error('Please check you are in flutter folder, current path has not lib folder');
		return false;
	}

	pathList[pathType].forEach( (pathName) => {
		let folderPath = `${currentPath}/${pathType}/${pathName}`;

		if (fs.existsSync(folderPath)){
			return true;
		}	
		let ret = fs.mkdirSync(folderPath);
		if (!ret) {
			consoleLog.success(`create ${pathType} ${pathName} success`);
		} else {
			consoleLog.error(`create ${pathType} ${pathName} faild`);
		}
		result = result && !ret;
	});
	return result;
}

/**
 * @desc add analysis_options.yaml and format_check.sh and format_check.bat
 *
 */
function initBaseFile() {
	let ret = false;
	if(!fs.existsSync(`${currentPath}/analysis_options.yaml`)) {
		ret = ret || fs.copyFileSync(`${binPath}/init_data/analysis_options.yaml`, `${currentPath}/analysis_options.yaml`);
	}
	if(!fs.existsSync(`${currentPath}/format_check.sh`)) {
		ret = ret || fs.copyFileSync(`${binPath}/init_data/format_check.sh`, `${currentPath}/format_check.sh`);
	}
	if(!fs.existsSync(`${currentPath}/format_check.bat`)) {
		ret = ret || fs.copyFileSync(`${binPath}/init_data/format_check.bat`, `${currentPath}/format_check.bat`);
	}
	if(!fs.existsSync(`${currentPath}/lib/main.dart`)) {
		ret = ret || fs.copyFileSync(`${binPath}/init_data/main.dart`, `${currentPath}/lib/main.dart`);
	}
	if(!fs.existsSync(`${currentPath}/lib/router.dart`)) {
		ret = ret || fs.copyFileSync(`${binPath}/init_data/router.dart`, `${currentPath}/lib/router.dart`);
	}

	if(ret) {
		consoleLog.error('copy file error');
	}

	return !ret;
}


/**
 * @desc 执行脚本信息
 *
 */
exports.exec = () => {
	consoleLog.info('Start create project init path');
	
	if(initMain('lib') && initMain('test') && initBaseFile()) {
		consoleLog.success(`init project path success`);
	} else {
		consoleLog.error(`init project path faild`);
	}
	
}

