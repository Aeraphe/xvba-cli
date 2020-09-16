
const testUrl = require('../testUrl');
const getGitUrlParams = require("../getGitUrlParams");
const testGitInstalled = require("../testGitInstalled");
const gitClone = require('../gitClone');
const checkRootFolder =  require('../helper/check-root-folder.helper')
const rootPath = process.cwd();
const program = require('commander');

module.exports = function Add(url) {

    try {
        if (!checkRootFolder()) { return; };
        const config = require(rootPath + "/config.json");

        let isValidUrl = testUrl(url)
        if (isValidUrl) {
            [user, package] = getGitUrlParams(url);
        }
        //Git was installed 
        testGitInstalled(gitInstalled => {
            //if true clone the repository
            if (gitInstalled) {
                gitClone(program.package, [user, package], (cloned) => {
                    if (cloned) {

                        //Update config.json
                        let findPackage = config.xvba_packages.find(value => ((value.owner === user, value.package === package)));
                        if (findPackage === undefined) {
                            config.xvba_packages.push({ owner: user, package: package, version: 1 })
                            createConfigFile(config);
                        }

                    }

                })
            }


        })
    } catch (error) {

    }


}