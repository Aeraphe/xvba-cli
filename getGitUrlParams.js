
let getGitUrlParams = (url) => {
    let subString = url.replace("https://github.com/", "");
    let [user, packageFullName] = subString.split("/")
    let package = packageFullName.replace(".git", "");
    return [user, package];
}

module.exports = getGitUrlParams;