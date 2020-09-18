const fs = require("fs");
const checkRootFolder = require('../helper/check-root-folder.helper');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile)

const rootPath = process.cwd();

module.exports = async (data) => {
    if (!checkRootFolder()) { return; };
    let confFile = rootPath + "/config.json";
    await writeFileAsync(confFile, JSON.stringify(data, null, 4), () => {})

}