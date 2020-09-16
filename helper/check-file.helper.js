const fs = require('fs');

module.exports = handleCheckFile = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.lstat(filePath, (err, stat) => {
            if (err) {
                reject(err)
            } else {
                resolve(stat.isFile())
            }
        })
    })
}
