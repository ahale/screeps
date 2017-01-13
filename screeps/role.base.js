var miner = require('role.miner');
var builder = require('role.builder');
var upgrader = require('role.upgrader');
var harvester = require('role.harvester');
var transporter = require('role.transporter');

module.exports = {
    run: function(creep) {
        if(creep.memory.init == undefined) { this.memory_init(creep); }
        if(creep.ticksToLive == 1) {
            console.log(creep.memory.role+" "+creep.name+" about to die: ");
            console.log(creep.memory.role+" "+creep.name+' stats: worked: '+creep.memory.work.work+', moved: '+creep.memory.work.move+', harvest: '+creep.memory.work.harvest+', wait: '+creep.memory.work.wait);
            return;
        }

        if(creep.memory.role == "miner") { miner.run(creep); };
        if(creep.memory.role == "builder") { builder.run(creep); };
        if(creep.memory.role == "upgrader") { upgrader.run(creep); };
        if(creep.memory.role == "harvester") { harvester.run(creep); };
        if(creep.memory.role == "transporter") { transporter.run(creep); };
    },

    memory_init: function(creep) {
        if(creep.memory.src == undefined) { creep.memory.src = 0; }
        if(creep.memory.room == undefined) { creep.memory.room = Memory.rooms.homeroom; }
        if(creep.memory.work == undefined) { creep.memory.work = {"work": 0, "wait": 0, "move": 0, "harvest": 0}; }
        creep.memory.init = true;

    }
}
