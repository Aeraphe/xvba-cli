#!/usr/bin/env node
const program = require('commander');

//Actions

const delPackage = require('./actions/del-package.action')
const buildPackage = require('./actions/build-package.action')
const listPackages = require('./actions/list-packages.action')
const createPackageScaffold = require('./actions/create-package.action');
const installPackage = require('./actions/install.action')



program.command('install [xvba]').description('Instal Xvba Package from Xvba Repository').action((package) => { installPackage(package) })

program.command('i [xvba]').description('Instal Xvba Package from Xvba Repository').action((package) => { buildPackage(package) })


program.command('create [xvba]').description('Create Xvba Package scaffold on xvba_modules').action((package) => { createPackageScaffold(package) })


program.command('build [xvba]').description('Create Xvba Package').action((package) => { buildPackage(package) })

program.command('del [xvba]').description('Delete Package').action((pacId) => { delPackage(pacId) });

program.command('init [xvba]').description('Create a new config files').action();

program.command('ls [xvba]').description('List all Packages').action(() => { listPackages() });

program.option('--package ,--n').parse(process.argv);