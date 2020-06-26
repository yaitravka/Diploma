const internetAvailable = require('internet-available');
const { remote } = require('electron');

class Loader {
    
    constructor() {
        var func = this.setImage;
        setTimeout(() => {
            internetAvailable().then(function(){
                func('done', 'Подключение к интернету выполнено успешно, ожидайте перенаправления');
                setTimeout(() => {
                    remote.getCurrentWindow().loadFile(require('path').join(__dirname, '../views/index.html'));
                }, 3000);
            }).catch(function(){
                func('error', 'Подключение к интернету отсутствует, проверьте его и перезайдите в приложение');
            });
        }, 3000);
    }

    setImage = function(imageName, text) {
        document.getElementById('load').classList.remove('loader');
        var img = document.createElement('img');
        img.src = '../img/'+imageName+'.png';
        document.getElementById('load').appendChild(img);
        document.getElementById('text').innerText = text;
    }
}

module.exports = Loader;