
var utils = require('utils.utils');
// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {'flavour': 'builder', 'build_type': 'structure'});
// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {'flavour': 'builder', 'build_type': 'road'});
// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {'flavour': 'repairer'});

module.exports = {
    loadCreepCounts: function() {
        console.log('todo: write load creep counts into memory');
    },

    get_part_info: function(flavour, name, generic) {
        if(generic) {
            return ['work', 'carry', 'move'];
        }

        if(Game.rooms[name].memory.mode == 'harvest') {
            var part_info = false;
            if(flavour === 'harvester' || flavour == 'upgrader' || flavour == 'builder') {
                part_info = {'base': ['work', 'carry', 'move'], 'add': ['work', 'carry', 'move']}
            }
            if(flavour === 'miner') {
                part_info = {'base': ['move', 'work', 'work'], 'add': ['work']}
            }
            if(flavour === 'transporter') {
                part_info = {'base': ['move', 'carry'], 'add': ['move', 'carry']}
            }
            if(flavour === 'repairer') {
                part_info = {'base': ['work', 'carry', 'move'], 'add': ['move']}
            }
        }
        return part_info;
    },

    get_parts: function(name, flavour, generic) {
        var room_spawn = utils.get_room_spawn(name);
        if(!room_spawn) { return false; }
        if(generic) { return this.get_part_info(flavour, name, generic); }
        var room_energy = Game.rooms[name].energyCapacityAvailable;
        if(Memory.parts[flavour] == undefined) { Memory.parts[flavour] = {}; }
        if(Memory.parts[flavour][room_energy] != undefined) {
            return Memory.parts[flavour][room_energy];
        }
        var part_info = this.get_part_info(flavour, name, generic);
        var parts = part_info['base'];
        var add_parts = part_info['add'];
        var last_parts = false;

        for(i = 0; i < 10; i++) {
            var cost = 0;
            for(var n in parts.concat(add_parts)) {
                cost += BODYPART_COST[parts.concat(add_parts)[n]];
            }
            if(cost <= room_energy) {
                parts = parts.concat(add_parts);
            } else { break; }
        }
        Memory.parts[flavour][room_energy] = parts;
        return parts;
    },

    check_no_creeps: function(name) {
        var flavours = ['harvester', 'upgrader'];
        for(var n in flavours) {
            var flavour = flavours[n];
            // console.log(flavour);
            var count = _.filter(Game.creeps, (creep) => (creep.memory.flavour == flavour));
            // console.log(count.length);
            // console.log(utils.is_queued(name, flavour));
            if(!count.length && !utils.is_queued(name, flavour)) {
                Game.rooms[name].memory.queues.spawnqueue.push({'flavour': flavour, 'generic': true});
            }
        }
    },

    harvest: function(creep) {
        var src = this.get_source(creep);
        if(creep.harvest(src) == ERR_NOT_IN_RANGE) {
            creep.moveTo(src);
            creep.memory.work.move += 1;
            console.log('move');
        } else {
            creep.memory.work.harvest += 1;
            console.log('move');
        }
    },

    get_source: function(creep) {
        var src = Game.getObjectById(creep.room.memory.sources[creep.memory.src].id);
        return src;
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
