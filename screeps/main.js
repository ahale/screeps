var manager = require('manager');
manager.init();

module.exports.loop = function() {
    manager.run();
}
