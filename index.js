#!/usr/bin/env node


const program = require('commander');
const fs = require("fs");
const path = require("path");
const { stdout, stderr } = require('process');
const testUrl = require('./testUrl');
const getGitUrlParams = require("./getGitUrlParams");
const testGitInstalled = require("./testGitInstalled");
const gitClone = require('./gitClone');
const rootPath = process.cwd();



program
    .command('add [xvba]')
    .description('Adiciona um to-do')
    .action((url) => {

        try {
            if (!checkRootFolder()) { return; };
            const config = require(rootPath + "/config.json");

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
        } catch (error) {

        }


    });

program
    .command('del [xvba]')
    .description('Delete Package')
    .action((packId) => {

        try {
            if (!checkRootFolder()) { return; };
            const config = require(rootPath + "/config.json");
            let findPackage = config.xvba_packages.find(value => ((value.packId == parseInt(packId))));
            if (findPackage) {
                let pk = config.xvba_packages.filter(value => {
                    if (value.packId !== parseInt(packId)) {
                        return true
                    } else { return false }
                })
            

                const dir = repoFolder = path.join(rootPath + "/xvba_modules/" + findPackage.package);
                removeDir(dir)

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


program
    .command('init [xvba]')
    .description('Create a new config files')
    .action(() => {

        try {
            if (!checkRootFolder()) { return; };
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
            let confFile = rootPath + "/config.json";
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
    if (!checkRootFolder()) { return; };
    let confFile = rootPath + "/config.json";
    fs.writeFile(confFile, JSON.stringify(data, null, 4), () => {
        console.log(data)
    })

}



program
    .command('ls [xvba]')
    .description('Create a new config files')
    .action(() => {

        try {
            let confFile = path.join(rootPath + "/config.json");
            if (!checkRootFolder()) {
                return;
            };
            const config = require(confFile);
            console.log(config)

        } catch (error) {
            console.log(error)
        }

    });


const checkRootFolder = () => {
    let confFile = rootPath + "/config.json";
    try {
        let find = fs.existsSync(confFile);

        if (!find) {
            console.error("You are not in project root folder");
            return false;
        } else {

            return true;
        }

    } catch (error) {
        return false;
    }


}







const removeDir = function (path) {
    if (fs.existsSync(path)) {
        const files = fs.readdirSync(path)

        if (files.length > 0) {
            files.forEach(function (filename) {
                if (fs.statSync(path + "/" + filename).isDirectory()) {
                    removeDir(path + "/" + filename)
                } else {
                    fs.unlinkSync(path + "/" + filename)
                }
            })
            fs.rmdirSync(path)
        } else {
            fs.rmdirSync(path)
        }
    } else {
        console.log("Directory path not found.")
    }
}









program.option('--package <type>').parse(process.argv);