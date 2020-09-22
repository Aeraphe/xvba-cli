#!/usr/bin/env node
const program = require('commander');

//Actions

const uninstallPackage = require('./actions/uninstall-package.action')
const buildPackage = require('./actions/build-package.action')
const listPackages = require('./actions/list-packages.action')
const createPackageScaffold = require('./actions/create-package.action');
const installPackage = require('./actions/install.action')
const addVbaFile = require('./actions/add-file.action')


//Install
program.command('install').description('Instal Xvba Package from Xvba Repository').action((package) => { installPackage(package) })
program.command('i').description('Instal Xvba Package from Xvba Repository').action((package) => { installPackage(package) })
//Uninstall
program.command('uninstall').description('Delete Package').action((package) => { uninstallPackage(package) });

program.command('create').description('Create Xvba Package scaffold on xvba_modules').action((package) => { createPackageScaffold(package) })


program.command('build').description('Create Xvba Package').action((package) => { buildPackage(package) })

//Add new vba files
program.command('add [m,c]').description('Create Xvba Package').action( async (filePath) => { addVbaFile(filePath,program) })



program.command('init').description('Create a new config files').action();

program.command('ls').description('List all Packages').action(() => { listPackages() });

program
  .option('-p, --package', 'Create a Package')
  .option('-m, --module', 'Create Module')
  .option('-c, --class', 'Create a Class');

program.parse(process.argv);
