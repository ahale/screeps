// Game.rooms['sim'].memory.queues.spawnqueue.push({'flavour': 'miner'})

var creeputil = require('utils.creeps');

module.exports = {
    run: function(creep) {
        if(!creep.memory.init) { this.memory_init(creep); }
        var src = creeputil.get_source(creep);
        if(creep.harvest(src) == ERR_NOT_IN_RANGE) {
            creep.memory.work.move += 1;
            creep.moveTo(src);
        } else { creep.memory.work.work += 1; }
    },

    memory_init: function(creep) {
        creep.memory.init = true;
    }
}
