const { default: Axios } = require('axios')

const Fs = require('fs');
const urls = require('../helper/endpoints')
const os = require('os')
const path = require('path')
const zlib = require('zlib');


module.exports = async (package) => {
    try {
        const url = urls.packages.getFile + package;
        const tempDir = os.tmpdir()
        const filePath = path.resolve(tempDir, 'xvba_modules', 'package.xvba')
        await new Promise(
            (resolve) => {
                Fs.mkdir(path.join(tempDir, 'xvba_modules'), () => {
                    resolve()
                })
            }
        )
        const writer = Fs.createWriteStream(filePath);
        const response = await Axios({ url, method: 'Get', responseType: 'stream' })
        let unzip = zlib.createUnzip()
        response.data.pipe(writer)
       
        await new Promise(
            (resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('close', reject);
            }
        )

    } catch (error) {
        console.log(error)
    }

    //Unzip file
    //Read json file
    //Create folder with package name from json
}