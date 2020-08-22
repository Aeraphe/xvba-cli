#!/usr/bin/env node


const program = require('commander');
const package = require('./package.json');
const fs = require("fs");

program.version(package.version);

program
    .command('add [xvba]')
    .description('Adiciona um to-do')
    .action((todo) => {
        console.log(todo);
    });

program
    .command('init [xvba]')
    .description('Create a new config files')
    .action(() => {

        try {

            fs.writeFile("./config.json", JSON.stringify({
                app_name: "XVBA",
                description: "",
                author: "",
                email: "",
                create_ate: "",
                excel_file: "index.xlsb",
                vba_folder: "vba-files",
                xvba_packages: [],
                xvba_dev_packages: [],
            }, null, 4), () => {

            })
        } catch (error) {
            console.log(error)
        }

    });


program.parse(process.argv);