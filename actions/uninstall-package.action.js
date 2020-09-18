const path = require("path");
const checkRootFolder = require('../helper/check-root-folder.helper')
const removeDir = require('../helper/remove-dir.helper')
const createConfigFile = require('../helper/create-config-file.helper')
const rootPath = process.cwd();

module.exports = async (name) => {

    try {
        if (!checkRootFolder()) { return; };
        const config = require(rootPath + "/config.json");

        if (config.xvba_packages[name]) {
            delete config.xvba_packages[name]
            let newConf = { ...config }

            const dir = repoFolder = path.join(rootPath + "/xvba_modules/" + name);
            removeDir(dir)
            //Update config file
            await createConfigFile(newConf);

            console.log("Package ", name, "Successfully Uninstalled")
        } else {
            console.log("Package " + name + " not found")
        }


    } catch (error) {
        console.log(error)
    }

}