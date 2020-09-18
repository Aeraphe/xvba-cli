const { default: Axios } = require('axios')
const Fs = require('fs');
const urls = require('../helper/endpoints')
const os = require('os')
const path = require('path')
const extract = require('extract-zip')
const rootPath = process.cwd();
const { promisify } = require('util');
const readFileAsync = promisify(Fs.readFile);
const mkdirAsync = promisify(Fs.mkdir);
const statAsync = promisify(Fs.stat);
const checkRootFolder =  require('../helper/check-root-folder.helper')



module.exports = async (package) => {
    try {

        if (!checkRootFolder()) { return; };
        const twirlTimer = (function () {
            let P = ["\\", "|", "/", "-"];
            let x = 0;
            return setInterval(function () {
                process.stdout.write("\r" + P[x++]);
                x &= 3;
            }, 50);
        })();
 
        const url = urls.packages.getFile + package;
        //Get temp dir 
        const tempDir = os.tmpdir()
        const filePath = path.resolve(tempDir, 'xvba-modules', 'package.xvba')
        const xvbaModulesTempFolder = path.join(tempDir, 'xvba-modules')
        //Check temp folder exists
        const stats = await statAsync(xvbaModulesTempFolder)
        if (!stats.isDirectory) {
            await mkdirAsync(xvbaModulesTempFolder)
        }
        //Read file from Http request
        const writer = Fs.createWriteStream(filePath);
        const response = await Axios({ url, method: 'Get', responseType: 'stream' });
        response.data.pipe(writer);
        //Stream Complete
        await new Promise((resolve, reject) => { writer.on('finish', resolve); writer.on('close', reject); });
        //Package temp folder
        const packageTempfolder = path.join(xvbaModulesTempFolder, 'package');
        //Extract filet to temp folder
        await extract(path.join(xvbaModulesTempFolder, 'package.xvba'), { dir: packageTempfolder });
        //Reade config file
        const config = await readFileAsync(path.join(packageTempfolder, 'xvba.package.json')).then(data => JSON.parse(data));
        const packageFolder = path.join(rootPath, 'xvba_modules', config.package);
        //Save package to xvba_modules folder
        await extract(path.join(xvbaModulesTempFolder, 'package.xvba'), { dir: packageFolder });

        console.log('Package ' + config.package + ' has Successfully installed ')
        console.log('\nThanks for using XVBA')
        twirlTimer.unref()

    } catch (error) {
        console.log(error)
    }

    //Unzip file
    //Read json file
    //Create folder with package name from json
}