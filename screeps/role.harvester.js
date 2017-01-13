
module.exports = {
    run: function(creep) {
        console.log('todo: '+creep.memory.role+' specific stuff');
        var source_mode = creep.room.memory.sources[creep.memory.src].mode;
        // var res = eval(creep.memory.role+'.run')(creep);
        var res = eval('this.'+source_mode)(creep);
    },

    setup: function(creep) {
        console.log('todo: ');
    },

    miner: function(creep) {
        console.log('todo: ');
    },

    delivery: function(creep) {
        console.log('todo: ');
    },
}
