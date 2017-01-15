
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
    },

    run: function() {
        utils.log_time();
        utils.clear_expired_creeps();
        for(var name in Game.rooms) {
            if(Game.rooms[name].memory.active) {
                this.run_room(name);
            }
        }
        this.run_creeps();
    },

    run_room: function(name) {
        if(Game.rooms[name].memory.controller_level != Game.rooms[name].controller.level) {
            // console.log('wtf');

            // make this set flag to wait for full energy then test all builds prime cache (or cron?)
            utils.controller_level_change(name);
        }
        // factory.run(name);
        // this.stupid_stuff_to_get_creeps()
    },

    run_creeps: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            // basecreep.run(creep);
        }
    },

    stupid_stuff_to_get_creeps: function() {
        var harvesters = _.filter(Game.creeps, (creep) => (creep.memory.flavour == 'harvester'));
        var upgraders = _.filter(Game.creeps, (creep) => (creep.memory.flavour == 'upgrader'));
        var structure_builders = _.filter(Game.creeps, (creep) => (creep.memory.flavour == 'builder' && creep.memory.build_type == 'structure'));
        var road_builders = _.filter(Game.creeps, (creep) => (creep.memory.flavour == 'builder' && creep.memory.build_type == 'road'));
        if(!harvesters.length) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {"flavour": "harvester", "generic": true});
            if(_.isString(newName)) {
                console.log('building harvester '+newName)
                Game.spawns['Spawn1'].memory.building = "harvester";
                return;
            }
        }
        if(!upgraders.length) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {"flavour": "upgrader", "generic": true});
            if(_.isString(newName)) {
                console.log('building upgrader '+newName)
                Game.spawns['Spawn1'].memory.building = "upgrader";
            }
            return;
        }
        if(!structure_builders.length) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {"flavour": "builder", "build_type": 'structure'});
            if(_.isString(newName)) {
                console.log('building structure builder '+newName)
                Game.spawns['Spawn1'].memory.building = "upgrader";
            }
            return;
        }
        if(!road_builders.length && structure_builders.length < 2) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {"flavour": "builder", "build_type": 'road'});
            if(_.isString(newName)) {
                console.log('building road builder '+newName)
                Game.spawns['Spawn1'].memory.building = "upgrader";
            }
            return;
        }
    },
}
