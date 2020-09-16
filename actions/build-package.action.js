const archiver = require('archiver')
const checkRootFolder = require('../helper/check-root-folder.helper')
const handleCheckFolder = require('../helper/check-directory.helper');
const handleCheckFile = require('../helper/check-file.helper');
const rootPath = process.cwd();
const path = require('path')
const fs = require('fs');
const { promises, resolveSoa } = require('dns');


module.exports = async function buildPackage(package) {
    try {
        if (!checkRootFolder()) { return; };
        const packagePath = path.join(rootPath, "xvba_modules", package);

        // Developes  -->>Check .xvba_ignore files


        //Check package folder exist
        const checkFolder = await handleCheckFolder(packagePath)
        //Check if package has xvba.package.json
        const checkPackageFile = await handleCheckFile(path.join(packagePath, 'xvba.package.json'))
        if (checkFolder && checkPackageFile) {
            //Read file version on xvba.package.json 
            const config = await readPackageConfigFile(packagePath)

            //Develope - > check package name especial characters

            //Check version exists
            const version = config.version ? config.version : '1.0'
            //Compact file in xvba and version
            createZip(packagePath, package, version)
        }

    } catch (error) {
        console.log(error)
    }


}

const readPackageConfigFile = async (packagePath) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(path.join(packagePath, 'xvba.package.json'), (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(JSON.parse(data))
                }

            })
        }
    )

}





const createZip = (packagePath, package, version) => {

    const output = fs.createWriteStream(path.join(rootPath, package + '-' + version + '.xvba'));
    const archive = archiver('zip', { zlib: { level: 9 } })
    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });
    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function () {
        console.log('Data has been drained');
    });
    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            // log warning
        } else {
            // throw error
            throw err;
        }
    });

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
        throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);

    // append files from a sub-directory, putting its contents at the root of archive
    archive.directory(packagePath, false);
    // finalize the archive (ie we are done appending files but streams have to finish yet)
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    archive.finalize();
}