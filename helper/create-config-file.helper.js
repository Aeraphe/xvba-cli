const fs = require("fs");
<<<<<<< HEAD
const checkRootFolder = require('../helper/check-root-folder.helper');
=======
>>>>>>> c43d6af6a2fc00a45e1d1c1cb22fe028a67c80cf
const rootPath = process.cwd();

module.exports =  createConfigFile = (data) => {
    if (!checkRootFolder()) { return; };
    let confFile = rootPath + "/config.json";
    fs.writeFile(confFile, JSON.stringify(data, null, 4), () => {
        console.log(data)
    })

}