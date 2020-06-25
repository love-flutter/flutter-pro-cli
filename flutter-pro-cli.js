#!/usr/bin/env node
const program = require('commander');

const initProject = require('./lib/init_project');
const checkFile = require('./lib/check_file');
const run = require('./lib/run');
const syncTest = require('./lib/sync_test');

program
  .command('init')
  .alias('i')
  .description('Generates new flutter project')
  .action(function () {
    initProject.exec();
  });

program
  .command('check')
  .alias('c')
  .description('Check the project lib format')
  .action(function () {
    checkFile.exec();
  });  

program
  .command('run [check]')
  .alias('r')
  .description('Check the project lib format and run')
  .action(function (check) {
    run.exec(check);
  });  

program
  .command('sync-test')
  .alias('st')
  .description('Generates new test path base on lib path')
  .action(function () {
    syncTest.exec();
  });  

program.parse(process.argv);
