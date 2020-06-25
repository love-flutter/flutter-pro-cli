const fs = require('fs');
const path = require('path');

const consoleLog = require('./console_log');

const binPath = `${__dirname}/../`;
const currentPath = process.cwd();
const blackList = ['styles'];

/**
 * @des 拷贝文件夹
 */
function copyFolder(copiedPath, resultPath, direct) {
    let projectName = getProjectName();
    if(!projectName) {
        consoleLog.error('can not find pubspect.yaml');
        return;
    }

    if(!direct) {
        copiedPath = path.join(__dirname, copiedPath)
        resultPath = path.join(__dirname, resultPath)
    }

    if (fs.existsSync(copiedPath)) {
        createDir(resultPath)

        const files = fs.readdirSync(copiedPath, { withFileTypes: true });

        files.forEach((cf) => {
            const ccp = path.join(copiedPath, cf.name);
            const crp = path.join(resultPath, cf.name); 
            if(cf.isFile()){
                createFile(crp, projectName);
            }
            if (!cf.isDirectory() || blackList.indexOf(cf.name) > -1) {
               return;
            } 
            try {
                fs.accessSync(path.join(crp, '..'), fs.constants.W_OK)
                copyFolder(ccp, crp, direct);
            } catch (error) {
                consoleLog.error('folder write error:', error);
            }
        });
    } else {
        consoleLog.error('do not exist path: ', copiedPath);
    }
}

/**
 * @desc 创建文件夹
 *
 */
function createDir(dirPath) {
    if(!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
}
 
/**
 * @desc 创建并生成文件
 *
 */
function createFile(filePath, projectName) {
    const testCaseFolders = [
        'model',
        'pages',
        'struct',
        'widgets'
    ];
    if(fs.existsSync(filePath) || filePath.indexOf('.DS_Store') > -1) {
        return;
    }

    testCaseFolders.forEach((fileType) => {
        let pos = filePath.indexOf(`/${fileType}/`);
        if(pos < 0){
            return;
        };
        let fileData = fs.readFileSync(`${binPath}config/${fileType}.dart`, {encoding: 'utf8'});

        let fileNameDart = filePath.substring(pos + fileType.length + 2);
        let testFile = filePath.replace('.dart', '') + '_test' + '.dart';
        let fileName = fileNameDart.replace('.dart', '');

        let classNameObj = fileName.replace('/', '_').replace(/\_(\w)/g, function(all, letter){
            return letter.toUpperCase();
        })
        let className = classNameObj.replace(/^\S/, s => s.toUpperCase());

        //console.log(fileData);
        fileData = fileData.replace(/\{\{file_name\}\}/ig, `${projectName}/${fileType}/${fileNameDart}`).replace(/\{\{class_name\}\}/ig, className).replace(/\{\{class_name_obj\}\}/ig, classNameObj);
        fs.writeFileSync(`${testFile}`, fileData, {encoding: 'utf8'});    
    });
    
}

/**
 * @desc 获取项目名
 * 
 */
function getProjectName() {
    let yamlConfig = fs.readFileSync(`${currentPath}/pubspec.yaml`, {encoding: 'utf8'});

    let pos = yamlConfig.indexOf('name:');
    if(pos < 0) {
        return false;
    }
    let subYamlConfig = yamlConfig.substr(pos+5);
    pos = subYamlConfig.indexOf("\n");
    if(pos < 0){
        return false;
    }
    return subYamlConfig.substr(0, pos).trim();
}

exports.exec = () => {
    consoleLog.info('Start sync test file');
    copyFolder(`${currentPath}/lib`, `${currentPath}/test`, true);
    consoleLog.info('End sync test file');
}


