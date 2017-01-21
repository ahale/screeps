
var utils = require('utils.utils');

module.exports = {
    init: function()  {
        // console.log('todo: write general manager memory stuff');
        if(Memory.parts == undefined) {
            Memory.parts = {};
        }

        if(Memory.creep_counts == undefined) {
            Memory.parts = this.loadCreepCounts();
        }

        for(var name in Game.rooms) {
            if(!Game.rooms[name].memory.roominit) { utils.roominit(name); }
            Memory.rooms.homeroom = name;
        }
        Memory.rooms[Memory.rooms.homeroom].active = true;
        Memory.timers = {};
        Memory.timers.last_runs = {};
        Memory.mainManagerInit = true;
    },

    loadCreepCounts: function() {
        var creep_counts = {
            "default": {
                "harvester": {"min": 0, "max": 3, "current": 0},
                "upgrader": {"min": 0, "max": 3, "current": 0};
                "builder": {"min": 0, "max": 6, "current": 0};
                "miner": {"min": 0, "max": 10, "current": 0};
            },
            "container": {
                "harvester": {"min": 0, "max": 10, "current": 0},
                "upgrader": {"min": 0, "max": 10, "current": 0};
                "builder": {"min": 0, "max": 10, "current": 0};
                "miner": {"min": 0, "max": 10, "current": 0};
            },
            "delivery": {
                "harvester": {"min": 0, "max": 1, "current": 0},
                "upgrader": {"min": 0, "max": 1, "current": 0};
                "builder": {"min": 0, "max": 1, "current": 0};
                "miner": {"min": 0, "max": 1, "current": 0};
            },
        }
        return creep_counts;
    },
}
