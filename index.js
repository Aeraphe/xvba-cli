#!/usr/bin/env node


program = require('commander');

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
        const config = require(__dirname + "/config.json");

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
            const config = require(__dirname + "/config.json");
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
            let confFile = __dirname + "/config.json";
            fs.exists(confFile, hasFile => {
                if (!hasFile) {
                    createConfigFile(data);
                } else {
                    console.log("File alredy exist!!")
                }
            })

        } catch (error) {
            console.log(error)
        }

    });

const createConfigFile = (data) => {
    let confFile = __dirname + "/config.json";

    fs.writeFile(confFile, JSON.stringify(data, null, 4), () => {
        console.log(confFile)
    })

}



program
    .command('ls [xvba]')
    .description('Create a new config files')
    .action(() => {

        try {

            let confFile = __dirname + "/config.json";
            const config = require(confFile);
            fs.exists(confFile, hasFile => {
                if (!hasFile) {
                    console.log("File not exists!!!")
                } else {
                    console.log(JSON.stringify(config,null,4))
                }
            })

        } catch (error) {
            console.log(error)
        }

    });

program.option('--package <type>').parse(process.argv);