const { app } = require('electron');
const Window = require('./models/Window');

class App {

    static appStart() {
        var win = new Window({
            file: 'load.html'
        });
    }

    static init() {
        app.on('ready', App.appStart);
        app.on('window-all-closed', () => {
           app.quit(); 
        });
    }
}

App.init();
