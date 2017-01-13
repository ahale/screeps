
module.exports = {
    run: function(creep) {
        console.log('todo: '+creep.memory.role+' specific stuff');
        var source_mode = creep.room.memory.sources[creep.memory.src].mode;
        // var res = eval(creep.memory.role+'.run')(creep);
        eval('this.'+source_mode)(creep);
    },

    setup: function(creep) {
        console.log('todo: harvester in initial setup mode');
    },

    miner: function(creep) {
        console.log('todo: harvester in miner mode');
    },

    delivery: function(creep) {
        console.log('todo: harvester in full delivery mode');
    },
}
