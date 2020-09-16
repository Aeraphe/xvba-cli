const fs = require('fs');

module.exports = handleCheckFolder = async (packagePath) => {
    return new Promise((resolve, reject) => {
        fs.lstat(packagePath, (err, stat) => {
            if (err) {
                reject(err)
            } else {
                resolve(stat.isDirectory())
            }
        })
    })
}
