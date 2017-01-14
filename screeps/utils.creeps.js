
var utils = require('utils.utils');
// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {"role": "builder", 'build_type': 'structure'});
// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {"role": "builder", 'build_type': 'road'});

module.exports = {
    loadCreepCounts: function() {
        console.log('todo: write load creep counts into memory');
    },

    get_part_info: function(flavour) {
        if(flavour == 'harvester') { return {"base": ['work', 'carry', 'move'], "add": ['work', 'carry', 'move']}; }

    },

    get_parts: function(name, flavour) {
        room_spawn = utils.get_room_spawn(name); // = _.filter(Game.spawns, (spawn) => (spawn.pos.roomName == name));
        console.log('room_spawn: ' room_spawn);
        if(!room_spawn) { return false; }
        var room_energy = Game.rooms[name].energyCapacityAvailable;
        if(Game.rooms[name].memory.parts[flavour][room_energy] != undefined) {
            return Game.rooms[name].memory.parts[flavour][room_energy];
        }

        var part_info = this.get_part_info(flavour);
        var parts = part_info[0];
        var add_parts = part_info[0];
        var last_parts = false;

        for (i = 0; i < 10; i++) {
            if(room_spawn.canCreateCreep(parts.concat(add_parts))) {
                parts = parts.concat(add_parts);
            }
            else {
                break;
            }
        }
        Game.rooms[name].memory.parts[flavour][room_energy] = parts;
        return parts;
    },

    harvest: function(creep) {
        var src = Game.getObjectById(creep.room.memory.sources[creep.memory.src].id);
        if(creep.harvest(src) == ERR_NOT_IN_RANGE) {
            creep.moveTo(src);
            creep.memory.work.move += 1;
        } else {
            creep.memory.work.harvest += 1;
        }
    },

    filterConstructionSites(creep, targets) {
        if(creep.memory.build_type) {
            if(creep.memory.build_type == 'road') {
                targets = _.filter(targets, (site) => site.structureType == 'road');
            } else {
                targets = _.filter(targets, (site) => site.structureType != 'road');
            }
        }
        return targets;
    },
}
