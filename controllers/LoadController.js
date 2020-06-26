const Loader = require('../models/Loader')

class LoadController {
    static init() {
        window.onload = new Loader();
    }
}

LoadController.init();