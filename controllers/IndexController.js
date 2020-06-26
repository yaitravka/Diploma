const Tab = require('../models/Tab');
const Row = require('../models/Row');
const Sender = require('../models/Sender');
const History = require('../models/History');
const ContextMenu = require('../models/ContextMenu');
const Request = require('../models/Request');

class IndexController {
    static init() {
  
        window.onload = () => { 
                History.refresh();
                window.addEventListener('contextmenu', (e) => { new ContextMenu(e); })
                document.querySelector('#parametrsButton').addEventListener('click', () => { Tab.open(this, 'Parametrs');});
                document.querySelector('#headersButton').addEventListener('click', () => { Tab.open(this, 'Headers') });
                document.querySelector('#dataButton').addEventListener('click', () => { Tab.open(this, 'Data') });    
                document.querySelector('#parametrsButton').click(); 
                document.querySelectorAll('.tableInput').forEach((e) => { e.addEventListener('input', () => { Row.addOnInput(e)}); });
                document.querySelectorAll('img').forEach((e) => { e.addEventListener('click', () => { Row.remove(e) }); });
                document.querySelectorAll('.parKey').forEach((e) => { e.addEventListener('input', () => { Row.pasteParametrs() }); });
                document.querySelectorAll('.parVal').forEach((e) => { e.addEventListener('input', () => { Row.pasteParametrs() }); });
                document.querySelectorAll('img').forEach((e) => { e.addEventListener('click', () => { Row.pasteParametrs() }); });
                document.querySelector('#send').addEventListener('click', () => { Sender.send() });
                document.querySelector('#savebtn').addEventListener('click', () => {Request.saveResponse()});
            }
        }
        
}

IndexController.init();