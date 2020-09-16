const fs = require("fs");
const rootPath = process.cwd();

module.exports =  checkRootFolder = () => {
    let confFile = rootPath + "/config.json";
    try {
        let find = fs.existsSync(confFile);

        if (!find) {
            console.error("You are not in project root folder");
            return false;
        } else {

            return true;
        }

    } catch (error) {
        return false;
    }


}