//const baseUrl = 'http://localhost:5001/xvba-691e3/us-central1';
const baseUrl = 'https://us-central1-xvba-691e3.cloudfunctions.net';
const apiVersion = '/api/v1/';
const url = baseUrl + apiVersion;
/**
 * Global Api Endpoints Manager
 */
module.exports.packages = {

    getFile: url + 'packages/download/'
}

