
module.exports = {
    run: function(creep) {
        console.log('todo: '+creep.memory.role+' specific stuff');
        console.log(creep.room.memory.mode);
        var room_mode = creep.room.memory.mode;
        var source_mode = creep.room.memory.sources[creep.memory.src].mode;
        // var res = eval(creep.memory.role+'.run')(creep);
        if(room_mode == "setup") {
            this.setup(creep);
        }
        else {
            console.log('this.'+source_mode);
            // eval('this.'+source_mode)(creep);
        }
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
