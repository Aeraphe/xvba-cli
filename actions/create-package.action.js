const fs = require('fs');
const rootPath = process.cwd();
const path = require('path')



module.exports = async function createPackageScaffold(package) {
    try {
        const xvbaModulesPath = path.join(rootPath, 'xvba_modules', package);

        await handleCheckFolder(xvbaModulesPath);


        await new Promise(
            (resolve, reject) => {
                fs.writeFile(path.join(xvbaModulesPath, 'Readme.md'), README(package), (error => {
                    error ? reject(error) : resolve(true)
                }))
            }
        )

        await new Promise(
            (resolve, reject) => {
                fs.writeFile(path.join(xvbaModulesPath, 'xvba.package.json'), JSON.stringify(XVBA_PACKAGE(package), undefined, 2), (error => {
                    error ? reject(error) : resolve(true)
                }))
            }
        )
    } catch (error) {
        console.log(error)
    }



}

handleCheckFolder = (packagePath) => {
    return new Promise((resolve, reject) => {
        fs.lstat(packagePath, (err, stat) => {
            if (err) {
                try {
                    new Promise(
                        () => {
                            fs.mkdir(packagePath, () => {
                                resolve();
                            })
                        }
                    )
                } catch (error) {
                    reject(error)
                }


            } else {
                resolve(stat.isDirectory())
            }
        })
    })

}


const README = (package) => {
    return `# ${package} (Example of Readme File)
    
    ## Command ...
       
    - This package provides a way to ....`
}


const XVBA_PACKAGE = (package) => {
    return {
        "package": package,
        "version": "1.0",
        "author": "",
        "email": "",
        "license": "ISC",
        "repository": {
            "type": "git",
            "url": "https://github.com/Aeraphe/xvba-cli.git"
        },
        "description": "Creating amazing XVBA packages",
        "dependencies": {},
        "dev_dependencies": {},
        "homepage": "https://github.com/Aeraphe/xvba-cli"
    }
}