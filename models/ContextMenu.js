const History = require('./History');
const { Menu, MenuItem } = require('electron').remote;

class ContextMenu {

    constructor(e) {
        e.preventDefault();
        if (document.elementFromPoint(e.x, e.y).className == 'historyItem') {
            this.menu = new Menu()
            var menuItem = new MenuItem({
                    label: 'Удалить',
                    click: () => {
                        window.localStorage.removeItem(document.elementFromPoint(e.x, e.y).id);
                        History.refresh();
                }
            });
            this.menu.append(menuItem);
            this.menu.popup();
        }        
    }
}

module.exports = ContextMenu;