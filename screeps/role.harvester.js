
module.exports = {
    run: function(creep) {
        console.log('todo: '+creep.memory.role+' specific stuff');
        var source = creep.memory.src;
        var source_mode = creep.room.memory.sources[creep.memory.src].mode;
        // var res = eval(creep.memory.role+'.run')(creep);
        eval('this.'+source_mode)(creep);
    },

    setup: function(creep) {

    },

    miner: function(creep) {

    },

    delivery: function(creep) {

    },
}
