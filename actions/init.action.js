const rootPath = process.cwd();
const fs = require("fs");
const createConfigFile = require('../helper/create-config-file.helper')

module.exports = () => {

    try {
        if (!checkRootFolder()) { return; };
        data = {
            app_name: "XVBA",
            description: "",
            author: "",
            email: "",
            create_ate: "",
            excel_file: "index.xlsb",
            vba_folder: "vba-files",
            xvba_packages: {},
            xvba_dev_packages: {},
        }
        let confFile = rootPath + "/config.json";
        fs.exists(confFile, hasFile => {
            if (!hasFile) {
                createConfigFile(data);
            } else {
                console.log("File alredy exist!!")
            }
        })

    } catch (error) {
        console.log(error)
    }

}

