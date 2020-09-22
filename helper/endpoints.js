//const baseUrl = 'http://localhost:5001/xvba-repository/us-central1';
const baseUrl = 'https://us-central1-xvba-repository.cloudfunctions.net';
const apiVersion = '/api/v1/';
const url = baseUrl + apiVersion;
/**
 * Global Api Endpoints Manager
 */
module.exports.packages = {

    getFile: url + 'packages/download/'
}


