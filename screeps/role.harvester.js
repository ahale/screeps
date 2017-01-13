// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {"role": "harvester"});

module.exports = {
    run: function(creep) {
        // return;
        // console.log('todo: '+creep.memory.role+' specific stuff');
        // var source_mode = creep.room.memory.sources[creep.memory.src].mode;
        // var res = eval(creep.memory.role+'.run')(creep);
        console.log("creep.room.memory.mode: "+creep.room.memory.mode);
        if(creep.room.memory.mode == "harvest") { console.log('creep: '+creep.name); this.harvest(creep); };
        if(creep.room.memory.mode == "miner") { console.log('creep: '+creep.name); this.miner(creep); };
        if(creep.room.memory.mode == "container") { console.log('creep: '+creep.name); this.container(creep); };
        if(creep.room.memory.mode == "delivery") { console.log('creep: '+creep.name); this.delivery(creep); };
    },

    harvest: function(creep) {
        // console.log('todo: harvester in harvest mode');
        if(creep.carry.energy < creep.carryCapacity) {
            var src = Game.getObjectById(creep.room.memory.sources[creep.memory.src].id);
            if(creep.harvest(src) == ERR_NOT_IN_RANGE) {
                creep.moveTo(src);
            }
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
                }
            }
            if(targets.length == 0) {
                creep.moveTo(Game.spawns.Spawn1.pos);
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
}
