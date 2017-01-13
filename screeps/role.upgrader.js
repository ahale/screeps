
module.exports = {
    run: function(creep) {
        console.log('todo: '+creep.memory.role+' specific stuff');
    }
}

// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {"role": "harvester"});

module.exports = {
    run: function(creep) {
        if(creep.room.memory.mode == "harvest") { this.harvest(creep); };
        if(creep.room.memory.mode == "miner") { this.miner(creep); };
        if(creep.room.memory.mode == "container") { this.container(creep); };
        if(creep.room.memory.mode == "delivery") { this.delivery(creep); };
    },

    harvest: function(creep) {
    },

    miner: function(creep) {
    },

    container: function(creep) {
    },

    delivery: function(creep) {
    },
}
