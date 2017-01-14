
var utils = require('utils.utils');

module.exports = {
    run: function(name) {
        var size = Game.rooms[name].energyCapacityAvailable;
        console.log('room '+name+' has energyCapacityAvailable = '+size);
        // console.log('todo: write factory run loop');

    },

    build: function(meta) {
        console.log('todo: write factory build function');
    },

}
