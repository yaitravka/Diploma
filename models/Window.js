const { BrowserWindow } = require('electron');

class Window extends BrowserWindow {
    constructor({file, ...windowSettings}) {
        super({
            minWidth: 1600,
            minHeight: 900,
            webPreferences: {
                nodeIntegration: true
            }, ...windowSettings })

        this.loadURL(require('url').format({
            pathname: require('path').join(__dirname.slice(0, __dirname.lastIndexOf('\\')), 'views', file), 
            protocol: 'file:',
            slashes: true
        }));

        this.setMenu(null);

        this.once('ready-to-show', () => {
            this.show();
        });
  }
}

module.exports = Window;