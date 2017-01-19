
var utils = require('utils.utils');
// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {'flavour': 'builder', 'build_type': 'structure'});
// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {'flavour': 'builder', 'build_type': 'road'});
// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {'flavour': 'repairer'});

module.exports = {
    loadCreepCounts: function() {
        console.log('todo: write load creep counts into memory');
    },

    check_creep_counts: function(name) {
        // console.log('check_creep_counts('+name+')');
        this.check_no_creeps(name);
        var transporters = _.filter(Game.creeps, (creep) => (creep.memory.role == name && creep.memory.room == name && !creep.memory.generic));
        var harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == name && creep.memory.room == name && !creep.memory.generic));
        var upgraders = _.filter(Game.creeps, (creep) => (creep.memory.role == name && creep.memory.room == name && !creep.memory.generic));
        var builders = _.filter(Game.creeps, (creep) => (creep.memory.role == name && creep.memory.room == name && !creep.memory.generic));
        var miners = _.filter(Game.creeps, (creep) => (creep.memory.role == name && creep.memory.room == name && !creep.memory.generic));

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
            var count = _.filter(Game.creeps, (creep) => (creep.memory.flavour == flavour));
            if(!count.length && !utils.is_queued(name, flavour)) {
                Game.rooms[name].memory.queues.spawnqueue.push({'flavour': flavour, 'generic': true});
            }
        }
    },

    harvest: function(creep) {
        if(creep.room.memory.mode == "harvest") {
            var src = this.get_source(creep);
            if(creep.harvest(src) == ERR_NOT_IN_RANGE) {
                creep.moveTo(src);
                creep.memory.work.move += 1;
            } else {
                creep.memory.work.harvest += 1;
            }
        }
        if(creep.room.memory.mode == "miner") {
            var src = creep.room.find(FIND_DROPPED_RESOURCES);
            var sorted_sources = sources.sort(function(a, b){return a.amount-b.amount}).reverse();
            if(creep.pickup(sorted_sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sorted_sources[0]);
                creep.memory.work.move += 1;
            } else {
                creep.memory.work.harvest += 1;
            }
        }
        if(creep.room.memory.mode == "container") {

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
