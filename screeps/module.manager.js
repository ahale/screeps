
var mem = require('utils.mem');
var utils = require('utils.utils');
var basecreep = require('role.base');
var factory = require('module.factory');
var creeputil = require('utils.creeps');


module.exports = {
    init: function() {
        if(Memory.mainManagerInit != undefined) {
            return;
        }
        mem.init();
    },

    run: function() {
        utils.log_time();
        utils.clear_expired_creeps();
        for(var name in Game.rooms) {
            if(Game.rooms[name].memory.active) {
                this.run_room(name);
                if(Game.rooms[name].memory.controller_level > 1) {
                    factory.run(name);
                }
            }
        }
        this.run_creeps();
    },

    run_room: function(name) {
        if(Game.rooms[name].memory.controller_level != Game.rooms[name].controller.level) {
            utils.controller_level_change(name);
        }
        creeputil.check_no_creeps(name);
        creeputil.check_creep_counts(name);
        factory.run(name);
    },

    run_creeps: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            basecreep.run(creep);
        }
    },

}
