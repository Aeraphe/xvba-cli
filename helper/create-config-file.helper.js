const fs = require("fs");
const checkRootFolder = require('../helper/check-root-folder.helper');
const rootPath = process.cwd();

module.exports =  createConfigFile = (data) => {
    if (!checkRootFolder()) { return; };
    let confFile = rootPath + "/config.json";
    fs.writeFile(confFile, JSON.stringify(data, null, 4), () => {
        console.log(data)
    })

}