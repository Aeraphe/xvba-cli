const archiver = require('archiver')
const checkRootFolder = require('../helper/check-root-folder.helper')
const rootPath = process.cwd();
const path = require('path')

module.exports = function buildPackage(package) {
    if (!checkRootFolder()) { return; };
    const packagePath = path.join(rootPath, "xvba_modules", package);
    console.log(packagePath)
}