const { exec } = require("child_process");

let testGitInstalled = (callBack) => {
    exec("git --version", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        callBack(stdout.includes("version"));

    })
}


module.exports = testGitInstalled;