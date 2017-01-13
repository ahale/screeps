var manager = require('module.manager');
manager.init();

module.exports.loop = function() {
    manager.run();
}
