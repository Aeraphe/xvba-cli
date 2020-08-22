#!/usr/bin/env node


const program = require('commander');
const package = require('./package.json');

program.version(package.version);

program
    .command('add [todo]')
    .description('Adiciona um to-do')
    .action((todo) => {
        console.log(todo);
    });

program.parse(process.argv);