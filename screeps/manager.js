var mem = require('mem');
var utils = require('utils');
var factory = require('factory');
var basecreep = require('basecreep');

module.exports = {
    init: function() {
        if(Memory.mainManagerInit != undefined) {
            return;
        }
        mem.init();
        Memory.mainManagerInit = true;
    },

    run: function() {
        for(var name in Game.rooms) {
            if(!Game.rooms[name].memory.roominit) {
                this.roominit(name);
            }
            console.log('todo: write manager main loop');
            factory.run(name);
        }
        this.creeprunner();
    },

    creeprunner: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            basecreep.run(creep);
        }
    },

    roominit: function(name) {
        utils.roominit(name);
        factory.init(name);
    }
}
