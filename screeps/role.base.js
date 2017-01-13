var miner = require('role.miner');
var builder = require('role.builder');
// var upgrader = require('role.upgrader');
var harvester = require('role.harvester');
var transporter = require('role.transporter');

module.exports = {
    run: function(creep) {
        // console.log('todo: write generic creep stuff');
        if(creep.ticksToLive == 1) {
            console.log(creep.memory.role+" "+creep.name+" about to die");
            return;
        }
        if(creep.memory.src == undefined) { creep.memory.src = 0; }
        if(creep.memory.work == undefined) { creep.memory.work = {"work": 0, "wait": 0, "move": 0, "harvest": 0}; }

        if(creep.memory.role == "miner") { miner.run(creep); };
        if(creep.memory.role == "builder") { builder.run(creep); };
        // if(creep.memory.role == "upgrader") { upgrader.run(creep); };
        if(creep.memory.role == "harvester") { harvester.run(creep); };
        if(creep.memory.role == "transporter") { transporter.run(creep); };

    }
}
