const { default: Axios } = require('axios')
const Fs = require('fs');
const urls = require('../helper/endpoints')
const os = require('os')
const path = require('path')
const rootPath = process.cwd();
const { promisify } = require('util');
const mkdirAsync = promisify(Fs.mkdir);
const checkRootFolder = require('../helper/check-root-folder.helper')
const createConfigFile = require('../helper/create-config-file.helper');
const AdmZip = require('adm-zip');



module.exports = async (package) => {
    let twirlTimer;
    try {

        if (!checkRootFolder()) { return; };
        const projectConfig = require(rootPath + "/config.json");

        twirlTimer = (function () {
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
        if (!Fs.existsSync(xvbaModulesTempFolder)) {
            await mkdirAsync(xvbaModulesTempFolder)
        }
        //Read file from Http request
        const writer = Fs.createWriteStream(filePath);
        const response = await Axios({ url, method: 'Get', responseType: 'stream' });
        response.data.pipe(writer);
        //Stream Complete
        await new Promise((resolve, reject) => { writer.on('finish', resolve); writer.on('close', reject); });

        //Extract filet to temp folder
        var zip = new AdmZip(path.join(xvbaModulesTempFolder, 'package.xvba'));
        const zipEntries = zip.getEntries();
        //console.log(zipEntries.toString())

        let config = "";
        //Reade config file
        zipEntries.forEach(function (zipEntry) {

            if (zipEntry.entryName == "xvba.package.json") {
                config = JSON.parse(zipEntry.getData().toString('utf8'));
            }
        });


        const packageFolder = path.join(rootPath, 'xvba_modules', config.package);
        //Save package to xvba_modules folder
        zip.extractAllTo(packageFolder, /*overwrite*/true);
        //Update config package
        let updatedProjectConfig = { ...projectConfig, xvba_packages: { ...projectConfig.xvba_packages, [config.package]: config.version } };
        await createConfigFile(updatedProjectConfig);

        console.log('Package ' + config.package + ' has Successfully installed ')
        console.log('\nThanks for using XVBA\n')
        twirlTimer.unref()

    } catch (error) {
        twirlTimer.unref()
        console.log(error)

    }


}