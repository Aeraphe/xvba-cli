const { Console } = require('console');
const fs = require('fs');
const rootPath = process.cwd();
const path = require('path')
const { promisify } = require('util')
const mkdirAsync = promisify(fs.mkdir);



module.exports = async function addVbaFile(filePath, program) {
    try {
        //Prepare file path and file name
        let fileName = ""
        let folder = "";
        const regex = new RegExp('/');
        if (regex.test(filePath)) {
            const filePathSplit = filePath.split('/')
            fileName = filePathSplit[filePathSplit.length - 1];
            for (const item of filePathSplit) {
                if (item !== fileName) {
                    folder += "/" + item
                    await handleCheckFolder(path.join(rootPath, 'vba-files', folder));
                }

            }

        } else {
            fileName = filePath;
        }

        if (program.class) {
            console.log('Creating Class File')
            const className = jsUcfirst(fileName + ".cls");
            const xvbaModulesPath = path.join(rootPath, 'vba-files', folder, className);
            await new Promise(
                (resolve, reject) => {
                    fs.writeFile(xvbaModulesPath, FILE_CLASS(fileName, folder), (error => {
                        error ? reject(error) : resolve(true)
                    }))
                }
            )
        } else if (program.module) {
            console.log('Creating Module File')
            const xvbaModulesPath = path.join(rootPath, 'vba-files', folder, fileName + ".bas");
            await new Promise(
                (resolve, reject) => {
                    fs.writeFile(xvbaModulesPath, MODULE(fileName, folder), (error => {
                        error ? reject(error) : resolve(true)
                    }))
                }
            )
        }


    } catch (error) {
        console.log(error)
    }

}


handleCheckFolder = async (packagePath) => {
    return await new Promise((resolve, reject) => {
        fs.lstat(packagePath, async (err, stat) => {
            if (err) {
                try {
                    await new Promise(
                        () => {
                            fs.mkdir(packagePath, () => {
                                console.log(packagePath)
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

const MODULE = (fileName, folder) => {

 let fileContent =`Attribute VB_Name = "${fileName}"

    'namespace=vba-files${folder.replace(/\//g, "\\")}
    
    '/*
    '
    'This Function ..
    '
    '@return {}
    '*/
    Public Sub main()
        
    End Sub
    `
    return  fileContent.replace(/\n/g, "\r");

}


/**
 * 
 * @param {String} package 
 */
const FILE_CLASS = (fileName, folder) => {
    const name = jsUcfirst(fileName);
    const classExample = `VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
END
Attribute VB_Name = "${name}"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False

'namespace=vba-files${folder.replace(/\//g, "\\")}


'/*
' Block comment for class
' This Class is...
'
'*/


'/*
'Class Param Example'
'*/
Private pName As String


'/*
'
'Main method example
'
'*/
Private Sub main()

MsgBox "message",,"title"

End Sub

'/*
'Example of accessor method Get
'*/
Public Property Get Name() As String
 Name = pName
End Property

'/*
'Example of accessor method Let
'*/
Public Property Let Name(Value as String)
 pName =  Value
End Property

`;
    re1 = new RegExp("\x0A", 'g');
    origContent = classExample.replace(re1, "\x0D\x0A");
    return origContent
}



function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}