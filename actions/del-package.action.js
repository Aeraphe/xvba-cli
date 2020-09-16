const path = require("path");
const checkRootFolder = require('../helper/check-root-folder.helper')
const removeDir = require('../helper/remove-dir.helper')
const createConfigFile = require('../helper/create-config-file.helper')
const rootPath = process.cwd();

module.exports = function delPackage(packId) {

    try {
        if (!checkRootFolder()) { return; };
        const config = require(rootPath + "/config.json");
        let findPackage = null;
        let pk = null;

        if (program.n) {
            findPackage = config.xvba_packages.filter((value) => value.package == packId);
            if (findPackage && findPackage.length === 0) {
                pk = config.xvba_packages.filter((value, index) => {
                    if (value.package !== packId) {
                        return true
                    } else { return false }
                })

            }

        } else {


            console.log(packId)
            findPackage = config.xvba_packages[parseInt(packId)];

            if (findPackage) {
                pk = config.xvba_packages.filter((value, index) => {
                    if (index !== parseInt(packId)) {
                        return true
                    } else { return false }
                })
            }

        }
        if (findPackage) {
            const dir = repoFolder = path.join(rootPath + "/xvba_modules/" + findPackage.package);
            removeDir(dir)
            let newConf = { ...config, xvba_packages: pk == null ? [] : pk }
            createConfigFile(newConf);
            console.log("Package  deleted: ", findPackage)
        } else {
            console.log("Package " + packId + " not found")
        }


    } catch (error) {
        console.log(error)
    }

}