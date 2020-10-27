const fs = require("fs");
var rimraf = require("rimraf");

module.exports = removeDir = function (path) {
    if (fs.existsSync(path)) {
        rimraf(path, function () { console.log("Thanks for using XVBA-CLI"); });
    } else {
        console.log("Directory path not found.")
    }
}
