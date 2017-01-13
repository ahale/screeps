var mem = require('utils.mem');
var utils = require('utils.utils');
var factory = require('module.factory');
var basecreep = require('role.base');

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
            this.run_room(name);
        }
        this.run_creeps();
    },

    run_room: function(name) {
        console.log('processing room: '+name);
        factory.run(name);
    },

    run_creeps: function() {
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