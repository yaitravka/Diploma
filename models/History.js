const Row = require('./Row');

class History {
    static refresh() {
        var sidebar = document.getElementsByClassName('sidebar')[0];
        sidebar.innerHTML = '';
        for (var i in window.localStorage) {
            if (typeof localStorage[i] == 'string') {
                var div = document.createElement('div');
                div.innerHTML = new Date(Number(i)).toLocaleTimeString() + ' ' + new Date(Number(i)).toLocaleDateString() + ' ' + JSON.parse(localStorage[i]).path;
                div.className = 'historyItem';
                div.id = i;
                sidebar.append(div);
            }
        }
        sidebar.querySelectorAll('.historyItem').forEach((e) => { e.addEventListener('click', () => { Row.fill(e) }); });
    }
}

module.exports = History;