const Request = require('./Request');
const History = require('./History');

class Sender {
    static send() {
        var path = document.getElementById('inputRequest').value;
        var type = document.getElementById('select').value;
        var keys = document.getElementsByClassName('headKey');
        var values = document.getElementsByClassName('headVal');
        var headers = {};
        var data = {};
        var parametrs = {};
        for (var i = 0; i < keys.length; i++) {
            if (i == keys.length-1)
                if (keys[i].value=='' && values[i].value=='')
                    break;
            headers[String(keys[i].value)] = values[i].value;  
        }
        keys = document.getElementsByClassName('dataKey');
        values = document.getElementsByClassName('dataVal');
        for (var i = 0; i < keys.length; i++) {
            if (i == keys.length-1)
                if (keys[i].value=='' && values[i].value=='')
                    break;
            data[String(keys[i].value)] = values[i].value;
        }
        keys = document.getElementsByClassName('parKey');
        values = document.getElementsByClassName('parVal');
        for (var i = 0; i < keys.length; i++) {
            if (i == keys.length-1)
                if (keys[i].value=='' && values[i].value=='')
                    break;
            parametrs[String(keys[i].value)] = values[i].value;
        }  
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        var req = new Request(path, parametrs, type, headers, data);
        req.makeRequest();
        var date = Date.now();
        window.localStorage.setItem(date, JSON.stringify(req));
        History.refresh();
    }
}

module.exports = Sender;