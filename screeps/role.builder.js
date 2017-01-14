// Game.rooms['sim'].memory.queues.spawnqueue.push({'flavour': 'upgrader', 'generic': true, 'build_type': 'road'})
// Game.rooms['sim'].memory.queues.spawnqueue.push({'flavour': 'upgrader', 'generic': true, 'build_type': 'structure'})


var creeputil = require('utils.creeps');

module.exports = {
    run: function(creep) {
        if(!creep.memory.init) { this.memory_init(creep); }
        if(creep.room.memory.mode == "harvest") { this.harvest(creep); };
        if(creep.room.memory.mode == "miner") { this.miner(creep); };
        if(creep.room.memory.mode == "container") { this.container(creep); };
        if(creep.room.memory.mode == "delivery") { this.delivery(creep); };
    },

    harvest: function(creep) {
        if(!creep.memory.building) {
            creep.memory.building = false;
        }
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }
        if(creep.memory.building) {
            var targets = creeputil.filterConstructionSites(creep, creep.room.find(FIND_CONSTRUCTION_SITES));
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.memory.work.move += 1;
                    creep.moveTo(targets[0]);
                } else {
                    creep.memory.work.work += 1;
                    creep.moveTo(targets[0]);
                }
            }
            if(!targets.length && creep.memory.build_type == 'road') {
                creep.memory.build_type == 'structure';
            }
        }
        else {
            if(creep.carry.energy < creep.carryCapacity) { creeputil.harvest(creep); }
        }
    },

    miner: function(creep) {
    },

    container: function(creep) {
    },

    delivery: function(creep) {
    },

    memory_init: function(creep) {
        if(creep.memory.build_type == undefined) { creep.memory.build_type = false; }
        creep.memory.init = true;
    }
}
