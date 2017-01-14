
var utils = require('utils.utils');
var creeputil = require('utils.creeps');

module.exports = {
    run: function(name) {
        // var size = Game.rooms[name].energyCapacityAvailable;
        // console.log('room '+name+' has energyCapacityAvailable = '+size);
        if(Game.rooms[name].memory.queues.priorityspawnqueue.length > 0) {
            var build_data = Game.rooms[name].memory.queues.priorityspawnqueue[0];
            var res = this.build(name, build_data);
            if(_.isString(res)) {
                console.log('building '+res+' ('+build_data.flavour+') (Priority)');
                Game.rooms[name].memory.queues.priorityspawnqueue.shift();
            }
        }
        if(!Game.rooms[name].memory.queues.priorityspawnqueue.length && Game.rooms[name].memory.queues.spawnqueue.length > 0) {
            var build_data = Game.rooms[name].memory.queues.spawnqueue[0];
            var res = this.build(name, build_data);
            if(_.isString(res)) {
                console.log('building '+res+' ('+build_data.flavour+')');
                Game.rooms[name].memory.queues.spawnqueue.shift();
            }
        }
    },

    build: function(name, build_data) {
        var partlist = creeputil.get_parts(name, build_data['flavour']);
        console.log('for '+build_data['flavour']+', using recipe '+partlist);
        var room_spawn = utils.get_room_spawn(name);
        var newName = room_spawn.createCreep(partlist, undefined, build_data);
        if(_.isString(newName)) { Game.spawns['Spawn1'].memory.building = flavour; }
        return newName;
    },

}
