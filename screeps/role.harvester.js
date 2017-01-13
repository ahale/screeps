
module.exports = {
    run: function(creep) {
        console.log('todo: '+creep.memory.role+' specific stuff');
        var source_mode = creep.room.memory.sources[creep.memory.src].mode;
        // var res = eval(creep.memory.role+'.run')(creep);
        var res = eval('this.'+source_mode)(creep);
    },

    setup: function(creep) {

    },

    miner: function(creep) {

    },

    delivery: function(creep) {

    },
}
