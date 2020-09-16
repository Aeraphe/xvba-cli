#!/usr/bin/env node


const program = require('commander');

//Actions
const addXvbaFromGit = require('./actions/add.action');
const delPackage = require('./actions/del-package.action')
const buildPackage = require('./actions/build-package.action')
const listPackages = require('./actions/list-packages.action')


program.command('add [xvba]').description('Add XVB Package fro GitHub').action((url) => { addXvbaFromGit(url); });

program.command('instal [xvba]').description('Instal Xvba Package from Xvba Repository').action((package) => { buildPackage(package) })

program.command('build [xvba]').description('Create Xvba Package').action((package) => { buildPackage(package) })

program.command('del [xvba]').description('Delete Package').action((pacId) => { delPackage(pacId) });

program.command('init [xvba]').description('Create a new config files').action();

program.command('ls [xvba]').description('List all Packages').action(() => { listPackages() });

program.option('--package ,--n').parse(process.argv);