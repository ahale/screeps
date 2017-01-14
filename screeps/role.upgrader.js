// Game.rooms['sim'].memory.queues.spawnqueue.push({'flavour': 'upgrader', 'generic': true})

module.exports = {
    run: function(creep) {
        if(!creep.memory.init) { this.memory_init(creep); }
        if(creep.room.memory.mode == "harvest") { this.harvest(creep); };
        if(creep.room.memory.mode == "miner") { this.miner(creep); };
        if(creep.room.memory.mode == "container") { this.container(creep); };
        if(creep.room.memory.mode == "delivery") { this.delivery(creep); };
    },

    harvest: function(creep) {
        if(creep.room.controller) {
        // creep.say('whassup');
            if(creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
            }
            if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                creep.memory.upgrading = true;
            }

            if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                    creep.memory.work.move += 1;
                }
                else {
                    creep.moveTo(creep.room.controller);
                    creep.memory.work.work += 1;
                }
            }
            else {
                var src = Game.getObjectById(creep.room.memory.sources[creep.memory.src].id);

                if(creep.harvest(src) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(src);
                    creep.memory.work.move += 1;
                    // console.log(creep.pos.getRangeTo(src.pos));

                }
                else {
                    creep.moveTo(src);
                    creep.memory.work.harvest += 1;
                }
            }
        }
        if(!creep.room.controller) {
            creep.moveTo(Game.spawns.Spawn1.pos);
            creep.memory.work.wait += 1;
        }
    },

    miner: function(creep) {
    },

    container: function(creep) {
    },

    delivery: function(creep) {
    },

    memory_init: function(creep) {
        creep.memory.init = true;
    }
}
