var miner = require('role.miner');
var builder = require('role.builder');
var upgrader = require('role.upgrader');
var harvester = require('role.harvester');
var transporter = require('role.transporter');

module.exports = {
    run: function(creep) {
        console.log('todo: write generic creep stuff');
        var role = creep.memory.role;
        var res = eval(creep.memory.role+'.run')(creep);
    }
}
