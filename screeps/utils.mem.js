
var utils = require('utils.utils');

module.exports = {
    init: function()  {
        // console.log('todo: write general manager memory stuff');
        if(Memory.parts == undefined) {
            Memory.parts = {};
        }

        this.loadCreepCounts();
        this.loadRecipes();
        for(var name in Game.rooms) {
            if(!Game.rooms[name].memory.roominit) { utils.roominit(name); }
            Memory.rooms.homeroom = name;
        }
        Memory.rooms[Memory.rooms.homeroom].active = true;
        Memory.mainManagerInit = true;
    },

    roomMemoryInit: function(name) {
        console.log('todo: write roomMemoryInit function');
    },

    loadCreepCounts: function() {
        console.log('todo: write load creep counts into memory');
    },

    loadRecipes: function() {
        console.log('todo: write recipedata into memory');
        // move this into memory stuff
        // if(creep.room.memory.parts.harvester == undefined) {
        //     Game.rooms[name].memory.parts.harvester = {};
        // }
    },
}
