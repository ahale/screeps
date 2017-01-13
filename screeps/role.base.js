var miner = require('role.miner');
var builder = require('role.builder');
var upgrader = require('role.upgrader');
var harvester = require('role.harvester');
var transporter = require('role.transporter');

module.exports = {
    run: function(creep) {
        console.log('todo: write generic creep stuff');
        if(creep.ticksToLive == 1) {
            console.log(creep.memory.role" "+creep.name+" about to die");
            return;
        }
        if(creep.memory.src == undefined) {
            creep.memory.src = 0;
        }
        var res = eval(creep.memory.role+'.run')(creep);
    }
}
