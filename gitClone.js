const { exec } = require('child_process');
const rootPath = process.cwd();
const path = require('path');

const gitClone = (folder, params, callBack) => {

    let [user, package] = params;
    let repoFolder = "";
    if (folder) {
        repoFolder = path.join(rootPath, folder, package);
    } else {
        repoFolder = path.join(rootPath, "xvba_modules", package);
    }

    exec(" git clone https://github.com/" + user + "/" + package + ".git " + "\"" + repoFolder + "\"",
        (error, stdout, stderr) => {
            if (error) {
                callBack(false);
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                callBack(stderr.includes("Cloning"));
                return;
            }


        })
}


module.exports = gitClone