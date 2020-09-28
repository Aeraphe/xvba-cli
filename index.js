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
program.command('install').description('xvba install [package] - Instal Xvba Package from Xvba Repository').action((package) => { installPackage(package) })
program.command('i').description('xvba i [package] - Instal Xvba Package from Xvba Repository').action((package) => { installPackage(package) })
//Uninstall
program.command('uninstall').description('xvba uninstall [package] -  Uninstall Package').action((package) => { uninstallPackage(package) });

program.command('create').description('xvba create [package] - Create Xvba Package scaffold on xvba_modules').action((package) => { createPackageScaffold(package) })


program.command('build').description('xvba build [package] - Build Xvba Package file ').action((package) => { buildPackage(package) })

//Add new vba files
program.command('add [m,c]').description('xvba add -c [sub-folder/file] or xvba add -m [sub-folder/file] - Create Vba file type module bas or class cls').action( async (filePath) => { addVbaFile(filePath,program) })



program.command('init').description('xvba init - Create a new config files').action();

program.command('ls').description('xvba ls - List all Packages installed').action(() => { listPackages() });

program
  .option('-p, --package', 'Create a Package')
  .option('-m, --module', 'Create Module')
  .option('-c, --class', 'Create a Class');

program.parse(process.argv);
