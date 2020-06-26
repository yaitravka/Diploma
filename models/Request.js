const Client = require('node-rest-client').Client;
const fs = require("fs");
const { dialog } = require('electron').remote;

module.exports = class Request {

    constructor(path, parametrs, type, headers, data) {
        this.path = path;
        this.parametrs = parametrs;
        this.type = type;
        this.headers = headers;
        this.data = data;
    }

    static result;

    static saveResponse() {
        var path = dialog.showSaveDialog({
            title: 'response.json',
            filters: [
                { name: 'JSON', extensions: ['json'] }
              ]
          });
        path.then(function (result) {
            fs.writeFile(result.filePath, Request.result, function (err) { });
        });
    }

    makeRequest() {
        var client = new Client();
        client.registerMethod('method', this.path, this.type);
        var args = {
            headers: this.headers,
            data: this.data
        };
        client.methods.method(args, function(data, response) {
            var div = document.getElementById('result');
            div.removeChild(div.firstChild);
            Request.result = JSON.stringify(data, null, 2);
            var mirror = CodeMirror(div, {
                value: Request.result,
                name: 'javascript',
                json: true,
                theme: "default"
            });
        });
    }

}