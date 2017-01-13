
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
        for(var name in Game.rooms) {
            console.log('room: '+name);
            if(!Game.rooms[name].memory.roominit) {
                utils.roominit(name);
            }
            // limit to just one active room by only initialising at start
            Memory.rooms[name].active = true;
            Memory.rooms.homeroom = name;
        }
    },

    run: function() {
        for(var name in Game.rooms) {
            if(Game.rooms[name].memory.active) {
                this.run_room(name);
            }
        }
        this.run_creeps();
    },

    run_room: function(name) {
        // console.log('processing room: '+name);
        factory.run(name);
        this.stupid_stuff_to_get_creeps()
    },

    run_creeps: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            basecreep.run(creep);
        }
    },

    stupid_stuff_to_get_creeps: function() {
        var harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester'));
        var upgraders = _.filter(Game.creeps, (creep) => (creep.memory.role == 'upgrader'));
        if(!harvesters.length) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {"role": "harvester"});
            if(_.isString(newName)) {
                console.log('building harvester '+newName)
                Game.spawns['Spawn1'].memory.building = "harvester";
            }
        } else {
            if(!upgraders.length) {
                var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {"role": "upgrader"});
                if(_.isString(newName)) {
                    console.log('building upgrader '+newName)
                    Game.spawns['Spawn1'].memory.building = "upgrader";
                }
            }
        }
    },
}
