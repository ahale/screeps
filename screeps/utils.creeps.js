
var utils = require('utils.utils');
// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {"flavour": "builder", 'build_type': 'structure'});
// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {"flavour": "builder", 'build_type': 'road'});

module.exports = {
    loadCreepCounts: function() {
        console.log('todo: write load creep counts into memory');
    },

    get_part_info: function(flavour, name) {
        if(Game.rooms[name].memory.mode == 'harvest') {
            var part_info = false;
            if(flavour == 'harvester' || flavour == 'upgrader' || flavour == 'builder') {
                part_info = {'base': ['work', 'carry', 'move'], 'add': ['work', 'carry', 'move']}
            }
            if(flavour == 'miner') {
                part_info = {'base': ['move', 'work', 'work'], 'add': ['work']}
            }
            if(flavour == 'transporter') {
                part_info = {'base': ['move', 'carry'], 'add': ['move', 'carry']}
            }
        } else {

        }
        return part_info;
    },

    get_parts: function(name, flavour, generic) {
        var room_spawn = utils.get_room_spawn(name); // = _.filter(Game.spawns, (spawn) => (spawn.pos.roomName == name));
        if(!room_spawn) { return false; }
        var room_energy = Game.rooms[name].energyCapacityAvailable;
        if(Memory.parts[flavour] == undefined) { Memory.parts[flavour] = {}; }
        if(Memory.parts[flavour][room_energy] != undefined) {
            return Memory.parts[flavour][room_energy];
        }
        var part_info = this.get_part_info(flavour, name);
        var parts = part_info['base'];
        var add_parts = part_info['add'];
        var last_parts = false;

        for (i = 0; i < 10; i++) {
            var res = room_spawn.canCreateCreep(parts.concat(add_parts));
            if(res == 0) {
                parts = parts.concat(add_parts);
            }
            else {
                break;
            }
        }
        Memory.parts[flavour][room_energy] = parts;
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
