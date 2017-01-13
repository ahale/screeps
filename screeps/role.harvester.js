
module.exports = {
    run: function(creep) {
        // return;
        console.log('todo: '+creep.memory.role+' specific stuff');
        var source_mode = creep.room.memory.sources[creep.memory.src].mode;
        // var res = eval(creep.memory.role+'.run')(creep);
        if(creep.room.memory.mode == "setup") { console.log('creep: '+creep.name); this.setup(creep); };
        if(creep.room.memory.mode == "harvest") { console.log('creep: '+creep.name); this.harvest(creep); };
        if(creep.room.memory.mode == "miner") { console.log('creep: '+creep.name); this.miner(creep); };
        if(creep.room.memory.mode == "delivery") { console.log('creep: '+creep.name); this.delivery(creep); };
    },

    setup: function(creep) {
        console.log('todo: harvester in initial setup mode');
    },

    harvest: function(creep) {
        console.log('todo: harvester in initial setup mode');
    },

    miner: function(creep) {
        console.log('todo: harvester in miner mode');
    },

    delivery: function(creep) {
        console.log('todo: harvester in full delivery mode');
    },
}
