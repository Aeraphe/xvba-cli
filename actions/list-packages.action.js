const path = require("path");
const checkRootFolder = require('../helper/check-root-folder.helper')
const rootPath = process.cwd();

module.exports = () => {

    try {
        let confFile = path.join(rootPath + "/config.json");
        if (!checkRootFolder()) {
            return;
        };
        const config = require(confFile);
        let printPackages = [];
        if (config.xvba_packages.length > 0) {
            config.xvba_packages.forEach((value, index) => {
                printPackages.push({ item: index, ...value })
            })

            console.log(JSON.stringify(printPackages, null, 4));
            return;
        }
        console.log("No Packages Installed!!!");


    } catch (error) {
        console.log(error)
    }

}