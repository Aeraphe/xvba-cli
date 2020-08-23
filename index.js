#!/usr/bin/env node


program = require('commander');
const config = require('./config.json');
const fs = require("fs");

var GitHub = require('github-api');
const { stdout, stderr } = require('process');
const testUrl = require('./testUrl');
const getGitUrlParams = require("./getGitUrlParams");
const testGitInstalled = require("./testGitInstalled");
const gitClone = require('./gitClone');

var gh = new GitHub();

program
    .command('user [xvba]')
    .description('Adiciona um to-do')
    .action(
        () => {
            console.log(gh.getRepo("aeraphe", "xvba-cli"))
        }
    );

program
    .command('add [xvba]')
    .description('Adiciona um to-do')
    .action((url) => {
        let isValidUrl = testUrl(url)
        if (isValidUrl) {
            [user, package] = getGitUrlParams(url);
        }
        //Git was installed 
        testGitInstalled(gitInstalled => {
            //if true clone the repository
            if (gitInstalled) {
                gitClone(program.package, [user, package], (cloned) => {
                    if (cloned) {
                        //Update config.json
                        let findPackage = config.xvba_packages.find(value => ((value.owner === user, value.package === package)));
                        if (findPackage === undefined) {
                            let packId = Math.round(Math.random() * 1000, 4);
                            config.xvba_packages.push({ packId, owner: user, package: package, version: 1 })
                            createConfigFile(config);
                        }

                    }

                })
            }



        })

    });

program
    .command('del [xvba]')
    .description('Delete Package')
    .action((packId) => {

        try {
            let findPackage = config.xvba_packages.find(value => ((value.packId == parseInt(packId))));
            if (findPackage) {
                let pk = config.xvba_packages.filter(value => {
                    if (value.packId !== parseInt(packId)) {
                        return true
                    } else { return false }
                })
                deletePackage(findPackage.package);
                let newConf = { ...config, xvba_packages: pk }
                createConfigFile(newConf);
                console.log("Package  deleted: ", findPackage)
            } else {
                console.log("Package " + packId + " not found")
            }
        } catch (error) {
            console.log(error)
        }

    });

const deletePackage = (package) => {
    let dir = repoFolder = __dirname + "/xvba_modules/" + package;
    fs.rmdir(dir, { recursive: true }, (err) => {
        if (err) {
            throw err;
        }

    });
}

program
    .command('init [xvba]')
    .description('Create a new config files')
    .action(() => {

        try {
            data = {
                app_name: "XVBA",
                description: "",
                author: "",
                email: "",
                create_ate: "",
                excel_file: "index.xlsb",
                vba_folder: "vba-files",
                xvba_packages: [],
                xvba_dev_packages: [],
            }
            createConfigFile(data);
        } catch (error) {
            console.log(error)
        }

    });

const createConfigFile = (data) => {

    fs.writeFile("./config.json", JSON.stringify(data, null, 4), () => {

    })
}
program.option('--package <type>').parse(process.argv);