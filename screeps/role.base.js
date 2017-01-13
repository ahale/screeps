var miner = require('role.miner');
var builder = require('role.builder');
var upgrader = require('role.upgrader');
var harvester = require('role.harvester');
var transporter = require('role.transporter');

module.exports = {
    run: function(creep) {
        console.log('todo: write generic creep stuff');
        if(creep.ticksToLive == 1) {
            console.log(creep.memory.role+" "+creep.name+" about to die");
            return;
        }
        if(creep.memory.src == undefined) {
            creep.memory.src = 0;
        }
        if(creep.memory.role == "harvester") { harvester.run(creep); };

        // var res = harvester.run(creep);
        // var cmd = ;
        // var func = new Function('return harvester;');
        // x = new func()
        // console.log(x);
        // x.run(creep);
    }
}
