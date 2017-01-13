
module.exports = {
    run: function(creep) {
        console.log('todo: '+creep.memory.role+' specific stuff');
        var source_mode = creep.room.memory.sources[creep.memory.src].mode;
        // var res = eval(creep.memory.role+'.run')(creep);
        if(creep.room.memory.mode == "setup") {
            this.setup_mode(creep);
        }
        else {
            console.log('this.'+source_mode);
            // eval('this.'+source_mode)(creep);
        }
    },

    setup_mode: function(creep) {
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
