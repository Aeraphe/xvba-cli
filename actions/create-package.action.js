const fs = require('fs');
const rootPath = process.cwd();
const path = require('path')



module.exports = async function createPackageScaffold(package) {
    try {
        const xvbaModulesPath = path.join(rootPath, 'xvba_modules', package);
        //Developer -> check if the folder has already a folder with the same name
        await handleCheckFolder(xvbaModulesPath);


        await new Promise(
            (resolve, reject) => {
                fs.writeFile(path.join(xvbaModulesPath, 'README.md'), README(package), (error => {
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
        await new Promise(
            (resolve, reject) => {
                fs.writeFile(path.join(xvbaModulesPath, `${package}_xvba.cls`), INDEX_CLASS(package), (error => {
                    error ? reject(error) : resolve(true)
                }))
            }
        )

        await new Promise(
            (resolve, reject) => {
                fs.writeFile(path.join(xvbaModulesPath, `CHANGELOG.md`), CHANGE_LOG(package), (error => {
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


function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * 
 * @param {String} package 
 */
const INDEX_CLASS = (package) =>{
    const name = jsUcfirst(package);
    return `VERSION 1.0 CLASS
    BEGIN
      MultiUse = -1  'True
    END
    Attribute VB_Name = "${name}"
    Attribute VB_GlobalNameSpace = False
    Attribute VB_Creatable = False
    Attribute VB_PredeclaredId = False
    Attribute VB_Exposed = False

'namespace=xvba_modules\\${package}



'Example of Package Create by XVBA-CLI

'Class Param Example
Private pName As String


'Main method example
Private Sub main()

  MsgBox "message",,"title"

End Sub


'Example of accessor method Get
Public Property Get Name() As String
  Name = pName
End Property


'Example of accessor method Let
Public Property Let Name(Value as String) As String
  pName =  Value
End Property

    `
}

const README = (package) => {
    return `# ${package} (Example of Readme File)
    
## Command ...
 - This package provides a way to ....`
}


const XVBA_PACKAGE = (package) => {
    return {
        "package": package,
        "version": "1.0.0",
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


const CHANGE_LOG = (package) => {
    return `# Changelog
## ${package} (Under Construction)

- This package provides a way to add VBA packages in Excel with XVBA VSCode extension
- Add third packages to your project with command line interface
    
## [1.0.0b3] - 2020-09-16
### Added
 - New Command Build XVBA Package "npm xvba build [package]"
 - New Command Create XVBA Package "npm xvba create [package]"

### Fixed
 - Refectory all code
 
 `
}