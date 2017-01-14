
var utils = require('utils.utils');

module.exports = {
    run: function(name) {
        // var size = Game.rooms[name].energyCapacityAvailable;
        // console.log('room '+name+' has energyCapacityAvailable = '+size);
        if(Game.rooms[name].memory.queues.priorityspawnqueue.length > 0) {
            var build_data = Game.rooms[name].memory.queues.priorityspawnqueue[0];
            var res = this.build(name, build_data);
            if(_.isString(res)) {
                console.log('building '+res+' ('+data.flavour+') (Priority)');
                Game.rooms[name].memory.queues.priorityspawnqueue.shift();
            }
        }
        if(!Game.rooms[name].memory.queues.priorityspawnqueue.length && Game.rooms[name].memory.queues.spawnqueue.length > 0) {
            var build_data = Game.rooms[name].memory.queues.spawnqueue[0];
            var res = this.build(name, build_data);
            if(_.isString(res)) {
                console.log('building '+res+' ('+data.flavour+')');
                Game.rooms[name].memory.queues.spawnqueue.shift();
            }
        }
    },

    build: function(name, build_data) {
        console.log('todo: write factory build function');
    },

}
