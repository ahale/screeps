// Game.rooms['sim'].memory.queues.spawnqueue.push({'flavour': 'miner'})

module.exports = {
    run: function(creep) {
        if(!creep.memory.init) { this.memory_init(creep); }
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

    memory_init: function(creep) {
        creep.memory.init = true;
    }
}
