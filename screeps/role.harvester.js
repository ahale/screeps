// Game.rooms['sim'].memory.queues.spawnqueue.push({'flavour': 'harvester'})

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
        if(creep.carry.energy < creep.carryCapacity) {
            creeputil.harvest(creep);
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                    creep.memory.work.move += 1;
                }
                else {
                    creep.memory.work.work += 1;
                }
            }
            if(targets.length == 0) {
                creep.moveTo(Game.spawns.Spawn1.pos);
                creep.memory.work.wait += 1;
            }
        }
    },

    miner: function(creep) {
        console.log('todo: harvester in miner mode');
    },

    container: function(creep) {
        console.log('todo: harvester in container mode');
    },

    delivery: function(creep) {
        console.log('todo: harvester in full delivery mode');
    },

    memory_init: function(creep) {
        creep.memory.init = true;
    }
}
